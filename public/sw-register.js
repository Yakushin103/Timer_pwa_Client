// public/sw-register.js
console.log('🚀 Регистрация Service Worker...');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    })
    .then(registration => {
      console.log('✅ SW зарегистрирован успешно:', registration.scope);
      
      // Проверяем обновления каждые 5 минут
      setInterval(() => {
        registration.update();
        console.log('🔍 Проверка обновлений SW...');
      }, 5 * 60 * 1000);
      
      // Проверяем если уже есть ожидающий SW
      if (registration.waiting) {
        console.log('🔄 Есть ожидающий SW - обновление доступно!');
        window.dispatchEvent(new CustomEvent('sw-update-available'));
      }
    })
    .catch(error => {
      console.error('❌ Ошибка регистрации SW:', error);
    });
  });
}