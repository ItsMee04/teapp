<template>
    <div>
        <div class="content container-fluid">
            <div class="page-header">
                <div class="add-item d-flex">
                    <div class="page-title">
                        <h4>HALAMAN PRODUK</h4>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb breadcrumb-pipe">
                                <li class="breadcrumb-item"><a href="#">Produk</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Produk</li>
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
                    <a href="#" class="btn btn-added color" data-bs-toggle="modal" data-bs-target="#tambahProdukModal">
                        <i data-feather="plus-circle" class="me-2"></i>
                        Tambah Produk
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
                                        <th scope="col">Kode</th>
                                        <th scope="col">Nama</th>
                                        <th scope="col">Berat</th>
                                        <th scope="col">Karat</th>
                                        <th scope="col">Harga @Gram</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="paginatedData.length === 0">
                                        <td colspan="7" class="text-center">Tidak ada data.</td>
                                    </tr>
                                    <tr v-else v-for="(item, index) in paginatedData" :key="index">
                                        <th scope="row">{{ startIndex + index + 1 }}</th>
                                        <td>
                                            <div class="lh-1">
                                                <span>{{ item.kodeproduk }}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div class="avatar avatar-sm me-2 avatar-rounded">
                                                    <img :src="item.image" alt="img">
                                                </div>
                                                <div>
                                                    <div class="lh-1">
                                                        <span>{{ item.nama }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="lh-1">
                                                <span>{{ item.berat }} gram</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="lh-1">
                                                <span>{{ item.karat }} K</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="lh-1">
                                                <span>{{ item.harga_jual }}</span>
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
                                                    data-bs-target="#viewProdukModal" title="Edit"
                                                    @click.prevent="openEditModal(item)">
                                                    <i data-feather="eye" class="feather-eye"></i>
                                                </a>
                                                <a href="#" class="me-2 edit-icon p-2" data-bs-toggle="modal"
                                                    data-bs-target="#editProdukModal" title="Edit"
                                                    @click.prevent="openEditModal(item)">
                                                    <i data-feather="edit" class="feather-edit"></i>
                                                </a>
                                                <a class="confirm-text p-2" data-bs-toggle="tooltip" title="Hapus"
                                                    @click.prevent="handleDeleteProduk(item.id)">
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
            <div class="modal fade" id="tambahPegawaiModal" tabindex="-1" aria-labelledby="tambahPegawaiModalLabel"
                aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div class="modal-dialog modal-dialog-centered custom-modal-two">
                    <div class="modal-content">
                        <div class="page-wrapper-new p-0">
                            <div class="content">
                                <div class="modal-header border-0 custom-modal-header">
                                    <div class="page-title">
                                        <h4>TAMBAH PEGAWAI</h4>
                                    </div>
                                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body custom-modal-body">
                                    <form @submit.prevent="handleStorePegawai">
                                        <div class="row">
                                            <div class="mb-3 col-md-6">
                                                <label class="form-label">NIP
                                                    <span class="text-danger ms-1">*</span>
                                                </label>
                                                <input type="text" v-model="form.nip" class="form-control"
                                                    :class="{ 'is-invalid': errors.nip }">
                                                <div class="invalid-feedback" v-if="errors.nip">
                                                    {{ errors.nip }}
                                                </div>
                                            </div>
                                            <div class="mb-3 col-md-6">
                                                <label class="form-label">NAMA<span
                                                        class="text-danger ms-1">*</span></label>
                                                <input type="text" v-model="form.nama" class="form-control"
                                                    :class="{ 'is-invalid': errors.nama }">
                                                <div class="invalid-feedback" v-if="errors.nama">
                                                    {{ errors.nama }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">ALAMAT<span
                                                    class="text-danger ms-1">*</span></label>
                                            <textarea v-model="form.alamat" class="form-control" cols="30" rows="4"
                                                :class="{ 'is-invalid': errors.alamat }"></textarea>
                                            <div class="invalid-feedback" v-if="errors.alamat">
                                                {{ errors.alamat }}
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">KONTAK<span
                                                    class="text-danger ms-1">*</span></label>
                                            <input type="text" v-model="form.kontak" class="form-control"
                                                :class="{ 'is-invalid': errors.kontak }">
                                            <div class="invalid-feedback" v-if="errors.kontak">
                                                {{ errors.kontak }}
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">JABATAN<span
                                                    class="text-danger ms-1">*</span></label>
                                            <div :class="{ 'is-invalid': errors.jabatan }">
                                                <VueMultiselect v-model="form.jabatan" :options="jabatanList"
                                                    :allow-empty="false" :preselect-first="true" :searchable="true"
                                                    placeholder="Pilih Jabatan" label="jabatan" track-by="id"
                                                    :class="{ 'is-invalid': errors.jabatan }">
                                                </VueMultiselect>
                                            </div>
                                            <div class="invalid-feedback" v-if="errors.jabatan">
                                                {{ errors.jabatan }}
                                            </div>
                                        </div>
                                        <div class="add-choosen">
                                            <div class="mb-3">
                                                <label class="form-label">AVATAR</label>
                                                <div class="image-upload">
                                                    <input type="file" name="imagePegawai" id="imagePegawai"
                                                        @change="handleImageChange">
                                                    <div class="image-uploads">
                                                        <i data-feather="upload" class="plus-down-add me-0"></i>
                                                        <h4>UPLOAD AVATAR</h4>
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
                                            <button type="submit" class="btn btn-secondary">Simpan Pegawai</button>
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
import { produkService } from '@/services/produk/produkService';
import { jenisService } from '@/services/produk/jenisService';
import { kondisiService } from '@/services/produk/kondisiService';
import { showToast } from "@/utilities/toastfy";
import { initTooltips } from '@/utilities/tooltip';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';

// ===================================
// STATE
// ===================================
const jabatanList = ref([]);
const kondisiList = ref([]);
const allData = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(5);
const searchQuery = ref('');
const isHeaderCollapsed = ref(false);
const form = ref({
    jenisList: '',
    kondisiList:'',
    image_produk: null,
});

const editForm = ref({
    id: null,
    jenisList: '',
    kondisiList: '',
    image_produk: null,
    new_image_file: null,
    currentImageUrl: null
});

const errors = ref({});
const editErrors = ref({});
const imagePreviewUrl = ref(null);
const newImagePreviewUrl = ref(null); // State untuk pratinjau gambar yang baru diunggah

// ===================================
// LOGIKA UNTUK TAMBAH
// ===================================
const fetchDataFromApi = async () => {
    try {
        const responseData = await produkService.getProduk();
        allData.value = responseData.map(item => ({
            ...item,
            image: item.image_pegawai
                ? `http://127.0.0.1:8000/storage/avatar/${item.image_pegawai}?t=${new Date().getTime()}`
                : '/src/assets/img/avatar/avatar-1.jpg',
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

const fetchKondisiList = async () => {
    try {
        const response = await kondisiService.getKondisi();
        jenisList.value = response;
    } catch (error) {
        console.error('Gagal memuat data kondisi:', error);
    }
};

const resetForm = () => {
    form.value.nip = '';
    form.value.nama = '';
    form.value.alamat = '';
    form.value.kontak = '';
    form.value.jabatan = '';
    form.value.image_pegawai = null;
    imagePreviewUrl.value = null;
    errors.value = {};
    const modalElement = document.getElementById('tambahPegawaiModal');
    const modal = Modal.getInstance(modalElement);
    if (modal) {
        modal.hide();
    }
};

const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        form.value.image_pegawai = file;
        imagePreviewUrl.value = URL.createObjectURL(file);
    } else {
        form.value.image_pegawai = null;
        imagePreviewUrl.value = null;
    }
};

const validateForm = () => {
    errors.value = {};
    let isValid = true;
    if (!form.value.nip.trim()) { errors.value.nip = 'NIP wajib diisi.'; isValid = false; }
    if (!form.value.nama.trim()) { errors.value.nama = 'Nama wajib diisi.'; isValid = false; }
    if (!form.value.alamat.trim()) { errors.value.alamat = 'Alamat wajib diisi.'; isValid = false; }
    if (!form.value.kontak.trim()) { errors.value.kontak = 'Kontak wajib diisi.'; isValid = false; }
    else if (!/^\d+$/.test(form.value.kontak.trim())) { errors.value.kontak = 'Kontak hanya boleh berisi angka.'; isValid = false; }
    if (!form.value.jabatan) { errors.value.jabatan = 'Jabatan wajib diisi.'; isValid = false; }
    return isValid;
};

const handleStorePegawai = async () => {
    if (!validateForm()) { showToast('Mohon periksa kembali input Anda!', 'error'); return; }
    const formData = new FormData();
    formData.append('nip', form.value.nip);
    formData.append('nama', form.value.nama);
    formData.append('alamat', form.value.alamat);
    formData.append('kontak', form.value.kontak);
    formData.append('jabatan', form.value.jabatan.id);
    if (form.value.image_pegawai) { formData.append('imagePegawai', form.value.image_pegawai); }
    try {
        await pegawaiService.storePegawai(formData);
        showToast('Data pegawai berhasil ditambahkan!', 'success');
        resetForm();
        fetchDataFromApi();
    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
            errors.value = error.response.data.errors;
            showToast('Gagal menyimpan data. Mohon periksa kembali formulir.', 'error');
        } else {
            console.error('Gagal menyimpan data pegawai:', error);
            showToast('Terjadi kesalahan saat menyimpan data pegawai.', 'error');
        }
    }
};

// ===================================
// COMPUTED PROPERTI
// ===================================
const filteredData = computed(() => {
    if (!searchQuery.value) return allData.value;
    const query = searchQuery.value.toLowerCase();
    return allData.value.filter(item => item.produk.toLowerCase().includes(query));
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
    fetchKondisiList();
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