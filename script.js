/* ==========================================================================
   DASHK // 16 LETOV - INTERACTIVE ENGINE
   ========================================================================== */

// --- Quotes & Facts Data ---
const DASHA_FACTS = [
  "«Сама ты чепушила лахматая» — фундаментальная истина, проверенная временем и дружбой.",
  "Код 67 — это не просто цифра, это тайный уровень дружбы и абсолютного взаимопонимания ⚡",
  "Официальный статус: 16 летов! Пора оформлять пенсионную карту и ворчать на молодёжь 👵",
  "Мастер оригами: может сложить 1000 журавликов и исполнить любое желание 🕊️",
  "3D-печать — её суперсила. Скоро напечатает всё, кроме лишних нервов 🖨️",
  "Кто тут старше? Правильно, Дашк. Но слушаться её я всё равно не буду 😜",
  "С граблями наперевес в деревне — гроза любого урожая и повелительница дачи 🌾",
  "Наггетс в руке и пальцы веером — знак абсолютной победы и спокойствия ✌️",
  "Чилл на асфальте под мостом — уровень душевного дзена 100 из 100 🌊",
  "Букет из плюшевых Hello Kitty уже считает минуты до момента вручения! 🐱🎀",
  "Дружба с Дашк повышает выработку эндорфинов ровно на 670% 📈",
  "Даже если в 16 лет начнут поскрипывать суставы — журавлики вылечат всё 💙",
  "Человек, с которым можно съесть центнер бургеров и ни о чём не жалеть 🍔",
  "Та самая подруга, которая всегда поддержит любую безумную идею 🚀",
  "По меркам Древней Руси уже старовата для свадьбы, но в современном мире — всё только начинается! 👑",
  "Главный девиз: «Вперед и только вперед, ни шагу назад!» 🚀",
  "Дашк, ты просто легенда. Свети дальше и оставайся такой же настоящей ✨"
];

// --- Web Audio Synthesizer ---
class MinimalSound {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBeep(freq = 440, type = 'sine', duration = 0.15, gainVal = 0.1) {
    if (!this.enabled) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playChime() {
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      setTimeout(() => this.playBeep(freq, 'sine', 0.25, 0.08), idx * 70);
    });
  }

  playPop() {
    this.playBeep(420, 'triangle', 0.1, 0.15);
  }

  playPuff() {
    if (!this.enabled) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch (e) {}
  }
}

const sfx = new MinimalSound();

// --- Background Particle & Crane Canvas ---
function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const particles = [];
  const count = Math.min(60, Math.floor((w * h) / 18000));

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.7 + 0.2,
      vy: -(Math.random() * 0.3 + 0.1),
      vx: (Math.random() - 0.5) * 0.2,
      color: Math.random() > 0.4 ? '#3b82f6' : '#94a3b8'
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    particles.forEach(p => {
      p.y += p.vy;
      p.x += p.vx;
      if (p.y < 0) p.y = h;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(draw);
  }
  draw();
}

// --- Confetti Helper ---
function shootConfetti(spread = 70, count = 80) {
  sfx.playPop();
  if (typeof confetti === 'function') {
    confetti({
      particleCount: count,
      spread: spread,
      origin: { y: 0.7 },
      colors: ['#3b82f6', '#60a5fa', '#f8fafc', '#94a3b8', '#1e293b']
    });
  }
}

function shootMegaSalute() {
  sfx.playChime();
  const end = Date.now() + 2000;
  const colors = ['#3b82f6', '#60a5fa', '#ffffff', '#93c5fd'];

  (function frame() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });
    }
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// --- Origami Cranes Flying Animation ---
function launchFlyingCranes() {
  sfx.playChime();
  showToast('Журавлики полетели! 🕊️✨');
  
  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      const crane = document.createElement('div');
      crane.className = 'flying-crane-element';
      crane.innerHTML = Math.random() > 0.3 ? '🕊️' : '67';
      crane.style.position = 'fixed';
      crane.style.left = `${Math.random() * 80 + 10}vw`;
      crane.style.bottom = '-50px';
      crane.style.fontSize = `${Math.random() * 1.5 + 1.2}rem`;
      crane.style.color = '#60a5fa';
      crane.style.zIndex = '999';
      crane.style.pointerEvents = 'none';
      crane.style.transition = 'transform 3.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 3.5s';

      document.body.appendChild(crane);

      requestAnimationFrame(() => {
        const xOffset = (Math.random() - 0.5) * 200;
        crane.style.transform = `translate(${xOffset}px, -110vh) rotate(${(Math.random() - 0.5) * 60}deg)`;
        crane.style.opacity = '0';
      });

      setTimeout(() => crane.remove(), 4000);
    }, i * 150);
  }
}

// --- Material Gift Box (Hello Kitty) ---
function setupGiftBox() {
  const box = document.getElementById('minimal-box');
  const card = document.getElementById('gift-reveal-card');
  const hint = document.getElementById('box-hint');
  const confirmBtn = document.getElementById('kitty-confirm-btn');

  if (!box) return;

  box.addEventListener('click', () => {
    if (box.classList.contains('opened')) return;

    box.classList.add('opened');
    hint.style.display = 'none';
    sfx.playChime();
    shootConfetti(80, 100);

    setTimeout(() => {
      card.classList.add('show');
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      shootConfetti(60, 60);
    }, 450);
  });

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      sfx.playChime();
      shootConfetti(90, 120);
      showToast('Букет забронирован за тобой! 🐱💖');
    });
  }
}

