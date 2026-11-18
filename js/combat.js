function handleAttack(target, x, y) {
  const now = Date.now();
  const wConfig = WEAPONS[State.weapon];

  if (wConfig.cd && now - State.lastSwingTime < wConfig.cd) return;
  State.lastSwingTime = now;

  animateCursorSwing();
  spawnSlashArc(x, y, State.weapon);

  if (State.weapon === 'bomb') {
    detonateBomb(x, y);
    return;
  }

  if (!target) {
    audio.playHammer();
    return;
  }

  applyDamage(target, wConfig.dmg, x, y);
}

function detonateBomb(x, y) {
  const arenaEl = $('arena');
  if (State.bombs <= 0) {
    spawnComicWord(x, y, 'OUT OF BOMBS! 💣');
    return;
  }
  
  State.bombs--;
  updateBombHud();
  audio.playBomb();
  triggerScreenShake(12);
  spawnShockwaveRing(x, y);
  spawnBurst(x, y, 35);

  const flashEl = $('flash');
  if (flashEl) {
    flashEl.style.opacity = '0.45';
    setTimeout(() => { flashEl.style.opacity = '0'; }, 180);
  }

  const arenaRect = arenaEl.getBoundingClientRect();
  const radius = WEAPONS.bomb.aoe;
  const targets = [...arenaEl.querySelectorAll('.t')];

  targets.forEach(t => {
    const b = t.getBoundingClientRect();
    const cx = b.left + b.width / 2 - arenaRect.left;
    const cy = b.top + b.height / 2 - arenaRect.top;
    const dist = Math.hypot(cx - x, cy - y);
    if (dist <= radius) {
      const dmg = State.rageActive ? WEAPONS.bomb.dmg * 2 : WEAPONS.bomb.dmg;
      applyDamage(t, dmg, cx, cy, true);
    }
  });
}

function applyDamage(t, baseDmg, x, y, fromExplosion = false) {
  const isBoss = t.classList.contains('boss');
  let dmg = State.rageActive ? baseDmg * 2 : baseDmg;
  
  if (t.classList.contains('type-shielded') && !t.dataset.shieldBroken) {
    t.dataset.shieldBroken = 'true';
    t.classList.remove('type-shielded');
    spawnComicWord(x, y, 'SHIELD CRACKED! 🛡️');
    audio.playHammer();
    return;
  }

  if (State.weapon === 'bat' && !isBoss && !fromExplosion) {
    applyBatKnockback(t, x, y);
  }

  let hp = Math.max(0, +t.dataset.hp - dmg);
  t.dataset.hp = hp;
  
  if (State.weapon === 'bat') audio.playBat();
  else audio.playHammer();

  bumpCombo();
  chargeRage(isBoss ? 8 : 12);
  triggerScreenShake(isBoss ? 7 : 4);
  spawnDamagePopup(x, y, dmg);

  if (!t.querySelector('.cr')) {
    const stamp = document.createElement('div');
    stamp.className = 'cr';
    stamp.textContent = '✕';
    t.appendChild(stamp);
    setTimeout(() => stamp.remove(), 260);
  }

  t.classList.remove('hit');
  void t.offsetWidth;
  t.classList.add('hit');
  setTimeout(() => t.classList.remove('hit'), 220);

  paintHP(t);

  if (hp <= 0) {
    destroyEnemy(t, x, y);
  } else {
    addPoints(25 * getComboMultiplier());
    spawnScorePopup(x, y + 16, 25 * getComboMultiplier());
    
    if (isBoss) {
      const pos = getNonOverlappingPosition(250, 190);
      t.style.left = pos.x + 'px';
      t.style.top = pos.y + 'px';
    }
  }
}

function applyBatKnockback(t, hitX, hitY) {
  const arenaEl = $('arena');
  const arenaRect = arenaEl.getBoundingClientRect();
  const b = t.getBoundingClientRect();
  const curX = parseFloat(t.style.left) || 0;
  const curY = parseFloat(t.style.top) || 0;
  
  const dx = (b.left + b.width / 2 - arenaRect.left) - hitX;
  const dy = (b.top + b.height / 2 - arenaRect.top) - hitY;
  const len = Math.hypot(dx, dy) || 1;
  const pushDist = 80;
  
  const targetX = Math.min(arenaEl.clientWidth - 180, Math.max(10, curX + (dx / len) * pushDist));
  const targetY = Math.min(arenaEl.clientHeight - 140, Math.max(10, curY + (dy / len) * pushDist));

  t.style.transition = 'left 0.25s cubic-bezier(0.1, 0.9, 0.2, 1), top 0.25s';
  t.style.left = targetX + 'px';
  t.style.top = targetY + 'px';

  setTimeout(() => {
    arenaEl.querySelectorAll('.t:not(.boss)').forEach(other => {
      if (other !== t) {
        const ob = other.getBoundingClientRect();
        const tb = t.getBoundingClientRect();
        if (
          tb.left < ob.right && tb.right > ob.left &&
          tb.top < ob.bottom && tb.bottom > ob.top
        ) {
          spawnComicWord(targetX, targetY, 'COLLISION! 💥');
          applyDamage(other, 1, targetX, targetY, true);
        }
      }
    });
  }, 180);
}

