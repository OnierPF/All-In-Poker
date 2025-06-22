/**
 * serviceWorker.js – SW para PWA: cache estático y dinámico
 */
const CACHE = 'allin-poker-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/css/style.css',
  '/js/utils.js',
  '/assets/logo-3d.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(resp => {
      if (resp) return resp;
      return fetch(e.request)
        .then(res => {
          return caches.open(CACHE).then(cache => {
            cache.put(e.request, res.clone());
            return res;
          });
        })
        .catch(() => caches.match('/offline.html'));
    })
  );
});
