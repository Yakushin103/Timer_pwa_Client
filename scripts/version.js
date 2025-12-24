// scripts/version.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Получаем __dirname в ES модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Читаем текущую версию из package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const currentVersion = packageJson.version;

// Увеличиваем patch версию (1.0.0 → 1.0.1)
const versionParts = currentVersion.split('.').map(Number);
versionParts[2] += 1; // Увеличиваем patch
const newVersion = versionParts.join('.');

// Обновляем package.json
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

// Создаем version.json для фронтенда
const versionInfo = {
  version: newVersion,
  buildDate: new Date().toISOString(),
  commit: process.env.GIT_COMMIT || 'manual-build'
};

const versionJsonPath = path.join(__dirname, '..', 'public', 'version.json');
fs.writeFileSync(
  versionJsonPath,
  JSON.stringify(versionInfo, null, 2)
);

// Создаем version.js для Service Worker
const swVersion = `// ⚡ AUTO-GENERATED VERSION FILE ⚡
const APP_VERSION = '${newVersion}';
const BUILD_DATE = '${new Date().toISOString()}';
`;

const swVersionPath = path.join(__dirname, '..', 'public', 'version.js');
fs.writeFileSync(swVersionPath, swVersion);

console.log(`✅ Версия обновлена: ${currentVersion} → ${newVersion}`);