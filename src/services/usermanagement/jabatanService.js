import api from "@/utilities/axios";

export const jabatanService = {
    /**
     * Mengambil semua data jabatan dari API.
     * @returns {Promise<Array>}
     */
    async getJabatan() {
        try {
            const response = await api.get("/jabatan/getJabatan");
            return response.data.Data; // Asumsi API mengembalikan { data: [...] }
        } catch (error) {
            console.error("Gagal mengambil data jabatan:", error);
            throw error; // Lempar error untuk ditangani di komponen
        }
    },

    // Tambahkan fungsi lain untuk store, update, delete di sini nanti
};