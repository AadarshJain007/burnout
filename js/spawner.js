function getNonOverlappingPosition(targetW, targetH) {
  const arenaEl = $('arena');
  const arenaW = arenaEl.clientWidth;
  const arenaH = arenaEl.clientHeight;
  const margin = 16;
  const maxX = Math.max(margin, arenaW - targetW - margin);
  const maxY = Math.max(margin, arenaH - targetH - margin - 30);
  
  const existingCards = [...arenaEl.querySelectorAll('.t, .powerup')].map(el => {
    return {
      x: parseFloat(el.style.left) || 0,
      y: parseFloat(el.style.top) || 0,
      w: el.offsetWidth || targetW,
      h: el.offsetHeight || targetH
    };
  });

  for (let attempt = 0; attempt < 20; attempt++) {
    const candX = margin + Math.random() * (maxX - margin);
    const candY = margin + 10 + Math.random() * (maxY - margin);
    
    let overlaps = false;
    for (const other of existingCards) {
      if (
        candX < other.x + other.w + 14 &&
        candX + targetW + 14 > other.x &&
        candY < other.y + other.h + 14 &&
        candY + targetH + 14 > other.y
      ) {
        overlaps = true;
        break;
      }
    }
    if (!overlaps) {
      return { x: candX, y: candY };
    }
  }

  return {
    x: margin + Math.random() * (maxX - margin),
    y: margin + 10 + Math.random() * (maxY - margin)
  };
}

function spawnEnemy(data, isBoss = false) {
  if (!State.running || State.paused) return null;
  const arenaEl = $('arena');
  
  const currentCount = arenaEl.querySelectorAll('.t:not(.boss)').length;
  if (!isBoss && currentCount >= 7) return null;

  const tw = isBoss ? 250 : 170;
  const th = isBoss ? 190 : 130;
  const pos = getNonOverlappingPosition(tw, th);

  const objClass = data.obj ? ` obj-${data.obj}` : ' obj-folder';
  const t = document.createElement('div');
  t.className = 't' + (isBoss ? ' boss' : '') + (data.type ? ` type-${data.type}` : '') + objClass;
  t.style.left = pos.x + 'px';
  t.style.top = pos.y + 'px';
  
  const rot = (Math.random() * 8 - 4).toFixed(1);
  t.style.setProperty('--rot', rot + 'deg');
  t.style.animationDelay = '0s, -' + (Math.random() * 2.5).toFixed(2) + 's';

  t.dataset.hp = data.hp;
  t.dataset.max = data.hp;
  t.dataset.pts = data.pts || 150;
  t.dataset.name = data.name;
  t.dataset.type = data.type || 'standard';
  if (isBoss) t.dataset.isBoss = 'true';

  let timerHtml = '';
  if (data.type === 'deadline') {
    t.dataset.timer = data.timer || 8;
    timerHtml = '<div class="timer-bar"><div class="timer-fill"></div></div>';
  }

  t.innerHTML = `
    <div class="t-icon">${data.icon || '📄'}</div>
    <b>${escapeHTML(data.name)}</b>
    <small>${escapeHTML(data.sub || '')}</small>
    <div class="hp-bar-wrap">
      <div class="hp-header-row">
        <span class="hp-hearts-row"></span>
        <span class="hp-text">${data.hp} / ${data.hp} HP</span>
      </div>
      <div class="hp-track">
        <div class="hp-fill" style="width: 100%;"></div>
      </div>
      ${timerHtml}
    </div>
  `;

  paintHP(t);
  arenaEl.appendChild(t);
  
  if (data.type === 'dodger') {
    initDodgerBehavior(t);
  }

  return t;
}

function initDodgerBehavior(t) {
  let dodgeCooldown = 0;
  t.addEventListener('pointerenter', () => {
    const now = Date.now();
    if (now - dodgeCooldown < 650) return;
    dodgeCooldown = now;
    
    const pos = getNonOverlappingPosition(170, 130);
    t.style.transition = 'left 0.22s cubic-bezier(0.2, 0.9, 0.3, 1.2), top 0.22s';
    t.style.left = pos.x + 'px';
    t.style.top = pos.y + 'px';
    spawnComicWord(pos.x + 80, pos.y, 'DODGED! 💨');
  });
}

