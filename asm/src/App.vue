<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <strong>Blog App</strong>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Trang chủ</router-link>
            </li>
            <li v-if="currentUser" class="nav-item">
              <router-link class="nav-link" to="/create-post">Đăng bài</router-link>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li v-if="!currentUser" class="nav-item">
              <router-link class="nav-link" to="/login">Đăng nhập</router-link>
            </li>
            <li v-if="!currentUser" class="nav-item">
              <router-link class="nav-link" to="/register">Đăng ký</router-link>
            </li>
            <li v-if="currentUser" class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  v-if="currentUser.avatar"
                  :src="currentUser.avatar"
                  alt="Avatar"
                  class="rounded-circle me-2"
                  style="width: 30px; height: 30px; object-fit: cover"
                />
                {{ currentUser.name }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li>
                  <router-link class="dropdown-item" to="/profile">Thông tin cá nhân</router-link>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#" @click.prevent="handleLogout">Đăng xuất</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="container my-4">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from './utils/auth.js'

const router = useRouter()
const currentUser = ref(null)

const loadCurrentUser = () => {
  currentUser.value = authService.getCurrentUser()
}

const handleLogout = () => {
  authService.logout()
  currentUser.value = null
  router.push('/')
}

// Listen for storage changes (when user logs in/out in another tab)
const handleStorageChange = (e) => {
  if (e.key === 'currentUser') {
    loadCurrentUser()
  }
}

onMounted(() => {
  loadCurrentUser()
  window.addEventListener('storage', handleStorageChange)
})

onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange)
})
</script>

<style>
#app {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.navbar-brand {
  font-size: 1.5rem;
}

main {
  min-height: calc(100vh - 200px);
}
</style>
