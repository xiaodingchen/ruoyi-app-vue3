import { createSSRApp } from 'vue'
import uviewPlus from 'uview-plus'
import App from './App.vue'
import store from "@/store";
import plugins from '@/plugins'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(plugins)
  app.use(uviewPlus)
  return {
    app,
  }
}