function paintHP(t) {
  const hp = Math.max(0, +t.dataset.hp);
  const max = Math.max(1, +t.dataset.max || hp);
  const isBoss = t.classList.contains('boss');
  const pct = Math.max(0, Math.min(100, Math.round((hp / max) * 100)));

  const textEl = t.querySelector('.hp-text');
  if (textEl) {
    textEl.textContent = isBoss ? `BOSS HP: ${hp} / ${max}` : `${hp} / ${max} HP`;
  }

  const fillEl = t.querySelector('.hp-fill');
  if (fillEl) {
    fillEl.style.width = pct + '%';
    if (pct <= 30) {
      fillEl.style.background = '#e74c3c';
    } else if (pct <= 60) {
      fillEl.style.background = '#f39c12';
    } else {
      fillEl.style.background = '#ff4757';
    }
  }

  const trackEl = t.querySelector('.hp-track');
  if (trackEl) {
    trackEl.classList.remove('hp-flash');
    void trackEl.offsetWidth;
    trackEl.classList.add('hp-flash');
  }

  const heartsRow = t.querySelector('.hp-hearts-row');
  if (heartsRow && !isBoss) {
    let pips = '';
    for (let i = 0; i < max; i++) {
      if (i < hp) {
        pips += '<span class="hp-pip">♥</span>';
      } else {
        pips += '<span class="hp-pip lost">♡</span>';
      }
    }
    heartsRow.innerHTML = pips;
  }
}

function spawnRandomEnemy() {
  if (State.bossActive) return;
  const chosen = ITEMS[Math.floor(Math.random() * ITEMS.length)];
  spawnEnemy(chosen);
}

function spawnPowerupDrop(x, y) {
  const arenaEl = $('arena');
  const types = [
    { type: 'bomb', icon: '💣', label: '+2 BOMBS' },
    { type: 'chai', icon: '☕', label: 'COFFEE RUSH' },
    { type: 'peace', icon: '🧘', label: '+30 SANITY' },
    { type: 'wipe', icon: '📜', label: 'CANCELLATION' }
  ];
  const item = types[Math.floor(Math.random() * types.length)];
  
  const p = document.createElement('div');
  p.className = 'powerup';
  p.style.left = Math.min(arenaEl.clientWidth - 70, Math.max(10, x - 32)) + 'px';
  p.style.top = Math.min(arenaEl.clientHeight - 80, Math.max(10, y - 32)) + 'px';
  p.innerHTML = `<span>${item.icon}</span><small>${item.label}</small>`;
  
  p.addEventListener('pointerdown', e => {
    e.stopPropagation();
    collectPowerup(item, p);
  });
  
  arenaEl.appendChild(p);
  setTimeout(() => { if (p.parentNode) p.remove(); }, 8000);
}

function collectPowerup(item, el) {
  const arenaEl = $('arena');
  audio.playPowerup();
  
  const rect = el.getBoundingClientRect();
  const arenaRect = arenaEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2 - arenaRect.left;
  const cy = rect.top + rect.height / 2 - arenaRect.top;
  
  spawnComicWord(cx, cy, item.label + '!');
  spawnBurst(cx, cy, 14);
  el.classList.add('collected');
  setTimeout(() => { if (el.parentNode) el.remove(); }, 200);
  
  if (item.type === 'bomb') {
    State.bombs += 2;
    updateBombHud();
  } else if (item.type === 'chai') {
    activateRageMode(4500);
  } else if (item.type === 'peace') {
    updateSanity(30);
  } else if (item.type === 'wipe') {
    const targets = arenaEl.querySelectorAll('.t:not(.boss)');
    targets.forEach(t => {
      const b = t.getBoundingClientRect();
      const tx = b.left + b.width / 2 - arenaRect.left;
      const ty = b.top + b.height / 2 - arenaRect.top;
      destroyEnemy(t, tx, ty);
    });
    triggerScreenShake(8);
  }
}
