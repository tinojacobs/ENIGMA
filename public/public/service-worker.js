// ==============================================
// ✅ ENIGMA Service Worker — Works Offline • Fast • App-Like
// ==============================================

const CACHE_NAME = 'enigma-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/chatrooms.html',
  '/wallet.html',
  '/social.html',
  '/tradepost.html',
  '/app.js',
  '/drive.js',
  '/moderation.js',
  '/extras.js',
  '/moola-pricing.js'
];

// --- Install ---
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// --- Activate — Clear Old Caches ---
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// --- Fetch — Serve From Cache First ---
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/')) return; // Don't cache API
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});
