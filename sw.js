/* ─── Hráz Křelovina – Service Worker ─── */
const CACHE_NAME = 'hraz-v3';
const APP_SHELL  = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon-maskable.svg'
];

/* Instalace – předem stáhni app shell */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

/* Aktivace – smaž staré cache */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key  => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

/* Fetch – network-first pro API, cache-first pro assets */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  /* CORS proxy a PMO požadavky jdou vždy přes síť */
  if (url.hostname.includes('allorigins') || url.hostname.includes('corsproxy') ||
      url.hostname.includes('codetabs') || url.hostname.includes('pmo.cz')) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(JSON.stringify({ contents: '' }), {
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );
    return;
  }

  /* App shell – cache-first */
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request)
        .then(response => {
          if (response.ok && event.request.method === 'GET') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          }
          return response;
        })
      )
      .catch(() => caches.match('./index.html'))
  );
});
