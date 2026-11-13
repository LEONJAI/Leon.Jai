(() => {
  'use strict';
  const CONTACT_EMAIL = 'hello@jpk.example'; // <- change to your real address
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const t = window.t;
  const themeBtn = $('.theme-toggle');
  const applyTheme = dark => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    themeBtn.setAttribute('aria-pressed', String(dark));
    const label = dark ? 'Switch to light mode' : 'Switch to dark mode';
    themeBtn.setAttribute('aria-label', label);
    themeBtn.title = label;
    $('.theme-toggle__icon').textContent = dark ? '☀' : '☾';
  };
  applyTheme(localStorage.getItem('jpk-theme') === 'dark');
  themeBtn.addEventListener('click', () => {
    const dark = document.documentElement.dataset.theme !== 'dark';
    applyTheme(dark);
    localStorage.setItem('jpk-theme', dark ? 'dark' : 'light');
  });
  /* hide "index.html" from the address bar when served over http(s) */
  if (location.protocol.startsWith('http')) {
    const clean = location.pathname.replace(/index\.html$/, '');
    if (clean !== location.pathname) history.replaceState(null, '', clean + location.search + location.hash);
  }
  $('#year').textContent = new Date().getFullYear();

  /* mobile menu */
  const menuBtn = $('.menu-btn'), nav = $('#nav');
  menuBtn.addEventListener('click', () => menuBtn.setAttribute('aria-expanded', nav.classList.toggle('open')));
  nav.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); } });

  /* planets (x, y, size, parallax depth, label, panel key) */
  const PANELS = { design: '#design', dev: '#services', gallery: '#works', start: '#contact' };
  const ORBS = [
    ['12%', '20%', 56, 22], ['23%', '42%', 108, 12, 'orb.design', 'design'], ['50%', '70%', 46, 26],
    ['23%', '74%', 136, 10, 'orb.dev', 'dev'], ['9%', '90%', 58, 20], ['80%', '38%', 64, 24],
    ['86%', '16%', 104, 12, 'orb.gallery', 'gallery'], ['80%', '76%', 160, 8, 'orb.start', 'start'], ['12%', '56%', 48, 22], ['30%', '85%', 54, 22], ['76%', '82%', 46, 22], ['91%', '52%', 52, 22]
  ];
  const sky = $('#sky');
  ORBS.forEach(([x, y, s, z, label, key], i) => {
    const b = document.createElement('button');
    b.className = 'orb' + (key ? ' orb--live' : '');
    b.style.cssText = `--x:${x};--y:${y};--s:${s};--d:${(i * .12).toFixed(2)}s;--t:${6 + (i % 4) * 1.5}s;--orbit-delay:${i * -4.5}s`;
    b.dataset.z = z;
    if (key) { b.dataset.key = key; b.setAttribute('data-i18n-aria', label); } else { b.tabIndex = -1; b.setAttribute('aria-hidden', 'true'); }
    b.innerHTML = `<div class="orb__body">${label ? `<span data-i18n="${label}"></span>` : ''}</div>`;
    sky.append(b);
  });

  const panel = $('#panel'), panelBody = $('#panel-body');
  sky.addEventListener('click', e => {
    const o = e.target.closest('.orb--live'); if (!o) return;
    const k = o.dataset.key;
    panelBody.innerHTML = `<h2>${t('p.' + k + '.t')}</h2><p>${t('p.' + k + '.p')}</p><ul>${t('p.' + k + '.l').split('|').map(i => `<li>${i}</li>`).join('')}</ul><a class="btn" href="${PANELS[k]}">${t('p.' + k + '.a')}</a>`;
    panel.showModal();
  });
  panelBody.addEventListener('click', e => { if (e.target.closest('a')) panel.close(); });
  $$('dialog').forEach(d => d.addEventListener('click', e => { if (e.target === d) d.close(); }));

  /* pointer parallax */
  if (!reduce && matchMedia('(pointer: fine)').matches) {
    let raf;
    $('#hero').addEventListener('pointermove', e => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const nx = e.clientX / innerWidth - .5, ny = e.clientY / innerHeight - .5;
        $$('.orb', sky).forEach(o => { const z = +o.dataset.z; o.style.translate = `${nx * z * -2}px ${ny * z * -2}px`; });
      });
    });
  }

  /* active nav link */
  const secs = $$('[data-title]'), links = $$('.nav a');
    const onScroll = () => {
    let cur = secs[0];
    secs.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * .4) cur = s; });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur.id));
  };
  addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); onScroll();

  /* gallery */
  const WORKS = [
    { n: 'Kape Kanto', t: 'Business', d: 'w1', c: '#ffb347', l: 'l1' },
    { n: 'Lumen Photo', t: 'Portfolio', d: 'w2', c: '#7fb5ff', l: 'l3' },
    { n: 'Hilo Crafts', t: 'Shop', d: 'w3', c: '#ff8fa3', l: 'l2' },
    { n: 'Reyes Dental', t: 'Business', d: 'w4', c: '#7ddba5', l: 'l2' },
    { n: 'Tala Studio', t: 'Portfolio', d: 'w5', c: '#c3a6ff', l: 'l1' },
    { n: 'Bayan Market', t: 'Shop', d: 'w6', c: '#ffe14d', l: 'l3' }
  ];
  const grid = $('#grid'), filters = $('.filters');
  let cur = 'All';
  const render = f => {
    grid.innerHTML = WORKS.filter(w => f === 'All' || w.t === f).map(w =>
      `<article class="work"><div class="thumb ${w.l}" style="--c:${w.c}" role="img" aria-label="${t('wire')}${w.n}"><b></b><div><i></i><i></i><i></i></div></div><h3>${w.n}</h3><p>${t('type.' + w.t)}${t('sep')}${t(w.d)}</p></article>`).join('');
    cur = f; $$('button', filters).forEach(b => b.setAttribute('aria-pressed', b.dataset.f === f));
  };
  ['All', ...new Set(WORKS.map(w => w.t))].forEach(ty => {
    const b = document.createElement('button'); b.type = 'button'; b.dataset.f = ty; b.dataset.i18n = 'type.' + ty;
    b.addEventListener('click', () => render(ty)); filters.append(b);
  });
  render('All');

  /* contact form (opens the visitor's email app; swap for a form service or backend later) */
  const say = (el, msg, err) => { el.textContent = msg; el.classList.toggle('err', !!err); };
  const okEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  $('#contact-form').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target, st = $('#form-status');
    const name = f.name.value.trim(), email = f.email.value.trim(), msg = f.message.value.trim();
    if (!name) return say(st, t('err.name'), 1);
    if (!okEmail(email)) return say(st, t('err.email'), 1);
    if (msg.length < 10) return say(st, t('err.msg'), 1);
    const body = `Name: ${name}\nEmail: ${email}\nType: ${f.type.value}\n\n${msg}`;
    location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Project enquiry: ' + f.type.value)}&body=${encodeURIComponent(body)}`;
    say(st, t('ok.sent')); f.reset();
  });

  /* Payment buttons hand off to a secure server-side checkout integration. */
  $$('[data-checkout-provider]').forEach(button => button.addEventListener('click', async () => {
    const status = $('.price-card__status', button.closest('.price-card'));
    const createCheckout = window.createLJAICheckoutSession;
    if (typeof createCheckout !== 'function') return say(status, t('pricing.checkout.unconfigured'), 1);
    button.disabled = true;
    try {
      const result = await createCheckout({ provider: button.dataset.checkoutProvider, plan: button.dataset.plan });
      const checkoutUrl = typeof result === 'string' ? result : result?.url;
      const destination = new URL(checkoutUrl, location.href);
      if (destination.protocol !== 'https:' && !(destination.protocol === 'http:' && location.hostname === 'localhost')) throw new Error('Invalid checkout URL');
      location.assign(destination.href);
    } catch {
      say(status, t('pricing.checkout.error'), 1);
      button.disabled = false;
    }
  }));
  /* Supabase-ready auth form. Provide window.supabaseClient in your project config. */
  const authBtn = $('#auth-btn'), auth = $('#auth'), af = $('#auth-form'), ast = $('#auth-status');
  const authClient = () => window.supabaseClient || null;
  let activeSession = null;
  let mode = 'in';
  const paint = async () => {
    const sb = authClient();
    let session = null;
    if (sb?.auth) {
      try { session = (await sb.auth.getSession()).data?.session || null; } catch {}
    }
    activeSession = session;
    const username = session?.user?.user_metadata?.username || session?.user?.email?.split('@')[0] || '';
    authBtn.textContent = session ? username : t('auth.signin');
    authBtn.title = session ? 'View your profile' : '';
    authBtn.classList.toggle('is-profile', Boolean(session));
    authBtn.setAttribute('aria-label', session ? `Open ${username}'s profile` : t('auth.signin'));
    if (!session && location.hash === '#account') location.hash = '#hero';
    if (session && location.hash === '#account') showAccountPage();
  };
  const showAccountPage = () => {
    if (!activeSession) return false;
    const user = activeSession.user || {};
    const meta = user.user_metadata || {};
    const username = meta.username || user.email?.split('@')[0] || 'Member';
    const fill = (selector, value) => { const node = $(selector); if (node) node.textContent = value || 'Not provided'; };
    fill('#account-name', username);
    fill('#account-email', user.email);
    fill('#account-username', username);
    fill('#account-detail-email', user.email);
    fill('#account-birthday', meta.birthday);
    fill('#account-address', meta.address);
    fill('#account-welcome', username);
    fill('#account-gallery-user', username.toUpperCase() + ' GALLERY');
    $('#account-page').hidden = false;
    $$('#main > section').forEach(section => { if (section.id !== 'account-page') section.hidden = true; });
    document.body.classList.add('profile-active');
    window.scrollTo({ top: 0, behavior: reduce ? 'instant' : 'smooth' });
    return true;
  };
  const showHomePage = () => {
    $('#account-page').hidden = true;
    $$('#main > section').forEach(section => { if (section.id !== 'account-page') section.hidden = false; });
    document.body.classList.remove('profile-active');
  };
  addEventListener('hashchange', () => {
    if (location.hash === '#account') {
      if (!showAccountPage()) { location.hash = '#hero'; setMode('in'); auth.showModal(); }
    } else showHomePage();
  });
  $('#account-password').addEventListener('click', () => { setMode('update'); auth.showModal(); });  $('#account-signout').addEventListener('click', async () => {
    const sb = authClient();
    if (sb?.auth) { await sb.auth.signOut(); await paint(); location.hash = '#hero'; }
  });
  $$('[data-gallery-filter]').forEach(button => button.addEventListener('click', () => {
    const kind = button.dataset.galleryFilter;
    $$('[data-gallery-filter]').forEach(tab => tab.setAttribute('aria-pressed', String(tab === button)));
    $$('.personal-work').forEach(card => { card.hidden = card.dataset.kind !== kind; });
  }));
  document.querySelector('[data-gallery-filter]')?.click();
  const setMode = m => {
    mode = m;
    const up = m === 'up', rs = m === 'reset', update = m === 'update';
    $('#auth-title').textContent = update ? t('title.update') : rs ? t('title.reset') : up ? t('title.up') : t('title.in');
    $('button.btn', af).textContent = update ? t('btn.update') : rs ? t('btn.reset') : up ? t('btn.up') : t('btn.in');
    $('#auth-pw-label').textContent = t(rs || update ? 'f.newpw' : 'f.pw');
    $('#auth-identifier-label').textContent = t(rs ? 'f.email' : 'auth.identifier');
    $('#auth-identifier-field').hidden = up || update;
    $('#auth-username-field').hidden = !up;
    $('#auth-email-field').hidden = !up;
    $('#auth-birthday-field').hidden = !up;
    $('#auth-address-field').hidden = !up;
    $('#auth-password-field').hidden = rs;
    $('#auth-identifier').type = rs ? 'email' : 'text';
    $('#auth-identifier').autocomplete = rs ? 'email' : 'username';
    $('#auth-identifier').required = !up && !update;
    af.username.required = up;
    af.email.required = up;
    af.birthday.required = up;
    af.address.required = up;
    af.password.required = !rs;
    $('#auth-password').autocomplete = up || rs || update ? 'new-password' : 'current-password';
    $('#auth-switch').textContent = m === 'in' ? t('sw.up') : rs || update ? t('sw.back') : t('sw.in');
    $('#auth-forgot').hidden = rs || update;
    say(ast, '');
  };
  const startupClient = authClient();
  if (startupClient?.auth?.onAuthStateChange) {
    startupClient.auth.onAuthStateChange(event => {
      if (event === 'PASSWORD_RECOVERY') { setMode('update'); auth.showModal(); }
      paint();
    });
  }
  authBtn.addEventListener('click', () => {
    if (activeSession) { location.hash = '#account'; showAccountPage(); return; }
    setMode('in'); auth.showModal();
  });
  $('#auth-switch').addEventListener('click', () => setMode(mode === 'in' ? 'up' : 'in'));
  $('#auth-forgot').addEventListener('click', () => setMode('reset'));
  af.addEventListener('submit', async e => {
    e.preventDefault();
    const sb = authClient();
    if (!sb?.auth) return say(ast, t('auth.unconfigured'), 1);
    const pw = af.password.value;
    if (mode !== 'reset' && pw.length < 6) return say(ast, t('err.pw'), 1);
    try {
      if (mode === 'update') {
        const { error } = await sb.auth.updateUser({ password: pw });
        if (error) throw error;
        auth.close(); af.reset(); setMode('in'); return say(ast, t('auth.password.updated'));
      }
      if (mode === 'reset') {
        const email = af.identifier.value.trim().toLowerCase();
        if (!okEmail(email)) return say(ast, t('err.email'), 1);
        const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: location.href.split('#')[0] });
        if (error) throw error;
        return say(ast, t('auth.reset.sent'));
      }
      if (mode === 'up') {
        const username = af.username.value.trim();
        const email = af.email.value.trim().toLowerCase();
        const birthday = af.birthday.value;
        const address = af.address.value.trim();
        if (username.length < 3) return say(ast, t('auth.username.short'), 1);
        if (!okEmail(email)) return say(ast, t('err.email'), 1);
        if (!birthday || !address) return say(ast, t('auth.profile.required'), 1);
        const { data, error } = await sb.auth.signUp({
          email, password: pw,
          options: { data: { username, birthday, address } }
        });
        if (error) throw error;
        if (!data.session) return say(ast, t('auth.check.email'));
        auth.close(); af.reset(); await paint(); return;
      }
      let email = af.identifier.value.trim().toLowerCase();
      if (!email.includes('@')) {
        if (typeof window.resolveSupabaseUsernameToEmail !== 'function') return say(ast, t('auth.username.lookup'), 1);
        email = await window.resolveSupabaseUsernameToEmail(af.identifier.value.trim());
      }
      if (!okEmail(email || '')) return say(ast, t('err.email'), 1);
      const { error } = await sb.auth.signInWithPassword({ email, password: pw });
      if (error) throw error;
      auth.close(); af.reset(); await paint();
    } catch (error) {
      say(ast, error?.message || t('auth.failed'), 1);
    }
  });
  addEventListener('langchange', async () => { render(cur); setMode(mode); await paint(); });  window.applyI18n(); paint().then(() => { if (location.hash === '#account' && !showAccountPage()) { location.hash = '#hero'; setMode('in'); auth.showModal(); } }); setMode(mode);
})();
