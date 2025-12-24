import { useState, useEffect } from 'react'

import { usePWA } from '../hooks/usePWA'

import '../styles/components/UpdateNotification.scss'

const UpdateNotification: React.FC = () => {
  const { needsRefresh, offlineReady, updateSW } = usePWA()
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    if (needsRefresh || offlineReady) {
      setShowNotification(true)
    }
  }, [needsRefresh, offlineReady])

  const handleUpdate = async () => {
    await updateSW()
    setShowNotification(false)
  }

  const handleClose = () => {
    setShowNotification(false)
  }

  if (!showNotification) return null

  return (
    <>
      {
        ((offlineReady && !needsRefresh) ||
          needsRefresh) &&
        <div className="updated-notification">
          {/* Уведомление об обновлении */}
          {needsRefresh && (
            <div className="needs-refresh">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-white">
                      Доступно обновление!
                    </p>
                    <p className="mt-1 text-sm text-green-200">
                      Новая версия приложения готова к установке.
                    </p>
                    <div className="center">
                      <button
                        onClick={handleUpdate}
                        className="white"
                      >
                        Обновить сейчас
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Уведомление о готовности к оффлайн работе */}
          {offlineReady && !needsRefresh && (
            <div className="needs-refresh">
              <div className="p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-white">
                      Приложение готово к работе оффлайн!
                    </p>
                  </div>
                  <div className="center">
                    <button
                      className="white"
                      onClick={handleClose}
                    >
                      Закрыть
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <style>{`
        @keyframes slide-in {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
        </div>
      }
    </>
  )
}

export default UpdateNotification