self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  return clients.claim();
});
