const CACHE_NAME = 'hypertrophy-ddp-v28';
const ASSETS_TO_CACHE = [
  './',
  './manifest.json',
  './assets/icons/icon.svg',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-maskable-512.png',
  './assets/icons/apple-touch-icon.png',
  './assets/css/styles.css',
  './assets/css/tokens.css',
  './assets/css/base.css',
  './assets/js/app.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse && !(event.request.mode === 'navigate' && cachedResponse.redirected)) {
        return cachedResponse;
      }

      if (event.request.mode === 'navigate') {
        return fetch(event.request)
          .then((networkResponse) => {
            if (!networkResponse.ok) {
              return caches.match('./').then((fallback) => fallback || networkResponse);
            }
            return networkResponse;
          })
          .catch(() => caches.match('./').then((fallback) => fallback || Response.error()));
      }

      return fetch(event.request).catch(() => Response.error());
    })
  );
});
