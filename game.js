/**
 * Anti-Gravity Tajwid Challenge - Enjin Permainan & Kanvas Angkasa Lepas
 * Logik Interaktif, Fizik Kapal Angkasa, Sintesis Audio & Aliran Kursus Tajwid
 */

// ============================================================================
// 1. Sintesis Audio Web Audio API (Bebas Kebergantungan Luar)
// ============================================================================
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  playClick() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }

  playThruster() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // White noise buffer
      const bufferSize = this.ctx.sampleRate * 0.8;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(150, now);
      filter.frequency.exponentialRampToValueAtTime(800, now + 0.4);
      filter.Q.value = 3.0;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.8);
    } catch (e) {}
  }

  playCorrect() {
    if (this.isMuted || !this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + idx * 0.09;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.45);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.45);
      });
    } catch (e) {}
  }

  playIncorrect() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.4);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } catch (e) {}
  }

  playVictory() {
    if (this.isMuted || !this.ctx) return;
    try {
      const chord = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + idx * 0.12;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 1.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 1.2);
      });
    } catch (e) {}
  }
}

// ============================================================================
// 2. Kanvas Simulasi Angkasa, Graviti Lohong Hitam & Kapal Angkasa
// ============================================================================
class SpaceRenderer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.stars = [];
    this.particles = [];
    this.thrusterParticles = [];
    this.blackHoleRotation = 0;

    // Kedudukan Kapal Angkasa
    this.ship = {
      x: this.width / 2,
      y: this.height * 0.65,
      targetY: this.height * 0.65,
      vx: 0,
      vy: 0,
      shake: 0,
      tilt: 0,
      isBoosting: false,
      boostIntensity: 1,
      alertGlow: 0
    };

    this.initCanvas();
    this.createStars();
    window.addEventListener('resize', () => this.onResize());
  }

  initCanvas() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.initCanvas();
    this.ship.x = this.width / 2;
    this.createStars();
  }

  createStars() {
    this.stars = [];
    const numStars = Math.floor((this.width * this.height) / 3000);
    for (let i = 0; i < numStars; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.8 ? '#00f0ff' : (Math.random() > 0.6 ? '#d8b4fe' : '#ffffff'),
        alpha: Math.random() * 0.8 + 0.2
      });
    }
  }

  // Update Y kedudukan kapal berdasarkan altitud (0km = dekat lohong hitam, 500km = orbit tinggi)
  updateShipAltitude(altitudeKm) {
    // 0km -> Y berhampiran 82% skrin (Zon Ufuk Peristiwa)
    // 500km -> Y berhampiran 22% skrin (Orbit Selamat / Kelajuan Lepas)
    const clamped = Math.max(0, Math.min(500, altitudeKm));
    const fraction = clamped / 500;
    const targetY = (this.height * 0.82) - (fraction * (this.height * 0.60));
    this.ship.targetY = targetY;
  }

  boostThrusters() {
    this.ship.isBoosting = true;
    this.ship.boostIntensity = 3.5;
    this.ship.alertGlow = 0;
    // Tambah pancutan zarah plasma anti-graviti
    for (let i = 0; i < 40; i++) {
      this.thrusterParticles.push({
        x: this.ship.x + (Math.random() * 20 - 10),
        y: this.ship.y + 35,
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 8 + 4,
        size: Math.random() * 6 + 2,
        life: 1.0,
        decay: Math.random() * 0.04 + 0.02,
        color: Math.random() > 0.3 ? '#00f0ff' : '#0070f3'
      });
    }
  }

  triggerGravityAlarm() {
    this.ship.shake = 18;
    this.ship.alertGlow = 1.0;
    this.ship.isBoosting = false;
  }

  render() {
    this.ctx.fillStyle = '#030712';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // 1. Lukis Bintang & Parallax
    this.renderStars();

    // 2. Lukis Lohong Hitam (Black Hole) di bahagian bawah
    this.renderBlackHole();

    // 3. Kemas kini fizik & gegaran kapal angkasa
    this.updatePhysics();

    // 4. Lukis zarah tujahan plasma
    this.renderThrusters();

    // 5. Lukis Kapal Angkasa Vektor Sci-Fi
    this.renderSpaceship();

    requestAnimationFrame(() => this.render());
  }

  renderStars() {
    for (let star of this.stars) {
      star.y += star.speed;
      if (star.y > this.height) {
        star.y = 0;
        star.x = Math.random() * this.width;
      }

      this.ctx.fillStyle = star.color;
      this.ctx.globalAlpha = star.alpha;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.globalAlpha = 1.0;
  }

  renderBlackHole() {
    const bhX = this.width / 2;
    const bhY = this.height + 60; // Berada di dasar skrin
    const bhRadius = Math.min(this.width * 0.28, 260);

    this.blackHoleRotation += 0.015;

    // Cahaya Luaran Akresi (Accretion Disk Glow)
    const diskGrad = this.ctx.createRadialGradient(bhX, bhY, bhRadius * 0.5, bhX, bhY, bhRadius * 2.2);
    diskGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
    diskGrad.addColorStop(0.3, 'rgba(239, 71, 111, 0.45)');
    diskGrad.addColorStop(0.6, 'rgba(157, 78, 221, 0.35)');
    diskGrad.addColorStop(0.85, 'rgba(0, 240, 255, 0.15)');
    diskGrad.addColorStop(1, 'transparent');

    this.ctx.fillStyle = diskGrad;
    this.ctx.beginPath();
    this.ctx.arc(bhX, bhY, bhRadius * 2.2, 0, Math.PI * 2);
    this.ctx.fill();

    // Gelang Partikel Akresi Berpusing
    this.ctx.save();
    this.ctx.translate(bhX, bhY);
    this.ctx.rotate(this.blackHoleRotation);
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      this.ctx.strokeStyle = i % 2 === 0 ? 'rgba(0, 240, 255, 0.2)' : 'rgba(239, 71, 111, 0.25)';
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, bhRadius * 1.5, bhRadius * 0.5, angle, 0, Math.PI * 2);
      this.ctx.stroke();
    }
    this.ctx.restore();

    // Event Horizon (Sfera Gelap Menelan Cahaya)
    const horizonGrad = this.ctx.createRadialGradient(bhX, bhY, bhRadius * 0.2, bhX, bhY, bhRadius);
    horizonGrad.addColorStop(0, '#000000');
    horizonGrad.addColorStop(0.85, '#050508');
    horizonGrad.addColorStop(1, 'rgba(0, 240, 255, 0.4)');

    this.ctx.fillStyle = horizonGrad;
    this.ctx.beginPath();
    this.ctx.arc(bhX, bhY, bhRadius, 0, Math.PI * 2);
    this.ctx.fill();

    // Garis Ufuk Peristiwa (Event Horizon Ring)
    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(bhX, bhY, bhRadius, 0, Math.PI * 2);
    this.ctx.stroke();
  }

  updatePhysics() {
    // Lerp Y ke target Y
    this.ship.y += (this.ship.targetY - this.ship.y) * 0.08;

    // Mengurangkan gegaran perlahan-lahan
    if (this.ship.shake > 0) {
      this.ship.shake *= 0.88;
      if (this.ship.shake < 0.2) this.ship.shake = 0;
    }

    // Mengurangkan amaran merah
    if (this.ship.alertGlow > 0) {
      this.ship.alertGlow *= 0.94;
      if (this.ship.alertGlow < 0.05) this.ship.alertGlow = 0;
    }

    // Redakan boost
    if (this.ship.isBoosting) {
      this.ship.boostIntensity *= 0.96;
      if (this.ship.boostIntensity <= 1.05) {
        this.ship.isBoosting = false;
        this.ship.boostIntensity = 1;
      }
    }
  }

  renderThrusters() {
    // Kemas kini zarah plasma roket
    for (let i = this.thrusterParticles.length - 1; i >= 0; i--) {
      const p = this.thrusterParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.life <= 0) {
        this.thrusterParticles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.life;
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 12;
      this.ctx.shadowColor = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  renderSpaceship() {
    const shakeX = (Math.random() - 0.5) * this.ship.shake;
    const shakeY = (Math.random() - 0.5) * this.ship.shake;
    const x = this.ship.x + shakeX;
    const y = this.ship.y + shakeY;

    this.ctx.save();
    this.ctx.translate(x, y);

    // Amaran Merah jika ditarik ke bawah
    if (this.ship.alertGlow > 0) {
      this.ctx.strokeStyle = `rgba(239, 71, 111, ${this.ship.alertGlow})`;
      this.ctx.lineWidth = 4;
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = '#ef476f';
      this.ctx.beginPath();
      this.ctx.arc(0, 0, 48, 0, Math.PI * 2);
      this.ctx.stroke();
    }

    // Api Enjin Normal / Anti-Gravity Boost
    const flameHeight = this.ship.isBoosting ? 50 * this.ship.boostIntensity : 20 + Math.random() * 6;
    const flameGrad = this.ctx.createLinearGradient(0, 20, 0, 20 + flameHeight);
    if (this.ship.isBoosting) {
      flameGrad.addColorStop(0, '#ffffff');
      flameGrad.addColorStop(0.3, '#00f0ff');
      flameGrad.addColorStop(0.8, '#0070f3');
      flameGrad.addColorStop(1, 'transparent');
    } else {
      flameGrad.addColorStop(0, '#00f0ff');
      flameGrad.addColorStop(0.7, '#0070f3');
      flameGrad.addColorStop(1, 'transparent');
    }

    this.ctx.fillStyle = flameGrad;
    this.ctx.beginPath();
    this.ctx.moveTo(-10, 22);
    this.ctx.lineTo(10, 22);
    this.ctx.lineTo(0, 22 + flameHeight);
    this.ctx.closePath();
    this.ctx.fill();

    // Rangka Badan Kapal Angkasa (Sci-Fi Vector Interceptor)
    // Sayap Kiri & Kanan
    this.ctx.fillStyle = '#1e293b';
    this.ctx.strokeStyle = '#00f0ff';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(0, -32);
    this.ctx.lineTo(28, 16);
    this.ctx.lineTo(18, 24);
    this.ctx.lineTo(0, 18);
    this.ctx.lineTo(-18, 24);
    this.ctx.lineTo(-28, 16);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    // Badan Utama (Fuselage)
    const hullGrad = this.ctx.createLinearGradient(-12, 0, 12, 0);
    hullGrad.addColorStop(0, '#0f172a');
    hullGrad.addColorStop(0.5, '#334155');
    hullGrad.addColorStop(1, '#0f172a');
    this.ctx.fillStyle = hullGrad;
    this.ctx.beginPath();
    this.ctx.moveTo(0, -38);
    this.ctx.lineTo(12, 10);
    this.ctx.lineTo(6, 26);
    this.ctx.lineTo(-6, 26);
    this.ctx.lineTo(-12, 10);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    // Kokpit Bercahaya (Cyan Energy Canopy)
    this.ctx.fillStyle = '#00f0ff';
    this.ctx.shadowBlur = 12;
    this.ctx.shadowColor = '#00f0ff';
    this.ctx.beginPath();
    this.ctx.ellipse(0, -8, 5, 12, 0, 0, Math.PI * 2);
    this.ctx.fill();

    // Perisai Tenaga Halus (Subtle Energy Shield Aura)
    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.ellipse(0, -2, 38, 44, 0, 0, Math.PI * 2);
    this.ctx.stroke();

    this.ctx.restore();
  }
}

// ============================================================================
// 3. Pengurus Permainan Utama (State Machine & Tajwid Logic)
// ============================================================================
class AntiGravityTajwidGame {
  constructor() {
    this.sound = new SoundEffects();
    this.renderer = null;

    // Status Permainan
    this.altitude = 100; // Mula pada 100km
    this.targetAltitude = 500; // Sasaran Kelajuan Lepas
    this.score = 0;
    this.currentLevelIdx = 0;
    this.currentQuestionIdx = 0;
    this.correctStreak = 0;
    this.totalCorrect = 0;
    this.totalAnswered = 0;

    // Elemen DOM
    this.screenStart = document.getElementById('screen-start');
    this.screenGame = document.getElementById('screen-game');
    this.screenVictory = document.getElementById('screen-victory');
    this.screenGameOver = document.getElementById('screen-gameover');

    this.hudAltitudeVal = document.getElementById('hud-altitude');
    this.hudAltitudeFill = document.getElementById('altitude-bar-fill');
    this.hudScoreVal = document.getElementById('hud-score');
    this.hudGravityStatus = document.getElementById('gravity-status');
    this.hudAudioToggle = document.getElementById('btn-audio-toggle');
    this.hudArchiveBtn = document.getElementById('btn-open-archive');

    this.modalArchive = document.getElementById('modal-archive');
    this.archiveContent = document.getElementById('archive-content');
    this.modalCloseBtn = document.getElementById('btn-close-archive');

    // UI Soalan
    this.qLevelTag = document.getElementById('q-level-tag');
    this.qLevelName = document.getElementById('q-level-name');
    this.qCounter = document.getElementById('q-counter');
    this.verseArabic = document.getElementById('verse-arabic');
    this.verseRef = document.getElementById('verse-ref');
    this.qText = document.getElementById('question-text');
    this.optionsContainer = document.getElementById('options-container');

    // UI Maklum Balas
    this.feedbackBox = document.getElementById('feedback-box');
    this.feedbackTitle = document.getElementById('feedback-title');
    this.feedbackAltChange = document.getElementById('feedback-alt-change');
    this.feedbackExp = document.getElementById('feedback-explanation');
    this.btnNextQuestion = document.getElementById('btn-next-question');

    this.initEvents();
  }

  init() {
    this.renderer = new SpaceRenderer('space-canvas');
    this.renderer.render();
    this.renderArchiveModal();
    this.updateHUD();
  }

  initEvents() {
    // Butang Mula
    document.getElementById('btn-start-game').addEventListener('click', () => {
      this.sound.init();
      this.sound.playClick();
      this.startGame();
    });

    // Butang Audio Toggle
    this.hudAudioToggle.addEventListener('click', () => {
      this.sound.init();
      const isMuted = this.sound.toggleMute();
      this.hudAudioToggle.innerHTML = isMuted ? '🔇 Bunyi: Mati' : '🔊 Bunyi: Hidup';
    });

    // Arkib Modal
    this.hudArchiveBtn.addEventListener('click', () => {
      this.sound.playClick();
      this.modalArchive.classList.add('active');
    });

    this.modalCloseBtn.addEventListener('click', () => {
      this.sound.playClick();
      this.modalArchive.classList.remove('active');
    });

    // Butang Seterusnya
    this.btnNextQuestion.addEventListener('click', () => {
      this.sound.playClick();
      this.advanceQuestion();
    });

    // Butang Main Semula (Victory & GameOver)
    document.getElementById('btn-restart-victory').addEventListener('click', () => {
      this.sound.playClick();
      this.restartGame();
    });

    document.getElementById('btn-restart-gameover').addEventListener('click', () => {
      this.sound.playClick();
      this.restartGame();
    });

    // Pintasan Papan Kekunci (Pilihan 1-4, Enter untuk Seterusnya)
    window.addEventListener('keydown', (e) => {
      if (this.screenGame.classList.contains('active')) {
        if (!this.feedbackBox.classList.contains('active')) {
          if (['1', '2', '3', '4'].includes(e.key)) {
            const idx = parseInt(e.key, 10) - 1;
            const btns = this.optionsContainer.querySelectorAll('.option-btn');
            if (btns[idx] && !btns[idx].disabled) {
              btns[idx].click();
            }
          }
        } else if (e.key === 'Enter' || e.key === ' ') {
          this.advanceQuestion();
        }
      }
    });
  }

  showScreen(screenElem) {
    [this.screenStart, this.screenGame, this.screenVictory, this.screenGameOver].forEach(s => {
      s.classList.remove('active');
    });
    screenElem.classList.add('active');
  }

  startGame() {
    this.altitude = 100;
    this.score = 0;
    this.currentLevelIdx = 0;
    this.currentQuestionIdx = 0;
    this.correctStreak = 0;
    this.totalCorrect = 0;
    this.totalAnswered = 0;

    this.showScreen(this.screenGame);
    this.renderer.updateShipAltitude(this.altitude);
    this.updateHUD();
    this.loadQuestion();
  }

  restartGame() {
    this.startGame();
  }

  updateHUD() {
    this.hudAltitudeVal.textContent = `${this.altitude} km`;
    this.hudScoreVal.textContent = `${this.score}`;

    // Kemas kini pengisi bar altitud (0km - 500km)
    const pct = Math.max(0, Math.min(100, (this.altitude / this.targetAltitude) * 100));
    this.hudAltitudeFill.style.width = `${pct}%`;

    // Amaran Graviti jika altitud terlalu rendah
    if (this.altitude <= 50) {
      this.hudGravityStatus.className = 'gravity-indicator danger';
      this.hudGravityStatus.innerHTML = '⚠️ AMARAN GRAVITI EKSTREM';
    } else if (this.altitude >= 400) {
      this.hudGravityStatus.className = 'gravity-indicator';
      this.hudGravityStatus.style.borderColor = 'var(--neon-green)';
      this.hudGravityStatus.style.color = 'var(--neon-green)';
      this.hudGravityStatus.innerHTML = '🛡️ ORBIT KESELAMATAN DICAPAI';
    } else {
      this.hudGravityStatus.className = 'gravity-indicator';
      this.hudGravityStatus.style.borderColor = 'var(--neon-cyan)';
      this.hudGravityStatus.style.color = 'var(--neon-cyan)';
      this.hudGravityStatus.innerHTML = '🌌 SISTEM ANTI-GRAVITI STABIL';
    }
  }

loadQuestion() {
    const currentLevel = GAME_LEVELS[this.currentLevelIdx];
    const currentQ = currentLevel.questions[this.currentQuestionIdx];

    this.qLevelTag.textContent = `TAHAP ${currentLevel.level}`;
    this.qLevelName.textContent = currentLevel.title;
    this.qCounter.textContent = `Soalan ${this.currentQuestionIdx + 1} / ${currentLevel.questions.length}`;

    // Papar teks Arab dengan sorotan tajwid
    let formattedArabic = currentQ.verseArabic;
    if (currentQ.highlightWord) {
      // Sorot kalimah utama menggunakan tag <mark>
      formattedArabic = formattedArabic.replace(
        currentQ.highlightWord,
        `<mark>${currentQ.highlightWord}</mark>`
      );
    }
    this.verseArabic.innerHTML = formattedArabic;
    this.verseRef.textContent = `📖 ${currentQ.verseRef}`;
    this.qText.textContent = currentQ.questionText;

    // Sediakan Pilihan Jawapan
    this.optionsContainer.innerHTML = '';
    this.feedbackBox.classList.remove('active');

    const letters = ['A', 'B', 'C', 'D'];
    
    // 🛠️ KOD ADALAH LENGKAP: Memasukkan array [0, 1, 2, 3] untuk dikocok secara rawak
    const orders =;
    for (let i = orders.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [orders[i], orders[j]] = [orders[j], orders[i]];
    }

    currentQ.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      
      // Susun kedudukan butang secara rawak dkt skrin guna CSS order
      btn.style.order = orders[idx]; 
      
      btn.innerHTML = `
        <span class="option-letter">${letters[idx]}</span>
        <span class="option-text">${opt.text}</span>
      `;
      btn.addEventListener('click', () => this.handleAnswer(opt, btn, currentQ));
      this.optionsContainer.appendChild(btn);
    });
  }
      
      // Susun kedudukan butang secara rawak dkt skrin guna CSS order
      btn.style.order = orders[idx]; 
      
      btn.innerHTML = `
        <span class="option-letter">${letters[idx]}</span>
        <span class="option-text">${opt.text}</span>
      `;
      btn.addEventListener('click', () => this.handleAnswer(opt, btn, currentQ));
      this.optionsContainer.appendChild(btn);
    });
  }
      
      // Susun kedudukan butang secara rawak dkt skrin guna CSS order
      btn.style.order = orders[idx]; 
      
      btn.innerHTML = `
        <span class="option-letter">${letters[idx]}</span>
        <span class="option-text">${opt.text}</span>
      `;
      btn.addEventListener('click', () => this.handleAnswer(opt, btn, currentQ));
      this.optionsContainer.appendChild(btn);
    });
  }
    this.verseArabic.innerHTML = formattedArabic;
    this.verseRef.textContent = `📖 ${currentQ.verseRef}`;
    this.qText.textContent = currentQ.questionText;

    // Sediakan Pilihan Jawapan
    this.optionsContainer.innerHTML = '';
    this.feedbackBox.classList.remove('active');

    const letters = ['A', 'B', 'C', 'D'];
    currentQ.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `
        <span class="option-letter">${letters[idx]}</span>
        <span class="option-text">${opt.text}</span>
      `;
      btn.addEventListener('click', () => this.handleAnswer(opt, btn, currentQ));
      this.optionsContainer.appendChild(btn);
    });
  }

  handleAnswer(selectedOption, clickedBtn, question) {
    // Kunci semua butang pilihan
    const allBtns = this.optionsContainer.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);

    this.totalAnswered++;

    if (selectedOption.isCorrect) {
      // === JAWAPAN BETUL ===
      this.totalCorrect++;
      this.correctStreak++;
      clickedBtn.classList.add('correct');

      // Naikkan altitud (+100km)
      const altGain = 100;
      this.altitude += altGain;
      this.score += 250 + (this.correctStreak * 50);

      // Enjin Anti-Graviti Mengaum Naik
      this.sound.playCorrect();
      this.sound.playThruster();
      this.renderer.boostThrusters();
      this.renderer.updateShipAltitude(this.altitude);

      // Papar Maklum Balas Positif
      this.feedbackBox.className = 'feedback-box active status-correct';
      this.feedbackTitle.className = 'feedback-title correct';
      this.feedbackTitle.innerHTML = '🚀 TUJAHAN ANTI-GRAVITI DIAKTIFKAN!';
      this.feedbackAltChange.className = 'feedback-altitude-change up';
      this.feedbackAltChange.textContent = `+${altGain} km Altitud`;
      this.feedbackExp.innerHTML = `<strong>Huraian Tajwid:</strong> ${question.explanation}`;

    } else {
      // === JAWAPAN SALAH ===
      this.correctStreak = 0;
      clickedBtn.classList.add('incorrect');

      // Tandakan juga jawapan yang betul untuk pembelajaran
      question.options.forEach((opt, idx) => {
        if (opt.isCorrect) {
          allBtns[idx].classList.add('correct');
        }
      });

      // Turunkan altitud (-50km)
      const altLoss = 50;
      this.altitude = Math.max(0, this.altitude - altLoss);

      // Gegaran dan Amaran Graviti Lohong Hitam
      this.sound.playIncorrect();
      this.renderer.triggerGravityAlarm();
      this.renderer.updateShipAltitude(this.altitude);

      // Papar Maklum Balas Pembetulan
      this.feedbackBox.className = 'feedback-box active status-incorrect';
      this.feedbackTitle.className = 'feedback-title incorrect';
      this.feedbackTitle.innerHTML = '⚠️ AMARAN! TARIKAN GRAVITI BERTAMBAH!';
      this.feedbackAltChange.className = 'feedback-altitude-change down';
      this.feedbackAltChange.textContent = `-${altLoss} km Altitud`;
      this.feedbackExp.innerHTML = `<strong>Jawapan Tepat & Nota:</strong> ${question.explanation}`;
    }

    this.updateHUD();

    // Semak sekiranya Kapal Terperangkap di Ufuk Peristiwa (Game Over)
    if (this.altitude <= 0) {
      setTimeout(() => {
        this.triggerGameOver();
      }, 1400);
      return;
    }

    // Semak sekiranya sudah mencapai kelajuan lepas keselamatan (>= 500km)
    if (this.altitude >= this.targetAltitude) {
      setTimeout(() => {
        this.triggerVictory();
      }, 1500);
      return;
    }
  }

  advanceQuestion() {
    const currentLevel = GAME_LEVELS[this.currentLevelIdx];
    this.currentQuestionIdx++;

    // Jika tamat soalan dalam tahap semasa, beralih ke tahap seterusnya
    if (this.currentQuestionIdx >= currentLevel.questions.length) {
      this.currentLevelIdx++;
      this.currentQuestionIdx = 0;

      // Sekiranya semua tahap telah dihabiskan
      if (this.currentLevelIdx >= GAME_LEVELS.length) {
        this.triggerVictory();
        return;
      }
    }

    this.loadQuestion();
  }

  triggerVictory() {
    this.sound.playVictory();
    this.showScreen(this.screenVictory);

    document.getElementById('vic-altitude').textContent = `${this.altitude} km`;
    document.getElementById('vic-score').textContent = `${this.score}`;
    const acc = Math.round((this.totalCorrect / Math.max(1, this.totalAnswered)) * 100);
    document.getElementById('vic-accuracy').textContent = `${acc}%`;
  }

  triggerGameOver() {
    this.sound.playIncorrect();
    this.showScreen(this.screenGameOver);

    document.getElementById('over-score').textContent = `${this.score}`;
    document.getElementById('over-level').textContent = `Tahap ${this.currentLevelIdx + 1}: ${GAME_LEVELS[this.currentLevelIdx].title}`;
  }

  renderArchiveModal() {
    this.archiveContent.innerHTML = '';
    TAJWID_ARCHIVE.forEach(item => {
      const card = document.createElement('div');
      card.className = 'archive-card';
      card.innerHTML = `
        <h4>${item.title}</h4>
        <p class="archive-def"><strong>Definisi:</strong> ${item.definition}</p>
        <div class="archive-letters"><strong>Huruf Terlibat:</strong> ${item.letters ? item.letters.join(' | ') : item.mnemonic}</div>
        <div style="font-size: 13px; color: #cbd5e1; margin-bottom: 6px;"><strong>Contoh Tumpuan:</strong></div>
        <span class="archive-focus">${item.exampleFocus}</span>
        <p style="font-size: 12px; color: #94a3b8; margin-top: 8px;"><em>💡 Petua: ${item.tip}</em></p>
      `;
      this.archiveContent.appendChild(card);
    });
  }
}

// Inisialisasi Apabila DOM Siap
document.addEventListener('DOMContentLoaded', () => {
  const game = new AntiGravityTajwidGame();
  game.init();
});
