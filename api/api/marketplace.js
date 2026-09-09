// ==============================================
// ✅ ENIGMA Marketplace — Buy • Sell • Jobs • Fees
// ==============================================

'use strict';

const LISTING_FEES = {
  standard: 0,      // Free
  featured: 50,     // Moola
  urgent: 20        // Moola
};

const COMMISSION_RATES = {
  local: 0.05,      // 5%
  national: 0.05,   // 5%
  international: 0.10 // 10%
};

// --- Create New Listing ---
async function createListing(db, listingData) {
  const {
    userId, userName,
    title, description, price,
    category, visibility = 'local',
    featured = false
  } = listingData;

  if (!userId || !title || !price) {
    return { success: false, error: 'Missing required fields' };
  }

  // Calculate fee
  const fee = featured ? LISTING_FEES.featured : LISTING_FEES.standard;
  
  const doc = {
    userId,
    userName: userName || 'Anonymous',
    title,
    description: description || '',
    price,
    category: category || 'general',
    visibility,
    featured,
    fee,
    status: 'active',
    createdAt: new Date()
  };

  const ref = await db.collection('listings').add(doc);
  return { success: true, id: ref.id, listing: doc };
}

// --- Get Listings ---
async function getListings(db, filter = 'all', limit = 30) {
  let query = db.collection('listings').where('status', '==', 'active');
  
  if (filter !== 'all' && ['local','national','global'].includes(filter)) {
    query = query.where('visibility', '==', filter === 'global' ? 'international' : filter);
  }

  const snap = await query.orderBy('createdAt', 'desc').limit(limit).get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// --- Calculate Commission ---
function calculateCommission(price, visibility = 'local') {
  const rate = COMMISSION_RATES[visibility] || 0.05;
  const commission = Math.round(price * rate);
  return {
    rate: `${rate * 100}%`,
    commission,
    sellerReceives: price - commission
  };
}

module.exports = {
  createListing,
  getListings,
  calculateCommission,
  LISTING_FEES
};
