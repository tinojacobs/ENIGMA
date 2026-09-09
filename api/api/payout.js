// ==============================================
// ✅ ENIGMA Payouts — Driver Withdrawals • Methods
// ==============================================

'use strict';

const payouts = [];

async function createPayout(driverId, amount, method = 'moola') {
  const validMethods = ['airtime', 'eft', 'voucher', 'moola'];
  if (!validMethods.includes(method)) {
    return { success: false, error: 'Invalid payout method' };
  }
  if (amount <= 0) {
    return { success: false, error: 'Amount must be positive' };
  }

  const payout = {
    id: `PAY-${Date.now()}`,
    driverId,
    amount,
    method,
    status: 'pending',
    requestedAt: new Date()
  };
  
  payouts.push(payout);
  console.log(`💸 Payout created: ${payout.id} — R${amount} via ${method}`);
  return { success: true, payout };
}

async function getPayouts(driverId, limit = 10) {
  return payouts.filter(p => p.driverId === driverId).slice(0, limit);
}

async function updateStatus(payoutId, newStatus) {
  const payout = payouts.find(p => p.id === payoutId);
  if (!payout) return { success: false, error: 'Payout not found' };
  payout.status = newStatus;
  if (newStatus === 'completed') payout.completedAt = new Date();
  return { success: true, payout };
}

module.exports = {
  createPayout,
  getPayouts,
  updateStatus
};
