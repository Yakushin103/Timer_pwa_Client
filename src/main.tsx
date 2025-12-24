import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

import { Provider as StorageProvider } from "react-redux"

import { persistStore } from 'redux-persist'
import { PersistGate } from "redux-persist/integration/react"

import App from './App'

import { store } from "./store/store"

import './styles/index.scss'

let persistor = persistStore(store);

// Регистрация Service Worker
const registerServiceWorker = () => {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    console.log('🚀 Регистрация Service Worker...');

    navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none'
    })
      .then(registration => {
        console.log('✅ SW зарегистрирован успешно:', registration.scope);

        // Проверка обновлений
        setInterval(() => {
          registration.update();
        }, 5 * 60 * 1000);

        registration.addEventListener('updatefound', () => {
          console.log('🔄 Обнаружена новая версия SW!');
          const newWorker = registration.installing;
        
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed') {
                // ТОЛЬКО если уже есть активный контроллер (не первая загрузка)
                if (navigator.serviceWorker.controller) {
                  console.log('🎉 Новая версия установлена! Требуется обновление.');
                  
                  // Устанавливаем флаг
                  (window as any).__swUpdateAvailable = true;
                  
                  // Отправляем событие
                  window.dispatchEvent(new CustomEvent('sw-update-available'));
                } else {
                  console.log('✅ SW установлен впервые');
                }
              }
            });
          }
        });
      })
      .catch(error => {
        console.error('❌ Ошибка регистрации SW:', error);
      });
  } else {
    console.log('SW не регистрируется (dev режим или не поддерживается)');
  }
};

// Запускаем регистрацию
registerServiceWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StorageProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />

        </BrowserRouter>
      </PersistGate>
    </StorageProvider>
  </StrictMode>,
)