// --- Cake & Candles Blowout ---
function setupCake() {
  const blowBtn = document.getElementById('blow-cake-btn');
  const micBtn = document.getElementById('mic-cake-btn');
  const relightBtn = document.getElementById('relight-btn');
  const candles = document.querySelectorAll('.candle');
  const banner = document.getElementById('wish-banner');
  let blown = false;

  function extinguish() {
    if (blown) return;
    blown = true;

    sfx.playPuff();
    candles.forEach((c, idx) => {
      setTimeout(() => c.classList.add('blown'), idx * 100);
    });

    setTimeout(() => {
      sfx.playChime();
      shootConfetti(80, 100);
      banner.classList.add('show');
    }, 400);
  }

  function relight() {
    blown = false;
    sfx.playPop();
    candles.forEach(c => c.classList.remove('blown'));
    banner.classList.remove('show');
  }

  if (blowBtn) blowBtn.addEventListener('click', extinguish);
  if (relightBtn) relightBtn.addEventListener('click', relight);

  // Microphone detection
  if (micBtn) {
    micBtn.addEventListener('click', async () => {
      if (blown) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micBtn.innerHTML = '<i class="fa-solid fa-microphone-lines"></i> Слушаю... Дуй сильнее!';
        micBtn.style.borderColor = '#3b82f6';

        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioCtx.createAnalyser();
        const mic = audioCtx.createMediaStreamSource(stream);
        mic.connect(analyser);
        analyser.fftSize = 256;
        const data = new Uint8Array(analyser.frequencyBinCount);

        const checkInterval = setInterval(() => {
          analyser.getByteFrequencyData(data);
          let sum = 0;
          for (let i = 0; i < data.length; i++) sum += data[i];
          let avg = sum / data.length;

          if (avg > 45) {
            extinguish();
            clearInterval(checkInterval);
            stream.getTracks().forEach(t => t.stop());
            micBtn.innerHTML = '<i class="fa-solid fa-check"></i> Задуто микрофоном!';
          }
        }, 100);

        setTimeout(() => {
          clearInterval(checkInterval);
          stream.getTracks().forEach(t => t.stop());
          if (!blown) {
            micBtn.innerHTML = '<i class="fa-solid fa-microphone"></i> Попробуй кнопкой';
          }
        }, 9000);
      } catch (err) {
        showToast('Микрофон не доступен, нажми кнопку «Задуть свечи»');
      }
    });
  }
}

// --- Quotes & Facts Generator ---
function setupQuotes() {
  const btn = document.getElementById('next-quote-btn');
  const textEl = document.getElementById('quote-text');
  const numberEl = document.getElementById('quote-number');
  let currentIdx = 0;

  if (!btn || !textEl) return;

  btn.addEventListener('click', () => {
    sfx.playPop();
    currentIdx = (currentIdx + 1) % DASHA_FACTS.length;

    textEl.style.opacity = '0';
    textEl.style.transform = 'translateY(6px)';

    setTimeout(() => {
      textEl.textContent = DASHA_FACTS[currentIdx];
      numberEl.textContent = `[FACT #${currentIdx + 1}]`;
      textEl.style.opacity = '1';
      textEl.style.transform = 'translateY(0)';
    }, 180);
  });
}

// --- Lightbox for 13 Photos ---
function setupLightbox() {
  const cards = document.querySelectorAll('.photo-card');
  const modal = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  const close = document.getElementById('lightbox-close');
  const overlay = document.getElementById('lightbox-overlay');

  if (!modal) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const fullSrc = card.getAttribute('data-full');
      const text = card.getAttribute('data-caption');
      img.src = fullSrc;
      caption.textContent = text;
      modal.classList.add('show');
      sfx.playPop();
    });
  });

  function hide() {
    modal.classList.remove('show');
  }

  if (close) close.addEventListener('click', hide);
  if (overlay) overlay.addEventListener('click', hide);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hide();
  });
}

// --- Easter Egg 67 ---
function setupEasterEgg() {
  const btn = document.getElementById('easter-egg-67');
  const modal = document.getElementById('modal-67');
  const close = document.getElementById('egg-close');

  if (!btn || !modal) return;

  btn.addEventListener('click', () => {
    sfx.playChime();
    modal.classList.add('show');
    launchFlyingCranes();
    shootConfetti(100, 150);
  });

  if (close) {
    close.addEventListener('click', () => modal.classList.remove('show'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('show');
  });
}

// --- Toast Helper ---
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// --- Initialize Everything ---
document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  setupGiftBox();
  setupCake();
  setupQuotes();
  setupLightbox();
  setupEasterEgg();

  // Sound toggle button
  const sfxBtn = document.getElementById('sfx-toggle');
  if (sfxBtn) {
    sfxBtn.addEventListener('click', () => {
      sfx.enabled = !sfx.enabled;
      sfxBtn.classList.toggle('active', sfx.enabled);
      showToast(sfx.enabled ? 'Звук включен 🔊' : 'Звук выключен 🔇');
    });
  }

  // Confetti buttons
  const confettiTrigger = document.getElementById('confetti-trigger');
  if (confettiTrigger) {
    confettiTrigger.addEventListener('click', () => shootConfetti(90, 120));
  }

  const megaSalute = document.getElementById('mega-salute-btn');
  if (megaSalute) {
    megaSalute.addEventListener('click', () => shootMegaSalute());
  }

  const craneTrigger = document.getElementById('crane-spawn-trigger');
  if (craneTrigger) {
    craneTrigger.addEventListener('click', () => launchFlyingCranes());
  }
});
