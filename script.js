/* ============================================================
   DX Transportation & Warehousing — script.js
   Hamburger | FAQ Accordion | Contact Form → WhatsApp | Back to Top | Nav Active
   ============================================================ */

(function () {
  'use strict';

  /* -------------------------
     1. NAVBAR — Hamburger Menu
  -------------------------- */
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');

  function toggleMenu(open) {
    hamburger.classList.toggle('open', open);
    navMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', function () {
    const isOpen = navMenu.classList.contains('open');
    toggleMenu(!isOpen);
  });

  // Close menu when a nav link is clicked
  navMenu.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      toggleMenu(false);
    });
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      toggleMenu(false);
      hamburger.focus();
    }
  });

  // Close if clicking outside
  document.addEventListener('click', function (e) {
    if (navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
      toggleMenu(false);
    }
  });

  /* -------------------------
     2. NAVBAR — Scroll shadow
  -------------------------- */
  function handleScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* -------------------------
     3. ACTIVE NAV LINK on scroll
  -------------------------- */
  var sections = document.querySelectorAll('section[id], div[id]');
  var navLinks  = document.querySelectorAll('.nav-link');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          var href = link.getAttribute('href');
          link.classList.toggle('active', href === '#' + id);
        });
      }
    });
  }, {
    rootMargin: '-60px 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(function (section) {
    observer.observe(section);
  });

  /* -------------------------
     4. FAQ ACCORDION
  -------------------------- */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var answerId = btn.getAttribute('aria-controls');
      var answerEl = document.getElementById(answerId);

      // Close all other open items
      document.querySelectorAll('.faq-question').forEach(function (otherBtn) {
        if (otherBtn !== btn) {
          var otherId  = otherBtn.getAttribute('aria-controls');
          var otherEl  = document.getElementById(otherId);
          otherBtn.setAttribute('aria-expanded', 'false');
          if (otherEl) { otherEl.hidden = true; }
        }
      });

      // Toggle current
      btn.setAttribute('aria-expanded', String(!expanded));
      if (answerEl) { answerEl.hidden = expanded; }
    });
  });

  /* -------------------------
     5. CONTACT FORM → WhatsApp
  -------------------------- */
  var contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name    = (document.getElementById('f-name').value    || '').trim();
      var company = (document.getElementById('f-company').value || '').trim();
      var phone   = (document.getElementById('f-phone').value   || '').trim();
      var service = (document.getElementById('f-service').value || '').trim();
      var message = (document.getElementById('f-message').value || '').trim();

      // Basic validation
      if (!name || !company || !phone) {
        alert('Mohon isi Nama, Nama Perusahaan, dan Nomor WhatsApp terlebih dahulu.');
        return;
      }

      // Build WhatsApp message
      var waMsg = 'Halo DX Transportation & Warehousing,\n\n';
      waMsg += 'Saya ingin konsultasi kebutuhan logistik:\n\n';
      waMsg += '• Nama         : ' + name    + '\n';
      waMsg += '• Perusahaan   : ' + company + '\n';
      waMsg += '• No. WhatsApp : ' + phone   + '\n';
      if (service) {
        waMsg += '• Layanan      : ' + service + '\n';
      }
      if (message) {
        waMsg += '• Pesan        : ' + message + '\n';
      }
      waMsg += '\nMohon diinfokan estimasi harga dan langkah selanjutnya. Terima kasih.';

      var encoded = encodeURIComponent(waMsg);
      var waUrl   = 'https://wa.me/6281228505388?text=' + encoded;

      window.open(waUrl, '_blank', 'noopener,noreferrer');

      // Reset form
      contactForm.reset();
    });
  }

  /* -------------------------
     6. BACK TO TOP BUTTON
  -------------------------- */
  var backToTop = document.getElementById('back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* -------------------------
     7. SMOOTH IMAGE LOAD (fallback opacity)
  -------------------------- */
  document.querySelectorAll('img').forEach(function (img) {
    img.style.transition = 'opacity .3s ease';
    if (!img.complete) {
      img.style.opacity = '0';
      img.addEventListener('load', function () {
        img.style.opacity = '1';
      });
      img.addEventListener('error', function () {
        img.style.opacity = '0.3';
      });
    }
  });

})();
