// i18n.js — 페이지 UI 문자열 사전 (en · ko · ja · zh-CN).
// 릴리즈 노트 본문은 번역하지 않고 작성된 원문(한국어) 그대로 표시한다.
// 값에 HTML(<br> 등)을 포함할 수 있으므로 적용 시 innerHTML 사용 — 사전은
// 이 레포의 코드 자체이므로 신뢰 경계 안.
// ja/zh 는 1차 번역(네이티브 검수 전) — 어색한 표현 제보는 이슈로.

export const STRINGS = {
  ko: {
    'meta.title': 'LogcatOn — 안드로이드 로그캣 뷰어 · macOS/Windows/Linux 무료',
    'meta.description':
      '초고속 멀티플랫폼 안드로이드 로그캣 뷰어. 패키지 선택만으로 PID/TID 자동 필터, ' +
      '32+ 시그널 강조(Crash·ANR·메모리), 스마트 검색·북마크, 1M+ 라인에서도 60fps. ' +
      'macOS·Windows·Linux 무료 다운로드.',
    'intro.heading': '안드로이드 스튜디오 로그캣,<br>너무 불편해서 직접 만들었어요 😹',
    'intro.body':
      '매번 쏟아지는 로그 속에서 원하는 정보를 찾기 답답하셨죠?<br>' +
      '저 역시 기존 로그캣의 아쉬움에 지쳐, 제가 편하게 쓰려고 직접 개발하게 되었습니다.<br>' +
      '개발자의 눈과 시간을 아껴주는 직관적인 로그 분석을 이제 LogcatOn과 함께 경험해 보세요!',
    'intro.free': '무료입니다. 맘 편히 가져다 쓰세요!',
    'download.for': '{os}용 다운로드',
    'download.viewAll': '모든 다운로드 보기',
    'download.otherPlatforms': '다른 플랫폼 ↓',
    'releases.latest': 'Latest',
    'releases.prerelease': 'Pre-release',
    'assets.title': 'Assets',
    'kind.installer': '설치 파일',
    'kind.portable': '포터블',
    'group.macos': 'macOS',
    'group.windows': 'Windows',
    'group.linux': 'Linux',
    'group.other': '기타',
    'empty.title': '릴리즈 준비 중',
    'empty.body': '첫 공개 릴리즈를 준비하고 있어요. 곧 다운로드를 제공할게요!',
    'video.unmute': '소리 켜기',
    'video.mute': '소리 끄기',
    'footer.role': 'LogcatOn 만든 사람',
    'features.heading': '실제 디버깅 방식에 맞춰 설계했습니다',
    'features.design.title': '60fps로 미끄러지듯, 보기에도 아름답게',
    'features.design.desc': '100만 줄을 canvas로 그려도 프레임 하나 떨어뜨리지 않습니다.',
    'features.filter.title': '기기 연결하고 앱만 고르면, 그 앱 로그만',
    'features.filter.desc': '패키지를 고르는 순간 그 앱 로그만 통과. 앱 설치·실행·강제 종료까지 여기서.',
    'features.bookmark.title': '중요한 그 줄, 다시 놓치지 마세요',
    'features.bookmark.desc': '핵심 로그를 북마크하고 색으로 분류해 언제든 바로 점프.',
    'features.signal.title': '에러·크래시, 발생 즉시 눈에 띄게',
    'features.signal.desc': '미니맵 마커와 이슈 알림으로 바로 포착하고, 성능 타임라인에서 발생 지점으로 곧장 이동.',
    'features.perf.title': 'CPU·메모리·버벅임·온도까지 실시간',
    'features.perf.desc': '로그를 보는 동안 CPU·메모리·jank·배터리·온도를 실시간으로 함께.',
    'features.theme.title': '다크든 라이트든, 취향대로',
    'features.theme.desc': '작업 환경과 기분에 맞춰 테마를 자유롭게 전환하세요.',
    'footer.reportBug': '버그 신고',
    'footer.requestFeature': '기능 제안',
    'stats.downloads': '다운로드',
    'stats.visits': '방문',
  },
  en: {
    'meta.title': 'LogcatOn — Android Logcat Viewer for macOS, Windows & Linux (Free)',
    'meta.description':
      'Blazing-fast Android logcat viewer. Auto package/PID filtering, 32+ signal highlights ' +
      '(crash, ANR, memory), smart search & bookmarks, 60fps at 1M+ lines. Free download.',
    'intro.heading': "Android Studio's logcat was so painful,<br>I just built my own 😹",
    'intro.body':
      'Tired of digging for the one line you need in a flood of logs?<br>' +
      'So was I — so I built the logcat viewer I always wanted to use.<br>' +
      'Experience intuitive log analysis that saves your eyes and your time, with LogcatOn!',
    'intro.free': "It's free — grab it and enjoy!",
    'download.for': 'Download for {os}',
    'download.viewAll': 'View all downloads',
    'download.otherPlatforms': 'Other platforms ↓',
    'releases.latest': 'Latest',
    'releases.prerelease': 'Pre-release',
    'assets.title': 'Assets',
    'kind.installer': 'Installer',
    'kind.portable': 'Portable',
    'group.macos': 'macOS',
    'group.windows': 'Windows',
    'group.linux': 'Linux',
    'group.other': 'Other',
    'empty.title': 'Releases coming soon',
    'empty.body': "We're preparing the first public release. Downloads will be here soon!",
    'video.unmute': 'Unmute',
    'video.mute': 'Mute',
    'footer.role': 'Maker of LogcatOn',
    'features.heading': 'Built for the way you actually debug',
    'features.design.title': 'Beautiful by design, smooth at 60fps',
    'features.design.desc': 'A million log lines, rendered on canvas — and it never drops a frame.',
    'features.filter.title': 'Just your app’s logs â nothing else',
    'features.filter.desc': 'Connect a device, pick a package — install, launch, and force-stop apps right from here.',
    'features.bookmark.title': 'Never lose the line that matters',
    'features.bookmark.desc': 'Bookmark key lines, tag them by color, and jump back in an instant.',
    'features.signal.title': 'Crashes catch your eye, instantly',
    'features.signal.desc': 'Errors and crashes surface on the minimap and issue alerts — jump straight to the moment on the performance timeline.',
    'features.perf.title': 'Watch performance as it happens',
    'features.perf.desc': 'CPU, memory, jank, battery and temperature — live, while you read the logs.',
    'features.theme.title': 'Dark or light — make it yours',
    'features.theme.desc': 'Switch themes freely to match your setup and your mood.',
    'footer.reportBug': 'Report a bug',
    'footer.requestFeature': 'Request a feature',
    'stats.downloads': 'downloads',
    'stats.visits': 'visits',
  },
  ja: {
    'meta.title': 'LogcatOn — Android Logcat ビューア · macOS/Windows/Linux 無料',
    'meta.description':
      '超高速マルチプラットフォーム Android logcat ビューア。アプリを選ぶだけで PID/TID を自動フィルタリング。' +
      '32種類以上のシグナルハイライト(クラッシュ・ANR・メモリ)、スマート検索、ブックマーク。' +
      '100万行でも 60fps。macOS・Windows・Linux 向け無料ダウンロード。',
    'intro.heading': 'Android Studio の logcat が不便すぎて、<br>自分で作ってしまいました 😹',
    'intro.body':
      '大量のログから目的の一行を探すのに、うんざりしていませんか?<br>' +
      '私も同じでした。だから、ずっと欲しかった logcat ビューアを自分で作りました。<br>' +
      '目にも時間にもやさしい直感的なログ分析を、LogcatOn でぜひ体験してください!',
    'intro.free': '無料です。安心してお使いください!',
    'download.for': '{os} 版をダウンロード',
    'download.viewAll': 'すべてのダウンロードを見る',
    'download.otherPlatforms': '他のプラットフォーム ↓',
    'releases.latest': 'Latest',
    'releases.prerelease': 'Pre-release',
    'assets.title': 'Assets',
    'kind.installer': 'インストーラー',
    'kind.portable': 'ポータブル版',
    'group.macos': 'macOS',
    'group.windows': 'Windows',
    'group.linux': 'Linux',
    'group.other': 'その他',
    'empty.title': 'リリース準備中',
    'empty.body': '初回リリースを準備中です。もうすぐダウンロードできるようになります!',
    'video.unmute': 'ミュート解除',
    'video.mute': 'ミュート',
    'footer.role': 'LogcatOn 開発者',
    'features.heading': '実際のデバッグに寄り添う設計',
    'features.design.title': '美しく、そして 60fps で滑らかに',
    'features.design.desc': '100万行を canvas で描画しても、フレームを一切落としません。',
    'features.filter.title': '選んだアプリのログだけを、すっきりと',
    'features.filter.desc': 'デバイスを繋いでパッケージを選ぶだけ。アプリのインストール・起動・強制終了もここから。',
    'features.bookmark.title': '大事な一行を、見失わない',
    'features.bookmark.desc': '重要なログをブックマークし、色で分類して、いつでも瞬時にジャンプ。',
    'features.signal.title': 'クラッシュが、ひとめで目に留まる',
    'features.signal.desc': 'エラーやクラッシュをミニマップとアラートで即座に捕捉。パフォーマンスタイムラインから発生箇所へ直行。',
    'features.perf.title': 'パフォーマンスを、リアルタイムで',
    'features.perf.desc': 'ログを見ながら CPU・メモリ・ジャンク・バッテリー・温度をライブで確認。',
    'features.theme.title': 'ダークもライトも、思いのままに',
    'features.theme.desc': '環境や気分に合わせて、テーマを自由に切り替え。',
    'footer.reportBug': 'バグを報告',
    'footer.requestFeature': '機能リクエスト',
    'stats.downloads': 'ダウンロード',
    'stats.visits': 'アクセス',
  },
  zh: {
    'meta.title': 'LogcatOn — Android Logcat 查看器 · macOS/Windows/Linux 免费',
    'meta.description':
      '极速多平台 Android logcat 查看器。选择应用即自动过滤 PID/TID,内置 32+ 种信号高亮' +
      '(崩溃、ANR、内存),智能搜索与书签,百万行日志依然 60fps。macOS、Windows、Linux 免费下载。',
    'intro.heading': 'Android Studio 的 logcat 实在太难用,<br>于是我自己写了一个 😹',
    'intro.body':
      '厌倦了在刷屏的日志里寻找那一行关键信息?<br>' +
      '我也一样——所以我做了一个自己一直想要的 logcat 查看器。<br>' +
      '用 LogcatOn 体验护眼又省时的直观日志分析!',
    'intro.free': '完全免费,放心使用!',
    'download.for': '下载 {os} 版',
    'download.viewAll': '查看全部下载',
    'download.otherPlatforms': '其他平台 ↓',
    'releases.latest': 'Latest',
    'releases.prerelease': 'Pre-release',
    'assets.title': 'Assets',
    'kind.installer': '安装包',
    'kind.portable': '便携版',
    'group.macos': 'macOS',
    'group.windows': 'Windows',
    'group.linux': 'Linux',
    'group.other': '其他',
    'empty.title': '版本准备中',
    'empty.body': '首个公开版本正在准备中,很快就能下载!',
    'video.unmute': '开启声音',
    'video.mute': '关闭声音',
    'footer.role': 'LogcatOn 开发者',
    'features.heading': '为真实的调试流程而设计',
    'features.design.title': '颜值在线,60fps 丝滑流畅',
    'features.design.desc': '百万行日志用 canvas 渲染,依然不掉一帧。',
    'features.filter.title': '只看你选的那个 App 的日志',
    'features.filter.desc': '连接设备、选好包名即可过滤;安装、启动、强制停止应用也一站搞定。',
    'features.bookmark.title': '关键的那一行,再也不丢',
    'features.bookmark.desc': '给重要日志加书签、按颜色分类,随时一键跳回。',
    'features.signal.title': '错误与崩溃,瞬间抓住眼球',
    'features.signal.desc': '通过迷你地图标记和问题提醒即时发现,从性能时间轴直达发生时刻。',
    'features.perf.title': '性能表现,实时尽收眼底',
    'features.perf.desc': '看日志的同时,实时监控 CPU、内存、卡顿、电量与温度。',
    'features.theme.title': '深色浅色,随心切换',
    'features.theme.desc': '根据你的环境与心情,自由切换主题。',
    'footer.reportBug': '报告问题',
    'footer.requestFeature': '功能建议',
    'stats.downloads': '下载',
    'stats.visits': '访问',
  },
};

// 드롭다운 표시용 언어 이름 — 각 언어의 자기 표기(고정, 번역 안 함)
export const LANG_NAMES = { en: 'English', ko: '한국어', ja: '日本語', zh: '简体中文' };

// OS 표시명 — 전 언어 공통.
export const OS_NAMES = { macos: 'macOS', windows: 'Windows', linux: 'Linux' };
