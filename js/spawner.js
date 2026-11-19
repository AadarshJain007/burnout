function getNonOverlappingPosition(targetW, targetH) {
  const arenaEl = $('arena');
  const arenaW = arenaEl.clientWidth;
  const arenaH = arenaEl.clientHeight;
  const margin = 16;
  const maxX = Math.max(margin, arenaW - targetW - margin);
  const maxY = Math.max(margin, arenaH - targetH - margin - 30);
  
  const cards = arenaEl.querySelectorAll('.t, .powerup');
  const existing = [];
  for (let i = 0; i < cards.length; i++) {
    const el = cards[i];
    existing.push({
      x: parseFloat(el.style.left) || 0,
      y: parseFloat(el.style.top) || 0,
      w: el.classList.contains('boss') ? 250 : 175,
      h: el.classList.contains('boss') ? 190 : 140
    });
  }

  for (let attempt = 0; attempt < 15; attempt++) {
    const candX = margin + Math.random() * (maxX - margin);
    const candY = margin + 10 + Math.random() * (maxY - margin);
    
    let overlaps = false;
    for (let j = 0; j < existing.length; j++) {
      const other = existing[j];
      if (
        candX < other.x + other.w + 12 &&
        candX + targetW + 12 > other.x &&
        candY < other.y + other.h + 12 &&
        candY + targetH + 12 > other.y
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

  const tw = isBoss ? 250 : 175;
  const th = isBoss ? 190 : 140;
  const pos = getNonOverlappingPosition(tw, th);

  const objClass = data.obj ? ` obj-${data.obj}` : ' obj-folder';
  const t = document.createElement('div');
  t.className = 't' + (isBoss ? ' boss' : '') + (data.type ? ` type-${data.type}` : '') + objClass;
  t.style.left = pos.x + 'px';
  t.style.top = pos.y + 'px';
  
  const rot = (Math.random() * 8 - 4).toFixed(1);
  t.style.setProperty('--rot', rot + 'deg');

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

  const iconMarkup = (data.iconKey && typeof ICONS !== 'undefined' && ICONS[data.iconKey]) ? ICONS[data.iconKey] : (data.icon || '📄');
  t.innerHTML = `
    <div class="t-icon">${iconMarkup}</div>
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
    
    const pos = getNonOverlappingPosition(175, 140);
    t.style.transition = 'left 0.18s ease-out, top 0.18s ease-out';
    t.style.left = pos.x + 'px';
    t.style.top = pos.y + 'px';
    spawnComicWord(pos.x + 80, pos.y, 'DODGED!');
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
      fillEl.style.background = '#dc2626';
    } else if (pct <= 60) {
      fillEl.style.background = '#d97706';
    } else {
      fillEl.style.background = '#dc2626';
    }
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
    { type: 'bomb', iconHtml: '<svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="14" cy="18" r="9"/><path d="M20 11l3-3"/></svg>', label: '+2 BOMBS' },
    { type: 'chai', iconHtml: '<svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 10h16v12a4 4 0 01-4 4H10a4 4 0 01-4-4V10zm16 3h3a2 2 0 012 2v2a2 2 0 01-2 2h-3M10 4v3M14 4v3M18 4v3"/></svg>', label: 'COFFEE RUSH' },
    { type: 'peace', iconHtml: '<svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M16 4v24M4 16h24M8 8l16 16M24 8L8 24"/></svg>', label: '+30 SANITY' },
    { type: 'wipe', iconHtml: '<svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 6l20 20M26 6L6 26"/></svg>', label: 'CANCELLATION' }
  ];
  const item = types[Math.floor(Math.random() * types.length)];
  
  const p = document.createElement('div');
  p.className = `powerup powerup-${item.type}`;
  p.innerHTML = item.iconHtml;
  p.style.left = (x - 25) + 'px';
  p.style.top = (y - 25) + 'px';
  
  p.addEventListener('pointerdown', e => {
    e.stopPropagation();
    audio.playPowerup();
    applyPowerupEffect(item.type, item.label);
    p.remove();
  });

  arenaEl.appendChild(p);
  setTimeout(() => { if (p.parentNode) p.remove(); }, 6000);
}

function applyPowerupEffect(type, label) {
  const arenaEl = $('arena');
  spawnComicWord(arenaEl.clientWidth / 2, arenaEl.clientHeight / 2, label);
  
  if (type === 'bomb') {
    State.bombs += 2;
    updateBombHud();
  } else if (type === 'chai') {
    activateRageMode(5000);
  } else if (type === 'peace') {
    updateSanity(30);
  } else if (type === 'wipe') {
    const targets = arenaEl.querySelectorAll('.t:not(.boss)');
    targets.forEach(t => {
      const tx = parseFloat(t.style.left) || 0;
      const ty = parseFloat(t.style.top) || 0;
      destroyEnemy(t, tx, ty);
    });
  }
}

function escapeHTML(str) {
  return String(str).replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}