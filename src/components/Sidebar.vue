<template>
    <div>
        <div class="sidebar" id="sidebar">
            <VueSimplebar class="sidebar-inner" :style="{ maxHeight: `${sidebarHeight}px` }">
                <div id="sidebar-menu" class="sidebar-menu">
                    <ul>
                        <li class="submenu-open">
                            <h6 class="submenu-hdr">Main</h6>
                            <ul>
                                <li :class="{ 'active': $route.path === '/dashboard' }">
                                    <router-link to="/dashboard">
                                        <i data-feather="grid"></i><span>Dashboard</span>
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="submenu-open">
                            <h6 class="submenu-hdr">Master</h6>
                            <ul>
                                <li class="submenu">
                                    <a href="javascript:void(0);"
                                        :class="{ 'subdrop': openMenuId === 'usermanagement', 'active': activeMenuId === 'usermanagement' }"
                                        @click.prevent="toggleSubmenu('usermanagement')">
                                        <i data-feather="users"></i>
                                        <span>User Management</span>
                                        <span class="menu-arrow"></span>
                                    </a>
                                    <ul :style="{ display: openMenuId === 'usermanagement' ? 'block' : 'none' }">
                                        <li>
                                            <router-link to="/jabatan"
                                                :class="{ 'active': $route.path === '/jabatan' }">Jabatan</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/pegawai"
                                                :class="{ 'active': $route.path === '/pegawai' }">Pegawai</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/role"
                                                :class="{ 'active': $route.path === '/role' }">Role</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/user" :class="{ 'active': $route.path === '/user' }">User
                                                Account</router-link>
                                        </li>
                                    </ul>
                                </li>
                                <li class="submenu">
                                    <a href="javascript:void(0);"
                                        :class="{ 'subdrop': openMenuId === 'produk', 'active': activeMenuId === 'produk' }"
                                        @click.prevent="toggleSubmenu('produk')">
                                        <i data-feather="archive"></i>
                                        <span>Produk</span>
                                        <span class="menu-arrow"></span>
                                    </a>
                                    <ul :style="{ display: openMenuId === 'produk' ? 'block' : 'none' }">
                                        <li><router-link to="/kondisi"
                                                :class="{ 'active': $route.path === '/kondisi' }">Kondisi</router-link>
                                        </li>
                                        <li><router-link to="/diskon"
                                                :class="{ 'active': $route.path === '/diskon' }">Diskon / Promo</router-link>
                                        </li>
                                        <li><router-link to="/jenisproduk"
                                                :class="{ 'active': $route.path === '/jenisproduk' }">Jenis Produk</router-link>
                                        </li>
                                        <li><router-link to="/produk"
                                                :class="{ 'active': $route.path === '/produk' }">Produk</router-link>
                                        </li>
                                        <li><router-link to="/nampan"
                                                :class="{ 'active': $route.path === '/nampan' }">Nampan</router-link>
                                        </li>
                                    </ul>
                                </li>
                                <li class="submenu">
                                    <a href="javascript:void(0);"
                                        :class="{ 'subdrop': openMenuId === 'nampan', 'active': activeMenuId === 'nampan' }"
                                        @click.prevent="toggleSubmenu('nampan')">
                                        <i data-feather="archive"></i>
                                        <span>Nampan</span>
                                        <span class="menu-arrow"></span>
                                    </a>
                                    <ul :style="{ display: openMenuId === 'nampan' ? 'block' : 'none' }">
                                        <li><router-link to="/nampanproduk"
                                                :class="{ 'active': $route.path === '/nampanproduk' }">Nampan Produk</router-link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="submenu-open">
                            <h6 class="submenu-hdr">Inventory</h6>
                            <ul>
                                <li><router-link to="/product-list.html"
                                        :class="{ 'active': $route.path === '/product-list.html' }"><i
                                            data-feather="box"></i><span>Products</span></router-link></li>
                                <li><router-link to="/add-product.html"
                                        :class="{ 'active': $route.path === '/add-product.html' }"><i
                                            data-feather="plus-square"></i><span>Create Product</span></router-link>
                                </li>
                                <li><router-link to="/expired-products.html"
                                        :class="{ 'active': $route.path === '/expired-products.html' }"><i
                                            data-feather="codesandbox"></i><span>Expired Products</span></router-link>
                                </li>
                                <li><router-link to="/low-stocks.html"
                                        :class="{ 'active': $route.path === '/low-stocks.html' }"><i
                                            data-feather="trending-down"></i><span>Low Stocks</span></router-link></li>
                                <li><router-link to="/category-list.html"
                                        :class="{ 'active': $route.path === '/category-list.html' }"><i
                                            data-feather="codepen"></i><span>Category</span></router-link></li>
                                <li><router-link to="/sub-categories.html"
                                        :class="{ 'active': $route.path === '/sub-categories.html' }"><i
                                            data-feather="speaker"></i><span>Sub Category</span></router-link></li>
                                <li><router-link to="/brand-list.html"
                                        :class="{ 'active': $route.path === '/brand-list.html' }"><i
                                            data-feather="tag"></i><span>Brands</span></router-link></li>
                                <li><router-link to="/units.html"
                                        :class="{ 'active': $route.path === '/units.html' }"><i
                                            data-feather="speaker"></i><span>Units</span></router-link></li>
                                <li><router-link to="/varriant-attributes.html"
                                        :class="{ 'active': $route.path === '/varriant-attributes.html' }"><i
                                            data-feather="layers"></i><span>Variant Attributes</span></router-link></li>
                                <li><router-link to="/warranty.html"
                                        :class="{ 'active': $route.path === '/warranty.html' }"><i
                                            data-feather="bookmark"></i><span>Warranties</span></router-link></li>
                                <li><router-link to="/barcode.html"
                                        :class="{ 'active': $route.path === '/barcode.html' }"><i
                                            data-feather="align-justify"></i><span>Print Barcode</span></router-link>
                                </li>
                                <li><router-link to="/qrcode.html"
                                        :class="{ 'active': $route.path === '/qrcode.html' }"><i
                                            data-feather="maximize"></i><span>Print QR Code</span></router-link></li>
                            </ul>
                        </li>
                        <li class="submenu-open">
                            <h6 class="submenu-hdr">Stock</h6>
                            <ul>
                                <li><router-link to="/manage-stocks.html"
                                        :class="{ 'active': $route.path === '/manage-stocks.html' }"><i
                                            data-feather="package"></i><span>Manage Stock</span></router-link></li>
                                <li><router-link to="/stock-adjustment.html"
                                        :class="{ 'active': $route.path === '/stock-adjustment.html' }"><i
                                            data-feather="clipboard"></i><span>Stock Adjustment</span></router-link>
                                </li>
                                <li><router-link to="/stock-transfer.html"
                                        :class="{ 'active': $route.path === '/stock-transfer.html' }"><i
                                            data-feather="truck"></i><span>Stock Transfer</span></router-link></li>
                            </ul>
                        </li>
                        <li class="submenu-open">
                            <h6 class="submenu-hdr">Sales</h6>
                            <ul>
                                <li><router-link to="/sales-list.html"
                                        :class="{ 'active': $route.path === '/sales-list.html' }"><i
                                            data-feather="shopping-cart"></i><span>Sales</span></router-link></li>
                                <li><router-link to="/invoice-report.html"
                                        :class="{ 'active': $route.path === '/invoice-report.html' }"><i
                                            data-feather="file-text"></i><span>Invoices</span></router-link></li>
                                <li><router-link to="/sales-returns.html"
                                        :class="{ 'active': $route.path === '/sales-returns.html' }"><i
                                            data-feather="copy"></i><span>Sales Return</span></router-link></li>
                                <li><router-link to="/quotation-list.html"
                                        :class="{ 'active': $route.path === '/quotation-list.html' }"><i
                                            data-feather="save"></i><span>Quotation</span></router-link></li>
                                <li><router-link to="/pos.html" :class="{ 'active': $route.path === '/pos.html' }"><i
                                            data-feather="hard-drive"></i><span>POS</span></router-link></li>
                            </ul>
                        </li>
                        <li class="submenu-open">
                            <h6 class="submenu-hdr">Promo</h6>
                            <ul>
                                <li><router-link to="/coupons.html"
                                        :class="{ 'active': $route.path === '/coupons.html' }"><i
                                            data-feather="shopping-cart"></i><span>Coupons</span></router-link></li>
                            </ul>
                        </li>
                        <li class="submenu-open">
                            <h6 class="submenu-hdr">Purchases</h6>
                            <ul>
                                <li><router-link to="/purchase-list.html"
                                        :class="{ 'active': $route.path === '/purchase-list.html' }"><i
                                            data-feather="shopping-bag"></i><span>Purchases</span></router-link></li>
                                <li><router-link to="/purchase-order-report.html"
                                        :class="{ 'active': $route.path === '/purchase-order-report.html' }"><i
                                            data-feather="file-minus"></i><span>Purchase Order</span></router-link></li>
                                <li><router-link to="/purchase-returns.html"
                                        :class="{ 'active': $route.path === '/purchase-returns.html' }"><i
                                            data-feather="refresh-cw"></i><span>Purchase Return</span></router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </VueSimplebar>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import feather from 'feather-icons';
