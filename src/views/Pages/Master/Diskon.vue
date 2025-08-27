<template>
    <div>
        <div class="content container-fluid">
            <div class="page-header">
                <div class="add-item d-flex">
                    <div class="page-title">
                        <h4>HALAMAN DISKON</h4>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb breadcrumb-pipe">
                                <li class="breadcrumb-item"><a href="#">Produk</a></li>
                                <li class="breadcrumb-item active" aria-current="page">DISKON</li>
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
                    <a href="#" class="btn btn-added color" data-bs-toggle="modal" data-bs-target="#tambahDiskonModal">
                        <i data-feather="plus-circle" class="me-2"></i>
                        Tambah Diskon
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
                                        <th scope="col">Dkiskon / Promo</th>
                                        <th scope="col">Nilai</th>
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
                                                        <span>{{ item.diskon }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div>
                                                    <div class="lh-1">
                                                        <span>{{ item.nilai }} %</span>
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
                                                    data-bs-target="#editDiskonModal" title="Edit"
                                                    @click.prevent="openEditModal(item)">
                                                    <i data-feather="edit" class="feather-edit"></i>
                                                </a>

                                                <a class="confirm-text p-2" data-bs-toggle="tooltip" title="Hapus"
                                                    @click.prevent="handleDeleteDiskon(item.id)">
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
            <div class="modal fade" id="tambahDiskonModal" tabindex="-1" aria-labelledby="tambahDiskonModalLabel"
                aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div class="modal-dialog modal-dialog-centered custom-modal-two">
                    <div class="modal-content">
                        <div class="page-wrapper-new p-0">
                            <div class="content">
                                <div class="modal-header border-0 custom-modal-header">
                                    <div class="page-title">
                                        <h4>TAMBAH DISKON</h4>
                                    </div>
                                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body custom-modal-body">
                                    <form @submit.prevent="handleStoreDiskon">
                                        <div class="mb-3">
                                            <label for="namaDiskon" class="form-label">Nama Diskon</label>
                                            <input type="text" class="form-control" id="namaDiskon"
                                                v-model="form.diskon" :class="{ 'is-invalid': errors.diskon }">
                                            <div class="invalid-feedback" v-if="errors.diskon">
                                                {{ errors.diskon }}
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="nilaiDiskon" class="form-label">Nilai</label>
                                            <input type="text" class="form-control" id="nilaiDiskon"
                                                v-model="form.nilai" :class="{ 'is-invalid': errors.nilai }">
                                            <div class="invalid-feedback" v-if="errors.nilai">
                                                {{ errors.nilai }}
                                            </div>
                                        </div>
                                        <div class="modal-footer-btn">
                                            <button type="button" class="btn btn-warning me-2"
                                                data-bs-dismiss="modal">Batal</button>
                                            <button type="submit" class="btn btn-secondary">Simpan Diskon</button>
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
            <div class="modal fade" id="editDiskonModal" tabindex="-1" aria-labelledby="editDiskonModal"
                aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div class="modal-dialog modal-dialog-centered custom-modal-two">
                    <div class="modal-content">
                        <div class="page-wrapper-new p-0">
                            <div class="content">
                                <div class="modal-header border-0 custom-modal-header">
                                    <div class="page-title">
                                        <h4>EDIT DISKON</h4>
                                    </div>
                                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body custom-modal-body">
                                    <form @submit.prevent="handleEditDiskon">
                                        <div class="mb-3">
                                            <label for="editNamaDiskon" class="form-label">Nama Diskon</label>
                                            <input type="text" class="form-control" id="editNamaDiskon"
                                                v-model="editForm.diskon" :class="{ 'is-invalid': editErrors.diskon }">
                                            <div class="invalid-feedback" v-if="editErrors.diskon">
                                                {{ editErrors.diskon }}
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="editNilaiDiskon" class="form-label">Nilai Diskon</label>
                                            <input type="text" class="form-control" id="editNilaiDiskon"
                                                v-model="editForm.nilai" :class="{ 'is-invalid': editErrors.nilai }">
                                            <div class="invalid-feedback" v-if="editErrors.nilai">
                                                {{ editErrors.nilai }}
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
import { diskonService } from '@/services/produk/diskonService';
import { showToast } from "@/utilities/toastfy";
import { initTooltips } from '@/utilities/tooltip';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';

// ===================================
// STATE
// ===================================
const allData = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(5);
const searchQuery = ref('');
const isHeaderCollapsed = ref(false);
const form = ref({
    diskon: '',
    nilai: '',
});
const editForm = ref({
    id: null,
    diskon: '',
    nilai: '',
});
const errors = ref({});
const editErrors = ref({});

// ===================================
// LOGIKA UNTUK TAMBAH
// ===================================
// Fungsi fetch data diskon dari api
const fetchDataFromApi = async () => {
    try {
        const responseData = await diskonService.getDiskon();
        allData.value = responseData.map(item => ({
            ...item,
            status_label: item.status === 1 ? 'Aktif' : 'Tidak Aktif',
            status_class: item.status === 1 ? 'bg-soft-success' : 'bg-soft-danger'
        }));
    } catch (error) {
        console.error('Gagal memuat data dari API:', error);
    }
};

// Fungsi VALIDASI yang sudah diperbaiki agar bisa menerima argumen
const validateForm = (formData, errorState) => {
    errorState.value = {}; // Reset error
    if (!formData.diskon) {
        errorState.value.diskon = "Nama diskon tidak boleh kosong.";
        errorState.value.nilai = "Nilai tidak boleh kosong.";
    }
    return Object.keys(errorState.value).length === 0;
};

// Fungsi untuk submit form 'Tambah'
const handleStoreDiskon = async () => {
    // Panggil validateForm dan berikan form 'tambah' serta errors-nya
    if (!validateForm(form.value, errors)) {
        showToast("Ada kesalahan pada form. Silakan periksa kembali.", "error");
        return;
    }

    try {
        const response = await diskonService.storeDiskon({ diskon: form.value.diskon, nilai: form.value.nilai });

        if (response.success) {
            await fetchDataFromApi();
            showToast(response.message, "success");
            resetForm(); // Panggil fungsi reset
        } else {
            showToast(response.message || 'Gagal menyimpan data.', "error");
        }

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
// Fungsi untuk submit form 'Reset Form'
const resetForm = () => {
    form.value.diskon = '';
    form.value.nilai = '';
    errors.value = {};
    const modalElement = document.getElementById('tambahDiskonModal');
    const modal = Modal.getInstance(modalElement);
    if (modal) {
        modal.hide();
    }
};

// ===================================
// LOGIKA UNTUK EDIT
// ===================================
// Fungsi untuk open modal edit
const openEditModal = (item) => {
    editForm.value.id = item.id;
    editForm.value.diskon = item.diskon;
    editForm.value.nilai = item.nilai;
    editErrors.value = {}; // Reset error edit saat modal dibuka
    const modalElement = document.getElementById('editDiskonModal');
    const modal = new Modal(modalElement);
    modal.show();
};

// Fungsi untuk submit form 'Edit'
const handleEditDiskon = async () => {
    // Panggil validateForm dan berikan form 'edit' dan errors-nya
    if (!validateForm(editForm.value, editErrors)) {
        showToast("Ada kesalahan pada form. Silakan periksa kembali.", "error");
        return;
    }

    try {
        const response = await diskonService.updateDiskon(editForm.value.id, {
            diskon: editForm.value.diskon, nilai: editForm.value.nilai
        });

        if (response.success) {
            await fetchDataFromApi();
            showToast(response.message, "success");
            const modalElement = document.getElementById('editDiskonModal');
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
// LOGIKA UNTUK DELETE
// ===================================
// Fungsi untuk submit delete
const handleDeleteDiskon = async (id) => {
    Swal.fire({
        title: "Apakah Anda Yakin?",
        text: "Anda tidak akan bisa mengembalikannya!",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Batal"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await diskonService.deleteDiskon(id);

                if (response.success) {
                    await fetchDataFromApi();
                    showToast("Data diskon berhasil dihapus.", "success");
                } else {
                    showToast("Gagal menghapus data.", "error");
                }
            } catch (error) {
                console.error("Error saat menghapus data:", error);
                const errorMessage = error.response?.data?.message || "Terjadi kesalahan saat menghubungi server.";
                showToast(errorMessage, "error");
            }
        }
    });
};
// ===================================
// COMPUTED PROPERTI
// ===================================
const filteredData = computed(() => {
    if (!searchQuery.value) return allData.value;
    const query = searchQuery.value.toLowerCase();
    return allData.value.filter(item => item.diskon.toLowerCase().includes(query));
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
    renderFeatherIcons();
    initTooltips(); // Panggil di sini

    const modalElement = document.getElementById('tambahDiskonModal');
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