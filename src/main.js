//CSS TEMPLATE

//BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css'

//FONT AWESOME
import '@fortawesome/fontawesome-free/css/all.min.css'

import './assets/css/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
