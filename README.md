# logcat-on-releases

[LogcatOn](https://qwerfunch.github.io/logcat-on-releases/) — 안드로이드 로그캣 뷰어의 **공개 릴리즈 허브**.

비공개 소스 레포(`qwerfunch/logcat-on`)의 CI 가 이 레포에 공개용 GitHub Release 를
등록하면, 이 레포의 [Deploy Pages 워크플로](.github/workflows/deploy.yml)가 릴리즈
데이터를 `releases.json` 으로 베이크해 GitHub Pages 로 자동 배포한다.

## 구조

```
index.html                    # 릴리즈 페이지 (Tailwind Play CDN, 단일 페이지)
assets/app.js                 # 렌더링: i18n(ko/en) · OS 감지 다운로드 버튼 · 릴리즈 목록
assets/i18n.js                # UI 문자열 사전 (릴리즈 노트 본문은 원문 그대로)
scripts/build-releases.mjs    # GitHub Releases → dist/releases.json (의존성 0)
video/logcat-on.mp4           # 메인 데모 비디오
data/releases.sample.json     # 로컬 프리뷰용 픽스처 (배포 아티팩트에 미포함)
.github/workflows/deploy.yml  # release 이벤트/main push → Pages 빌드·배포
```

## 로컬 프리뷰

```sh
# 레포 루트를 그대로 서빙 — releases.json 이 없으면 data/ 픽스처로 폴백
python3 -m http.server 8000
open http://localhost:8000/

# 실데이터로 빌드해 보려면
GITHUB_TOKEN=$(gh auth token) node scripts/build-releases.mjs
```

## 1회 설정

- Settings → Pages → **Source = GitHub Actions**
  (`gh api -X POST repos/qwerfunch/logcat-on-releases/pages -f build_type=workflow`)

## logcat-on 쪽 연동 (향후)

`logcat-on/.github/workflows/release.yml` 의 릴리즈 생성/업로드 대상을
`qwerfunch/logcat-on-releases` 로 변경해야 한다. 기본 `GITHUB_TOKEN` 은 타 레포에
쓰기 불가 → 이 레포 `contents:write` 권한의 fine-grained PAT 를 `logcat-on` 의
secret 으로 등록해 사용. 릴리즈가 여기 등록되면 `release: published` 이벤트로
페이지가 자동 갱신된다.
