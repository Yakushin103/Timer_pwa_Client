import { useState, useEffect, useCallback, useRef } from "react";

interface UsePWAReturn {
  needsRefresh: boolean;
  offlineReady: boolean;
  updateSW: () => Promise<void>;
  checkForUpdates: () => void;
  registration: ServiceWorkerRegistration | null;
}

export const usePWA = (
  checkInterval: number = 10 * 60 * 1000
): UsePWAReturn => {
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const updatePendingRef = useRef(false);

  // Функция для проверки обновлений
  const checkForUpdates = useCallback(() => {
    if (registration) {
      registration.update().catch(console.error);
    }
  }, [registration]);

  // Функция для обновления приложения
  const updateSW = useCallback(async () => {
    if (registration?.waiting && !updatePendingRef.current) {
      updatePendingRef.current = true;

      // Отправляем сообщение новому SW для активации
      registration.waiting.postMessage({ type: "SKIP_WAITING" });

      // Создаем Promise для ожидания смены контроллера
      await new Promise<void>((resolve) => {
        const handleControllerChange = () => {
          navigator.serviceWorker.removeEventListener(
            "controllerchange",
            handleControllerChange
          );
          resolve();
        };

        navigator.serviceWorker.addEventListener(
          "controllerchange",
          handleControllerChange
        );

        // Таймаут на всякий случай
        setTimeout(() => {
          resolve();
        }, 5000);
      });

      // Перезагружаем страницу
      window.location.reload();
    }
  }, [registration]);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      console.warn("⚠️ Service Worker не поддерживается");
      return;
    }

    let intervalId: NodeJS.Timeout;

    const registerServiceWorker = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });

        setRegistration(reg);

        // Проверяем состояние текущего SW
        if (reg.waiting) {
          setNeedsRefresh(true);
        }

        if (reg.active) {
          setOfflineReady(true);
          setTimeout(() => setOfflineReady(false), 3000);
        }

        // Слушаем новые установки SW
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;

          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed") {
                // Проверяем, есть ли уже активный контроллер
                if (navigator.serviceWorker.controller) {
                  setNeedsRefresh(true);
                } else {
                  setOfflineReady(true);
                  setTimeout(() => setOfflineReady(false), 3000);
                }
              }
            });
          }
        });

        // Слушаем сообщения от SW
        navigator.serviceWorker.addEventListener("message", (event) => {
          if (event.data && event.data.type === "UPDATE_AVAILABLE") {
            setNeedsRefresh(true);
          }
        });

        // Настраиваем периодическую проверку
        intervalId = setInterval(checkForUpdates, checkInterval);

        // Проверка при фокусе окна
        const handleVisibilityChange = () => {
          if (!document.hidden) {
            checkForUpdates();
          }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("focus", checkForUpdates);

        // Очистка
        return () => {
          clearInterval(intervalId);
          document.removeEventListener(
            "visibilitychange",
            handleVisibilityChange
          );
          window.removeEventListener("focus", checkForUpdates);
        };
      } catch (error) {
        console.error("❌ Ошибка регистрации Service Worker:", error);
      }
    };

    // Ждем загрузки страницы для регистрации
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      registerServiceWorker();
    } else {
      window.addEventListener("load", registerServiceWorker);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [checkInterval, checkForUpdates]);

  return {
    needsRefresh,
    offlineReady,
    updateSW,
    checkForUpdates,
    registration,
  };
};
