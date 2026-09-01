/* 연희 스테이 · Yeonhee Stay */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ------------------------------------------------------------------
     1. 예약 링크
     index.html 의 <body data-booking-url="..."> 값 하나만 채우면
     페이지의 모든 예약 버튼에 자동으로 반영됩니다.
  ------------------------------------------------------------------ */
  var bookingUrl = (document.body.getAttribute('data-booking-url') || '').trim();
  Array.prototype.forEach.call(document.querySelectorAll('[data-book]'), function (a) {
    if (bookingUrl) {
      a.href = bookingUrl;
      a.target = '_blank';
      a.rel = 'noopener';
    } else if (a.hasAttribute('data-book-primary')) {
      // 링크가 아직 없을 때는 마지막 예약 버튼만 비활성 상태로 표시하고,
      // 나머지 버튼은 그대로 예약 섹션으로 이동합니다.
      a.classList.add('is-off');
      a.removeAttribute('href');
      a.setAttribute('aria-disabled', 'true');
      a.title = '예약 링크가 아직 등록되지 않았습니다 / Booking link not set yet';
    }
  });

  /* ------------------------------------------------------------------
     2. 사진 로드 실패 시 브랜드 그래픽으로 대체
  ------------------------------------------------------------------ */
  Array.prototype.forEach.call(document.querySelectorAll('img[data-photo]'), function (img) {
    var fail = function () { img.style.display = 'none'; };
    img.addEventListener('error', fail);
    if (img.complete && img.naturalWidth === 0) fail();
  });

  /* ------------------------------------------------------------------
     3. 언어 전환
  ------------------------------------------------------------------ */
  var LANG_KEY = 'yeonhee-stay-lang';
  function applyLang(lang) {
    if (lang === 'en') { root.classList.add('lang-en'); root.setAttribute('lang', 'en'); }
    else { root.classList.remove('lang-en'); root.setAttribute('lang', 'ko'); }
  }
  try { if (localStorage.getItem(LANG_KEY) === 'en') applyLang('en'); } catch (e) {}

  var langBtn = document.getElementById('langBtn');
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      var next = root.classList.contains('lang-en') ? 'ko' : 'en';
      applyLang(next);
      try { localStorage.setItem(LANG_KEY, next); } catch (e) {}
    });
  }

  /* ------------------------------------------------------------------
     4. 스크롤에 따른 헤더 / 하단 예약바
  ------------------------------------------------------------------ */
  var nav = document.getElementById('nav');
  var dock = document.getElementById('dock');
  var ticking = false;

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle('solid', y > window.innerHeight * 0.72);
    if (dock) dock.classList.toggle('is-down', y < 260);
    ticking = false;
  }
  function requestScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }
  window.addEventListener('scroll', requestScroll, { passive: true });
  window.addEventListener('resize', requestScroll);
  onScroll();

  /* ------------------------------------------------------------------
     5. 모바일 메뉴
  ------------------------------------------------------------------ */
  var burger = document.getElementById('burger');
  var sheet = document.getElementById('sheet');
  var sheetClose = document.getElementById('sheetClose');

  function openSheet() {
    if (!sheet) return;
    sheet.hidden = false;
    document.body.style.overflow = 'hidden';
    if (burger) burger.setAttribute('aria-expanded', 'true');
  }
  function closeSheet() {
    if (!sheet) return;
    sheet.hidden = true;
    document.body.style.overflow = '';
    if (burger) burger.setAttribute('aria-expanded', 'false');
  }
  if (burger) burger.addEventListener('click', openSheet);
  if (sheetClose) sheetClose.addEventListener('click', closeSheet);
  if (sheet) {
    Array.prototype.forEach.call(sheet.querySelectorAll('a'), function (a) {
      a.addEventListener('click', closeSheet);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sheet && !sheet.hidden) closeSheet();
  });

  /* ------------------------------------------------------------------
     6. 스크롤 리빌
     IntersectionObserver 를 지원할 때만 숨김 상태를 켭니다.
     (JS 가 실패해도 콘텐츠는 항상 보이도록)
  ------------------------------------------------------------------ */
  var items = document.querySelectorAll('[data-anim]');
  if ('IntersectionObserver' in window && items.length) {
    root.setAttribute('data-anim', '');

    // 같은 부모 안에서는 살짝 시차를 둡니다.
    Array.prototype.forEach.call(items, function (el) {
      var siblings = el.parentNode ? el.parentNode.querySelectorAll(':scope > [data-anim]') : [];
      var i = Array.prototype.indexOf.call(siblings, el);
      if (i > 0) el.style.transitionDelay = Math.min(i, 5) * 90 + 'ms';
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

    Array.prototype.forEach.call(items, function (el) { io.observe(el); });

    // 안전장치: 어떤 이유로든 관찰이 동작하지 않으면 3초 뒤 모두 표시
    window.setTimeout(function () {
      Array.prototype.forEach.call(document.querySelectorAll('[data-anim]:not(.in)'), function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) el.classList.add('in');
      });
    }, 3000);
  }
})();
