(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const toast = (message) => {
    let node = $(".toast");
    if (!node) { node = document.createElement("div"); node.className = "toast"; document.body.append(node); }
    node.textContent = message; node.classList.add("show");
    clearTimeout(window.toastTimer); window.toastTimer = setTimeout(() => node.classList.remove("show"), 2600);
  };
  const modal = (id, open) => {
    const el = document.getElementById(id); if (!el) return;
    el.classList.toggle("open", open); el.setAttribute("aria-hidden", String(!open));
    if (open) setTimeout(() => $("input", el)?.focus(), 80);
  };

  const themeButton = $("#themeToggle");
  const seasonalEffects = document.createElement("div");
  seasonalEffects.className = "seasonal-effects";
  seasonalEffects.setAttribute("aria-hidden", "true");
  for (let i = 0; i < 32; i++) {
    const particle = document.createElement("span");
    const snow = i >= 19;
    particle.className = `seasonal-particle ${snow ? "snowflake" : "sakura-petal"}`;
    particle.textContent = snow ? "❄" : "";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.setProperty("--fall-duration", `${18 + Math.random() * 24}s`);
    particle.style.setProperty("--fall-delay", `${-Math.random() * 35}s`);
    particle.style.setProperty("--sway", `${-70 + Math.random() * 140}px`);
    particle.style.setProperty("--particle-size", `${12 + Math.random() * 12}px`);
    seasonalEffects.append(particle);
  }
  document.body.prepend(seasonalEffects);
  const setTheme = dark => {
    document.body.classList.toggle("dark-mode", dark);
    $(".theme-icon", themeButton).textContent = dark ? "☀" : "☾";
    themeButton.setAttribute("aria-label", dark ? "Switch to light mode / ライトモードに切り替え" : "Switch to dark mode / ダークモードに切り替え");
    themeButton.querySelector("span:last-child").innerHTML = dark ? "LIGHT<small>ライト</small>" : "DARK<small>ダーク</small>";
    try { localStorage.setItem("atelier-theme", dark ? "dark" : "light"); } catch {}
  };
  let savedTheme = "light";
  try { savedTheme = localStorage.getItem("atelier-theme") || "light"; } catch {}
  setTheme(savedTheme === "dark");
  themeButton.addEventListener("click", () => setTheme(!document.body.classList.contains("dark-mode")));

  $("#loginOpen").addEventListener("click", () => modal("loginModal", true));
  if (new URLSearchParams(location.search).get("login") === "1") modal("loginModal", true);
  $$('[data-close]').forEach(button => button.addEventListener("click", () => modal(button.dataset.close, false)));
  $$(".modal-backdrop").forEach(backdrop => backdrop.addEventListener("click", e => { if (e.target === backdrop) modal(backdrop.id, false); }));
  document.addEventListener("keydown", e => { if (e.key === "Escape") $$(".modal-backdrop.open").forEach(el => modal(el.id, false)); });

  $$(".filter").forEach(button => button.addEventListener("click", () => {
    $$(".filter").forEach(item => item.classList.toggle("active", item === button));
    const filter = button.dataset.filter;
    $$(".work-card").forEach(card => card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter));
  }));

  const projectInfo = {
    photo: ["PHOTOGRAPHY / CAMPAIGN", "写真 / キャンペーン", "Quiet Living", "余白のある暮らし", "A campaign for HINOKI LIVING, capturing natural materials and the soft light of everyday life.", "HINOKI LIVINGのキャンペーン撮影。自然素材と暮らしの柔らかな光を丁寧に切り取りました。"],
    logo: ["BRAND IDENTITY", "ブランドアイデンティティ", "Brand with character", "ブランドの輪郭をつくる", "A visual identity shaped around the brand’s character, from logo to a consistent visual system.", "ロゴから一貫したビジュアルまで、ブランドらしさを育てるデザインを制作しました。"],
    web: ["WEB DESIGN", "ウェブデザイン", "Useful and memorable", "使いやすさと印象を両立", "From information architecture to responsive visuals, we brought the brand experience into one clear website.", "情報設計からビジュアル、レスポンシブ対応まで、ブランド体験をひとつのサイトにまとめました。"],
    video: ["MOTION / FILM", "モーション / 映像", "A brand in motion", "動きで伝えるブランドの空気", "A short film that brings the brand’s world to life through thoughtful movement and sound.", "ブランドの世界観を短い映像とモーションで表現。音と動きが印象に残る作品です。"]
  };
  $$(".work-card").forEach(card => card.addEventListener("click", () => {
    const info = projectInfo[card.dataset.category]; if (!info) return;
    $("#detailCategory").innerHTML = `${info[0]}<small>${info[1]}</small>`; $("#detailTitle").innerHTML = `${info[2]}<small>${info[3]}</small>`;
    $("#detailText").innerHTML = `${info[4]}<small>${info[5]}</small>`; modal("detailModal", true);
  }));

  $("#loginForm").addEventListener("submit", async e => {
    e.preventDefault(); const form = new FormData(e.currentTarget);
    const { supabaseUrl, supabaseAnonKey } = window.ATELIER_CONFIG || {};
    const message = $("#loginMessage");
    if (supabaseUrl && supabaseAnonKey && window.supabase) {
      const client = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
      const { error } = await client.auth.signInWithPassword({ email: form.get("email"), password: form.get("password") });
      message.innerHTML = error ? `${error.message}<small>ログインできませんでした。入力内容をご確認ください。</small>` : "Signed in successfully.<small>ログインしました。</small>";
    } else message.innerHTML = "Sign-in is currently unavailable. Please try again later.<small>現在ログインをご利用いただけません。しばらくしてからもう一度お試しください。</small>";
  });

  const chatPanel = $("#chatPanel");
  $("#chatOpen").addEventListener("click", () => { chatPanel.classList.add("open"); $("#chatInput").focus(); });
  $("#chatClose").addEventListener("click", () => chatPanel.classList.remove("open"));
  $("#chatForm").addEventListener("submit", e => {
    e.preventDefault(); const field = $("#chatInput"), message = field.value.trim(); if (!message) return;
    const feed = $("#chatMessages"), mine = document.createElement("div"); mine.className = "user-message"; mine.textContent = message; feed.append(mine); field.value = "";
    setTimeout(() => {
      const reply = document.createElement("div"); reply.className = "bot-message";
      const answer = /ロゴ|ブランド|brand/i.test(message) ? ["Tell me about your brand’s personality and audience. We can shape a visual direction together.", "ブランドの雰囲気や届けたい相手を聞かせてください。ビジュアルの方向性を一緒に整理できます。"] : /web|サイト|ウェブ|ホームページ/i.test(message) ? ["Tell me the site’s purpose, key pages, and target launch date so I can suggest a good approach.", "サイトの目的や必要なページ、公開時期などを教えてください。進め方をご提案します。"] : ["Thanks for sharing. Tell me a little more about the style, purpose, and timing you have in mind.", "ありがとうございます。ご希望のイメージや用途、スケジュールをもう少し詳しく教えてください。"];
      reply.innerHTML = `${answer[0]}<small>${answer[1]}</small>`;
      feed.append(reply); feed.scrollTop = feed.scrollHeight;
    }, 450); feed.scrollTop = feed.scrollHeight;
  });

  /* Twenty original instrumental loops: ten Japanese-inspired and ten English-inspired. */
  const playlist = [
    ["Quiet Garden","静かな庭","jp",[0,2,3,2,1,0,3,4,3,2,-1,1,0,-1,2,4,5,4,3,2,-1,1,0]],
    ["Moonlit Kyoto","月夜の京都","jp",[4,3,2,0,-1,2,3,5,4,3,2,-1,0,1,2,4,3,2,-1,0]],
    ["Sakura Rain","桜雨","jp",[5,4,3,2,1,2,4,-1,3,2,0,-1,1,3,4,3,2,1,0]],
    ["Lanterns at Dusk","夕暮れの灯","jp",[0,1,3,4,3,1,-1,0,2,4,5,4,2,-1,1,3,2,0]],
    ["Koto by the Sea","海辺の琴","jp",[2,4,5,4,2,0,-1,2,3,4,3,2,-1,0,1,3,2,1]],
    ["Bamboo Path","竹林の小径","jp",[0,2,1,3,2,4,-1,3,1,2,0,-1,4,3,2,1,0]],
    ["Tea House Morning","茶屋の朝","jp",[1,3,4,3,2,1,0,-1,2,3,5,4,3,-1,1,2,0]],
    ["Snow on Mount Fuji","富士に降る雪","jp",[5,3,4,2,3,1,0,-1,2,4,3,5,4,2,-1,1,0]],
    ["Paper Cranes","折り鶴","jp",[0,3,2,4,3,5,4,-1,2,1,3,2,0,-1,1,4,3,2]],
    ["Spring in Nara","奈良の春","jp",[2,1,0,2,3,4,5,-1,4,2,3,1,0,-1,2,4,3,2,0]],
    ["Golden Hour","黄金色の時間","en",[0,2,4,5,4,2,1,-1,0,2,3,4,2,-1,1,0]],
    ["Open Road","続く道","en",[0,1,2,4,5,4,2,-1,3,2,1,0,-1,2,4,3]],
    ["Small Town Lights","小さな街の灯り","en",[3,2,0,1,2,4,-1,5,4,2,1,-1,0,2,3,1]],
    ["Sunday Window","日曜の窓辺","en",[0,2,3,2,4,5,4,-1,2,1,0,2,-1,3,4,2]],
    ["Blue Skies Ahead","青空の向こう","en",[4,5,6,5,4,2,-1,3,4,2,1,0,-1,2,4,5]],
    ["Homeward Bound","帰り道","en",[2,4,3,1,0,-1,1,2,4,5,4,2,-1,0,1,2]],
    ["Wildflower Song","野花の歌","en",[0,2,4,3,5,4,2,-1,1,3,2,0,-1,2,4,3]],
    ["Between the Lines","行間に","en",[3,2,1,0,2,4,-1,3,5,4,2,1,-1,0,2,3]],
    ["Morning Train","朝の列車","en",[0,1,3,4,5,4,-1,2,3,4,2,1,-1,0,2,4]],
    ["A Place to Begin","始まりの場所","en",[0,2,3,5,4,2,1,-1,0,2,4,3,-1,1,2,0]]
  ].map(([title, translation, style, notes]) => ({ title, translation, style, notes }));
  let trackIndex = 0, audioContext, masterGain, reverb, droneNodes = [], melodyTimer, playing = false, melodyStep = 0;
  const musicButton = $("#musicToggle"), trackInfo = $("#trackInfo");
  const updateTrackLabel = () => {
    const track = playlist[trackIndex];
    trackInfo.innerHTML = `<b>${track.title}</b><small>${track.translation} · ${trackIndex + 1}/20</small>`;
  };
  const prepareAudio = () => {
    if (audioContext) return;
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioContext.createGain(); masterGain.gain.value = .38; masterGain.connect(audioContext.destination);
    reverb = audioContext.createConvolver();
    const length = Math.floor(audioContext.sampleRate * 1.8), impulse = audioContext.createBuffer(2, length, audioContext.sampleRate);
    for (let channel = 0; channel < 2; channel++) {
      const data = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 3.8);
    }
    reverb.buffer = impulse; const wet = audioContext.createGain(); wet.gain.value = .16; reverb.connect(wet).connect(masterGain);
  };
  const stopPlayback = () => {
    clearInterval(melodyTimer); melodyTimer = null;
    droneNodes.forEach(node => { try { node.stop(); } catch {} }); droneNodes = []; playing = false;
    musicButton.classList.remove("playing"); $(".music-label", musicButton).innerHTML = "SOUND OFF<small>音楽オフ</small>";
    musicButton.setAttribute("aria-label", "Play music / 音楽を再生");
  };
  const startPlayback = async () => {
    prepareAudio(); if (audioContext.state === "suspended") await audioContext.resume();
    if (audioContext.state !== "running" || playing) return false;
    const track = playlist[trackIndex], japanese = track.style === "jp";
    const scale = japanese ? [293.66,329.63,392,440,493.88,587.33,659.25] : [196,220,246.94,293.66,329.63,392,440];
    melodyStep = 0;
    const pluck = (frequency, volume) => {
      const now = audioContext.currentTime, env = audioContext.createGain(), filter = audioContext.createBiquadFilter();
      env.gain.setValueAtTime(.0001, now); env.gain.exponentialRampToValueAtTime(volume, now + .012); env.gain.exponentialRampToValueAtTime(.0001, now + (japanese ? 1.45 : 1.8));
      filter.type = "lowpass"; filter.frequency.setValueAtTime(japanese ? 3200 : 2400, now); filter.frequency.exponentialRampToValueAtTime(700, now + 1.35);
      const fundamental = audioContext.createOscillator(), overtone = audioContext.createOscillator(), overtoneGain = audioContext.createGain();
      fundamental.type = japanese ? "triangle" : "sine"; fundamental.frequency.value = frequency;
      overtone.type = japanese ? "sine" : "triangle"; overtone.frequency.value = frequency * (japanese ? 2.01 : 2); overtoneGain.gain.value = japanese ? .18 : .09;
      fundamental.connect(filter); overtone.connect(overtoneGain).connect(filter); filter.connect(env);
      const dry = audioContext.createGain(); dry.gain.value = .72; env.connect(dry).connect(masterGain); env.connect(reverb);
      fundamental.start(now); overtone.start(now); fundamental.stop(now + 1.9); overtone.stop(now + 1.9);
    };
    const playNext = () => {
      const note = track.notes[melodyStep % track.notes.length]; melodyStep++;
      if (note >= 0) pluck(scale[note] * (melodyStep % 12 === 0 ? 2 : 1), note > 4 ? .055 : japanese ? .085 : .07);
    };
    const drone = audioContext.createOscillator(), droneGain = audioContext.createGain(), droneFilter = audioContext.createBiquadFilter();
    drone.type = "sine"; drone.frequency.value = scale[0] / 2; droneGain.gain.value = .014; droneFilter.type = "lowpass"; droneFilter.frequency.value = 400;
    drone.connect(droneFilter).connect(droneGain).connect(masterGain); drone.start(); droneNodes.push(drone);
    playNext(); melodyTimer = setInterval(playNext, japanese ? 570 : 620);
    playing = true; musicButton.classList.add("playing"); $(".music-label", musicButton).innerHTML = "SOUND ON<small>音楽オン</small>";
    musicButton.setAttribute("aria-label", "Pause music / 音楽を一時停止"); return true;
  };
  const changeTrack = async direction => {
    const wasPlaying = playing; if (wasPlaying) stopPlayback();
    trackIndex = (trackIndex + direction + playlist.length) % playlist.length; updateTrackLabel();
    await startPlayback();
  };
  updateTrackLabel();
  musicButton.addEventListener("click", async () => { if (playing) stopPlayback(); else await startPlayback(); });
  $("#previousTrack").addEventListener("click", () => changeTrack(-1));
  $("#nextTrack").addEventListener("click", () => changeTrack(1));
  const startAfterFirstInteraction = event => {
    if (event.target.closest(".music-player")) return;
    document.removeEventListener("pointerdown", startAfterFirstInteraction);
    document.removeEventListener("keydown", startAfterFirstInteraction);
    if (!playing) startPlayback().catch(() => {});
  };
  document.addEventListener("pointerdown", startAfterFirstInteraction, { once: true });
  document.addEventListener("keydown", startAfterFirstInteraction, { once: true });
  startPlayback().catch(() => {});

  const header = $(".site-header"), menu = $("#menuToggle");
  menu.addEventListener("click", () => { const open = header.classList.toggle("nav-open"); menu.setAttribute("aria-expanded", String(open)); });
  $$(".desktop-nav a").forEach(link => link.addEventListener("click", () => { header.classList.remove("nav-open"); menu.setAttribute("aria-expanded", "false"); }));
})();
