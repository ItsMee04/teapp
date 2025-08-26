import api from "@/utilities/axios";

export const pegawaiService = {
    /**
     * Mengambil semua data jabatan dari API.
     * @returns {Promise<Array>}
     */
    async getPegawai() {
        try {
            const response = await api.get("/pegawai/getPegawai");
            return response.data.Data; // Asumsi API mengembalikan { data: [...] }
        } catch (error) {
            console.error("Gagal mengambil data jabatan:", error);
            throw error; // Lempar error untuk ditangani di komponen
        }
    },
}