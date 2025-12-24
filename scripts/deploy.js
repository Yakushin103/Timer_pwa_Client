// scripts/deploy.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Получаем __dirname в ES модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Начинаю деплой...');

// Читаем конфигурацию (можно вынести в отдельный файл)
const config = {
  server: 'timer.yakushin103.tech',
  user: 'root',
  remotePath: '/var/www/timer-app/www/'
};

try {
  // 1. Увеличиваем версию
  console.log('🔢 Обновление версии...');
  execSync('node scripts/version.js', { stdio: 'inherit' });

  // 2. Собираем проект
  console.log('🔨 Сборка проекта...');
  execSync('npm run build', { stdio: 'inherit' });

  // 3. Читаем новую версию
  const versionInfo = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../public/version.json'), 'utf8')
  );

  console.log(`📦 Версия: ${versionInfo.version}`);
  console.log(`📅 Дата сборки: ${versionInfo.buildDate}`);

  // 4. Проверяем наличие папки dist
  const distPath = path.join(__dirname, '../dist');
  if (!fs.existsSync(distPath)) {
    throw new Error('Папка dist не найдена!');
  }

  // 5. Деплой на сервер (используем rsync - лучше чем scp)
  console.log(`📤 Деплой версии ${versionInfo.version} на сервер...`);
  
  // Создаем команду для rsync (синхронизация с удалением старых файлов)
  const rsyncCommand = `rsync -avz --delete --progress \
    -e "ssh -o StrictHostKeyChecking=no" \
    ${distPath}/ \
    ${config.user}@${config.server}:${config.remotePath}`;

  console.log('Выполняю:', rsyncCommand);
  execSync(rsyncCommand, { stdio: 'inherit' });

  // 6. Копируем version.json отдельно
  const versionFilePath = path.join(__dirname, '../public/version.json');
  const versionSyncCommand = `rsync -avz \
    -e "ssh -o StrictHostKeyChecking=no" \
    ${versionFilePath} \
    ${config.user}@${config.server}:${config.remotePath}`;

  execSync(versionSyncCommand, { stdio: 'inherit' });

  // 7. Проверяем деплой
  console.log('✅ Проверяю деплой...');
  const checkCommand = `ssh ${config.user}@${config.server} \
    "ls -la ${config.remotePath} | head -10 && echo '---' && cat ${config.remotePath}/version.json"`;

  execSync(checkCommand, { stdio: 'inherit' });

  console.log(`\n🎉 Деплой версии ${versionInfo.version} завершен!`);
  console.log(`🌐 Сайт: https://${config.server}`);
  console.log(`🕐 Время: ${new Date().toLocaleTimeString('ru-RU')}`);

} catch (error) {
  console.error('❌ Ошибка при деплое:', error.message);
  console.error('Стек:', error.stack);
  process.exit(1);
}