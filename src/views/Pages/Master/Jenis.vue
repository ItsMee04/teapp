<template>
    <div>
        <div class="content container-fluid">
            <div class="page-header">
                <div class="add-item d-flex">
                    <div class="page-title">
                        <h4>HALAMAN JENIS PRODUK</h4>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb breadcrumb-pipe">
                                <li class="breadcrumb-item"><a href="#">Produk</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Jenis Produk</li>
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
                    <a href="#" class="btn btn-added color" data-bs-toggle="modal" data-bs-target="#tambahJenisModal">
                        <i data-feather="plus-circle" class="me-2"></i>
                        Tambah Jenis Produk
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
                                        <th scope="col">Jenis</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="paginatedData.length === 0">
                                        <td colspan="4" class="text-center">Tidak ada data.</td>
                                    </tr>
                                    <tr v-else v-for="(item, index) in paginatedData" :key="index">
                                        <th scope="row">{{ startIndex + index + 1 }}</th>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div class="avatar avatar-sm me-2 avatar-rounded">
                                                    <img :src="item.image" alt="img">
                                                </div>
                                                <div>
                                                    <div class="lh-1">
                                                        <span>{{ item.jenis_produk }}</span>
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
                                                <a href="#" class="me-2 edit-icon p-2" data-bs-toggle="modal"
                                                    data-bs-target="#editJenisModal" title="Edit"
                                                    @click.prevent="openEditModal(item)">
                                                    <i data-feather="edit" class="feather-edit"></i>
                                                </a>
                                                <a class="confirm-text p-2" data-bs-toggle="tooltip" title="Hapus"
                                                    @click.prevent="handleDeleteJenis(item.id)">
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
            <div class="modal fade" id="tambahJenisModal" tabindex="-1" aria-labelledby="tambahJenisModalLabel"
                aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div class="modal-dialog modal-dialog-centered custom-modal-two">
                    <div class="modal-content">
                        <div class="page-wrapper-new p-0">
                            <div class="content">
                                <div class="modal-header border-0 custom-modal-header">
                                    <div class="page-title">
                                        <h4>TAMBAH JENIS PRODUK</h4>
                                    </div>
                                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body custom-modal-body">
                                    <form @submit.prevent="handleStoreJenis">
                                        <div class="mb-3">
                                            <label class="form-label">Jenis<span
                                                    class="text-danger ms-1">*</span></label>
                                            <input type="text" v-model="form.jenis" class="form-control"
                                                :class="{ 'is-invalid': errors.jenis }">
                                            <div class="invalid-feedback" v-if="errors.jenis">
                                                {{ errors.jenis }}
                                            </div>
                                        </div>
                                        <div class="add-choosen">
                                            <div class="mb-3">
                                                <label class="form-label">Icon Jenis</label>
                                                <div class="image-upload">
                                                    <input type="file" name="ImageJenis" id="ImageJenis"
                                                        @change="handleImageChange">
                                                    <div class="image-uploads">
                                                        <i data-feather="upload" class="plus-down-add me-0"></i>
                                                        <h4>Upload Icon</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="phone-img mt-3"
                                                style="width: 150px; height: 150px; overflow: hidden; border-radius: 8px; border: 2px dashed #ccc; position: relative;">
                                                <img v-if="imagePreviewUrl" :src="imagePreviewUrl" alt="previewImage"
                                                    style="width: 100%; height: 100%; display: block; object-fit: cover;">
                                                <div v-else
                                                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; text-align: center; color: #888; font-size: 14px; padding: 10px;">
                                                    <span class="text-center">Pratinjau Gambar</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer-btn">
                                            <button type="button" class="btn btn-warning me-2"
                                                data-bs-dismiss="modal">Batal</button>
                                            <button type="submit" class="btn btn-secondary">Simpan Jenis</button>
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
            <div class="modal fade" id="editJenisModal" tabindex="-1" aria-labelledby="editJenisModalLabel"
                aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div class="modal-dialog modal-dialog-centered custom-modal-two">
                    <div class="modal-content">
                        <div class="page-wrapper-new p-0">
                            <div class="content">
                                <div class="modal-header border-0 custom-modal-header">
                                    <div class="page-title">
                                        <h4>EDIT JENIS PRODUK</h4>
                                    </div>
                                    <button type="button" class="close" @click="closeEditModal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body custom-modal-body">
                                    <form @submit.prevent="handleUpdateJenis">
                                        <div class="mb-3">
                                            <label class="form-label">Jenis<span
                                                    class="text-danger ms-1">*</span></label>
                                            <input type="text" v-model="editForm.jenis" class="form-control"
                                                :class="{ 'is-invalid': editErrors.jenis }">
                                            <div class="invalid-feedback" v-if="editErrors.jenis">
                                                {{ editErrors.jenis }}
                                            </div>
                                        </div>
                                        <div class="add-choosen">
                                            <div class="mb-3">
                                                <label class="form-label">Icon</label>
                                                <div class="image-upload">
                                                    <input type="file" name="imageJenis" id="editImageJenis"
                                                        @change="handleEditImageChange">
                                                    <div class="image-uploads">
                                                        <i data-feather="upload" class="plus-down-add me-0"></i>
                                                        <h4>Upload Icon</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="phone-img mt-3"
                                                style="width: 150px; height: 150px; overflow: hidden; border-radius: 8px; border: 2px dashed #ccc; position: relative;">
                                                <img v-if="editImageUrl" :src="editImageUrl" alt="previewImage"
                                                    style="width: 100%; height: 100%; display: block; object-fit: cover;">
                                                <div v-else
                                                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; text-align: center; color: #888; font-size: 14px; padding: 10px;">
                                                    <span class="text-center">Pratinjau Gambar</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer-btn">
                                            <button type="button" class="btn btn-warning me-2"
                                                @click="closeEditModal">Batal</button>
                                            <button type="submit" class="btn btn-secondary">Simpan Jenis</button>
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
    jenis: '',
    image_jenis_produk: null,
});

