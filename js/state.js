const State = {
  running: false,
  paused: false,
  mode: 'campaign',
  
  wave: 1,
  waveEnemiesRemaining: 12,
  bossActive: false,
  activeBossObj: null,
  
  pts: 0,
  smashed: 0,
  sanity: 100,
  rage: 0,
  rageActive: false,
  rageTimer: null,
  
  weapon: 'hammer',
  bombs: 3,
  combo: 0,
  lastHitTime: 0,
  lastSwingTime: 0,
  highestCombo: 0,
  
  sound: true,
  volume: 0.7,
  shakeFactor: 1,
  
  spawnInterval: null,
  sanityInterval: null,
  tickInterval: null,
  
  highScore: 0
};

function loadPersistedData() {
  try {
    State.highScore = +localStorage.getItem('srr_highscore') || 0;
  } catch (err) {
    console.warn('Could not read localStorage:', err);
  }
}

function saveHighScore() {
  if (State.pts > State.highScore) {
    State.highScore = State.pts;
    try {
      localStorage.setItem('srr_highscore', State.highScore);
    } catch (e) {}
  }
}

function escapeHTML(str) {
  const p = document.createElement('p');
  p.textContent = str;
  return p.innerHTML;
}
