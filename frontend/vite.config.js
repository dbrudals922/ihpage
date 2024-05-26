import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { resolve } from 'path'

const licenseContent = `/*!
* vue-fullpage 0.2.13
* https://github.com/alvarotrigo/vue-fullpage.js
*
* @license GPLv3 for open source use only
* or Fullpage Commercial License for commercial use
* http://alvarotrigo.com/fullPage/pricing/
*
* Copyright (C) 2018 http://alvarotrigo.com/fullPage - A project by Alvaro Trigo
*/
`;

export default defineConfig({
  plugins: [vue()],
  build: {
    // lib: {
    //   entry: resolve(__dirname, 'src/index.js'),
    //   name: 'vue-fullpage',
    //   fileName: 'vue-fullpage'
    // },
    outDir: "../backend/src/main/resources/static",
    // rollupOptions: {
    //   external: ["vue"],
    // }
    //   // output: {
    //   //   globals: {
    //   //     vue: 'Vue',
    //   //   },
    //   //   banner: licenseContent
    //   // },
    //   input: {
    //     main: './index.html',
    //   },
    //   server: {
    //     proxy: {
    //       '/api': {
    //         target: 'https://43.200.205.10:80',
    //         // rewrite: (path) => path.replace(/^\/api/, ''),
    //         ws: true,
    //         changeOrigin: true,
    //         secure: false
    //       }
    //     }
    //   }
    // },
    server: {
      proxy: {
        '/api': {
          target: 'https://43.200.205.10:8080',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false,
          ws: true
        }
      }
    }
  },
})
