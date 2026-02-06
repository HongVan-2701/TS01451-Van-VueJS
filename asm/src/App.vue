<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4 sticky-top">
    <div class="container">
      <router-link class="navbar-brand fw-bold" to="/">
        <i class="bi bi-journal-text me-2"></i>My Blog Light
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/">Trang chủ</router-link>
          </li>
        </ul>
         <ul class="navbar-nav">
           <li class="nav-item" v-if="currentUser">
            <router-link class="btn btn-outline-light btn-sm me-2 mt-1" to="/create">+ Viết bài</router-link>
          </li>
          <li class="nav-item" v-if="!currentUser">
            <router-link class="nav-link" to="/login">Đăng nhập</router-link>
          </li>
          <li class="nav-item" v-if="!currentUser">
            <router-link class="btn btn-primary btn-sm mt-1" to="/register">Đăng ký ngay</router-link>
          </li>
          <li class="nav-item dropdown" v-if="currentUser">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
              <i class="bi bi-person-circle"></i> {{ currentUser.name }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end shadow">
              <li><router-link class="dropdown-item" to="/profile">Hồ sơ của tôi</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item text-danger" href="#" @click="logout">Đăng xuất</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="main-container bg-light py-4" style="min-height: 80vh;">
    <div class="container bg-white p-4 rounded shadow-sm">
      <router-view @auth-change="checkLogin" />
    </div>
  </div>
</template>

<script>
export default {
  data() { return { currentUser: null } },
  created() { this.checkLogin(); },
  methods: {
    checkLogin() {
      const user = localStorage.getItem('currentUser');
      this.currentUser = user ? JSON.parse(user) : null;
    },
    logout() {
      localStorage.removeItem('currentUser');
      this.currentUser = null;
      this.$router.push('/login');
    }
  }
}
</script>

<style>
/* Thêm một chút CSS tùy chỉnh cho nền */
body {
    background-color: #f8f9fa;
}
</style>