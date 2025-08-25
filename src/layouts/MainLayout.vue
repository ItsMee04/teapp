<template>
    <div>
        <!-- Main Wrapper -->
        <div class="main-wrapper">

            <Header/>

            <Sidebar/>

            <div class="page-wrapper">
                <RouterView/>
            </div>

        </div>
        <!-- /Main Wrapper -->

    </div>
</template>
<script setup>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import { RouterView } from 'vue-router';
</script>