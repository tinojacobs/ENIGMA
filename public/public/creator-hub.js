// ==============================================
// ✅ ENIGMA Creator Hub — MONETIZATION ENGINE
// ==============================================
// This is what makes us DIFFERENT from IG/TikTok/FB
// ==============================================

(function () {
  'use strict';

  const CREATOR_TIERS = {
    rising: { minFollowers: 0, commissionRate: 0.05, badge: '🌱 Rising' },
    growing: { minFollowers: 100, commissionRate: 0.08, badge: '🌿 Growing' },
    established: { minFollowers: 500, commissionRate: 0.12, badge: '🌳 Established' },
    star: { minFollowers: 2500, commissionRate: 0.18, badge: '⭐ Star Creator' },
    legend: { minFollowers: 10000, commissionRate: 0.25, badge: '👑 ENIGMA Legend' }
  };

  const REVENUE_STREAMS = {
    postViews: { moolaPer1k: 15, description: 'Earn per 1,000 views' },
    storyViews: { moolaPer1k: 8, description: 'Story views count too!' },
    giftsReceived: { creatorPercent: 0.70, description: '70% goes to creator' },
    subscriptions: { monthlyMoola: 500, description: 'Fan subscriptions' },
    adShares: { creatorPercent: 0.50, description: '50% ad revenue split' },
    affiliateSales: { commissionPercent: 0.10, description: 'Promote products → earn' },
    liveTips: { creatorPercent: 0.80, description: 'Live gifts — 80% creator gets!' },
    karaokeDuets: { splitPercent: 0.50, description: 'Split earnings with duet partner' }
  };

  // --- Calculate Creator Earnings ---
  function calculateEarnings(views, followers, gifts = 0, adViews = 0) {
    const tier = getTier(followers);
    const tierBonus = CREATOR_TIERS[tier].commissionRate;
    
    const fromViews = Math.floor((views / 1000) * REVENUE_STREAMS.postViews.moolaPer1k * (1 + tierBonus));
    const fromGifts = Math.floor(gifts * REVENUE_STREAMS.giftsReceived.creatorPercent);
    const fromAds = Math.floor((adViews / 1000) * 10 * REVENUE_STREAMS.adShares.creatorPercent);
    
    return {
      tier: CREATOR_TIERS[tier].badge,
      fromViews,
      fromGifts,
      fromAds,
      total: fromViews + fromGifts + fromAds,
      nextTier: getNextTier(followers)
    };
  }

  // --- Determine Tier ---
  function getTier(followers) {
    if (followers >= 10000) return 'legend';
    if (followers >= 2500) return 'star';
    if (followers >= 500) return 'established';
    if (followers >= 100) return 'growing';
    return 'rising';
  }

  // --- Next Tier Progress ---
  function getNextTier(followers) {
    if (followers >= 10000) return { name: 'MAXED OUT 🎉', needed: 0 };
    if (followers >= 2500) return { name: 'Legend 👑', needed: 10000 - followers };
    if (followers >= 500) return { name: 'Star ⭐', needed: 2500 - followers };
    if (followers >= 100) return { name: 'Established 🌳', needed: 500 - followers };
    return { name: 'Growing 🌿', needed: 100 - followers };
  }

  // --- Watch-to-Earn (Viewer Side) ---
  function watchContent(userId, contentType = 'post') {
    const reward = contentType === 'live' ? 10 : contentType === 'story' ? 5 : 3;
    if (window.Wallet) {
      window.Wallet.addMoola(reward, `Watched ${contentType}`);
    }
    return { reward, message: `+${reward} Moola earned! Keep watching! 💎` };
  }

  // --- Send Gift to Creator ---
  function sendGiftToCreator(fromUserId, toCreatorId, giftValueMoola) {
    if (!window.Wallet) return { success: false };
    if (window.Wallet.getBalance() < giftValueMoola) {
      return { success: false, error: 'Not enough Moola' };
    }
    
    const creatorGets = Math.floor(giftValueMoola * 0.70); // 70% to creator
    const platformKeeps = giftValueMoola - creatorGets;
    
    window.Wallet.deductMoola(giftValueMoola, `Gift sent`);
    
    console.log(`🎁 Gift: You sent ${giftValueMoola} Moola → Creator gets ${creatorGets}, ENIGMA keeps ${platformKeeps}`);
    return { success: true, creatorGets, platformKeeps };
  }

  // --- Expose ---
  window.CreatorHub = {
    CREATOR_TIERS,
    REVENUE_STREAMS,
    calculateEarnings,
    getTier,
    watchContent,
    sendGiftToCreator
  };

  console.log('🌟 Creator Hub — Monetization Engine ACTIVE!');
  console.log('💎 8 Revenue Streams • Fair Splits • Everyone Earns!');
})();
