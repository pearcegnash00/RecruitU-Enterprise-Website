/* =============================================
   ARBOUR — main.js
   ============================================= */

/* ── Navbar scroll ── */
(function () {
  const nav = document.querySelector('nav');
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ── Hero particle / constellation animation ── */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const TEAL  = '#0F6E56';
  const AMBER = '#BA7517';
  const CONNECT_DIST = 130;
  let particles = [];
  let raf;
  let paused = false;

  function isMobile() { return window.innerWidth < 768; }
  function maxParticles() { return isMobile() ? 40 : 80; }

  function resize() {
    canvas.width  = canvas.offsetWidth  || window.innerWidth;
    canvas.height = canvas.offsetHeight || window.innerHeight;
  }

  function Particle(w, h) {
    this.x  = Math.random() * w;
    this.y  = Math.random() * h;
    this.vx = (Math.random() - .5) * .28;
    this.vy = (Math.random() - .5) * .28;
    this.isAmber = Math.random() < .12;
    this.r  = this.isAmber ? 2.4 : 1.6;
    this.alpha = .4 + Math.random() * .4;
  }

  function init() {
    resize();
    const n = maxParticles();
    particles = Array.from({ length: n }, () => new Particle(canvas.width, canvas.height));
  }

  function draw() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    /* update positions */
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;
    });

    /* draw connections */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const opacity = (1 - dist / CONNECT_DIST) * .18;
          ctx.strokeStyle = `rgba(15,110,86,${opacity})`;
          ctx.lineWidth = .7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    /* draw nodes */
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.isAmber
        ? `rgba(186,117,23,${p.alpha})`
        : `rgba(245,245,243,${p.alpha * .6})`;
      ctx.fill();
    });

    if (!paused) raf = requestAnimationFrame(draw);
  }

  init();
  raf = requestAnimationFrame(draw);

  window.addEventListener('resize', () => {
    cancelAnimationFrame(raf);
    init();
    raf = requestAnimationFrame(draw);
  });

  document.addEventListener('visibilitychange', () => {
    paused = document.hidden;
    if (!paused) raf = requestAnimationFrame(draw);
  });
})();

/* ── Rotating word glitch effect ── */
(function () {
  const el = document.getElementById('rotating-word');
  if (!el) return;

  const words = ['Hire', 'Source', 'Research', 'Connect'];
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%&';
  let current = 0;
  let scrambleRaf;

  function scramble(target, onDone) {
    const len = Math.max(target.length, el.textContent.length);
    const start = performance.now();
    const duration = 320;

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      let result = '';
      for (let i = 0; i < len; i++) {
        if (i < Math.floor(progress * target.length)) {
          result += target[i] || '';
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      el.textContent = result.slice(0, len);
      if (progress < 1) {
        scrambleRaf = requestAnimationFrame(frame);
      } else {
        el.textContent = target;
        if (onDone) onDone();
      }
    }

    cancelAnimationFrame(scrambleRaf);
    scrambleRaf = requestAnimationFrame(frame);
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function cycle() {
    current = (current + 1) % words.length;
    if (reducedMotion) {
      el.textContent = words[current];
    } else {
      scramble(words[current]);
    }
  }

  /* init */
  el.textContent = words[0];
  let intervalId = setInterval(cycle, 2500);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(intervalId);
    } else {
      intervalId = setInterval(cycle, 2500);
    }
  });
})();

/* ── Accordion ── */
(function () {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      /* close all */
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();
