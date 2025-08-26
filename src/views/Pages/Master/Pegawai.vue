<template>
    <div>
        <div class="content container-fluid">
            <div class="page-header">
                <div class="add-item d-flex">
                    <div class="page-title">
                        <h4>HALAMAN PEGAWAI</h4>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb breadcrumb-pipe">
                                <li class="breadcrumb-item"><a href="#">User Management</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Pegawai</li>
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
                    <a href="#" class="btn btn-added color" data-bs-toggle="modal" data-bs-target="#tambahPegawaiModal">
                        <i data-feather="plus-circle" class="me-2"></i>
                        Tambah Pegawai
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
                                        <th scope="col">NIP</th>
                                        <th scope="col">Nama</th>
                                        <th scope="col">Jabatan</th>
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
                                                        <span>{{ item.nip }}</span>
                                                    </div>
                                                </div>
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
                                            <div class="d-flex align-items-center">
                                                <div>
                                                    <div class="lh-1">
                                                        <span>{{ item.jabatan.jabatan }}</span>
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
                                                    data-bs-target="#editPegawaiModal" title="Edit"
                                                    @click.prevent="openEditModal(item)">
                                                    <i data-feather="edit" class="feather-edit"></i>
                                                </a>

                                                <a class="confirm-text p-2" data-bs-toggle="tooltip" title="Hapus"
                                                    @click.prevent="handleDeletePegawai(item.id)">
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
                                        <h4>TAMBAH JABATAN</h4>
                                    </div>
                                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body custom-modal-body">
                                    <form @submit.prevent="handleStoreJabatan">
                                        <div class="row">
                                            <div class="mb-3 col-md-6">
                                                <label class="form-label">NIP<span
                                                        class="text-danger ms-1">*</span></label>
                                                <input type="text" name="nip" class="form-control">
                                            </div>
                                            <div class="mb-3 col-md-6">
                                                <label class="form-label">NAMA<span
                                                        class="text-danger ms-1">*</span></label>
                                                <input type="text" name="nama" class="form-control">
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">ALAMAT<span
                                                    class="text-danger ms-1">*</span></label>
                                            <textarea name="alamat" class="form-control" cols="30" rows="4"></textarea>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">KONTAK<span
                                                    class="text-danger ms-1">*</span></label>
                                            <input type="text" name="kontak" class="form-control">
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">JABATAN<span
                                                    class="text-danger ms-1">*</span></label>
                                            <VueMultiselect v-model="form.jabatan_id" :options="jabatanList"
                                                :allow-empty="false" :preselect-first="true" :searchable="true"
                                                placeholder="Pilih Jabatan" label="jabatan" track-by="id">
                                            </VueMultiselect>
                                        </div>
                                        <div class="add-choosen">
                                            <div class="mb-3">
                                                <label class="form-label">AVATAR</label>
                                                <div class="image-upload ">
                                                    <input type="file" name="imagePegawai" id="imagePegawai">
                                                    <div class="image-uploads">
                                                        <i data-feather="upload" class="plus-down-add me-0"></i>
                                                        <h4>UPLOAD AVATAR</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="phone-img"
                                                style="width: 150px; height: 150px; overflow: hidden; border-radius: 8px;">
                                                <div id="imagePegawaiPreview" alt="previewImage"
                                                    style="width: 150px; height: 150px; display: block; overflow: hidden;">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer-btn">
                                            <button type="button" class="btn btn-warning me-2"
                                                data-bs-dismiss="modal">Batal</button>
                                            <button type="submit" class="btn btn-secondary">Simpan Jabatan</button>
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
import { showToast } from "@/utilities/toastfy";
import { initTooltips } from '@/utilities/tooltip';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
// Tambahkan komponen Vue Multiselect
import VueMultiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';

import { pegawaiService } from '@/services/usermanagement/pegawaiService';
import { jabatanService } from '@/services/usermanagement/jabatanService';

// State untuk daftar jabatan
const jabatanList = ref([]);

const form = ref({
    nip: '',
});

// State untuk form modal Edit
const editForm = ref({
    id: null,
    nip: '',
});

const errors = ref({});
// State untuk validasi form 'Edit'
const editErrors = ref({}); // <-- Tambahkan ini

// STATE
const allData = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(5);
const searchQuery = ref('');
const isHeaderCollapsed = ref(false);

// FUNGSI UTAMA
const fetchDataFromApi = async () => {
    try {
        const responseData = await pegawaiService.getPegawai();
        allData.value = responseData.map(item => ({
            ...item,
            image: item.image_pegawai
                ? `http://localhost:8000/storage/avatar/${item.image_pegawai}`
                : '/src/assets/img/avatar/avatar-1.jpg',
            status_label: item.status === 1 ? 'Aktif' : 'Tidak Aktif',
            status_class: item.status === 1 ? 'bg-soft-success' : 'bg-soft-danger'
        }));
    } catch (error) {
        console.error('Gagal memuat data dari API:', error);
    }
};

// Fungsi untuk mengambil data jabatan dari API
const fetchJabatanList = async () => {
    try {
        const response = await jabatanService.getJabatan();
        jabatanList.value = response; // Pastikan service mengembalikan array objek jabatan
    } catch (error) {
        console.error('Gagal memuat data jabatan:', error);
    }
};

// COMPUTED PROPERTIES
const filteredData = computed(() => {
    if (!searchQuery.value) return allData.value;
    const query = searchQuery.value.toLowerCase();
    return allData.value.filter(item => item.nama.toLowerCase().includes(query));
});
const totalItems = computed(() => filteredData.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
const endIndex = computed(() => startIndex.value + itemsPerPage.value);
const paginatedData = computed(() => filteredData.value.slice(startIndex.value, endIndex.value));


// METODE NAVIGASI
const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};
const prevPage = () => goToPage(currentPage.value - 1);
const nextPage = () => goToPage(currentPage.value + 1);


// LIFECYCLE HOOKS & WATCHER
const renderFeatherIcons = () => feather.replace();

const toggleHeaderCollapse = () => isHeaderCollapsed.value = !isHeaderCollapsed.value;

onMounted(() => {
    fetchDataFromApi();
    fetchJabatanList(); // <-- Panggil fungsi ini saat komponen dimuat
    renderFeatherIcons();
    initTooltips(); // Panggil di sini

    // const modalElement = document.getElementById('tambahPegawaiModal');
    // if (modalElement) {
    //     modalElement.addEventListener('hidden.bs.modal', resetForm);
    // }
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