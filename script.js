/* ==========================================================================
   BIRTHDAY MAGIC - MAIN SCRIPT
   ========================================================================== */

// --- Default Data & State ---
const DEFAULT_CONFIG = {
  name: 'Любимая',
  subtitle: 'Пусть этот день будет наполнен улыбками, сказочными моментами и исполнением самых заветных желаний!',
  ticketTitle: 'Золотой Сертификат Счастья',
  ticketBody: `✨ <strong>Безлимитный запас:</strong> радости, вдохновения, искренних улыбок и крепкого здоровья на все 365 дней!
🎁 <strong>Право на исполнение:</strong> любых 3 заветных желаний прямо сейчас (или когда пожелаешь).
🥂 <strong>Бонус:</strong> праздничный ужин, крепкие объятия и вера в то, что ты сможешь покорить любую вершину!`,
  letterGreeting: 'Дорогой именинник,',
  letterContent: `<p>В этот чудесный день я хочу сказать тебе самое главное: ты удивительный, невероятный и очень ценный человек!</p>
<p>Пусть каждый день приносит поводы для искренней улыбки, рядом всегда будут преданные люди, а в душе царит абсолютная гармония и тепло.</p>
<p>Никогда не сомневайся в своих силах. Мечтай смело, люби всем сердцем, открывай новые горизонты и помни, что впереди — всё самое прекрасное!</p>
<p>Свети ярко и будь бесконечно счастлив(а)! 🎉</p>`,
  signature: 'С любовью и теплыми объятиями 💖'
};

const COMPLIMENTS_COLLECTION = [
  "Твоя улыбка способна осветить даже самый хмурый и ненастный день! ☀️",
  "С тобой мир вокруг становится чуточку добрее, теплее и ярче ✨",
  "У тебя невероятное чувство юмора и потрясающий вкус ко всему прекрасному! 😄",
  "Ты умеешь искренне поддерживать и вдохновлять людей вокруг себя 💫",
  "Твоему упорству и талантам можно только позавидовать! Ты сможешь всё 🚀",
  "У тебя самые добрые глаза и открытое сердце 💖",
  "Рядом с тобой всегда чувствуешь себя уютно и по-настоящему дома 🏡",
  "Ты человек слова, на которого всегда можно безоговорочно положиться 🤝",
  "Твой смех — самый заразительный и классный звук на свете! 😂",
  "Ты делаешь этот мир лучше просто своим присутствием в нём 🌸",
  "Пусть удача преследует тебя по пятам во всех твоих начинаниях! 🍀",
  "Ты вдохновляешь мечтать по-крупному и никогда не опускать руки 🌟",
  "Пусть в твоем кошельке всегда шуршат крупные купюры, а на счете растут нули! 💰",
  "Ты заслуживаешь самого искреннего и огромного счастья во всей Вселенной! 🪐",
  "Каждая минута, проведенная в общении с тобой — настоящий подарок 🎁",
  "Твое обаяние и харизма покоряют с первой секунды! 🔥",
  "Пусть каждый твой рассвет начинается с чашки вкусного кофе и хороших новостей ☕",
  "Ты умеешь находить красоту даже в самых простых вещах 🌿",
  "Пусть жизнь будет полна головокружительных путешествий и ярких открытий! ✈️",
  "Ты просто космос! Никогда не забывай об этом 🚀✨"
];

const BALLOON_BONUSES = [
  "Любви!", "Счастья!", "Удачи!", "Здоровья!", "Денег!", 
  "Путешествий!", "Вдохновения!", "Улыбок!", "Чудес!", "Гармонии!"
];

