/* js/serviceWorker.js — All-In Poker Service Worker v1 */

const CACHE_NAME = 'all-in-poker-cache-v1';
const ASSETS = [
  /* HTML */
  './',
  './index.html',

  /* CSS */
  './css/style.css',
  './css/mtt-theme.css',

  /* JS */
  './js/utils.js',
  './js/core/filters.js',
  './js/core/quickJoin.js',
  './js/core/timeBank.js',
  './js/core/countdown.js',
  './js/core/gameActions.js',
  './js/core/notifications.js',
  './js/chat.js',
  './js/copilot-chat.js',
  './js/core/analytics.js',
  './js/core/settingsPanel.js',
  './js/core/i18n.js',

  /* Imágenes y otros */
  './favicon.png',
  './assets/logo-3d.png',
  './manifest.json'
];

// Instalación: cacheamos recursos esenciales
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(self.skipWaiting())
  );
});

// Activación: limpiamos viejos caches si hacen falta
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: respondemos con cache primero, fallback a red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) return cached;
        return fetch(event.request)
          .then(response => {
            // Opcional: cachear nuevas respuestas dinámicas aquí
            return response;
          });
      })
      .catch(() => {
        // Aquí podrías devolver un offline.html si lo tuvieras
      })
  );
});
