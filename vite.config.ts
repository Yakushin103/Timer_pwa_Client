import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// import { readFileSync, copyFileSync } from "fs";
// import { join } from "path";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Отключаем автоматическую регистрацию и генерацию SW
      injectRegister: false,
      
      // Не используем workbox вообще
      strategies: 'generateSW', // или просто уберите эту строку
      
      // Минимальный манифест или false
      manifest: {
        name: 'Timer PWA',
        short_name: 'Timer',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      },
      
      // Отключаем генерацию SW через workbox
      workbox: undefined // или просто уберите этот параметр
    })
  ]
})

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: "autoUpdate",

//       // Используем generateSW
//       strategies: "generateSW",

//       // Отключаем стандартный SW
//       injectRegister: false,

//       // strategies: "injectManifest",
//       // srcDir: "public",
//       // filename: "sw.js",

//       includeAssets: ["favicon.ico", "apple-touch-icon.png"],

//       pwaAssets: {
//         disabled: false,
//         config: true,
//       },

//       manifest: {
//         name: "Timer",
//         short_name: "Timer",
//         description: "Timer pwa",
//         theme_color: "#ffffff",
//         display: "standalone",
//         icons: [
//           {
//             src: "/pic.png",
//             sizes: "192x192",
//             type: "image/png",
//           },
//           {
//             src: "/pic.png",
//             sizes: "512x512",
//             type: "image/png",
//           },
//         ],
//       },

//       // Настройки для injectManifest
//       // injectManifest: {
//       //   globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
//       //   injectionPoint: "self.__WB_MANIFEST", // Указываем точку инжекта
//       // },

//       workbox: {
//         globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
//         runtimeCaching: [
//           {
//             urlPattern: /^https:\/\/api\./,
//             handler: "NetworkFirst",
//             options: {
//               cacheName: "api-cache",
//               networkTimeoutSeconds: 10,
//             },
//           },
//         ],
//         cleanupOutdatedCaches: true,
//         clientsClaim: true,
//         skipWaiting: true,
//       },

//       devOptions: {
//         enabled: true,
//         navigateFallback: "index.html",
//         suppressWarnings: true,
//         type: "module",
//       },
//     }),
//   ],
//   build: {
//     outDir: "dist",
//     rollupOptions: {
//       plugins: [
//         {
//           name: "copy-custom-sw",
//           closeBundle() {
//             try {
//               // Копируем ваш SW поверх сгенерированного
//               const swSource = join(__dirname, "public/sw.js");
//               const swDest = join(__dirname, "dist/sw.js");

//               if (
//                 readFileSync(swSource, "utf-8").includes("self.__WB_MANIFEST")
//               ) {
//                 console.log(
//                   "⚠️  В вашем SW есть self.__WB_MANIFEST, используйте injectManifest стратегию"
//                 );
//               }

//               copyFileSync(swSource, swDest);
//               console.log("✅ Кастомный SW скопирован в dist/");
//             } catch (error) {
//               console.warn("⚠️  Не удалось скопировать кастомный SW:");
//             }
//           },
//         },
//       ],
//     },
//   },
//   resolve: {
//     alias: {
//       "virtual:pwa-register": "vite-plugin-pwa",
//     },
//   },
// });
