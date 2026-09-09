// ==============================================
// ✅ ENIGMA Driver Profile — Verified • Rated • Trusted
// ==============================================

'use strict';

const drivers = new Map();

// --- Register Driver ---
function registerDriver(driverData) {
  const { driverId, name, phone, vehicle = {} } = driverData;
  
  if (!driverId || !name || !phone) {
    return { success: false, error: 'Name, phone & ID required' };
  }
  if (drivers.has(driverId)) {
    return { success: false, error: 'Driver already registered' };
  }

  const profile = {
    driverId,
    name,
    phone,
    vehicle: {
      make: vehicle.make || '',
      model: vehicle.model || '',
      plate: vehicle.plate || '',
      color: vehicle.color || ''
    },
    rating: 5.0,
    totalRatings: 0,
    totalTrips: 0,
    totalEarnings: 0,
    available: false,
    verified: false,
    badges: [],
    joinedAt: new Date(),
    lastActive: null
  };

  drivers.set(driverId, profile);
  console.log(`🚕 Driver registered: ${name} (${driverId})`);
  return { success: true, profile };
}

// --- Get Driver Profile ---
function getDriver(driverId) {
  return drivers.get(driverId) || null;
}

// --- Update Status ---
function setAvailability(driverId, isAvailable) {
  const driver = drivers.get(driverId);
  if (!driver) return { success: false, error: 'Driver not found' };
  
  driver.available = isAvailable;
  driver.lastActive = new Date();
  return { success: true, available: isAvailable };
}

// --- Add Rating ---
function addRating(driverId, stars, comment = '') {
  const driver = drivers.get(driverId);
  if (!driver) return { success: false, error: 'Driver not found' };
  
  if (stars < 1 || stars > 5) {
    return { success: false, error: 'Rating must be 1–5' };
  }

  const total = driver.totalRatings + 1;
  driver.rating = Math.round(((driver.rating * driver.totalRatings) + stars) / total * 10) / 10;
  driver.totalRatings = total;
  
  if (driver.totalTrips >= 10 && !driver.verified) {
    driver.verified = true;
    driver.badges.push('Verified ✅');
  }

  return { success: true, newRating: driver.rating };
}

// --- Complete Trip ---
function completeTrip(driverId, fareAmount) {
  const driver = drivers.get(driverId);
  if (!driver) return { success: false, error: 'Driver not found' };
  
  driver.totalTrips++;
  driver.totalEarnings += fareAmount;
  driver.lastActive = new Date();
  
  return { success: true, totalTrips: driver.totalTrips, totalEarnings: driver.totalEarnings };
}

// --- List All Available Drivers ---
function getAvailableDrivers() {
  return Array.from(drivers.values()).filter(d => d.available);
}

module.exports = {
  registerDriver,
  getDriver,
  setAvailability,
  addRating,
  completeTrip,
  getAvailableDrivers
};
