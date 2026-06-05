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
  // 우선순위: URL ?lang= (hreflang 검색 유입) → 저장된 선택 → OS 언어
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  if (urlLang === 'ko' || urlLang === 'en') return urlLang;
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

const SITE_BASE = 'https://qwerfunch.github.io/logcat-on-releases/';

function applyLang() {
  document.documentElement.lang = state.lang;
  document.title = t('meta.title');
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'));
  document.getElementById('langToggleLabel').textContent = t('lang.toggle');
  // SEO: 언어별 URL(기본=en, ?lang=ko) 및 canonical 을 현재 언어와 동기화
  try {
    const url = new URL(window.location.href);
    if (state.lang === 'ko') url.searchParams.set('lang', 'ko');
    else url.searchParams.delete('lang');
    window.history.replaceState(null, '', url);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', state.lang === 'ko' ? SITE_BASE + '?lang=ko' : SITE_BASE);
  } catch {
    /* 일부 환경(file:// 등)에서 URL 조작 불가 — 무시 */
  }
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

  // canvas 미러 — 화면에는 canvas 만 보이고 실제 video 는 display:none.
  // 브라우저 자동 PiP(Arc 미니 플레이어)는 "보이는 비디오"만 낚아채므로
  // 대상 자체가 사라진다. 이벤트 기반 PiP 방어(exit 재시도 등)는 브라우저
  // 프로세스와의 레이스 + Arc 유령 창 버그를 피할 수 없어 이 방식으로 대체.
  // (숨긴 video 도 재생·디코드·오디오는 정상 — WebGL 비디오 텍스처와 동일 패턴)
  const canvas = document.getElementById('demoCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let firstFrameDrawn = false;
  const draw = () => {
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    firstFrameDrawn = true;
  };
  if (ctx) {
    // 첫 프레임이 나오기 전까지는 poster 를 canvas 에 그려둔다
    const poster = new Image();
    poster.onload = () => {
      if (!firstFrameDrawn) ctx.drawImage(poster, 0, 0, canvas.width, canvas.height);
    };
    poster.src = 'assets/poster.jpg';
    // 프레임 펌프: 새 비디오 프레임마다 canvas 로 복사
    if (typeof video.requestVideoFrameCallback === 'function') {
      const pump = () => {
        draw();
        video.requestVideoFrameCallback(pump);
      };
      video.requestVideoFrameCallback(pump);
    } else {
      const pump = () => {
        if (!video.paused && !video.ended) draw();
        requestAnimationFrame(pump);
      };
      requestAnimationFrame(pump);
    }
  }

  // ended → 3초 휴지 → 처음부터 재생 루프. 휴지 중 focus/visibility 복귀로
  // scheduleResume 이 먼저 재생을 재개하면 이 타이머는 스테일이 된다 —
  // 그대로 발화하면 재생 중인 영상을 0초로 되감아 "중간 리플레이" 증상을
  // 만들므로, ended 가드 + play 시 타이머 취소로 이중 차단한다.
  let replayTimer = 0;
  video.addEventListener('ended', () => {
    clearTimeout(replayTimer);
    replayTimer = setTimeout(() => {
      if (document.hidden || !video.ended) return;
      video.currentTime = 0;
      video.play();
    }, 3000);
  });
  video.addEventListener('play', () => clearTimeout(replayTimer));
  video.play()?.catch(() => {/* 자동재생 차단 — poster 유지 */});

  // 정책: "보이면 재생, 안 보이면 정지" (포커스는 무관 — 같은 화면에서 다른
  // 윈도우를 포커스해도 영상은 계속 돈다). 백그라운드 디코드 절약 목적.
  // 멈춤은 즉시, 재개는 300ms 디바운스로 빠른 탭/스페이스 전환에도 안정.
  let resumeTimer = 0;
  const scheduleResume = () => {
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      if (document.hidden) return;
      if (video.ended) video.currentTime = 0;
      video.play()?.catch(() => {});
    }, 300);
  };
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearTimeout(resumeTimer);
      video.pause();
    } else {
      scheduleResume();
    }
  });
  // 가림 감지(visibilitychange)가 안 오는 브라우저의 복귀 경로
  window.addEventListener('focus', scheduleResume);

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
