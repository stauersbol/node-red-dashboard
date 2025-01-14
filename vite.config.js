import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

import manifest from './manifest.json'

/**
 * Vite is used to build the UI for the dashboard,
 * is is not used for the nodes themselves.
 */

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js'
        }
    },
    plugins: [vue(),
        VitePWA({
            strategies: 'injectManifest',
            srcDir: 'src',
            filename: 'sw.js',
            registerType: 'prompt',
            injectRegister: false,

            manifest,

            injectManifest: {
                maximumFileSizeToCacheInBytes: 3000000,
                globPatterns: ['**/*.{js,css,html,svg,png,ico,ttf,eot,woff,woff2}']
            },

            devOptions: {
                enabled: false,
                navigateFallback: 'index.html',
                suppressWarnings: true,
                type: 'module'
            }
        })
    ],
    root: 'ui',
    build: {
        // Generate a source map in dev mode
        sourcemap: process.env.NODE_ENV === 'development',
        outDir: '../dist',
        emptyOutDir: true
    },
    base: './'
})
