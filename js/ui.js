let targetMouseX = -100, targetMouseY = -100;
let cursorRafId = null;
let quoteInterval = null;
let quoteIndex = 0;

function setWeapon(wKey) {
  if (!WEAPONS[wKey]) return;
  State.weapon = wKey;
  
  const iconEl = $('tool-icon') || $('cursor-tool');
  if (iconEl) iconEl.textContent = WEAPONS[wKey].icon;
  
  document.querySelectorAll('.w-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.w === wKey);
  });
}

function updateBombHud() {
  const hudBombs = $('hud-bombs');
  if (hudBombs) hudBombs.textContent = State.bombs;
}

function addPoints(n) {
  State.pts += n;
  const hudPts = $('hud-pts');
  if (hudPts) {
    hudPts.textContent = State.pts;
    const parentPill = hudPts.parentElement;
    if (parentPill) {
      parentPill.classList.remove('pop');
      void parentPill.offsetWidth;
      parentPill.classList.add('pop');
    }
  }

  const hudRank = $('hud-rank');
  if (hudRank && typeof RANKS !== 'undefined') {
    let currentRank = RANKS[0][1];
    for (const [thresh, title] of RANKS) {
      if (State.pts >= thresh) currentRank = title;
    }
    hudRank.textContent = currentRank;
  }

  if (State.pts > State.highScore) {
    saveHighScore();
  }
}

function rotateQuote() {
  const qBar = $('quote-bar');
  if (!qBar || !QUOTES || QUOTES.length === 0) return;
  quoteIndex = (quoteIndex + 1) % QUOTES.length;
  qBar.textContent = `"${QUOTES[quoteIndex]}"`;
}

function openModal(id) {
  document.querySelectorAll('.overlay').forEach(m => m.classList.remove('open'));
  const modal = $(id);
  if (modal) modal.classList.add('open');
}

function togglePause() {
  if (!State.running) return;
  State.paused = !State.paused;
  
  const pauseModal = $('pause-modal');
  if (State.paused) {
    if (pauseModal) pauseModal.classList.add('open');
  } else {
    if (pauseModal) pauseModal.classList.remove('open');
  }
}

function startCursorLoop() {
  const cursorTool = $('cursor-tool');
  if (!cursorTool) return;

  function updateCursor() {
    if (targetMouseX > 0) {
      const x = targetMouseX - 32;
      const y = targetMouseY - 36;
      cursorTool.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      cursorTool.style.setProperty('--cx', `${x}px`);
      cursorTool.style.setProperty('--cy', `${y}px`);
    }
    cursorRafId = requestAnimationFrame(updateCursor);
  }
  cursorRafId = requestAnimationFrame(updateCursor);
}

function initUI() {
  const arenaEl = $('arena');
  const cursorTool = $('cursor-tool');

  if (arenaEl) {
    arenaEl.addEventListener('pointerdown', e => {
      if (!State.running || State.paused) return;
      audio.ensureContext();
      
      const rect = arenaEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const target = e.target.closest('.t');
      handleAttack(target, x, y);
    });
  }

  window.addEventListener('pointermove', e => {
    if (e.pointerType === 'touch' || !cursorTool) return;
    const overArena = arenaEl && (e.target === arenaEl || arenaEl.contains(e.target));
    if (overArena) {
      cursorTool.style.display = 'block';
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    } else {
      cursorTool.style.display = 'none';
    }
  }, { passive: true });

  startCursorLoop();

  if (quoteInterval) clearInterval(quoteInterval);
  quoteInterval = setInterval(rotateQuote, 6000);

  window.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
    
    if (e.key === '1') setWeapon('hammer');
    else if (e.key === '2') setWeapon('bat');
    else if (e.key === '3') setWeapon('bomb');
    else if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') togglePause();
    else if (e.key === 'r' || e.key === 'R') {
      if (State.running) startGame('campaign');
    }
  });

  document.querySelectorAll('.w-btn').forEach(btn => {
    btn.addEventListener('click', () => setWeapon(btn.dataset.w));
  });

  const btnPause = $('btn-pause');
  if (btnPause) btnPause.onclick = togglePause;

  const btnResume = $('btn-resume');
  if (btnResume) btnResume.onclick = togglePause;

  const btnPauseRestart = $('btn-pause-restart');
  if (btnPauseRestart) btnPauseRestart.onclick = () => startGame('campaign');

  const btnPauseMenu = $('btn-pause-menu');
  if (btnPauseMenu) {
    btnPauseMenu.onclick = () => {
      State.running = false;
      const pauseModal = $('pause-modal');
      const introModal = $('intro-modal');
      if (pauseModal) pauseModal.classList.remove('open');
      if (introModal) introModal.classList.add('open');
    };
  }

  const btnStart = $('btn-start-game');
  if (btnStart) {
    btnStart.onclick = () => startGame('campaign');
  }

  const btnRestart = $('btn-restart');
  if (btnRestart) btnRestart.onclick = () => startGame('campaign');

  const btnGoMenu = $('btn-go-menu');
  if (btnGoMenu) {
    btnGoMenu.onclick = () => {
      $('gameover-modal').classList.remove('open');
      $('intro-modal').classList.add('open');
    };
  }

  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.overlay').classList.remove('open');
      if (!State.running) $('intro-modal').classList.add('open');
    });
  });

  const btnMute = $('btn-audio-mute');
  if (btnMute) {
    btnMute.onclick = function() {
      State.sound = !State.sound;
      this.textContent = State.sound ? '🔊' : '🔇';
    };
  }
}
