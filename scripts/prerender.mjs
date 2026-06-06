#!/usr/bin/env node
// prerender.mjs — SEO 빌드 스텝. dist/ 조립 후 실행한다.
//
// 릴리즈 노트는 원래 app.js 가 releases.json 으로 클라이언트 렌더하므로
// JS 를 실행하지 않는 크롤러(Bing 일부·소셜 봇 등)에겐 빈 섹션으로 보인다.
// 여기서 최신 릴리즈 + 과거 릴리즈를 dist/index.html 에 정적 HTML 로 베이크해
// 모든 크롤러가 전문을 수집하게 한다. app.js 는 로드 시 동일 구조로 다시
// 그리므로 사용자 경험 변화는 없다 (마크업 클래스는 app.js 와 일치 유지).
//
// 추가로: JSON-LD 에 softwareVersion/dateModified 주입, dist/sitemap.xml 생성
// (ko 기본 URL + ?lang=en, hreflang alternate 포함).

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
// 베이크된 페이지의 기본 언어는 en(글로벌 x-default) — app.js 가 로드되면
// 사용자 언어로 재렌더. 마크업 구조/클래스는 assets/app.js 의 render* 와
// 동일하게 유지할 것. (릴리즈 노트 본문은 원문(한국어) 그대로 — 콘텐츠 언어)

const DOT = {
  added: 'bg-emerald-500',
  fixed: 'bg-amber-500',
  changed: 'bg-blue-500',
  removed: 'bg-red-400',
  security: 'bg-purple-500',
  deprecated: 'bg-stone-400',
  other: 'bg-stone-400',
};
const PLATFORM_ICON = {
  macos: 'ph-fill ph-apple-logo',
  windows: 'ph-fill ph-windows-logo',
  linux: 'ph-fill ph-linux-logo',
  other: 'ph-bold ph-package',
};
const LABEL = { installer: 'Installer', portable: 'Portable', macos: 'macOS', windows: 'Windows', linux: 'Linux', other: 'Other' };

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const humanSize = (b) =>
  b >= 1e9 ? (b / 1e9).toFixed(2) + ' GB' : b >= 1e6 ? (b / 1e6).toFixed(1) + ' MB' : (b / 1e3).toFixed(0) + ' KB';
const fmtDate = (iso) =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Seoul' }).format(
    new Date(iso),
  );

function renderSections(sections) {
  return sections
    .map((s) => {
      const header = s.title
        ? `<h4 class="text-sm font-black text-stone-900 uppercase tracking-wider mb-4 flex items-center gap-2">
             <span class="w-2 h-2 rounded-full ${DOT[s.category] ?? DOT.other}"></span> ${esc(s.title)}
           </h4>`
        : '';
      const paragraphs = s.paragraphs.map((p) => `<p class="mb-3">${p}</p>`).join('');
      const items = s.items.length
        ? `<ul class="list-none space-y-4">${s.items.map((it) => `<li class="relative pl-6">${it}</li>`).join('')}</ul>`
        : '';
      return `<div>${header}${paragraphs}${items}</div>`;
    })
    .join('');
}

function renderAssets(release, { open, anchorId }) {
  if (!release.assetCount) return '';
  const groups = ['macos', 'windows', 'linux', 'other']
    .filter((p) => release.assets[p].length)
    .map(
      (p) => `
      <div>
        <h5 class="flex items-center gap-2 text-sm font-bold text-stone-500 mb-1"><i class="${PLATFORM_ICON[p]}"></i> ${LABEL[p]}</h5>
        <div class="border-y border-stone-200">
          ${release.assets[p]
            .map(
              (a) => `
          <a href="${esc(a.url)}" download class="py-3.5 border-b border-stone-200 last:border-0 hover:bg-stone-200/20 transition-colors flex justify-between items-center gap-3 px-2 group/row">
            <span class="text-stone-700 font-medium truncate">${esc(a.name)}</span>
            <span class="flex items-center gap-3 shrink-0">
              ${a.kind !== 'other' ? `<span class="hidden sm:inline text-xs font-bold px-2 py-0.5 rounded bg-stone-200/70 text-stone-500">${LABEL[a.kind]}</span>` : ''}
              <span class="text-xs text-stone-400 w-16 text-right">${humanSize(a.sizeBytes)}</span>
              <i class="ph ph-download-simple text-lg text-stone-400 group-hover/row:text-[#E67E22]"></i>
            </span>
          </a>`,
            )
            .join('')}
        </div>
      </div>`,
    )
    .join('');
  return `
    <div class="pt-8 mt-12 border-t border-stone-300" ${anchorId ? `id="${anchorId}"` : ''}>
      <details class="group" ${open ? 'open' : ''}>
        <summary class="flex items-center cursor-pointer list-none select-none mb-6">
          <i class="ph-bold ph-caret-right text-stone-400 mr-3 transition-transform group-open:rotate-90"></i>
          <h4 class="text-lg font-bold text-stone-900">Assets</h4>
          <span class="ml-3 bg-stone-200/70 text-stone-600 text-xs font-bold px-2.5 py-0.5 rounded-full">${release.assetCount}</span>
        </summary>
        <div class="space-y-6">${groups}</div>
      </details>
    </div>`;
}

const latestBadge = `<span class="bg-[#E67E22]/10 text-[#E67E22] border border-[#E67E22]/20 text-xs px-2.5 py-1 rounded-md font-bold tracking-wide">Latest</span>`;

function renderLatest(r) {
  return `
    <div class="pb-6 border-b border-stone-300 mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
      <div class="flex items-center gap-3">
        <h3 class="text-2xl font-black text-stone-900 tracking-tight">${esc(r.name)}</h3>
        ${latestBadge}
      </div>
      <span class="text-sm text-stone-400 sm:ml-auto">${fmtDate(r.publishedAt)}</span>
    </div>
    <div class="md text-[15px] text-stone-700 space-y-10 pl-2">
      ${renderSections(r.sections)}
      ${renderAssets(r, { open: true, anchorId: 'latest-assets' })}
    </div>`;
}

function renderOlder(r) {
  return `
    <details class="group/old border-b border-stone-200">
      <summary class="flex items-center gap-3 py-5 cursor-pointer list-none select-none">
        <i class="ph-bold ph-caret-right text-stone-400 transition-transform group-open/old:rotate-90"></i>
        <h3 class="text-lg font-black text-stone-900 tracking-tight">${esc(r.name)}</h3>
        <span class="text-sm text-stone-400 ml-auto shrink-0">${fmtDate(r.publishedAt)}</span>
      </summary>
      <div class="md text-[15px] text-stone-700 space-y-10 pl-8 pb-10">
        ${renderSections(r.sections)}
        ${renderAssets(r, { open: false })}
      </div>
    </details>`;
}

// ------------------------------------------------------------ index.html 변환

// 1) 릴리즈 노트 베이크
if (releases.length) {
  const [latest, ...older] = releases;
  const baked =
    renderLatest(latest) +
    (older.length ? `<div class="mt-16">${older.map(renderOlder).join('')}</div>` : '');
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
