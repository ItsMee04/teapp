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
                                <li class="breadcrumb-item active" aria-current="page">
                                    Nampan Produk / Baki Produk
                                </li>
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
                            @click="toggleHeaderCollapse" :class="{ active: isHeaderCollapsed }">
                            <i data-feather="chevron-up" class="feather-chevron-up"></i>
                        </a>
                    </li>
                </ul>
                <div class="page-btn import">
                    <a href="#" class="btn btn-added color" data-bs-toggle="modal" data-bs-target="#tambahProdukModal"
                        @click.prevent="openTambahProdukModal">
                        <i data-feather="plus-circle" class="me-2"></i>
                        Tambah Produk
                    </a>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-4 mb-3">
                    <div class="card settings-sidebar border p-3 rounded h-100">
                        <div class="sidebar-inner">
                            <h6>Data Nampan / Baki</h6>
                            <ul class="list-group mt-2 mb-2" style="height: 400px; overflow-y: auto;">
                                <li v-if="isLoadingNampan"
                                    class="list-group-item text-center text-muted d-flex align-items-center justify-content-center"
                                    style="height: 400px;">
                                    <div class="d-flex flex-column align-items-center">
                                        <div class="spinner-border text-secondary" role="status"></div>
                                        <span>Memuat...</span>
                                    </div>
                                </li>
                                <li v-else-if="paginatedNampanList.length === 0"
                                    class="list-group-item text-center text-muted d-flex align-items-center justify-content-center"
                                    style="height: 400px;">
                                    <span>Tidak ada data nampan.</span>
                                </li>
                                <li v-else v-for="nampan in paginatedNampanList" :key="nampan.id"
                                    class="list-group-item list-group-item-action"
                                    :class="{ 'active': selectedNampanId === nampan.id }"
                                    @click="fetchNampanProduk(nampan.id, nampan.nampan)">
                                    <div>
                                        <strong>{{ nampan.nampan }}</strong>
                                        <small class="text-muted d-block">Tanggal: {{ nampan.tanggal }}</small>
                                        <small class="text-muted d-block">Jenis: {{ nampan.jenis_produk.jenis_produk
                                            }}</small>
                                    </div>
                                    <span class="badge rounded-pill"
                                        :class="{ 'bg-primary': selectedNampanId !== nampan.id, 'bg-warning': selectedNampanId === nampan.id }">
                                        {{ nampan.produk_count }}
                                    </span>
                                </li>
                            </ul>
                            <nav v-if="totalNampanPages > 1" aria-label="Page navigation">
                                <ul class="pagination justify-content-center mb-0 mt-3">
                                    <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                                        <a class="page-link" href="#"
                                            @click.prevent="goToNampanPage(currentPage - 1)">Previous</a>
                                    </li>
                                    <li class="page-item" v-for="page in totalNampanPages" :key="page"
                                        :class="{ 'active': currentPage === page }">
                                        <a class="page-link" href="#" @click.prevent="goToNampanPage(page)">{{ page
                                            }}</a>
                                    </li>
                                    <li class="page-item" :class="{ 'disabled': currentPage === totalNampanPages }">
                                        <a class="page-link" href="#"
                                            @click.prevent="goToNampanPage(currentPage + 1)">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-md-8">
                    <div class="card h-100">
                        <div class="card-header justify-content-between">
                            <div class="card-title">
                                Daftar Produk di Nampan
                                <span v-if="selectedNampanName">({{ selectedNampanName }})</span>
                            </div>
                        </div>
                        <div class="card-body" style="height: 400px; overflow-y: auto;">
                            <div class="table-responsive">
                                <table class="table text-nowrap table-hover">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Nama Produk</th>
                                            <th>Harga</th>
                                            <th>Jumlah</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="isLoadingProduk">
                                            <td colspan="6" class="text-center">
                                                Memuat produk...
                                            </td>
                                        </tr>
                                        <tr v-else-if="nampanProdukList.length === 0 && !selectedNampanId">
                                            <td colspan="6" class="text-center">
                                                <div class="alert alert-danger d-flex align-items-center" role="alert">
                                                    <i class="feather-alert-octagon flex-shrink-0 me-2"></i>
                                                    <div>
                                                        Pilih nampan dari daftar di sisi kiri.
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr v-else-if="nampanProdukList.length === 0 && selectedNampanId">
                                            <td colspan="6" class="text-center">
                                                <div class="alert alert-danger d-flex align-items-center" role="alert">
                                                    <i class="feather-alert-octagon flex-shrink-0 me-2"></i>
                                                    <div>
                                                        Tidak ada produk di nampan ini.
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr v-else v-for="(produk, index) in nampanProdukList" :key="produk.id">
                                            <td>{{ index + 1 }}</td>
                                            <td>{{ produk.nama }}</td>
                                            <td>{{ formatRupiah(produk.harga) }}</td>
                                            <td>{{ produk.jumlah }}</td>
                                            <td class="action-table-data">
                                                <div class="edit-delete-action">
                                                    <a href="#" class="me-2 edit-icon p-2" data-bs-toggle="tooltip"
                                                        data-bs-target="#editPegawaiModal" title="Edit"
                                                        @click.prevent="openEditModal(produk)">
                                                        <i data-feather="edit" class="feather-edit"></i>
                                                    </a>
                                                    <a class="confirm-text p-2" data-bs-toggle="tooltip" title="Hapus"
                                                        @click.prevent="handleDeleteProduk(produk.id)">
                                                        <i data-feather="trash-2" class="feather-trash-2"></i>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <nav v-if="totalPages > 1" aria-label="Page navigation">
                                <ul class="pagination justify-content-center mt-3">
                                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                        <a class="page-link" href="#"
                                            @click.prevent="changePage(currentPage - 1)">Previous</a>
                                    </li>
                                    <li class="page-item" v-for="page in totalPages" :key="page"
                                        :class="{ active: currentPage === page }">
                                        <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                                    </li>
                                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                        <a class="page-link" href="#"
                                            @click.prevent="changePage(currentPage + 1)">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Teleport to="body">
            <div class="modal fade" id="tambahProdukModal" tabindex="-1" aria-labelledby="tambahProdukModalLabel"
                aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div class="modal-dialog modal-xl modal-dialog-centered custom-modal-two">
                    <div class="modal-content">
                        <div class="page-wrapper-new p-0">
                            <div class="content">
                                <div class="modal-header border-0 custom-modal-header">
                                    <div class="page-title">
                                        <h4>TAMBAH PRODUK</h4>
                                    </div>
                                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body custom-modal-body">
                                    <form @submit.prevent="handleStoreProdukNampan">
                                        <div class="row">
                                            <div class="col-4">
                                                <div class="form-group mb-3">
                                                    <input type="text" class="form-control"
                                                        placeholder="Cari berdasarkan Kode Produk..."
                                                        v-model="searchQuery">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="table-responsive">
                                            <table class="table text-nowrap table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th class="no-sort">
                                                            <label class="checkboxs">
                                                                <input type="checkbox" id="select-all"
                                                                    v-model="selectAll">
                                                                <span class="checkmarks"></span>
                                                            </label>
                                                        </th>
                                                        <th>No.</th>
                                                        <th>Kode Produk</th>
                                                        <th>Berat</th>
                                                        <th>Karat</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-if="isLoadingModalProduk">
                                                        <td colspan="6" class="text-center">
                                                            Memuat produk...
                                                        </td>
                                                    </tr>
                                                    <tr v-else-if="modalProdukList.length === 0">
                                                        <td colspan="6">
                                                            <div class="alert alert-danger d-flex align-items-center"
                                                                role="alert">
                                                                <i class="feather-alert-octagon flex-shrink-0 me-2"></i>
                                                                <div>
                                                                    Tidak ada produk yang tersedia.
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr v-else v-for="(produkModal, index) in filteredProdukList"
                                                        :key="produkModal.id">
                                                        <td>
                                                            <label class="checkboxs">
                                                                <input type="checkbox" :value="produkModal.id"
                                                                    v-model="selectedProdukIds">
                                                                <span class="checkmarks"></span>
                                                            </label>
                                                        </td>
                                                        <td>{{ index + 1 }}</td>
                                                        <td>{{ produkModal.kodeproduk }}</td>
                                                        <td>{{ produkModal.berat }}</td>
                                                        <td>{{ produkModal.karat }}</td>
                                                        <td class="action-table-data">
                                                            <div class="edit-delete-action">
                                                                <a class="confirm-text p-2" data-bs-toggle="tooltip"
                                                                    title="Pilih"
                                                                    @click.prevent="handleSelectProduk(produkModal.id)">
                                                                    <i data-feather="check"
                                                                        class="feather-check text-success"></i>
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="modal-footer-btn">
                                            <button type="button" class="btn btn-warning me-2"
                                                data-bs-dismiss="modal">Batal</button>
                                            <button type="submit" class="btn btn-secondary">Tambah Produk</button>
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
import { nampanService } from '@/services/produk/nampanService';
import { showToast } from "@/utilities/toastfy";
import { nampanprodukService } from '@/services/produk/nampanprodukService';

