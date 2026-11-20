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
      w: el.classList.contains('boss') ? 260 : 190,
      h: el.classList.contains('boss') ? 200 : 165
    });
  }

  for (let attempt = 0; attempt < 15; attempt++) {
    const candX = margin + Math.random() * (maxX - margin);
    const candY = margin + 10 + Math.random() * (maxY - margin);
    
    let overlaps = false;
    for (let j = 0; j < existing.length; j++) {
      const other = existing[j];
      if (
        candX < other.x + other.w + 10 &&
        candX + targetW + 10 > other.x &&
        candY < other.y + other.h + 10 &&
        candY + targetH + 10 > other.y
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

  const tw = isBoss ? 255 : 190;
  const th = isBoss ? 195 : 165;
  const pos = getNonOverlappingPosition(tw, th);

  const paperClass = ` paper-${data.paperType || 'exam'}`;
  const t = document.createElement('div');
  t.className = 't' + (isBoss ? ' boss' : '') + (data.type ? ` type-${data.type}` : '') + paperClass;
  t.style.left = pos.x + 'px';
  t.style.top = pos.y + 'px';
  
  const rot = (Math.random() * 12 - 6).toFixed(1);
  t.style.setProperty('--rot', rot + 'deg');

  t.dataset.hp = data.hp;
  t.dataset.max = data.hp;
  t.dataset.pts = data.pts || 200;
  t.dataset.name = data.name;
  t.dataset.type = data.type || 'standard';
  if (isBoss) t.dataset.isBoss = 'true';

  let timerHtml = '';
  if (data.type === 'deadline') {
    t.dataset.timer = data.timer || 8;
    timerHtml = '<div class="timer-bar"><div class="timer-fill"></div></div>';
  }

  const doodleSvg = (data.doodle && typeof DOODLES !== 'undefined' && DOODLES[data.doodle]) ? DOODLES[data.doodle] : (DOODLES.warning || '');
  const stampText = data.stamp || (isBoss ? 'URGENT' : 'NOTICE');
  const examHeader = (data.paperType === 'exam' && !isBoss) ? '<div class="card-top-tag">END-SEM CODE: CS2026</div>' : '';

  t.innerHTML = `
    ${examHeader}
    <div class="card-top-row">
      <span class="card-stamp">${escapeHTML(stampText)}</span>
      <div class="card-doodle">${doodleSvg}</div>
    </div>
    <div class="card-name">${escapeHTML(data.name)}</div>
    <div class="card-sub">${escapeHTML(data.sub || '')}</div>
    <div class="card-hp-tally"></div>
    ${timerHtml}
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
    
    const pos = getNonOverlappingPosition(190, 165);
    t.style.transition = 'left 0.18s ease-out, top 0.18s ease-out';
    t.style.left = pos.x + 'px';
    t.style.top = pos.y + 'px';
    spawnComicWord(pos.x + 80, pos.y, 'PROXY DODGE!');
  });
}

function paintHP(t) {
  const hp = Math.max(0, +t.dataset.hp);
  const max = Math.max(1, +t.dataset.max || hp);
  const isBoss = t.classList.contains('boss');

  const tallyEl = t.querySelector('.card-hp-tally');
  if (tallyEl) {
    if (isBoss) {
      tallyEl.textContent = `VIVA HP: ${hp}`;
    } else {
      let marks = '';
      for (let i = 0; i < max; i++) {
        if (i < hp) {
          marks += '|';
        } else {
          marks += 'x';
        }
      }
      tallyEl.textContent = marks;
    }
  }

  if (hp < max && !t.querySelector('.card-damage-crack')) {
    const crack = document.createElement('div');
    crack.className = 'card-damage-crack';
    crack.textContent = '✕';
    t.appendChild(crack);
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
    { type: 'chai', iconHtml: '<svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M8 12 L10 26 L22 26 L24 12 Z" fill="#fed7aa"/><line x1="7" y1="12" x2="25" y2="12"/></svg>', label: 'CUTTING CHAI RUSH!' },
    { type: 'peace', iconHtml: '<svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="16" cy="16" r="10"/><line x1="16" y1="6" x2="16" y2="26"/><line x1="6" y1="16" x2="26" y2="16"/></svg>', label: '+30 SANITY' },
    { type: 'wipe', iconHtml: '<svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="#dc2626" stroke-width="2.6"><line x1="8" y1="8" x2="24" y2="24"/><line x1="24" y1="8" x2="8" y2="24"/></svg>', label: 'HOLIDAY ANNOUNCED!' }
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