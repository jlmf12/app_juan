const CACHE_NAME = "v1"; // Cambia a v2, v3... cuando actualices
const FILES_TO_CACHE = [
  "/jalvarezmolina/",
  "/jalvarezmolina/index.html",
  "/jalvarezmolina/style.css",
  "/jalvarezmolina/manifest.json",
  "/jalvarezmolina/service-worker.js",
  "/jalvarezmolina/assets/icon-192.png",
  "/jalvarezmolina/assets/icon-512.png"
];

// Instalar y cachear archivos
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Activar y limpiar cachés antiguas
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  return self.clients.claim();
});

// Servir desde caché con fallback a red
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
