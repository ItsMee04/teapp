import api from "@/utilities/axios"; // Mengimpor instance axios yang telah dikonfigurasi

export const nampanService = {
    /**
     * Mengambil semua data nampan dari API.
     * @returns {Promise<Object>} Data nampan atau error.
     */
    async getNampan() {
        try {
            const response = await api.get('/nampan/getNampan'); // Menggunakan endpoint /api/nampan
            return response.data.Data;
        } catch (error) {
            console.error('Error fetching all nampans:', error);
            throw error; // Meneruskan error untuk ditangani di komponen
        }
    },

    /**
     * Mengambil data nampan berdasarkan ID dari API.
     * @param {number} id - ID nampan yang akan diambil.
     * @returns {Promise<Object>} Data nampan atau error.
     */
    async getNampanById(id) {
        try {
            const response = await api.get(`/nampan/${id}`); // Menggunakan endpoint /api/nampan/{id}
            return response.data;
        } catch (error) {
            console.error(`Error fetching nampan with ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * Membuat nampan baru melalui API.
     * @param {Object} data - Objek yang berisi data nampan baru (jenis, nampan).
     * @returns {Promise<Object>} Respon dari API atau error.
     */
    async storeNampan(data) {
        try {
            const response = await api.post('/nampan/storeNampan', data); // Menggunakan endpoint /api/nampan
            return response.data.Data;
        } catch (error) {
            console.error('Error creating nampan:', error.response ? error.response.data : error.message);
            throw error;
        }
    },

    /**
     * Memperbarui nampan yang sudah ada melalui API.
     * @param {number} id - ID nampan yang akan diperbarui.
     * @param {Object} data - Objek yang berisi data nampan yang diperbarui (jenis, nampan).
     * @returns {Promise<Object>} Respon dari API atau error.
     */
    async updateNampan(id, data) {
        try {
            const response = await api.put(`/nampan/updateNampan/${id}`, data); // Menggunakan endpoint /api/nampan/{id}
            return response.data;
        } catch (error) {
            console.error(`Error updating nampan with ID ${id}:`, error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // Anda dapat menambahkan metode lain di sini, misalnya untuk menghapus nampan
    /*
    async delete(id) {
        try {
            const response = await api.delete(`/nampan/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting nampan with ID ${id}:`, error.response ? error.response.data : error.message);
            throw error;
        }
    }
    */
};
