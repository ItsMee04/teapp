import axios from "axios";

const api = axios.create({
    // Ganti dengan URL dasar API Laravel kamu
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }, // Penting untuk otentikasi berbasis cookie/session seperti Laravel Sanctum
    withCredentials: true,
});

// Interceptor Permintaan (Request Interceptor)
// Berjalan sebelum setiap permintaan dikirim
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            // Tambahkan token ke header Authorization
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor Respons (Response Interceptor)
// Berjalan setiap kali ada respons dari server
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Jika respons adalah 401 (Unauthorized), hapus token dan alihkan ke login
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login"; // Ganti ini dengan router.push jika ada
        }
        return Promise.reject(error);
    }
);

export default api;
