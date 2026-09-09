// ==============================================
// ✅ ENIGMA Test Extras — Verify All Features
// ==============================================

(async () => {
  console.log('🧪 Running ENIGMA Feature Tests...');

  // Create test user
  const testUser = { id: 'TestUser001', name: 'Test User' };
  localStorage.setItem('enigma_user', JSON.stringify(testUser));

  // Test Wallet
  if (window.Wallet) {
    window.Wallet.loadWallet(testUser.id);
    console.log('💰 Initial Balance:', window.Wallet.getBalance());
    
    const addResult = window.Wallet.addMoola(500, 'Test deposit');
    console.log('💰 After +500:', addResult.newBalance);
    
    const deductResult = window.Wallet.deductMoola(100, 'Test spend');
    console.log('💰 After -100:', deductResult.success ? deductResult.newBalance : deductResult.error);
  } else {
    console.log('⚠️ Wallet not loaded yet');
  }

  // Test Extras
  if (window.extras) {
    const adResult = window.extras.watchAd(testUser.id);
    console.log('📺 Watch Ad Result:', adResult);
  } else {
    console.log('⚠️ Extras not loaded yet');
  }

  console.log('✅ Tests Complete!');
})();
