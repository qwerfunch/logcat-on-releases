#!/usr/bin/env node
// prerender.mjs — SEO 빌드 스텝. dist/ 조립 후 실행한다.
//
// 릴리즈 노트는 원래 app.js 가 releases.json 으로 클라이언트 렌더하므로
// JS 를 실행하지 않는 크롤러(Bing 일부·소셜 봇 등)에겐 빈 섹션으로 보인다.
// 여기서 최신 릴리즈 + 과거 릴리즈를 dist/index.html 에 정적 HTML 로 베이크해
// 모든 크롤러가 전문을 수집하게 한다. app.js 는 로드 시 동일 구조로 다시 그린다.
//
// ★ 아래 render* 는 assets/app.js 의 render* 와 마크업/클래스가 1:1 이어야 한다.
//   한쪽만 고치면 크롤러가 보는 화면과 사용자가 보는 화면이 갈라진다.
//   (라벨은 여기서 영어 고정 — 베이크된 페이지의 기본 언어는 en/x-default)
//
// 추가로: JSON-LD 에 softwareVersion/dateModified 주입, dist/sitemap.xml 생성.

import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const BASE = 'https://qwerfunch.github.io/logcat-on-releases/';

const data = JSON.parse(await readFile(join(DIST, 'releases.json'), 'utf8'));
const releases = data.releases ?? [];
let html = await readFile(join(DIST, 'index.html'), 'utf8');

// ---------------------------------------------------- 정적 렌더 (en 라벨 고정)

const DOT = {
  added: 'dot-added', fixed: 'dot-fixed', changed: 'dot-changed',
  removed: 'dot-removed', security: 'dot-security', deprecated: 'dot-other', other: 'dot-other',
};
const LABEL = {
  installer: 'Installer', portable: 'Portable',
  macos: 'macOS', windows: 'Windows', linux: 'Linux', other: 'Other',
};

const CARET = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
const DL_ICON = '<svg class="adl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';
const OS_ICON = {
  macos: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.7c0-2.4 2-3.6 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.6.9s-1.9-.9-3.1-.8c-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.1 1.2 9.5.8 1.1 1.7 2.4 3 2.4 1.2 0 1.6-.8 3.1-.8s1.9.8 3.1.7c1.3 0 2.1-1.2 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.6-1-2.6-3.8zM14 5.2c.7-.8 1.1-1.9 1-3-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.5z"/></svg>',
  windows: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 5.5l7.5-1v7H3zM11.5 4.3L21 3v8.5h-9.5zM3 12.5h7.5v7L3 18.5zM11.5 12.5H21V21l-9.5-1.3z"/></svg>',
  linux: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-2 0-3 1.7-3 3.6 0 1.4-.3 2.2-1.1 3.3C6.6 10.6 6 12 6 13.8c0 1-.6 1.9-1 2.6-.6 1-.3 2.1 1 2.4 1 .2 2 .6 2.8 1.2.9.7 1.9 1 3.2 1s2.3-.3 3.2-1c.8-.6 1.8-1 2.8-1.2 1.3-.3 1.6-1.4 1-2.4-.4-.7-1-1.6-1-2.6 0-1.8-.6-3.2-1.9-4.9-.8-1.1-1.1-1.9-1.1-3.3C15 3.7 14 2 12 2z"/></svg>',
  other: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>',
};

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const humanSize = (b) =>
  b >= 1e9 ? (b / 1e9).toFixed(2) + ' GB' : b >= 1e6 ? (b / 1e6).toFixed(1) + ' MB' : (b / 1e3).toFixed(0) + ' KB';
const fmtDate = (iso) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Seoul',
  }).format(new Date(iso));

function renderSections(sections) {
  return sections
    .map((s) => {
      const header = s.title ? `<h4><u class="${DOT[s.category] ?? DOT.other}"></u>${esc(s.title)}</h4>` : '';
      const paragraphs = s.paragraphs.map((p) => `<p>${p}</p>`).join('');
      const items = s.items.length ? `<ul>${s.items.map((it) => `<li>${it}</li>`).join('')}</ul>` : '';
      return `<div class="rel-sec">${header}${paragraphs}${items}</div>`;
    })
    .join('');
}

