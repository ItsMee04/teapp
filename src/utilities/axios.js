import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8000/api", // ganti sesuai URL Laravel API kamu
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true, // kalau pakai sanctum/cookie
})

// Tambahkan interceptor (opsional, misalnya untuk token)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api
