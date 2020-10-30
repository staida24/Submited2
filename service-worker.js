const CACHE_NAME = "asiklapwa-v1";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/team.html",
  "/player.html",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/pages/home.html",
  "/pages/teams.html",
  "/pages/players.html",
  "/pages/saved.html",
  "/css/materialize.css",
  "/css/materialize.min.css",
  "/js/materialize.js",
  "/js/materialize.min.js",
  "/js/api.js",
  "/js/nav.js",
  "/img/footer.png",
  "/img/header1.png",
  "/img/header2.png",
  "/img/header3.png",
  "/img/header4.png",
  "/img/header5.png",

];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  let base_url = "https://www.thesportsdb.com";
  let base_url2 = "https://private-044be-dicodingfootball.apiary-mock.com";
  const online = self.navigator.onLine;

  if (event.request.url.indexOf(base_url) > -1 && online) {
    console.log('masuk')
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else if (event.request.url.indexOf(base_url2) > -1 && online){
      console.log('masuk')
      event.respondWith(
        caches.open(CACHE_NAME).then(function (cache) {
          return fetch(event.request).then(function (response) {
            cache.put(event.request.url, response.clone());
            return response;
          });
        })
      );
  } else {
    event.respondWith(
      caches
        .match(event.request, { ignoreSearch: true })
        .then(function (response) {
          return response || fetch(event.request);
        })
    );
  }
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log(`ServiceWorker: cache ${cacheName} dihapus`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});