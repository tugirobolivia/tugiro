document.addEventListener('DOMContentLoaded', function() {

  // ── Navbar burger ──────────────────────
  var burger = document.querySelector('.navbar__burger');
  var navLinks = document.querySelector('.navbar__links');
  if (burger && navLinks) {
    burger.addEventListener('click', function() {
      var isOpen = navLinks.style.display === 'flex';
      if (!isOpen) {
        var h = document.querySelector('.navbar__inner').offsetHeight;
        navLinks.style.cssText = 'display:flex;flex-direction:column;position:fixed;top:' + h + 'px;left:0;right:0;background:white;padding:20px 24px;border-bottom:1px solid #E5E7EB;z-index:99;gap:16px;box-shadow:0 8px 24px rgba(0,0,0,0.08);transform:none;';
      } else {
        navLinks.removeAttribute('style');
      }
    });
  }

  if (!('IntersectionObserver' in window)) return;

  // ── Count-up animation ─────────────────
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
      el.textContent = prefix + Math.floor(ease * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = prefix + target + suffix;
    }
    requestAnimationFrame(step);
  }

  var countObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { animateCount(e.target); countObs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.nos-stat__number[data-count]').forEach(function(el) { countObs.observe(el); });

  // ── Fade-in animations ─────────────────
  var fadeObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); fadeObs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.anim-fade-up, .anim-fade-left, .anim-fade-right').forEach(function(el) { fadeObs.observe(el); });

  // ── Staggered card animations ──────────
  var cardObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        cardObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.nos-team-card, .nos-mv__card, .nos-service-item, .nos-card').forEach(function(el, i) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease ' + (i * 0.08) + 's, transform 0.5s ease ' + (i * 0.08) + 's';
    cardObs.observe(el);
  });
});
