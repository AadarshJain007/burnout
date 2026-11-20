function setWeapon(wKey) {
  if (!WEAPONS[wKey]) return;
  State.weapon = wKey;

  const iconEl = $('tool-icon') || $('cursor-tool');
  if (iconEl && WEAPONS[wKey].cursorSvg) {
    iconEl.innerHTML = WEAPONS[wKey].cursorSvg;
  }

  document.querySelectorAll('.tray-tool, .w-btn').forEach(btn => {
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
  }

  if (State.pts > State.highScore) {
    saveHighScore();
  }
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
      cursorTool.style.transform = `translate3d(${e.clientX - 32}px, ${e.clientY - 36}px, 0)`;
    } else {
      cursorTool.style.display = 'none';
    }
  }, { passive: true });

  setWeapon('hammer');

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

  window.addEventListener('wheel', e => {
    if (!State.running || State.paused) return;
    const weapons = ['hammer', 'bat', 'bomb'];
    const curIdx = weapons.indexOf(State.weapon);
    if (curIdx === -1) return;
    const nextIdx = e.deltaY > 0 ? (curIdx + 1) % weapons.length : (curIdx - 1 + weapons.length) % weapons.length;
    setWeapon(weapons[nextIdx]);
  }, { passive: true });

  document.querySelectorAll('.tray-tool, .w-btn').forEach(btn => {
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
    btnMute.onclick = function () {
      State.sound = !State.sound;
      this.textContent = State.sound ? '🔊' : '🔇';
    };
  }
}