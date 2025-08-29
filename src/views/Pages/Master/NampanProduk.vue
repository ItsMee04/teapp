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
            </div>
            <div class="row">
                <div class="card">
                    <div class="card-body">
                        <div class="grid-showcase mb-3">
                            <div class="row">
                                <div class="col-4">
                                    <div class="settings-wrapper d-flex">
                                        <div class="sidebars settings-sidebar border p-3 rounded">
                                            <div class="sidebar-inner">
                                                <h6>Data Nampan / Baki</h6>

                                                <ul class="list-group mt-2 mb-2" style="max-height: 400px; overflow-y: auto;">
                                                    <li v-if="isLoadingNampan"
                                                        class="list-group-item text-center text-muted d-flex align-items-center justify-content-center"
                                                        style="height: 400px;">
                                                        <div class="d-flex flex-column align-items-center">
                                                            <div class="spinner-border spinner-border-sm me-2"
                                                                role="status"></div>
                                                            <span>Memuat...</span>
                                                        </div>
                                                    </li>
                                                    <li v-else-if="paginatedNampanList.length === 0"
                                                        class="list-group-item text-center text-muted d-flex align-items-center justify-content-center"
                                                        style="height: 400px;">
                                                        <span>Tidak ada data nampan.</span>
                                                    </li>
                                                    <li v-else v-for="nampan in paginatedNampanList" :key="nampan.id"
                                                        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                                        :class="{ 'active': selectedNampanId === nampan.id }"
                                                        @click="fetchNampanProduk(nampan.id)">
                                                        {{ nampan.nama }}
                                                        <span class="badge rounded-pill"
                                                            :class="{ 'bg-primary': selectedNampanId !== nampan.id, 'bg-warning': selectedNampanId === nampan.id }">
                                                            {{ nampan.jumlah_produk }}
                                                        </span>
                                                    </li>
                                                </ul>

                                                <nav v-if="totalNampanPages > 1" aria-label="Page navigation">
                                                    <ul class="pagination justify-content-center mb-0 mt-3">
                                                        <li class="page-item"
                                                            :class="{ 'disabled': currentPage === 1 }">
                                                            <a class="page-link" href="#"
                                                                @click.prevent="goToNampanPage(currentPage - 1)">Previous</a>
                                                        </li>
                                                        <li class="page-item" v-for="page in totalNampanPages"
                                                            :key="page" :class="{ 'active': currentPage === page }">
                                                            <a class="page-link" href="#"
                                                                @click.prevent="goToNampanPage(page)">{{ page }}</a>
                                                        </li>
                                                        <li class="page-item"
                                                            :class="{ 'disabled': currentPage === totalNampanPages }">
                                                            <a class="page-link" href="#"
                                                                @click.prevent="goToNampanPage(currentPage + 1)">Next</a>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-8">
                                    <div class="settings-page-wrap">
                                        <div class="card">
                                            <div class="card-header justify-content-between">
                                                <div class="card-title">
                                                    Daftar Produk di Nampan
                                                    <span v-if="selectedNampanName">({{ selectedNampanName }})</span>
                                                </div>
                                            </div>
                                            <div class="card-body">
                                                <div class="table-responsive">
                                                    <table class="table text-nowrap table-striped table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th>No.</th>
                                                                <th>Nama Produk</th>
                                                                <th>Harga</th>
                                                                <th>Jumlah</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-if="isLoadingProduk">
                                                                <td colspan="4" class="text-center">
                                                                    <div class="spinner-border spinner-border-sm me-2"
                                                                        role="status"></div>
                                                                    Memuat produk...
                                                                </td>
                                                            </tr>
                                                            <tr v-else-if="nampanProdukList.length === 0">
                                                                <td colspan="4" class="text-center">
                                                                    Pilih nampan dari daftar di sisi kiri.
                                                                </td>
                                                            </tr>
                                                            <tr v-else v-for="(produk, index) in nampanProdukList"
                                                                :key="produk.id">
                                                                <td>{{ index + 1 }}</td>
                                                                <td>{{ produk.nama }}</td>
                                                                <td>Rp{{ formatRupiah(produk.harga) }}</td>
                                                                <td>{{ produk.jumlah }}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import feather from 'feather-icons';
import { showToast } from "@/utilities/toastfy";

// STATE
const nampanList = ref([]);
const nampanProdukList = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(5);
const selectedNampanId = ref(null);
const selectedNampanName = ref(null);
const newNampanName = ref('');
const isLoadingNampan = ref(false);
const isLoadingProduk = ref(false);
const isCreating = ref(false);

