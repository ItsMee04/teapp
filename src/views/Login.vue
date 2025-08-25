<template>
    <div class="account-page">
        <div class="main-wrapper">
            <div class="account-content">
                <div class="login-wrapper login-new">
                    <div class="container">
                        <div class="login-content user-login">
                            <div class="login-logo">
                                <img src="/src/assets/img/logo.png" alt="img">
                                <a href="index.html" class="login-logo logo-white">
                                    <img src="/src/assets/img/logo-white.png" alt>
                                </a>
                            </div>
                            <form @submit.prevent="handleLogin">
                                <div class="login-userset">
                                    <div class="login-userheading">
                                        <h3>Sign In</h3>
                                        <h4>Access the Dreamspos panel using your email and passcode.</h4>
                                    </div>
                                    <div class="form-login">
                                        <label class="form-label">Email Address</label>
                                        <div class="form-addons">
                                            <input type="text" v-model="email" class="form-control"
                                                placeholder="Masukan email">
                                            <img src="/src/assets/img/icons/mail.svg" alt="img">
                                        </div>
                                        <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
                                    </div>
                                    <div class="form-login">
                                        <label>Password</label>
                                        <div class="pass-group">
                                            <input :type="showPassword ? 'text' : 'password'" v-model="password"
                                                class="form-control pass-input" placeholder="Masukkan password" />
                                            <i class="fas" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
                                                @click="togglePassword"
                                                style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer;"></i>
                                        </div>
                                        <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>
                                    </div>
                                    <div class="form-login authentication-check">
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="custom-control custom-checkbox">
                                                    <label class="checkboxs ps-4 mb-0 pb-0 line-height-1">
                                                        <input type="checkbox" v-model="rememberMe">
                                                        <span class="checkmarks"></span>Remember me
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-login">
                                        <button class="btn btn-login" type="submit">Sign In</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="my-4 d-flex justify-content-center align-items-center copyright-text">
                            <p>Copyright &copy; 2023 DreamsPOS. All rights reserved</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { showToast } from "@/utilities/toastfy";

const email = ref("")
const password = ref("")
const rememberMe = ref(false)
const showPassword = ref(false)

const errors = reactive({
    email: "",
    password: "",
});

// Saat halaman dibuka, cek apakah ada email tersimpan
onMounted(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
        email.value = savedEmail;
        rememberMe.value = true;
    }
});

// Validasi form
const validateForm = () => {
    let isValid = true;
    errors.email = "";
    errors.password = "";

    if (!email.value && !password.value) {
        showToast("Email dan Password wajib diisi!", "error")
        return
    }

    // Validasi email
    if (!email.value) {
        errors.email = "Email wajib diisi";
        isValid = false;
        showToast("Email wajib diisi!", "error")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        errors.email = "Format email tidak valid";
        isValid = false;
        showToast("Format email tidak valid!", "error")
    }

    // Validasi password
    if (!password.value) {
        errors.password = "Password wajib diisi";
        isValid = false;
        showToast("Password wajib diisi!", "error")
    }

    return isValid;
};

const togglePassword = () => {
    showPassword.value = !showPassword.value
}

// Login function
const handleLogin = () => {
    if (!validateForm()) return;

    // Simulasi login sukses
    if (rememberMe.value) {
        localStorage.setItem("rememberEmail", email.value);
    } else {
        localStorage.removeItem("rememberEmail");
    }

   showToast("Login Berhasil !", "success")
};
</script>