<template>
    <div>
        <div class="content container-fluid">
            <div class="page-header">
                <div class="add-item d-flex">
                    <div class="page-title">
                        <h4>HALAMAN JABATAN</h4>
                    </div>
                </div>
                <ul class="table-top-head">
                    <li>
                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh"><i data-feather="rotate-ccw"
                                class="feather-rotate-ccw"></i></a>
                    </li>
                    <li>
                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="Collapse" id="collapse-header"
                            @click="toggleHeaderCollapse" :class="{ 'active': isHeaderCollapsed }">
                            <i data-feather="chevron-up" class="feather-chevron-up"></i>
                        </a>
                    </li>
                </ul>
                <div class="page-btn import">
                    <a href="#" class="btn btn-added color" data-bs-toggle="tooltip" data-bs-placement="top"
                        title="Tambah Jabatan">
                        <i data-feather="plus-circle" class="me-2"></i>
                        Tambah Jabatan
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
                                        <th scope="col">Jabatan</th>
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
                                                        <span>{{ item.name }}</span>
                                                    </div>
                                                    <div class="lh-1">
                                                        <span class="fs-11 text-muted">
                                                            <a :href="'mailto:' + item.email">{{ item.email }}</a>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span :class="['badge', item.statusClass]">
                                                <i class="ri-check-fill align-middle me-1"></i>{{ item.status }}
                                            </span>
                                        </td>
                                        <td class="action-table-data">
                                            <div class="edit-delete-action">
                                                <a class="me-2 edit-icon p-2" data-bs-toggle="tooltip" title="Lihat">
                                                    <i data-feather="eye" class="action-eye"></i>
                                                </a>

                                                <a class="me-2 p-2" data-bs-toggle="tooltip" title="Edit">
                                                    <i data-feather="edit" class="feather-edit"></i>
                                                </a>

                                                <a class="confirm-text p-2" data-bs-toggle="tooltip" title="Hapus">
                                                    <i data-feather="trash-2" class="feather-trash-2"></i>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <nav aria-label="Page navigation">
                <ul class="pagination justify-content-center mb-3">
                    <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                        <a class="page-link" href="javascript:void(0);" @click.prevent="prevPage">Previous</a>
                    </li>

                    <li class="page-item" v-for="page in totalPages" :key="page"
                        :class="{ 'active': currentPage === page }">
                        <a class="page-link" href="javascript:void(0);" @click.prevent="goToPage(page)">{{ page }}</a>
                    </li>

                    <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                        <a class="page-link" href="javascript:void(0);" @click.prevent="nextPage">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import feather from 'feather-icons';
import axios from 'axios';

// State untuk Pagination & Search
const allData = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(5);
const searchQuery = ref('');

// State untuk Collapse Header
const isHeaderCollapsed = ref(false);

// Computed properties
const filteredData = computed(() => {
    if (!searchQuery.value) {
        return allData.value;
    }
    const query = searchQuery.value.toLowerCase();
    return allData.value.filter(item => {
        return item.name.toLowerCase().includes(query) || item.email.toLowerCase().includes(query);
    });
});
const totalItems = computed(() => filteredData.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
const endIndex = computed(() => startIndex.value + itemsPerPage.value);
const paginatedData = computed(() => {
    // Memotong data dari `filteredData`
    return filteredData.value.slice(startIndex.value, endIndex.value);
});

// Fungsi untuk Collapse Header
const toggleHeaderCollapse = () => {
    isHeaderCollapsed.value = !isHeaderCollapsed.value;
};

// Fungsi untuk merender ulang ikon Feather
const renderFeatherIcons = () => {
    feather.replace();
};

// Metode navigasi
const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};
const prevPage = () => { goToPage(currentPage.value - 1); };
const nextPage = () => { goToPage(currentPage.value + 1); };

// Fungsi untuk ambil data dari API
const fetchDataFromApi = async () => {
    try {
        // Contoh data dummy untuk sementara
        const dummyData = [];
        for (let i = 1; i <= 35; i++) {
            dummyData.push({
                id: i,
                name: `User ${i}`,
                email: `user${i}@example.com`,
                image: `/src/assets/img/avatar/avatar-${(i % 15) + 1}.jpg`,
                status: i % 2 === 0 ? 'Paid' : 'Unpaid',
                statusClass: i % 2 === 0 ? 'bg-soft-success' : 'bg-soft-danger'
            });
        }
        allData.value = dummyData;
    } catch (error) {
        console.error('Ada kesalahan saat mengambil data:', error);
    }
};

onMounted(() => {
    fetchDataFromApi();
    renderFeatherIcons();
});

// Watcher untuk merender ikon saat data yang ditampilkan berubah
watch(paginatedData, () => {
    renderFeatherIcons();
});

// Watcher untuk mereset halaman ke 1 saat query pencarian berubah
watch(searchQuery, () => {
    currentPage.value = 1;
});

// Watcher untuk memanipulasi class di <body>
watch(isHeaderCollapsed, (newValue) => {
    if (newValue) {
        document.body.classList.add('header-collapse');
    } else {
        document.body.classList.remove('header-collapse');
    }
});
</script>