import VueSimplebar from 'simplebar-vue';
import { useRoute } from 'vue-router';

const activeMenuId = ref(null);
const openMenuId = ref(null);
const sidebarHeight = ref(0);
const route = useRoute();

const submenuMapping = {
    '/dashboard': 'dashboard',

    '/jabatan': 'usermanagement',
    '/pegawai': 'usermanagement',
    '/role': 'usermanagement',
    '/user': 'usermanagement',

    '/kondisi': 'produk',
    '/diskon': 'produk',
    '/jenisproduk': 'produk',
    '/produk': 'produk',
    '/nampan': 'produk',

    '/nampanproduk': 'nampan',

    '/calendar.html': 'application',
    '/email.html': 'application',
    '/todo.html': 'application',
    '/notes.html': 'application',
    '/file-manager.html': 'application',
    '/product-list.html': 'inventory',
    '/add-product.html': 'inventory',
    '/expired-products.html': 'inventory',
    '/low-stocks.html': 'inventory',
    '/category-list.html': 'inventory',
    '/sub-categories.html': 'inventory',
    '/brand-list.html': 'inventory',
    '/units.html': 'inventory',
    '/varriant-attributes.html': 'inventory',
    '/warranty.html': 'inventory',
    '/barcode.html': 'inventory',
    '/qrcode.html': 'inventory',
    '/manage-stocks.html': 'stock',
    '/stock-adjustment.html': 'stock',
    '/stock-transfer.html': 'stock',
    '/sales-list.html': 'sales',
    '/invoice-report.html': 'sales',
    '/sales-returns.html': 'sales',
    '/quotation-list.html': 'sales',
    '/pos.html': 'sales',
    '/coupons.html': 'promo',
    '/purchase-list.html': 'purchases',
    '/purchase-order-report.html': 'purchases',
    '/purchase-returns.html': 'purchases',
};

const updateMenuStates = () => {
    const parentId = submenuMapping[route.path];
    if (parentId) {
        openMenuId.value = parentId;
        activeMenuId.value = parentId;
    } else {
        openMenuId.value = null;
        activeMenuId.value = null;
    }
};

const toggleSubmenu = (menuId) => {
    if (openMenuId.value === menuId) {
        openMenuId.value = null;
    } else {
        openMenuId.value = menuId;
    }
};

const calculateSidebarHeight = () => {
    const headerHeight = 60;
    sidebarHeight.value = window.innerHeight - headerHeight;
};

onMounted(() => {
    calculateSidebarHeight();
    window.addEventListener('resize', calculateSidebarHeight);
    feather.replace();

    updateMenuStates();
});

onUnmounted(() => {
    window.removeEventListener('resize', calculateSidebarHeight);
});

watch(() => route.path, (newPath) => {
    updateMenuStates();
});
</script>

<style scoped>
.sidebar-inner {
    width: 100%;
}
</style>