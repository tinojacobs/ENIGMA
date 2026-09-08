// ==============================================
// 💰 ENIGMA MOOLA PRICING — Global Currency & Top-Up Rates
// ==============================================

'use strict';

// ===== MOOLA TOP-UP PACKAGES =====
const moolaPricing = {
  packages: [
    { id: 'starter', moola: 500, priceZAR: 15, priceUSD: 0.85, bonus: 0 },
    { id: 'basic', moola: 1200, priceZAR: 35, priceUSD: 1.95, bonus: 50 },
    { id: 'popular', moola: 3000, priceZAR: 80, priceUSD: 4.50, bonus: 300 },
    { id: 'premium', moola: 8000, priceZAR: 199, priceUSD: 11.00, bonus: 1200 },
    { id: 'ultimate', moola: 25000, priceZAR: 499, priceUSD: 28.00, bonus: 5000 },
    { id: 'legend', moola: 100000, priceZAR: 999, priceUSD: 55.00, bonus: 25000 }
  ],

  // ===== SUBSCRIPTION PRICING =====
  subscriptions: {
    basic: { monthly: 0, yearly: 0 },
    gold: { monthly: 150, yearly: 1500, features: ['No Ads', 'Ghost Mode', 'HD Media'] },
    platinum: { monthly: 350, yearly: 3500, features: ['All Gold', 'Private Vault', 'Priority Support', 'Verified Badge'] },
    diamond: { monthly: 800, yearly: 8000, features: ['All Platinum', 'Auto-Translate', 'VIP Rooms', 'Custom Themes'] }
  },

  // ===== CURRENCY EXCHANGE RATES =====
  exchangeRates: {
    ZAR: 1,
    USD: 0.055,
    EUR: 0.052,
    GBP: 0.044,
    INR: 4.60,
    NGN: 85,
    BRL: 0.28
  },

  // ===== CASH-OUT RATES =====
  cashOut: {
    minMoola: 5000,
    feePercent: 5,
    ratesPerCurrency: {
      ZAR: 100,   // 100 Moola = R1
      USD: 1750,  // 1750 Moola = $1
      EUR: 1850,  // 1850 Moola = €1
      GBP: 2100   // 2100 Moola = £1
    }
  },

  // ===== FUNCTIONS =====
  getPackageById(id) {
    return this.packages.find(p => p.id === id) || null;
  },

  getPriceInCurrency(moolaAmount, currency = 'ZAR') {
    const rate = this.exchangeRates[currency] || 1;
    return moolaAmount * rate / 100;
  },

  convertMoolaToCurrency(moolaAmount, currency = 'ZAR') {
    const rate = this.cashOut.ratesPerCurrency[currency];
    if (!rate) return null;
    return moolaAmount / rate;
  },

  calculateCashOut(moolaAmount, currency = 'ZAR') {
    if (moolaAmount < this.cashOut.minMoola) return null;
    const fee = moolaAmount * (this.cashOut.feePercent / 100);
    const netMoola = moolaAmount - fee;
    const currencyAmount = this.convertMoolaToCurrency(netMoola, currency);
    return {
      grossMoola: moolaAmount,
      feeMoola: fee,
      netMoola: netMoola,
      currencyAmount: currencyAmount,
      currency: currency
    };
  }
};

module.exports = moolaPricing;