// STATE
const nampanList = ref([]);
const nampanProdukList = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(5);
const selectedNampanId = ref(null);
const selectedNampanName = ref(null);
const selectedJenisProdukId = ref(null);
const isLoadingNampan = ref(false);
const isLoadingProduk = ref(false);
const isHeaderCollapsed = ref(false);
const searchQuery = ref('');
const selectedProdukIds = ref(new Set()); // Tambahkan baris ini

// Modal State
const modalProdukList = ref([]);
const isLoadingModalProduk = ref(false);

// COMPUTED UNTUK PAGINATION NAMPAN
const totalNampanItems = computed(() => nampanList.value.length);
const totalNampanPages = computed(() => Math.ceil(totalNampanItems.value / itemsPerPage.value));
const startNampanIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
const paginatedNampanList = computed(() => nampanList.value.slice(startNampanIndex.value, startNampanIndex.value + itemsPerPage.value));

// COMPUTED UNTUK PAGINATION PRODUK
const paginatedProdukList = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return nampanProdukList.value.slice(start, end);
});

const totalPages = computed(() => {
    return Math.ceil(nampanProdukList.value.length / itemsPerPage.value);
});

const selectAll = computed({
    get() {
        // Cek apakah semua produk yang difilter sudah dipilih
        if (filteredProdukList.value.length === 0) return false;
        return filteredProdukList.value.every(produk => selectedProdukIds.value.has(produk.id));
    },
    set(value) {
        if (value) {
            // Pilih semua produk yang difilter
            filteredProdukList.value.forEach(produk => {
                selectedProdukIds.value.add(produk.id);
            });
        } else {
            // Hapus semua pilihan
            selectedProdukIds.value.clear();
        }
    }
});

