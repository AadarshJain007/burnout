function triggerHitStop(ms = 30) {
  if (State.hitStop) return;
  State.hitStop = true;
  setTimeout(() => {
    State.hitStop = false;
  }, ms);
}

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
    spawnComicWord(x, y, 'OUT OF BOMBS!');
    return;
  }
  
  State.bombs--;
  updateBombHud();
  audio.playBomb();
  triggerScreenShake(10);
  spawnShockwaveRing(x, y);
  spawnBurst(x, y, 14);

  const flashEl = $('flash');
  if (flashEl) {
    flashEl.style.opacity = '0.35';
    setTimeout(() => { flashEl.style.opacity = '0'; }, 140);
  }

  const radius = WEAPONS.bomb.aoe;
  const targets = arenaEl.querySelectorAll('.t');

  targets.forEach(t => {
    const tx = (parseFloat(t.style.left) || 0) + 85;
    const ty = (parseFloat(t.style.top) || 0) + 70;
    const dist = Math.hypot(tx - x, ty - y);
    if (dist <= radius) {
      const dmg = State.rageActive ? WEAPONS.bomb.dmg * 2 : WEAPONS.bomb.dmg;
      applyDamage(t, dmg, tx, ty, true);
    }
  });
}

function applyDamage(t, baseDmg, x, y, fromExplosion = false) {
  const isBoss = t.classList.contains('boss');
  let dmg = State.rageActive ? baseDmg * 2 : baseDmg;
  
  if (t.classList.contains('type-shielded') && !t.dataset.shieldBroken) {
    t.dataset.shieldBroken = 'true';
    t.classList.remove('type-shielded');
    spawnComicWord(x, y, 'SHIELD CRACKED!');
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
  triggerHitStop(isBoss ? 45 : 25);
  spawnDamagePopup(x, y, dmg);

  if (!t.querySelector('.cr')) {
    const stamp = document.createElement('div');
    stamp.className = 'cr';
    stamp.textContent = '✕';
    t.appendChild(stamp);
    setTimeout(() => stamp.remove(), 220);
  }

  t.classList.remove('hit-recoil');
  requestAnimationFrame(() => t.classList.add('hit-recoil'));

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
  const curX = parseFloat(t.style.left) || 0;
  const curY = parseFloat(t.style.top) || 0;
  const cardCenterX = curX + 85;
  const cardCenterY = curY + 70;
  
  const dx = cardCenterX - hitX;
  const dy = cardCenterY - hitY;
  const len = Math.hypot(dx, dy) || 1;
  const pushDist = 120;
  
  let targetX = curX + (dx / len) * pushDist;
  let targetY = curY + (dy / len) * pushDist;
  
  const maxX = arenaEl.clientWidth - 180;
  const maxY = arenaEl.clientHeight - 150;
  let hitWall = false;

  if (targetX < 10) { targetX = 14; hitWall = true; }
  else if (targetX > maxX) { targetX = maxX - 6; hitWall = true; }
  
  if (targetY < 10) { targetY = 14; hitWall = true; }
  else if (targetY > maxY) { targetY = maxY - 6; hitWall = true; }
  
  t.style.transition = 'left 0.18s ease-out, top 0.18s ease-out';
  t.style.left = targetX + 'px';
  t.style.top = targetY + 'px';

  if (hitWall) {
    setTimeout(() => {
      triggerScreenShake(4);
      audio.playHammer();
      spawnComicWord(targetX, targetY, 'WALL SLAM!');
    }, 100);
  }
}

function destroyEnemy(t, x, y) {
  const isBoss = t.classList.contains('boss');
  const basePts = +t.dataset.pts || 150;
  
  audio.playHit();
  spawnImpactPuff(x, y);
  t.classList.add('dying');
  setTimeout(() => {
    if (t.parentNode) t.remove();
    if (typeof updateClutterHud === 'function') updateClutterHud();
  }, 160);
  State.smashed++;
  
  spawnBurst(x, y, isBoss ? 16 : 8);
  const words = ['SMASHED!', 'CRUSHED!', 'DONE!'];
  spawnComicWord(x, y, isBoss ? 'BOSS DOWN!' : words[Math.floor(Math.random() * words.length)]);

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
    spawnComicWord(x, y - 40, '+1 BOMB');
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
}

function getComboMultiplier() {
  return 1 + Math.floor(State.combo / 3);
}

function chargeRage(amount) {
  if (State.rageActive) return;
  State.rage = Math.min(100, State.rage + amount);
  if (State.rage >= 100) {
    activateRageMode(6000);
  }
}

function activateRageMode(duration = 6000) {
  if (State.rageActive) return;
  const arenaEl = $('arena');
  State.rageActive = true;
  
  audio.playBossAlert();
  spawnComicWord(arenaEl.clientWidth / 2, arenaEl.clientHeight / 2, 'RAGE MODE!');
  triggerScreenShake(10);

  clearTimeout(State.rageTimer);
  State.rageTimer = setTimeout(() => {
    State.rageActive = false;
    State.rage = 0;
  }, duration);
}

function updateSanity(delta) {
  State.sanity = Math.max(0, Math.min(100, State.sanity + delta));
  const fill = $('sanity-fill');
  if (fill) {
    fill.style.width = State.sanity + '%';
    if (State.sanity < 25) {
      fill.classList.add('low');
    } else {
      fill.classList.remove('low');
    }
  }

  if (State.sanity <= 0) {
    triggerGameOver('BURNOUT');
  }
}