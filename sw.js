/* おそばに Service Worker v3（共有版） */
var CACHE = 'osoboni-v3';
var PRECACHE = [
  './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png',
  './firebase-sdk.js'
];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(PRECACHE.map(function (u) { return c.add(u).catch(function () {}); }));
  }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  var sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin) return; // Firestore/Auth の通信には触らない
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).then(function (res) {
      var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); }); return res;
    }).catch(function () { return caches.match('./index.html'); }));
    return;
  }
  e.respondWith(caches.match(e.request).then(function (cached) {
    var network = fetch(e.request).then(function (res) {
      if (res && (res.ok || res.type === 'opaque')) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); }); }
      return res;
    }).catch(function () { return cached; });
    return cached || network;
  }));
});
