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
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="paginatedData.length === 0">
                                        <td colspan="8" class="text-center">Tidak ada data.</td>
                                    </tr>
                                    <tr v-else v-for="(item, index) in paginatedData" :key="index">
                                        <th scope="row">{{ startIndex + index + 1 }}</th>
                                        <td>
                                            <div class="lh-1 text-center">
                                                <img :src="'http://127.0.0.1:8000/storage/barcode/' + item.kodeproduk + '.png'"
                                                    :alt="'Barcode ' + item.kodeproduk"
                                                    style="max-width: 100px; height: auto; display: block; margin: 0 auto 5px auto;">
                                                <span style="display: block;">{{ item.kodeproduk }}</span>
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
                                                <span>{{ formatRupiah(item.harga_jual) }}</span>
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
                                                    data-bs-target="#viewProdukModal" title="View"
                                                    @click.prevent="openViewModal(item)">
                                                    <i data-feather="eye" class="feather-eye"></i>
                                                </a>
                                                <a href="#" class="me-2 edit-icon p-2" data-bs-toggle="tooltip"
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
            <div class="modal fade" id="tambahProdukModal" tabindex="-1" aria-labelledby="tambahProdukModalLabel"
                aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div class="modal-dialog modal-dialog-centered custom-modal-two">
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
                                    <form @submit.prevent="handleStoreProduk">
                                        <div class="mb-3">
                                            <label class="form-label">Nama <span
                                                    class="text-danger ms-1">*</span></label>
                                            <input type="text" v-model="form.nama" class="form-control"
                                                :class="{ 'is-invalid': errors.nama }">
                                            <div class="invalid-feedback" v-if="errors.nama">{{ errors.nama }}</div>
                                        </div>
                                        <div class="row">
                                            <div class="mb-3 col-md-6">
                                                <label class="form-label">Kondisi<span
                                                        class="text-danger ms-1">*</span></label>
                                                <div>
                                                    <VueMultiselect v-model="form.kondisi" :options="kondisiList"
                                                        :allow-empty="false" :searchable="true"
                                                        placeholder="Pilih Kondisi" label="kondisi" track-by="id"
                                                        :class="{ 'is-invalid': errors.kondisi }">
                                                    </VueMultiselect>
                                                </div>
                                                <div class="invalid-feedback" v-if="errors.kondisi">{{ errors.kondisi }}
                                                </div>
                                            </div>
                                            <div class="mb-3 col-md-6">
                                                <label class="form-label">Jenis<span
                                                        class="text-danger ms-1">*</span></label>
                                                <div>
                                                    <VueMultiselect v-model="form.jenis" :options="jenisList"
                                                        :allow-empty="false" :preselect-first="true" :searchable="true"
                                                        placeholder="Pilih Jenis" label="jenis_produk" track-by="id"
                                                        :class="{ 'is-invalid': errors.jenis }">
                                                    </VueMultiselect>
                                                </div>
                                                <div class="invalid-feedback" v-if="errors.jenis">{{ errors.jenis }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="mb-3 col-md-6">
                                                <label class="form-label">Berat<span
                                                        class="text-danger ms-1">*</span></label>
                                                <input type="text" v-model="form.berat" class="form-control"
                                                    :class="{ 'is-invalid': errors.berat }">
                                                <div class="invalid-feedback" v-if="errors.berat">{{ errors.berat }}
                                                </div>
                                            </div>
                                            <div class="mb-3 col-md-6">
                                                <label class="form-label">Karat<span
                                                        class="text-danger ms-1">*</span></label>
                                                <input type="text" v-model="form.karat" class="form-control"
                                                    :class="{ 'is-invalid': errors.karat }">
                                                <div class="invalid-feedback" v-if="errors.karat">{{ errors.karat }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="mb-3 col-md-6">
                                                <label class="form-label">Lingkar<span
                                                        class="text-danger ms-1">*</span></label>
                                                <input type="text" v-model="form.lingkar" class="form-control"
                                                    :class="{ 'is-invalid': errors.lingkar }">
                                                <div class="invalid-feedback" v-if="errors.lingkar">{{ errors.lingkar }}
                                                </div>
                                            </div>
                                            <div class="mb-3 col-md-6">
                                                <label class="form-label">Panjang<span
                                                        class="text-danger ms-1">*</span></label>
                                                <input type="text" v-model="form.panjang" class="form-control"
                                                    :class="{ 'is-invalid': errors.panjang }">
                                                <div class="invalid-feedback" v-if="errors.panjang">{{ errors.panjang }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="mb-3 col-md-6">
                                                <label class="form-label">Harga Jual<span
                                                        class="text-danger ms-1">*</span></label>
                                                <input type="text" v-model="form.hargajual" class="form-control"
                                                    :class="{ 'is-invalid': errors.hargajual }">
                                                <div class="invalid-feedback" v-if="errors.hargajual">{{
                                                    errors.hargajual }}</div>
                                            </div>
                                            <div class="mb-3 col-md-6">
                                                <label class="form-label">Harga Beli<span
                                                        class="text-danger ms-1">*</span></label>
                                                <input type="text" v-model="form.hargabeli" class="form-control"
                                                    :class="{ 'is-invalid': errors.hargabeli }">
                                                <div class="invalid-feedback" v-if="errors.hargabeli">{{
                                                    errors.hargabeli }}</div>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Keterangan<span
                                                    class="text-danger ms-1">*</span></label>
                                            <textarea v-model="form.keterangan" class="form-control" cols="30" rows="4"
                                                :class="{ 'is-invalid': errors.keterangan }"></textarea>
                                            <div class="invalid-feedback" v-if="errors.keterangan">{{ errors.keterangan
                                                }}</div>
                                        </div>
                                        <div class="add-choosen">
                                            <div class="mb-3">
                                                <label class="form-label">Foto Produk</label>
                                                <div class="image-upload">
                                                    <input type="file" name="imageProduk" id="imageProduk"
                                                        @change="handleImageChange">
                                                    <div class="image-uploads">
                                                        <i data-feather="upload" class="plus-down-add me-0"></i>
                                                        <h4>Upload Foto Produk</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="phone-img mt-3"
                                                style="width: 150px; height: 150px; overflow: hidden; border-radius: 8px; border: 2px dashed #ccc; position: relative;">
                                                <img v-if="imagePreviewUrl" :src="imagePreviewUrl" alt="previewImage"
                                                    style="width: 100%; height: 100%; display: block; object-fit: contain;">
                                                <div v-else
                                                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; text-align: center; color: #888; font-size: 14px; padding: 10px;">
                                                    <span class="text-center">Pratinjau Gambar</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer-btn">
                                            <button type="button" class="btn btn-warning me-2"
                                                data-bs-dismiss="modal">Batal</button>
                                            <button type="submit" class="btn btn-secondary">Simpan Produk</button>
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
            <div class="modal fade" id="editProdukModal" tabindex="-1" aria-labelledby="editProdukModalLabel"
                aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div class="modal-dialog modal-dialog-centered custom-modal-two">
                    <div class="modal-content">
                        <div class="page-wrapper-new p-0">
                            <div class="content">
                                <div class="modal-header border-0 custom-modal-header">
                                    <div class="page-title">
                                        <h4>EDIT PRODUK</h4>
                                    </div>
                                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body custom-modal-body">
                                    <form @submit.prevent="handleUpdateProduk">
                                        <div class="mb-3">
                                            <label class="form-label">Nama <span
                                                    class="text-danger ms-1">*</span></label>
                                            <input type="text" v-model="editForm.nama" class="form-control"
                                                :class="{ 'is-invalid': editErrors.nama }">
                                            <div class="invalid-feedback" v-if="editErrors.nama">{{ editErrors.nama }}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="mb-3 col-md-6">
                                                <label class="form-label">Kondisi<span
                                                        class="text-danger ms-1">*</span></label>
                                                <div>
                                                    <VueMultiselect v-model="editForm.kondisi" :options="kondisiList"
                                                        :allow-empty="false" :searchable="true"
                                                        placeholder="Pilih Kondisi" label="kondisi" track-by="id"
                                                        :class="{ 'is-invalid': editErrors.kondisi }">
                                                    </VueMultiselect>
                                                </div>
                                                <div class="invalid-feedback" v-if="editErrors.kondisi">{{
                                                    editErrors.kondisi }}
                                                </div>
                                            </div>
                                            <div class="mb-3 col-md-6">
                                                <label class="form-label">Jenis<span
                                                        class="text-danger ms-1">*</span></label>
                                                <div>
                                                    <VueMultiselect v-model="editForm.jenis" :options="jenisList"
                                                        :allow-empty="false" :preselect-first="true" :searchable="true"
                                                        placeholder="Pilih Jenis" label="jenis_produk" track-by="id"
                                                        :class="{ 'is-invalid': editErrors.jenis }">
                                                    </VueMultiselect>
                                                </div>
                                                <div class="invalid-feedback" v-if="editErrors.jenis">{{
                                                    editErrors.jenis }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="mb-3 col-md-6">
                                                <label class="form-label">Berat<span
                                                        class="text-danger ms-1">*</span></label>
                                                <input type="text" v-model="editForm.berat" class="form-control"
                                                    :class="{ 'is-invalid': editErrors.berat }">
                                                <div class="invalid-feedback" v-if="editErrors.berat">{{
                                                    editErrors.berat }}
                                                </div>
                                            </div>
                                            <div class="mb-3 col-md-6">
                                                <label class="form-label">Karat<span
                                                        class="text-danger ms-1">*</span></label>
                                                <input type="text" v-model="editForm.karat" class="form-control"
                                                    :class="{ 'is-invalid': editErrors.karat }">
                                                <div class="invalid-feedback" v-if="editErrors.karat">{{
                                                    editErrors.karat }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="mb-3 col-md-6">
                                                <label class="form-label">Lingkar<span
                                                        class="text-danger ms-1">*</span></label>
                                                <input type="text" v-model="editForm.lingkar" class="form-control"
                                                    :class="{ 'is-invalid': editErrors.lingkar }">
                                                <div class="invalid-feedback" v-if="editErrors.lingkar">{{
                                                    editErrors.lingkar }}
                                                </div>
                                            </div>
                                            <div class="mb-3 col-md-6">
                                                <label class="form-label">Panjang<span
                                                        class="text-danger ms-1">*</span></label>
                                                <input type="text" v-model="editForm.panjang" class="form-control"
                                                    :class="{ 'is-invalid': editErrors.panjang }">
                                                <div class="invalid-feedback" v-if="editErrors.panjang">{{
                                                    editErrors.panjang }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="mb-3 col-md-6">
                                                <label class="form-label">Harga Jual<span
                                                        class="text-danger ms-1">*</span></label>
                                                <input type="text" v-model="editForm.hargajual" class="form-control"
                                                    :class="{ 'is-invalid': editErrors.hargajual }">
                                                <div class="invalid-feedback" v-if="editErrors.hargajual">{{
                                                    editErrors.hargajual }}</div>
                                            </div>
                                            <div class="mb-3 col-md-6">
                                                <label class="form-label">Harga Beli<span
                                                        class="text-danger ms-1">*</span></label>
                                                <input type="text" v-model="editForm.hargabeli" class="form-control"
                                                    :class="{ 'is-invalid': editErrors.hargabeli }">
                                                <div class="invalid-feedback" v-if="editErrors.hargabeli">{{
                                                    editErrors.hargabeli }}</div>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Keterangan<span
                                                    class="text-danger ms-1">*</span></label>
                                            <textarea v-model="editForm.keterangan" class="form-control" cols="30"
                                                rows="4" :class="{ 'is-invalid': editErrors.keterangan }"></textarea>
                                            <div class="invalid-feedback" v-if="editErrors.keterangan">{{
                                                editErrors.keterangan
                                                }}</div>
                                        </div>
                                        <div class="add-choosen">
                                            <div class="mb-3">
                                                <label class="form-label">Foto Produk</label>
                                                <div class="image-upload">
                                                    <input type="file" name="imageProduk" id="imageProduk"
                                                        @change="handleEditImageChange">
                                                    <div class="image-uploads">
                                                        <i data-feather="upload" class="plus-down-add me-0"></i>
                                                        <h4>Upload Foto Produk</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="phone-img mt-3"
                                                style="width: 150px; height: 150px; overflow: hidden; border-radius: 8px; border: 2px dashed #ccc; position: relative;">
                                                <img v-if="editImageUrl" :src="editImageUrl" alt="previewImage"
                                                    style="width: 100%; height: 100%; display: block; object-fit: contain;">
                                                <div v-else
                                                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; text-align: center; color: #888; font-size: 14px; padding: 10px;">
                                                    <span class="text-center">Pratinjau Gambar</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer-btn">
                                            <button type="button" class="btn btn-warning me-2"
                                                data-bs-dismiss="modal">Batal</button>
                                            <button type="submit" class="btn btn-secondary">Simpan Produk</button>
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
            <div class="modal fade" id="viewProdukModal" tabindex="-1" aria-labelledby="viewProdukModalLabel"
                aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div class="modal-dialog modal-xl modal-dialog-centered custom-modal-two">
                    <div class="modal-content">
                        <div class="page-wrapper-new p-0">
                            <div class="content">
                                <div class="modal-header border-0 custom-modal-header">
                                    <div class="page-title">
                                        <h4>VIEW PRODUK</h4>
                                    </div>
                                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body custom-modal-body">
                                    <div class="row">
                                        <div class="col-lg-8 col-sm-12">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="bar-code-view">
                                                        <img :src="editForm.barcode_url" alt="barcode" width="100px">
                                                        <a class="printimg">
                                                            <img src="/src/assets/img/icons/printer.svg" alt="print">
                                                        </a>
                                                    </div>
                                                    <div class="productdetails">
                                                        <ul class="product-bar">
                                                            <li>
                                                                <h4>KODE PRODUK</h4>
                                                                <h6>{{ editForm.kodeproduk }}</h6>
                                                            </li>
                                                            <li>
                                                                <h4>JENIS PRODUK</h4>
                                                                <h6>{{ editForm.jenis }}</h6>
                                                            </li>
                                                            <li>
                                                                <h4>BERAT</h4>
                                                                <h6>{{ editForm.berat }}</h6>
                                                            </li>
                                                            <li>
                                                                <h4>KARAT</h4>
                                                                <h6>{{ editForm.karat }}</h6>
                                                            </li>
                                                            <li>
                                                                <h4>LINGKAR</h4>
                                                                <h6>{{ editForm.lingkar }}</h6>
                                                            </li>
                                                            <li>
                                                                <h4>PANJANG</h4>
                                                                <h6>{{ editForm.panjang }}</h6>
                                                            </li>
                                                            <li>
                                                                <h4>HARGA / GRAM</h4>
                                                                <h6>{{ editForm.hargajual }}</h6>
                                                            </li>
                                                            <li>
                                                                <h4>STATUS</h4>
                                                                <h6 v-if="editForm.status === 1">
                                                                    <span class="badge bg-success">In Stok</span>
                                                                </h6>
                                                                <h6 v-else>
                                                                    <span class="badge bg-danger">Out Stok</span>
                                                                </h6>
                                                            </li>
                                                            <li>
                                                                <h4>KETERANGAN</h4>
                                                                <h6>{{ editForm.keterangan }}</h6>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-sm-12">
                                            <div class="product-box">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div class="slider-product-details">
                                                            <div class="owl-carousel owl-theme product-slide">
                                                                <div class="slider-product">
                                                                    <img :src="editForm.existing_image_url" alt="img"
                                                                        class="responsive-image">
                                                                    <h4>{{ editForm.kodeproduk + '.png' }}</h4>
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
import VueMultiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';

// ===================================
// STATE
// ===================================
const jenisList = ref([]);
const kondisiList = ref([]);
const allData = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(5);
const searchQuery = ref('');
const isHeaderCollapsed = ref(false);
const form = ref({
    nama: '',
    kondisi: null,
    jenis: null,
    berat: '',
    karat: '',
    lingkar: '',
    panjang: '',
    hargajual: '',
    hargabeli: '',
    keterangan: '',
    image_produk: null,
});

// State untuk form edit
const editForm = ref({
    id: null, // Tambahkan ID untuk mengidentifikasi produk yang diedit
    nama: '',
    kondisi: null,
    jenis: null,
    berat: '',
    karat: '',
    lingkar: '',
    panjang: '',
    hargajual: '',
    hargabeli: '',
    keterangan: '',
    imageProduk: null,
    new_image_file: null, // <-- Tambahkan properti ini
});

const errors = ref({});
const editErrors = ref({});
const imagePreviewUrl = ref(null);
const newImagePreviewUrl = ref(null);

// ===================================
// LOGIKA STORE PRODUK
// ===================================

const fetchDataFromApi = async () => {
    try {
        const responseData = await produkService.getProduk();
        allData.value = responseData.map(item => ({
            ...item,
            image: item.image_produk
                ? `http://127.0.0.1:8000/storage/produk/${item.image_produk}?t=${new Date().getTime()}`
                : '/src/assets/img/avatar/avatar-1.jpg', // Ganti dengan placeholder gambar produk
            status_label: item.status === 1 ? 'Aktif' : 'Tidak Aktif',
            status_class: item.status === 1 ? 'bg-soft-success' : 'bg-soft-danger'
        }));
    } catch (error) {
        console.error('Gagal memuat data dari API:', error);
    }
};

// Di dalam script setup atau methods option
const formatRupiah = (value) => {
    if (isNaN(value)) {
        return 'Rp 0';
    }
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0, // Opsional: atur desimal
    });
    return formatter.format(value);
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
        kondisiList.value = response; // Diperbaiki, sekarang mengarah ke kondisiList
    } catch (error) {
        console.error('Gagal memuat data kondisi:', error);
    }
};

const resetForm = () => {
    form.value = {
        nama: '',
        kondisi: null,
        jenis: null,
        berat: '',
        karat: '',
        lingkar: '',
        panjang: '',
        hargajual: '',
        hargabeli: '',
        keterangan: '',
        image_produk: null,
    };
    imagePreviewUrl.value = null;
    errors.value = {};
    const modalElement = document.getElementById('tambahProdukModal');
    if (modalElement) {
        const modal = Modal.getInstance(modalElement);
        if (modal) {
            modal.hide();
        }
    }
};

const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        form.value.image_produk = file;
        imagePreviewUrl.value = URL.createObjectURL(file);
    } else {
        form.value.image_produk = null;
        imagePreviewUrl.value = null;
    }
};

const validateForm = () => {
    errors.value = {};
    let isValid = true;
    if (!form.value.nama.trim()) { errors.value.nama = 'Nama wajib diisi.'; isValid = false; }
    if (!form.value.kondisi) { errors.value.kondisi = 'Kondisi wajib diisi.'; isValid = false; }
    if (!form.value.jenis) { errors.value.jenis = 'Jenis wajib diisi.'; isValid = false; }

    // Mengubah koma menjadi titik untuk input berat
    if (form.value.berat) {
        form.value.berat = form.value.berat.toString().replace(/,/g, '.');
    }

    // Validasi Berat
    if (!form.value.berat || isNaN(form.value.berat) || parseFloat(form.value.berat) <= 0) {
        errors.value.berat = 'Berat wajib diisi dengan angka desimal positif.';
        isValid = false;
    }

    // Validasi Karat
    if (!form.value.karat || isNaN(form.value.karat) || !Number.isInteger(Number(form.value.karat)) || Number(form.value.karat) <= 0) {
        errors.value.karat = 'Karat wajib diisi dengan angka bulat positif.';
        isValid = false;
    }

    // Validasi Lingkar
    if (!form.value.lingkar || isNaN(form.value.lingkar) || !Number.isInteger(Number(form.value.lingkar)) || Number(form.value.lingkar) <= 0) {
        errors.value.lingkar = 'Lingkar wajib diisi dengan angka bulat positif.';
        isValid = false;
    }

    // Validasi Panjang
    if (!form.value.panjang || isNaN(form.value.panjang) || !Number.isInteger(Number(form.value.panjang)) || Number(form.value.panjang) <= 0) {
        errors.value.panjang = 'Panjang wajib diisi dengan angka bulat positif.';
        isValid = false;
    }

    // Validasi Harga Jual
    if (!form.value.hargajual || isNaN(form.value.hargajual) || !Number.isInteger(Number(form.value.hargajual)) || Number(form.value.hargajual) < 0) {
        errors.value.hargajual = 'Harga Jual wajib diisi dengan angka bulat positif atau 0.';
        isValid = false;
    }

    // Validasi Harga Beli
    if (!form.value.hargabeli || isNaN(form.value.hargabeli) || !Number.isInteger(Number(form.value.hargabeli)) || Number(form.value.hargabeli) < 0) {
        errors.value.hargabeli = 'Harga Beli wajib diisi dengan angka bulat positif atau 0.';
        isValid = false;
    }

    if (!form.value.keterangan.trim()) { errors.value.keterangan = 'Keterangan wajib diisi.'; isValid = false; }
    return isValid;
};

const handleStoreProduk = async () => {
    if (!validateForm()) { showToast('Mohon periksa kembali input Anda!', 'error'); return; }
    const formData = new FormData();
    formData.append('nama', form.value.nama);
    formData.append('kondisi', form.value.kondisi.id); // Mengambil ID dari objek yang dipilih
    formData.append('jenis', form.value.jenis.id);     // Mengambil ID dari objek yang dipilih
    formData.append('berat', form.value.berat);
    formData.append('karat', form.value.karat);
    formData.append('lingkar', form.value.lingkar);
    formData.append('panjang', form.value.panjang);
    formData.append('hargajual', form.value.hargajual);
    formData.append('hargabeli', form.value.hargabeli);
    formData.append('keterangan', form.value.keterangan);
    if (form.value.image_produk) {
        formData.append('imageProduk', form.value.image_produk);
    }
    try {
        await produkService.storeProduk(formData);
        showToast('Data produk berhasil ditambahkan!', 'success');
        resetForm();
        fetchDataFromApi();
    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
            errors.value = error.response.data.errors;
            showToast('Gagal menyimpan data. Mohon periksa kembali formulir.', 'error');
        } else {
            console.error('Gagal menyimpan data produk:', error);
            showToast('Terjadi kesalahan saat menyimpan data produk.', 'error');
        }
    }
};

