// ==============================================
// ✅ ENIGMA Render — Canvas & Game Drawing
// ==============================================

const canvas = document.getElementById('canvas');
const ctx = canvas?.getContext('2d');

const COLORS = {
  bg: '#050512',
  grid: '#1a1a3a',
  primary: '#a855f7',
  accent: '#22d3ee',
  success: '#56ef83',
  danger: '#ef4444',
  text: '#e5e5e7'
};

function resizeCanvas(w, h) {
  if (!canvas) return;
  canvas.width = w || window.innerWidth;
  canvas.height = h || window.innerHeight;
}

function clearScreen() {
  if (!ctx) return;
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawText(text, x, y, size = 16, color = COLORS.text, align = 'center') {
  if (!ctx) return;
  ctx.font = `${size}px 'Segoe UI', sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
}

function drawGlowCircle(x, y, r, color = COLORS.primary) {
  if (!ctx) return;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.shadowBlur = 20;
  ctx.shadowColor = color;
  ctx.fill();
  ctx.shadowBlur = 0;
}

window.EnigmaRender = {
  resizeCanvas,
  clearScreen,
  drawText,
  drawGlowCircle,
  COLORS
};

console.log('🎨 Render Engine — Ready!');
