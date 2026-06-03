// TuGiro Bolivia - Main JS
document.addEventListener('DOMContentLoaded', function () {

  // ── Partners Carousel ────────────────────
  const track = document.getElementById('partnersTrack');
  if (track) {
    const dots = document.querySelectorAll('.partners__dot');
    const prevBtn = document.querySelector('.partners__arrow--prev');
    const nextBtn = document.querySelector('.partners__arrow--next');
    const total = track.children.length;
    let current = 0;

    function itemsVisible() {
      if (window.innerWidth <= 480) return 1;
      if (window.innerWidth <= 768) return 2;
      return 5;
    }

    function pages() { return Math.ceil(total / itemsVisible()); }

    function getOffset() {
      const item = track.children[0];
      if (!item) return 0;
      return (item.offsetWidth + 20) * itemsVisible();
    }

    function goTo(page) {
      current = Math.max(0, Math.min(page, pages() - 1));
      track.style.transform = 'translateX(-' + (current * getOffset()) + 'px)';
      dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });
    dots.forEach(function (dot, i) { dot.addEventListener('click', function () { goTo(i); }); });

    let autoPlay = setInterval(function () { goTo(current + 1 >= pages() ? 0 : current + 1); }, 5000);
    track.parentElement.addEventListener('mouseenter', function () { clearInterval(autoPlay); });
    track.parentElement.addEventListener('mouseleave', function () {
      autoPlay = setInterval(function () { goTo(current + 1 >= pages() ? 0 : current + 1); }, 5000);
    });
  }

  // ── Mobile nav ────────────────────────────
  const burger = document.querySelector('.navbar__burger');
  const mobileNavLinks = document.querySelector('.navbar__links');
  if (burger && mobileNavLinks) {
    let open = false;
    burger.addEventListener('click', function () {
      open = !open;
      if (open) {
        var navH = document.querySelector('.navbar__inner').offsetHeight;
        mobileNavLinks.style.cssText = 'display:flex;flex-direction:column;position:fixed;top:' + navH + 'px;left:0;right:0;background:white;padding:20px 24px;border-bottom:1px solid #E5E7EB;z-index:99;gap:16px;box-shadow:0 8px 24px rgba(0,0,0,0.08);transform:none;';
      } else {
        mobileNavLinks.removeAttribute('style');
      }
    });
  }

  // ── Navbar & scroll spy ───────────────────
  var NAVBAR_H = 88;
  var navItems = document.querySelectorAll('.navbar__link');
  // Orden igual al DOM: inicio → nosotros (stats) → servicios
  var spySections = [
    { id: 'inicio',    link: document.querySelector('.navbar__link[href="#inicio"]') },
    { id: 'nosotros',  link: null }, // stats section, no tiene link en navbar
    { id: 'servicios', link: document.querySelector('.navbar__link[href="#servicios"]') },
  ];

  function setActiveLink(link) {
    navItems.forEach(function (l) { l.classList.remove('active'); });
    if (link) link.classList.add('active');
  }

  function updateActiveNav() {
    var scrollY = window.scrollY + NAVBAR_H + 80;
    var active = spySections[0];
    spySections.forEach(function (entry) {
      var el = document.getElementById(entry.id);
      if (el && el.offsetTop <= scrollY) active = entry;
    });
    setActiveLink(active && active.link ? active.link : null);
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // ── Smooth scroll (compensa navbar fijo) ──
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        // Activa visualmente de inmediato
        var navLink = document.querySelector('.navbar__link[href="' + href + '"]');
        if (navLink) setActiveLink(navLink);
        // Scroll con offset del navbar fijo
        var top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_H - 8;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        if (mobileNavLinks) mobileNavLinks.removeAttribute('style');
      }
    });
  });

  // ── Count-up animation for stats ─────────
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'));
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1800;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(ease * target);
      el.textContent = prefix + current + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = prefix + target + suffix;
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat__number[data-count]').forEach(function(el) {
      countObserver.observe(el);
    });

    // ── Fade-in animations ──────────────────
    var fadeObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.anim-fade-up, .anim-fade-left, .anim-fade-right').forEach(function(el) {
      fadeObserver.observe(el);
    });

    // ── Legacy scroll animations ────────────
    var legacyObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          legacyObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.service-card, .dest-card, .compliance-item, .partner-logo').forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      legacyObserver.observe(el);
    });
  }

  // ── Testimonials carousel ────────────────
  var testTrack = document.getElementById('testTrack');
  var testPrev = document.getElementById('testPrev');
  var testNext = document.getElementById('testNext');
  var testDots = document.querySelectorAll('.testimonials__dot');
  if (testTrack && testPrev && testNext) {
    var testTotal = testTrack.querySelectorAll('.testimonials__slide').length;
    var testCurrent = 0;

    function goToTestSlide(index) {
      testCurrent = (index + testTotal) % testTotal;
      testTrack.style.transform = 'translateX(-' + (testCurrent * 100) + '%)';
      testDots.forEach(function(d, i) {
        d.classList.toggle('active', i === testCurrent);
      });
    }

    testPrev.addEventListener('click', function() { goToTestSlide(testCurrent - 1); });
    testNext.addEventListener('click', function() { goToTestSlide(testCurrent + 1); });
    testDots.forEach(function(dot, i) {
      dot.addEventListener('click', function() { goToTestSlide(i); });
    });
  }

  // ── Scroll progress bar ──────────────────
  var progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    window.addEventListener('scroll', function() {
      var scrolled = window.scrollY;
      var total = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (scrolled / total * 100) + '%';
    }, { passive: true });
  }

  // ── Hero floating particles ───────────────
  var particlesContainer = document.getElementById('heroParticles');
  if (particlesContainer) {
    var particleCount = 18;
    for (var i = 0; i < particleCount; i++) {
      var p = document.createElement('span');
      var size = Math.random() * 4 + 2;
      p.style.cssText = [
        'width:' + size + 'px',
        'height:' + size + 'px',
        'left:' + (Math.random() * 100) + '%',
        'bottom:' + (Math.random() * 60) + '%',
        'animation-duration:' + (Math.random() * 8 + 6) + 's',
        'animation-delay:' + (Math.random() * 6) + 's',
        'opacity:0.3'
      ].join(';');
      particlesContainer.appendChild(p);
    }
  }

  // ── Section reveal on scroll ──────────────
  if ('IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          var delay = e.target.getAttribute('data-delay') || 0;
          setTimeout(function() { e.target.classList.add('visible'); }, delay * 1000);
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function(el) {
      revealObs.observe(el);
    });
  }

  // ── Copy buttons ─────────────────────────
  document.querySelectorAll('.copy-btn').forEach(function(btn) {
    var tooltip = document.createElement('span');
    tooltip.className = 'copy-tooltip';
    tooltip.textContent = '¡Copiado!';
    btn.appendChild(tooltip);

    btn.addEventListener('click', function() {
      var text = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(text).then(function() {
        btn.classList.add('copied');
        setTimeout(function() { btn.classList.remove('copied'); }, 1800);
      });
    });
  });

  // ── Hero mouse parallax ──────────────────
  var heroEl = document.querySelector('.hero');
  var heroVisual = document.querySelector('.hero__visual');
  if (heroEl && heroVisual) {
    document.addEventListener('mousemove', function(e) {
      var rect = heroEl.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;
      var dx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      var dy = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
      heroVisual.style.transform = 'translate(' + (dx * -10) + 'px, ' + (dy * -7) + 'px)';
    });
    heroEl.addEventListener('mouseleave', function() {
      heroVisual.style.transform = '';
    });
  }

  // ── Navbar scroll background ──────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    function updateNavbar() {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();
  }

});