// ===================================
// LOGIKA EDIT PRODUK
// ===================================

const editImageUrl = computed(() => {
    // Prioritaskan gambar yang baru diunggah
    if (newImagePreviewUrl.value) {
        return newImagePreviewUrl.value;
    }
    // Jika tidak ada, gunakan URL gambar dari database (jika ada)
    if (editForm.value.existing_image_url) {
        return editForm.value.existing_image_url;
    }
    return null;
});

const handleEditImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        // Simpan file ke properti yang benar
        editForm.value.new_image_file = file;
        // Buat URL sementara untuk pratinjau
        newImagePreviewUrl.value = URL.createObjectURL(file);
    } else {
        editForm.value.new_image_file = null;
        newImagePreviewUrl.value = null;
    }
};

const openEditModal = (produk) => {
    // ... (kode pengisian form yang lain)

    editForm.value.id = produk.id;
    editForm.value.nama = produk.nama;
    editForm.value.kondisi = kondisiList.value.find(c => c.id === produk.kondisi_id);
    editForm.value.jenis = jenisList.value.find(j => j.id === produk.jenisproduk_id);
    editForm.value.berat = produk.berat;
    editForm.value.karat = produk.karat;
    editForm.value.lingkar = produk.lingkar;
    editForm.value.panjang = produk.panjang;
    editForm.value.hargajual = produk.harga_jual;
    editForm.value.hargabeli = produk.harga_beli;
    editForm.value.keterangan = produk.keterangan;

    // Reset file baru dan URL pratinjau
    editForm.value.new_image_file = null;
    newImagePreviewUrl.value = null;

    // Set URL gambar yang sudah ada dari server
    if (produk.image_produk) {
        editForm.value.existing_image_url = `http://127.0.0.1:8000/storage/produk/${produk.image_produk}`;
    } else {
        editForm.value.existing_image_url = null;
    }

    // Tampilkan modal edit
    const modal = new Modal(document.getElementById('editProdukModal'));
    modal.show();
};

