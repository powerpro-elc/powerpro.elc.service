/* MS Electric - Main Script */
(function () {
  'use strict';

  // মোবাইল মেনু
  var toggle = document.querySelector('.mobile-menu-toggle');
  var nav = document.querySelector('.nav-container');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      var icon = toggle.querySelector('i');
      if (icon) icon.className = open ? 'fas fa-times' : 'fas fa-bars';
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // বর্তমান পেজ মেনুতে হাইলাইট
  var current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (current.indexOf('.') === -1) current = 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').toLowerCase();
    if (href === current) a.classList.add('active');
  });

  // স্ক্রল করলে হেডারে ছায়া
  var header = document.querySelector('.main-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 60 ? '0 4px 18px rgba(0,0,0,0.12)' : '';
    });
  }

  // ছবি/ভিডিও স্লট
  document.querySelectorAll('.media-slot img').forEach(function (img) {
    var slot = img.closest('.media-slot');
    function loaded() { if (slot) slot.classList.add('has-image'); }
    img.addEventListener('error', function () { img.remove(); });
    if (img.complete && img.naturalWidth > 0) loaded();
    img.addEventListener('load', loaded);
  });

  document.querySelectorAll('.media-slot video').forEach(function (video) {
    var sources = video.querySelectorAll('source');
    var failed = 0;
    function check() {
      failed++;
      if (failed >= sources.length) video.remove();
    }
    if (sources.length === 0) {
      video.addEventListener('error', function () { video.remove(); });
    } else {
      sources.forEach(function (s) { s.addEventListener('error', check); });
    }
  });

  // গ্যালারি ফিল্টার
  var filterBtns = document.querySelectorAll('.filter-btn');
  var items = document.querySelectorAll('.gallery-item[data-cat]');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.getAttribute('data-filter');
      items.forEach(function (item) {
        item.style.display = (cat === 'all' || item.getAttribute('data-cat') === cat) ? '' : 'none';
      });
    });
  });

  // লাইটবক্স
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lbImg = lightbox.querySelector('img');
    document.addEventListener('click', function (e) {
      var img = e.target.closest('.media-slot.has-image img');
      if (img && lbImg) {
        lbImg.src = img.src;
        lightbox.classList.add('open');
      } else if (e.target === lightbox || e.target.closest('.lightbox-close')) {
        lightbox.classList.remove('open');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }

  // যোগাযোগ ফর্ম -> হোয়াটসঅ্যাপ
  var WHATSAPP_NUMBER = '917718616461';
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var get = function (id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : '';
      };
      var msg =
        'নমস্কার, আমি ' + get('name') + '।\n' +
        'ফোন: ' + get('phone') + '\n' +
        'এলাকা: ' + get('area') + '\n' +
        'কাজের ধরন: ' + get('service') + '\n' +
        'বিবরণ: ' + get('message');
      window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      contactForm.reset();
    });
  }

  // ফুটারে বছর
  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // স্ক্রল করলে ধীরে ধীরে দেখানো (না চললেও দেড় সেকেন্ডে সব দেখা যায়)
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
    setTimeout(function () { reveals.forEach(function (el) { el.classList.add('visible'); }); }, 1500);
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }
})();
