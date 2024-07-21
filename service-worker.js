const cacheName = "challenge-app";
const filesToCache = [
    "/",
    "/index.html",
    "/style.css",
    "/script.js",
    "/cards.json"
];

self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(filesToCache)));
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request).then((response) => {
            let copy = response.clone();
            caches.open(cacheName).then((cache) => {
                cache.put(event.request, copy);
            });
            return response;
        }).catch(() => {
            return caches.match(event.request).then((response) => {
                return response;
            })
        })
    );
});
