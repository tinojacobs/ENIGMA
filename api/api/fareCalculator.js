// ==============================================
// ✅ ENIGMA Fare Calculator — Accurate • Fair • Transparent
// Base on South African rates + Distance + Time
// ==============================================

'use strict';

/**
 * Calculate complete ride fare
 * @param {number} pickupLat - Pickup latitude
 * @param {number} pickupLng - Pickup longitude
 * @param {number} dropLat - Dropoff latitude
 * @param {number} dropLng - Dropoff longitude
 * @param {number} durationMinutes - Estimated ride time
 * @returns {Object} fare breakdown
 */
function calculateFare(pickupLat, pickupLng, dropLat, dropLng, durationMinutes = 15) {
  // --- Pricing Constants ---
  const BASE_FARE = 20;           // R20 starting fee
  const RATE_PER_KM = 10;        // R10 per kilometer
  const RATE_PER_MINUTE = 2;      // R2 per minute
  const COMMISSION_RATE = 0.20;   // 20% ENIGMA commission
  const MIN_FARE = 30;            // Minimum ride cost

  // --- Haversine Distance Calculation ---
  const dLat = (dropLat - pickupLat) * Math.PI / 180;
  const dLng = (dropLng - pickupLng) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(pickupLat * Math.PI / 180) *
            Math.cos(dropLat * Math.PI / 180) *
            Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = Math.round(6371 * c * 100) / 100; // Earth radius = 6371 km

  // --- Cost Breakdown ---
  const distanceCost = distanceKm * RATE_PER_KM;
  const timeCost = durationMinutes * RATE_PER_MINUTE;
  const subtotal = BASE_FARE + distanceCost + timeCost;
  const total = Math.max(subtotal, MIN_FARE);
  const commission = Math.round(total * COMMISSION_RATE);
  const driverPayout = total - commission;

  return {
    baseFare: BASE_FARE,
    distanceKm,
    distanceCost: Math.round(distanceCost),
    durationMinutes,
    timeCost: Math.round(timeCost),
    subtotal: Math.round(subtotal),
    total,
    commission,
    driverPayout,
    commissionRate: `${COMMISSION_RATE * 100}%`
  };
}

/**
 * Estimate fare without exact coordinates (simple version)
 * @param {number} distanceKm - Known distance
 * @param {number} durationMinutes - Known time
 */
function estimateFare(distanceKm, durationMinutes = 15) {
  return calculateFare(0, 0, distanceKm / 111, 0, durationMinutes);
}

module.exports = {
  calculateFare,
  estimateFare
};
