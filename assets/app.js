// app.js — releases.json(빌드 타임 베이크)을 읽어 페이지를 렌더한다.
// 책임: i18n(4개 언어 자동감지+토글), 다크/라이트 테마, OS 감지 메인 다운로드,
//       릴리즈 노트 렌더, 히어로 라이브 로그 데모, 데모 밴드 영상.
//
// 렌더 함수(render*)의 마크업/클래스는 scripts/prerender.mjs 와 1:1 로 유지할 것.
// 한쪽만 고치면 JS 미실행 크롤러가 보는 화면과 사용자가 보는 화면이 갈라진다.
import { STRINGS, LANG_NAMES, OS_NAMES } from './i18n.js';

const LANGS = ['en', 'ko', 'ja', 'zh'];
const HTML_LANG = { en: 'en', ko: 'ko', ja: 'ja', zh: 'zh-CN' };
const DATE_LOCALE = { en: 'en-US', ko: 'ko-KR', ja: 'ja-JP', zh: 'zh-CN' };
const SITE_BASE = 'https://qwerfunch.github.io/logcat-on-releases/';

const LANG_KEY = 'logcaton.lang';
const THEME_KEY = 'logcaton.theme';
// GoatCounter 사이트 코드. 비어 있으면 방문 집계·표시 전체가 비활성.
const GOATCOUNTER_CODE = 'logcaton';
const THEME_COLOR = { dark: '#07080B', light: '#FFFCF4' };

const state = { lang: detectLang(), os: detectOS(), data: null };
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ------------------------------------------------------------------ helpers

const $ = (id) => document.getElementById(id);

function t(key) {
  return STRINGS[state.lang][key] ?? STRINGS.en[key] ?? key;
}

function detectOSLang() {
  const nav = (navigator.language || 'en').toLowerCase();
  if (nav.startsWith('ko')) return 'ko';
  if (nav.startsWith('ja')) return 'ja';
  if (nav.startsWith('zh')) return 'zh'; // 번체 사용자도 간체로 폴백
  return 'en';
}

function detectLang() {
  // 우선순위: URL ?lang= (hreflang 검색 유입) → 저장된 선택 → OS 언어
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  if (LANGS.includes(urlLang)) return urlLang;
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (LANGS.includes(saved)) return saved;
  } catch { /* 프라이빗 모드 */ }
  return detectOSLang();
}

// 드롭다운 순서 개인화 — OS 언어를 맨 위로. 기준은 현재 선택이 아니라 OS 언어(1회 고정)
// — 선택할 때마다 재배열되면 공간 기억이 깨진다.
function personalizeLangMenu() {
  const item = document.querySelector(`#langMenu [data-lang="${detectOSLang()}"]`)?.closest('li');
  item?.parentElement.prepend(item);
}

function detectOS() {
  const p = (navigator.userAgentData?.platform || navigator.platform || '').toLowerCase();
  const ua = navigator.userAgent.toLowerCase();
  if (/android|iphone|ipad|ipod/.test(ua)) return null; // 데스크톱 빌드만 제공
  if (p.includes('mac') || ua.includes('mac')) return 'macos';
  if (p.includes('win') || ua.includes('win')) return 'windows';
  if (p.includes('linux') || ua.includes('x11')) return 'linux';
  return null;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function humanSize(b) {
  if (b >= 1e9) return (b / 1e9).toFixed(2) + ' GB';
  if (b >= 1e6) return (b / 1e6).toFixed(1) + ' MB';
  if (b >= 1e3) return (b / 1e3).toFixed(0) + ' KB';
  return b + ' B';
}

function formatDate(iso) {
  if (!iso) return '';
  return new Intl.DateTimeFormat(DATE_LOCALE[state.lang], {
    year: 'numeric', month: 'long', day: 'numeric',
  }).format(new Date(iso));
}

// -------------------------------------------------------------------- 테마
// 기본은 다크. <head> 인라인 스크립트가 렌더 전에 이미 확정해 두므로 여기서는
// 토글과 저장만 담당한다.

function setTheme(next, x, y) {
  const root = document.documentElement;
  root.style.setProperty('--wx', x + 'px');
  root.style.setProperty('--wy', y + 'px');
  const apply = () => {
    root.setAttribute('data-theme', next);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[next]);
    try { localStorage.setItem(THEME_KEY, next); } catch { /* 프라이빗 모드 */ }
  };
  if (document.startViewTransition && !reduceMotion) document.startViewTransition(apply);
  else apply();
}