const handleUpdateProduk = async () => {
    // 1. Validasi Sisi Klien
    let isValid = true;
    editErrors.value = {};

    // Validasi Nama
    if (!editForm.value.nama || !editForm.value.nama.trim()) {
        editErrors.value.nama = 'Nama wajib diisi.';
        isValid = false;
    }

    // Validasi Kondisi & Jenis
    if (!editForm.value.kondisi) {
        editErrors.value.kondisi = 'Kondisi wajib diisi.';
        isValid = false;
    }
    if (!editForm.value.jenis) {
        editErrors.value.jenis = 'Jenis wajib diisi.';
        isValid = false;
    }

    // Mengubah koma menjadi titik untuk input berat sebelum validasi
    if (editForm.value.berat) {
        editForm.value.berat = editForm.value.berat.toString().replace(/,/g, '.');
    }

    // Validasi Berat
    if (!editForm.value.berat || isNaN(parseFloat(editForm.value.berat)) || parseFloat(editForm.value.berat) <= 0) {
        editErrors.value.berat = 'Berat wajib diisi dengan angka desimal positif.';
        isValid = false;
    }

    // Validasi Karat
    if (!editForm.value.karat || isNaN(Number(editForm.value.karat)) || !Number.isInteger(Number(editForm.value.karat)) || Number(editForm.value.karat) <= 0) {
        editErrors.value.karat = 'Karat wajib diisi dengan angka bulat positif.';
        isValid = false;
    }

    // Validasi Lingkar
    if (!editForm.value.lingkar || isNaN(Number(editForm.value.lingkar)) || !Number.isInteger(Number(editForm.value.lingkar)) || Number(editForm.value.lingkar) <= 0) {
        editErrors.value.lingkar = 'Lingkar wajib diisi dengan angka bulat positif.';
        isValid = false;
    }

    // Validasi Panjang
    if (!editForm.value.panjang || isNaN(Number(editForm.value.panjang)) || !Number.isInteger(Number(editForm.value.panjang)) || Number(editForm.value.panjang) <= 0) {
        editErrors.value.panjang = 'Panjang wajib diisi dengan angka bulat positif.';
        isValid = false;
    }

    // Validasi Harga Jual
    if (!editForm.value.hargajual || isNaN(Number(editForm.value.hargajual)) || !Number.isInteger(Number(editForm.value.hargajual)) || Number(editForm.value.hargajual) < 0) {
        editErrors.value.hargajual = 'Harga Jual wajib diisi dengan angka bulat positif atau 0.';
        isValid = false;
    }

    // Validasi Harga Beli
    // Pertama, pastikan field tidak kosong atau nol
    const hargabeliValue = editForm.value.hargabeli;
    if (hargabeliValue === null || hargabeliValue === '') {
        editErrors.value.hargabeli = 'Harga Beli wajib diisi.';
        isValid = false;
    } else if (isNaN(Number(hargabeliValue)) || !Number.isInteger(Number(hargabeliValue)) || Number(hargabeliValue) < 0) {
        editErrors.value.hargabeli = 'Harga Beli wajib diisi dengan angka bulat positif atau 0.';
        isValid = false;
    }

    // Validasi Keterangan
    if (!editForm.value.keterangan || !editForm.value.keterangan.trim()) {
        editErrors.value.keterangan = 'Keterangan wajib diisi.';
        isValid = false;
    }

    // Hentikan eksekusi jika validasi gagal
    if (!isValid) {
        showToast('Mohon periksa kembali input Anda!', 'error');
        return;
    }

    // 2. Siapkan FormData
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('nama', editForm.value.nama);
    // Menggunakan ID dari objek yang dipilih oleh VueMultiselect
    formData.append('kondisi', editForm.value.kondisi.id);
    formData.append('jenis', editForm.value.jenis.id);
    formData.append('berat', editForm.value.berat);
    formData.append('karat', editForm.value.karat);
    formData.append('lingkar', editForm.value.lingkar);
    formData.append('panjang', editForm.value.panjang);
    formData.append('hargajual', editForm.value.hargajual);
    formData.append('hargabeli', editForm.value.hargabeli);
    formData.append('keterangan', editForm.value.keterangan);

    // Gunakan properti yang benar untuk menambahkan file baru
    if (editForm.value.new_image_file) {
        formData.append('imageProduk', editForm.value.new_image_file);
    }

    // 3. Kirim data ke API
    try {
        await produkService.updateProduk(editForm.value.id, formData);

        // 4. Tangani respons sukses
        // Pastikan Anda memiliki fungsi showToast() atau sejenisnya
        showToast('Data produk berhasil diperbarui!', 'success');

        const modalElement = document.getElementById('editProdukModal');
        const modal = Modal.getInstance(modalElement);
        if (modal) {
            modal.hide();
        }

        // Contoh: Muat ulang data tabel
        fetchDataFromApi();
    } catch (error) {
        // 5. Tangani respons error dari server
        if (error.response && error.response.data && error.response.data.errors) {
            editErrors.value = error.response.data.errors;
        } else {
            console.error('Gagal memperbarui data:', error);
            showToast('Terjadi kesalahan saat memperbarui data.', 'error');
        }
    }
};

