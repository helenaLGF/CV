const CACHE_NAME = "testonaut-portfolio-v1";
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/responsive.css',
  '/img/Lead_qa_automation.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/manifest.json'
];

// Installation du Service Worker
self.addEventListener('install', event => {
  console.log('🚀 Service Worker en cours d\'installation...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Mise en cache des ressources');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', event => {
  console.log('🧹 Nettoyage des anciens caches...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
                  .map(name => caches.delete(name))
      );
    })
  );
});

// Interception des requêtes réseau
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si on a la ressource en cache, on la sert
        if (response) {
          console.log('🔄 Ressource servie depuis le cache:', event.request.url);
          return response;
        }
        // Sinon, on fait une requête réseau normale
        console.log('🌐 Requête réseau pour:', event.request.url);
        return fetch(event.request);
      })
  );
});