// --- Audio Synthesizer (Web Audio API) ---
class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.sfxEnabled = true;
    this.musicTimeout = null;
    this.notes = [
      261.63, 261.63, 293.66, 261.63, 349.23, 329.63, // Happy birthday to you
      261.63, 261.63, 293.66, 261.63, 392.00, 349.23, // Happy birthday to you
      261.63, 261.63, 523.25, 440.00, 349.23, 329.63, 293.66, // Happy birthday dear...
      466.16, 466.16, 440.00, 349.23, 392.00, 349.23  // Happy birthday to you
    ];
    this.durations = [
      300, 300, 600, 600, 600, 1000,
      300, 300, 600, 600, 600, 1000,
      300, 300, 600, 600, 600, 600, 1000,
      300, 300, 600, 600, 600, 1200
    ];
    this.currentNote = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 0.2, gainValue = 0.15) {
    if (!this.sfxEnabled) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainValue, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio error', e);
    }
  }

  playPop() {
    this.playTone(450, 'triangle', 0.15, 0.2);
  }

  playChime() {
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'sine', 0.4, 0.1), idx * 80);
    });
  }

  playFanfare() {
    const fanfare = [
      { f: 392, d: 0.15 }, { f: 523.25, d: 0.15 }, { f: 659.25, d: 0.15 }, { f: 783.99, d: 0.5 }
    ];
    fanfare.forEach((n, idx) => {
      setTimeout(() => this.playTone(n.f, 'triangle', n.d, 0.2), idx * 130);
    });
  }

  playWhoosh() {
    if (!this.sfxEnabled) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.5);
    } catch (e) {}
  }

  toggleMusic() {
    this.init();
    this.isPlayingMusic = !this.isPlayingMusic;
    const btn = document.getElementById('music-btn');

    if (this.isPlayingMusic) {
      btn.classList.add('playing');
      this.currentNote = 0;
      this.playNextMusicNote();
    } else {
      btn.classList.remove('playing');
      if (this.musicTimeout) clearTimeout(this.musicTimeout);
    }
    return this.isPlayingMusic;
  }

  playNextMusicNote() {
    if (!this.isPlayingMusic) return;
    const freq = this.notes[this.currentNote];
    const dur = this.durations[this.currentNote];

    this.playTone(freq, 'sine', (dur / 1000) * 0.9, 0.12);

    this.currentNote = (this.currentNote + 1) % this.notes.length;
    this.musicTimeout = setTimeout(() => this.playNextMusicNote(), dur + 40);
  }
}

const audio = new AudioEngine();

// --- Background Interactive Particle Canvas ---
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const stars = [];
  const starCount = Math.min(100, Math.floor((width * height) / 9000));

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
      color: Math.random() > 0.3 ? '#ffeaa7' : '#fd79a8'
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    stars.forEach(s => {
      s.alpha += s.speed;
      if (s.alpha > 1 || s.alpha < 0) s.speed = -s.speed;

      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha));
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.shadowBlur = 8;
      ctx.shadowColor = s.color;
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(render);
  }
  render();
}

// --- Confetti Cannon Helper ---
function fireConfetti(options = {}) {
  audio.playPop();
  if (typeof confetti === 'function') {
    confetti({
      particleCount: options.count || 80,
      spread: options.spread || 70,
      origin: options.origin || { y: 0.65 },
      colors: options.colors || ['#ff4d88', '#feca57', '#54a0ff', '#5f27cd', '#1dd1a1', '#ff9ff3']
    });
  }
}

