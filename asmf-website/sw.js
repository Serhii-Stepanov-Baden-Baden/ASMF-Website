/**
 * Service Worker for ASMF Website
 * Progressive Web App functionality
 */

const CACHE_NAME = 'asmf-v3.0-2025-11-03';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
  console.log('🧠 ASMF SW: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('🧠 ASMF SW: Caching resources');
        return cache.addAll(urlsToCache);
      })
      .then(function() {
        console.log('🧠 ASMF SW: Installation complete');
        return self.skipWaiting();
      })
      .catch(function(error) {
        console.log('🧠 ASMF SW: Installation failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  console.log('🧠 ASMF SW: Activating...');
  
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('🧠 ASMF SW: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      console.log('🧠 ASMF SW: Activation complete');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        if (response) {
          console.log('🧠 ASMF SW: Serving from cache', event.request.url);
          return response;
        }
        
        console.log('🧠 ASMF SW: Fetching from network', event.request.url);
        return fetch(event.request)
          .then(function(response) {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(function(error) {
            console.log('🧠 ASMF SW: Network request failed', error);
            
            // Return offline page for navigation requests
            if (event.request.destination === 'document') {
              return caches.match('/offline.html');
            }
          });
      })
  );
});

// Background sync for form submissions (future feature)
self.addEventListener('sync', function(event) {
  if (event.tag === 'background-sync') {
    console.log('🧠 ASMF SW: Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

// Push notifications (future feature)
self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/badge-72x72.png',
      vibrate: [100, 50, 100],
      data: data.data,
      actions: [
        {
          action: 'explore',
          title: 'Explore ASMF',
          icon: '/icon-explore.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/icon-close.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Background sync function
function doBackgroundSync() {
  return new Promise(function(resolve) {
    console.log('🧠 ASMF SW: Performing background sync');
    
    // Future implementation for syncing offline form submissions
    // or other background tasks
    
    setTimeout(function() {
      console.log('🧠 ASMF SW: Background sync complete');
      resolve();
    }, 1000);
  });
}

// Error handler
self.addEventListener('error', function(event) {
  console.log('🧠 ASMF SW: Error occurred', event.error);
});

// Unhandled rejection handler
self.addEventListener('unhandledrejection', function(event) {
  console.log('🧠 ASMF SW: Unhandled promise rejection', event.reason);
});

// Message handler for communication with main thread
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

console.log('🧠 ASMF Service Worker loaded successfully!');
