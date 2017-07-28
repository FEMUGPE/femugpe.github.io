let cacheName = 'femugpe-wpa-2';
let filesToCache = [
  '/',
  'index.html',
  'sobre.html',
  'pagamento.html',
  'images/femugpe-10.jpg',
  'images/femugpe-logo.png',
  'images/icon.png',
  'images/sobre-img.jpg',
  'manifest.json',
  'appcache.manifest',
  'js/jquery.min.js',
  'js/app.js',
  'js/spa.js',
  'js/pushnotification.js',
  'js/pushnotification.js',
  'js/materialize.min.js',
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
  console.log('[ServiceWorker]: instalado');
  e.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(filesToCache))
    .catch(() => self.skipWaiting())
  )
});

self.addEventListener('activate', e => {
  console.log('[ServiceWorker] Activado');
  e.waitUntil(
    caches.keys()
    .then(keyList => Promise.all(keyList.map(key => {
      if(key !== cacheName) {
        console.log('[ServiceWorker] Removing old cache', key);
        return caches.delete(key);
      }
    })
    ))
  );
  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
    .then(response => response || fetch(e.request))
  )
});