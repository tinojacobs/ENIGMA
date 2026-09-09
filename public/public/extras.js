// ==============================================
// ✅ ENIGMA Extras — Earn • Upgrade • Stand Out
// ==============================================

(function () {
  'use strict';

  // --- Helper: Get Current User ---
  function getCurrentUser() {
    const saved = localStorage.getItem('enigma_user');
    return saved ? JSON.parse(saved) : null;
  }

  // --- Helper: Update Moola ---
  function updateMoola(amount, reason = '') {
    const user = getCurrentUser();
    if (!user) return { success: false, error: 'Log in first' };
    
    user.moola = (user.moola || 100) + amount;
    localStorage.setItem('enigma_user', JSON.stringify(user));
    
    // Update wallet display if on page
    const balanceEl = document.getElementById('balanceDisplay');
    if (balanceEl) balanceEl.textContent = user.moola.toLocaleString();
    
    console.log(`💰 ${reason}: ${amount} → Balance: ${user.moola}`);
    return { success: true, newBalance: user.moola };
  }

  // --- 1. Watch Ad → Earn Moola ---
  function watchAd(userId) {
    const reward = 50;
    const result = updateMoola(reward, 'Watched Video Ad');
    if (result.success) {
      alert(`🎉 Ad complete! You earned ${reward} Moola 💜`);
    }
    return result;
  }

  // --- 2. Click Banner → Earn Moola ---
  function clickAdBanner(userId) {
    const reward = 20;
    const result = updateMoola(reward, 'Clicked Ad Banner');
    if (result.success) {
      console.log(`✅ Banner click — +${reward} Moola`);
    }
    return result;
  }

  // --- 3. Activate Glow Profile (VIP) ---
  async function activateGlowProfile(userId) {
    const cost = 100;
    const user = getCurrentUser();
    
    if (!user) return { success: false, error: 'Log in first' };
    if ((user.moola || 0) < cost) {
      return { success: false, error: `Need ${cost} Moola — you have ${user.moola || 0}` };
    }
    
    user.moola -= cost;
    user.glowActive = true;
    user.glowExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    localStorage.setItem('enigma_user', JSON.stringify(user));
    
    alert(`✨ Glow Profile ACTIVATED! Shine bright for 7 days! 💜✨`);
    return { success: true, expires: user.glowExpires };
  }

  // --- 4. Send Whisper (Secret Message) ---
  async function sendWhisper(fromUserId, toUserName, message) {
    const cost = 15;
    const user = getCurrentUser();
    
    if (!user) return { success: false, error: 'Log in first' };
    if ((user.moola || 0) < cost) {
      return { success: false, error: `Need ${cost} Moola` };
    }
    
    user.moola -= cost;
    localStorage.setItem('enigma_user', JSON.stringify(user));
    
    console.log(`🤫 Whisper sent to ${toUserName}`);
    return { success: true, message: 'Whisper sent — only you two will see it 💜' };
  }

  // --- 5. Check VIP Status ---
  function isVipActive() {
    const user = getCurrentUser();
    if (!user || !user.glowActive) return false;
    return new Date(user.glowExpires) > new Date();
  }

  // --- Expose Globally ---
  window.extras = {
    watchAd,
    clickAdBanner,
    activateGlowProfile,
    sendWhisper,
    isVipActive
  };

  console.log('✨ ENIGMA Extras — Rewards & VIP Ready!');
})();
