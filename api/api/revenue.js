// ==============================================
// ✅ ENIGMA Revenue — Track • Log • Report
// Daily • Weekly • Monthly
// ==============================================

'use strict';

let dailyRevenue = {
  chatEntries: 0,
  adViews: 0,
  adClicks: 0,
  moolaSales: 0,
  listingFees: 0,
  whisperFees: 0,
  vipSales: 0,
  rideCommissions: 0,
  totalZAR: 0
};

let weeklyRevenue = { ...dailyRevenue };
let monthlyRevenue = { ...dailyRevenue };

// --- Add Revenue ---
function addChatRevenue(amount = 10) {
  dailyRevenue.chatEntries += amount;
  weeklyRevenue.chatEntries += amount;
  monthlyRevenue.chatEntries += amount;
  dailyRevenue.totalZAR += amount;
  weeklyRevenue.totalZAR += amount;
  monthlyRevenue.totalZAR += amount;
  console.log(`💬 Chat revenue: +${amount}`);
}

function addAdView(reward = 50) {
  dailyRevenue.adViews += 1;
  weeklyRevenue.adViews += 1;
  monthlyRevenue.adViews += 1;
  console.log(`📺 Ad viewed — reward: ${reward} Moola`);
}

function addAdClick(reward = 20) {
  dailyRevenue.adClicks += 1;
  weeklyRevenue.adClicks += 1;
  monthlyRevenue.adClicks += 1;
  console.log(`👆 Ad clicked — reward: ${reward} Moola`);
}

function addMoolaSale(randAmount) {
  dailyRevenue.moolaSales += randAmount;
  weeklyRevenue.moolaSales += randAmount;
  monthlyRevenue.moolaSales += randAmount;
  dailyRevenue.totalZAR += randAmount;
  weeklyRevenue.totalZAR += randAmount;
  monthlyRevenue.totalZAR += randAmount;
  console.log(`💰 Moola sold: R${randAmount}`);
}

function addListingFee(moolaAmount) {
  dailyRevenue.listingFees += moolaAmount;
  weeklyRevenue.listingFees += moolaAmount;
  monthlyRevenue.listingFees += moolaAmount;
  console.log(`🏪 Listing fee: ${moolaAmount} Moola`);
}

function addWhisperFee(moolaAmount = 15) {
  dailyRevenue.whisperFees += moolaAmount;
  weeklyRevenue.whisperFees += moolaAmount;
  monthlyRevenue.whisperFees += moolaAmount;
  console.log(`🤫 Whisper fee: ${moolaAmount} Moola`);
}

function addVipSale(moolaAmount = 100) {
  dailyRevenue.vipSales += moolaAmount;
  weeklyRevenue.vipSales += moolaAmount;
  monthlyRevenue.vipSales += moolaAmount;
  console.log(`✨ VIP sold: ${moolaAmount} Moola`);
}

function addRideCommission(randAmount) {
  dailyRevenue.rideCommissions += randAmount;
  weeklyRevenue.rideCommissions += randAmount;
  monthlyRevenue.rideCommissions += randAmount;
  dailyRevenue.totalZAR += randAmount;
  weeklyRevenue.totalZAR += randAmount;
  monthlyRevenue.totalZAR += randAmount;
  console.log(`🚕 Ride commission: R${randAmount}`);
}

// --- Get Reports ---
function getDailySummary() {
  return { ...dailyRevenue, timestamp: new Date().toISOString() };
}

function getWeeklySummary() {
  return { ...weeklyRevenue, timestamp: new Date().toISOString() };
}

function getMonthlySummary() {
  return { ...monthlyRevenue, timestamp: new Date().toISOString() };
}

// --- Reset Daily (called at midnight) ---
function resetDaily() {
  dailyRevenue = {
    chatEntries: 0, adViews: 0, adClicks: 0,
    moolaSales: 0, listingFees: 0, whisperFees: 0,
    vipSales: 0, rideCommissions: 0, totalZAR: 0
  };
  console.log('📊 Daily revenue reset');
}

module.exports = {
  addChatRevenue,
  addAdView,
  addAdClick,
  addMoolaSale,
  addListingFee,
  addWhisperFee,
  addVipSale,
  addRideCommission,
  getDailySummary,
  getWeeklySummary,
  getMonthlySummary,
  resetDaily
};