function setupTheme() {
  const btn = $('themeBtn');
  if (!btn) return;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLOR[document.documentElement.getAttribute('data-theme')] ?? THEME_COLOR.dark);
  btn.addEventListener('click', () => {
    const r = btn.getBoundingClientRect();
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next, r.left + r.width / 2, r.top + r.height / 2);
  });
}

// ----------------------------------------------------------------- i18n 적용

// h1 은 사전 값에 <br> 이 들어 있다. 줄마다 마스크 리빌을 걸기 위해
// 각 줄을 .ln > span 으로 감싼다 — 사전에는 마크업을 넣지 않는다.
function wrapHeroLines() {
  const h1 = $('heroHeading');
  if (!h1) return;
  const lines = h1.innerHTML.split(/<br\s*\/?>/i);
  h1.innerHTML = lines
    .map((line, i) => `<span class="ln"><span style="animation-delay:${i * 0.09}s">${line.trim()}</span></span>`)
    .join('');
}

// {tag}/{size} 처럼 데이터가 필요한 문자열은 사전 적용 뒤에 따로 채운다.
function applyDynamicText() {
  const latest = state.data?.releases?.[0];
  const badge = $('heroBadge');
  if (badge) badge.textContent = t('hero.badge').replace('{tag}', latest?.tag ?? 'macOS');

  const meta = $('primaryDownloadMeta');
  if (meta && latest) {
    const primary = state.os ? latest.primary[state.os] : null;
    meta.innerHTML = t('hero.meta').replace('{size}', primary ? humanSize(primary.sizeBytes) : latest.tag);
  }
}

function applyLang() {
  document.documentElement.lang = HTML_LANG[state.lang];
  document.title = t('meta.title');
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'));
  $('langToggleLabel').textContent = LANG_NAMES[state.lang];
  for (const btn of document.querySelectorAll('#langMenu [data-lang]')) {
    btn.classList.toggle('sel', btn.dataset.lang === state.lang);
  }
  // SEO: 언어별 URL(기본=en, 그 외 ?lang=xx) 및 canonical 을 현재 언어와 동기화
  try {
    const url = new URL(window.location.href);
    if (state.lang === 'en') url.searchParams.delete('lang');
    else url.searchParams.set('lang', state.lang);
    window.history.replaceState(null, '', url);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', state.lang === 'en' ? SITE_BASE : `${SITE_BASE}?lang=${state.lang}`);
  } catch { /* file:// 등 */ }

  for (const el of document.querySelectorAll('[data-i18n]')) {
    el.innerHTML = t(el.dataset.i18n); // 사전은 이 레포 코드 — 신뢰 경계 안
  }
  for (const el of document.querySelectorAll('[data-i18n-title]')) {
    const label = t(el.dataset.i18nTitle);
    el.title = label;
    el.setAttribute('aria-label', label);
  }
  wrapHeroLines();
  applyDynamicText();
  // 날짜·라벨 등 언어 의존 동적 콘텐츠는 통째로 다시 렌더
  if (state.data) render();
}

// ------------------------------------------------------------- 릴리즈 렌더링
// prerender.mjs 와 동일한 마크업을 낼 것.

const DOT = {
  added: 'dot-added', fixed: 'dot-fixed', changed: 'dot-changed',
  removed: 'dot-removed', security: 'dot-security', deprecated: 'dot-other', other: 'dot-other',
};

const CARET = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
const DL_ICON = '<svg class="adl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';
const OS_ICON = {
  macos: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.7c0-2.4 2-3.6 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.6.9s-1.9-.9-3.1-.8c-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.1 1.2 9.5.8 1.1 1.7 2.4 3 2.4 1.2 0 1.6-.8 3.1-.8s1.9.8 3.1.7c1.3 0 2.1-1.2 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.6-1-2.6-3.8zM14 5.2c.7-.8 1.1-1.9 1-3-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.5z"/></svg>',
  windows: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 5.5l7.5-1v7H3zM11.5 4.3L21 3v8.5h-9.5zM3 12.5h7.5v7L3 18.5zM11.5 12.5H21V21l-9.5-1.3z"/></svg>',
  linux: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-2 0-3 1.7-3 3.6 0 1.4-.3 2.2-1.1 3.3C6.6 10.6 6 12 6 13.8c0 1-.6 1.9-1 2.6-.6 1-.3 2.1 1 2.4 1 .2 2 .6 2.8 1.2.9.7 1.9 1 3.2 1s2.3-.3 3.2-1c.8-.6 1.8-1 2.8-1.2 1.3-.3 1.6-1.4 1-2.4-.4-.7-1-1.6-1-2.6 0-1.8-.6-3.2-1.9-4.9-.8-1.1-1.1-1.9-1.1-3.3C15 3.7 14 2 12 2z"/></svg>',
  other: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>',
};

