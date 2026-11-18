function triggerScreenShake(intensity = 5) {
  if (State.shakeFactor <= 0) return;
  const arenaEl = $('arena');
  if (!arenaEl) return;
  
  arenaEl.classList.remove('shake-sm', 'shake-md', 'shake-lg');
  void arenaEl.offsetWidth;
  
  if (intensity <= 5) arenaEl.classList.add('shake-sm');
  else if (intensity <= 10) arenaEl.classList.add('shake-md');
  else arenaEl.classList.add('shake-lg');
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
  
  setTimeout(() => el.remove(), 650);
}

function spawnScorePopup(x, y, pts) {
  const arenaEl = $('arena');
  if (!arenaEl) return;
  
  const el = document.createElement('div');
  el.className = 'score-fl';
  el.textContent = `+${pts}`;
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  arenaEl.appendChild(el);
  
  setTimeout(() => el.remove(), 600);
}

function spawnDamagePopup(x, y, dmg) {
  const arenaEl = $('arena');
  if (!arenaEl) return;
  
  const el = document.createElement('div');
  el.className = 'dmg-fl';
  el.textContent = `-${dmg} HP`;
  el.style.left = (x - 24) + 'px';
  el.style.top = (y - 20) + 'px';
  arenaEl.appendChild(el);
  
  setTimeout(() => el.remove(), 550);
}

function spawnBurst(x, y, count = 14) {
  const arenaEl = $('arena');
  if (!arenaEl) return;
  
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'shard';
    s.style.left = x + 'px';
    s.style.top = y + 'px';
    
    const angle = Math.random() * Math.PI * 2;
    const dist = 40 + Math.random() * (count > 25 ? 180 : 110);
    arenaEl.appendChild(s);
    
    requestAnimationFrame(() => {
      s.style.transform = `translate3d(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist + 30}px, 0) rotate(${Math.random()*400 - 200}deg)`;
      s.style.opacity = '0';
    });
    setTimeout(() => s.remove(), 550);
  }
}

function spawnShockwaveRing(x, y) {
  const arenaEl = $('arena');
  if (!arenaEl) return;
  
  const ring = document.createElement('div');
  ring.className = 'ring';
  ring.style.left = x + 'px';
  ring.style.top = y + 'px';
  arenaEl.appendChild(ring);
  
  setTimeout(() => ring.remove(), 380);
}

function spawnSlashArc(x, y, weapon) {
  const arenaEl = $('arena');
  if (!arenaEl) return;
  
  const el = document.createElement('div');
  el.className = `slash-fx slash-${weapon}`;
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  arenaEl.appendChild(el);
  
  setTimeout(() => el.remove(), 180);
}

function spawnImpactPuff(x, y) {
  const arenaEl = $('arena');
  if (!arenaEl) return;
  const puff = document.createElement('div');
  puff.className = 'impact-puff';
  puff.style.left = x + 'px';
  puff.style.top = y + 'px';
  arenaEl.appendChild(puff);
  setTimeout(() => puff.remove(), 320);
}

function animateCursorSwing() {
  const toolIcon = $('tool-icon') || $('cursor-tool');
  if (!toolIcon) return;
  
  toolIcon.classList.remove('swing-hammer', 'swing-bat', 'throw-bomb');
  void toolIcon.offsetWidth;
  
  if (State.weapon === 'hammer') toolIcon.classList.add('swing-hammer');
  else if (State.weapon === 'bat') toolIcon.classList.add('swing-bat');
  else toolIcon.classList.add('throw-bomb');
}
