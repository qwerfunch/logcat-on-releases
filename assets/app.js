// app.js — releases.json(빌드 타임 베이크)을 읽어 페이지를 렌더한다.
// 책임: i18n(ko/en 자동감지+토글), OS 감지 메인 다운로드 버튼,
//       최신 릴리즈 펼침 + 과거 릴리즈 접힘 렌더, 비디오 3초 휴지 후 재생 루프.
import { STRINGS, OS_NAMES } from './i18n.js';

const LANG_KEY = 'logcaton.lang';
const state = { lang: detectLang(), os: detectOS(), data: null };

// ------------------------------------------------------------------ helpers

function t(key) {
  return STRINGS[state.lang][key] ?? STRINGS.en[key] ?? key;
}

function detectLang() {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved === 'ko' || saved === 'en') return saved;
  return (navigator.language || 'en').toLowerCase().startsWith('ko') ? 'ko' : 'en';
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
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function humanSize(b) {
  if (b >= 1e9) return (b / 1e9).toFixed(2) + ' GB';
  if (b >= 1e6) return (b / 1e6).toFixed(1) + ' MB';
  if (b >= 1e3) return (b / 1e3).toFixed(0) + ' KB';
  return b + ' B';
}

function formatDate(iso) {
  if (!iso) return '';
  return new Intl.DateTimeFormat(state.lang === 'ko' ? 'ko-KR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(iso));
}

// ----------------------------------------------------------------- i18n 적용

function applyLang() {
  document.documentElement.lang = state.lang;
  document.title = t('meta.title');
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'));
  document.getElementById('langToggleLabel').textContent = t('lang.toggle');
  for (const el of document.querySelectorAll('[data-i18n]')) {
    el.innerHTML = t(el.dataset.i18n); // 사전은 이 레포 코드 — 신뢰 경계 안
  }
  syncSoundToggle();
  // 날짜·종류 라벨 등 언어 의존 동적 콘텐츠는 통째로 다시 렌더
  if (state.data) render();
}

// ------------------------------------------------------------- 릴리즈 렌더링

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

function renderSections(sections) {
  return sections
    .map((s) => {
      const header = s.title
        ? `<h4 class="text-sm font-black text-stone-900 uppercase tracking-wider mb-4 flex items-center gap-2">
             <span class="w-2 h-2 rounded-full ${DOT[s.category] ?? DOT.other}"></span> ${escapeHtml(s.title)}
           </h4>`
        : '';
      const paragraphs = s.paragraphs.map((p) => `<p class="mb-3">${p}</p>`).join('');
      const items = s.items.length
        ? `<ul class="list-none space-y-4">
             ${s.items.map((it) => `<li class="relative pl-6">${it}</li>`).join('')}
           </ul>`
        : '';
      return `<div>${header}${paragraphs}${items}</div>`;
    })
    .join('');
}

function renderAssetRow(a) {
  return `
    <a href="${escapeHtml(a.url)}" download
       class="py-3.5 border-b border-stone-200 last:border-0 hover:bg-stone-200/20 transition-colors flex justify-between items-center gap-3 px-2 group/row">
      <span class="text-stone-700 font-medium truncate">${escapeHtml(a.name)}</span>
      <span class="flex items-center gap-3 shrink-0">
        ${a.kind !== 'other' ? `<span class="hidden sm:inline text-xs font-bold px-2 py-0.5 rounded bg-stone-200/70 text-stone-500">${t('kind.' + a.kind)}</span>` : ''}
        <span class="text-xs text-stone-400 w-16 text-right">${humanSize(a.sizeBytes)}</span>
        <i class="ph ph-download-simple text-lg text-stone-400 group-hover/row:text-[#E67E22]"></i>
      </span>
    </a>`;
}

function renderAssets(release, { open, anchorId }) {
  if (!release.assetCount) return '';
  const groups = ['macos', 'windows', 'linux', 'other']
    .filter((p) => release.assets[p].length)
    .map(
      (p) => `
      <div>
        <h5 class="flex items-center gap-2 text-sm font-bold text-stone-500 mb-1">
          <i class="${PLATFORM_ICON[p]}"></i> ${t('group.' + p)}
        </h5>
        <div class="border-y border-stone-200">
          ${release.assets[p].map(renderAssetRow).join('')}
        </div>
      </div>`,
    )
    .join('');

  return `
    <div class="pt-8 mt-12 border-t border-stone-300" ${anchorId ? `id="${anchorId}"` : ''}>
      <details class="group" ${open ? 'open' : ''}>
        <summary class="flex items-center cursor-pointer list-none select-none mb-6">
          <i class="ph-bold ph-caret-right text-stone-400 mr-3 transition-transform group-open:rotate-90"></i>
          <h4 class="text-lg font-bold text-stone-900">${t('assets.title')}</h4>
          <span class="ml-3 bg-stone-200/70 text-stone-600 text-xs font-bold px-2.5 py-0.5 rounded-full">${release.assetCount}</span>
        </summary>
        <div class="space-y-6">${groups}</div>
      </details>
    </div>`;
}

function renderBadge(release, isLatest) {
  if (release.prerelease)
    return `<span class="bg-stone-400/10 text-stone-500 border border-stone-400/20 text-xs px-2.5 py-1 rounded-md font-bold tracking-wide">${t('releases.prerelease')}</span>`;
  if (isLatest)
    return `<span class="bg-[#E67E22]/10 text-[#E67E22] border border-[#E67E22]/20 text-xs px-2.5 py-1 rounded-md font-bold tracking-wide">${t('releases.latest')}</span>`;
  return '';
}

function renderLatest(release) {
  return `
    <div class="pb-6 border-b border-stone-300 mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
      <div class="flex items-center gap-3">
        <h3 class="text-2xl font-black text-stone-900 tracking-tight">${escapeHtml(release.name)}</h3>
        ${renderBadge(release, true)}
      </div>
      <span class="text-sm text-stone-400 sm:ml-auto">${formatDate(release.publishedAt)}</span>
    </div>
    <div class="md text-[15px] text-stone-700 space-y-10 pl-2">
      ${renderSections(release.sections)}
      ${renderAssets(release, { open: true, anchorId: 'latest-assets' })}
    </div>`;
}

function renderOlder(release) {
  return `
    <details class="group/old border-b border-stone-200">
      <summary class="flex items-center gap-3 py-5 cursor-pointer list-none select-none">
        <i class="ph-bold ph-caret-right text-stone-400 transition-transform group-open/old:rotate-90"></i>
        <h3 class="text-lg font-black text-stone-900 tracking-tight">${escapeHtml(release.name)}</h3>
        ${renderBadge(release, false)}
        <span class="text-sm text-stone-400 ml-auto shrink-0">${formatDate(release.publishedAt)}</span>
      </summary>
      <div class="md text-[15px] text-stone-700 space-y-10 pl-8 pb-10">
        ${renderSections(release.sections)}
        ${renderAssets(release, { open: false })}
      </div>
    </details>`;
}

function render() {
  const releases = state.data?.releases ?? [];
  const emptyEl = document.getElementById('emptyState');
  const listEl = document.getElementById('releases');
  const downloadEl = document.getElementById('downloadArea');

  if (!releases.length) {
    emptyEl.classList.remove('hidden');
    listEl.innerHTML = '';
    downloadEl.classList.add('hidden');
    return;
  }
  emptyEl.classList.add('hidden');

  const [latest, ...older] = releases;
  listEl.innerHTML =
    renderLatest(latest) +
    (older.length ? `<div class="mt-16">${older.map(renderOlder).join('')}</div>` : '');

  renderDownloadButton(latest, downloadEl);
}

// OS 자동감지 메인 다운로드 버튼. 감지 실패/해당 OS 자산 없음 → "모든 다운로드 보기".
function renderDownloadButton(latest, downloadEl) {
  const btn = document.getElementById('primaryDownload');
  const label = document.getElementById('primaryDownloadLabel');
  const meta = document.getElementById('primaryDownloadMeta');
  const primary = state.os ? latest.primary[state.os] : null;

  if (primary) {
    btn.href = primary.url;
    btn.setAttribute('download', '');
    label.textContent = t('download.for').replace('{os}', OS_NAMES[state.os]);
    meta.textContent = `${latest.tag} · ${humanSize(primary.sizeBytes)}`;
  } else {
    btn.href = '#latest-assets';
    btn.removeAttribute('download');
    label.textContent = t('download.viewAll');
    meta.textContent = latest.tag;
  }
  document.getElementById('otherPlatforms').innerHTML = t('download.otherPlatforms');
  downloadEl.classList.remove('hidden');
  downloadEl.classList.add('flex');
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
    } catch {
      /* 다음 후보 시도 */
    }
  }
  return { releases: [] }; // 데이터 없음 → empty state
}

