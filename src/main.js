//CSS TEMPLATE

//BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css'

//FONT AWESOME
import '@fortawesome/fontawesome-free/css/all.min.css'

//FEATHER ICON
import feather from "feather-icons";

import './assets/css/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Import komponen dan CSS VueSimplebar
import VueSimplebar from 'simplebar-vue'; // Perhatikan, impornya dari 'simplebar-vue'
import 'simplebar-vue/dist/simplebar.min.css'; // Perhatikan, CSS-nya dari 'simplebar-vue'

const app = createApp(App)

app.mixin({
    mounted() {
        feather.replace(); // otomatis ganti <i data-feather="icon-name">
    },
    updated() {
        feather.replace();
    }
});
// Ini adalah cara yang benar untuk mendaftarkan plugin VueSimplebar
// agar komponen <vue-simplebar> bisa digunakan di mana saja
app.component('VueSimplebar', VueSimplebar);
app.use(createPinia())
app.use(router)

app.mount('#app')