function renderSections(sections) {
  return sections
    .map((s) => {
      const header = s.title
        ? `<h4><u class="${DOT[s.category] ?? DOT.other}"></u>${escapeHtml(s.title)}</h4>`
        : '';
      const paragraphs = s.paragraphs.map((p) => `<p>${p}</p>`).join('');
      const items = s.items.length ? `<ul>${s.items.map((it) => `<li>${it}</li>`).join('')}</ul>` : '';
      return `<div class="rel-sec">${header}${paragraphs}${items}</div>`;
    })
    .join('');
}

function renderAssetRow(a) {
  return `<a class="arow" href="${escapeHtml(a.url)}" download>
      <span class="an">${escapeHtml(a.name)}</span>
      ${a.kind !== 'other' ? `<span class="ak">${t('kind.' + a.kind)}</span>` : ''}
      <span class="as">${humanSize(a.sizeBytes)}</span>${DL_ICON}
    </a>`;
}

function renderAssets(release, { open, anchorId }) {
  if (!release.assetCount) return '';
  const groups = ['macos', 'windows', 'linux', 'other']
    .filter((p) => release.assets[p].length)
    .map((p) => `<div class="agroup"><h5>${OS_ICON[p]}${t('group.' + p)}</h5>${release.assets[p].map(renderAssetRow).join('')}</div>`)
    .join('');

  return `<div class="rel-assets"${anchorId ? ` id="${anchorId}"` : ''}>
      <details class="assets"${open ? ' open' : ''}>
        <summary><span class="rel-cv">${CARET}</span>${t('assets.title')}<span class="assets-n">${release.assetCount}</span></summary>
        <div>${groups}</div>
      </details>
    </div>`;
}

function renderBadge(release, isLatest) {
  if (release.prerelease) return `<span class="tag pre">${t('releases.prerelease')}</span>`;
  if (isLatest) return `<span class="tag">${t('releases.latest')}</span>`;
  return '';
}

function renderLatest(release) {
  return `<div class="rel-latest">
      <div class="rel-top">
        ${renderBadge(release, true)}
        <h3>${escapeHtml(release.name)}</h3>
        <span class="rel-when">${formatDate(release.publishedAt)}</span>
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
        <span class="rel-cv">${CARET}</span>${escapeHtml(release.name)}
        ${renderBadge(release, false)}
        <span class="rel-when">${formatDate(release.publishedAt)}</span>
      </summary>
      <div class="rel-body md">
        ${renderSections(release.sections)}
        ${renderAssets(release, { open: false })}
      </div>
    </details>`;
}

function render() {
  const releases = state.data?.releases ?? [];
  const emptyEl = $('emptyState');
  const listEl = $('releases');
  const downloadEl = $('downloadArea');

  if (!releases.length) {
    emptyEl.classList.remove('hidden');
    listEl.innerHTML = '';
    downloadEl.classList.add('hidden');
    $('statsLine').classList.add('hidden');
    return;
  }
  emptyEl.classList.add('hidden');

  const [latest, ...older] = releases;
  listEl.innerHTML = renderLatest(latest) + older.map(renderOlder).join('');

  renderDownloadButton(latest, downloadEl);
  renderOsCards(latest);
  applyDynamicText();
}

// OS 자동감지 메인 다운로드 버튼. 감지 실패/해당 OS 자산 없음 → "모든 다운로드 보기".
function renderDownloadButton(latest, downloadEl) {
  const btn = $('primaryDownload');
  const label = $('primaryDownloadLabel');
  const primary = state.os ? latest.primary[state.os] : null;

  if (primary) {
    btn.href = primary.url;
    btn.setAttribute('download', '');
    label.textContent = t('download.for').replace('{os}', OS_NAMES[state.os]);
  } else {
    btn.href = '#latest-assets';
    btn.removeAttribute('download');
    label.textContent = t('download.viewAll');
  }
  $('otherPlatforms').innerHTML = t('download.otherPlatforms');
  downloadEl.classList.remove('hidden');
  downloadEl.classList.add('flex');
  renderStats(latest);
}

// 다운로드 섹션의 OS 카드 3장 — 해당 OS 빌드가 없으면 카드를 숨긴다.
function renderOsCards(latest) {
  for (const os of ['macos', 'windows', 'linux']) {
    const el = $('os' + os[0].toUpperCase() + os.slice(1));
    if (!el) continue;
    const p = latest.primary[os];
    const small = el.querySelector('small');
    if (!p) { el.classList.add('hidden'); continue; }
    el.classList.remove('hidden');
    el.href = p.url;
    el.setAttribute('download', '');
    const ext = p.name.includes('.') ? '.' + p.name.split('.').pop() : '';
    small.textContent = `${ext} · ${humanSize(p.sizeBytes)}`;
  }
}

