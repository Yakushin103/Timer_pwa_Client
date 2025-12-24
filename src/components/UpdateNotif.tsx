import { useEffect, useState } from 'react';

interface VersionInfo {
  version: string;
  buildDate: string;
  changelog?: string;
}

const UpdateNotifier: React.FC = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [currentVersion, setCurrentVersion] = useState('');
  const [newVersion, setNewVersion] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    console.log('UpdateNotifier mounted');

    const updatingTime = localStorage.getItem('sw-updating');
    if (updatingTime) {
      const secondsAgo = (Date.now() - parseInt(updatingTime)) / 1000;
      if (secondsAgo < 30) { // Если обновлялись менее 30 секунд назад
        console.log('Недавно обновлялись, скрываю уведомление');
        localStorage.removeItem('sw-updating');
        return;
      }
    }

    // 1. Сначала загружаем текущую версию
    fetch('/version.json?t=' + Date.now())
      .then(r => r.json())
      .then((data: VersionInfo) => {
        console.log('Version data loaded:', data);
        setCurrentVersion(data.version);

        // 2. Проверяем Service Worker
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistration().then(registration => {
            console.log('SW registration:', registration);

            // Проверяем, есть ли ожидающий worker
            if (registration?.waiting) {
              console.log('SW waiting found! Showing update notification');
              setUpdateAvailable(true);
              setNewVersion(data.version);
            }

            // 3. Слушаем сообщения от SW
            const handleMessage = (event: MessageEvent) => {
              console.log('Message from SW:', event.data);
              if (event.data.type === 'SW_NEW_VERSION') {
                console.log('New SW version detected:', event.data.version);
                setUpdateAvailable(true);
                setNewVersion(event.data.version);
              }
            };

            navigator.serviceWorker.addEventListener('message', handleMessage);

            // 4. Слушаем собственное событие от main.tsx
            const handleUpdateAvailable = () => {
              console.log('sw-update-available event received');
              setUpdateAvailable(true);
              setNewVersion(data.version);
            };

            window.addEventListener('sw-update-available', handleUpdateAvailable);

            // 5. Проверяем, не было ли события до монтирования компонента
            if ((window as any).__swUpdateAvailable) {
              console.log('Update was already available before component mount');
              setUpdateAvailable(true);
              setNewVersion(data.version);
            }
          });
        }

        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load version.json:', err);
        setIsLoading(false);
      });

    // 6. Проверяем обновления при фокусе
    const handleFocus = () => {
      console.log('Window focus, checking for updates...');
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then(reg => {
          reg?.update().then(() => {
            console.log('SW update check completed');
          });
        });
      }
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
      // Можно оставить пустую функцию, так как мы не сохраняем ссылку
      window.removeEventListener('sw-update-available', () => { });
    };
  }, []);

  const handleUpdate = () => {
    if (isUpdating) return; // Защита от повторных кликов

    setIsUpdating(true);
    console.log('Начинаю обновление...');

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration?.waiting) {
          // Отправляем команду
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });

          // Сохраняем в localStorage что обновляемся
          localStorage.setItem('sw-updating', Date.now().toString());

          // Перезагрузка через небольшую задержку
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      });
    }
  };

  const handleLater = () => {
    console.log('Update postponed');
    setUpdateAvailable(false);
    // Можно сохранить в localStorage, чтобы не показывать некоторое время
    localStorage.setItem('updatePostponed', Date.now().toString());
  };

  console.log('Render state:', { isLoading, updateAvailable, currentVersion, newVersion });

  // Если загрузка или нет обновления - не рендерим
  if (isLoading) {
    return null;
  }

  // Если обновление не доступно - не рендерим
  if (!updateAvailable) {
    return null;
  }

  // Проверяем, не откладывали ли обновление недавно
  const postponedTime = localStorage.getItem('updatePostponed');
  if (postponedTime) {
    const hoursAgo = (Date.now() - parseInt(postponedTime)) / (1000 * 60 * 60);
    if (hoursAgo < 1) { // Не показывать если откладывали менее часа назад
      return null;
    }
  }

  return (
    <div className="update-notification">
      <div className="update-content">
        <div className="update-header">
          <span className="update-icon">🔄</span>
          <h3>Доступно обновление!</h3>
        </div>

        <div className="update-details">
          <p>Версия {newVersion} готова к установке</p>
          {currentVersion && <small>Текущая версия: {currentVersion}</small>}
        </div>

        <div className="update-actions">
          <button
            onClick={handleUpdate}
            className="update-btn primary"
            aria-label="Обновить сейчас"
          >
            Обновить сейчас
          </button>
          <button
            onClick={handleLater}
            className="update-btn secondary"
            aria-label="Напомнить позже"
          >
            Напомнить позже
          </button>
        </div>
      </div>

      <style>{`
        .update-notification {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
          z-index: 10000;
          animation: slideIn 0.3s ease-out;
          max-width: 400px;
          border: 1px solid #e0e0e0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .update-content {
          padding: 20px;
        }
        
        .update-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        
        .update-header h3 {
          margin: 0;
          color: #333;
          font-size: 18px;
          font-weight: 600;
        }
        
        .update-icon {
          font-size: 24px;
        }
        
        .update-details {
          margin-bottom: 20px;
        }
        
        .update-details p {
          margin: 0 0 8px 0;
          color: #666;
          font-size: 14px;
          line-height: 1.4;
        }
        
        .update-details small {
          color: #999;
          font-size: 12px;
          display: block;
        }
        
        .update-actions {
          display: flex;
          gap: 12px;
        }
        
        .update-btn {
          padding: 10px 20px;
          border-radius: 6px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          flex: 1;
          transition: all 0.2s;
          font-size: 14px;
        }
        
        .update-btn.primary {
          background: #4CAF50;
          color: white;
        }
        
        .update-btn.primary:hover {
          background: #45a049;
          transform: translateY(-1px);
        }
        
        .update-btn.primary:active {
          transform: translateY(0);
        }
        
        .update-btn.secondary {
          background: #f5f5f5;
          color: #666;
        }
        
        .update-btn.secondary:hover {
          background: #e0e0e0;
          transform: translateY(-1px);
        }
        
        .update-btn.secondary:active {
          transform: translateY(0);
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        /* Адаптивность */
        @media (max-width: 480px) {
          .update-notification {
            bottom: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
          }
          
          .update-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default UpdateNotifier;