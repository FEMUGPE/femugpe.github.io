const cacheName = 'femugpe-wpa-v2.3.0';
const filesToCache = [
  '/',
  'index.html',
  'sobre.html',
  'submissao.html',
  'guidelines.html',
  'organizadores.html',
  'talks/femugpe-1/index.html',
  'images/femugpe-10.jpg',
  'images/femugpe-10.png',
  'images/sobre-img.jpg',
  'images/default-banner.png',
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

//Trata os arquivos em caches que foram modificados e assim 
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  //Lista dos os eventos de fetch da página
  return self.clients.claim();
});

//Instala no serviceWorker os arquivos que ficaram no cache
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('[ServiceWorker] Caching app shell');
      return Promise.all(
        filesToCache.map(function(files) {
          return cache.add(files);
        })
      );
    })
    .then(() => {
      return self.skipWaiting();
    })

  );
});


//Aqui é que tudo acontece você consegue tratar qualquer requiste mesmo sendo de outra origin
//Com o evento feth pode dizer qual tipo de resposte, se vai ser do cache ou da network
self.addEventListener('fetch', event => {
  console.log('[SW] fetch ' + event.request.url)
  event.respondWith(
    caches.match(event.request).then(function(response){
      return response || fetch(event.request.clone());
    })
  );
});