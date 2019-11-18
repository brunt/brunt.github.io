importScripts("precache-manifest.5b2258b91f9930ba4d5c298b252e7429.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.routing.registerRoute(
    /\//,
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

