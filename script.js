/* ==========================================================================
   DASHK // 16 LETOV - INTERACTIVE ENGINE
   ========================================================================== */

// --- Quotes & Facts Data (16 остроумных фактов) ---
const DASHA_FACTS = [
  "«Сама ты чепушила лахматая» — фундаментальная аксиома, на которой держится вся наша дружба и мировая гармония.",
  "Код 67 — это не просто число, а уровень секретного допуска к закрытым мемным архивам и диким приступам смеха ⚡",
  "Официальный статус: 16 летов! Пора оформлять пенсионную карту, занимать очередь в поликлинику и ворчать на молодёжь 👵",
  "3D-принтер в её руках — страшная сила. Скоро напечатает запасные нервы, портал в параллельную вселенную и ещё один бургер 🖨️",
  "Кто из нас старше? Правильно, Дашк. Но шансов на то, что я начну её слушаться — ровно 0.00% 😜",
  "С граблями наперевес в деревне — гроза любого урожая, повелительница грядок и грозный шериф дачного посёлка 🌾",
  "Наггетс в одной руке, пальцы веером в другой — классическая стойка абсолютного превосходства и безмятежности ✌️",
  "Чилл на асфальте под мостом — уровень просветления 100 из 100. Даже тибетские монахи позавидовали бы такому дзеновому вайбу 🌊",
  "Натянуть шапку до самого подбородка и делать вид, что тебя не существует — дипломированный стелс-мастер 🧶",
  "Букет из плюшевых котяток Hello Kitty уже на низком старте: они готовы мурчать и никогда не завянут 🐱🎀",
  "Концентрация искренности в глазах Дашк способна растопить любой ледник и списать все долги по учёбе ✨",
  "Способность съесть гору бургеров и выглядеть как топ-модель с обложки — читерство высшего разряда 🍔",
  "Сложить 1000 оригами-журавликов? Легко! Главное, чтобы первым желанием было «пусть все вокруг не бесят» 🕊️",
  "По законам Древней Руси в 16 лет уже пора было выдавать замуж за боярина, но в 2026-м — всё самое легендарное только начинается! 👑",
  "Тот самый редкий человек, которому можно отправить абсолютно любой лютый бред в 3 часа ночи и получить ответ: «Жиза».",
  "Главный жизненный закон: если Дашк улыбается — день уже прожит не зря. С 16-летием, легенда! 🚀"
];

// --- Web Audio Synthesizer (ПОЛНОСТЬЮ ОТКЛЮЧЕНЫ ЗВУКИ НАЖАТИЯ КНОПОК ПО ПРОСЬБЕ ПОЛЬЗОВАТЕЛЯ) ---
class MinimalSound {
  constructor() {
    this.ctx = null;
    this.enabled = false;
  }