function renderAssetRow(a) {
  return `<a class="arow" href="${esc(a.url)}" download>
      <span class="an">${esc(a.name)}</span>
      ${a.kind !== 'other' ? `<span class="ak">${LABEL[a.kind]}</span>` : ''}
      <span class="as">${humanSize(a.sizeBytes)}</span>${DL_ICON}
    </a>`;
}

function renderAssets(release, { open, anchorId }) {
  if (!release.assetCount) return '';
  const groups = ['macos', 'windows', 'linux', 'other']
    .filter((p) => release.assets[p].length)
    .map((p) => `<div class="agroup"><h5>${OS_ICON[p]}${LABEL[p]}</h5>${release.assets[p].map(renderAssetRow).join('')}</div>`)
    .join('');

  return `<div class="rel-assets"${anchorId ? ` id="${anchorId}"` : ''}>
      <details class="assets"${open ? ' open' : ''}>
        <summary><span class="rel-cv">${CARET}</span>Assets<span class="assets-n">${release.assetCount}</span></summary>
        <div>${groups}</div>
      </details>
    </div>`;
}

function renderBadge(release, isLatest) {
  if (release.prerelease) return '<span class="tag pre">Pre-release</span>';
  if (isLatest) return '<span class="tag">Latest</span>';
  return '';
}

function renderLatest(release) {
  return `<div class="rel-latest">
      <div class="rel-top">
        ${renderBadge(release, true)}
        <h3>${esc(release.name)}</h3>
        <span class="rel-when">${fmtDate(release.publishedAt)}</span>
      </div>
      <div class="rel-body md">
        ${renderSections(release.sections)}
        ${renderAssets(release, { open: true, anchorId: 'latest-assets' })}
      </div>
    </div>`;
}

function renderOlder(release) {
  return `<details class="rel-old">
      <summary>
        <span class="rel-cv">${CARET}</span>${esc(release.name)}
        ${renderBadge(release, false)}
        <span class="rel-when">${fmtDate(release.publishedAt)}</span>
      </summary>
      <div class="rel-body md">
        ${renderSections(release.sections)}
        ${renderAssets(release, { open: false })}
      </div>
    </details>`;
}

// ------------------------------------------------------------ index.html 변환

// 1) 릴리즈 노트 베이크
if (releases.length) {
  const [latest, ...older] = releases;
  const baked = renderLatest(latest) + older.map(renderOlder).join('');
  const marker = '<div id="releases"></div>';
  if (!html.includes(marker)) throw new Error('prerender: <div id="releases"></div> marker not found');
  html = html.replace(marker, `<div id="releases">${baked}</div>`);
}

// 2) JSON-LD 에 최신 버전/날짜 주입
html = html.replace(
  /(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/,
  (_, openTag, body, closeTag) => {
    const ld = JSON.parse(body);
    if (releases[0]) {
      ld.softwareVersion = releases[0].tag.replace(/^v/, '');
      ld.dateModified = releases[0].publishedAt.slice(0, 10);
    }
    return `${openTag}\n    ${JSON.stringify(ld, null, 2).replace(/\n/g, '\n    ')}\n    ${closeTag}`;
  },
);

await writeFile(join(DIST, 'index.html'), html);

// ------------------------------------------------------------- sitemap.xml

const lastmod = (releases[0]?.publishedAt ?? data.generatedAt ?? new Date().toISOString()).slice(0, 10);
const alternates = `
    <xhtml:link rel="alternate" hreflang="en" href="${BASE}"/>
    <xhtml:link rel="alternate" hreflang="ko" href="${BASE}?lang=ko"/>
    <xhtml:link rel="alternate" hreflang="ja" href="${BASE}?lang=ja"/>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${BASE}?lang=zh"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}"/>`;
const urlEntry = (loc) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>${alternates}
  </url>`;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[BASE, `${BASE}?lang=ko`, `${BASE}?lang=ja`, `${BASE}?lang=zh`].map(urlEntry).join('\n')}
</urlset>
`;
await writeFile(join(DIST, 'sitemap.xml'), sitemap);

console.log(
  `prerender: ${releases.length ? `baked ${releases.length} release(s) into index.html` : 'no releases — skipped bake'}, ` +
    `sitemap.xml written (lastmod ${lastmod})`,
);
