import api from "@/utilities/axios";

export const roleService = {
    /**
     * Mengambil semua data role dari API.
     * @returns {Promise<Array>}
     */
    async getRole() {
        try {
            const response = await api.get("/role/getRole");
            return response.data.Data; // Asumsi API mengembalikan { data: [...] }
        } catch (error) {
            console.error("Gagal mengambil data role:", error);
            throw error; // Lempar error untuk ditangani di komponen
        }
    },

    /**
     * Menyimpan data role baru ke API.
     * @param {object} data - Objek yang berisi nama role.
     * @returns {Promise<object>}
     */
    async storeRole(data) {
        try {
            const response = await api.post("/role/storeRole", data);
            return response.data;
        } catch (error) {
            console.error("Gagal menyimpan role:", error.response?.data?.message || error.message);
            throw error;
        }
    },

    async updateRole(id, data) {
        try {
            const response = await api.put(`/role/updateRole/${id}`, data);
            
            if (response.data.success) {
                return response.data;
            } else {
                throw new Error(response.data.message || 'Gagal memperbarui data.');
            }
        } catch (error) {
            throw error;
        }
    },

    // Menghapus data role
    async deleteRole(id) {
        try {
            const response = await api.delete(`/role/deleteRole/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};