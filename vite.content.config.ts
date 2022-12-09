/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { r } from './vite.config'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import eslintPlugin from 'vite-plugin-eslint'
import stylelintPlugin from 'vite-plugin-stylelint'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import { __DEV__, outputDir } from './const'
import { replaceCodePlugin } from 'vite-plugin-replace'
import hotReloadContent from './scripts/hot-reload/content'

export default defineConfig({
  root: r('src'),
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vitest'],
      dts: false,
    }),
    eslintPlugin({
      exclude: ['./node_modules/**'],
      cache: false,
    }),
    stylelintPlugin({
      fix: true,
      quiet: true,
    }),
    ViteEjsPlugin(config => ({
      CONFIG: config,
    })),
    replaceCodePlugin({
      replacements: [
        {
          from: /:root\{/g,
          to: ':host{',
        },
      ],
    }),
    hotReloadContent(),
  ],
  resolve: {
    alias: {
      '@': r('src'),
    },
  },
  envDir: r('env'),
  envPrefix: ['VITE_'],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/index.scss";',
      },
    },
  },
  build: {
    watch: __DEV__ ? {} : null,
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: false,
    outDir: r(`${outputDir}/contentScript`),
    rollupOptions: {
      input: {
        contentScript: r('src/contentScript/index.ts'),
      },
      output: {
        assetFileNames: '[name].[ext]',
        entryFileNames: 'index.js',
        extend: true,
        format: 'iife',
      },
    },
  },
  // esbuild: {
  //   drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  // },
  define: {
    'import.meta.vitest': 'undefined',
    __DEV__,
  },
  test: { includeSource: ['src/**/*.{js,ts}'] },
})
