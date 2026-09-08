// ==============================================
// 💰 ENIGMA REVENUE — Admin Financial Tracking & Logging
// ==============================================

'use strict';

const fs = require('fs');
const path = require('path');

// ===== REVENUE STORE =====
let dailyRevenue = {
  date: new Date().toISOString().split('T')[0],
  adViews: 0,
  adClicks: 0,
  marketplaceFees: 0,
  chatRevenue: 0,
  subscriptionRevenue: 0,
  cashOutFees: 0,
  rideCommission: 0,
  totalZAR: 0,
  totalUSD: 0
};

let totalRevenue = {
  lifetimeZAR: 0,
  totalTransactions: 0,
  since: new Date().toISOString()
};

// ===== HELPERS =====
function logTransaction(type, amountZAR, amountUSD = 0, details = {}) {
  dailyRevenue.totalZAR += amountZAR;
  dailyRevenue.totalUSD += amountUSD;
  totalRevenue.lifetimeZAR += amountZAR;
  totalRevenue.totalTransactions++;
  
  // Log to console
  console.log(`💰 REVENUE [${type}]: R${amountZAR.toFixed(2)} | $${amountUSD.toFixed(2)} — ${JSON.stringify(details)}`);
}

function resetDailyIfNewDay() {
  const today = new Date().toISOString().split('T')[0];
  if (dailyRevenue.date !== today) {
    dailyRevenue = {
      date: today,
      adViews: 0,
      adClicks: 0,
      marketplaceFees: 0,
      chatRevenue: 0,
      subscriptionRevenue: 0,
      cashOutFees: 0,
      rideCommission: 0,
      totalZAR: 0,
      totalUSD: 0
    };
    console.log('📊 Daily revenue reset — new day!');
  }
}

// ===== PUBLIC METHODS =====
const revenueTracker = {
  addAdView: function(count = 1) {
    resetDailyIfNewDay();
    dailyRevenue.adViews += count;
    const amountZAR = count * 0.01;
    logTransaction('adView', amountZAR, amountZAR * 0.055, { count });
  },

  addClick: function(count = 1) {
    resetDailyIfNewDay();
    dailyRevenue.adClicks += count;
    const amountZAR = count * 0.15;
    logTransaction('adClick', amountZAR, amountZAR * 0.055, { count });
  },

  addMarketplaceFee: function(amountZAR) {
    resetDailyIfNewDay();
    dailyRevenue.marketplaceFees += amountZAR;
    logTransaction('marketplaceFee', amountZAR, amountZAR * 0.055);
  },

  addChatRevenue: function(amountZAR) {
    resetDailyIfNewDay();
    dailyRevenue.chatRevenue += amountZAR;
    logTransaction('chatRevenue', amountZAR, amountZAR * 0.055);
  },

  addSubscriptionRevenue: function(amountZAR) {
    resetDailyIfNewDay();
    dailyRevenue.subscriptionRevenue += amountZAR;
    logTransaction('subscription', amountZAR, amountZAR * 0.055);
  },

  addRideCommission: function(amountZAR) {
    resetDailyIfNewDay();
    dailyRevenue.rideCommission += amountZAR;
    logTransaction('rideCommission', amountZAR, amountZAR * 0.055);
  },

  addCashOutFee: function(amountZAR) {
    resetDailyIfNewDay();
    dailyRevenue.cashOutFees += amountZAR;
    logTransaction('cashOutFee', amountZAR, amountZAR * 0.055);
  },

  getDailyRevenue: function() {
    resetDailyIfNewDay();
    return { ...dailyRevenue };
  },

  getLifetimeRevenue: function() {
    return { ...totalRevenue };
  },

  getRevenueSummary: function() {
    resetDailyIfNewDay();
    return {
      daily: { ...dailyRevenue },
      lifetime: { ...totalRevenue },
      lastUpdated: new Date().toISOString()
    };
  }
};

module.exports = revenueTracker;