// ===================================
// LOGIKA DELETE
// ===================================
const handleDeleteProduk = async (id) => {
    const result = await Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Data yang dihapus tidak dapat dikembalikan!',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
    });
    if (result.isConfirmed) {
        try {
            await produkService.deleteProduk(id);
            showToast('Data produk berhasil dihapus!', 'success');
            fetchDataFromApi();
        } catch (error) {
            console.error('Gagal menghapus data produk:', error);
            showToast('Terjadi kesalahan saat menghapus data produk.', 'error');
        }
    }
};

// ===================================
// LOGIKA VIEW PRODUK
// ===================================

const openViewModal = (produk) => {
    editForm.value.id = produk.id;
    editForm.value.kodeproduk = produk.kodeproduk;
    editForm.value.nama = produk.nama;
    editForm.value.jenis = produk.jenisproduk.jenis_produk;
    editForm.value.berat = produk.berat;
    editForm.value.karat = produk.karat;
    editForm.value.lingkar = produk.lingkar;
    editForm.value.panjang = produk.panjang;
    editForm.value.hargajual = produk.harga_jual;
    editForm.value.hargabeli = produk.harga_beli;
    editForm.value.keterangan = produk.keterangan;
    editForm.value.status = produk.status;

    // Set URL gambar yang sudah ada dari server
    if (produk.image_produk) {
        editForm.value.existing_image_url = `http://127.0.0.1:8000/storage/produk/${produk.image_produk}`;
    } else {
        editForm.value.existing_image_url = null;
    }

    // Membangun URL barcode
    if (produk.kodeproduk) {
        editForm.value.barcode_url = `http://127.0.0.1:8000/storage/barcode/${produk.kodeproduk}.png`;
    } else {
        editForm.value.barcode_url = null;
    }

    // Tampilkan modal edit
    const modal = new Modal(document.getElementById('viewProdukModal'));
    modal.show();
};