const handleStoreProdukNampan = async () => {
    // Pastikan ada nampan yang dipilih
    if (!selectedNampanId.value) {
        showToast('Pilih nampan terlebih dahulu.', 'error');
        return;
    }

    // Konversi Set menjadi array
    const produkIdsToStore = Array.from(selectedProdukIds.value);

    // Pastikan ada produk yang dipilih
    if (produkIdsToStore.length === 0) {
        showToast('Pilih setidaknya satu produk.', 'warning');
        return;
    }

    const payload = {
        nampanId: selectedNampanId.value,
        produkIds: produkIdsToStore,
    };

    try {
        // Asumsi API endpoint untuk menyimpan produk di nampan adalah 'storeProdukToNampan'
        const response = await nampanprodukService.storeProdukNampan(payload);
        showToast('Produk berhasil ditambahkan ke nampan!', 'success');

        // Tutup modal setelah berhasil
        const modal = bootstrap.Modal.getInstance(document.getElementById('tambahProdukModal'));
        modal.hide();

        // Refresh daftar produk di nampan saat ini
        await fetchNampanProduk(selectedNampanId.value, selectedNampanName.value);

        // Reset pilihan produk di modal
        selectedProdukIds.value.clear();

    } catch (error) {
        console.error('Gagal menambahkan produk ke nampan:', error);
        showToast('Gagal menambahkan produk. Silakan coba lagi.', 'error');
    }
};

