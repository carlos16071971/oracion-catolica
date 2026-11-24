// Service worker: la app funciona sin conexión.
// Convenciones (iOS): sin "./" en ASSETS; navegación = red primero y index cacheado solo como respaldo offline.
const VERSION = "oracion-v1.8.1";
const ASSETS = [
  "index.html", "styles.css", "app.js", "motor.js", "art.js", "secciones.js", "diario.js", "guias.js", "data/devocionario.js", "data/guias.js", "manifest.webmanifest",
  "img/fotos.json", "img/cisne.jpg", "img/guadalupe.jpg", "img/narcisa.jpg", "img/maria.jpg", "img/dios.jpg", "img/nino.jpg", "img/jesus.jpg", "img/senor.jpg", "img/santisimo.jpg", "img/rosario.jpg", "data/figuras.js", "data/manana.js", "data/noche.js", "data/especiales.js", "data/bienvenida.js",
  "icons/icon.svg", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).catch(() => caches.match("index.html")));
    return;
  }
  // Archivos estáticos: red primero (para recibir actualizaciones) y caché si no hay conexión.
  e.respondWith(
    fetch(req).then((res) => {
      if (res.ok) { const copia = res.clone(); caches.open(VERSION).then((c) => c.put(req, copia)); }
      return res;
    }).catch(() => caches.match(req))
  );
});
