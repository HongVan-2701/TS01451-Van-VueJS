<template>
  <div class="row justify-content-center">
    <div class="col-md-6 col-lg-4">
      <div class="card shadow">
        <div class="card-body p-4">
          <h2 class="card-title text-center mb-4">Đăng nhập</h2>
          
          <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>

          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="form.email"
                required
                placeholder="Nhập email của bạn"
              />
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Mật khẩu</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="form.password"
                required
                placeholder="Nhập mật khẩu"
              />
            </div>

            <button
              type="submit"
              class="btn btn-primary w-100 mb-3"
              :disabled="loading"
            >
              <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
              Đăng nhập
            </button>
          </form>

          <div class="text-center">
            <p class="mb-0">
              Chưa có tài khoản?
              <router-link to="/register">Đăng ký ngay</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../utils/auth.js'

const router = useRouter()
const loading = ref(false)
const errorMessage = ref('')

const form = reactive({
  email: '',
  password: ''
})

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  const result = authService.login(form.email, form.password)

  if (result.success) {
    // Reload page to update navbar
    window.location.reload()
    router.push('/')
  } else {
    errorMessage.value = result.message
  }

  loading.value = false
}
</script>

<style scoped>
.card {
  border: none;
  border-radius: 10px;
}

.card-title {
  color: #333;
  font-weight: 600;
}
</style>
