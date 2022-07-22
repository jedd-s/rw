// Files to cache
const cacheName = 'js13kPWA-v1'
const appShellFiles = [
    '/pwa/android-chrome-192x192.png',
    '/pwa/android-chrome-512x512.png',
    '/pwa/apple-splash-640x1136.png',
    '/pwa/apple-splash-750x1334.png',
    '/pwa/apple-splash-1125x2436.png',
    '/pwa/apple-splash-1242x2208.png',
    '/pwa/apple-splash-1242x2688.png',
    '/pwa/apple-splash-1536x2048.png',
    '/pwa/apple-splash-1668x2226.png',
    '/pwa/apple-splash-2048x2732.png',
    '/pwa/apple-touch-icon-192x192.png',
    '/pwa/apple-touch-icon.png',
    '/pwa/favicon-24x24.png',
    '/pwa/favicon-48x48.png',
    '/pwa/favicon-96x96.png',
    '/pwa/mstile-150x150.png',
    '/pwa/safari-pinned-tab.svg',
    '/pwa/swiftui-48x48.svg',
    '/pwa/swiftui-96x96_2x.png',
    '/pwa/swiftui96x96.svg',
    '/pwa/swiftui144x144.svg',
    '/pwa/swiftui148x148.svg',
    '/pwa/swiftui240x240.svg',
    '/pwa/swiftui480x480.svg',
    '/fonts/sfsymbols3.ttf',
    '/fonts/sfsymbols3.woff2',
    '/fonts/sfsymbols3.zopfli.woff',
    '/images/alpine-green-dark.png',
    '/images/alpine-green-light.png',
    '/images/alpine-metal-dark.png',
    '/images/alpine-metal-light.png',
    '/images/alpine-night-dark.png',
    '/images/alpine-night-light.png',
    '/images/alpine-steel-dark.png',
    '/images/alpine-steel-light.png',
    '/images/artwork-blue-680x226.webp',
    '/images/artwork-chill-680x226.jpg',
    '/images/artwork-feelgood-680x226.webp',
    '/images/artwork-romance-680x226.webp',
    '/images/artwork-siri-680x226.webp',
    '/images/artwork-sleep-680x226.jpg',
    '/images/ios15-dark.png',
    '/images/ios15-light.png',
    '/images/monteray-dark.jpg',
    '/images/monteray-light.jpg',
]
/* 

*/
// const otherImages = []
// for (let i = 0; i < games.length; i++) {
//     gamesImages.push(`data/img/${games[i].slug}.jpg`)
// }
// const contentToCache = appShellFiles.concat(otherImages)

// Installing Service Worker
self.addEventListener('install', (e) => {
    // console.log('[Service Worker] Install')
    // e.waitUntil(
    //     (async () => {
    //         const cache = await caches.open(cacheName)
    //         console.log('[Service Worker] Caching all: app shell and content')
    //         await cache.addAll(contentToCache)
    //     })(),
    // )
})

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
    // e
    // e.respondWith(
    //     (async () => {
    //         const r = await caches.match(e.request)
    //         console.log(`[Service Worker] Fetching resource: ${e.request.url}`)
    //         if (r) return r
    //         const response = await fetch(e.request)
    //         const cache = await caches.open(cacheName)
    //         console.log(`[Service Worker] Caching new resource: ${e.request.url}`)
    //         cache.put(e.request, response.clone())
    //         return response
    //     })(),
    // )
})