// STATIC DATA
const staticNampanData = [
    { id: 1, nama: 'Nampan A1', jumlah_produk: 12 },
    { id: 2, nama: 'Nampan B2', jumlah_produk: 8 },
    { id: 3, nama: 'Nampan C3', jumlah_produk: 25 },
    { id: 4, nama: 'Nampan D4', jumlah_produk: 15 },
    { id: 5, nama: 'Nampan E5', jumlah_produk: 20 },
    { id: 6, nama: 'Nampan F6', jumlah_produk: 5 },
    { id: 7, nama: 'Nampan G7', jumlah_produk: 18 },
    { id: 8, nama: 'Nampan H8', jumlah_produk: 9 },
    { id: 9, nama: 'Nampan I9', jumlah_produk: 30 },
];

const staticProdukData = [
    { id: 101, nampanId: 1, nama: 'Produk Emas A', harga: 1500000, jumlah: 2 },
    { id: 102, nampanId: 1, nama: 'Produk Perak B', harga: 500000, jumlah: 10 },
    { id: 103, nampanId: 2, nama: 'Produk Emas C', harga: 2100000, jumlah: 5 },
    { id: 104, nampanId: 2, nama: 'Produk Emas D', harga: 1800000, jumlah: 3 },
    { id: 105, nampanId: 3, nama: 'Produk Perhiasan E', harga: 750000, jumlah: 25 },
    { id: 106, nampanId: 4, nama: 'Produk Berlian F', harga: 5000000, jumlah: 10 },
    { id: 107, nampanId: 4, nama: 'Produk Jam Tangan G', harga: 1200000, jumlah: 5 },
    { id: 108, nampanId: 5, nama: 'Produk Cincin H', harga: 3000000, jumlah: 20 },
    { id: 109, nampanId: 6, nama: 'Produk Kalung I', harga: 800000, jumlah: 5 },
    { id: 110, nampanId: 7, nama: 'Produk Anting J', harga: 600000, jumlah: 18 },
    { id: 111, nampanId: 8, nama: 'Produk Gelang K', harga: 950000, jumlah: 9 },
    { id: 112, nampanId: 9, nama: 'Produk Emas L', harga: 1900000, jumlah: 30 },
];

// COMPUTED UNTUK PAGINATION NAMPAN
const totalNampanItems = computed(() => nampanList.value.length);
const totalNampanPages = computed(() => Math.ceil(totalNampanItems.value / itemsPerPage.value));
const startNampanIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
const paginatedNampanList = computed(() => nampanList.value.slice(startNampanIndex.value, startNampanIndex.value + itemsPerPage.value));

// METHODS
const fetchDataFromApi = () => {
  // Method ini tidak melakukan apa-apa karena data statis
  console.log('Fetching data from API is disabled. Using static data instead.');
};

const fetchNampanList = () => {
    isLoadingNampan.value = true;
    // Simulasi loading dengan setTimeout
    setTimeout(() => {
        nampanList.value = staticNampanData;
        if (nampanList.value.length > 0) {
            fetchNampanProduk(nampanList.value[0].id);
        }
        isLoadingNampan.value = false;
    }, 500); // Penundaan 500ms untuk mensimulasikan panggilan API
};

const fetchNampanProduk = (nampanId) => {
    selectedNampanId.value = nampanId;
    isLoadingProduk.value = true;
    setTimeout(() => {
        nampanProdukList.value = staticProdukData.filter(produk => produk.nampanId === nampanId);
        const selected = nampanList.value.find(n => n.id === nampanId);
        selectedNampanName.value = selected ? selected.nama : 'Tidak diketahui';
        isLoadingProduk.value = false;
    }, 500); // Penundaan 500ms untuk mensimulasikan panggilan API
};

const goToNampanPage = (page) => {
    if (page >= 1 && page <= totalNampanPages.value) {
        currentPage.value = page;
    }
};

const createNampan = () => {
    if (!newNampanName.value.trim()) {
        showToast('Nama nampan tidak boleh kosong.', 'warning');
        return;
    }
    isCreating.value = true;
    setTimeout(() => {
        const newId = nampanList.value.length > 0 ? Math.max(...nampanList.value.map(n => n.id)) + 1 : 1;
        const newNampan = { id: newId, nama: newNampanName.value, jumlah_produk: 0 };
        nampanList.value.push(newNampan);
        showToast('Nampan berhasil dibuat.', 'success');
        newNampanName.value = '';
        isCreating.value = false;
    }, 500);
};

const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(value);
};

// LIFECYCLE HOOKS
onMounted(() => {
    fetchNampanList();
    feather.replace();
});

// WATCHERS
watch(paginatedNampanList, () => {
    feather.replace();
});
</script>