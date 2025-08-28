<template>
    <div>
        <div class="content container-fluid">
            <div class="page-header">
                <div class="add-item d-flex">
                    <div class="page-title">
                        <h4>HALAMAN NAMPAN / BAKI</h4>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb breadcrumb-pipe">
                                <li class="breadcrumb-item"><a href="#">Produk</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Nampan / Baki</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <ul class="table-top-head">
                    <li>
                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh" @click="fetchDataFromApi">
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
                <div class="page-btn import">
                    <a href="#" class="btn btn-added color" data-bs-toggle="modal" data-bs-target="#tambahNampanModal">
                        <i data-feather="plus-circle" class="me-2"></i>
                        Tambah Nampan / Baki
                    </a>
                </div>
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
                                        <th scope="col">Nampan / Baki</th>
                                        <th scope="col">Jenis</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="paginatedData.length === 0">
                                        <td colspan="5" class="text-center">Tidak ada data.</td>
                                    </tr>
                                    <tr v-else v-for="(item, index) in paginatedData" :key="index">
                                        <th scope="row">{{ startIndex + index + 1 }}</th>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div>
                                                    <div class="lh-1">
                                                        <span>{{ item.nampan }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div>
                                                    <div class="lh-1">
                                                        <span>{{ item.jenis_produk.jenis_produk }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span :class="['badge', item.status_class]">
                                                <i class="ri-check-fill align-middle me-1"></i>{{ item.status_label }}
                                            </span>
                                        </td>
                                        <td class="action-table-data">
                                            <div class="edit-delete-action">
                                                <a href="#" class="me-2 edit-icon p-2" data-bs-toggle="tooltip"
                                                    data-bs-target="#ViewModal" title="View"
                                                    @click.prevent="openViewModal(item)">
                                                    <i data-feather="eye" class="action-eye"></i>
                                                </a>

                                                <a href="#" class="me-2 edit-icon p-2" data-bs-toggle="tooltip"
                                                    data-bs-target="#editModal" title="Edit"
                                                    @click.prevent="openEditModal(item)">
                                                    <i data-feather="edit" class="feather-edit"></i>
                                                </a>

                                                <a class="confirm-text p-2" data-bs-toggle="tooltip" title="Hapus"
                                                    @click.prevent="handleDeleteRole(item.id)">
                                                    <i data-feather="trash-2" class="feather-trash-2"></i>
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
            <div class="modal fade" id="tambahNampanModal" tabindex="-1" aria-labelledby="tambahNampanModalLabel"
                aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div class="modal-dialog modal-dialog-centered custom-modal-two">
                    <div class="modal-content">
                        <div class="page-wrapper-new p-0">
                            <div class="content">
                                <div class="modal-header border-0 custom-modal-header">
                                    <div class="page-title">
                                        <h4>TAMBAH NAMPAN</h4>
                                    </div>
                                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body custom-modal-body">
                                    <form @submit.prevent="handleStoreNampan">
                                        <div class="mb-3">
                                            <label for="namaNampan" class="form-label">Nampan / Baki</label>
                                            <input type="text" class="form-control" id="namaNampan"
                                                v-model="form.nampan" :class="{ 'is-invalid': errors.nampan }">
                                            <div class="invalid-feedback" v-if="errors.nampan">
                                                {{ errors.nampan }}
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Jenis<span
                                                    class="text-danger ms-1">*</span></label>
                                            <div :class="{ 'is-invalid': errors.jenis }">
                                                <VueMultiselect v-model="form.jenis" :options="jenisList"
                                                    :allow-empty="false" :preselect-first="true" :searchable="true"
                                                    placeholder="Pilih Jenis" label="jenis_produk" track-by="id"
                                                    :class="{ 'is-invalid': errors.jenis }">
                                                </VueMultiselect>
                                            </div>
                                            <div class="invalid-feedback" v-if="errors.jenis">
                                                {{ errors.jenis }}
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

        <Teleport to="body">
            <div class="modal fade" id="editNampanModal" tabindex="-1" aria-labelledby="editNampanModalLabel"
                aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div class="modal-dialog modal-dialog-centered custom-modal-two">
                    <div class="modal-content">
                        <div class="page-wrapper-new p-0">
                            <div class="content">
                                <div class="modal-header border-0 custom-modal-header">
                                    <div class="page-title">
                                        <h4>EDIT NAMPAN</h4>
                                    </div>
                                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body custom-modal-body">
                                    <form @submit.prevent="handleEditNampan">
                                        <div class="mb-3">
                                            <label for="namaNampan" class="form-label">Nampan / Baki</label>
                                            <input type="text" class="form-control" id="namaNampan"
                                                v-model="editForm.nampan" :class="{ 'is-invalid': editErrors.nampan }">
                                            <div class="invalid-feedback" v-if="editErrors.nampan">
                                                {{ editErrors.nampan }}
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Jenis<span
                                                    class="text-danger ms-1">*</span></label>
                                            <div :class="{ 'is-invalid': editErrors.jenis }">
                                                <VueMultiselect v-model="editForm.jenis" :options="jenisList"
                                                    :allow-empty="false" :preselect-first="true" :searchable="true"
                                                    placeholder="Pilih Jenis" label="jenis_produk" track-by="id"
                                                    :class="{ 'is-invalid': editErrors.jenis }">
                                                </VueMultiselect>
                                            </div>
                                            <div class="invalid-feedback" v-if="editErrors.jenis">
                                                {{ editErrors.jenis }}
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
import { jenisService } from '@/services/produk/jenisService';
import { nampanService } from '@/services/produk/nampanService';
import { showToast } from "@/utilities/toastfy";
import { initTooltips } from '@/utilities/tooltip';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import VueMultiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';

// ===================================
// STATE
// ===================================
const jenisList = ref([]);
const allData = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(5);
const searchQuery = ref('');
const isHeaderCollapsed = ref(false);
const form = ref({
    nampan: '',
    jenis: '',
});
const editForm = ref({
    id: null,
    nampan: '',
    jenis: '',
});
const errors = ref({});
const editErrors = ref({});

// ===================================
// LOGIKA UNTUK TAMBAH
// ===================================
// Fungsi fetch data role dari api
const fetchDataFromApi = async () => {
    try {
        const responseData = await nampanService.getNampan();
        allData.value = responseData.map(item => ({
            ...item,
            status_label: item.status === 1 ? 'Aktif' : 'Tidak Aktif',
            status_class: item.status === 1 ? 'bg-soft-success' : 'bg-soft-danger'
        }));
    } catch (error) {
        console.error('Gagal memuat data dari API:', error);
    }
};

const fetchJenisList = async () => {
    try {
        const response = await jenisService.getJenis();
        jenisList.value = response;
    } catch (error) {
        console.error('Gagal memuat data jenis:', error);
    }
};

const resetForm = () => {
    form.value = {
        nampan: '',
        jenis: null,
    };
    errors.value = {};
    const modalElement = document.getElementById('tambahNampanModal');
    if (modalElement) {
        const modal = Modal.getInstance(modalElement);
        if (modal) {
            modal.hide();
        }
    }
};

// Fungsi VALIDASI yang sudah diperbaiki agar bisa menerima argumen
const validateForm = (formData, errorState) => {
    errorState.value = {}; // Reset error
    if (!formData.nampan) {
        errorState.value.nampan = "Nama Nampan tidak boleh kosong.";
    }
    if (!formData.jenis) {
        errorState.value.jenis = "Jenis harus dipilih.";
    }
    return Object.keys(errorState.value).length === 0;
};

// Fungsi untuk submit form 'Tambah'
const handleStoreNampan = async () => {
    // Panggil validateForm dan berikan form 'tambah' serta errors-nya
    if (!validateForm(form.value, errors)) {
        showToast("Ada kesalahan pada form. Silakan periksa kembali.", "error");
        return;
    }

    try {
        const response = await nampanService.storeNampan({ nampan: form.value.nampan, jenis: form.value.jenis.id });
        await fetchDataFromApi();
        showToast("Data nampan berhasil ditambahkan!", "success");
        resetForm(); // Panggil fungsi reset

    } catch (error) {
        console.log("Objek error yang diterima:", error);
        let errorMessage = 'Terjadi kesalahan saat menyimpan data.';

        if (error.response) {
            if (error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            } else if (error.response.data) {
                errorMessage = "Terjadi kesalahan pada form.";
            }
        } else if (error.message) {
            errorMessage = error.message;
        }
        showToast(errorMessage, "error");
    }
};

// ===================================
// LOGIKA UNTUK EDIT
// ===================================
const openEditModal = (item) => {
    // Mengisi form dengan data nampan yang dipilih
    editForm.value.id = item.id;
    editForm.value.nampan = item.nampan;
    editForm.value.jenis = jenisList.value.find(c => c.id === item.jenis_produk.id);
    // Reset error
    editErrors.value = {};

    const modalElement = document.getElementById('editNampanModal');
    const modal = new Modal(modalElement);
    modal.show();
};

// Fungsi untuk submit form 'Edit'
const handleEditNampan = async () => {
    // Panggil validateForm dan berikan form 'edit' dan errors-nya
    if (!validateForm(editForm.value, editErrors)) {
        showToast("Ada kesalahan pada form. Silakan periksa kembali.", "error");
        return;
    }

    try {
        const response = await nampanService.updateNampan(editForm.value.id, {
            nampan: editForm.value.nampan, jenis: editForm.value.jenis.id
        });

        if (response.success == true) {
            await fetchDataFromApi();
            showToast(response.message, "success");
            const modalElement = document.getElementById('editNampanModal');
            const modal = Modal.getInstance(modalElement);
            if (modal) {
                modal.hide();
            }
        } else {
            showToast(response.message || 'Gagal memperbarui data.', "error");
        }
    } catch (error) {
        console.log("Objek error yang diterima:", error);
        let errorMessage = 'Terjadi kesalahan saat menyimpan perubahan.';
        if (error.response) {
            if (error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            } else if (error.response.data) {
                errorMessage = "Terjadi kesalahan pada form.";
            }
        } else if (error.message) {
            errorMessage = error.message;
        }
        showToast(errorMessage, "error");
    }
};


// ===================================
// COMPUTED PROPERTI
// ===================================
const filteredData = computed(() => {
    if (!searchQuery.value) return allData.value;
    const query = searchQuery.value.toLowerCase();

    return allData.value.filter(item =>
        item.nampan.toLowerCase().includes(query) || item.jenis_produk.jenis_produk.toLowerCase().includes(query)
    );
});
const totalItems = computed(() => filteredData.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
const endIndex = computed(() => startIndex.value + itemsPerPage.value);
const paginatedData = computed(() => filteredData.value.slice(startIndex.value, endIndex.value));

// ===================================
// METODE NAVIGASI
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
    fetchDataFromApi();
    fetchJenisList();
    renderFeatherIcons();
    initTooltips(); // Panggil di sini

    const modalElement = document.getElementById('tambahNampanModal');
    if (modalElement) {
        modalElement.addEventListener('hidden.bs.modal', resetForm);
    }
});

watch(paginatedData, () => {
    renderFeatherIcons();
    initTooltips(); // Panggil di sini
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