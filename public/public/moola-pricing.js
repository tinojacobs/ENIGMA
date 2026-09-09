// ==============================================
// ✅ ENIGMA Moola — Official Pricing & Packages
// Matches Mxit nostalgia + Global Rates
// ==============================================

(function () {
  'use strict';

  // === SOUTH AFRICA 🇿🇦 ===
  const ZAR_PACKAGES = [
    { moola: 200, price: 20, label: 'Starter' },
    { moola: 300, price: 30, label: 'Chatter' },
    { moola: 500, price: 50, label: 'Social' },
    { moola: 1000, price: 100, label: 'Connector' },
    { moola: 2000, price: 200, label: 'Super' },
    { moola: 5000, price: 500, label: 'Global' }
  ];

  // === INTERNATIONAL 🌍 ===
  const USD_PACKAGES = [
    { moola: 200, price: 1.10, label: 'Starter' },
    { moola: 500, price: 2.75, label: 'Social' },
    { moola: 1000, price: 5.50, label: 'Connector' },
    { moola: 2000, price: 11.00, label: 'Super' }
  ];

  // === CHATROOM ENTRY FEES ===
  const ROOM_FEES = {
    local: { moola: 5, label: 'Local' },
    national: { moola: 10, label: 'South Africa' },
    international: { moola: 15, label: 'Cross-Border' },
    vip: { moola: 30, label: 'VIP Lounge' }
  };

  // === PREMIUM PASSES ===
  const PASSES = [
    { days: 1, moola: 30, label: '1 Day' },
    { days: 7, moola: 150, label: '7 Days' },
    { days: 30, moola: 500, label: '30 Days' },
    { days: 365, moola: 5000, label: '1 Year — Best Value!' }
  ];

  // === FEATURE PRICES ===
  const FEATURES = {
    glowProfile: 100,        // 7 days
    whisper: 15,             // per message
    featuredListing: 50,     // per post
    crossBorderChat: 15,     // per session
    adReward: 50,            // per video watched
    bannerClick: 20          // per click
  };

  // === HELPER FUNCTIONS ===
  function getPackages(currency = 'ZAR') {
    return currency === 'ZAR' ? ZAR_PACKAGES : USD_PACKAGES;
  }

  function getRoomFee(roomType) {
    return ROOM_FEES[roomType]?.moola || 10;
  }

  function formatPrice(amount, currency = 'ZAR') {
    const symbol = currency === 'ZAR' ? 'R' : '$';
    return `${symbol}${amount.toFixed(2)}`;
  }

  // === EXPOSE GLOBALLY ===
  window.MoolaPricing = {
    ZAR_PACKAGES,
    USD_PACKAGES,
    ROOM_FEES,
    PASSES,
    FEATURES,
    getPackages,
    getRoomFee,
    formatPrice
  };

  console.log('💰 Moola Pricing — Loaded!');
})();
