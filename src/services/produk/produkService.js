// src/services/usermanagement/produkService.js
import api from "@/utilities/axios";

export const produkService = {
    /**
     * Mengambil semua data produk dari API.
     * @returns {Promise<Array>}
     */
    async getProduk() {
        try {
            const response = await api.get("/produk/getProduk");
            return response.data.Data;
        } catch (error) {
            console.error("Gagal mengambil data produk:", error);
            throw error;
        }
    },

    /**
     * Menyimpan data produk baru ke API.
     * @param {FormData} formData Objek FormData yang berisi data produk.
     * @returns {Promise<Object>}
     */
    async storeProduk(formData) {
        try {
            const response = await api.post("/produk/storeProduk", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Gagal menyimpan data produk:", error.response?.data);
            throw error;
        }
    },

    /**
     * Memperbarui data produk yang sudah ada di API.
     * @param {number} id ID produk yang akan diperbarui.
     * @param {FormData} formData Objek FormData yang berisi data yang diperbarui.
     * @returns {Promise<Object>}
     */
    async updateProduk(id, formData) {
        try {
            // Menggunakan method POST dengan header method override untuk PUT
            formData.append("_method", "PUT");
            const response = await api.post(
                `/produk/updateProduk/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Gagal memperbarui data produk:", error.response?.data);
            throw error;
        }
    },

    /**
     * Menghapus data produk berdasarkan ID.
     * @param {number} id ID produk yang akan dihapus.
     * @returns {Promise<Object>}
     */
    async deleteProduk(id) {
        try {
            const response = await api.delete(`/produk/deleteProduk/${id}`);
            return response.data;
        } catch (error) {
            console.error("Gagal menghapus data produk:", error.response?.data);
            throw error;
        }
    },
};
