/* =============================================
   ARBOUR — main.js
   ============================================= */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Custom cursor ── */
(function () {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (prefersReducedMotion) return;

  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();
})();

/* ── Navbar scroll ── */
(function () {
  const nav = document.getElementById('site-nav');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ── Blueprint canvas ── */
(function () {
  const canvas = document.getElementById('blueprint-canvas');
  if (!canvas) return;

  if (prefersReducedMotion) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  const counterEl = document.getElementById('node-counter');

  /* Colors */
  const C_GRID   = 'rgba(15,110,86,0.07)';
  const C_CORNER = 'rgba(15,110,86,0.18)';
  const C_LINE   = 'rgba(15,110,86,0.28)';
  const C_TEAL   = '#0F6E56';
  const C_TEAL_B = '#13896A';
  const C_AMBER  = '#BA7517';
  const C_AMBER_B= '#D4891E';

  /* Config */
  const MAX_NODES    = 26;
  const SPAWN_EVERY  = 26;
  const CONNECT_DIST = 200;
  const MAX_CONN     = 3;
  const GRID_SZ      = 52;
  const LERP         = 0.055;

  const LABELS = [
    'P.NODE.047', 'SRC.INT.12',  'LAT.MKT.33', 'HIRE.01',    'BD.NET.09',
    'EXP.SRC.21', 'INV.SIG.07',  'DATA.CORE',   'CTX.LAYER',  'GRAPH.01',
    'CLIENT.A',   'SIGNAL.44',   'TRACK.08',    'INTEL.03',   'NET.EXP',
    'LATERAL.55', 'CAMPUS.12',   'HF.TIER.1',   'PE.NODE.3',  'BANK.SRC.7',
  ];

  /* Parallax layers: [grid, lines, nodes] */
  const layers = [
    { cx: 0, cy: 0, tx: 0, ty: 0, max: 5  },
    { cx: 0, cy: 0, tx: 0, ty: 0, max: 12 },
    { cx: 0, cy: 0, tx: 0, ty: 0, max: 20 },
  ];

  let mouseX = 0, mouseY = 0;
  let nodes  = [];
  let lines  = [];
  let frame  = 0;
  let paused = false;
  let raf;

  /* ── Resize ── */
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    mouseX = canvas.width  / 2;
    mouseY = canvas.height / 2;
  }

  /* ── Parallax ── */
  function updateParallax() {
    const nx = (mouseX / canvas.width  - 0.5) * 2;
    const ny = (mouseY / canvas.height - 0.5) * 2;
    layers.forEach(l => {
      l.tx  = nx * l.max;
      l.ty  = ny * l.max;
      l.cx += (l.tx - l.cx) * LERP;
      l.cy += (l.ty - l.cy) * LERP;
    });
  }

  /* ── Draw grid ── */
  function drawGrid() {
    const l = layers[0];
    const w = canvas.width, h = canvas.height;

    ctx.save();
    ctx.translate(l.cx, l.cy);
    ctx.strokeStyle = C_GRID;
    ctx.lineWidth   = 0.5;

    /* extra tiles to fill parallax gap */
    const pad = GRID_SZ * 2;
    for (let x = -pad; x < w + pad; x += GRID_SZ) {
      ctx.beginPath(); ctx.moveTo(x, -pad); ctx.lineTo(x, h + pad); ctx.stroke();
    }
    for (let y = -pad; y < h + pad; y += GRID_SZ) {
      ctx.beginPath(); ctx.moveTo(-pad, y); ctx.lineTo(w + pad, y); ctx.stroke();
    }
    ctx.restore();

    /* Corner crosshairs — fixed, no parallax */
    const m = 24, s = 10;
    const corners = [[m, m], [w - m, m], [m, h - m], [w - m, h - m]];
    ctx.strokeStyle = C_CORNER;
    ctx.lineWidth   = 1;
    corners.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.moveTo(cx - s, cy); ctx.lineTo(cx + s, cy);
      ctx.moveTo(cx, cy - s); ctx.lineTo(cx, cy + s);
      ctx.stroke();
    });
  }

  /* ── Draw lines ── */
  function drawLines() {
    const l = layers[1];
    ctx.save();
    ctx.translate(l.cx, l.cy);

    lines.forEach(ln => {
      ln.progress = Math.min(1, ln.progress + 0.013);
      const { a, b, progress: p } = ln;

      const ex = a.x + (b.x - a.x) * p;
      const ey = a.y + (b.y - a.y) * p;

      /* Line */
      ctx.strokeStyle = C_LINE;
      ctx.lineWidth   = 0.8;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(ex, ey);
      ctx.stroke();

      /* Midpoint tick */
      if (p > 0.5) {
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        const dx = b.x - a.x, dy = b.y - a.y;
        const len = Math.hypot(dx, dy) || 1;
        const tx = (-dy / len) * 5;
        const ty = ( dx / len) * 5;
        ctx.strokeStyle = 'rgba(15,110,86,0.4)';
        ctx.lineWidth   = 0.6;
        ctx.beginPath();
        ctx.moveTo(mx - tx, my - ty);
        ctx.lineTo(mx + tx, my + ty);
        ctx.stroke();
      }

      /* Distance annotation */
      if (p > 0.85) {
        const mx = (a.x + b.x) / 2 + 8;
        const my = (a.y + b.y) / 2 - 2;
        ctx.fillStyle = 'rgba(15,110,86,0.45)';
        ctx.font      = '7px "IBM Plex Mono"';
        ctx.fillText(Math.round(Math.hypot(b.x - a.x, b.y - a.y)) + 'u', mx, my);
      }
    });

    ctx.restore();
  }

  /* ── Draw nodes ── */
  function drawNodes() {
    const l = layers[2];
    ctx.save();
    ctx.translate(l.cx, l.cy);

    nodes.forEach(nd => {
      nd.age++;
      const { x, y, r, isAmber } = nd;
      const color  = isAmber ? C_AMBER   : C_TEAL;
      const bright = isAmber ? C_AMBER_B : C_TEAL_B;
      const ringR  = r + 5;
      const cs     = ringR + 8;

      /* Outer ring */
      ctx.strokeStyle = isAmber ? 'rgba(186,117,23,0.65)' : 'rgba(15,110,86,0.65)';
      ctx.lineWidth   = 0.8;
      ctx.beginPath();
      ctx.arc(x, y, ringR, 0, Math.PI * 2);
      ctx.stroke();

      /* Crosshair arms */
      ctx.strokeStyle = isAmber ? 'rgba(186,117,23,0.35)' : 'rgba(15,110,86,0.35)';
      ctx.lineWidth   = 0.5;
      ctx.beginPath();
      ctx.moveTo(x - cs, y); ctx.lineTo(x - ringR - 1, y);
      ctx.moveTo(x + ringR + 1, y); ctx.lineTo(x + cs, y);
      ctx.moveTo(x, y - cs); ctx.lineTo(x, y - ringR - 1);
      ctx.moveTo(x, y + ringR + 1); ctx.lineTo(x, y + cs);
      ctx.stroke();

      /* Fill */
      ctx.fillStyle = isAmber ? 'rgba(186,117,23,0.8)' : 'rgba(15,110,86,0.8)';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      /* Inner bright */
      ctx.fillStyle = bright;
      ctx.beginPath();
      ctx.arc(x, y, r * 0.4, 0, Math.PI * 2);
      ctx.fill();

      /* Typewriter label */
      if (nd.age > nd.labelDelay) {
        const label     = LABELS[nd.labelIdx];
        const charCount = Math.min(Math.floor((nd.age - nd.labelDelay) * 0.35), label.length);
        if (charCount > 0) {
          ctx.fillStyle = isAmber ? 'rgba(186,117,23,0.6)' : 'rgba(15,110,86,0.6)';
          ctx.font      = '7px "IBM Plex Mono"';
          ctx.fillText(label.slice(0, charCount), x + cs + 3, y + 3);
        }
      }
    });

    ctx.restore();
  }

  /* ── Spawn node ── */
  function spawnNode() {
    if (nodes.length >= MAX_NODES) return;
    const margin = 80;
    const nd = {
      x: margin + Math.random() * (canvas.width  - margin * 2),
      y: margin + Math.random() * (canvas.height - margin * 2),
      r: 3 + Math.random() * 1.5,
      isAmber:    Math.random() < 0.18,
      age:        0,
      connections:0,
      labelIdx:   Math.floor(Math.random() * LABELS.length),
      labelDelay: 35 + Math.floor(Math.random() * 45),
    };

    nodes.push(nd);

    /* Connect to nearest available nodes */
    nodes
      .filter(n => n !== nd && n.connections < MAX_CONN)
      .map(n => ({ n, d: Math.hypot(n.x - nd.x, n.y - nd.y) }))
      .filter(({ d }) => d < CONNECT_DIST)
      .sort((a, b) => a.d - b.d)
      .slice(0, MAX_CONN)
      .forEach(({ n }) => {
        if (nd.connections < MAX_CONN && n.connections < MAX_CONN) {
          lines.push({ a: nd, b: n, progress: 0 });
          nd.connections++;
          n.connections++;
        }
      });

    if (counterEl) counterEl.textContent = nodes.length;
  }

  /* ── Add random connection (post max-nodes) ── */
  function addRandomConnection() {
    const avail = nodes.filter(n => n.connections < MAX_CONN);
    if (avail.length < 2) return;
    const shuffled = avail.slice().sort(() => Math.random() - 0.5);
    for (let i = 0; i < shuffled.length; i++) {
      for (let j = i + 1; j < shuffled.length; j++) {
        const a = shuffled[i], b = shuffled[j];
        if (Math.hypot(a.x - b.x, a.y - b.y) < CONNECT_DIST) {
          const exists = lines.some(
            l => (l.a === a && l.b === b) || (l.a === b && l.b === a)
          );
          if (!exists) {
            lines.push({ a, b, progress: 0 });
            a.connections++;
            b.connections++;
            return;
          }
        }
      }
    }
  }

  /* ── Main loop ── */
  function loop() {
    if (paused) return;
    frame++;

    updateParallax();

    if (nodes.length < MAX_NODES && frame % SPAWN_EVERY === 0) spawnNode();
    if (nodes.length >= MAX_NODES && frame % 200 === 0) addRandomConnection();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawLines();
    drawNodes();

    raf = requestAnimationFrame(loop);
  }

  function init() {
    resize();
    nodes = [];
    lines = [];
    frame = 0;
    layers.forEach(l => { l.cx = l.cy = l.tx = l.ty = 0; });
  }

  init();
  raf = requestAnimationFrame(loop);

  window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  window.addEventListener('resize', () => {
    cancelAnimationFrame(raf);
    init();
    raf = requestAnimationFrame(loop);
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    paused = document.hidden;
    if (!paused) raf = requestAnimationFrame(loop);
  });
})();

/* ── Accordion ── */
(function () {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item   = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

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
