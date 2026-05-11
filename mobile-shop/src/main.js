import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './css/Home.css'
import './css/footers.css'
import './css/Header.css'
import './css/Category.css'
import './css/detail.css'
import './css/toast.css'

import { createPinia } from 'pinia'

const pinia = createPinia()

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
})

// toastification
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

//Emitter Config
import mitt from 'mitt'
export const Emitter = mitt()

const app = createApp(App)

app.provide("Emitter" ,Emitter)
app.use(router)
app.use(vuetify)
app.use(pinia)
app.use(Toast, {
  toastDefaults: {
    timeout: 3000,
  },
  containerClassName: "custom-toast-container",
})
app.mount('#app')