// ------------------------------------------------------- 누적 스탯 (다운로드·방문)

let visitsCache = null; // GoatCounter TOTAL — 세션당 1회만 fetch
let gcInjected = false;

// 방문 카운트 스크립트 주입(멱등) — 집계는 릴리즈 유무와 무관하게 모든 방문에서
// 무조건 1회 실행돼야 한다.
function ensureGoatCounter() {
  if (!GOATCOUNTER_CODE || gcInjected) return;
  gcInjected = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://gc.zgo.at/count.js';
  s.dataset.goatcounter = `https://${GOATCOUNTER_CODE}.goatcounter.com/count`;
  document.body.appendChild(s);
}

// 숫자를 0 에서 목표까지 한 번만 굴린다. 값이 바뀌면(언어 전환 등) 애니메이션 없이 갱신.
const counted = new WeakSet();
function setNumber(el, value, format) {
  if (counted.has(el) || reduceMotion) { el.textContent = format(value); return; }
  counted.add(el);
  let start = null;
  const run = (ts) => {
    start ??= ts;
    const p = Math.min((ts - start) / 1400, 1);
    el.textContent = format(Math.floor(value * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(run);
  };
  requestAnimationFrame(run);
}

const fmtNum = (n) => new Intl.NumberFormat(DATE_LOCALE[state.lang]).format(n);

// count 가 숫자로 확정되기 전에는 숨김 — 그 외에는 0 이라도 항상 표시한다.
function showStat(id, count) {
  const el = $(id);
  if (!el) return;
  if (typeof count !== 'number' || Number.isNaN(count)) { el.classList.add('hidden'); return; }
  setNumber(el.querySelector('b'), count, fmtNum);
  el.classList.remove('hidden');
  $('statsLine').classList.remove('hidden');
  $('statsLine').classList.add('flex');
}

function renderStats(latest) {
  const ver = $('statVersion');
  if (ver && latest) {
    ver.querySelector('b').textContent = latest.tag.replace(/^v/, '');
    ver.classList.remove('hidden');
    $('statsLine').classList.remove('hidden');
    $('statsLine').classList.add('flex');
  }

  showStat('statDownloads', state.data?.stats?.totalDownloads);

  // 빌드 타임에 구워진 값을 먼저 쓴다 — 광고 차단기가 goatcounter.com 을 막아도
  // (애널리틱스 도메인은 대부분의 차단 목록에 있다) 숫자는 항상 보인다.
  const baked = state.data?.stats?.visits;
  showStat('statVisits', visitsCache ?? baked);

  if (!GOATCOUNTER_CODE) return;
  ensureGoatCounter();
  if (visitsCache !== null) return;
  // 차단되지 않은 방문자에게는 최신값으로 갱신 — 실패해도 구운 값이 남는다.
  fetch(`https://${GOATCOUNTER_CODE}.goatcounter.com/counter/TOTAL.json`)
    .then((res) => (res.ok ? res.json() : null))
    .then((json) => {
      if (!json) return;
      const n = parseInt(String(json.count).replace(/\D/g, ''), 10);
      if (Number.isNaN(n)) return;
      visitsCache = n;
      showStat('statVisits', n);
    })
    .catch(() => { /* 차단·네트워크 실패 — 구운 값 유지 */ });
}

// ------------------------------------------------------ 히어로 라이브 로그 데모
// 실제 앱 UI 를 저해상도로 재현한다. 여기 문자열은 제품 UI 라 번역하지 않는다.

function setupHeroDemo() {
  const stream = $('stream'), inner = $('streamInner');
  if (!stream || !inner) return;
  const mm = $('mm'), mmView = $('mmView'), sThumb = $('sThumb');
  const bell = $('bell'), bellCnt = $('bellCnt');
  const sigPanel = $('sigPanel'), spCnt = $('spCnt'), spFatal = $('spFatal');
  const cnt = $('cnt'), cnt2 = $('cnt2'), statText = $('statText');

  const NORMAL = [
    ['D', 'SatelliteControll', 'getConfigParser: domain=satellite', 1083, 1220],
    ['V', 'TelephonyConfigUp', 'satelliteConfigParser is not ready', 1083, 1220],
    ['D', 'SatelliteControll', 'isSatelliteAttachSupportedViaConfigupdater: return null', 1083, 1220],
    ['I', 'adbd', "service requested 'shell,v2,raw:cat /proc/stat'", 495, 495],
    ['D', 'IpClient/wlan0', 'interfaceLinkStateChanged: ifindex 16 up', 1058, 1188],
    ['V', 'SatelliteControll', 'getCarrierRoamingNtnConnectType: config: null', 1083, 1220],
    ['I', 'Ads', 'SDK version: afma-sdk-a-v260480999.254715000.1', 8244, 8713],
    ['W', 'skia', 'AGTM parsing failed flags.readFromStream() at 159', 492, 574],
    ['D', 'TestCrash', 'MainActivity onResume()', 3594, 3594],
    ['I', 'HalDevMgr', 'bestIfaceCreationProposal is null', 651, 833],
    ['V', 'Choreographer', 'doFrame 16.6ms', 3594, 3594],
    ['D', 'OkHttp', '--> GET /v1/session (0-byte body)', 3594, 3612],
    ['I', 'TestCrash', 'button clicked — dispatching', 3594, 3594],
    ['W', 'ActivityThread', 'Skipped 34 frames! main thread busy', 3594, 3594],
  ];
  const CRASH = [
    ['D', 'AndroidRuntime', 'Shutting down VM', 3594, 3594],
    ['E', 'AndroidRuntime', 'FATAL EXCEPTION: main', 3594, 3594, true],
    ['E', 'AndroidRuntime', 'Process: com.qwerfunch.testcrash, PID: 3594', 3594, 3594],
    ['E', 'AndroidRuntime', 'java.lang.RuntimeException: Test crash', 3594, 3594],
    ['E', 'AndroidRuntime', '  at com.qwerfunch.testcrash.MainActivity.onCreate(MainActivity.kt:23)', 3594, 3594],
    ['E', 'AndroidRuntime', '  at android.view.View.performClick(View.java:8241)', 3594, 3594],
  ];
  const LV = { V: 'v', D: 'd', I: 'i', W: 'w', E: 'e' };
  // 태그별 고정 색 — 앱의 "태그 색상" 기능처럼 태그마다 다른 색이 붙는다
  const TAGC = {
    SatelliteControll: '--tg-6', TelephonyConfigUp: '--tg-4', adbd: '--tg-2',
    'IpClient/wlan0': '--tg-2', Ads: '--tg-1', skia: '--tg-3', TestCrash: '--tg-1',
    HalDevMgr: '--tg-2', Choreographer: '--tg-4', OkHttp: '--tg-5',
    ActivityThread: '--tg-3', AndroidRuntime: '--tg-5',
  };

  let signals = 3, fatals = 1, sigTimers = [], paused = false;
  let n = 1470, total = 0, tick = 0, inCrash = -1;
  let pendingFatal = null, pendingTick = null, sigDelay = 0;
  let scrollPos = 0, jumpIdx = 0, cycleMode = 0;   // 0 = 트레이 사이클, 1 = 미니맵 사이클
  // 크래시 주기(30행 + 블록 6행 = 36행)의 2.5배. 발생 지점이 항상 2건 남아 있어야
  // "이전 발생 지점으로 순차 이동"이 매 사이클 성립한다.
  const BUFFER_ROWS = 90;
  const viewH = () => stream.clientHeight;
  const maxScroll = () => Math.max(0, inner.offsetHeight - viewH());

  function setScroll(y, dur) {
    scrollPos = Math.max(0, Math.min(y, maxScroll()));
    inner.style.transition = `transform ${dur}ms cubic-bezier(.16,1,.3,1)`;
    inner.style.transform = `translateY(${-scrollPos}px)`;
    syncIndicators();
  }
  const tail = (dur = 140) => setScroll(maxScroll(), dur);

  // 미니맵 뷰포트 박스와 오른쪽 스크롤바 썸을 현재 위치에 맞춘다
  function syncIndicators() {
    const ih = inner.offsetHeight || 1, vh = viewH();
    const pct = Math.min(1, vh / ih), top = (scrollPos / ih) * 100;
    for (const el of [mmView, sThumb]) {
      el.style.height = Math.max(8, pct * 100) + '%';
      el.style.top = top + '%';
    }
  }

  // 미니맵 마커 — 버퍼 전체에서 그 시그널이 어디쯤인지 점으로 표시. 위치는 행을 따라간다.
  function syncTicks() {
    const ih = inner.offsetHeight || 1;
    for (const el of mm.querySelectorAll('.tick')) {
      const row = el._row;
      if (!row || !row.isConnected) { el.remove(); continue; }
      el.style.top = ((row.offsetTop + row.offsetHeight / 2) / ih * 100) + '%';
    }
  }
  function addTick(row, varName) {
    const el = document.createElement('div');
    el.className = 'tick';
    el.style.background = `var(${varName})`;
    el._row = row;
    mm.appendChild(el);
    return el;
  }

  function addRow(lv, tag, msg, pid, tid, fatal) {
    const d = document.createElement('div');
    // .fatal 은 크래시 블록의 모든 E 행에 붙지만 .sig 는 시그널 앵커 행 하나뿐이다.
    // 점프 대상은 .sig — 아니면 같은 크래시의 옆줄로 이동해 움직임이 안 보인다.
    d.className = 'row ' + LV[lv] + (fatal ? ' fatal sig flash' : (lv === 'E' && inCrash >= 0 ? ' fatal' : ''));
    d.style.setProperty('--tgc', 'var(' + (TAGC[tag] || '--tg-6') + ')');
    d.innerHTML =
      `<span class="n">${n++}</span><span class="lv">${lv}</span>` +
      `<span class="pid">${pid}</span><span class="tid">${tid}</span>` +
      `<span class="tg">${escapeHtml(tag)}</span><span class="ms">${escapeHtml(msg)}</span>` +
      (fatal ? '<span class="badge">FATAL EXCEPTION</span>' : '');
    inner.appendChild(d);
    while (inner.children.length > BUFFER_ROWS) inner.removeChild(inner.firstChild);
    const shown = (++total + 1470).toLocaleString();
    cnt.textContent = shown;
    cnt2.textContent = shown;
    syncTicks();
    if (!paused) tail();
    return d;
  }

  // 목록이 실제로 그 행까지 스크롤되고 도착한 행이 잠깐 밝아진다 —
  // "이동했다"는 느낌은 이 두 가지로만 만들어진다.
  function jumpTo(row) {
    if (!row || !row.isConnected) return;
    setScroll(row.offsetTop + row.offsetHeight / 2 - viewH() / 2, 620);
    row.classList.remove('landed'); void row.offsetWidth; row.classList.add('landed');
  }

  // 크래시가 뜨는 순간: 미니맵에 마커가 찍히고 벨이 울린다. 로그는 계속 흐른다.
  function markSignal(fatalRow) {
    const el = addTick(fatalRow, '--app-crash');
    syncTicks();
    signals++; fatals++;
    bellCnt.textContent = signals;
    spCnt.textContent = fatals;
    bell.classList.remove('ring'); bellCnt.classList.remove('pop');
    void bell.offsetWidth;
    bell.classList.add('ring'); bellCnt.classList.add('pop');
    return el;
  }

  // 시그널로 가는 길은 두 개다. 한 사이클에 몰아넣으면 트레이가 열린 채로 미니맵을
  // 누르게 되어 "미니맵 점만으로도 이동된다"가 드러나지 않는다 — 사이클마다 교대.
  function raiseSignal(fatalRow, tickEl) {
    sigTimers.forEach(clearTimeout); sigTimers = [];
    paused = true;                       // 앱에서도 Pause 를 눌러 크래시를 보는 흐름
    statText.textContent = 'paused';

    const useTray = cycleMode === 0;
    cycleMode ^= 1;
    const done = (ms) => sigTimers.push(setTimeout(() => {
      sigPanel.classList.remove('on');
      tickEl.classList.remove('hot', 'press');
      paused = false;
      statText.textContent = 'ready';
      tail(600);                         // 다시 최신 로그로 복귀
    }, ms));

    if (useTray) {
      // 사이클 A — 트레이를 펼쳐 시그널 이름을 누른다 → 이전 발생 지점으로 순차 이동
      const targets = [...inner.querySelectorAll('.row.sig')];
      jumpIdx = targets.indexOf(fatalRow);
      sigTimers.push(setTimeout(() => sigPanel.classList.add('on'), 420));
      sigTimers.push(setTimeout(() => {
        spFatal.classList.remove('tap'); void spFatal.offsetWidth; spFatal.classList.add('tap');
        jumpIdx = targets.length > 1 ? (jumpIdx - 1 + targets.length) % targets.length : jumpIdx;
        jumpTo(targets[jumpIdx] || fatalRow);
      }, 1200));
      done(3400);
    } else {
      // 사이클 B — 트레이는 접힌 채, 왼쪽 미니맵 점만 눌러 바로 이동
      sigTimers.push(setTimeout(() => tickEl.classList.add('hot'), 500));
      sigTimers.push(setTimeout(() => tickEl.classList.add('press'), 1100));
      sigTimers.push(setTimeout(() => { tickEl.classList.remove('press'); jumpTo(fatalRow); }, 1250));
      sigTimers.push(setTimeout(() => tickEl.classList.remove('hot'), 2400));
      done(3100);
    }
  }

  function step() {
    // 탭이 가려져 있으면 굴리지 않는다 — 백그라운드 CPU 낭비 방지
    if (paused || document.hidden) { setTimeout(step, 250); return; }
    tick++;
    if (inCrash >= 0) {
      const [lv, tag, msg, pid, tid, f] = CRASH[inCrash];
      const el = addRow(lv, tag, msg, pid, tid, f);
      // 블록의 첫/마지막 행에 가로선을 붙여 크래시 구간을 감싼다
      if (inCrash === 0) el.classList.add('rail', 'blk-top');
      if (inCrash === CRASH.length - 1) el.classList.add('blk-bot');
      if (f) { pendingFatal = el; pendingTick = markSignal(el); }
      if (++inCrash >= CRASH.length) { inCrash = -1; sigDelay = 18; }
      setTimeout(step, 130);
      return;
    }
    const r = NORMAL[Math.floor(Math.random() * NORMAL.length)];
    const el = addRow(r[0], r[1], r[2], r[3], r[4]);
    if (r[0] === 'W') addTick(el, '--app-warn');
    // 크래시가 로그에 밀려 화면 밖으로 올라간 뒤에 "되돌아가기"를 보여준다.
    // 방금 생긴 행으로 점프하면 이미 눈앞에 있어 움직임이 보이지 않는다.
    if (sigDelay > 0 && --sigDelay === 0 && pendingFatal) {
      raiseSignal(pendingFatal, pendingTick);
      pendingFatal = null; pendingTick = null;
    }
    if (tick % 30 === 0) inCrash = 0;   // 주기적으로 크래시 재현
    setTimeout(step, 95 + Math.random() * 90);
  }

  // 버퍼를 미리 채운다. 지나간 크래시 한 건을 심어 둬야 첫 사이클부터
  // "이전 발생 지점으로 되돌아가기"가 성립한다.
  const push = (r) => {
    const el = addRow(r[0], r[1], r[2], r[3], r[4], r[5]);
    if (r[0] === 'W') addTick(el, '--app-warn');
    return el;
  };
  for (let i = 0; i < 20; i++) push(NORMAL[i % NORMAL.length]);
  inCrash = 0;                          // addRow 가 E 행을 크래시로 인식하도록
  let prev = null;
  for (const c of CRASH) { const el = push(c); if (c[5]) prev = el; inCrash++; }
  inCrash = -1;
  if (prev) addTick(prev, '--app-crash');
  for (let i = 0; i < 18; i++) push(NORMAL[i % NORMAL.length]);

  requestAnimationFrame(() => { syncTicks(); tail(0); });
  if (!reduceMotion) setTimeout(step, 700);
}

// ------------------------------------------------------------ 데모 밴드 영상
// 4MB 짜리를 첫 화면에서 받지 않도록 preload="none", 화면에 들어올 때만 재생한다.

function setupBandVideo() {
  const v = $('bandVideo'), media = $('bandMedia');
  if (!v || !media) return;
  new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) v.play().then(() => media.classList.add('playing')).catch(() => {});
    else v.pause();
  }), { threshold: 0.25 }).observe(media);
}

