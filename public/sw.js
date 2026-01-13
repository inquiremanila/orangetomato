const CACHE_NAME = 'orange-tomato-v1';
const OFFLINE_CACHE = 'orange-tomato-offline-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== OFFLINE_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle API requests differently - network first, then cache
  if (url.pathname.includes('/functions/v1/') || url.pathname.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone the response for caching
          const responseToCache = response.clone();
          caches.open(OFFLINE_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match(request);
        })
    );
    return;
  }

  // For other requests - cache first, then network
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((response) => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });

        return response;
      });
    })
  );
});

// Message event - handle messages from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_CHAPTER') {
    const { chapterId, content } = event.data;
    
    // Cache the chapter content for offline reading
    caches.open(OFFLINE_CACHE).then((cache) => {
      cache.put(
        new Request(`/chapter/${chapterId}`),
        new Response(JSON.stringify(content), {
          headers: { 'Content-Type': 'application/json' }
        })
      );
    });
  }

  if (event.data && event.data.type === 'SYNC_ACTIVITY') {
    // Queue the activity for syncing when online
    const { activity } = event.data;
    
    // Store pending activities in IndexedDB or cache
    event.waitUntil(
      caches.open(OFFLINE_CACHE).then((cache) => {
        return cache.match('/pending-activities').then((response) => {
          let activities = [];
          if (response) {
            activities = response.json().then(data => data || []);
          }
          
          return Promise.resolve(activities).then((acts) => {
            acts.push(activity);
            return cache.put(
              new Request('/pending-activities'),
              new Response(JSON.stringify(acts), {
                headers: { 'Content-Type': 'application/json' }
              })
            );
          });
        });
      })
    );
  }
});

// Background sync event - sync pending activities when online
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-activities') {
    event.waitUntil(
      caches.open(OFFLINE_CACHE).then((cache) => {
        return cache.match('/pending-activities').then((response) => {
          if (!response) return;
          
          return response.json().then((activities) => {
            // Send all pending activities
            const promises = activities.map((activity) => {
              return fetch('/api/activities', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(activity)
              });
            });
            
            return Promise.all(promises).then(() => {
              // Clear pending activities after successful sync
              cache.delete('/pending-activities');
            });
          });
        });
      })
    );
  }
});