function launchMegaConfetti() {
  audio.playFanfare();
  const count = 200;
  const defaults = { origin: { y: 0.7 } };

  function fire(particleRatio, opts) {
    if (typeof confetti === 'function') {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}

// --- Config & Personalization System ---
function loadConfig() {
  const params = new URLSearchParams(window.location.search);
  const hash = window.location.hash.replace('#', '');
  let config = { ...DEFAULT_CONFIG };

  // URL Query Parameters override
  if (params.get('name')) config.name = params.get('name');
  if (params.get('subtitle')) config.subtitle = params.get('subtitle');
  if (params.get('ticket')) config.ticketBody = params.get('ticket');
  if (params.get('letter')) config.letterContent = params.get('letter');
  if (params.get('sig')) config.signature = params.get('sig');

  // Fallback to localStorage
  if (!params.get('name')) {
    const saved = localStorage.getItem('birthday_config');
    if (saved) {
      try {
        config = { ...config, ...JSON.parse(saved) };
      } catch (e) {}
    }
  }

  applyConfigToDOM(config);
  return config;
}

function applyConfigToDOM(cfg) {
  const nameEl = document.getElementById('recipient-name');
  const heroSubtitleEl = document.getElementById('hero-subtitle');
  const ticketRecipientEl = document.getElementById('ticket-recipient-name');
  const ticketBodyEl = document.getElementById('ticket-body');
  const letterGreetingEl = document.getElementById('letter-greeting');
  const letterContentEl = document.getElementById('letter-content');
  const letterSigEl = document.getElementById('letter-signature');

  if (nameEl) nameEl.textContent = cfg.name;
  if (heroSubtitleEl) heroSubtitleEl.textContent = cfg.subtitle;
  if (ticketRecipientEl) ticketRecipientEl.textContent = cfg.name;
  if (ticketBodyEl) ticketBodyEl.innerHTML = cfg.ticketBody;
  if (letterGreetingEl) letterGreetingEl.textContent = `Дорогой(ая) ${cfg.name},`;
  if (letterContentEl) letterContentEl.innerHTML = cfg.letterContent;
  if (letterSigEl) letterSigEl.textContent = cfg.signature;

  // Set inputs in modal
  document.getElementById('input-recipient-name').value = cfg.name;
  document.getElementById('input-hero-subtitle').value = cfg.subtitle;
  document.getElementById('input-ticket-body').value = cfg.ticketBody.replace(/<[^>]*>?/gm, '');
  document.getElementById('input-letter-body').value = cfg.letterContent.replace(/<[^>]*>?/gm, '');
  document.getElementById('input-signature').value = cfg.signature;
}

function saveConfigFromModal() {
  const cfg = {
    name: document.getElementById('input-recipient-name').value.trim() || DEFAULT_CONFIG.name,
    subtitle: document.getElementById('input-hero-subtitle').value.trim() || DEFAULT_CONFIG.subtitle,
    ticketBody: document.getElementById('input-ticket-body').value.trim() || DEFAULT_CONFIG.ticketBody,
    letterContent: document.getElementById('input-letter-body').value.trim() || DEFAULT_CONFIG.letterContent,
    signature: document.getElementById('input-signature').value.trim() || DEFAULT_CONFIG.signature
  };

  localStorage.setItem('birthday_config', JSON.stringify(cfg));
  applyConfigToDOM(cfg);
  closeModal();
  showToast('Настройки сохранены! ✨');
}

function generateShareUrl() {
  const cfg = {
    name: document.getElementById('input-recipient-name').value.trim() || DEFAULT_CONFIG.name,
    subtitle: document.getElementById('input-hero-subtitle').value.trim() || DEFAULT_CONFIG.subtitle
  };

  const url = new URL(window.location.href);
  url.searchParams.set('name', cfg.name);
  url.searchParams.set('subtitle', cfg.subtitle);

  navigator.clipboard.writeText(url.toString()).then(() => {
    showToast('Уникальная ссылка скопирована! 🔗');
  }).catch(() => {
    prompt('Скопируй эту ссылку:', url.toString());
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast-message');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// --- Modal Handling ---
function openModal() {
  document.getElementById('customize-modal').classList.add('show');
}
function closeModal() {
  document.getElementById('customize-modal').classList.remove('show');
}

// --- Interactive Gift Box ---
function setupGiftBox() {
  const box = document.getElementById('gift-box');
  const ticketContainer = document.getElementById('opened-gift-container');
  const giftHint = document.getElementById('gift-hint');

  if (!box) return;

  box.addEventListener('click', () => {
    if (box.classList.contains('opened')) return;

    box.classList.add('opened');
    giftHint.style.display = 'none';

    audio.playFanfare();
    fireConfetti({ count: 120, spread: 90 });

    setTimeout(() => {
      ticketContainer.classList.add('show');
      ticketContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      fireConfetti({ count: 60, spread: 60 });
    }, 450);
  });

  const printBtn = document.getElementById('print-ticket-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      audio.playChime();
      window.print();
    });
  }
}

// --- Cake & Candles Blowout ---
function setupCake() {
  const blowBtn = document.getElementById('blow-candles-btn');
  const micBtn = document.getElementById('mic-blow-btn');
  const reigniteBtn = document.getElementById('reignite-btn');
  const candles = document.querySelectorAll('.candle');
  const wishBanner = document.getElementById('wish-granted-banner');
  let isBlown = false;

  function blowOut() {
    if (isBlown) return;
    isBlown = true;

    audio.playWhoosh();
    candles.forEach((c, idx) => {
      setTimeout(() => c.classList.add('blown-out'), idx * 120);
    });

    setTimeout(() => {
      audio.playChime();
      fireConfetti({ count: 100, colors: ['#ffd700', '#ffffff', '#ff9a9e'] });
      wishBanner.classList.add('show');
    }, 500);
  }

  function reignite() {
    isBlown = false;
    audio.playPop();
    candles.forEach(c => c.classList.remove('blown-out'));
    wishBanner.classList.remove('show');
  }

  if (blowBtn) blowBtn.addEventListener('click', blowOut);
  if (reigniteBtn) reigniteBtn.addEventListener('click', reignite);

  // Microphone breath detection
  if (micBtn) {
    micBtn.addEventListener('click', async () => {
      if (isBlown) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micBtn.innerHTML = '<i class="fa-solid fa-microphone-lines"></i> Слушаю... Дуй!';
        micBtn.style.borderColor = '#ff4d88';

        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioCtx.createAnalyser();
        const mic = audioCtx.createMediaStreamSource(stream);
        mic.connect(analyser);
        analyser.fftSize = 256;
        const data = new Uint8Array(analyser.frequencyBinCount);

        let checkInterval = setInterval(() => {
          analyser.getByteFrequencyData(data);
          let sum = 0;
          for (let i = 0; i < data.length; i++) sum += data[i];
          let avg = sum / data.length;

          // Blow threshold
          if (avg > 48) {
            blowOut();
            clearInterval(checkInterval);
            stream.getTracks().forEach(t => t.stop());
            micBtn.innerHTML = '<i class="fa-solid fa-microphone"></i> Задуто микрофоном! ✨';
          }
        }, 100);

        // Timeout stop after 10s
        setTimeout(() => {
          clearInterval(checkInterval);
          stream.getTracks().forEach(t => t.stop());
          if (!isBlown) {
            micBtn.innerHTML = '<i class="fa-solid fa-microphone"></i> Попробуй нажать кнопку';
          }
        }, 10000);

      } catch (err) {
        alert('Микрофон недоступен, но ты можешь просто нажать на кнопку "Задуть свечи!"');
      }
    });
  }
}

// --- Wax Seal & Letter ---
function setupLetter() {
  const seal = document.getElementById('wax-seal');
  const letterPaper = document.getElementById('letter-paper');
  const closeBtn = document.getElementById('close-letter-btn');
  const envelope = document.getElementById('envelope');

  function openLetter() {
    audio.playChime();
    seal.style.opacity = '0';
    seal.style.pointerEvents = 'none';
    document.getElementById('envelope-flap').style.transform = 'rotateX(180deg)';
    
    setTimeout(() => {
      letterPaper.classList.add('show');
      letterPaper.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 350);
  }

  function closeLetter() {
    letterPaper.classList.remove('show');
    setTimeout(() => {
      document.getElementById('envelope-flap').style.transform = 'rotateX(0deg)';
      seal.style.opacity = '1';
      seal.style.pointerEvents = 'auto';
    }, 400);
  }

  if (seal) seal.addEventListener('click', openLetter);
  if (envelope) envelope.addEventListener('click', openLetter);
  if (closeBtn) closeBtn.addEventListener('click', closeLetter);
}

// --- Jar of Compliments ---
function setupJar() {
  const nextBtn = document.getElementById('next-compliment-btn');
  const textEl = document.getElementById('compliment-text');
  const counterEl = document.getElementById('compliment-counter');
  let currentIdx = 0;

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      audio.playPop();
      currentIdx = (currentIdx + 1) % COMPLIMENTS_COLLECTION.length;
      
      textEl.style.opacity = '0';
      textEl.style.transform = 'translateY(10px)';

      setTimeout(() => {
        textEl.textContent = COMPLIMENTS_COLLECTION[currentIdx];
        counterEl.textContent = `Записка #${currentIdx + 1} из ${COMPLIMENTS_COLLECTION.length}`;
        textEl.style.opacity = '1';
        textEl.style.transform = 'translateY(0)';
      }, 200);
    });
  }
}