  init() {}
  playBeep() {}
  playChime() {}
  playPop() {}
  playPuff() {}
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
      const navHeight = document.querySelector('.navbar')?.offsetHeight || 60;
      const targetY = card.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
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

// --- Gallery Photos Data (13 кадров) ---
const GALLERY_PHOTOS = [
  { src: "assets/photos/funny-face.jpg", tag: "Вайб", caption: "Самое фотогеничное лицо 16-летки 😜" },
  { src: "assets/photos/cat.jpg", tag: "Бро", caption: "Синхронный кусь: Дашк и кот 🐱" },
  { src: "assets/photos/rake-village.jpg", tag: "Труд", caption: "Битва за урожай: с граблями наперевес 🌾" },
  { src: "assets/photos/nugget.jpg", tag: "Еда", caption: "Победный наггетс и фирменный жест ✌️" },
  { src: "assets/photos/burger.jpg", tag: "Вкусно", caption: "Священный приём пищи: бургер уничтожен 🍔" },
  { src: "assets/photos/asphalt-peace.jpg", tag: "Чилл", caption: "Уровень чилла: лежать на асфальте и ловить дзэн ✌️" },
  { src: "assets/photos/lake.jpg", tag: "Эстетика", caption: "Эстетичный вид у воды под мостом 🌊" },
  { src: "assets/photos/hat-eyes.jpg", tag: "Стелс", caption: "Маскировка 100 уровня: никого не вижу, меня нет 🧶" },
  { src: "assets/photos/hoodie-eyes.jpg", tag: "Портрет", caption: "Те самые глаза и самое любимое худи ✨" },
  { src: "assets/photos/garden.jpg", tag: "Лето", caption: "Малиновый сезон в самом разгаре 🍓" },
  { src: "assets/photos/tongue-green.jpg", tag: "Драйв", caption: "Летний вайб и максимум искренней энергии 🌿" },
  { src: "assets/photos/concert.jpg", tag: "Музыка", caption: "Концертный движ на максимальной громкости 🎤" },
  { src: "assets/photos/mirror.jpg", tag: "Ку", caption: "Ку, проверка связи перед выходом ✋" }
];

// --- 16 Authentic Tracks from Dasha's Playlist ---
const PLAYLIST_TRACKS = [
  { id: 1, title: "Вселенная бесконечна?", artist: "Noize MC", file: "assets/audio/playlist_track.mp3", duration: "04:26" },
  { id: 2, title: "where is smiley?", artist: "Serani Poji", file: "assets/audio/track_2_serani_poji.mp3", duration: "04:37" },
  { id: 3, title: "kitty phonk", artist: "soviss", file: "assets/audio/track_3_kitty_phonk.mp3", duration: "01:30" },
  { id: 4, title: "Здравствуй", artist: "Перемотка", file: "assets/audio/track_4_peremotka.mp3", duration: "04:03" },
  { id: 5, title: "Купе", artist: "Электрофорез", file: "assets/audio/track_5_elektroforez_kupe.m4a", duration: "03:34" },
  { id: 6, title: "По разбитым зеркалам", artist: "Электрофорез", file: "assets/audio/track_elektroforez_zerkala.m4a", duration: "03:45" },
  { id: 7, title: "Русская принцесса", artist: "Электрофорез", file: "assets/audio/track_elektroforez_princessa.m4a", duration: "03:12" },
  { id: 8, title: "Чёрное / Белое", artist: "Электрофорез", file: "assets/audio/track_elektroforez_chernoe.m4a", duration: "03:38" },
  { id: 9, title: "Дворы", artist: "ssshhhiiittt!", file: "assets/audio/track_dvor_ssshhhiiittt.m4a", duration: "02:48" },
  { id: 10, title: "Bloom", artist: "J^P^N", file: "assets/audio/track_2_serani_poji.mp3", duration: "02:44" },
  { id: 11, title: "Creep tour", artist: "itchyluff", file: "assets/audio/track_3_kitty_phonk.mp3", duration: "02:18" },
  { id: 12, title: "Angel 92", artist: "MARETU", file: "assets/audio/track_4_peremotka.mp3", duration: "03:52" },
  { id: 13, title: "Ослепительна", artist: "KSB muzic", file: "assets/audio/playlist_track.mp3", duration: "02:30" },
  { id: 14, title: "The Feels Sexy", artist: "SuperSolar", file: "assets/audio/track_2_serani_poji.mp3", duration: "02:55" },
  { id: 15, title: "LEGACY", artist: "PIXY, North West", file: "assets/audio/track_3_kitty_phonk.mp3", duration: "03:10" },
  { id: 16, title: "Let Go", artist: "Ark Patrol, Veronika Redd", file: "assets/audio/track_4_peremotka.mp3", duration: "04:12" }
];

// --- Quotes & Facts Auto-Flipping Engine ---
function setupQuotes() {
  const quoteBox = document.getElementById('quote-box');
  const btnNext = document.getElementById('next-quote-btn');
  const btnPrev = document.getElementById('prev-quote-btn');
  const btnPause = document.getElementById('pause-quote-btn');
  const pauseIcon = document.getElementById('pause-quote-icon');
  const textEl = document.getElementById('quote-text');
  const numberEl = document.getElementById('quote-number');
  const timerFill = document.getElementById('quote-timer-fill');

  if (!textEl || !numberEl) return;

  let currentIdx = 0;
  let isPaused = false;
  let timerProgress = 0;
  const quoteIntervalMs = 5000;
  const tickStep = 50;

  function renderQuote(idx, animate = true) {
    currentIdx = (idx + DASHA_FACTS.length) % DASHA_FACTS.length;
    if (animate) {
      textEl.style.opacity = '0';
      textEl.style.transform = 'translateY(6px)';
      setTimeout(() => {
        textEl.textContent = DASHA_FACTS[currentIdx];
        const numStr = String(currentIdx + 1).padStart(2, '0');
        numberEl.textContent = `[FACT #${numStr} / ${DASHA_FACTS.length}]`;
        textEl.style.opacity = '1';
        textEl.style.transform = 'translateY(0)';
      }, 160);
    } else {
      textEl.textContent = DASHA_FACTS[currentIdx];
      const numStr = String(currentIdx + 1).padStart(2, '0');
      numberEl.textContent = `[FACT #${numStr} / ${DASHA_FACTS.length}]`;
    }
    timerProgress = 0;
    if (timerFill) timerFill.style.width = '0%';
  }

  // Timer loop
  setInterval(() => {
    if (isPaused) return;
    timerProgress += tickStep;
    const pct = Math.min((timerProgress / quoteIntervalMs) * 100, 100);
    if (timerFill) timerFill.style.width = `${pct}%`;

    if (timerProgress >= quoteIntervalMs) {
      renderQuote(currentIdx + 1, true);
    }
  }, tickStep);

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      renderQuote(currentIdx + 1, true);
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      renderQuote(currentIdx - 1, true);
    });
  }

  if (btnPause && pauseIcon) {
    btnPause.addEventListener('click', () => {
      isPaused = !isPaused;
      if (isPaused) {
        pauseIcon.className = 'fa-solid fa-play';
        btnPause.title = 'Возобновить';
        showToast('Автоперелистывание фактов на паузе ⏸️');
      } else {
        pauseIcon.className = 'fa-solid fa-pause';
        btnPause.title = 'Пауза';
        showToast('Автоперелистывание включено ▶️');
      }
    });
  }

  // Pause on hover
  if (quoteBox) {
    quoteBox.addEventListener('mouseenter', () => { isPaused = true; });
    quoteBox.addEventListener('mouseleave', () => {
      if (pauseIcon && pauseIcon.className.includes('fa-pause')) {
        isPaused = false;
      }
    });
  }

  // Initial state
  renderQuote(0, false);
}

