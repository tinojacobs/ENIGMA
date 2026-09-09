// ==============================================
// ✅ ENIGMA Driver Dashboard — Frontend Logic
// ==============================================

(function () {
  'use strict';

  const API_BASE = '/api';

  // --- State ---
  let isOnline = false;

  // --- Toggle Availability ---
  async function toggleAvailability() {
    const btn = document.getElementById('availabilityBtn');
    if (!btn) return;

    isOnline = !isOnline;
    btn.textContent = isOnline ? '🟢 Online — Accepting Rides' : '⚪ Offline';
    btn.style.background = isOnline ? 'linear-gradient(90deg, #22c55e, #16a34a)' : '#374151';
    
    console.log(`🚕 Driver ${isOnline ? 'ONLINE' : 'OFFLINE'}`);
  }

  // --- Load Profile ---
  async function loadDriverProfile() {
    try {
      const res = await fetch(`${API_BASE}/driver/profile`);
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      updateProfileUI(data);
    } catch (err) {
      console.log('ℹ️ Using demo profile');
      updateProfileUI({
        name: 'Demo Driver',
        rating: 5.0,
        totalTrips: 0,
        totalEarnings: 0
      });
    }
  }

  // --- Update UI ---
  function updateProfileUI(data) {
    const nameEl = document.getElementById('driverName');
    const ratingEl = document.getElementById('driverRating');
    const tripsEl = document.getElementById('totalTrips');
    const earningsEl = document.getElementById('totalEarnings');

    if (nameEl) nameEl.textContent = data.name || 'Driver';
    if (ratingEl) ratingEl.textContent = `⭐ ${data.rating || 5.0}`;
    if (tripsEl) tripsEl.textContent = data.totalTrips || 0;
    if (earningsEl) earningsEl.textContent = `R${(data.totalEarnings || 0).toFixed(2)}`;
  }

  // --- Expose ---
  window.Dashboard = {
    toggleAvailability,
    loadDriverProfile
  };

  // --- Init on Page Load ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadDriverProfile);
  } else {
    loadDriverProfile();
  }

  console.log('🚕 Driver Dashboard — Ready!');
})();