// -------------------------------------------------------------- 스티키 쇼케이스

function setupShowcase() {
  const items = [...document.querySelectorAll('.sc-item')];
  const imgs = [...document.querySelectorAll('.sc-stage img')];
  const stage = $('stage');
  if (!items.length || !stage) return;
  let cur = 0, timer = null;

  const select = (i) => {
    cur = i;
    items.forEach((el, k) => el.classList.toggle('on', k === i));
    imgs.forEach((el, k) => el.classList.toggle('on', k === i));
    const p = $('scProg');
    p.style.transition = 'none'; p.style.width = '0';
    requestAnimationFrame(() => { p.style.transition = 'width 4s linear'; p.style.width = '100%'; });
  };
  const auto = () => { clearInterval(timer); timer = setInterval(() => select((cur + 1) % items.length), 4000); };

  items.forEach((el) => el.addEventListener('click', () => { select(+el.dataset.i); auto(); }));
  new IntersectionObserver((es) => {
    if (es[0].isIntersecting && !reduceMotion) { select(cur); auto(); } else clearInterval(timer);
  }, { threshold: 0.3 }).observe(stage);
}

// ---------------------------------------------------------------- 잔여 UI 장치

function setupChrome() {
  // 커서를 따라다니는 스포트라이트
  const spot = $('spot');
  if (spot) addEventListener('pointermove', (e) => {
    spot.style.setProperty('--mx', e.clientX + 'px');
    spot.style.setProperty('--my', e.clientY + 'px');
  });

  const nav = $('nav');
  if (nav) addEventListener('scroll', () => nav.classList.toggle('stuck', scrollY > 20));

  // 마그네틱 CTA
  const mag = $('primaryDownload');
  if (mag) {
    mag.addEventListener('pointermove', (e) => {
      const r = mag.getBoundingClientRect();
      mag.style.setProperty('--tx', ((e.clientX - r.left - r.width / 2) * 0.16) + 'px');
      mag.style.setProperty('--ty', ((e.clientY - r.top - r.height / 2) * 0.26) + 'px');
    });
    mag.addEventListener('pointerleave', () => {
      mag.style.setProperty('--tx', '0px'); mag.style.setProperty('--ty', '0px');
    });
  }

  // 카드 광원 추적
  document.querySelectorAll('.card').forEach((c) => {
    c.addEventListener('pointermove', (e) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--cx', (e.clientX - r.left) + 'px');
      c.style.setProperty('--cy', (e.clientY - r.top) + 'px');
    });
  });

  // 마퀴 — 앱이 잡아내는 시그널 이름들(제품 UI 라 번역하지 않는다)
  const track = $('track');
  if (track) {
    const T = ['FATAL EXCEPTION', 'ANR in {package}', 'SIGSEGV', 'OutOfMemoryError',
      'Skipped 120 frames', 'StrictMode violation', 'SIGABRT', 'ActivityManager: Force stopping',
      'NetworkOnMainThread', 'SQLiteException', 'SSLHandshakeException', 'Input dispatching timed out'];
    track.innerHTML = [...T, ...T].map((x) => `<span><u>›</u> ${x}</span>`).join('');
  }

  // 스크롤 진입 리빌
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.14 });
  document.querySelectorAll('.rv').forEach((el, i) => {
    el.style.transitionDelay = (i % 3 * 70) + 'ms';
    io.observe(el);
  });
}

