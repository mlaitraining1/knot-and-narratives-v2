/* ==========================================================================
   THE KNOT & NARRATIVES — site.js
   Vanilla JS, no dependencies. Progressive enhancement throughout.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Hero background slideshow (images + one video slide) ---------------- */
  document.querySelectorAll('[data-hero-slideshow]').forEach(function (wrap) {
    var slides = wrap.querySelectorAll('.hero-slide');
    if (slides.length < 2) return;
    var heroSection = wrap.closest('.hero');
    var current = 0;
    var fallbackTimer;
    var dotsWrap = heroSection ? heroSection.querySelector('.hero-dots') : null;

    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var b = document.createElement('button');
        b.setAttribute('aria-label', 'Show background ' + (i + 1));
        if (i === 0) b.classList.add('is-active');
        b.addEventListener('click', function () { goTo(i); });
        dotsWrap.appendChild(b);
      });
    }

    function syncDots() {
      if (!dotsWrap) return;
      Array.prototype.forEach.call(dotsWrap.children, function (b, i) {
        b.classList.toggle('is-active', i === current);
      });
    }

    function activate(i, userInitiated) {
      var prev = slides[current];
      if (prev.tagName === 'VIDEO') { prev.pause(); }
      prev.classList.remove('is-active');
      current = i;
      slides[current].classList.add('is-active');
      syncDots();
      schedule(userInitiated);
    }

    function goNext() { activate((current + 1) % slides.length); }
    function goPrev() { activate((current - 1 + slides.length) % slides.length, true); }
    function goTo(i) { if (i !== current) activate(i, true); }

    function schedule(userInitiated) {
      clearTimeout(fallbackTimer);
      if (reduceMotion) return; // manual arrows/dots still work; no auto-advance
      var el = slides[current];
      if (el.tagName === 'VIDEO') {
        el.currentTime = 0;
        var p = el.play();
        if (p && p.catch) { p.catch(function () { /* autoplay blocked — fallback timer still advances */ }); }
        el.addEventListener('ended', goNext, { once: true });
        fallbackTimer = setTimeout(goNext, 9000);
      } else {
        fallbackTimer = setTimeout(goNext, 5500);
      }
    }

    var prevBtn = heroSection ? heroSection.querySelector('.hero-nav-prev') : null;
    var nextBtn = heroSection ? heroSection.querySelector('.hero-nav-next') : null;
    if (prevBtn) prevBtn.addEventListener('click', goPrev);
    if (nextBtn) nextBtn.addEventListener('click', function () { activate((current + 1) % slides.length, true); });

    schedule();
  });

  /* ---------------- Header scroll state ---------------- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile nav ---------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('is-open');
      document.body.classList.toggle('nav-open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.remove('is-open');
        document.body.classList.remove('nav-open');
      });
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  var revealEls = document.querySelectorAll('.reveal, .stagger');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });

    var threadEls = document.querySelectorAll('.thread-path');
    var threadIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-drawn');
          threadIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    threadEls.forEach(function (el) { threadIo.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    document.querySelectorAll('.thread-path').forEach(function (el) { el.classList.add('is-drawn'); });
  }

  /* ---------------- Testimonial slider ---------------- */
  document.querySelectorAll('[data-testimonial-slider]').forEach(function (slider) {
    var slides = slider.querySelectorAll('.testimonial-slide');
    var dotsWrap = slider.querySelector('.testimonial-dots');
    var current = 0, timer;
    if (!slides.length) return;
    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var b = document.createElement('button');
        b.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
        if (i === 0) b.classList.add('is-active');
        b.addEventListener('click', function () { go(i); resetTimer(); });
        dotsWrap.appendChild(b);
      });
    }
    function go(i) {
      slides[current].classList.remove('is-active');
      dotsWrap && dotsWrap.children[current] && dotsWrap.children[current].classList.remove('is-active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      dotsWrap && dotsWrap.children[current] && dotsWrap.children[current].classList.add('is-active');
    }
    function resetTimer() {
      clearInterval(timer);
      if (!reduceMotion) timer = setInterval(function () { go(current + 1); }, 6000);
    }
    resetTimer();
  });

  /* ---------------- FAQ accordion ---------------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');
      item.parentElement.querySelectorAll('.faq-item').forEach(function (other) {
        other.classList.remove('is-open');
        other.querySelector('.faq-a').style.maxHeight = null;
        other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('is-open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------------- Portfolio filter ---------------- */
  var filterBar = document.querySelector('.filter-bar');
  if (filterBar) {
    var items = document.querySelectorAll('.masonry-item');
    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var filter = btn.dataset.filter;
      items.forEach(function (item) {
        var show = filter === 'all' || item.dataset.category === filter;
        item.hidden = !show;
      });
    });
  }

  /* ---------------- Lightbox ---------------- */
  var lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    var lbImg = lightbox.querySelector('img');
    var lbCaption = lightbox.querySelector('.lightbox-caption');
    var galleryItems = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox-src]'));
    var lbIndex = 0;

    function openLightbox(i) {
      lbIndex = i;
      var el = galleryItems[lbIndex];
      lbImg.src = el.dataset.lightboxSrc;
      lbImg.alt = el.dataset.lightboxAlt || '';
      if (lbCaption) lbCaption.textContent = el.dataset.lightboxCaption || '';
      lightbox.classList.add('is-open');
      document.body.classList.add('nav-open');
    }
    function closeLightbox() {
      lightbox.classList.remove('is-open');
      document.body.classList.remove('nav-open');
    }
    galleryItems.forEach(function (el, i) {
      el.addEventListener('click', function () { openLightbox(i); });
    });
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var prevBtn = lightbox.querySelector('.lightbox-prev');
    var nextBtn = lightbox.querySelector('.lightbox-next');
    closeBtn && closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    prevBtn && prevBtn.addEventListener('click', function () { openLightbox((lbIndex - 1 + galleryItems.length) % galleryItems.length); });
    nextBtn && nextBtn.addEventListener('click', function () { openLightbox((lbIndex + 1) % galleryItems.length); });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextBtn && nextBtn.click();
      if (e.key === 'ArrowLeft') prevBtn && prevBtn.click();
    });
  }

  /* ---------------- Contact forms (client-side validation + real Formspree submit) ---------------- */
  document.querySelectorAll('.js-contact-form').forEach(function (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = contactForm.querySelector('.form-status');
      var required = contactForm.querySelectorAll('[required]');
      var valid = true;
      required.forEach(function (field) {
        if (!field.value.trim()) valid = false;
      });
      if (!valid) {
        if (status) { status.textContent = 'Please fill in all required fields.'; status.style.color = '#B23A2E'; }
        return;
      }
      var btn = contactForm.querySelector('button[type="submit"]');
      var originalText = btn ? btn.textContent : '';
      if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }

      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            if (status) { status.textContent = "Thank you — your inquiry has been received. We'll reply within 24 hours."; status.style.color = '#3B6B4E'; }
            contactForm.reset();
          } else {
            return response.json().then(function (data) {
              var msg = (data && data.errors && data.errors.length)
                ? data.errors.map(function (er) { return er.message; }).join(', ')
                : 'Something went wrong sending your message. Please try again, or email us directly.';
              if (status) { status.textContent = msg; status.style.color = '#B23A2E'; }
            });
          }
        })
        .catch(function () {
          if (status) { status.textContent = "Couldn't send right now — please check your connection and try again, or email us directly."; status.style.color = '#B23A2E'; }
        })
        .finally(function () {
          if (btn) { btn.textContent = originalText; btn.disabled = false; }
        });
    });
  });

  /* ---------------- Client gallery — code lookup (see js/clients-data.js) ---------------- */
  var galleryForm = document.querySelector('#gallery-login-form');
  if (galleryForm) {
    galleryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = galleryForm.querySelector('.form-status');
      var resultWrap = document.querySelector('.gallery-lookup-result');
      var codeInput = galleryForm.querySelector('#gallery-code');
      var code = codeInput ? codeInput.value.trim().toUpperCase() : '';
      var data = (window.CLIENT_GALLERIES || {})[code];

      if (data && data.url) {
        if (status) status.textContent = '';
        if (resultWrap) {
          resultWrap.innerHTML =
            '<div class="gallery-lookup-found reveal is-visible">' +
            '<p style="font-size:0.85rem; letter-spacing:0.06em; text-transform:uppercase; color:var(--marigold-deep);">Gallery found</p>' +
            '<h3 style="margin-top:0.3rem;">' + data.name + '</h3>' +
            '<a href="' + data.url + '" target="_blank" rel="noopener" class="btn btn-primary u-mt-m">Open Your Gallery</a>' +
            '</div>';
        }
      } else if (status) {
        status.textContent = "We couldn't find a gallery for that code — double-check it against your delivery email, or message us on WhatsApp.";
        status.style.color = '#B23A2E';
      }
    });
  }

  /* ---------------- Homepage preview tabs (Portfolio / Albums / Videos) ---------------- */
  document.querySelectorAll('[data-preview-tabs]').forEach(function (wrap) {
    var tabs = wrap.querySelectorAll('.preview-tab');
    var panels = wrap.querySelectorAll('.preview-panel');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('is-active'); });
        panels.forEach(function (p) { p.classList.remove('is-active'); });
        tab.classList.add('is-active');
        var target = wrap.querySelector('.preview-panel[data-panel="' + tab.dataset.tab + '"]');
        if (target) target.classList.add('is-active');
      });
    });
  });

  /* ---------------- Contact modal ---------------- */
  var contactModal = document.querySelector('#contact-modal');
  if (contactModal) {
    var lastFocused;
    function openContactModal() {
      lastFocused = document.activeElement;
      contactModal.classList.add('is-open');
      document.body.classList.add('nav-open');
      var firstField = contactModal.querySelector('input, textarea');
      if (firstField) firstField.focus();
    }
    function closeContactModal() {
      contactModal.classList.remove('is-open');
      document.body.classList.remove('nav-open');
      if (lastFocused) lastFocused.focus();
    }
    document.querySelectorAll('[data-contact-trigger]').forEach(function (btn) {
      btn.addEventListener('click', openContactModal);
    });
    contactModal.querySelectorAll('[data-contact-close]').forEach(function (btn) {
      btn.addEventListener('click', closeContactModal);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && contactModal.classList.contains('is-open')) closeContactModal();
    });
  }

  /* ---------------- Video showcase (1 large autoplay-on-scroll + small click-to-play) ---------------- */
  document.querySelectorAll('.video-tile').forEach(function (tile) {
    var video = tile.querySelector('video');
    if (!video) return;

    if (tile.classList.contains('video-tile-main')) {
      // Large tile: autoplay (muted) once it scrolls into view; pause when it scrolls away.
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !reduceMotion) {
              video.muted = true;
              var p = video.play();
              if (p && p.catch) p.catch(function () {});
              tile.classList.add('is-playing');
            } else {
              video.pause();
              tile.classList.remove('is-playing');
            }
          });
        }, { threshold: 0.5 });
        io.observe(tile);
      }
      tile.addEventListener('click', function () {
        if (video.paused) { video.muted = false; video.play(); tile.classList.add('is-playing'); }
        else { video.pause(); tile.classList.remove('is-playing'); }
      });
    } else {
      // Small tiles: click to play with sound; click again to pause.
      tile.addEventListener('click', function () {
        if (video.paused) {
          document.querySelectorAll('.video-tile video').forEach(function (v) { if (v !== video) { v.pause(); v.closest('.video-tile').classList.remove('is-playing'); } });
          video.muted = false;
          video.play();
          tile.classList.add('is-playing');
        } else {
          video.pause();
          tile.classList.remove('is-playing');
        }
      });
      video.addEventListener('ended', function () { tile.classList.remove('is-playing'); });
    }
  });

  /* ---------------- Current year in footer ---------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

})();
