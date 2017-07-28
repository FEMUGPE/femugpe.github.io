var cacheName = 'femugpe-wpa-1-7';
var filesToCache = [
  '/',
  'index.html',
  'sobre.html',
  'pagamento.html',
  'images/femugpe-10.jpg',
  'images/sobre-img.jpg',
  'images/femugpe-logo.png',
  'images/touch/icon.png',
  'images/touch/apple-touch-icon.png',
  'images/touch/icon-128x128.png',
  'images/touch/ms-touch-icon-144x144-precomposed.png',
  'manifest.json',
  'appcache.manifest',
  'js/jquery.min.js',
  'js/app.js',
  'js/spa.js',
  'js/pushnotification.js',
  'js/pushnotification.js',
  'js/materialize.min.js',
  'js/effects.js',
  'css/materialize.min.css',
  'css/material.css',
  'css/styles.css',
  'icons/MaterialIcons-Regular.ttf',
  'fonts/roboto/Roboto-Bold.woff',
  'fonts/roboto/Roboto-Bold.woff2',
  'fonts/roboto/Roboto-Light.woff',
  'fonts/roboto/Roboto-Light.woff2',
  'fonts/roboto/Roboto-Medium.woff',
  'fonts/roboto/Roboto-Medium.woff2',
  'fonts/roboto/Roboto-Regular.woff',
  'fonts/roboto/Roboto-Regular.woff2',
  'fonts/roboto/Roboto-Thin.woff',
  'fonts/roboto/Roboto-Thin.woff2',
];

self.addEventListener('install', e => {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName)
    .then(cache => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
    .then(() => {
      return self.skipWaiting();
    })

  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
    .then(response => response || fetch(e.request))
  )
});