// Service Worker registration and offline utilities

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered:', registration);
          
          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker available, notify user
                  console.log('New service worker available');
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log('SW registration failed:', error);
        });
    });

    // Listen for connection status changes
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
  }
}

function handleOnline() {
  console.log('Back online - syncing pending activities');
  
  // Trigger background sync if available
  if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
    navigator.serviceWorker.ready.then((registration: any) => {
      registration.sync.register('sync-activities');
    });
  } else {
    // Fallback: manually sync pending activities
    syncPendingActivities();
  }
}

function handleOffline() {
  console.log('Offline mode - activities will be queued');
}

async function syncPendingActivities() {
  try {
    const cache = await caches.open('orange-tomato-offline-v1');
    const response = await cache.match('/pending-activities');
    
    if (!response) return;
    
    const activities = await response.json();
    
    // Send all pending activities
    const promises = activities.map((activity: any) => {
      return fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activity)
      });
    });
    
    await Promise.all(promises);
    
    // Clear pending activities after successful sync
    await cache.delete('/pending-activities');
    console.log('Pending activities synced successfully');
  } catch (error) {
    console.error('Failed to sync pending activities:', error);
  }
}

// Cache chapter content for offline reading
export async function cacheChapterForOffline(chapterId: string, content: any) {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'CACHE_CHAPTER',
      chapterId,
      content
    });
  }
}

// Queue activity for syncing when online
export async function queueActivity(activity: any) {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'SYNC_ACTIVITY',
      activity
    });
  }
}

// Check if the app is online
export function isOnline(): boolean {
  return navigator.onLine;
}

// Add activity with offline support
export async function addActivityWithOfflineSupport(
  type: string,
  storyId: string,
  storyTitle: string,
  details?: string
) {
  const activity = {
    type,
    storyId,
    storyTitle,
    details,
    timestamp: new Date().toISOString()
  };

  if (isOnline()) {
    // Try to send immediately if online
    try {
      const response = await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activity)
      });
      
      if (!response.ok) {
        throw new Error('Failed to log activity');
      }
      
      return await response.json();
    } catch (error) {
      // If failed, queue for later
      await queueActivity(activity);
      throw error;
    }
  } else {
    // Queue for later if offline
    await queueActivity(activity);
    return { queued: true, activity };
  }
}
