// ==============================================
// ✅ ENIGMA Payments — Top-Up • Send • Verify
// ==============================================

'use strict';

const crypto = require('crypto');

// --- In-Memory Transaction Store ---
const transactions = new Map();
const PAYMENT_METHODS = ['card', 'airtime', 'voucher', 'eft', 'moola'];

// --- Generate Transaction ID ---
function genTxId() {
  return `TX-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
}

// --- Process Top-Up ---
async function processTopUp(userId, amount, currency = 'ZAR', method = 'card') {
  if (!userId || amount <= 0) {
    return { success: false, error: 'Invalid user or amount' };
  }
  if (!PAYMENT_METHODS.includes(method)) {
    return { success: false, error: 'Unsupported payment method' };
  }

  const txId = genTxId();
  const tx = {
    txId,
    userId,
    amount,
    currency,
    method,
    type: 'topup',
    status: 'completed',
    timestamp: new Date()
  };
  
  transactions.set(txId, tx);
  console.log(`💳 Payment ${txId}: +${amount} ${currency} via ${method}`);
  
  return { success: true, txId, amount, status: 'completed' };
}

// --- Verify Voucher ---
async function verifyVoucher(code) {
  // In production: validate against secure database
  const validCodes = {
    'ENIGMA200': { moola: 200, value: 20 },
    'ENIGMA500': { moola: 500, value: 50 },
    'ENIGMA1000': { moola: 1000, value: 100 }
  };
  
  const cleaned = code?.toUpperCase().trim();
  if (!validCodes[cleaned]) {
    return { success: false, error: 'Invalid voucher code' };
  }
  
  return { success: true, ...validCodes[cleaned] };
}

// --- Get User Transactions ---
async function getUserTransactions(userId, limit = 20) {
  return Array.from(transactions.values())
    .filter(t => t.userId === userId)
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);
}

module.exports = {
  processTopUp,
  verifyVoucher,
  getUserTransactions
};
