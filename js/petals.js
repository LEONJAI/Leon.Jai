/* Falling cherry blossoms: whole five-petal blooms plus loose petals, some soft-focus. */
(() => {
  'use strict';
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cv = document.getElementById('petals'), ctx = cv.getContext('2d');
  let W, H, items = [];
  const rand = (a, b) => a + Math.random() * (b - a), lerp = (a, b, t) => a + (b - a) * t;
  const mk = (w, h) => Object.assign(document.createElement('canvas'), { width: w, height: h });
  const petal = g => {                         /* notched petal, 64 x 78 units */
    g.beginPath(); g.moveTo(32, 77); g.bezierCurveTo(8, 62, -2, 30, 11, 8); g.quadraticCurveTo(21, -1, 29, 11);
    g.quadraticCurveTo(32, 18, 35, 11); g.quadraticCurveTo(43, -1, 53, 8); g.bezierCurveTo(66, 30, 56, 62, 32, 77); g.closePath();
  };
  const fill = (g, t) => {
    const gr = g.createLinearGradient(32, 77, 32, 4);
    gr.addColorStop(0, t[2]); gr.addColorStop(.4, t[1]); gr.addColorStop(1, t[0]);
    petal(g); g.fillStyle = gr; g.fill();
  };
  const loose = (t, b) => { const s = mk(160, 192), g = s.getContext('2d'); g.scale(2, 2); if (b) g.filter = `blur(${b}px)`; g.translate(8, 9); fill(g, t); return s; };
  const bloom = (t, b) => {
    const s = mk(200, 200), g = s.getContext('2d'); g.scale(2, 2); if (b) g.filter = `blur(${b}px)`;
    for (let i = 0; i < 5; i++) { g.save(); g.translate(50, 50); g.rotate(i * 1.2566 + .3); g.scale(.6, .6); g.translate(-32, -77); fill(g, t); g.restore(); }
    const c = g.createRadialGradient(50, 50, 0, 50, 50, 12); c.addColorStop(0, 'rgba(214,70,120,.95)'); c.addColorStop(1, 'rgba(214,70,120,0)');
    g.fillStyle = c; g.beginPath(); g.arc(50, 50, 12, 0, 7); g.fill();
    g.strokeStyle = 'rgba(205,80,125,.8)'; g.lineWidth = .8;
    for (let i = 0; i < 12; i++) { const a = i * .52, r = 10 + (i % 3) * 2; g.beginPath(); g.moveTo(50, 50); g.lineTo(50 + Math.cos(a) * r, 50 + Math.sin(a) * r); g.stroke(); }
    return s;
  };
  const TONES = [['#ffffff', '#f6eef6', '#e8c9de'], ['#ffffff', '#fde6ef', '#f4b9d0'], ['#ffe3ed', '#f9b3cb', '#ea82a8']];
  const BL = [0, 1.6, 4];
  const L = TONES.map(t => BL.map(b => loose(t, b))), B = TONES.slice(0, 2).map(t => BL.map(b => bloom(t, b)));

  const make = init => {
    const d = Math.random(), isB = Math.random() < .3, bl = d < .25 ? 2 : d > .88 ? 1 : 0, tn = (Math.random() * 3) | 0;
    return { isB, img: isB ? B[tn % 2][bl] : L[tn][bl], size: isB ? lerp(42, 72, d) : lerp(8, 22, d),
      x: rand(0, W), y: init ? rand(0, H) : rand(-120, -50), vy: lerp(22, 60, d) * rand(.85, 1.15),
      amp: rand(20, 70), sw: rand(.4, 1.1), ph: rand(0, 6.28), rot: rand(0, 6.28), vr: rand(-.8, .8) * (isB ? .5 : 1), fl: rand(.7, 1.6), a: lerp(.6, .97, d) };
  };
  const resize = () => {
    const r = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
    cv.width = W * r; cv.height = H * r; ctx.setTransform(r, 0, 0, r, 0, 0);
    const n = Math.max(12, Math.min(30, Math.round(W / 64)));
    while (items.length < n) items.push(make(true)); items.length = n;
  };
  addEventListener('resize', resize); resize();

  let last = performance.now();
  const frame = now => {
    const dt = Math.min(.05, (now - last) / 1000); last = now; const t = now / 1000;
    ctx.clearRect(0, 0, W, H);
    for (const p of items) {
      p.y += p.vy * dt; p.rot += p.vr * dt;
      if (p.y > H + p.size) Object.assign(p, make(false));
      const flip = (p.isB ? .55 : .25) + (p.isB ? .45 : .75) * Math.abs(Math.cos(t * p.fl + p.ph));
      const k = p.size / (p.isB ? 96 : 78), w = (p.isB ? 100 : 80) * k, h = (p.isB ? 100 : 96) * k;
      ctx.save(); ctx.globalAlpha = p.a; ctx.translate(p.x + Math.sin(t * p.sw + p.ph) * p.amp, p.y);
      ctx.rotate(p.rot); ctx.scale(flip, 1); ctx.drawImage(p.img, -w / 2, -h / 2, w, h); ctx.restore();
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
})();
