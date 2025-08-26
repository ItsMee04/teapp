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
                                                    <div class="lh-1 mt-1">
                                                        <span>{{ item.alamat }}</span>
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

        <Teleport to="body">
            <div class="modal fade" id="editPegawaiModal" tabindex="-1" aria-labelledby="editPegawaiModalLabel"
                aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div class="modal-dialog modal-dialog-centered custom-modal-two">
                    <div class="modal-content">
                        <div class="page-wrapper-new p-0">
                            <div class="content">
                                <div class="modal-header border-0 custom-modal-header">
                                    <div class="page-title">
                                        <h4>EDIT PEGAWAI</h4>
                                    </div>
                                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body custom-modal-body">
                                    <form @submit.prevent="handleUpdatePegawai">
                                        <div class="row">
                                            <div class="mb-3 col-md-6">
                                                <label class="form-label">NIP
                                                    <span class="text-danger ms-1">*</span>
                                                </label>
                                                <input type="text" v-model="editForm.nip" class="form-control"
                                                    :class="{ 'is-invalid': editErrors.nip }">
                                                <div class="invalid-feedback" v-if="editErrors.nip">
                                                    {{ editErrors.nip }}
                                                </div>
                                            </div>
                                            <div class="mb-3 col-md-6">
                                                <label class="form-label">NAMA<span
                                                        class="text-danger ms-1">*</span></label>
                                                <input type="text" v-model="editForm.nama" class="form-control"
                                                    :class="{ 'is-invalid': editErrors.nama }">
                                                <div class="invalid-feedback" v-if="editErrors.nama">
                                                    {{ editErrors.nama }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">ALAMAT<span
                                                    class="text-danger ms-1">*</span></label>
                                            <textarea v-model="editForm.alamat" class="form-control" cols="30" rows="4"
                                                :class="{ 'is-invalid': editErrors.alamat }"></textarea>
                                            <div class="invalid-feedback" v-if="editErrors.alamat">
                                                {{ editErrors.alamat }}
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">KONTAK<span
                                                    class="text-danger ms-1">*</span></label>
                                            <input type="text" v-model="editForm.kontak" class="form-control"
                                                :class="{ 'is-invalid': editErrors.kontak }">
                                            <div class="invalid-feedback" v-if="editErrors.kontak">
                                                {{ editErrors.kontak }}
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">JABATAN<span
                                                    class="text-danger ms-1">*</span></label>
                                            <div :class="{ 'is-invalid': editErrors.jabatan_id }">
                                                <VueMultiselect v-model="editForm.jabatan" :options="jabatanList"
                                                    :allow-empty="false" :preselect-first="true" :searchable="true"
                                                    placeholder="Pilih Jabatan" label="jabatan" track-by="id"
                                                    :class="{ 'is-invalid': editErrors.jabatan_id }">
                                                </VueMultiselect>
                                            </div>
                                            <div class="invalid-feedback" v-if="editErrors.jabatan_id">
                                                {{ editErrors.jabatan_id }}
                                            </div>
                                        </div>
                                        <div class="add-choosen">
                                            <div class="mb-3">
                                                <label class="form-label">AVATAR</label>
                                                <div class="image-upload">
                                                    <input type="file" name="imagePegawai" id="editImagePegawai"
                                                        @change="handleEditImageChange">
                                                    <div class="image-uploads">
                                                        <i data-feather="upload" class="plus-down-add me-0"></i>
                                                        <h4>UPLOAD AVATAR</h4>
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
                                                data-bs-dismiss="modal">Batal</button>
                                            <button type="submit" class="btn btn-secondary">Simpan Perubahan</button>
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
import VueMultiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';

import { pegawaiService } from '@/services/usermanagement/pegawaiService';
import { jabatanService } from '@/services/usermanagement/jabatanService';

// STATE
const jabatanList = ref([]);
const allData = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(5);
const searchQuery = ref('');
const isHeaderCollapsed = ref(false);

// State untuk form 'Tambah'
const form = ref({
    nip: '',
    nama: '',
    alamat: '',
    kontak: '',
    jabatan: '',
    image_pegawai: null,
});

// State untuk form 'Edit'
const editForm = ref({
    id: null,
    nip: '',
    nama: '',
    alamat: '',
    kontak: '',
    jabatan: '',
    image_pegawai: null, // Nama file gambar dari database
    new_image_file: null // Properti baru untuk file yang diunggah
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
        const responseData = await pegawaiService.getPegawai();
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

const fetchJabatanList = async () => {
    try {
        const response = await jabatanService.getJabatan();
        jabatanList.value = response;
    } catch (error) {
        console.error('Gagal memuat data jabatan:', error);
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
// LOGIKA UNTUK EDIT
// ===================================

// Fungsi untuk menangani perubahan gambar di modal edit
const handleEditImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        // Simpan file ke state form
        editForm.value.new_image_file = file;

        // Buat URL sementara untuk pratinjau
        newImagePreviewUrl.value = URL.createObjectURL(file);
    } else {
        // Jika file dibatalkan, reset
        editForm.value.new_image_file = null;
        newImagePreviewUrl.value = null;
    }
};

// Computed property untuk menampilkan pratinjau gambar
const editImageUrl = computed(() => {
    // Prioritaskan gambar yang baru diunggah
    if (newImagePreviewUrl.value) {
        return newImagePreviewUrl.value;
    }
    // Jika tidak ada, gunakan gambar dari database (jika ada)
    if (editForm.value.image_pegawai) {
        const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/avatar/';
        return BASE_IMAGE_URL + editForm.value.image_pegawai;
    }
    return null;
});

const openEditModal = (item) => {
    // Mengisi form dengan data pegawai yang dipilih
    editForm.value.id = item.id;
    editForm.value.nip = item.nip;
    editForm.value.nama = item.nama;
    editForm.value.alamat = item.alamat;
    editForm.value.kontak = item.kontak;
    editForm.value.jabatan = item.jabatan;

    // Salin nama file gambar lama
    editForm.value.image_pegawai = item.image_pegawai;
    // Reset file yang baru diunggah dan URL pratinjau
    editForm.value.new_image_file = null;
    newImagePreviewUrl.value = null;

    // Reset error
    editErrors.value = {};

    const modalElement = document.getElementById('editPegawaiModal');
    const modal = new Modal(modalElement);
    modal.show();
};

const handleUpdatePegawai = async () => {
    // Anda perlu membuat validasi form update di sini
    // ...

    const formData = new FormData();
    formData.append('_method', 'PUT'); // Penting untuk Laravel
    formData.append('nip', editForm.value.nip);
    formData.append('nama', editForm.value.nama);
    formData.append('alamat', editForm.value.alamat);
    formData.append('kontak', editForm.value.kontak);
    formData.append('jabatan', editForm.value.jabatan.id);

    // Kirim gambar yang baru jika ada
    if (editForm.value.new_image_file) {
        formData.append('imagePegawai', editForm.value.new_image_file);
    }

    try {
        await pegawaiService.updatePegawai(editForm.value.id, formData);
        showToast('Data pegawai berhasil diperbarui!', 'success');
        // Tutup modal edit
        const modalElement = document.getElementById('editPegawaiModal');
        const modal = Modal.getInstance(modalElement);
        if (modal) {
            modal.hide();
        }
        fetchDataFromApi(); // Muat ulang data
    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
            editErrors.value = error.response.data.errors;
            showToast('Gagal memperbarui data. Mohon periksa kembali formulir.', 'error');
        } else {
            console.error('Gagal memperbarui data pegawai:', error);
            showToast('Terjadi kesalahan saat memperbarui data pegawai.', 'error');
        }
    }
};

// ===================================
// LOGIKA UNTUK DELETE
// ===================================
const handleDeletePegawai = async (id) => {
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
                const response = await pegawaiService.deletePegawai(id);

                if (response.success) {
                    await fetchDataFromApi();
                    showToast("Data pegawai berhasil dihapus.", "success");
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

// ... sisa computed properties, methods, dan hooks ...
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

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};
const prevPage = () => goToPage(currentPage.value - 1);
const nextPage = () => goToPage(currentPage.value + 1);

const renderFeatherIcons = () => feather.replace();
const toggleHeaderCollapse = () => isHeaderCollapsed.value = !isHeaderCollapsed.value;

onMounted(() => {
    fetchDataFromApi();
    fetchJabatanList();
    renderFeatherIcons();
    initTooltips();

    const addModal = document.getElementById('tambahPegawaiModal');
    if (addModal) {
        addModal.addEventListener('hidden.bs.modal', resetForm);
    }
    // Tambahkan listener untuk modal edit
    const editModal = document.getElementById('editPegawaiModal');
    if (editModal) {
        editModal.addEventListener('hidden.bs.modal', () => {
            // Reset pratinjau gambar saat modal edit ditutup
            editForm.value.new_image_file = null;
            newImagePreviewUrl.value = null;
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