<template>
    <div>
        <div class="content container-fluid">
            <div class="page-header">
                <div class="add-item d-flex">
                    <div class="page-title">
                        <h4>HALAMAN USER</h4>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb breadcrumb-pipe">
                                <li class="breadcrumb-item"><a href="#">User Management</a></li>
                                <li class="breadcrumb-item active" aria-current="page">User</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <ul class="table-top-head">
                    <li>
                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh" @click="fetchUsersData">
                            <i data-feather="rotate-ccw" class="feather-rotate-ccw"></i>
                        </a>
                    </li>
                    <li>
                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="Collapse" id="collapse-header"
                            @click="toggleHeaderCollapse" :class="{ 'active': isHeaderCollapsed }">
                            <i data-feather="chevron-up" class="feather-chevron-up"></i>
                        </a>
                    </li>
                </ul>
            </div>

            <div class="row">
                <div class="card">
                    <div class="card-header justify-content-between">
                        <div class="card-title">
                            <div class="search-set">
                                <div class="search-input">
                                    <input type="text" class="form-control" placeholder="Search ..."
                                        v-model="searchQuery">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table text-nowrap table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Pegawai</th>
                                        <th scope="col">Role</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="paginatedData.length === 0">
                                        <td colspan="6" class="text-center">Tidak ada data.</td>
                                    </tr>
                                    <tr v-else v-for="(item, index) in paginatedData" :key="index">
                                        <th scope="row">{{ startIndex + index + 1 }}</th>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div>
                                                    <div class="lh-1">
                                                        <span>{{ item.pegawai.nama }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span :class="['badge', item.role_class]">
                                                <i class="ri-check-fill align-middle me-1"></i>{{ item.role_label }}
                                            </span>
                                        </td>
                                        <td>
                                            <span :class="['badge', item.email_class]">
                                                <i class="ri-check-fill align-middle me-1"></i>{{ item.email_label }}
                                            </span>
                                        </td>
                                        <td>
                                            <span :class="['badge', item.status_class]">
                                                <i class="ri-check-fill align-middle me-1"></i>{{ item.status_label }}
                                            </span>
                                        </td>
                                        <td class="action-table-data">
                                            <div class="edit-delete-action">
                                                <a href="#" class="me-2 edit-icon p-2" data-bs-toggle="tooltip"
                                                    data-bs-target="#editUserModal" title="Edit"
                                                    @click.prevent="openEditModal(item)">
                                                    <i data-feather="edit" class="feather-edit"></i>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <nav aria-label="Page navigation">
                            <ul class="pagination justify-content-end mb-3 mt-3">
                                <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                                    <a class="page-link" href="javascript:void(0);"
                                        @click.prevent="prevPage">Previous</a>
                                </li>

                                <li class="page-item" v-for="page in totalPages" :key="page"
                                    :class="{ 'active': currentPage === page }">
                                    <a class="page-link" href="javascript:void(0);" @click.prevent="goToPage(page)">{{
                                        page }}</a>
                                </li>

                                <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                                    <a class="page-link" href="javascript:void(0);" @click.prevent="nextPage">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>

        <Teleport to="body">
            <div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="editUserModal" aria-hidden="true"
                data-bs-backdrop="static" data-bs-keyboard="false">
                <div class="modal-dialog modal-dialog-centered custom-modal-two">
                    <div class="modal-content">
                        <div class="page-wrapper-new p-0">
                            <div class="content">
                                <div class="modal-header border-0 custom-modal-header">
                                    <div class="page-title">
                                        <h4>EDIT USER</h4>
                                    </div>
                                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body custom-modal-body">
                                    <form @submit.prevent="handleEditUser">
                                        <div class="mb-3">
                                            <label for="editPegawai" class="form-label">Pegawai</label>
                                            <input type="text" class="form-control" id="editPegawai"
                                                v-model="editForm.pegawai" readonly>
                                        </div>
                                        <div class="mb-3">
                                            <label for="editEmail" class="form-label">Email</label>
                                            <input type="text" class="form-control" id="editEmail"
                                                v-model="editForm.email" :class="{ 'is-invalid': editErrors.email }">
                                            <div class="invalid-feedback" v-if="editErrors.email">
                                                {{ editErrors.email }}
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="editPassword" class="form-label">Password</label>
                                            <div class="pass-group">
                                                <!-- Pastikan ini memiliki position: relative; di CSS -->
                                                <input :type="showPassword ? 'text' : 'password'"
                                                    v-model="editForm.password" class="form-control"
                                                    placeholder="Masukkan password" id="editPassword"
                                                    :class="{ 'is-invalid': editErrors.password }" />

                                                <div class="invalid-feedback" v-if="editErrors.password">
                                                    {{ editErrors.password }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Role<span
                                                    class="text-danger ms-1">*</span></label>
                                            <div :class="{ 'is-invalid': editErrors.role }">
                                                <VueMultiselect v-model="editForm.role" :options="roleList"
                                                    :allow-empty="false" :preselect-first="true" :searchable="true"
                                                    placeholder="Pilih Role" label="role" track-by="id"
                                                    :class="{ 'is-invalid': editErrors.role }">
                                                </VueMultiselect>
                                            </div>
                                            <div class="invalid-feedback" v-if="editErrors.role">
                                                {{ editErrors.role }}
                                            </div>
                                        </div>
                                        <div class="modal-footer-btn">
                                            <button type="button" class="btn btn-warning me-2"
                                                data-bs-dismiss="modal">Batal</button>
                                            <button type="submit" class="btn btn-secondary">Simpan Role</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import feather from 'feather-icons';
import { userService } from '@/services/usermanagement/userService';
import { showToast } from "@/utilities/toastfy";
import { initTooltips } from '@/utilities/tooltip';
import { Modal } from 'bootstrap';
import VueMultiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';
import { roleService } from '@/services/usermanagement/roleService'; // <-- TAMBAHKAN INI

// ===================================
// STATE
// ===================================

const roleList = ref([]);
const allData = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(5);
const searchQuery = ref('');
const isHeaderCollapsed = ref(false);

// State untuk form modal Edit User
const editForm = ref({
    id: null,
    pegawai: '', // Nama pegawai, akan diisi dari user.pegawai.nama
    email: '',
    password: '', // Input password baru (kosong secara default)
    role: null, // Objek role yang dipilih dari roleList
});

const editErrors = ref({});
const showPassword = ref(false);

// ===================================
// FUNGSI UTAMA
// ===================================

const fetchUsersData = async () => {
    try {
        const responseData = await userService.getUsers();
        allData.value = responseData.map(user => ({
            ...user,
            role_label: user.role ? user.role.role : 'Role belum dipilih',
            role_class: user.role ? (user.role.id === 1 ? 'bg-soft-primary' : 'bg-soft-secondary') : 'bg-soft-danger',
            email_label: user.email ? user.email : 'Belum Ada Email',
            email_class: user.email ? 'bg-soft-secondary' : 'bg-soft-danger',
            status_label: user.status === 1 ? 'Aktif' : 'Tidak Aktif',
            status_class: user.status === 1 ? 'bg-soft-success' : 'bg-soft-danger'
        }));
    } catch (error) {
        console.error('Gagal memuat data pengguna dari API:', error);
        showToast('Gagal memuat data pengguna.', 'error');
    }
};

// Fungsi untuk mengambil daftar role dari API menggunakan roleService
const fetchRolesList = async () => {
    try {
        const response = await roleService.getRole(); // <-- MENGGUNAKAN roleService
        roleList.value = response; // Asumsi roleService.getRoles() langsung mengembalikan array data role
    } catch (error) {
        console.error('Gagal memuat daftar role:', error);
        showToast('Gagal memuat daftar role.', 'error');
    }
};

const openEditModal = (userItem) => {
    editForm.value.id = userItem.id;
    editForm.value.pegawai = userItem.pegawai ? userItem.pegawai.nama : 'N/A';
    // --- PERBAIKAN DI SINI ---
    // Pastikan email selalu string, bahkan jika userItem.email adalah null
    editForm.value.email = userItem.email || '';
    // --- AKHIR PERBAIKAN ---
    editForm.value.password = ''; // Selalu reset password menjadi string kosong
    // Temukan objek role yang cocok dari roleList
    editForm.value.role = roleList.value.find(role => role.id === userItem.role_id) || null;

    editErrors.value = {}; // Reset error validasi
    showPassword.value = false; // Reset toggle password

    const modalElement = document.getElementById('editUserModal');
    const modal = new Modal(modalElement);
    modal.show();
};

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const validateEditForm = () => {
    editErrors.value = {};
    let isValid = true;

    if (!editForm.value.email.trim()) {
        editErrors.value.email = 'Email wajib diisi.';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.value.email.trim())) {
        editErrors.value.email = 'Format email tidak valid.';
        isValid = false;
    }

    // Validasi Password (wajib diisi dan minimal 6 karakter)
    if (!editForm.value.password.trim()) {
        editErrors.value.password = 'Password wajib diisi.';
        isValid = false;
    } else if (editForm.value.password.trim().length < 6) {
        editErrors.value.password = 'Password minimal 6 karakter.';
        isValid = false;
    }

    if (!editForm.value.role) {
        editErrors.value.role = 'Role wajib dipilih.';
        isValid = false;
    }

    return isValid;
};

const handleEditUser = async () => {
    if (!validateEditForm()) {
        showToast('Mohon periksa kembali input Anda!', 'error');
        return;
    }

    const userData = {
        email: editForm.value.email,
        password: editForm.value.password.trim() ? editForm.value.password : undefined,
        role: editForm.value.role ? editForm.value.role.id : null, // Kirim role_id
    };

    try {
        await userService.updateUsers(editForm.value.id, userData);
        showToast('Data pengguna berhasil diperbarui!', 'success');
        const modalElement = document.getElementById('editUserModal');
        const modal = Modal.getInstance(modalElement);
        if (modal) {
            modal.hide();
        }
        fetchUsersData();
    } catch (error) {
        if (error.response?.data?.errors) {
            editErrors.value = error.response.data.errors;
            showToast('Gagal memperbarui data. Mohon periksa kembali formulir.', 'error');
        } else if (error.response?.data?.message) {
            showToast(error.response.data.message, 'error');
        } else {
            console.error('Terjadi kesalahan saat memperbarui data pengguna:', error);
            showToast('Terjadi kesalahan saat memperbarui data pengguna.', 'error');
        }
    }
};

// ===================================
// COMPUTED PROPERTIES (untuk tabel)
// ===================================

const filteredData = computed(() => {
    if (!searchQuery.value) return allData.value;
    const query = searchQuery.value.toLowerCase();
    return allData.value.filter(item =>
        item.pegawai.nama.toLowerCase().includes(query) ||
        (item.email && item.email.toLowerCase().includes(query)) ||
        (item.role && item.role.role.toLowerCase().includes(query))
    );
});
const totalItems = computed(() => filteredData.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
const endIndex = computed(() => startIndex.value + itemsPerPage.value);
const paginatedData = computed(() => filteredData.value.slice(startIndex.value, endIndex.value));

// ===================================
// METODE NAVIGASI (untuk pagination)
// ===================================

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};
const prevPage = () => goToPage(currentPage.value - 1);
const nextPage = () => goToPage(currentPage.value + 1);

// ===================================
// LIFECYCLE HOOKS & WATCHER
// ===================================

const renderFeatherIcons = () => feather.replace();
const toggleHeaderCollapse = () => isHeaderCollapsed.value = !isHeaderCollapsed.value;

onMounted(() => {
    fetchUsersData();
    fetchRolesList();
    renderFeatherIcons();
    initTooltips();

    const editModal = document.getElementById('editUserModal');
    if (editModal) {
        editModal.addEventListener('hidden.bs.modal', () => {
            editForm.value = {
                id: null,
                pegawai: '',
                email: '',
                password: '',
                role: null,
            };
            editErrors.value = {};
            showPassword.value = false;
        });
    }
});

watch(paginatedData, () => {
    renderFeatherIcons();
    initTooltips();
});
watch(searchQuery, () => currentPage.value = 1);
watch(isHeaderCollapsed, (newValue) => {
    if (newValue) {
        document.body.classList.add('header-collapse');
    } else {
        document.body.classList.remove('header-collapse');
    }
});
</script>
<style>
</style>