const filteredProdukList = computed(() => {
    if (!searchQuery.value) {
        return modalProdukList.value;
    }
    const query = searchQuery.value.toLowerCase();
    return modalProdukList.value.filter(produk => {
        return produk.kodeproduk.toLowerCase().includes(query);
    });
});

// METHODS
const fetchDataFromApi = async () => {
    await fetchNampanList();
};

const fetchNampanList = async () => {
    isLoadingNampan.value = true;
    try {
        const response = await nampanService.getNampan();
        nampanList.value = response;
        if (nampanList.value.length > 0) {
            await fetchNampanProduk(nampanList.value[0].id, nampanList.value[0].nampan);
        } else {
            nampanProdukList.value = [];
        }
    } catch (error) {
        console.error('Gagal mengambil daftar nampan:', error);
        showToast('Gagal memuat data nampan. Silakan coba lagi.', 'error');
        nampanList.value = [];
    } finally {
        isLoadingNampan.value = false;
    }
};

const fetchNampanProduk = async (nampanId, nampanName) => {
    selectedNampanId.value = nampanId;
    selectedNampanName.value = nampanName;
    // Simpan jenis_produk_id untuk digunakan di modal
    const nampan = nampanList.value.find(n => n.id === nampanId);
    if (nampan) {
        selectedJenisProdukId.value = nampan.id;
    }

    isLoadingProduk.value = true;
    try {
        const response = await nampanprodukService.getNampanProduk(nampanId);
        nampanProdukList.value = response.Data || [];
    } catch (error) {
        console.error('Gagal mengambil produk untuk nampan:', error);
        showToast('Gagal memuat produk untuk nampan ini.', 'error');
        nampanProdukList.value = [];
    } finally {
        isLoadingProduk.value = false;
    }
};

const fetchProdukModal = async () => {
    if (!selectedJenisProdukId.value) {
        showToast('Silakan pilih nampan terlebih dahulu.', 'warning');
        return;
    }

    isLoadingModalProduk.value = true;
    try {
        const response = await nampanprodukService.getProduk(selectedJenisProdukId.value);
        modalProdukList.value = response.Data || [];
    } catch (error) {
        console.error('Gagal mengambil produk untuk modal:', error);
        showToast('Gagal memuat produk untuk modal.', 'error');
        modalProdukList.value = [];
    } finally {
        isLoadingModalProduk.value = false;
    }
};

const goToNampanPage = (page) => {
    if (page >= 1 && page <= totalNampanPages.value) {
        currentPage.value = page;
    }
};

const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(value);
};

const openEditModal = (item) => {
    console.log('Open edit modal for item:', item);
};

const handleDeleteProduk = (id) => {
    console.log('Handle delete for product ID:', id);
};

const handleSelectProduk = (produkId) => {
    console.log('Selected product with ID:', produkId);
    // Tambahkan logika di sini untuk menambahkan produk ke nampan
};

const toggleHeaderCollapse = () => isHeaderCollapsed.value = !isHeaderCollapsed.value;

const openTambahProdukModal = () => {
    if (!selectedNampanId.value) {
        showToast('Silakan pilih nampan terlebih dahulu.', 'warning');
        return;
    }
    // Jika nampan sudah dipilih, panggil fungsi untuk memuat data modal
    fetchProdukModal();
};

onMounted(() => {
    fetchNampanList();
    feather.replace();
});

watch(paginatedNampanList, () => {
    feather.replace();
});

watch(isHeaderCollapsed, (newValue) => {
    if (newValue) {
        document.body.classList.add('header-collapse');
    } else {
        document.body.classList.remove('header-collapse');
    }
});
</script>

<style scoped>
/* CSS tambahan untuk tampilan lebih rapi */
.list-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.grid-showcase.d-flex {
    gap: 1.5rem;
}

.list-group-item.active {
    z-index: 2;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
}

.list-group-item.active .text-muted {
    color: #e9ecef !important;
}

.badge {
    background-color: #007bff;
}

.list-group-item.active .badge {
    background-color: #ffc107 !important;
}
</style>