import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import Dashboard from '@/views/Pages/Dashboard.vue'

//MASTER
import Jabatan from '@/views/Pages/Master/Jabatan.vue'
import Pegawai from '@/views/Pages/Master/Pegawai.vue'
import Role from '@/views/Pages/Master/Role.vue'
import User from '@/views/Pages/Master/User.vue'

import Kondisi from '@/views/Pages/Master/Kondisi.vue'
import Diskon from '@/views/Pages/Master/Diskon.vue'
import Jenis from '@/views/Pages/Master/Jenis.vue'
import Produk from '@/views/Pages/Master/Produk.vue'

// SERVICE
import { authService } from "@/services/authService.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/',
      component: MainLayout,
      meta: { requiresAuth: true },
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
        {
          path: '/pegawai',
          name: 'pegawai',
          component: Pegawai
        },
        {
          path: '/role',
          name: 'role',
          component: Role
        },
        {
          path: '/user',
          name: 'user',
          component: User
        },
        {
          path: '/kondisi',
          name: 'kondisi',
          component: Kondisi
        },
        {
          path: '/diskon',
          name: 'diskon',
          component: Diskon
        },
        {
          path: '/jenisproduk',
          name: 'jenis',
          component: Jenis
        },
        {
          path: '/produk',
          name: 'produk',
          component: Produk
        },
      ]
    }
  ],
})

// Middleware (Navigation Guard)
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = authService.isLoggedIn(); // Mengecek token di localStorage

  // Jika rute yang dituju memerlukan otentikasi
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      // Jika tidak ada token, alihkan ke login
      next('/login');
    } else {
      // Jika ada token, verifikasi dengan endpoint /me
      try {
        await authService.me();
        next(); // Token valid, lanjutkan
      } catch (error) {
        // Token tidak valid atau kedaluwarsa, hapus token dan alihkan ke login
        authService.logout();
        next('/login');
      }
    }
  }
  // Jika rute yang dituju adalah halaman login
  else if (to.name === 'login') {
    if (isAuthenticated) {
      // Jika sudah ada token, verifikasi
      try {
        await authService.me();
        next('/dashboard'); // Token valid, alihkan ke dashboard
      } catch (error) {
        // Token tidak valid, lanjutkan ke login
        authService.logout();
        next();
      }
    } else {
      next(); // Tidak ada token, lanjutkan ke login
    }
  }
  // Untuk rute lain yang tidak terproteksi
  else {
    next();
  }
});

export default router;