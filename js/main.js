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
    if (!session && ['#account', '#member-gallery'].includes(location.hash)) location.hash = '#hero';
    if (session && location.hash === '#account') showAccountPage();
    if (session && location.hash === '#member-gallery') showMemberGalleryPage();
  };
  const showAccountPage = () => {
    if (!activeSession) return false;
    const user = activeSession.user || {};
    const meta = user.user_metadata || {};
    const username = meta.username || user.email?.split('@')[0] || 'Member';
    const fill = (selector, value) => { const node = $(selector); if (node) node.textContent = value || 'Not provided'; };
    fill('#account-name', username);
    const avatarImage = $('#account-avatar-image');
    const avatarInitials = $('#account-avatar-initials');
    let savedAvatar = '';
    try { savedAvatar = localStorage.getItem(`ljai-profile-photo:${user.id}`) || ''; } catch {}
    avatarImage.hidden = !savedAvatar;
    avatarInitials.hidden = Boolean(savedAvatar);
    if (savedAvatar) avatarImage.src = savedAvatar;
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
  const usernameForm = $('#account-username-form');
  const usernameInput = $('#account-username-input');
  const usernameStatus = $('#account-username-status');
  $('#account-edit-username').addEventListener('click', () => {
    const user = activeSession?.user;
    usernameInput.value = user?.user_metadata?.username || user?.email?.split('@')[0] || '';
    usernameStatus.textContent = '';
    usernameForm.hidden = false;
    $('#account-edit-username').hidden = true;
    usernameInput.focus();
  });
  $('#account-cancel-username').addEventListener('click', () => {
    usernameForm.hidden = true;
    $('#account-edit-username').hidden = false;
    usernameStatus.textContent = '';
  });
  usernameForm.addEventListener('submit', async event => {
    event.preventDefault();
    const nextUsername = usernameInput.value.trim();
    if (nextUsername.length < 3) { usernameStatus.textContent = 'Use at least 3 characters for your username.'; return; }
    const sb = authClient();
    if (!sb?.auth || !activeSession?.user) { usernameStatus.textContent = 'Sign in again before changing your username.'; return; }
    const saveButton = $('.account-edit-save', usernameForm);
    saveButton.disabled = true;
    usernameStatus.textContent = 'Saving…';
    try {
      const { data, error } = await sb.auth.updateUser({ data: { username: nextUsername } });
      if (error) throw error;
      if (data?.user) activeSession = { ...activeSession, user: data.user };
      $('#account-name').textContent = nextUsername;
      $('#account-gallery-user').textContent = nextUsername.toUpperCase() + ' GALLERY';
      await paint();
      usernameForm.hidden = true;
      $('#account-edit-username').hidden = false;
      usernameStatus.textContent = 'Username saved to your Supabase account.';
    } catch (error) {
      usernameStatus.textContent = error?.message || 'Could not save the username. Try again.';
    } finally {
      saveButton.disabled = false;
    }
  });  const showMemberGalleryPage = () => {
    if (!activeSession) return false;
    const user = activeSession.user || {};
    const username = user.user_metadata?.username || user.email?.split('@')[0] || 'Member';
    $('#member-gallery-user').textContent = username;
    $('#member-gallery-page').hidden = false;
    $$('#main > section').forEach(section => { if (section.id !== 'member-gallery-page') section.hidden = true; });
    document.body.classList.add('profile-active');
    window.scrollTo({ top: 0, behavior: reduce ? 'instant' : 'smooth' });
    return true;
  };
  const showHomePage = () => {
    $('#account-page').hidden = true;
    $('#member-gallery-page').hidden = true;
    $$('#main > section').forEach(section => { if (!['account-page', 'member-gallery-page'].includes(section.id)) section.hidden = false; });
    document.body.classList.remove('profile-active');
  };
  addEventListener('hashchange', () => {
    if (location.hash === '#account') {
      if (!showAccountPage()) { location.hash = '#hero'; setMode('in'); auth.showModal(); }
    } else if (location.hash === '#member-gallery') {
      if (!showMemberGalleryPage()) { location.hash = '#hero'; setMode('in'); auth.showModal(); }
    } else showHomePage();
  });  $('#account-password').addEventListener('click', () => { setMode('update'); auth.showModal(); });  $('#account-signout').addEventListener('click', async () => {
    const sb = authClient();
    if (sb?.auth) { await sb.auth.signOut(); await paint(); location.hash = '#hero'; }
  });
  const profileGalleryGrid = $('#personal-gallery-grid');
  const galleryKinds = ['photos', 'logos', 'videos'];
  const galleryLabels = { photos: ['Photo study', 'Photo · Collection'], logos: ['Brand study', 'Logo · Identity'], videos: ['Motion study', 'Video · Film'] };
  galleryKinds.forEach(kind => {
    const samples = $$('.personal-work', profileGalleryGrid).filter(card => card.dataset.kind === kind);
    for (let number = samples.length + 1; number <= 100; number++) {
      const card = samples[(number - samples.length - 1) % samples.length].cloneNode(true);
      const serial = String(number).padStart(3, '0');
      const [title, detail] = galleryLabels[kind];
      card.querySelector('h2').textContent = `${title} ${serial}`;
      card.querySelector('p').textContent = `${detail} ${serial}`;
      card.querySelector('.gallery-art i').textContent = `${serial} / ${kind.toUpperCase()}`;
      card.querySelector('.gallery-art').style.filter = `hue-rotate(${(number * 23) % 360}deg)`;
      profileGalleryGrid.append(card);
    }
  });  $('#member-gallery-grid').innerHTML = $('#personal-gallery-grid').innerHTML;
  $$('[data-gallery-filter]').forEach(button => button.addEventListener('click', () => {
    const group = button.closest('.personal-gallery__filters');
    const grid = group?.nextElementSibling;
    const kind = button.dataset.galleryFilter;
    $$('[data-gallery-filter]', group).forEach(tab => tab.setAttribute('aria-pressed', String(tab === button)));
    $$('.personal-work', grid).forEach(card => { card.hidden = card.dataset.kind !== kind; });
  }));
  const previewDialog = $('#gallery-preview');
  let activeGalleryPreview = null;
  const escapeSvgText = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char]);
  const saveBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = filename; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  };
  const safeFilename = value => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'gallery-art';
  const createArtworkSvg = (title, kind, className, animated = false) => {
    const palettes = {
      'art-sakura':['#fff4e8','#f4b8c6','#d9413a'],'art-coast':['#f5d5bd','#df8877','#23415e'],
      'art-garden':['#eee5c9','#b6c99d','#507864'],'art-sun':['#ffe1a8','#eba766','#805653'],
      'art-moon':['#dce1e8','#72889d','#213d5b'],'art-field':['#f3d7ad','#a9be92','#496e60'],
      'art-logo':['#fff2e3','#f2c8bd','#253a55'],'art-video':['#f2b6c4','#d77985','#5a5368']
    };
    const key = Object.keys(palettes).find(name => className.includes(name)) || (kind === 'logos' ? 'art-logo' : kind === 'videos' ? 'art-video' : 'art-sakura');
    const colors = palettes[key];
    const motion = animated ? '<circle cx="130" cy="160" r="13" fill="#fff5e8"><animate attributeName="cy" values="160;80;160" dur="3s" repeatCount="indefinite"/></circle><circle cx="850" cy="230" r="10" fill="#f6a5c0"><animate attributeName="cy" values="230;120;230" dur="4s" repeatCount="indefinite"/></circle>' : '';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 720"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${colors[0]}"/><stop offset=".52" stop-color="${colors[1]}"/><stop offset="1" stop-color="${colors[2]}"/></linearGradient></defs><rect width="960" height="720" rx="48" fill="url(#bg)"/><circle cx="480" cy="285" r="120" fill="#fff4e7" fill-opacity=".38"/><g fill="#fff7eb" fill-opacity=".88"><ellipse cx="480" cy="215" rx="28" ry="65"/><ellipse cx="480" cy="215" rx="28" ry="65" transform="rotate(72 480 285)"/><ellipse cx="480" cy="215" rx="28" ry="65" transform="rotate(144 480 285)"/><ellipse cx="480" cy="215" rx="28" ry="65" transform="rotate(216 480 285)"/><ellipse cx="480" cy="215" rx="28" ry="65" transform="rotate(288 480 285)"/></g><circle cx="480" cy="285" r="24" fill="#d9415a"/>${motion}<text x="480" y="500" text-anchor="middle" fill="#172744" font-family="Arial,sans-serif" font-weight="700" font-size="58">${escapeSvgText(title)}</text><text x="480" y="650" text-anchor="middle" fill="#172744" font-family="Arial,sans-serif" font-size="22" letter-spacing="5">L JAI · ${escapeSvgText(kind.toUpperCase())}</text></svg>`;
  };
  const drawVideoFrame = (ctx, time, title, hue) => {
    const canvas = ctx.canvas, w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.save(); ctx.filter = `hue-rotate(${hue}deg)`;
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, '#fff0dc'); bg.addColorStop(.48, '#e8a6b6'); bg.addColorStop(1, '#203e5c');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h); ctx.restore();
    ctx.fillStyle = 'rgba(255,248,235,.22)'; ctx.beginPath(); ctx.arc(w*.5, h*.48, 150, 0, Math.PI*2); ctx.fill();
    for (let i = 0; i < 18; i++) {
      const x = ((i * 137 + 70) % w) + Math.sin(time*.7+i)*26;
      const y = ((h + 100 - ((time*46 + i*83) % (h+160))) % (h+100)) - 50;
      const size = 7 + (i%4)*2;
      ctx.save(); ctx.translate(x,y); ctx.rotate(time*.7+i);
      ctx.fillStyle = i%2 ? 'rgba(255,247,237,.92)' : 'rgba(255,166,194,.9)';
      for(let petal=0;petal<5;petal++){ctx.rotate(Math.PI*2/5);ctx.beginPath();ctx.ellipse(0,-size,size*.55,size,0,0,Math.PI*2);ctx.fill();}
      ctx.restore();
    }
    ctx.fillStyle='#172744'; ctx.textAlign='center'; ctx.font='700 48px Arial,sans-serif';
    const lines = title.length > 22 ? [title.slice(0,20),title.slice(20)] : [title];
    lines.forEach((line,i)=>ctx.fillText(line, w/2, h*.76 + i*58));
    ctx.font='700 18px Arial,sans-serif';ctx.letterSpacing='5px';ctx.fillText('L JAI · MOVING IDEAS',w/2,h-28);
  };
  const downloadAnimatedFallback = (title, kind, className) => saveBlob(new Blob([createArtworkSvg(title,kind,className,true)],{type:'image/svg+xml'}),`${safeFilename(title)}.svg`);
  const openGalleryPreview = card => {
    const title=card.querySelector('h2')?.textContent.trim() || 'Gallery artwork';
    const description=card.querySelector('p')?.textContent.trim() || '';
    const kind=card.dataset.kind || 'photos';
    const art=card.querySelector('.gallery-art');
    const media=$('#gallery-preview-media');
    const play=$('#gallery-preview-play');
    const download=$('#gallery-preview-download');
    $('#gallery-preview-title').textContent=title;
    $('#gallery-preview-kind').textContent=`${kind.slice(0,-1).toUpperCase()} PREVIEW`;
    $('#gallery-preview-description').textContent=description;
    $('#gallery-preview-status').textContent='';
    media.replaceChildren();
    activeGalleryPreview=null;
    if(kind==='videos'){
      const canvas=document.createElement('canvas');canvas.width=960;canvas.height=600;canvas.className='gallery-preview__canvas';
      media.append(canvas);play.hidden=false;play.textContent='Pause';download.textContent='Download video';
      const ctx=canvas.getContext('2d');const hue=(Array.from(title).reduce((sum,char)=>sum+char.charCodeAt(0),0)*7)%360;
      const state={canvas,title,hue,ctx,playing:true,frame:0,start:performance.now()};activeGalleryPreview=state;
      const animate=now=>{if(!state.playing)return;drawVideoFrame(ctx,(now-state.start)/1000,title,hue);state.frame=requestAnimationFrame(animate);};
      drawVideoFrame(ctx,0,title,hue);state.frame=requestAnimationFrame(animate);
      download.onclick=async()=>{
        const status=$('#gallery-preview-status');
        if(!canvas.captureStream||!window.MediaRecorder){downloadAnimatedFallback(title,'videos',art.className);status.textContent='This browser cannot create a WebM here, so an animated SVG was downloaded instead.';return;}
        const wasPlaying=state.playing;if(!wasPlaying){state.playing=true;state.start=performance.now();state.frame=requestAnimationFrame(animate);play.textContent='Pause';}
        download.disabled=true;status.textContent='Creating a short playable video…';
        let stream;
        try{
          stream=canvas.captureStream(24);
          const mime=['video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm'].find(type=>MediaRecorder.isTypeSupported(type));
          const recorder=mime?new MediaRecorder(stream,{mimeType:mime}):new MediaRecorder(stream);
          const chunks=[];recorder.ondataavailable=event=>{if(event.data.size)chunks.push(event.data);};
          const stopped=new Promise(resolve=>{recorder.onstop=resolve;});recorder.start();
          await new Promise(resolve=>setTimeout(resolve,4500));recorder.stop();await stopped;
          const blob=new Blob(chunks,{type:recorder.mimeType||'video/webm'});saveBlob(blob,`${safeFilename(title)}.webm`);
          status.textContent='Your playable WebM video has been downloaded.';
        }catch(error){status.textContent='Could not create the video in this browser.';}
        finally{stream?.getTracks().forEach(track=>track.stop());download.disabled=false;if(!wasPlaying){state.playing=false;cancelAnimationFrame(state.frame);play.textContent='Play';}}
      };
    }else{
      const enlarged=art.cloneNode(true);enlarged.classList.add('gallery-preview__still');media.append(enlarged);
      play.hidden=true;download.textContent='Download image';
      download.onclick=()=>{saveBlob(new Blob([createArtworkSvg(title,kind,art.className)],{type:'image/svg+xml'}),`${safeFilename(title)}.svg`);$('#gallery-preview-status').textContent='SVG image downloaded.';};
    }
    if(!previewDialog.open)previewDialog.showModal();
  };
  $('#gallery-preview-close').addEventListener('click',()=>previewDialog.close());
  $('#gallery-preview-play').addEventListener('click',()=>{
    const state=activeGalleryPreview;if(!state)return;
    state.playing=!state.playing;
    const button=$('#gallery-preview-play');
    if(state.playing){state.start=performance.now();const animate=now=>{if(!state.playing)return;drawVideoFrame(state.ctx,(now-state.start)/1000,state.title,state.hue);state.frame=requestAnimationFrame(animate);};state.frame=requestAnimationFrame(animate);button.textContent='Pause';}
    else{cancelAnimationFrame(state.frame);button.textContent='Play';}
  });
  previewDialog.addEventListener('close',()=>{if(activeGalleryPreview){activeGalleryPreview.playing=false;cancelAnimationFrame(activeGalleryPreview.frame);}activeGalleryPreview=null;});
  ['#personal-gallery-grid','#member-gallery-grid'].forEach(selector => {
    const grid = $(selector);
    grid.addEventListener('click', event => { const card = event.target.closest('.personal-work'); if (card) openGalleryPreview(card); });
    grid.addEventListener('keydown', event => { const card = event.target.closest('.personal-work'); if (card && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); openGalleryPreview(card); } });
    $$('.personal-work', grid).forEach(card => { card.tabIndex = 0; card.setAttribute('role', 'button'); card.setAttribute('aria-label', `Preview ${card.querySelector('h2')?.textContent.trim() || 'gallery tile'}`); });
  });
  $$('[data-gallery-filter="photos"]').forEach(button => button.click());
  $('#account-photo-trigger').addEventListener('click', () => $('#account-photo-input').click());
  $('#account-photo-input').addEventListener('change', async event => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    const status = $('#account-photo-status');
    if (!file.type.startsWith('image/')) { status.textContent = 'Choose an image file.'; return; }
    if (file.size > 8 * 1024 * 1024) { status.textContent = 'Choose an image smaller than 8 MB.'; event.currentTarget.value = ''; return; }
    try {
      const bitmap = await createImageBitmap(file);
      const edge = 512;
      const canvas = document.createElement('canvas');
      canvas.width = edge; canvas.height = edge;
      const ctx = canvas.getContext('2d');
      const scale = Math.max(edge / bitmap.width, edge / bitmap.height);
      const width = bitmap.width * scale, height = bitmap.height * scale;
      ctx.drawImage(bitmap, (edge - width) / 2, (edge - height) / 2, width, height);
      bitmap.close?.();
      const imageData = canvas.toDataURL('image/jpeg', .82);
      if (!activeSession?.user?.id) throw new Error('Sign in again to update your profile photo.');
      localStorage.setItem(`ljai-profile-photo:${activeSession.user.id}`, imageData);
      const avatarImage = $('#account-avatar-image');
      avatarImage.src = imageData; avatarImage.hidden = false;
      $('#account-avatar-initials').hidden = true;
      status.textContent = 'Profile photo saved in this browser.';
    } catch (error) {
      status.textContent = error?.name === 'QuotaExceededError' ? 'This browser is out of storage. Remove some saved site data and try again.' : 'Could not save this photo. Try another image.';
    }
    event.currentTarget.value = '';
  });  const setMode = m => {
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
  $$('.password-visibility').forEach(button => {
    button.addEventListener('click', () => {
      const input = button.closest('.password-input-wrap')?.querySelector('input');
      if (!input) return;
      const visible = input.type === 'password';
      input.type = visible ? 'text' : 'password';
      button.setAttribute('aria-pressed', String(visible));
      button.setAttribute('aria-label', visible ? 'Hide password' : 'Show password');
      button.title = visible ? 'Hide password' : 'Show password';
      button.classList.toggle('is-visible', visible);
    });
  });  af.addEventListener('submit', async e => {
    e.preventDefault();
    const sb = authClient();
    if (!sb?.auth) return say(ast, window.ljaiSupabaseMessage || t('auth.unconfigured'), 1);
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