const editForm = ref({
    id: null,
    jenis: "",
    image_jenis_produk: null,
    new_image_file: null,
    currentImageUrl: null
});

const errors = ref({});
const editErrors = ref({});
const imagePreviewUrl = ref(null);

// ===================================
// LOGIKA UNTUK TAMBAH
// ===================================
const fetchDataFromApi = async () => {
    try {
        const responseData = await jenisService.getJenis();
        allData.value = responseData.map(item => ({
            ...item,
            image: item.image_jenis_produk
                ? `http://127.0.0.1:8000/storage/icon/${item.image_jenis_produk}?t=${new Date().getTime()}`
                : '/src/assets/img/icons/deafult.jpg',
            status_label: item.status === 1 ? 'Aktif' : 'Tidak Aktif',
            status_class: item.status === 1 ? 'bg-soft-success' : 'bg-soft-danger'
        }));
    } catch (error) {
        console.error('Gagal memuat data dari API:', error);
    }
};

const resetForm = () => {
    form.value.jenis = '';
    form.value.image_jenis_produk = null;
    imagePreviewUrl.value = null;
    errors.value = {};
    const modalElement = document.getElementById('tambahJenisModal');
    const modal = Modal.getInstance(modalElement);
    if (modal) {
        modal.hide();
    }
};

const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        form.value.image_jenis_produk = file;
        imagePreviewUrl.value = URL.createObjectURL(file);
    } else {
        form.value.image_jenis_produk = null;
        imagePreviewUrl.value = null;
    }
};

const validateForm = () => {
    errors.value = {};
    let isValid = true;
    if (!form.value.jenis.trim()) { errors.value.jenis = 'Jenis wajib diisi.'; isValid = false; }
    return isValid;
};

