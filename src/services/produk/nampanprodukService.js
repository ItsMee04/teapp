import api from "@/utilities/axios";

export const nampanprodukService = {
    /**
         * Mengambil data nampan berdasarkan ID dari API.
         * @param {number} id - ID nampan yang akan diambil.
         * @returns {Promise<Object>} Data nampan atau error.
         */
    async getNampanProduk(id) {
        try {
            const response = await api.get(`/nampanProduk/getNampanProduk/${id}`); // Menggunakan endpoint /api/nampan/{id}
            return response.data;
        } catch (error) {
            console.error(`Error fetching nampan with ID ${id}:`, error);
            throw error;
        }
    },

    /**
         * Mengambil data nampan berdasarkan ID dari API.
         * @param {number} id - ID nampan yang akan diambil.
         * @returns {Promise<Object>} Data nampan atau error.
         */
    async getProduk(id) {
        try {
            const response = await api.get(`/nampanProduk/getProdukNampan/${id}`); // Menggunakan endpoint /api/nampan/{id}
            return response.data;
        } catch (error) {
            console.error(`Error fetching nampan with ID ${id}:`, error);
            throw error;
        }
    },

     /**
     * Memperbarui data jenis yang sudah ada di API.
     * @param {number} id ID jenis yang akan diperbarui.
     * @param {FormData} formData Objek FormData yang berisi data yang diperbarui.
     * @returns {Promise<Object>}
     */
    async storeProdukNampan(id, formData) {
        try {
            // Menggunakan method POST dengan header method override untuk PUT
            const response = await api.post(`/nampanProduk/storeProdukNampan/${id}`,formData);
            return response.data;
        } catch (error) {
            console.error("Gagal memperbarui data jenis:", error.response?.data);
            throw error;
        }
    },
}