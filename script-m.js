/* ==========================================================
   MS Electric - MOBILE ONLY Script (script-m.js)
   ========================================================== */
(function () {
  'use strict';

  /* ---------- ছোট সাহায্যকারী ---------- */
  function $(sel, scope) { return (scope || document).querySelector(sel); }
  function $all(sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); }
  function store(key, val) { try { localStorage.setItem(key, val); } catch (e) { /* ignore */ } }

  /* ---------- ১. মোবাইল মেনু ---------- */
  var toggle = $('.menu-toggle');
  var panel = $('.nav-panel');

  function setMenu(open) {
    if (!toggle || !panel) return;
    panel.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    var icon = $('i', toggle);
    if (icon) icon.className = open ? 'fas fa-times' : 'fas fa-bars';
  }

  if (toggle && panel) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setMenu(!panel.classList.contains('open'));
    });
    $all('a', panel).forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('click', function (e) {
      if (panel.classList.contains('open') && !panel.contains(e.target)) setMenu(false);
    });
  }

  /* ---------- ২. হেডারে ছায়া (স্ক্রল করলে) ---------- */
  var header = $('.main-header');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- ৩. স্ক্রলে ধীরে ধীরে দেখানো ---------- */
  var revealItems = $all('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (el) { io.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- ৪. বছর ---------- */
  $all('.js-year').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- ৫. ছবি জুম (Lightbox) ---------- */
  var lightbox = $('#lightbox');
  if (lightbox) {
    var lbImg = $('img', lightbox);
    var closeBtn = $('.lightbox-close', lightbox);

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    $all('.gallery-grid img').forEach(function (img) {
      img.addEventListener('click', function () {
        if (!img.currentSrc && !img.src) return;
        lbImg.src = img.currentSrc || img.src;
        lbImg.alt = img.alt || '';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target === closeBtn) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* ---------- ৬. ভিডিও স্লাইডারের ডট ---------- */
  var grid = $('.video-grid');
  var dotsBox = $('.video-dots');
  if (grid && dotsBox) {
    var cards = $all('.video-card', grid);
    cards.forEach(function (_, i) {
      var dot = document.createElement('span');
      if (i === 0) dot.className = 'active';
      dotsBox.appendChild(dot);
    });
    var dots = $all('span', dotsBox);

    var ticking = false;
    grid.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var center = grid.scrollLeft + grid.clientWidth / 2;
        var best = 0, bestDist = Infinity;
        cards.forEach(function (card, i) {
          var cardCenter = card.offsetLeft + card.offsetWidth / 2;
          var d = Math.abs(cardCenter - center);
          if (d < bestDist) { bestDist = d; best = i; }
        });
        dots.forEach(function (dot, i) { dot.classList.toggle('active', i === best); });
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- ৭. মোবাইল / ডেস্কটপ ভার্সন বদলের বাটন ---------- */
  // বাটনে data-view="desktop" থাকলে ডেস্কটপ ভার্সনে যাবে এবং পছন্দ মনে রাখবে।
  $all('[data-view]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var view = btn.getAttribute('data-view');      // 'desktop' বা 'mobile'
      var target = btn.getAttribute('data-target') || btn.getAttribute('href') || 'index.html';
      store('msView', view);
      window.location.href = target;
    });
  });

  // এই পেজ খোলা মানে মোবাইল ভার্সন বেছে নেওয়া হয়েছে
  store('msView', 'mobile');
})();
