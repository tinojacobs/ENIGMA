// ==============================================
// ✅ ENIGMA Driver Routes — All Driver Endpoints
// ==============================================

const express = require('express');
const router = express.Router();
const { registerDriver, getDriver, setAvailability, completeTrip } = require('./driverProfile');
const { createPayout, getPayouts } = require('./payout');

router.post('/register', async (req, res) => {
  const result = registerDriver(req.body);
  res.json(result);
});

router.get('/:driverId/summary', async (req, res) => {
  const driver = getDriver(req.params.driverId);
  if (!driver) {
    return res.status(404).json({ success: false, error: 'Driver not found' });
  }
  res.json({ success: true, profile: driver });
});

router.patch('/:driverId/availability', async (req, res) => {
  const { available } = req.body;
  const result = setAvailability(req.params.driverId, available);
  res.json(result);
});

router.post('/:driverId/payout', async (req, res) => {
  const { amount, method } = req.body;
  const result = await createPayout(req.params.driverId, amount, method);
  res.json(result);
});

router.get('/:driverId/payouts', async (req, res) => {
  const payouts = await getPayouts(req.params.driverId);
  res.json({ success: true, payouts });
});

module.exports = router;