function destroyEnemy(t, x, y) {
  const isBoss = t.classList.contains('boss');
  const basePts = +t.dataset.pts || 150;
  
  audio.playHit();
  spawnImpactPuff(x, y);
  t.classList.add('dying');
  setTimeout(() => { if (t.parentNode) t.remove(); }, 180);
  State.smashed++;
  
  spawnBurst(x, y, isBoss ? 45 : 18);
  const words = ['SMASHED!', 'CRUSHED!', 'DONE!'];
  spawnComicWord(x, y, isBoss ? 'BOSS DOWN! 🏆' : words[Math.floor(Math.random() * words.length)]);

  const earned = Math.round(basePts * getComboMultiplier() * (isBoss ? 2 : 1));
  addPoints(earned);
  spawnScorePopup(x, y, earned);

  updateSanity(isBoss ? 35 : 10);

  if (Math.random() < 0.22 || isBoss) {
    spawnPowerupDrop(x, y);
  }

  if (State.smashed % 6 === 0) {
    State.bombs++;
    updateBombHud();
    spawnComicWord(x, y - 40, '+1 BOMB 💣');
  }

  if (isBoss) {
    handleBossDefeat();
  } else {
    if (State.mode === 'campaign') {
      State.waveEnemiesRemaining--;
      if (State.waveEnemiesRemaining <= 0 && !State.bossActive) {
        triggerBossEncounter();
      }
    }
  }
}

function bumpCombo() {
  const now = Date.now();
  if (now - State.lastHitTime < 1400) {
    State.combo++;
  } else {
    State.combo = 1;
  }
  State.lastHitTime = now;

  if (State.combo > State.highestCombo) {
    State.highestCombo = State.combo;
  }

  const el = $('combo-pill');
  if (el) {
    if (State.combo >= 2) {
      el.classList.add('show');
      const comboCount = $('combo-count');
      if (comboCount) comboCount.textContent = `COMBO x${getComboMultiplier()}`;
      const comboSub = $('combo-sub');
      if (comboSub) comboSub.textContent = `${State.combo} HITS`;
      audio.playCombo(State.combo);
    } else {
      el.classList.remove('show');
    }
  }
}

function getComboMultiplier() {
  return 1 + Math.floor(State.combo / 3);
}

setInterval(() => {
  if (Date.now() - State.lastHitTime > 1400 && State.combo > 0) {
    State.combo = 0;
    const comboPill = $('combo-pill');
    if (comboPill) comboPill.classList.remove('show');
  }
}, 250);

function chargeRage(amount) {
  if (State.rageActive) return;
  State.rage = Math.min(100, State.rage + amount);
  const rageFill = $('rage-fill');
  if (rageFill) rageFill.style.width = State.rage + '%';
  
  if (State.rage >= 100) {
    activateRageMode(7000);
  }
}

function activateRageMode(duration = 7000) {
  if (State.rageActive) return;
  const arenaEl = $('arena');
  State.rageActive = true;
  document.body.classList.add('rage-active');
  
  audio.playBossAlert();
  spawnComicWord(arenaEl.clientWidth / 2, arenaEl.clientHeight / 2, '🔥 RAGE MODE! 🔥');
  triggerScreenShake(14);

  clearTimeout(State.rageTimer);
  State.rageTimer = setTimeout(() => {
    State.rageActive = false;
    State.rage = 0;
    const rageFill = $('rage-fill');
    if (rageFill) rageFill.style.width = '0%';
    document.body.classList.remove('rage-active');
  }, duration);
}

function updateSanity(delta) {
  State.sanity = Math.max(0, Math.min(100, State.sanity + delta));
  const fill = $('sanity-fill');
  if (fill) {
    fill.style.width = State.sanity + '%';
    if (delta < 0) {
      fill.classList.remove('sanity-damage');
      void fill.offsetWidth;
      fill.classList.add('sanity-damage');
    }
  }
  
  if (State.sanity < 25) {
    if (fill) fill.classList.add('low');
  } else {
    if (fill) fill.classList.remove('low');
  }

  if (State.sanity <= 0) {
    triggerGameOver('BURNOUT');
  }
}
