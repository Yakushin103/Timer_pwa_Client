// sw.js
importScripts('/version.js');

console.log(`🟢 Service Worker ${APP_VERSION} загружен`);

const CACHE_NAME = `timer-app-cache-${APP_VERSION}`;
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/version.json'
];

// Установка
self.addEventListener('install', event => {
  console.log(`⚙️ SW ${APP_VERSION}: Установка`);
  
  // Пропускаем ожидание только если это первая установка
  if (!self.registration.waiting) {
    event.waitUntil(self.skipWaiting());
  }
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Кэшируем файлы');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Активация - ОЧЕНЬ ВАЖНО!
self.addEventListener('activate', event => {
  console.log(`🎉 SW ${APP_VERSION}: Активация`);
  
  event.waitUntil(
    Promise.all([
      // Очищаем старые кэши
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // Удаляем все кэши, кроме текущей версии
            if (cacheName !== CACHE_NAME && cacheName.startsWith('timer-app-cache-')) {
              console.log(`🗑 Удаляю старый кэш: ${cacheName}`);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Берем контроль над клиентами
      self.clients.claim().then(() => {
        console.log('✅ SW взял контроль');
      })
    ]).then(() => {
      // Отправляем сообщение о новой версии ТОЛЬКО ЕСЛИ БЫЛ ПРЕДЫДУЩИЙ КОНТРОЛЛЕР
      if (self.clients && navigator.serviceWorker.controller) {
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'SW_UPDATED',
              version: APP_VERSION
            });
          });
        });
      }
    })
  );
});

// Получение сообщений
self.addEventListener('message', event => {
  console.log('SW получил сообщение:', event.data);
  
  if (event.data.type === 'SKIP_WAITING') {
    console.log('SW: Пропускаю ожидание...');
    self.skipWaiting();
  }
});