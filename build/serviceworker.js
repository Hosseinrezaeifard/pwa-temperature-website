const CACHE_NAME = "version-1"
const urlsToCache = ['index.html', 'offline.html']

/* 
 Service workers are the javascript files that run all the time,
 when we open the browser and also when we close the browser.
 
 the Word 'self' is refrence to the SW itself, 
 by using 'this' keywork we specify that self is representing SW

*/

const self = this;

// Install SW:
self.addEventListener('install', (event) => {
    // Now we are gonna open the cache and add the urlsToCache to the cache
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('opened cache');
                return cache.addAll(urlsToCache);
            })
    )
})


// Listen for requests
self.addEventListener('fetch', (event) => {
    /* 
     We are gonna listen for all of our requests in the app
     check if there is an internet connection,
     so getting to that catch simply means that there is no internet connection
     we get to the catch block if one of the requests doesn't respond
    */
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(() => caches.match('offline.html'))
            })
    )
})


// Activate the SW
self.addEventListener('activate', (event) => {
    // Now we are gonna clean of our our previous chaches and only keep the one in the CACHE_NAME variable
    const whiteList = []
    whiteList.push(CACHE_NAME)

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                cacheNames.map((cacheName) => {
                    if (!whiteList.includes(cacheName)) {
                        return caches.delete(cacheName)
                    }
                })
            })
    )
})