import api from "@/utilities/axios";

export const diskonService = {
    /**
     * Mengambil semua data diskon dari API.
     * @returns {Promise<Array>}
     */
    async getDiskon() {
        try {
            const response = await api.get("/diskon/getDiskon");
            return response.data.Data; // Asumsi API mengembalikan { data: [...] }
        } catch (error) {
            console.error("Gagal mengambil data diskon:", error);
            throw error; // Lempar error untuk ditangani di komponen
        }
    },

    /**
     * Menyimpan data diskon baru ke API.
     * @param {object} data - Objek yang berisi nama diskon.
     * @returns {Promise<object>}
     */
    async storeDiskon(data) {
        try {
            const response = await api.post("/diskon/storeDiskon", data);
            return response.data;
        } catch (error) {
            console.error("Gagal menyimpan diskon:", error.response?.data?.message || error.message);
            throw error;
        }
    },

    async updateDiskon(id, data) {
        try {
            const response = await api.put(`/diskon/updateDiskon/${id}`, data);
            
            if (response.data.success) {
                return response.data;
            } else {
                throw new Error(response.data.message || 'Gagal memperbarui data.');
            }
        } catch (error) {
            throw error;
        }
    },

    // Menghapus data diskon
    async deleteDiskon(id) {
        try {
            const response = await api.delete(`/diskon/deleteDiskon/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};