import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';

// IMPORTS SEMUA DI SINI
// HANYA IMPORT CSS BOOTSTRAP. JANGAN IMPORT JS BUNDLE-NYA.
import 'bootstrap/dist/css/bootstrap.min.css';

// IMPORT MODUL JAVASCRIPT BOOTSTRAP SECARA SPESIFIK
import { Tooltip, Dropdown, Collapse } from 'bootstrap';

// Library lainnya
import '@fortawesome/fontawesome-free/css/all.min.css';
import feather from 'feather-icons';
import './assets/css/style.css';
import VueSimplebar from 'simplebar-vue';
import 'simplebar-vue/dist/simplebar.min.css';

import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

// Fungsi untuk mengaktifkan semua fitur Bootstrap JS yang dibutuhkan
const activateBootstrapFeatures = () => {
    // Aktifkan Tooltip
    document.querySelectorAll('.tooltip').forEach(tooltip => tooltip.remove());
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(tooltipEl => {
        new Tooltip(tooltipEl);
    });

    // Aktifkan Dropdown
    document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(dropdownEl => {
        new Dropdown(dropdownEl);
    });

    // Aktifkan Collapse
    document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(collapseEl => {
        new Collapse(collapseEl);
    });
};

// Daftarkan mixin untuk Feather Icons & Fitur Bootstrap
// Ini akan memastikan ikon dan fitur aktif setiap kali komponen dimuat atau diperbarui
app.mixin({
    mounted() {
        feather.replace();
        activateBootstrapFeatures();
    },
    updated() {
        feather.replace();
        activateBootstrapFeatures();
    }
});

// Daftarkan plugin
app.component('VueSimplebar', VueSimplebar);
app.use(pinia);
app.use(router);

// Mount aplikasi
app.mount('#app');