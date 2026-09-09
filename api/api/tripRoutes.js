// ==============================================
// ✅ ENIGMA Trip Routes — API /api/driver/trips
// ==============================================

const express = require('express');
const router = express.Router();
const { getDriverTrips } = require('./tripHistory');

router.get('/:driverId/trips', async (req, res) => {
  try {
    const { driverId } = req.params;
    const { filter = 'all' } = req.query;
    
    const trips = await getDriverTrips(driverId, filter);
    
    let totalEarnings = 0;
    let totalCommission = 0;
    trips.forEach(t => {
      totalEarnings += t.fare || 0;
      totalCommission += t.commission || 0;
    });
    
    res.json({
      success: true,
      count: trips.length,
      totalEarnings,
      totalCommission,
      netEarnings: totalEarnings - totalCommission,
      trips
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