// 스크린샷 라이트박스 — 릴리즈 노트 이미지는 비동기로 추가되므로 위임 클릭으로 처리.
function setupLightbox() {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox hidden';
  overlay.innerHTML = '<img alt="">';
  document.body.appendChild(overlay);
  const big = overlay.querySelector('img');
  const close = () => {
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
    document.body.style.overflow = '';
    big.removeAttribute('src');
  };
  document.addEventListener('click', (e) => {
    const img = e.target.closest('img[data-zoom]');
    if (!img) return;
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    document.body.style.overflow = 'hidden'; // 확대 중 배경 스크롤 잠금
  });
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

// 언어 드롭다운 — 버튼으로 펼치고, 항목 선택·바깥 클릭·ESC 로 닫는다
// 표시 여부는 .on 으로 제어한다 — app.css 의 #langMenu 는 기본이
// opacity:0 / pointer-events:none 이고 .on 에서만 보인다.
// (hidden 을 토글하면 display 만 풀리고 투명·클릭불가 상태가 남아 버튼이 죽는다)
function setupLangMenu() {
  const menu = $('langMenu');
  const close = () => menu.classList.remove('on');
  $('langToggle').addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('on');
  });
  for (const btn of menu.querySelectorAll('[data-lang]')) {
    btn.addEventListener('click', () => {
      state.lang = btn.dataset.lang;
      try { localStorage.setItem(LANG_KEY, state.lang); } catch { /* 프라이빗 모드 */ }
      close();
      applyLang();
    });
  }
  document.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

// ------------------------------------------------------------------- 부트랩

async function loadData() {
  // 프로덕션: 워크플로가 dist/releases.json 생성. 로컬(레포 루트 서빙): 샘플 픽스처 폴백.
  for (const url of ['releases.json', 'data/releases.sample.json']) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        if (url !== 'releases.json') console.info('[logcaton] using local sample fixture:', url);
        return await res.json();
      }
    } catch { /* 다음 후보 시도 */ }
  }
  return { releases: [] }; // 데이터 없음 → empty state
}

setupTheme();
setupLangMenu();
setupLightbox();
setupChrome();
setupHeroDemo();
setupBandVideo();
setupShowcase();
ensureGoatCounter();   // 방문 집계 — 릴리즈 유무와 무관하게 모든 방문에서
personalizeLangMenu();
applyLang();
state.data = await loadData();
render();
