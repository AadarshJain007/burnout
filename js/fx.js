function triggerScreenShake(intensity = 5) {
  if (State.shakeFactor <= 0) return;
  const arenaEl = $('arena');
  if (!arenaEl) return;
  
  const cls = intensity <= 5 ? 'shake-sm' : (intensity <= 10 ? 'shake-md' : 'shake-lg');
  arenaEl.classList.remove('shake-sm', 'shake-md', 'shake-lg');
  requestAnimationFrame(() => {
    arenaEl.classList.add(cls);
  });
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

function spawnBurst(x, y, count = 12) {
  const arenaEl = $('arena');
  if (!arenaEl) return;
  
  const frag = document.createDocumentFragment();
  const shards = [];
  const limit = Math.min(count, 12);
  
  for (let i = 0; i < limit; i++) {
    const s = document.createElement('div');
    s.className = 'shard';
    s.style.left = x + 'px';
    s.style.top = y + 'px';
    
    const angle = (i / limit) * Math.PI * 2;
    const dist = 30 + Math.random() * 50;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist + 15;
    
    frag.appendChild(s);
    shards.push({ el: s, dx, dy });
  }
  
  arenaEl.appendChild(frag);
  
  requestAnimationFrame(() => {
    shards.forEach(item => {
      item.el.style.transition = 'transform 0.28s ease-out, opacity 0.28s ease-out';
      item.el.style.transform = `translate3d(${item.dx}px, ${item.dy}px, 0)`;
      item.el.style.opacity = '0';
    });
  });
  
  setTimeout(() => {
    shards.forEach(item => item.el.remove());
  }, 300);
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

function spawnSlashArc(x, y, weapon) {
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