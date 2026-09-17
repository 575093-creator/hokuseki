(function () {
  'use strict';

  /* スマホメニュー */
  var burger = document.querySelector('.burger');
  var navWrap = document.querySelector('.gnav-wrap');
  if (burger && navWrap) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      navWrap.classList.toggle('is-open', !open);
      document.body.classList.toggle('nav-open', !open);
    });
    navWrap.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        burger.setAttribute('aria-expanded', 'false');
        navWrap.classList.remove('is-open');
        document.body.classList.remove('nav-open');
      }
    });
  }

  /* メインビジュアルのスライダー */
  var slides = [].slice.call(document.querySelectorAll('.slide'));
  if (slides.length > 1) {
    var current = 0, timer;
    var go = function (n) {
      slides[current].classList.remove('is-active');
      current = (n + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    };
    var auto = function () {
      clearInterval(timer);
      timer = setInterval(function () { go(current + 1); }, 6000);
    };
    var prev = document.querySelector('.mv-arrow.prev');
    var next = document.querySelector('.mv-arrow.next');
    if (prev) prev.addEventListener('click', function () { go(current - 1); auto(); });
    if (next) next.addEventListener('click', function () { go(current + 1); auto(); });
    auto();
  }

  /* ページトップ */
  var pageTop = document.querySelector('.page-top');
  if (pageTop) {
    var toggle = function () { pageTop.classList.toggle('show', window.scrollY > 400); };
    toggle();
    window.addEventListener('scroll', toggle, { passive: true });
    pageTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* スクロールで表示 */
  var fades = document.querySelectorAll('.fade');
  if (!('IntersectionObserver' in window)) {
    [].forEach.call(fades, function (el) { el.classList.add('on'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('on'); io.unobserve(entry.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  [].forEach.call(fades, function (el) { io.observe(el); });
})();
