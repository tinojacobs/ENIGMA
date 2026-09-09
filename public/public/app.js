/* ==========================================================
   🌟 ENIGMA — COSMIC ANIMATION ENGINE 💫
   Stars twinkle • Nebula drifts • Sun pulses • Galaxy glows
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  console.log('🌌 ENIGMA Galaxy Online — Welcome Home ✨');

  // ⭐ Extra dynamic stars that appear randomly
  const spaceBg = document.querySelector('.space-bg');
  if (spaceBg) {
    createExtraStars();
  }

  // 🔄 Smooth hover lift for gateway cards
  const cards = document.querySelectorAll('.gateway-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.04)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // 💫 Moola Sun gentle pulse sync
  syncSunPulse();
});

// ⭐ Create extra twinkling stars dynamically
function createExtraStars() {
  const container = document.querySelector('.space-bg');
  if (!container) return;

  for (let i = 0; i < 60; i++) {
    const star = document.createElement('div');
    star.style.cssText = `
      position: absolute;
      width: ${Math.random() * 2 + 1}px;
      height: ${Math.random() * 2 + 1}px;
      background: white;
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: ${Math.random() * 0.7 + 0.3};
      animation: starFlicker ${Math.random() * 5 + 3}s ease-in-out infinite;
      animation-delay: ${Math.random() * 3}s;
    `;
    container.appendChild(star);
  }

  // Inject flicker keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes starFlicker {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.3); }
    }
  `;
  document.head.appendChild(style);
}

// 💫 Sync Moola Sun glow with page visibility
function syncSunPulse() {
  const sunGlow = document.querySelector('.sun-glow');
  if (!sunGlow) return;

  // Gentle brightness variation
  let phase = 0;
  setInterval(() => {
    phase += 0.02;
    const brightness = 0.7 + Math.sin(phase) * 0.15;
    sunGlow.style.opacity = brightness;
  }, 50);
}

// 📱 Prevent zoom on double-tap — keep it smooth
let lastTouch = 0;
document.addEventListener('touchstart', e => {
  const now = Date.now();
  if (now - lastTouch <= 300) {
    e.preventDefault();
  }
  lastTouch = now;
}, { passive: false });
