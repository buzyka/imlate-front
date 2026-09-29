import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index.js'
import { installAuthLifecycle } from './services/api.js'
import { useAuthStore } from './stores/auth.js'
import './assets/styles/global.css'

const app = createApp(App)
app.use(createPinia())
useAuthStore().startSessionSync()
installAuthLifecycle()
app.use(router)
app.use(ElementPlus)
app.mount('#app')