const handleStoreJenis = async () => {
    if (!validateForm()) { showToast('Mohon periksa kembali input Anda!', 'error'); return; }
    const formData = new FormData();
    formData.append('jenisproduk', form.value.jenis);
    if (form.value.image_jenis_produk) { formData.append('imagejenisproduk', form.value.image_jenis_produk); }
    try {
        await jenisService.storeJenis(formData);
        showToast('Data jenis berhasil ditambahkan!', 'success');
        resetForm();
        fetchDataFromApi();
    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
            errors.value = error.response.data.errors;
            showToast('Gagal menyimpan data. Mohon periksa kembali formulir.', 'error');
        } else {
            console.error('Gagal menyimpan data jenis:', error);
            showToast('Terjadi kesalahan saat menyimpan data jenis.', 'error');
        }
    }
};

// ===================================
// LOGIKA UNTUK EDIT
// ===================================
const openEditModal = (item) => {
    editForm.value.id = item.id;
    editForm.value.jenis = item.jenis_produk;
    editForm.value.image_jenis_produk = item.image_jenis_produk;

    editForm.value.new_image_file = null;

    const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/icon/';
    const cacheBuster = `?t=${new Date().getTime()}`;
    editForm.value.currentImageUrl = item.image_jenis_produk
        ? `${BASE_IMAGE_URL}${item.image_jenis_produk}${cacheBuster}`
        : null;

    editErrors.value = {};
    const modalElement = document.getElementById('editJenisModal');
    const modal = new Modal(modalElement);
    modal.show();
};

const handleEditImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        editForm.value.new_image_file = file;
    } else {
        editForm.value.new_image_file = null;
    }
};

const editImageUrl = computed(() => {
    if (editForm.value.new_image_file) {
        return URL.createObjectURL(editForm.value.new_image_file);
    }
    return editForm.value.currentImageUrl;
});

const handleUpdateJenis = async () => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('jenisproduk', editForm.value.jenis);

    if (editForm.value.new_image_file) {
        formData.append('imagejenisproduk', editForm.value.new_image_file);
    }

    try {
        await jenisService.updateJenis(editForm.value.id, formData);
        showToast('Data jenis berhasil diperbarui!', 'success');

        const modalElement = document.getElementById('editJenisModal');
        const modal = Modal.getInstance(modalElement);
        if (modal) {
            modal.hide();
        }

        hideModalBackdrop();

        fetchDataFromApi();
    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
            editErrors.value = error.response.data.errors;
            showToast('Gagal memperbarui data. Mohon periksa kembali formulir.', 'error');
        } else {
            console.error('Gagal memperbarui data jenis:', error);
            showToast('Terjadi kesalahan saat memperbarui data jenis.', 'error');
        }
    }
};

const hideModalBackdrop = () => {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
        backdrop.remove();
    }
};

// Fungsi baru untuk menutup modal edit
const closeEditModal = () => {
    const modalElement = document.getElementById('editJenisModal');
    const modal = Modal.getInstance(modalElement);
    if (modal) {
        modal.hide();
    }
    hideModalBackdrop();
};

// ===================================
// LOGIKA UNTUK HAPUS
// ===================================
const handleDeleteJenis = async (id) => {
    Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Data yang dihapus tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await jenisService.deleteJenis(id);
                showToast("Data berhasil dihapus!", "success");
                await fetchDataFromApi();
            } catch (error) {
                console.error("Gagal menghapus data jenis:", error);
                showToast("Terjadi kesalahan saat menghapus data jenis.", "error");
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
    return allData.value.filter(item => item.jenis_produk.toLowerCase().includes(query));
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
    initTooltips();
    const addModal = document.getElementById('tambahJenisModal');
    if (addModal) {
        addModal.addEventListener('hidden.bs.modal', resetForm);
    }
    const editModal = document.getElementById('editJenisModal');
    if (editModal) {
        editModal.addEventListener('hidden.bs.modal', () => {
            editForm.value.new_image_file = null;
            editForm.value.currentImageUrl = null;
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