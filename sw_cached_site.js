const cacheName = 'V2'




//Call Install Event
self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed');
});

//activate event
self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activated');
    //Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

//call fetch event
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
        .then(res => {
            //make a copy/clone of reponse
            const resClone = res.clone();
            //open cache
            caches
            .open(cacheName)
            .then(cache => {
                //add response to cache
                cache.put(e.request, resClone);
            });
            return res;
        }).catch(err => casches.match(e.request).then(res => res))
    );
});