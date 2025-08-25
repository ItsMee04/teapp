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
                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="Collapse" id="collapse-header"><i
                                data-feather="chevron-up" class="feather-chevron-up"></i></a>
                    </li>
                </ul>
                <div class="page-btn import">
                    <a href="#" class="btn btn-added color"><i
                            data-feather="plus-circle" class="me-2"></i>Import Product</a>
                </div>
            </div>

            <div class="row">
                <div class="card">
                    <div class="card-header justify-content-between">
                        <div class="card-title">
                            <div class="search-set">
                                <div class="search-input">
                                    <input type="search" placeholder="Search ...">
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
                                    <tr>
                                        <th scope="row">IN-2032</th>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div class="avatar avatar-sm me-2 avatar-rounded">
                                                    <img src="/src/assets/img/avatar/avatar-15.jpg" alt="img">
                                                </div>
                                                <div>
                                                    <div class="lh-1">
                                                        <span>Mark Cruise</span>
                                                    </div>
                                                    <div class="lh-1">
                                                        <span class="fs-11 text-muted">
                                                            <a href="/cdn-cgi/l/email-protection" class="__cf_email__"
                                                                data-cfemail="5c313d2e373f2e29352f396e681c3b313d3530723f3331">[email&#160;protected]
                                                            </a>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span class="badge bg-soft-success">
                                                <i class="ri-check-fill align-middle me-1"></i>Paid
                                            </span>
                                        </td>
                                        <td>
                                            <div class="hstack gap-2 fs-15">
                                                <a href="javascript:void(0);" class="btn btn-icon btn-sm btn-light">
                                                    <i class="feather-download"></i>
                                                </a>
                                                <a href="javascript:void(0);" class="btn btn-icon btn-sm btn-light">
                                                    <i class="feather-edit"></i>
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
        </div>
    </div>
</template>
<script setup>
</script>