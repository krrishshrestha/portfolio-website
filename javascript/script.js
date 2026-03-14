/* ================================================================
   script.js — Portfolio JavaScript
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. TYPING ANIMATION ──────────────────────────────────────
     Edit the `roles` array to list your own specialisations.
     The text cycles automatically in the hero subtitle.
  ──────────────────────────────────────────────────────────── */
  const typedEl = document.querySelector('.typed');

  if (typedEl) {
    // ↓ CHANGE these to your own roles / specialisations
    const roles = [
      'Cybersecurity Analyst',
      'Researcher',
      'SOC Officer (L1)'
    ];

    let ri = 0, ci = 0, deleting = false;
    const SPEED_TYPE   = 75;
    const SPEED_DELETE = 40;
    const PAUSE        = 1800;

    (function tick() {
      const word = roles[ri];
      typedEl.textContent = deleting ? word.slice(0, ci - 1) : word.slice(0, ci + 1);
      deleting ? ci-- : ci++;

      if (!deleting && ci === word.length) { deleting = true; setTimeout(tick, PAUSE); return; }
      if (deleting && ci === 0)            { deleting = false; ri = (ri + 1) % roles.length; }

      setTimeout(tick, deleting ? SPEED_DELETE : SPEED_TYPE);
    })();
  }


  /* ── 2. SCROLL REVEAL ─────────────────────────────────────────
     Elements with class="reveal" fade in when scrolled into view.
     Add data-delay="150" (ms) on siblings for a stagger effect.
  ──────────────────────────────────────────────────────────── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const delay = parseInt(e.target.dataset.delay || 0);
      setTimeout(() => e.target.classList.add('in'), delay);
      revealObs.unobserve(e.target);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));


  /* ── 3. ACTIVE NAV LINK ───────────────────────────────────────
     Highlights the nav link whose section is currently in view.
  ──────────────────────────────────────────────────────────── */
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`));
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('section[id]').forEach(s => sectionObs.observe(s));


  /* ── 4. NAV SHADOW ON SCROLL ─────────────────────────────────
  ──────────────────────────────────────────────────────────── */
  const navEl = document.querySelector('nav');
  window.addEventListener('scroll', () => navEl.classList.toggle('scrolled', scrollY > 40), { passive: true });


  /* ── 5. BACK TO TOP ──────────────────────────────────────────
  ──────────────────────────────────────────────────────────── */
  const topBtn = document.getElementById('top-btn');
  if (topBtn) {
    window.addEventListener('scroll', () => topBtn.classList.toggle('show', scrollY > 400), { passive: true });
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }


  /* ── 6. MOBILE HAMBURGER ─────────────────────────────────────
  ──────────────────────────────────────────────────────────── */
  const burger = document.querySelector('.burger');
  const drawer = document.querySelector('.nav-drawer');

  if (burger && drawer) {
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('open');
      drawer.style.display = open ? 'flex' : 'none';
    });
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        drawer.style.display = 'none';
      });
    });
  }


  /* ── 7. SMOOTH SCROLL (fallback) ─────────────────────────────
  ──────────────────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - 64, behavior: 'smooth' });
    });
  });


  /* ── 8. STAT COUNTER ANIMATION ───────────────────────────────
     Add data-count="25" on a .stat-val element to trigger.
  ──────────────────────────────────────────────────────────── */
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const end = parseInt(el.dataset.count);
      if (isNaN(end)) return;
      const suffix = el.dataset.suffix || '';
      let n = 0;
      const step = Math.ceil(end / 50);
      const t = setInterval(() => {
        n = Math.min(n + step, end);
        el.textContent = n + suffix;
        if (n >= end) clearInterval(t);
      }, 28);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('.stat-val[data-count]').forEach(el => counterObs.observe(el));

});