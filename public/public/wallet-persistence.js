// ==============================================
// ✅ ENIGMA Wallet Persistence — Firestore Sync
// ==============================================

(function () {
  'use strict';

  function getDb() {
    if (typeof db === 'undefined') return null;
    return db;
  }

  // --- Save Wallet to Cloud ---
  async function saveToCloud(userId, walletData) {
    const database = getDb();
    if (!database) return { success: false, error: 'DB not ready' };

    try {
      await database.collection('wallets').doc(userId).set({
        balance: walletData.balance,
        lastUpdated: new Date()
      }, { merge: true });
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  // --- Load Wallet from Cloud ---
  async function loadFromCloud(userId) {
    const database = getDb();
    if (!database) return null;

    try {
      const doc = await database.collection('wallets').doc(userId).get();
      if (doc.exists) return doc.data();
      return null;
    } catch (err) {
      return null;
    }
  }

  // --- Initialize Wallet ---
  async function initWallet(userId) {
    const cloudData = await loadFromCloud(userId);
    if (cloudData && cloudData.balance) {
      if (window.Wallet) {
        localStorage.setItem(`enigma_wallet_${userId}`, JSON.stringify({
          balance: cloudData.balance,
          transactions: []
        }));
      }
    }
  }

  // --- Auto-sync ---
  function setupSync(userId) {
    setInterval(() => {
      if (window.Wallet) {
        saveToCloud(userId, { balance: window.Wallet.getBalance() });
      }
    }, 30000); // Every 30 seconds
  }

  window.WalletSync = {
    saveToCloud,
    loadFromCloud,
    initWallet,
    setupSync
  };

  console.log('☁️ Wallet Cloud Sync — Ready!');
})();
