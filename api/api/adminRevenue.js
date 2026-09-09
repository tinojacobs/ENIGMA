// ==============================================
// ✅ ENIGMA Admin Revenue — Full Financial Dashboard
// ==============================================

'use strict';

const dailyStats = {
  date: new Date().toISOString().split('T')[0],
  newUsers: 0,
  activeChats: 0,
  moolaSoldZAR: 0,
  adRevenue: 0,
  marketplaceFees: 0,
  rideCommissions: 0,
  totalRevenue: 0
};

function recordNewUser() { dailyStats.newUsers++; }
function recordChatSession() { dailyStats.activeChats++; }
function recordMoolaSale(randAmount) {
  dailyStats.moolaSoldZAR += randAmount;
  dailyStats.totalRevenue += randAmount;
}
function recordAdRevenue(amount) {
  dailyStats.adRevenue += amount;
  dailyStats.totalRevenue += amount;
}
function recordMarketplaceFee(amount) {
  dailyStats.marketplaceFees += amount;
  dailyStats.totalRevenue += amount;
}
function recordRideCommission(amount) {
  dailyStats.rideCommissions += amount;
  dailyStats.totalRevenue += amount;
}

function getDailyReport() {
  return { ...dailyStats };
}

function getSummary() {
  return {
    ...dailyStats,
    projectedMonthly: dailyStats.totalRevenue * 30
  };
}

module.exports = {
  recordNewUser,
  recordChatSession,
  recordMoolaSale,
  recordAdRevenue,
  recordMarketplaceFee,
  recordRideCommission,
  getDailyReport,
  getSummary
};
