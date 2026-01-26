<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="mb-0">Danh sách bài viết</h1>
      <router-link v-if="currentUser" to="/create-post" class="btn btn-primary">
        <i class="bi bi-plus-circle"></i> Đăng bài mới
      </router-link>
    </div>

    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Đang tải...</span>
      </div>
    </div>

    <div v-else-if="posts.length === 0" class="text-center my-5">
      <p class="text-muted">Chưa có bài viết nào. Hãy là người đầu tiên đăng bài!</p>
    </div>

    <div v-else class="row">
      <div
        v-for="post in posts"
        :key="post.id"
        class="col-md-6 col-lg-4 mb-4"
      >
        <div class="card h-100 shadow-sm">
          <img
            v-if="post.image"
            :src="post.image"
            class="card-img-top"
            :alt="post.title"
            style="height: 200px; object-fit: cover"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text text-muted flex-grow-1">
              {{ truncateContent(post.content, 100) }}
            </p>
            <div class="d-flex justify-content-between align-items-center mt-auto">
              <div class="d-flex align-items-center">
                <img
                  v-if="post.authorAvatar"
                  :src="post.authorAvatar"
                  alt="Avatar"
                  class="rounded-circle me-2"
                  style="width: 30px; height: 30px; object-fit: cover"
                />
                <small class="text-muted">{{ post.authorName }}</small>
              </div>
              <small class="text-muted">{{ formatDate(post.createdAt) }}</small>
            </div>
            <router-link
              :to="`/post/${post.id}`"
              class="btn btn-outline-primary btn-sm mt-3"
            >
              Xem chi tiết
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { postService } from '../utils/posts.js'
import { authService } from '../utils/auth.js'

const posts = ref([])
const loading = ref(true)
const currentUser = ref(null)

const loadPosts = () => {
  loading.value = true
  posts.value = postService.getAllPosts()
  currentUser.value = authService.getCurrentUser()
  loading.value = false
}

const truncateContent = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Vừa xong'
  if (minutes < 60) return `${minutes} phút trước`
  if (hours < 24) return `${hours} giờ trước`
  if (days < 7) return `${days} ngày trước`
  
  return date.toLocaleDateString('vi-VN')
}

onMounted(() => {
  loadPosts()
})
</script>

<style scoped>
.card {
  transition: transform 0.2s;
  border: none;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15) !important;
}
</style>
