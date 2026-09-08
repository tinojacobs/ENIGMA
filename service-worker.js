const CACHE_NAME = 'enigma-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/chatrooms.html',
  '/tradepost.html',
  '/social.html',
  '/wallet.html',
  '/driverDashboard.html',
  '/style.css'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      const networkFetch = fetch(e.request).then(res => {
        caches.open(CACHE_NAME).then(cache => {
          cache.put(e.request, res.clone());
        });
        return res;
      });
      return cached || networkFetch;
    })
  );
});
