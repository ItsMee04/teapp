import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import Dashboard from '@/views/Pages/Dashboard.vue'

//MASTER
import Jabatan from '@/views/Pages/Master/Jabatan.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      // Ini rute utama yang akan mengarahkan ke halaman login
      path: '/',
      redirect: '/login', // <-- Tambahkan baris ini
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: '/jabatan',
          name: 'jabatan',
          component: Jabatan
        },
      ]
    }
  ],
})

export default router