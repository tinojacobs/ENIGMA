// ==============================================
// ✅ ENIGMA Wallet — Balance • Send • History • Persist
// ==============================================

(function () {
  'use strict';

  // --- State ---
  let balance = 100; // Starting Moola
  let transactions = [];

  // --- Load from Storage ---
  function loadWallet(userId) {
    try {
      const saved = localStorage.getItem(`enigma_wallet_${userId}`);
      if (saved) {
        const data = JSON.parse(saved);
        balance = data.balance || 100;
        transactions = data.transactions || [];
      }
    } catch (e) {
      balance = 100;
      transactions = [];
    }
    updateDisplay();
  }

  // --- Save to Storage ---
  function saveWallet(userId) {
    localStorage.setItem(`enigma_wallet_${userId}`, JSON.stringify({
      balance,
      transactions,
      updatedAt: new Date()
    }));
  }

  // --- Get Balance ---
  function getBalance() {
    return balance;
  }

  // --- Add Moola ---
  function addMoola(amount, description = '') {
    amount = Number(amount);
    if (isNaN(amount) || amount <= 0) {
      return { success: false, error: 'Invalid amount' };
    }
    balance += amount;
    transactions.unshift({
      type: 'credit',
      amount,
      description,
      timestamp: new Date().toISOString()
    });
    updateDisplay();
    const user = getCurrentUser();
    if (user) saveWallet(user.id);
    return { success: true, newBalance: balance };
  }

  // --- Deduct Moola ---
  function deductMoola(amount, description = '') {
    amount = Number(amount);
    if (isNaN(amount) || amount <= 0) {
      return { success: false, error: 'Invalid amount' };
    }
    if (balance < amount) {
      return { success: false, error: 'Insufficient Moola 💜' };
    }
    balance -= amount;
    transactions.unshift({
      type: 'debit',
      amount,
      description,
      timestamp: new Date().toISOString()
    });
    updateDisplay();
    const user = getCurrentUser();
    if (user) saveWallet(user.id);
    return { success: true, newBalance: balance };
  }

  // --- Transfer Moola ---
  function transferMoola(toUserId, amount) {
    amount = Number(amount);
    if (!toUserId) return { success: false, error: 'Recipient needed' };
    if (amount < 10) return { success: false, error: 'Minimum transfer: 10 Moola' };
    
    const result = deductMoola(amount, `Sent to ${toUserId}`);
    if (!result.success) return result;

    transactions.unshift({
      type: 'transfer_out',
      amount,
      toUserId,
      timestamp: new Date().toISOString()
    });
    
    updateDisplay();
    const user = getCurrentUser();
    if (user) saveWallet(user.id);
    
    return { success: true, newBalance: balance };
  }

  // --- Helper: Get Current User ---
  function getCurrentUser() {
    const saved = localStorage.getItem('enigma_user');
    return saved ? JSON.parse(saved) : null;
  }

  // --- Update UI ---
  function updateDisplay() {
    const el = document.getElementById('balanceDisplay');
    if (el) el.textContent = balance.toLocaleString();
  }

  // --- Expose Globally ---
  window.Wallet = {
    loadWallet,
    getBalance,
    addMoola,
    deductMoola,
    transferMoola,
    getHistory: () => transactions.slice(0, 50)
  };

  console.log('💰 ENIGMA Wallet — Ready!');
})();
