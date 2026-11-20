function triggerScreenShake(intensity = 6) {
  if (State.shakeFactor <= 0) return;
  const arenaEl = $('arena');
  if (!arenaEl) return;
  
  let cls = 'shake-sm';
  if (intensity > 15) cls = 'shake-huge';
  else if (intensity > 9) cls = 'shake-lg';
  else if (intensity > 5) cls = 'shake-md';

  arenaEl.classList.remove('shake-sm', 'shake-md', 'shake-lg', 'shake-huge');
  requestAnimationFrame(() => {
    arenaEl.classList.add(cls);
  });
}

function spawnDeskDent(x, y) {
  const layer = $('debris-layer');
  if (!layer) return;
  const dent = document.createElement('div');
  dent.className = 'desk-dent';
  dent.style.left = x + 'px';
  dent.style.top = y + 'px';
  layer.appendChild(dent);
  setTimeout(() => {
    dent.style.opacity = '0';
    setTimeout(() => dent.remove(), 1000);
  }, 2500);
}

function spawnDeskScorch(x, y) {
  const layer = $('debris-layer');
  if (!layer) return;
  const scorch = document.createElement('div');
  scorch.className = 'desk-scorch';
  scorch.style.left = x + 'px';
  scorch.style.top = y + 'px';
  layer.appendChild(scorch);
  setTimeout(() => {
    scorch.style.opacity = '0';
    setTimeout(() => scorch.remove(), 1200);
  }, 3000);
}

function updateComboDisplay(combo) {
  const hud = $('combo-hud');
  const textEl = $('combo-text');
  if (!hud || !textEl) return;
  
  if (combo >= 2) {
    const titles = ['COMBO', 'CRUNCH!', 'POWER SMASH!', 'MAX COMBO!', 'TOPPER LEVEL!'];
    const label = titles[Math.min(titles.length - 1, Math.floor((combo - 2) / 2))];
    textEl.textContent = `${label} x${combo}`;
    hud.classList.add('active');
    textEl.style.animation = 'none';
    requestAnimationFrame(() => {
      textEl.style.animation = '';
    });
  } else {
    hud.classList.remove('active');
  }
}

function spawnComicWord(x, y, text) {
  const arenaEl = $('arena');
  if (!arenaEl) return;
  
  const el = document.createElement('div');
  el.className = 'fl';
  el.textContent = text;
  el.style.left = (x - 20) + 'px';
  el.style.top = (y - 15) + 'px';
  arenaEl.appendChild(el);
  
  setTimeout(() => el.remove(), 500);
}

function spawnScorePopup(x, y, pts) {
  const arenaEl = $('arena');
  if (!arenaEl) return;
  
  const el = document.createElement('div');
  el.className = 'fl';
  el.style.color = '#16a34a';
  el.textContent = `+${pts}`;
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  arenaEl.appendChild(el);
  
  setTimeout(() => el.remove(), 450);
}

function spawnDamagePopup(x, y, dmg) {
  const arenaEl = $('arena');
  if (!arenaEl) return;
  
  const el = document.createElement('div');
  el.className = 'fl';
  el.textContent = `-${dmg}`;
  el.style.left = (x - 24) + 'px';
  el.style.top = (y - 20) + 'px';
  arenaEl.appendChild(el);
  
  setTimeout(() => el.remove(), 450);
}

function spawnBurst(x, y, count = 14) {
  const arenaEl = $('arena');
  if (!arenaEl) return;
  
  const frag = document.createDocumentFragment();
  const shards = [];
  const limit = Math.min(count, 16);
  
  for (let i = 0; i < limit; i++) {
    const s = document.createElement('div');
    s.className = 'shard shard-scrap';
    s.style.left = x + 'px';
    s.style.top = y + 'px';
    
    const angle = (i / limit) * Math.PI * 2;
    const dist = 35 + Math.random() * 65;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist + 20;
    const rot = Math.random() * 360;
    
    frag.appendChild(s);
    shards.push({ el: s, dx, dy, rot });
  }
  
  arenaEl.appendChild(frag);
  
  requestAnimationFrame(() => {
    shards.forEach(item => {
      item.el.style.transition = 'transform 0.32s ease-out, opacity 0.32s ease-out';
      item.el.style.transform = `translate3d(${item.dx}px, ${item.dy}px, 0) rotate(${item.rot}deg)`;
      item.el.style.opacity = '0';
    });
  });
  
  setTimeout(() => {
    shards.forEach(item => item.el.remove());
  }, 350);
}

function spawnShockwaveRing(x, y) {
  const arenaEl = $('arena');
  if (!arenaEl) return;
  
  const ring = document.createElement('div');
  ring.className = 'ring';
  ring.style.left = x + 'px';
  ring.style.top = y + 'px';
  arenaEl.appendChild(ring);
  
  setTimeout(() => ring.remove(), 320);
}

function spawnSlashArc(x, y) {
  const arenaEl = $('arena');
  if (!arenaEl) return;
  
  const el = document.createElement('div');
  el.className = 'slash-fx';
  el.style.left = (x - 22) + 'px';
  el.style.top = (y - 22) + 'px';
  arenaEl.appendChild(el);
  
  setTimeout(() => el.remove(), 140);
}

function spawnImpactPuff(x, y) {
  spawnShockwaveRing(x, y);
}

function animateCursorSwing() {
  const cursorTool = $('cursor-tool');
  if (!cursorTool) return;
  const w = State.weapon;
  const cls = `swing-${w}`;
  cursorTool.classList.remove('swing-hammer', 'swing-bat', 'swing-bomb');
  cursorTool.classList.add(cls);
  setTimeout(() => cursorTool.classList.remove(cls), 150);
}