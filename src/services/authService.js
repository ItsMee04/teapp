import api from "@/utilities/axios";

export const authService = {
    async login(credentials) {
        try {
            const response = await api.post("/login", credentials);
            const { access_token, user } = response.data;

            if (access_token) {
                localStorage.setItem("token", access_token);
                localStorage.setItem("user", JSON.stringify(user));
            }
            return response.data;
        } catch (error) {
            console.error("Login gagal:", error.response?.data?.message || error.message);
            throw error;
        }
    },

    async logout() {
        try {
            await api.post("/logout");
        } catch (error) {
            console.error("Logout gagal di server:", error.response?.data?.message || error.message);
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    },

    async me() {
        try {
            const response = await api.get("/me");
            const userData = response.data.user;
            // Update data user di localStorage (opsional, untuk memastikan data selalu terbaru)
            localStorage.setItem("user", JSON.stringify(userData));
            return userData;
        } catch (error) {
            this.logout();
            throw error;
        }
    },

    /**
     * Mengecek apakah user sudah login
     * @returns {boolean}
     */
    isLoggedIn() {
        return !!localStorage.getItem("token");
    },

    /**
     * Mengambil data user dari localStorage
     * @returns {object|null}
     */
    getCurrentUser() {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    },
};