// --- Photo Slideshow Engine (13 Photos) ---
function setupGallerySlideshow() {
  const container = document.getElementById('slideshow-container');
  const stage = document.getElementById('slideshow-stage');
  const mainImg = document.getElementById('slide-main-img');
  const counterEl = document.getElementById('slide-counter');
  const tagEl = document.getElementById('slide-tag');
  const captionEl = document.getElementById('slide-caption');
  const btnPrev = document.getElementById('slide-prev-btn');
  const btnNext = document.getElementById('slide-next-btn');
  const progressFill = document.getElementById('slide-progress-fill');
  const playPauseBtn = document.getElementById('slideshow-play-pause');
  const pauseIcon = document.getElementById('slideshow-pause-icon');
  const playText = document.getElementById('slideshow-play-text');
  const fullscreenBtn = document.getElementById('slideshow-fullscreen-btn');
  const thumbnailsContainer = document.getElementById('slideshow-thumbnails');
  const activeWrapper = document.getElementById('slide-active-wrapper');

  if (!mainImg || !thumbnailsContainer) return;

  let currentSlide = 0;
  let isAutoplay = true;
  let isHovered = false;
  let slideProgress = 0;
  const slideDurationMs = 3800;
  const stepMs = 50;

  // Render thumbnails
  thumbnailsContainer.innerHTML = '';
  GALLERY_PHOTOS.forEach((photo, idx) => {
    const thumb = document.createElement('div');
    thumb.className = `thumb-item ${idx === 0 ? 'active' : ''}`;
    thumb.setAttribute('data-index', idx);
    thumb.title = photo.caption;
    thumb.innerHTML = `<img src="${photo.src}" alt="${photo.tag}" loading="lazy">`;
    thumb.addEventListener('click', () => {
      goToSlide(idx);
    });
    thumbnailsContainer.appendChild(thumb);
  });

  function goToSlide(idx) {
    currentSlide = (idx + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
    const photo = GALLERY_PHOTOS[currentSlide];

    mainImg.style.opacity = '0.3';
    setTimeout(() => {
      mainImg.src = photo.src;
      mainImg.alt = photo.caption;
      mainImg.style.opacity = '1';
    }, 120);

    const padIdx = String(currentSlide + 1).padStart(2, '0');
    if (counterEl) counterEl.textContent = `КАДР ${padIdx} / ${GALLERY_PHOTOS.length}`;
    if (tagEl) tagEl.textContent = photo.tag;
    if (captionEl) captionEl.textContent = photo.caption;

    // Highlight thumbnail (скроллим только контейнер миниатюр, НЕ трогая скролл страницы!)
    const allThumbs = thumbnailsContainer.querySelectorAll('.thumb-item');
    allThumbs.forEach((t, i) => {
      if (i === currentSlide) {
        t.classList.add('active');
        if (thumbnailsContainer) {
          const targetLeft = t.offsetLeft - (thumbnailsContainer.clientWidth / 2) + (t.clientWidth / 2);
          thumbnailsContainer.scrollTo({ left: targetLeft, behavior: 'smooth' });
        }
      } else {
        t.classList.remove('active');
      }
    });

    slideProgress = 0;
    if (progressFill) progressFill.style.width = '0%';
  }

  // Автопролистывание галереи только тогда, когда пользователь реально видит галерею на экране
  let isGalleryVisible = false;
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isGalleryVisible = entry.isIntersecting;
      });
    }, { threshold: 0.15 });
    const galSection = document.getElementById('gallery');
    if (galSection) observer.observe(galSection);
  } else {
    isGalleryVisible = true;
  }

  // Timer loop
  setInterval(() => {
    if (!isAutoplay || isHovered || !isGalleryVisible) return;
    slideProgress += stepMs;
    const pct = Math.min((slideProgress / slideDurationMs) * 100, 100);
    if (progressFill) progressFill.style.width = `${pct}%`;

    if (slideProgress >= slideDurationMs) {
      goToSlide(currentSlide + 1);
    }
  }, stepMs);

  if (btnNext) {
    btnNext.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(currentSlide + 1);
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(currentSlide - 1);
    });
  }

  if (stage) {
    stage.addEventListener('mouseenter', () => { isHovered = true; });
    stage.addEventListener('mouseleave', () => { isHovered = false; });
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      isAutoplay = !isAutoplay;
      if (isAutoplay) {
        if (pauseIcon) pauseIcon.className = 'fa-solid fa-pause';
        if (playText) playText.textContent = 'Автопросмотр';
        showToast('Слайд-шоу запущено ▶️');
      } else {
        if (pauseIcon) pauseIcon.className = 'fa-solid fa-play';
        if (playText) playText.textContent = 'Продолжить';
        if (progressFill) progressFill.style.width = '0%';
        showToast('Слайд-шоу на паузе ⏸️');
      }
    });
  }

  // Open Lightbox on slide click or fullscreen button
  function openCurrentInLightbox() {
    const photo = GALLERY_PHOTOS[currentSlide];
    const modal = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    if (modal && img && caption) {
      img.src = photo.src;
      caption.textContent = photo.caption;
      modal.classList.add('show');
    }
  }

  if (activeWrapper) {
    activeWrapper.addEventListener('click', openCurrentInLightbox);
  }

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openCurrentInLightbox();
    });
  }

  // Initial call
  goToSlide(0);
}

