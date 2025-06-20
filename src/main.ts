import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import router from './router'

import { plugin as Formkit, defaultConfig } from '@formkit/vue'
import config from '../formkit.config.ts'
import '@formkit/themes/genesis'

const app = createApp(App)
app.use(router).use(Formkit, defaultConfig(config))
app.use(createPinia())
app.mount('#app')
