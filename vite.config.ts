import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import { createHtmlPlugin } from 'vite-plugin-html'
import viewport from 'postcss-mobile-forever'
import autoprefixer from 'autoprefixer'
import dayjs from 'dayjs'
import path from 'path'

// 版本号（按打包时间生成）
process.env.VITE_VERSION = dayjs().format('YYYYMMDDHH')

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.')

  return {
    base: '/million-roulette/',
    plugins: [
      legacy({
        targets: ['defaults', 'last 100 versions', 'not IE 11'],
      }),
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => ['marquee'].includes(tag),
          }
        }
      }),
      createHtmlPlugin({
        minify: true,
        entry: '/src/main.ts',
        template: 'public/index.html',
      }),
    ],
    css: {
      postcss: {
        plugins: [
          autoprefixer(),
          viewport({
            appSelector: '#app',
            viewportWidth: 375,
            maxDisplayWidth: 640,
            border: true,
          }),
        ],
      }
    },
    server: {
      open: true,
      host: '0.0.0.0',
      port: 3000,
    },
    define: {
      'process.env': {
        ...env,
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: ['prod'].includes(env.VITE_ENV),
          drop_debugger: ['prod'].includes(env.VITE_ENV),
        },
        format: {
          comments: false
        },
      }
    }
  }
})
