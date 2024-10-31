self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      badge: "/badge.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: "2",
      },
    }
    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})

self.addEventListener("notificationclick", function (event) {
  console.log("Notification click received.")
  event.notification.close()
  event.waitUntil(clients.openWindow("<https://your-website.com>"))
})

// Choose a cache name
const cacheName = "cache-v1"
// List the files to precache

const precacheResources = ["/"]

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener("install", (event) => {
  console.log("Service worker install event!")
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(precacheResources)),
  )
})

self.addEventListener("activate", () => {
  console.log("Service worker activate event!")
})

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
/*self.addEventListener("fetch", (event) => {
  console.log("Fetch intercepted for:", event.request.url)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }
      return fetch(event.request)
    }),
  )
})*/

self.addEventListener("fetch", async (event) => {
  const { request } = event

  if (request.url.includes("/_next/static/")) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }
        return fetch(request).then((response) => {
          return caches.open(cacheName).then((cache) => {
            cache.put(request, response.clone())
            return response
          })
        })
      }),
    )
  } else {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }
        return fetch(request)
      }),
    )
  }
})