let syncSoundToggle = () => {}; // applyLang 에서 라벨 재적용용

function setupVideo() {
  const video = document.getElementById('demoVideo');
  if (!video) return;
  video.addEventListener('ended', () => {
    setTimeout(() => {
      // 페이지가 안 보이거나 창 포커스가 없으면 재시작하지 않는다 — 숨김 상태
      // 재생이 자동 PiP 를 유발할 수 있음. 복귀 시 resume 이 재개 담당.
      if (document.hidden || !document.hasFocus()) return;
      video.currentTime = 0;
      video.play();
    }, 3000);
  });
  video.play()?.catch(() => {/* 자동재생 차단 — poster 유지 */});

  // 페이지가 보일 때만 재생 — 탭/스페이스 이동 시 자동 PiP(영상 따라오기) 방지.
  // disablepictureinpicture 속성(index.html)과 다층 방어 + 백그라운드 리소스 절약.
  const resume = () => {
    if (document.hidden) return;
    if (video.ended) video.currentTime = 0;
    video.play()?.catch(() => {});
  };
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
    else resume();
  });
  // Arc 등 일부 브라우저는 macOS 스페이스 이동 시 창 가림(occlusion)을
  // visibilitychange 로 안 알려준다 — 창 포커스 신호로도 멈춘다.
  window.addEventListener('blur', () => video.pause());
  window.addEventListener('focus', resume);
  // 자동 PiP 가 disablepictureinpicture 를 무시하는 경우의 최후 방어:
  // PiP 진입 즉시 탈출해 미니 플레이어를 닫는다.
  video.addEventListener('enterpictureinpicture', () => {
    video.pause();
    document.exitPictureInPicture?.()?.catch(() => {});
  });

  // 소리 토글 — 자동재생은 음소거 필수(브라우저 정책)이므로 기본 muted,
  // 버튼은 영상 내 워터마크를 덮는 위치(index.html)에 항상 표시된다.
  const btn = document.getElementById('soundToggle');
  const icon = document.getElementById('soundToggleIcon');
  if (!btn || !icon) return;
  syncSoundToggle = () => {
    icon.className = video.muted
      ? 'ph-fill ph-speaker-simple-slash text-xl'
      : 'ph-fill ph-speaker-simple-high text-xl';
    const label = t(video.muted ? 'video.unmute' : 'video.mute');
    btn.setAttribute('aria-label', label);
    btn.title = label;
  };
  btn.addEventListener('click', () => {
    video.muted = !video.muted;
    if (!video.muted && video.paused) video.play()?.catch(() => {});
    syncSoundToggle();
  });
  syncSoundToggle();
}

document.getElementById('langToggle').addEventListener('click', () => {
  state.lang = state.lang === 'ko' ? 'en' : 'ko';
  localStorage.setItem(LANG_KEY, state.lang);
  applyLang();
});

setupVideo();
applyLang();
state.data = await loadData();
render();