// ===================================
// COMPUTED PROPERTI
// ===================================
const filteredData = computed(() => {
    if (!searchQuery.value) return allData.value;
    const query = searchQuery.value.toLowerCase();
    return allData.value.filter(item => item.nama.toLowerCase().includes(query)); // Mengubah 'produk' ke 'nama'
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
    const addModal = document.getElementById('tambahProdukModal');
    if (addModal) {
        addModal.addEventListener('hidden.bs.modal', resetForm);
    }
    const editModal = document.getElementById('editProdukModal');
    if (editModal) {
        editModal.addEventListener('hidden.bs.modal', () => {
            // Hapus URL pratinjau saat modal ditutup untuk membersihkan memori
            if (newImagePreviewUrl.value) {
                URL.revokeObjectURL(newImagePreviewUrl.value);
            }
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

<style scoped>
/* Menentukan gaya untuk kotak produk */
.product-box {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    background-color: #757575;
    height: 100%;
    /* Memastikan kotak mengambil seluruh tinggi yang tersedia */
    display: flex;
    flex-direction: column;
}

/* Memastikan card mengambil seluruh tinggi kotak */
.card {
    border: none;
    height: 100%;
}

.card-body {
    height: 100%;
}

/* Memastikan gambar responsif di dalam kotak */
.responsive-image {
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: 100%;
    object-fit: contain;
}

/* Mengatur container agar gambar berada di tengah */
.slider-product-details,
.owl-carousel,
.slider-product {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>