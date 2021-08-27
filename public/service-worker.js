// self.addEventListener('install'), evt => {
//     console.log('service worker is installed')
// }
const CACHE_NAME = 'sw-cache-example';
const toCache = [
  '/',
  '/index.html',
    "/db.js",
    "/manifest.json",
    "/styles.css",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png"
  ];


  self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          return cache.addAll(toCache)
        })
        .then(self.skipWaiting())
    )
  })
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.open(CACHE_NAME)
            .then((cache) => {
              return cache.match(event.request)
            })
        })
    )
  })
  
  self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys()
        .then((keyList) => {
          return Promise.all(keyList.map((key) => {
            if (key !== CACHE_NAME) {
              console.log('[ServiceWorker] Removing old cache', key)
              return caches.delete(key)
            }
          }))
        })
        .then(() => self.clients.claim())
    )
  })