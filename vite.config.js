import { fileURLToPath, URL } from 'node:url'

import {defineConfig, loadEnv} from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig(({mode, command})=>{
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_BASE_URL, VITE_APP_PORT } = env
  const port = VITE_APP_PORT || 10086 // 端口

  return {
    root: process.cwd(),
    base: VITE_APP_BASE_URL,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // vite 相关配置
    server: {
      port: port,
      host: true,
      open: true,
    },
    plugins: [
      uni(),
    ],
  }
})