// --- Balloon Mini-Game ---
function setupBalloonGame() {
  const area = document.getElementById('game-area');
  const poppedCountEl = document.getElementById('popped-count');
  const bonusEl = document.getElementById('last-bonus');
  let score = 0;

  if (!area) return;

  const colors = [
    'radial-gradient(circle at 30% 30%, #ff7675, #d63031)',
    'radial-gradient(circle at 30% 30%, #74b9ff, #0984e3)',
    'radial-gradient(circle at 30% 30%, #55efc4, #00b894)',
    'radial-gradient(circle at 30% 30%, #ffeaa7, #fdcb6e)',
    'radial-gradient(circle at 30% 30%, #a29bfe, #6c5ce7)',
    'radial-gradient(circle at 30% 30%, #fd79a8, #e84393)'
  ];

  function spawnBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'game-balloon';
    const color = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.background = color;

    const left = Math.random() * (area.clientWidth - 80);
    balloon.style.left = `${left}px`;

    const duration = Math.random() * 4 + 4; // 4 to 8s
    balloon.style.animation = `floatUp ${duration}s linear forwards`;

    balloon.addEventListener('click', (e) => {
      e.stopPropagation();
      popBalloon(balloon);
    });

    area.appendChild(balloon);

    setTimeout(() => {
      if (balloon.parentNode === area) {
        area.removeChild(balloon);
      }
    }, duration * 1000);
  }

  function popBalloon(balloon) {
    audio.playPop();
    score++;
    poppedCountEl.textContent = score;

    const bonus = BALLOON_BONUSES[Math.floor(Math.random() * BALLOON_BONUSES.length)];
    bonusEl.textContent = `+ ${bonus}`;

    // Pop animation
    balloon.style.transform = 'scale(1.4)';
    balloon.style.opacity = '0';
    setTimeout(() => {
      if (balloon.parentNode === area) area.removeChild(balloon);
    }, 150);

    fireConfetti({ count: 25, spread: 45 });
  }

  // Animation style for balloons floating up
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatUp {
      0% { transform: translateY(0) rotate(0deg); }
      100% { transform: translateY(-480px) rotate(15deg); }
    }
  `;
  document.head.appendChild(style);

  // Spawn interval
  setInterval(() => {
    if (document.visibilityState === 'visible' && area.children.length < 8) {
      spawnBalloon();
    }
  }, 1400);
}

// --- Custom Photo Upload ---
function setupPhotoUpload() {
  const addBtn = document.getElementById('add-photo-btn');
  const input = document.getElementById('photo-upload-input');
  const grid = document.getElementById('polaroid-grid');

  if (!addBtn || !input || !grid) return;

  addBtn.addEventListener('click', () => input.click());

  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const card = document.createElement('div');
      card.className = 'polaroid-card rotate-left';
      card.innerHTML = `
        <div class="tape-pin"></div>
        <div class="polaroid-img-wrapper">
          <img src="${event.target.result}" alt="Фото именинника">
        </div>
        <div class="polaroid-caption">Любимый кадр 💖</div>
      `;
      grid.prepend(card);
      audio.playChime();
      showToast('Твоё фото добавлено в галерею! 📸');
    };
    reader.readAsDataURL(file);
  });
}

// --- Initialize Everything on DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  loadConfig();
  setupGiftBox();
  setupCake();
  setupLetter();
  setupJar();
  setupBalloonGame();
  setupPhotoUpload();

  // Music Button
  const musicBtn = document.getElementById('music-btn');
  if (musicBtn) {
    musicBtn.addEventListener('click', () => {
      audio.toggleMusic();
    });
  }

  // SFX Button
  const sfxBtn = document.getElementById('sfx-btn');
  if (sfxBtn) {
    sfxBtn.addEventListener('click', () => {
      audio.sfxEnabled = !audio.sfxEnabled;
      sfxBtn.classList.toggle('active', audio.sfxEnabled);
      showToast(audio.sfxEnabled ? 'Звуковые эффекты включены 🔊' : 'Звук выключен 🔇');
    });
  }

  // Confetti Launchers
  const heroConfettiBtn = document.getElementById('launch-confetti-btn');
  if (heroConfettiBtn) {
    heroConfettiBtn.addEventListener('click', () => launchMegaConfetti());
  }

  const grandFinaleBtn = document.getElementById('grand-finale-btn');
  if (grandFinaleBtn) {
    grandFinaleBtn.addEventListener('click', () => launchMegaConfetti());
  }

  // Customization Modal Handlers
  const customizeBtn = document.getElementById('customize-btn');
  const footerCustomizeLink = document.getElementById('footer-customize-link');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const saveBtn = document.getElementById('save-customization-btn');
  const shareBtn = document.getElementById('copy-share-url-btn');
  const footerShareBtn = document.getElementById('share-link-btn');
  const resetBtn = document.getElementById('reset-defaults-btn');

  if (customizeBtn) customizeBtn.addEventListener('click', openModal);
  if (footerCustomizeLink) footerCustomizeLink.addEventListener('click', openModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  if (saveBtn) saveBtn.addEventListener('click', saveConfigFromModal);
  if (shareBtn) shareBtn.addEventListener('click', generateShareUrl);
  if (footerShareBtn) footerShareBtn.addEventListener('click', generateShareUrl);

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      localStorage.removeItem('birthday_config');
      applyConfigToDOM(DEFAULT_CONFIG);
      showToast('Сброшено на настройки по умолчанию!');
    });
  }

  // Close modal when clicking outside
  const modalOverlay = document.getElementById('customize-modal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
});
