import api from "@/utilities/axios";

export const authService = {
    async login(credentials) {
        const response = await api.post("/login", credentials)
        return response.data
    },

    async logout() {
        const response = await api.post("/logout")
        localStorage.removeItem("token")
        return response.data
    },

    async me() {
        const response = await api.get("/me")
        return response.data
    },
}