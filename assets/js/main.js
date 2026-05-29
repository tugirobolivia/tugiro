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
  var spySections = [
    { id: 'inicio',    link: document.querySelector('.navbar__link[href="#inicio"]') },
    { id: 'servicios', link: document.querySelector('.navbar__link[href="#servicios"]') },
    { id: 'nosotros',  link: document.querySelector('.navbar__link[href="#nosotros"]') },
    { id: 'contacto',  link: document.querySelector('.navbar__link[href="#contacto"]') },
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

  // ── Scroll animations ────────────────────
  var animateElements = document.querySelectorAll('.stat, .service-card, .dest-card, .testimonial, .compliance-item, .partner-logo');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animateElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
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
