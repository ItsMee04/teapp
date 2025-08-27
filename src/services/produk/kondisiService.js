import api from "@/utilities/axios";

export const kondisiService = {
    /**
     * Mengambil semua data kondisi dari API.
     * @returns {Promise<Array>}
     */
    async getKondisi() {
        try {
            const response = await api.get("/kondisi/getKondisi");
            return response.data.Data; // Asumsi API mengembalikan { data: [...] }
        } catch (error) {
            console.error("Gagal mengambil data kondisi:", error);
            throw error; // Lempar error untuk ditangani di komponen
        }
    },

    /**
     * Menyimpan data kondisi baru ke API.
     * @param {object} data - Objek yang berisi nama kondisi.
     * @returns {Promise<object>}
     */
    async storeKondisi(data) {
        try {
            const response = await api.post("/kondisi/storeKondisi", data);
            return response.data;
        } catch (error) {
            console.error("Gagal menyimpan kondisi:", error.response?.data?.message || error.message);
            throw error;
        }
    },

    async updateKondisi(id, data) {
        try {
            const response = await api.put(`/kondisi/updateKondisi/${id}`, data);
            
            if (response.data.success) {
                return response.data;
            } else {
                throw new Error(response.data.message || 'Gagal memperbarui data.');
            }
        } catch (error) {
            throw error;
        }
    },

    // Menghapus data kondisi
    async deleteKondisi(id) {
        try {
            const response = await api.delete(`/kondisi/deleteKondisi/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};