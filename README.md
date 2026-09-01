# 연희 스테이 (Yeonhee Stay) 홈페이지

정적 HTML/CSS/JS로 만든 숙소 소개 홈페이지입니다. 빌드 과정 없이 GitHub Pages 같은 무료 정적 호스팅에 그대로 올리면 됩니다.

```
yeonhee-stay/
├── index.html          ← 페이지 본문 (모든 텍스트·사진 주소가 여기 있습니다)
├── css/style.css        ← 디자인
├── js/main.js            ← 언어 전환, 예약 링크 반영, 스크롤 효과, 모바일 메뉴
├── assets/                ← 로고·파비콘·OG 이미지
└── favicon.ico
```

---

## 1. 꼭 해야 할 설정 — 에어비앤비 예약 링크

`index.html` 위쪽의 `<body data-booking-url="">` 큰따옴표 안에 숙소 URL을 넣어주세요.

```html
<body data-booking-url="https://www.airbnb.co.kr/rooms/12345678">
```

이 한 곳만 채우면 페이지의 모든 예약 버튼에 자동으로 반영됩니다. 비워두면 상단·하단 예약 버튼은 예약 섹션으로 이동만 하고, 맨 아래 "에어비앤비에서 예약하기" 버튼만 비활성 상태로 표시됩니다.

## 2. ⚠️ 공개 전 반드시 — 사진 교체

지금 페이지의 사진은 **무료 스톡 사진(Unsplash)이며 실제 숙소가 아닙니다.** 게스트가 오해할 수 있으니 실제 촬영본으로 꼭 교체해주세요.

교체 방법은 두 가지입니다.

**방법 A — 사진 파일을 저장소에 넣기 (권장)**

1. 사진을 `assets/photos/` 폴더에 넣습니다 (예: `living.jpg`, `bed1.jpg`).
2. `index.html`에서 `https://images.unsplash.com/...`로 시작하는 주소를 파일 경로로 바꿉니다.

```html
<!-- 변경 전 -->
<img src="https://images.unsplash.com/photo-1680965075873-...&q=80" alt="거실" data-photo loading="lazy">

<!-- 변경 후 -->
<img src="assets/photos/living.jpg" alt="거실" data-photo loading="lazy">
```

**방법 B — 사진 주소만 교체**

이미 사진이 인터넷에 올라가 있다면 `src="..."` 값만 그 주소로 바꾸면 됩니다.

교체할 위치는 `index.html`에서 `data-photo`로 검색하면 모두 찾을 수 있습니다 (총 14곳: 히어로 1 · 소개 1 · 갤러리 5 · 위치 1 · 주변 정보 5 · 예약 1).

사진 비율은 CSS가 알아서 맞춰주므로(`object-fit: cover`) 어떤 크기를 넣어도 레이아웃이 깨지지 않습니다. 가로 1600px 내외, 1MB 이하를 권장합니다.

사진을 모두 교체한 뒤에는 갤러리 위의 안내 문구도 지워주세요 — `index.html`에서 "분위기 참고용 이미지" 로 검색하면 나오는 `<p class="sec-note">` 한 줄입니다.

> 사진 주소가 잘못되거나 인터넷이 느려 사진이 안 뜨더라도, 브랜드 색 그래픽이 대신 표시되도록 되어 있어 페이지가 깨져 보이지 않습니다.

## 3. 로컬에서 미리보기

`index.html`을 브라우저로 열면 바로 확인할 수 있습니다. (글꼴과 스톡 사진은 인터넷 연결이 있어야 정상적으로 보입니다.)

## 4. GitHub Pages로 무료 배포하기

1. [github.com](https://github.com)에서 로그인 후 **+ → New repository**로 저장소를 만듭니다. **Public**으로 설정하세요.
2. 이 폴더의 모든 파일을 저장소에 올립니다.
   - 웹에서: **Add file → Upload files**에 끌어다 놓고 **Commit changes**
   - 터미널에서:
     ```bash
     cd yeonhee-stay
     git init
     git add .
     git commit -m "연희 스테이 홈페이지"
     git branch -M main
     git remote add origin https://github.com/내계정/저장소이름.git
     git push -u origin main
     ```
3. 저장소의 **Settings → Pages**로 이동합니다.
4. **Source**를 `Deploy from a branch`, **Branch**를 `main` / `/(root)`로 지정하고 **Save**.
5. 1~2분 뒤 `https://내계정.github.io/저장소이름/` 주소가 표시됩니다.

이후 파일을 수정하고 다시 push(또는 재업로드)하면 몇 분 안에 자동 반영됩니다.

## 5. 나중에 실제 도메인 연결하기

가비아·후이즈 등에서 도메인을 구매한 뒤 **Settings → Pages → Custom domain**에 입력하고, 도메인 관리 화면에서 안내되는 CNAME/A 레코드를 등록하면 됩니다.

---

## 참고 — 디자인 메모

- 색: 로고에서 뽑은 크림(`#FBF1E8`)과 에스프레소(`#241A13`)를 축으로, 밝은 섹션과 어두운 섹션을 번갈아 배치했습니다.
- 글꼴: 제목은 Cormorant Garamond + 나눔명조, 본문은 Inter + 본고딕(Noto Sans KR)입니다.
- 한국어/영어는 같은 페이지 안에서 전환됩니다. 텍스트를 고칠 때는 `<span class="ko">`와 `<span class="en">` 두 곳을 함께 수정해주세요.
- 사진 라이선스: Unsplash License (상업적 사용 가능, 출처 표기 의무 없음). 어차피 실제 사진으로 교체할 예정이라면 신경 쓰지 않아도 됩니다.
