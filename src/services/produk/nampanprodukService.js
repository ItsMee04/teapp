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
}