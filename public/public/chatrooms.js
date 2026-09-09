// ==============================================
// ✅ ENIGMA Chatrooms — Room Logic • Fees • Access
// ==============================================

(function () {
  'use strict';

  const ALL_ROOMS = [
    { id: 'za-general', name: '🇿🇦 South Africa', type: 'national', fee: 10 },
    { id: 'ng-general', name: '🇳🇬 Nigeria', type: 'national', fee: 10 },
    { id: 'uk-general', name: '🇬🇧 United Kingdom', type: 'national', fee: 10 },
    { id: 'us-general', name: '🇺🇸 United States', type: 'national', fee: 10 },
    { id: 'br-general', name: '🇧🇷 Brazil', type: 'national', fee: 10 },
    { id: 'in-general', name: '🇮🇳 India', type: 'national', fee: 10 },
    { id: 'global-cross', name: '🌍 Global Gateway', type: 'international', fee: 15 },
    { id: 'vip-lounge', name: '💎 VIP Lounge', type: 'vip', fee: 30 }
  ];

  // --- Enter Room ---
  async function enterRoom(roomId, userId) {
    const room = ALL_ROOMS.find(r => r.id === roomId);
    if (!room) return { success: false, error: 'Room not found' };

    // Check wallet
    if (!window.Wallet) return { success: false, error: 'Wallet not ready' };
    
    const balance = window.Wallet.getBalance();
    if (balance < room.fee) {
      return { 
        success: false, 
        error: `Need ${room.fee} Moola — you have ${balance}`,
        required: room.fee,
        current: balance
      };
    }

    // Deduct entry fee
    const result = window.Wallet.deductMoola(room.fee, `Entered ${room.name}`);
    if (!result.success) return result;

    return { success: true, room, remainingBalance: result.newBalance };
  }

  // --- Get All Rooms ---
  function getRooms() {
    return ALL_ROOMS;
  }

  // --- Get Room by ID ---
  function getRoom(roomId) {
    return ALL_ROOMS.find(r => r.id === roomId);
  }

  window.Chatrooms = {
    enterRoom,
    getRooms,
    getRoom
  };

  console.log('💬 Chatrooms — Loaded!');
})();
