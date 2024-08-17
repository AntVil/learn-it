const cacheName = "challenge-app";
const filesToCache = [
    "/learn-it/",
    "/learn-it/index.html",
    "/learn-it/styles/index.css",
    "/learn-it/styles/navigation.css",
    "/learn-it/styles/card-swipe.css",
    "/learn-it/styles/card-list.css",
    "/learn-it/styles/card.css",
    "/learn-it/scripts/index.js",
    "/learn-it/scripts/navigation.js",
    "/learn-it/scripts/card-swipe.js",
    "/learn-it/scripts/card-list.js",
    "/learn-it/scripts/card.js",
    "/learn-it/cards.json"
];

self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(filesToCache)));
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request).then((response) => {
            const copy = response.clone();
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
