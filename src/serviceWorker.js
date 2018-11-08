// set the cacheName
const cacheName = 'v2.0';

// assets to load in offline mode
let cacheAssets = [
  '',
  '/',
  '/public/index.html',
  './App.js',
  './API.js',
  './App.css',
  '/Components/Footer.js',
  '/Components/Header.js',
  '/Components/SideBar.js',
  './index.js'
]

global.addEventListener('install' , event => {
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => {
      console.log('caching initialized')
      return cache.addAll(cacheAssets);
    })
    .catch(error => {
      console.log(`caching failed to load: ${error}`)
    })
  );
});

global.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(error => {
      console.log(`An unexpected error has occured: ${error}`)
      return caches.match(event.request);
    })
  );
});
