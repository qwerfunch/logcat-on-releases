// i18n.js — 페이지 UI 문자열 ko/en 사전.
// 릴리즈 노트 본문은 번역하지 않고 작성된 원문(한국어) 그대로 표시한다.
// 값에 HTML(<br> 등)을 포함할 수 있으므로 적용 시 innerHTML 사용 — 사전은
// 이 레포의 코드 자체이므로 신뢰 경계 안.

export const STRINGS = {
  ko: {
    'meta.title': 'LogcatOn — 안드로이드 로그캣 뷰어',
    'meta.description':
      '안드로이드 스튜디오 로그캣이 불편해서 직접 만든 데스크톱 로그 뷰어. 무료 다운로드.',
    'lang.toggle': 'EN',
    'intro.heading': '안드로이드 스튜디오 로그캣,<br>너무 불편해서 직접 만들었어요 😹',
    'intro.body':
      '매번 쏟아지는 로그 속에서 원하는 정보를 찾기 답답하셨죠?<br>' +
      '저 역시 기존 로그캣의 아쉬움에 지쳐, 제가 편하게 쓰려고 직접 개발하게 되었습니다.<br>' +
      '개발자의 눈과 시간을 아껴주는 직관적인 로그 분석을 이제 LogcatOn과 함께 경험해 보세요!',
    'intro.free': '무료로 열어두었으니 맘 편히 가져다 쓰세요!',
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
  },
  en: {
    'meta.title': 'LogcatOn — Android Logcat Viewer',
    'meta.description':
      "A desktop Android logcat viewer, built because Android Studio's logcat felt clunky. Free download.",
    'lang.toggle': '한국어',
    'intro.heading': "Android Studio's logcat was so painful,<br>I just built my own 😹",
    'intro.body':
      'Tired of digging for the one line you need in a flood of logs?<br>' +
      'So was I — so I built the logcat viewer I always wanted to use.<br>' +
      'Experience intuitive log analysis that saves your eyes and your time, with LogcatOn!',
    'intro.free': "It's free and open — grab it and enjoy!",
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
  },
};

// OS 표시명 — 두 언어 공통.
export const OS_NAMES = { macos: 'macOS', windows: 'Windows', linux: 'Linux' };