// --- Lightbox for Photos ---
function setupLightbox() {
  const modal = document.getElementById('lightbox');
  const close = document.getElementById('lightbox-close');
  const overlay = document.getElementById('lightbox-overlay');

  if (!modal) return;

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

// --- Disclaimer & 16-Song Music Player ---
function setupDisclaimerAndMusic() {
  const modal = document.getElementById('disclaimer-modal');
  const enterBtn = document.getElementById('disclaimer-enter-btn');
  const skipBtn = document.getElementById('disclaimer-skip-btn');
  const sfxBtn = document.getElementById('sfx-toggle');
  const bgAudio = document.getElementById('bg-audio');
  const floatingBar = document.getElementById('music-floating-bar');
  const floatingPlayBtn = document.getElementById('floating-play-btn');
  const floatingTrackTitle = document.getElementById('floating-track-title');
  const floatingCircleIcon = document.getElementById('floating-circle-icon');
  const floatingCollapseBtn = document.getElementById('floating-collapse-btn');
  const floatingMeta = document.getElementById('floating-meta');
  const soundWaveBars = document.getElementById('sound-wave-bars');
  const sitePlayBtn = document.getElementById('site-play-btn');
  const btnPrevTrack = document.getElementById('player-prev-btn');
  const btnNextTrack = document.getElementById('player-next-btn');
  const playerVinyl = document.getElementById('player-vinyl');
  const trackCounter = document.getElementById('player-track-counter');
  const trackTitle = document.getElementById('site-track-title');
  const trackArtist = document.getElementById('site-track-artist');
  const trackListContainer = document.getElementById('playlist-track-list');
  const seekBar = document.getElementById('music-seek-bar');
  const currentTimeLabel = document.getElementById('current-time');
  const totalDurationLabel = document.getElementById('total-duration');
  const volumeSlider = document.getElementById('volume-slider');
  const muteBtn = document.getElementById('mute-btn');

  let currentTrackIdx = 0;
  let isPlaying = false;
  let collapseTimer = null;

  function collapseFloatingPlayer() {
    if (!floatingBar) return;
    floatingBar.classList.add('collapsed');
    floatingBar.title = 'Развернуть плеер';
    if (collapseTimer) clearTimeout(collapseTimer);
  }

  function expandFloatingPlayer(autoCollapseDelay = 0) {
    if (!floatingBar) return;
    floatingBar.classList.remove('collapsed');
    floatingBar.title = 'Свернуть в кружок';
    if (collapseTimer) clearTimeout(collapseTimer);
    if (autoCollapseDelay > 0) {
      collapseTimer = setTimeout(() => {
        collapseFloatingPlayer();
      }, autoCollapseDelay);
    }
  }

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  // Populate 16 Playlist Tracks
  if (trackListContainer) {
    trackListContainer.innerHTML = '';
    PLAYLIST_TRACKS.forEach((track, idx) => {
      const row = document.createElement('div');
      row.className = `track-row ${idx === 0 ? 'active' : ''}`;
      row.setAttribute('data-track-index', idx);
      const padNum = String(track.id).padStart(2, '0');
      row.innerHTML = `
        <span class="track-num">${padNum}</span>
        <span class="track-playing-icon"><i class="fa-solid fa-play"></i></span>
        <div class="track-info-cell">
          <div class="track-name-text">${track.title}</div>
          <div class="track-artist-text">${track.artist}</div>
        </div>
        <span class="track-dur-text">${track.duration}</span>
      `;
      row.addEventListener('click', () => {
        loadTrack(idx, true);
      });
      trackListContainer.appendChild(row);
    });
  }

  function setPlayingState(playing) {
    isPlaying = playing;
    if (playing) {
      if (floatingPlayBtn) floatingPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      if (sitePlayBtn) sitePlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      if (playerVinyl) playerVinyl.classList.add('spinning');
      if (soundWaveBars) soundWaveBars.classList.add('playing');
      if (floatingBar) floatingBar.classList.add('playing');
      if (floatingCircleIcon) floatingCircleIcon.innerHTML = '<i class="fa-solid fa-compact-disc"></i>';
      if (sfxBtn) {
        sfxBtn.classList.add('active');
        sfxBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      }
    } else {
      if (floatingPlayBtn) floatingPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      if (sitePlayBtn) sitePlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      if (playerVinyl) playerVinyl.classList.remove('spinning');
      if (soundWaveBars) soundWaveBars.classList.remove('playing');
      if (floatingBar) floatingBar.classList.remove('playing');
      if (floatingCircleIcon) floatingCircleIcon.innerHTML = '<i class="fa-solid fa-play"></i>';
      if (sfxBtn) {
        sfxBtn.classList.remove('active');
        sfxBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      }
    }

    // Update active row playing icon
    if (trackListContainer) {
      const rows = trackListContainer.querySelectorAll('.track-row');
      rows.forEach((r, idx) => {
        const icon = r.querySelector('.track-playing-icon i');
        if (icon) {
          if (idx === currentTrackIdx && playing) {
            icon.className = 'fa-solid fa-volume-high';
          } else if (idx === currentTrackIdx) {
            icon.className = 'fa-solid fa-pause';
          } else {
            icon.className = 'fa-solid fa-play';
          }
        }
      });
    }
  }

  function loadTrack(idx, autoPlay = true) {
    currentTrackIdx = (idx + PLAYLIST_TRACKS.length) % PLAYLIST_TRACKS.length;
    const track = PLAYLIST_TRACKS[currentTrackIdx];

    if (trackTitle) trackTitle.textContent = track.title;
    if (trackArtist) trackArtist.textContent = `${track.artist} • Плейлист Дашк`;
    if (trackCounter) trackCounter.textContent = `ТРЕК ${track.id} ИЗ 16 // САУНДТРЕК САЙТА`;
    if (floatingTrackTitle) {
      floatingTrackTitle.textContent = `${track.artist} — ${track.title}`;
      floatingTrackTitle.title = `${track.artist} — ${track.title}`;
    }
    if (totalDurationLabel) totalDurationLabel.textContent = track.duration;

    // Highlight row in list (скроллим только контейнер списка треков, НЕ дергая окно!)
    if (trackListContainer) {
      const rows = trackListContainer.querySelectorAll('.track-row');
      rows.forEach((r, i) => {
        if (i === currentTrackIdx) {
          r.classList.add('active');
          const targetTop = r.offsetTop - (trackListContainer.clientHeight / 2) + (r.clientHeight / 2);
          trackListContainer.scrollTo({ top: targetTop, behavior: 'smooth' });
        } else {
          r.classList.remove('active');
        }
      });
    }

    // Temporarily expand floating bar to show new track title, then collapse back
    if (floatingBar && !floatingBar.classList.contains('hidden')) {
      expandFloatingPlayer(4500);
    }

    if (bgAudio) {
      const wasPlaying = isPlaying || autoPlay;
      bgAudio.src = track.file;
      bgAudio.load();
      if (wasPlaying) {
        playMusic();
      }
    }
  }

  function playMusic() {
    if (!bgAudio) return;
    bgAudio.play().then(() => {
      setPlayingState(true);
      if (floatingBar) floatingBar.classList.remove('hidden');
    }).catch(err => {
      console.warn('Audio play prevented:', err);
    });
  }

  function pauseMusic() {
    if (!bgAudio) return;
    bgAudio.pause();
    setPlayingState(false);
  }

  function toggleMusic() {
    if (!bgAudio) return;
    if (bgAudio.paused) {
      playMusic();
      showToast('Музыка играет! 🎧');
    } else {
      pauseMusic();
      showToast('Музыка на паузе ⏸️');
    }
  }

  // Floating player collapse / expand interactions
  if (floatingBar) {
    floatingBar.addEventListener('click', (e) => {
      if (floatingBar.classList.contains('collapsed')) {
        e.stopPropagation();
        expandFloatingPlayer(0);
      }
    });
  }

  if (floatingCollapseBtn) {
    floatingCollapseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      collapseFloatingPlayer();
    });
  }

  if (floatingMeta) {
    floatingMeta.addEventListener('click', (e) => {
      e.stopPropagation();
      collapseFloatingPlayer();
    });
  }

  // Prev / Next track buttons
  if (btnPrevTrack) {
    btnPrevTrack.addEventListener('click', () => {
      loadTrack(currentTrackIdx - 1, true);
      showToast(`Предыдущий трек: ${PLAYLIST_TRACKS[currentTrackIdx].title} 🎵`);
    });
  }

  if (btnNextTrack) {
    btnNextTrack.addEventListener('click', () => {
      loadTrack(currentTrackIdx + 1, true);
      showToast(`Следующий трек: ${PLAYLIST_TRACKS[currentTrackIdx].title} 🎵`);
    });
  }

  // Auto-advance to next track on track end
  if (bgAudio) {
    bgAudio.addEventListener('ended', () => {
      loadTrack(currentTrackIdx + 1, true);
    });
  }

  // Dismiss disclaimer modal
  function dismissModal(startMusic, msg) {
    if (!modal) return;
    modal.classList.add('hide');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 450);

    shootConfetti(110, 130);

    if (startMusic) {
      playMusic();
      // Show expanded for 5s then fold into circle
      expandFloatingPlayer(5000);
    } else {
      if (floatingBar) {
        floatingBar.classList.remove('hidden');
        collapseFloatingPlayer();
      }
    }

    if (msg) showToast(msg);
  }

  if (enterBtn) {
    enterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      dismissModal(true, 'Саундтрек из твоего плейлиста играет прямо на сайте! 🎧✨');
    });
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      dismissModal(false, 'Добро пожаловать в спейс Дашк! ✨');
    });
  }

  // Control button listeners
  if (floatingPlayBtn) {
    floatingPlayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMusic();
    });
  }
  if (sitePlayBtn) {
    sitePlayBtn.addEventListener('click', toggleMusic);
  }
  if (sfxBtn) {
    sfxBtn.addEventListener('click', toggleMusic);
  }

  // Audio timeline and scrubber
  if (bgAudio) {
    bgAudio.addEventListener('timeupdate', () => {
      if (!bgAudio.duration) return;
      const progress = (bgAudio.currentTime / bgAudio.duration) * 100;
      if (seekBar && !seekBar.matches(':active')) {
        seekBar.value = progress;
      }
      if (currentTimeLabel) {
        currentTimeLabel.textContent = formatTime(bgAudio.currentTime);
      }
    });

    bgAudio.addEventListener('loadedmetadata', () => {
      if (totalDurationLabel) {
        totalDurationLabel.textContent = formatTime(bgAudio.duration);
      }
    });

    bgAudio.addEventListener('play', () => setPlayingState(true));
    bgAudio.addEventListener('pause', () => setPlayingState(false));

    if (seekBar) {
      seekBar.addEventListener('input', () => {
        if (!bgAudio.duration) return;
        const targetTime = (seekBar.value / 100) * bgAudio.duration;
        bgAudio.currentTime = targetTime;
        if (currentTimeLabel) currentTimeLabel.textContent = formatTime(targetTime);
      });
    }

    if (volumeSlider) {
      volumeSlider.addEventListener('input', () => {
        bgAudio.volume = parseFloat(volumeSlider.value);
        if (bgAudio.volume === 0) {
          if (muteBtn) muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        } else {
          if (muteBtn) muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        }
      });
    }

    if (muteBtn) {
      let prevVolume = 0.85;
      muteBtn.addEventListener('click', () => {
        if (bgAudio.volume > 0) {
          prevVolume = bgAudio.volume;
          bgAudio.volume = 0;
          if (volumeSlider) volumeSlider.value = 0;
          muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
          showToast('Звук выключен 🔇');
        } else {
          bgAudio.volume = prevVolume || 0.85;
          if (volumeSlider) volumeSlider.value = bgAudio.volume;
          muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
          showToast('Звук включен 🔊');
        }
      });
    }
  }

  // Load first track into UI without auto-playing yet
  loadTrack(0, false);
}

// --- Initialize Everything ---
document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  setupGiftBox();
  setupCake();
  setupQuotes();
  setupGallerySlideshow();
  setupLightbox();
  setupEasterEgg();
  setupDisclaimerAndMusic();

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
