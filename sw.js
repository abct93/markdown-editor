const CacheName = 'Cache:v1';

self.addEventListener('install', (event) => { });
self.addEventListener('activate', (event) => { });

const networkFallingBackToCache = async (request) => {
    const cache = await caches.open(CacheName);
    try {
        const response = await fetch(request);
        await cache.put(request, response.clone());
        return response;
    } catch (err) {
        return cache.match(request);
    }
}

self.addEventListener('fetch', (event) => {
    event.respondWith(networkFallingBackToCache(event.request));
});