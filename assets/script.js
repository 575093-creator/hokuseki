/* 有限会社北陸石油物流 コーポレートサイト 共通スクリプト */
(function () {
  'use strict';

  /* --- ヘッダー：スクロールで影を付ける --- */
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --- モバイルメニューの開閉 --- */
  var burger = document.querySelector('.burger');
  var gnav = document.querySelector('.gnav');
  if (burger && gnav) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      gnav.classList.toggle('is-open', !open);
    });
    gnav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        burger.setAttribute('aria-expanded', 'false');
        gnav.classList.remove('is-open');
      }
    });
  }

  /* --- スクロールで要素をふわっと表示 --- */
  var targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add('is-visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
  Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
})();
