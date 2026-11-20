const $ = id => document.getElementById(id);

function updateClutterHud() {
  const arenaEl = $('arena');
  if (!arenaEl) return;
  const count = arenaEl.querySelectorAll('.t:not(.boss)').length;
  const clutterEl = $('clutter-count');
  const tallyEl = $('clutter-tally');
  const warningEl = $('clutter-warning');
  const memoEl = $('sticky-memo');
  
  if (clutterEl) clutterEl.textContent = `${count}/7`;
  if (tallyEl) {
    let tallyStr = '';
    for (let i = 0; i < count; i++) {
      if ((i + 1) % 5 === 0) tallyStr += '<s>||||</s> ';
      else tallyStr += '|';
    }
    tallyEl.innerHTML = tallyStr || '-';
  }

  if (warningEl) {
    if (count >= 7) {
      const left = Math.max(0, 5 - (State.overflowTimer || 0));
      warningEl.textContent = `OVERFLOW IN ${left}s!`;
      warningEl.className = 'memo-status danger';
      if (memoEl) memoEl.classList.add('tremble');
    } else if (count >= 5) {
      warningEl.textContent = 'DESK CLUTTERED!';
      warningEl.className = 'memo-status danger';
      if (memoEl) memoEl.classList.add('tremble');
    } else {
      warningEl.textContent = count > 0 ? 'PAPERS PILING UP' : 'DESK CLEAR';
      warningEl.className = 'memo-status';
      if (memoEl) memoEl.classList.remove('tremble');
    }
  }
}

function startWave(num) {
  State.wave = num;
  State.waveEnemiesRemaining = 10 + num * 3;
  State.bossActive = false;
  
  const hudWave = $('hud-wave');
  if (hudWave) hudWave.textContent = num;

  const waveTitles = ['WAVE 1', 'WAVE 2', 'WAVE 3', 'WAVE 4', 'WAVE 5'];
  const waveDescs = [
    'INTERNAL ASSIGNMENTS',
    'MID-SEM EXAM CRISIS',
    'PRACTICAL LAB VIVA',
    'END-SEM MARATHON',
    'CAMPUS PLACEMENT WAR'
  ];
  const title = waveTitles[num - 1] || `SEM WAVE ${num}`;
  const desc = waveDescs[num - 1] || 'SMASH ALL CLUTTER';

  const banner = $('wave-announcer');
  if (banner) {
    $('wa-title').textContent = title;
    $('wa-desc').textContent = desc;
    banner.classList.add('active');
    audio.playBossAlert();

    setTimeout(() => {
      banner.classList.remove('active');
    }, 2200);
  }
}

function triggerBossEncounter() {
  State.bossActive = true;
  audio.playBossAlert();
  
  const bossData = BOSSES[Math.min(BOSSES.length - 1, State.wave - 1)];
  const bossEl = spawnEnemy(bossData, true);
  State.activeBossObj = bossEl;
  updateClutterHud();

  const banner = $('wave-announcer');
  if (banner) {
    $('wa-title').textContent = 'FACULTY INCOMING!';
    $('wa-desc').textContent = bossData.name;
    banner.classList.add('active');
    setTimeout(() => banner.classList.remove('active'), 2000);
  }
}

function handleBossDefeat() {
  State.bossActive = false;
  audio.playVictory();
  triggerScreenShake(12);
  updateClutterHud();

  if (State.wave >= 5) {
    triggerVictoryScreen();
    return;
  }

  setTimeout(() => {
    startWave(State.wave + 1);
  }, 1000);
}

function triggerVictoryScreen() {
  State.running = false;
  $('gameover-modal').classList.add('open');
  $('go-title').innerHTML = 'DEGREE CLEARED! <span>GRADUATED</span>';
  
  const goStamp = $('go-stamp');
  if (goStamp) {
    goStamp.textContent = 'PASSED';
    goStamp.className = 'folder-stamp-blue';
  }

  $('go-score').textContent = State.pts;
  $('go-wave').textContent = '5 (PASSED)';
  $('go-smashed').textContent = State.smashed;
  $('go-combo').textContent = `x${State.highestCombo}`;
  saveHighScore();
}

function triggerGameOver(reasonTitle) {
  State.running = false;
  clearInterval(State.spawnInterval);
  clearInterval(State.tickInterval);

  $('gameover-modal').classList.add('open');
  $('go-title').innerHTML = `${reasonTitle || 'DESK'} <span>OVERFLOW</span>`;
  
  const goStamp = $('go-stamp');
  if (goStamp) {
    goStamp.textContent = 'DE-BARRED';
    goStamp.className = 'folder-stamp-red';
  }

  $('go-score').textContent = State.pts;
  $('go-wave').textContent = State.wave;
  $('go-smashed').textContent = State.smashed;
  $('go-combo').textContent = `x${State.highestCombo}`;
  saveHighScore();
}

function startGame(mode = 'campaign') {
  audio.init();
  audio.ensureContext();
  const arenaEl = $('arena');
  
  State.running = true;
  State.paused = false;
  State.mode = mode;
  State.pts = 0;
  State.smashed = 0;
  State.overflowTimer = 0;
  State.rage = 0;
  State.combo = 0;
  State.bombs = 3;
  State.highestCombo = 0;
  
  $('hud-pts').textContent = '0';
  updateBombHud();
  
  arenaEl.querySelectorAll('.t, .powerup, .shard, .fl, .ring, .slash-fx').forEach(el => el.remove());
  const debris = $('debris-layer');
  if (debris) debris.innerHTML = '';
  document.querySelectorAll('.overlay').forEach(m => m.classList.remove('open'));
  
  startWave(1);

  for (let i = 0; i < 3; i++) {
    spawnRandomEnemy();
  }
  updateClutterHud();

  clearInterval(State.spawnInterval);
  State.spawnInterval = setInterval(() => {
    if (!State.running || State.paused) return;
    spawnRandomEnemy();
    updateClutterHud();
  }, 1900);

  clearInterval(State.tickInterval);
  State.tickInterval = setInterval(() => {
    if (!State.running || State.paused) return;
    
    const count = arenaEl.querySelectorAll('.t:not(.boss)').length;
    if (count >= 7) {
      State.overflowTimer = (State.overflowTimer || 0) + 1;
      updateClutterHud();
      if (State.overflowTimer >= 5) {
        triggerGameOver('DESK OVERFLOW');
        return;
      }
    } else {
      State.overflowTimer = 0;
    }

    arenaEl.querySelectorAll('.t.type-deadline').forEach(d => {
      let timeLeft = +(d.dataset.timer || 8) - 1;
      d.dataset.timer = timeLeft;
      
      const fill = d.querySelector('.timer-fill');
      if (fill) fill.style.width = Math.max(0, (timeLeft / 8) * 100) + '%';
      
      if (timeLeft <= 0) {
        const tx = parseFloat(d.style.left) || 0;
        const ty = parseFloat(d.style.top) || 0;
        spawnComicWord(tx + 80, ty + 60, 'DEADLINE MISSED! +2 PAPERS');
        triggerScreenShake(8);
        d.remove();
        spawnRandomEnemy();
        spawnRandomEnemy();
        updateClutterHud();
      }
    });
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  loadPersistedData();
  initUI();
});