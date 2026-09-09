// ==============================================
// ✅ ENIGMA Trip History — Complete Ride Records
// ==============================================

'use strict';

const trips = [];

async function addTrip(tripData) {
  const trip = {
    tripId: `TRIP-${Date.now()}`,
    riderId: tripData.riderId,
    driverId: tripData.driverId,
    pickup: tripData.pickup || {},
    dropoff: tripData.dropoff || {},
    fare: tripData.fare || 0,
    commission: tripData.commission || 0,
    driverPayout: tripData.driverPayout || 0,
    paymentMethod: tripData.paymentMethod || 'moola',
    status: tripData.status || 'completed',
    timestamp: new Date()
  };
  
  trips.unshift(trip);
  console.log(`🚕 Trip recorded: ${trip.tripId}`);
  return { success: true, trip };
}

async function getDriverTrips(driverId, filter = 'all') {
  let results = trips.filter(t => t.driverId === driverId);
  
  if (filter === 'day') {
    const today = new Date().toDateString();
    results = results.filter(t => 
      new Date(t.timestamp).toDateString() === today
    );
  }
  
  return results;
}

async function getRiderTrips(riderId) {
  return trips.filter(t => t.riderId === riderId);
}

module.exports = {
  addTrip,
  getDriverTrips,
  getRiderTrips
};
