const CACHE_NAME = "testonaut-portfolio-v2";
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/responsive.css',
  '/img/Lead_qa_automation.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/manifest.json',
  '/offline.html',
  '/pages/selenium_java_cucumber_testng_maven_projet.html'
];

// Installation - on précache tout
self.addEventListener('install', event => {
  console.log('🚀 Service Worker install...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Mise en cache initiale...');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation - on nettoie les anciens caches
self.addEventListener('activate', event => {
  console.log('🧹 Service Worker activate...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
                  .map(name => caches.delete(name))
      );
    })
  );
});

// Fetch intelligent
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Pour les pages HTML : Network First
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // On met à jour le cache dynamiquement
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => {
          return caches.match(request).then(response => response || caches.match('/offline.html'));
        })
    );
    return;
  }

  // Pour les ressources statiques : Cache First
  if (request.destination === 'style' ||
      request.destination === 'script' ||
      request.destination === 'image') {
    event.respondWith(
      caches.match(request)
        .then(response => response || fetch(request)
          .then(response => {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
            return response;
          }))
    );
    return;
  }

  // Par défaut
  event.respondWith(
    fetch(request).catch(() => caches.match('/offline.html'))
  );
});
