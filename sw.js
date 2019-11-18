importScripts("precache-manifest.95c54a113f05eb9abf8dde5eb4b19b1f.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.routing.registerRoute(
    /\./,
    new workbox.strategies.CacheFirst({
        cacheName: "wasm-sudoku",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 10,
                purgeOnQuotaError: true
            })
        ]
    })
);

