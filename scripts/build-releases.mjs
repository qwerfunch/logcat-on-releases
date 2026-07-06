#!/usr/bin/env node
// build-releases.mjs — 이 레포의 GitHub Releases 를 가져와 dist/releases.json 으로 베이크.
//
// 페이지(assets/app.js)는 런타임에 GitHub API 를 호출하지 않고 이 파일만 읽는다
// (rate limit 0, 항상 빌드 시점 스냅샷). 릴리즈 publish/edit/delete 이벤트가
// 워크플로(.github/workflows/deploy.yml)를 다시 돌려 최신 상태를 유지한다.
//
// 입력 env:
//   GITHUB_TOKEN      — API 인증 (Actions 의 기본 토큰이면 충분; 로컬은 `gh auth token`)
//   GITHUB_REPOSITORY — "owner/repo" (Actions 자동 주입; 로컬 fallback 아래 상수)
//
// 출력: dist/releases.json  { schemaVersion, repo, generatedAt, releases: [...] }

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = process.env.GITHUB_REPOSITORY || 'qwerfunch/logcat-on-releases';
const TOKEN = process.env.GITHUB_TOKEN || '';

// ---------------------------------------------------------------- GitHub API

async function fetchAllReleases() {
  const all = [];
  for (let page = 1; ; page++) {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/releases?per_page=100&page=${page}`,
      {
        headers: {
          accept: 'application/vnd.github+json',
          'x-github-api-version': '2022-11-28',
          'user-agent': 'logcat-on-releases-pages-build',
          ...(TOKEN ? { authorization: `Bearer ${TOKEN}` } : {}),
        },
      },
    );
    if (res.status === 404) return []; // 레포에 릴리즈 0개 — 정상 (empty state)
    if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
    const batch = await res.json();
    all.push(...batch);
    if (batch.length < 100) return all;
  }
}

// ------------------------------------------------- 릴리즈 본문(markdown) 파싱
// 본문은 Keep-a-Changelog 형태 고정: `### Added` 류 헤더 + `- **제목** — 설명`
// 리스트(연속 줄은 2칸 들여쓰기). 범용 마크다운 변환 대신 이 구조를 그대로
// JSON 으로 구조화해 클라이언트가 레퍼런스 디자인 마크업(색점 헤더)으로 렌더한다.

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// 인라인 마크다운 최소 변환: `code`, [link](https://...), **bold**.
// XSS 방지를 위해 항상 escape 먼저 — 릴리즈 본문이 곧 신뢰 경계.
function inlineMd(text) {
  let s = escapeHtml(text);
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  // 이미지는 링크 규칙보다 먼저 처리(안 그러면 `![alt](url)`의 `[alt](url)` 부분이
  // 링크로 오매칭되어 앞의 `!`만 텍스트로 남는다).
  s = s.replace(
    /!\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g,
    '<img src="$2" alt="$1" loading="lazy" class="cursor-zoom-in" data-zoom>',
  );
  s = s.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener">$1</a>',
  );
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return s;
}

function categorize(title) {
  const t = title.trim().toLowerCase();
  if (t.startsWith('add')) return 'added';
  if (t.startsWith('fix')) return 'fixed';
  if (t.startsWith('chang')) return 'changed';
  if (t.startsWith('remov')) return 'removed';
  if (t.startsWith('secur')) return 'security';
  if (t.startsWith('deprecat')) return 'deprecated';
  return 'other';
}

function parseBody(md) {
  const sections = [];
  let cur = null;
  let paraBreak = false;
  const flush = () => {
    if (cur && (cur.items.length || cur.paragraphs.length)) sections.push(cur);
  };
  const open = (title, category) => {
    flush();
    cur = { title, category, items: [], paragraphs: [] };
    paraBreak = false;
  };

  for (const line of String(md || '').replace(/\r\n/g, '\n').split('\n')) {
    const h = line.match(/^(#{1,3})\s+(.+)$/);
    if (h) {
      open(h[2].trim(), h[1] === '###' ? categorize(h[2]) : 'other');
      continue;
    }
    if (!cur) open('', 'other');

    const li = line.match(/^[-*]\s+(.*)$/);
    if (li) {
      cur.items.push(li[1]);
      continue;
    }
    if (/^\s+\S/.test(line) && cur.items.length) {
      // 리스트 항목의 들여쓰기 연속 줄
      cur.items[cur.items.length - 1] += ' ' + line.trim();
      continue;
    }
    if (line.trim() === '') {
      paraBreak = true;
      continue;
    }
    // 일반 문단 (CHANGELOG 미스매치 시 generic fallback 본문 등)
    if (paraBreak || !cur.paragraphs.length) cur.paragraphs.push(line.trim());
    else cur.paragraphs[cur.paragraphs.length - 1] += ' ' + line.trim();
    paraBreak = false;
  }
  flush();

  return sections.map((s) => ({
    title: s.title,
    category: s.category,
    items: s.items.map(inlineMd),
    paragraphs: s.paragraphs.map(inlineMd),
  }));
}

// ----------------------------------------------------------- 자산 분류 규칙
// 파일명 → { platform, kind, arch }. in-app updater 전용 파일(latest.json,
// *.sig, *.app.tar.gz)은 사람에게 무의미하므로 목록에서 제외(null).

function classifyAsset(asset) {
  const n = asset.name.toLowerCase();
  if (n === 'latest.json' || n.endsWith('.sig') || n.endsWith('.app.tar.gz')) return null;

  const arch = /universal/.test(n)
    ? 'universal'
    : /aarch64|arm64/.test(n)
      ? 'arm64'
      : /x64|x86_64|amd64/.test(n)
        ? 'x64'
        : '';
  const base = {
    name: asset.name,
    url: asset.browser_download_url,
    sizeBytes: asset.size,
    arch,
    downloadCount: asset.download_count ?? 0,
  };

  if (n.includes('portable')) {
    const platform = n.includes('macos')
      ? 'macos'
      : n.includes('windows')
        ? 'windows'
        : n.includes('linux')
          ? 'linux'
          : 'other';
    return { ...base, platform, kind: 'portable' };
  }
  if (n.endsWith('.dmg')) return { ...base, platform: 'macos', kind: 'installer' };
  if (n.endsWith('.msi') || n.endsWith('.exe')) return { ...base, platform: 'windows', kind: 'installer' };
  if (n.endsWith('.appimage') || n.endsWith('.deb') || n.endsWith('.rpm'))
    return { ...base, platform: 'linux', kind: 'installer' };
  return { ...base, platform: 'other', kind: 'other' };
}

// 플랫폼별 대표 다운로드(메인 버튼용). 설치 편의 순으로 선호.
function pickPrimary(groups) {
  const prefer = (list, tests) => {
    for (const t of tests) {
      const hit = list.find(t);
      if (hit) return hit;
    }
    return list[0] ?? null;
  };
  return {
    macos: prefer(groups.macos, [(a) => /\.dmg$/i.test(a.name)]),
    windows: prefer(groups.windows, [
      (a) => /-setup\.exe$/i.test(a.name),
      (a) => /\.msi$/i.test(a.name),
      (a) => /\.exe$/i.test(a.name),
    ]),
    linux: prefer(groups.linux, [(a) => /\.appimage$/i.test(a.name), (a) => /\.deb$/i.test(a.name)]),
  };
}

// ------------------------------------------------------------------- 변환

function transformRelease(r) {
  const groups = { macos: [], windows: [], linux: [], other: [] };
  for (const asset of r.assets ?? []) {
    const c = classifyAsset(asset);
    if (c) groups[c.platform].push(c);
  }
  // 그룹 내 표시 순서: 설치 파일 → 포터블 → 기타 (동순위는 이름순)
  const KIND_ORDER = { installer: 0, portable: 1, other: 2 };
  for (const g of Object.values(groups))
    g.sort((a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind] || a.name.localeCompare(b.name));
  const assetCount = Object.values(groups).reduce((n, g) => n + g.length, 0);
  return {
    tag: r.tag_name,
    name: r.name || r.tag_name,
    publishedAt: r.published_at,
    htmlUrl: r.html_url,
    prerelease: r.prerelease,
    sections: parseBody(r.body),
    assets: groups,
    primary: pickPrimary(groups),
    assetCount,
  };
}

// -------------------------------------------------------------------- main

const raw = (await fetchAllReleases())
  .filter((r) => !r.draft)
  .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

const releases = raw.map(transformRelease);

// 전체 다운로드 수 — visible 자산만 합산. updater 파일(latest.json/*.sig/
// *.app.tar.gz)은 classify 단계에서 제외되므로 인앱 업데이트 체크가 카운트를
// 부풀리지 않는다.
const totalDownloads = releases.reduce(
  (n, r) => n + Object.values(r.assets).flat().reduce((m, a) => m + (a.downloadCount || 0), 0),
  0,
);

const out = {
  schemaVersion: 1,
  repo: REPO,
  generatedAt: new Date().toISOString(),
  stats: { totalDownloads },
  releases,
};

await mkdir(join(ROOT, 'dist'), { recursive: true });
await writeFile(join(ROOT, 'dist', 'releases.json'), JSON.stringify(out, null, 2) + '\n');

console.log(
  `releases.json: ${releases.length} release(s), ` +
    `${releases.reduce((n, r) => n + r.assetCount, 0)} visible asset(s) — repo ${REPO}`,
);
