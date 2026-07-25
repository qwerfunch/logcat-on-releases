// i18n.js — 페이지 UI 문자열 사전 (en · ko · ja · zh-CN).
// 값에 HTML(<br>, <em>, <b> 등)을 포함할 수 있으므로 적용 시 innerHTML 사용 —
// 사전은 이 레포의 코드 자체이므로 신뢰 경계 안.
// ja/zh 는 1차 번역(네이티브 검수 전) — 어색한 표현 제보는 이슈로.
//
// 번역하지 않는 것 (4개 언어 모두 영문 고정):
//   · 히어로 로그 패널 / 상세 카드 안의 제품 UI 문자열
//     (LINE·LV·PID·TID·TAG·MSG, ready, paused, signals:, 60 fps, Signal issues,
//      FATAL EXCEPTION, Copy crash report, Pretty JSON / Raw …)
//     — 실제 앱이 영어로 표시하므로 번역하면 화면과 달라진다.
//   · 섹션 eyebrow (Features / Details / See it work / Download)
//     — 기존 Latest·Assets 를 전 언어 영문으로 두는 규칙과 동일.
//   · 릴리즈 노트 본문 — GitHub 릴리즈 원문(한국어)이 콘텐츠 언어다.

export const STRINGS = {
  ko: {
    'meta.title': 'LogcatOn — 안드로이드 로그캣 뷰어 · macOS/Windows/Linux 무료',
    'meta.description':
      '빠른 멀티플랫폼 안드로이드 로그캣 뷰어. 앱 선택만으로 PID/TID 자동 필터, ' +
      '32종 시그널 강조(크래시·ANR·네이티브 크래시·메모리), 정규식 검색과 북마크. ' +
      'macOS·Windows·Linux 무료 다운로드.',

    'nav.download': '다운로드',
    'theme.toggle': '테마 전환',

    'hero.badge': '{tag} · macOS · Windows · Linux',
    'hero.heading': '쏟아지는 로그 속에서<br><em>그 한 줄</em>로<br>바로 점프.',
    // 용어는 앱의 시그널 그룹 이름(Crash / ANR / Native crash)을 따른다.
    // "점프"는 헤드라인이 이미 쓰므로 여기서는 "이동" — features.signal.desc 와도 일치.
    'hero.lede':
      '크래시와 ANR, 네이티브 크래시까지 발생 즉시 미니맵과 타임라인에 표시합니다. ' +
      '클릭 한 번이면 그 지점으로 이동합니다. 대용량 로그도 끊김 없이 흐릅니다.',
    'hero.meta': '무료 · 계정 필요 없음 · <b>{size}</b>',

    'band.heading': '편집 없는 실제 화면입니다',
    'band.sub':
      '로그가 쏟아지는 중에 크래시가 뜨고, 미니맵에 찍히고, 그 지점으로 이동하기까지. 한 번에 녹화했습니다.',
    'band.caption': '실제 화면 녹화 · 23초 · 무음 · 편집 없음',

    'features.heading': '실제 디버깅 방식에<br>맞춰 설계했습니다',
    'features.sub': '기능을 나열하지 않았습니다. 로그를 읽는 순서 그대로 화면을 짰습니다.',
    'features.app.title': '그 앱의 로그만, 깔끔하게',
    'features.app.desc': '기기를 연결하고 앱을 선택하면 그 앱의 로그만. 설치·실행·강제 종료도 한곳에서.',
    'features.filter.title': '원하는 줄만, 골라서 보기',
    'features.filter.desc': '찾기·제외·태그·PID·레벨 필터에 정규식과 AND/OR 검색까지.',
    'features.signal.title': '에러·크래시, 발생 즉시 눈에 띄게',
    'features.signal.desc': '미니맵·시그널 이슈·타임라인에 표시되고, 클릭하면 그 지점으로 바로 이동.',
    'features.perf.title': '성능을 실시간으로, 한눈에',
    'features.perf.desc': 'CPU·메모리·버벅임·배터리·온도를 로그와 나란히 실시간 모니터링.',
    'features.bookmark.title': '중요한 그 줄, 다시 놓치지 마세요',
    'features.bookmark.desc': '핵심 로그를 북마크하고 색으로 분류해 언제든 바로 점프.',

    'details.heading': '작은 것까지 신경 썼습니다',
    'details.inspect.title': '한 줄을 더블클릭하면, 전부 펼쳐집니다',
    'details.inspect.desc': '로그에 박힌 JSON도 접었다 폈다. Pretty / Raw 를 오가며 읽고 그대로 복사하세요.',
    'details.retrace.title': '난독화된 스택도 사람이 읽는 문장으로',
    'details.retrace.desc': '매핑 파일을 물리면 Retrace 가 알아볼 수 없던 스택트레이스를 원래 이름으로 되돌립니다.',
    'details.report.title': '크래시 리포트를 한 번에 복사',
    'details.report.desc': '크래시 구간을 알아서 잡아냅니다. 우클릭 한 번이면 기기·OS 정보까지 함께.',
    'details.bookmark.title': '색으로 분류하는 북마크',
    'details.bookmark.desc': '중요한 줄을 표시하고 색으로 나눠 언제든 되돌아옵니다.',
    'details.tagcolor.title': '태그마다 다른 색',
    'details.tagcolor.desc': '자주 보는 태그를 색으로 구분해 두면 스크롤 중에도 눈이 먼저 찾습니다.',
    'details.signals.title': '32종 시그널이 처음부터 들어 있습니다',
    'details.signals.desc': '크래시·ANR·네이티브 크래시·메모리를 규칙으로 잡아냅니다. 직접 규칙을 추가할 수도 있습니다.',

    'intro.free': '무료입니다.<br>맘 편히 가져다 쓰세요!',
    'download.for': '{os}용 다운로드',
    'download.viewAll': '모든 다운로드 보기',
    'download.otherPlatforms': '다른 플랫폼 ↓',

    'stats.downloads': '다운로드',
    'stats.visits': '방문',
    'stats.latest': '최신 버전',

    'releases.latest': 'Latest',
    'releases.prerelease': 'Pre-release',
    'assets.title': 'Assets',
    'kind.installer': 'Installer',
    'kind.portable': 'Portable',
    'group.macos': 'macOS',
    'group.windows': 'Windows',
    'group.linux': 'Linux',
    'group.other': 'Other',
    'empty.title': '릴리즈 준비 중',
    'empty.body': '첫 공개 릴리즈를 준비하고 있어요. 곧 다운로드를 제공할게요!',

    'footer.role': 'LogcatOn 만든 사람',
    'footer.reportBug': '버그 신고',
    'footer.requestFeature': '기능 제안',
    'footer.releaseNotes': '릴리즈 노트',
  },

  en: {
    'meta.title': 'LogcatOn — Android Logcat Viewer for macOS, Windows & Linux (Free)',
    'meta.description':
      'Fast multi-platform Android logcat viewer. Pick an app and PID/TID filter themselves, ' +
      '32 built-in signal highlights (crash, ANR, native crash, memory), regex search and bookmarks. ' +
      'Free download for macOS, Windows and Linux.',

    'nav.download': 'Download',
    'theme.toggle': 'Toggle theme',

    'hero.badge': '{tag} · macOS · Windows · Linux',
    'hero.heading': 'Jump straight to<br>the <em>one line</em><br>that matters.',
    'hero.lede':
      'Crashes, ANRs, even native crashes land on the minimap and timeline the moment they happen. ' +
      'One click takes you there. Large logs keep flowing without a stutter.',
    'hero.meta': 'Free · No account needed · <b>{size}</b>',

    'band.heading': 'Real screen, no edits',
    'band.sub':
      'A crash lands mid-flood, marks the minimap, and we jump right to it. Recorded in one take.',
    'band.caption': 'Screen recording · 23s · silent · unedited',

    'features.heading': 'Built for the way<br>you actually debug',
    'features.sub': "We didn't list features. We laid out the screen in the order you read logs.",
    'features.app.title': 'Only the app you care about',
    'features.app.desc':
      'Connect a device and pick an app to see just its logs. Install, launch, and force-stop, all in one place.',
    'features.filter.title': 'Narrow down to the lines you want',
    'features.filter.desc': 'Find, exclude, tag, PID and level filters — plus regex and AND/OR search.',
    'features.signal.title': 'Crashes catch your eye, instantly',
    'features.signal.desc': 'Shown on the minimap, signal issues, and timeline — click to jump straight there.',
    'features.perf.title': 'Performance, live at a glance',
    'features.perf.desc': 'Monitor CPU, memory, jank, battery and temperature alongside your logs.',
    'features.bookmark.title': 'Never lose the line that matters',
    'features.bookmark.desc': 'Bookmark key lines, tag them by color, and jump back in an instant.',

    'details.heading': 'The small things, handled',
    'details.inspect.title': 'Double-click a line and it all unfolds',
    'details.inspect.desc':
      'JSON buried in a log line folds and unfolds. Switch between Pretty and Raw, then copy it as is.',
    'details.retrace.title': 'Obfuscated stacks, back in plain names',
    'details.retrace.desc':
      'Point Retrace at your mapping file and unreadable stack traces come back with their original names.',
    'details.report.title': 'Copy a crash report in one go',
    'details.report.desc':
      'The crash region is detected for you. One right-click copies it with device and OS info attached.',
    'details.bookmark.title': 'Bookmarks, sorted by color',
    'details.bookmark.desc': 'Mark the lines that matter, group them by color, and come back anytime.',
    'details.tagcolor.title': 'A different color per tag',
    'details.tagcolor.desc': 'Give the tags you watch their own colors and your eye finds them mid-scroll.',
    'details.signals.title': '32 signals, built in from the start',
    'details.signals.desc':
      'Crashes, ANRs, native crashes and memory issues are caught by built-in rules. You can add your own too.',

    'intro.free': "It's free.<br>Grab it and enjoy!",
    'download.for': 'Download for {os}',
    'download.viewAll': 'View all downloads',
    'download.otherPlatforms': 'Other platforms ↓',

    'stats.downloads': 'Downloads',
    'stats.visits': 'Visits',
    'stats.latest': 'Latest',

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

    'footer.role': 'Maker of LogcatOn',
    'footer.reportBug': 'Report a bug',
    'footer.requestFeature': 'Request a feature',
    'footer.releaseNotes': 'Release notes',
  },

  ja: {
    'meta.title': 'LogcatOn — Android Logcat ビューア · macOS/Windows/Linux 無料',
    'meta.description':
      '高速なマルチプラットフォーム Android Logcat ビューア。アプリを選ぶだけで PID/TID を自動フィルタ、' +
      '32 種のシグナル強調（クラッシュ・ANR・ネイティブクラッシュ・メモリ）、正規表現検索とブックマーク。' +
      'macOS・Windows・Linux 無料ダウンロード。',

    'nav.download': 'ダウンロード',
    'theme.toggle': 'テーマ切り替え',

    'hero.badge': '{tag} · macOS · Windows · Linux',
    'hero.heading': '押し寄せるログの中から<br><em>その一行</em>に<br>すぐジャンプ。',
    'hero.lede':
      'クラッシュや ANR、ネイティブクラッシュまで、発生した瞬間にミニマップとタイムラインへ表示。' +
      'クリック一回でその地点へ移動します。大量のログも途切れず流れます。',
    'hero.meta': '無料・アカウント不要・<b>{size}</b>',

    'band.heading': '編集なし、実際の画面です',
    'band.sub':
      'ログが流れる最中にクラッシュが発生し、ミニマップに記録され、その地点へ移動するまで。ワンテイクで録画しました。',
    'band.caption': '画面録画・23秒・無音・編集なし',

    'features.heading': '実際のデバッグの流れに<br>合わせて設計しました',
    'features.sub': '機能を並べたのではありません。ログを読む順序のまま画面を設計しました。',
    'features.app.title': 'そのアプリのログだけ、すっきりと',
    'features.app.desc':
      'デバイスを接続してアプリを選ぶと、そのアプリのログだけ。インストール・起動・強制終了も一か所で。',
    'features.filter.title': '必要な行だけ、選んで表示',
    'features.filter.desc': '検索・除外・タグ・PID・レベルのフィルタに、正規表現と AND/OR 検索まで。',
    'features.signal.title': 'エラーとクラッシュが、発生と同時に目に入る',
    'features.signal.desc': 'ミニマップ・シグナルイシュー・タイムラインに表示され、クリックでその地点へ即移動。',
    'features.perf.title': 'パフォーマンスをリアルタイムで一目に',
    'features.perf.desc': 'CPU・メモリ・ジャンク・バッテリー・温度をログと並べてリアルタイム監視。',
    'features.bookmark.title': '大事なあの行を、もう見失わない',
    'features.bookmark.desc': '重要なログをブックマークして色で分類、いつでもすぐジャンプ。',

    'details.heading': '細部まで気を配りました',
    'details.inspect.title': '一行をダブルクリックすれば、すべて展開',
    'details.inspect.desc':
      'ログに埋もれた JSON も折りたたみ自在。Pretty と Raw を行き来しながら読んで、そのままコピー。',
    'details.retrace.title': '難読化されたスタックも、読める名前に',
    'details.retrace.desc':
      'マッピングファイルを指定すれば、Retrace が判読できないスタックトレースを元の名前に戻します。',
    'details.report.title': 'クラッシュレポートを一度にコピー',
    'details.report.desc':
      'クラッシュ範囲は自動で検出。右クリック一回で端末・OS 情報まで一緒にコピーされます。',
    'details.bookmark.title': '色で分けるブックマーク',
    'details.bookmark.desc': '重要な行に印を付け、色で分類していつでも戻れます。',
    'details.tagcolor.title': 'タグごとに違う色',
    'details.tagcolor.desc': 'よく見るタグを色で分けておけば、スクロール中でも目が先に見つけます。',
    'details.signals.title': '32 種のシグナルを最初から搭載',
    'details.signals.desc':
      'クラッシュ・ANR・ネイティブクラッシュ・メモリをルールで検出。独自のルールも追加できます。',

    'intro.free': '無料です。<br>安心してお使いください！',
    'download.for': '{os} 版をダウンロード',
    'download.viewAll': 'すべてのダウンロードを見る',
    'download.otherPlatforms': '他のプラットフォーム ↓',

    'stats.downloads': 'ダウンロード数',
    'stats.visits': '訪問数',
    'stats.latest': '最新版',

    'releases.latest': 'Latest',
    'releases.prerelease': 'Pre-release',
    'assets.title': 'Assets',
    'kind.installer': 'Installer',
    'kind.portable': 'Portable',
    'group.macos': 'macOS',
    'group.windows': 'Windows',
    'group.linux': 'Linux',
    'group.other': 'Other',
    'empty.title': 'リリース準備中',
    'empty.body': '最初の公開リリースを準備しています。まもなくダウンロードを提供します！',

    'footer.role': 'LogcatOn 開発者',
    'footer.reportBug': 'バグ報告',
    'footer.requestFeature': '機能リクエスト',
    'footer.releaseNotes': 'リリースノート',
  },

  zh: {
    'meta.title': 'LogcatOn — Android Logcat 查看器 · macOS/Windows/Linux 免费',
    'meta.description':
      '快速的跨平台 Android Logcat 查看器。选择应用即自动过滤 PID/TID，' +
      '32 种信号高亮（崩溃、ANR、原生崩溃、内存），正则搜索与书签。' +
      'macOS、Windows、Linux 免费下载。',

    'nav.download': '下载',
    'theme.toggle': '切换主题',

    'hero.badge': '{tag} · macOS · Windows · Linux',
    'hero.heading': '在海量日志中<br>直接跳到<br><em>关键的那一行</em>。',
    'hero.lede':
      '崩溃、ANR，乃至原生崩溃，都会在发生的瞬间标注到迷你地图和时间线上。' +
      '点击一下即可跳转过去。大量日志也能流畅滚动。',
    'hero.meta': '免费 · 无需账号 · <b>{size}</b>',

    'band.heading': '未经剪辑的真实画面',
    'band.sub': '日志刷屏之际崩溃发生、标记到迷你地图、再跳转到该位置。一次录制完成。',
    'band.caption': '屏幕录制 · 23 秒 · 无声 · 未剪辑',

    'features.heading': '按照真实的调试方式<br>来设计',
    'features.sub': '我们没有罗列功能，而是按照你阅读日志的顺序来安排界面。',
    'features.app.title': '只看你关心的那个应用',
    'features.app.desc': '连接设备并选择应用，就只显示该应用的日志。安装、启动、强制停止也都在同一处。',
    'features.filter.title': '只挑出你想看的行',
    'features.filter.desc': '查找、排除、标签、PID 和级别过滤，还支持正则与 AND/OR 搜索。',
    'features.signal.title': '错误与崩溃，发生即醒目',
    'features.signal.desc': '在迷你地图、信号问题和时间线上标出，点击即可直接跳转。',
    'features.perf.title': '性能实时一目了然',
    'features.perf.desc': '在日志旁实时监控 CPU、内存、卡顿、电量与温度。',
    'features.bookmark.title': '重要的那一行，别再弄丢',
    'features.bookmark.desc': '为关键日志加书签并按颜色分类，随时快速跳回。',

    'details.heading': '连细节也不放过',
    'details.inspect.title': '双击一行，全部展开',
    'details.inspect.desc': '嵌在日志里的 JSON 也能自由折叠。在 Pretty 与 Raw 之间切换阅读，并原样复制。',
    'details.retrace.title': '混淆的堆栈，还原成可读的名字',
    'details.retrace.desc': '指定映射文件后，Retrace 会把无法辨认的堆栈还原为原始名称。',
    'details.report.title': '一次复制崩溃报告',
    'details.report.desc': '自动识别崩溃区间。右键一次即可连同设备与系统信息一起复制。',
    'details.bookmark.title': '用颜色分类的书签',
    'details.bookmark.desc': '标记重要的行并按颜色分组，随时回到那里。',
    'details.tagcolor.title': '每个标签一种颜色',
    'details.tagcolor.desc': '给常看的标签分配颜色，滚动时一眼就能认出来。',
    'details.signals.title': '内置 32 种信号',
    'details.signals.desc': '按规则捕捉崩溃、ANR、原生崩溃与内存问题。你也可以自行添加规则。',

    'intro.free': '免费。<br>放心使用！',
    'download.for': '下载 {os} 版',
    'download.viewAll': '查看全部下载',
    'download.otherPlatforms': '其他平台 ↓',

    'stats.downloads': '下载量',
    'stats.visits': '访问量',
    'stats.latest': '最新版本',

    'releases.latest': 'Latest',
    'releases.prerelease': 'Pre-release',
    'assets.title': 'Assets',
    'kind.installer': 'Installer',
    'kind.portable': 'Portable',
    'group.macos': 'macOS',
    'group.windows': 'Windows',
    'group.linux': 'Linux',
    'group.other': 'Other',
    'empty.title': '版本准备中',
    'empty.body': '我们正在准备首个公开版本，下载很快就会上线！',

    'footer.role': 'LogcatOn 作者',
    'footer.reportBug': '报告问题',
    'footer.requestFeature': '功能建议',
    'footer.releaseNotes': '发行说明',
  },
};

export const LANG_NAMES = { en: 'English', ko: '한국어', ja: '日本語', zh: '简体中文' };
export const OS_NAMES = { macos: 'macOS', windows: 'Windows', linux: 'Linux' };
