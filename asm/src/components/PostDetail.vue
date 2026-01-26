<template>
  <div>
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Đang tải...</span>
      </div>
    </div>

    <div v-else-if="!post" class="alert alert-warning" role="alert">
      Bài viết không tồn tại
    </div>

    <div v-else>
      <!-- Post Content -->
      <div class="card shadow-sm mb-4">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div class="d-flex align-items-center">
              <img
                v-if="post.authorAvatar"
                :src="post.authorAvatar"
                alt="Avatar"
                class="rounded-circle me-2"
                style="width: 40px; height: 40px; object-fit: cover"
              />
              <div>
                <h6 class="mb-0">{{ post.authorName }}</h6>
                <small class="text-muted">{{ formatDate(post.createdAt) }}</small>
              </div>
            </div>
            <div v-if="isAuthor" class="btn-group">
              <router-link
                :to="`/edit-post/${post.id}`"
                class="btn btn-sm btn-outline-primary"
              >
                Chỉnh sửa
              </router-link>
              <button
                class="btn btn-sm btn-outline-danger"
                @click="handleDelete"
              >
                Xóa
              </button>
            </div>
          </div>

          <h2 class="card-title mb-3">{{ post.title }}</h2>
          
          <img
            v-if="post.image"
            :src="post.image"
            class="img-fluid rounded mb-3"
            :alt="post.title"
          />

          <div class="card-text" style="white-space: pre-wrap">{{ post.content }}</div>

          <div v-if="post.updatedAt !== post.createdAt" class="mt-3">
            <small class="text-muted">
              Đã chỉnh sửa: {{ formatDate(post.updatedAt) }}
            </small>
          </div>
        </div>
      </div>

      <!-- Comments Section -->
      <div class="card shadow-sm">
        <div class="card-header">
          <h5 class="mb-0">Bình luận ({{ post.comments?.length || 0 }})</h5>
        </div>
        <div class="card-body">
          <!-- Add Comment Form -->
          <div v-if="currentUser" class="mb-4">
            <form @submit.prevent="handleAddComment">
              <div class="mb-2">
                <textarea
                  class="form-control"
                  v-model="newComment"
                  rows="3"
                  placeholder="Viết bình luận của bạn..."
                  required
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-sm">
                Gửi bình luận
              </button>
            </form>
          </div>
          <div v-else class="alert alert-info mb-4">
            <router-link to="/login">Đăng nhập</router-link> để bình luận
          </div>

          <!-- Comments List -->
          <div v-if="!post.comments || post.comments.length === 0" class="text-muted text-center py-3">
            Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
          </div>
          <div v-else>
            <div
              v-for="comment in post.comments"
              :key="comment.id"
              class="d-flex mb-3 pb-3 border-bottom"
            >
              <img
                v-if="comment.authorAvatar"
                :src="comment.authorAvatar"
                alt="Avatar"
                class="rounded-circle me-3"
                style="width: 40px; height: 40px; object-fit: cover"
              />
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 class="mb-1">{{ comment.authorName }}</h6>
                    <p class="mb-0">{{ comment.text }}</p>
                  </div>
                  <small class="text-muted">{{ formatDate(comment.createdAt) }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { postService } from '../utils/posts.js'
import { authService } from '../utils/auth.js'

const route = useRoute()
const router = useRouter()
const post = ref(null)
const loading = ref(true)
const currentUser = ref(null)
const newComment = ref('')

const isAuthor = computed(() => {
  return currentUser.value && post.value && currentUser.value.id === post.value.authorId
})

const loadPost = () => {
  loading.value = true
  const postId = route.params.id
  post.value = postService.getPostById(postId)
  currentUser.value = authService.getCurrentUser()
  loading.value = false
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
  
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleAddComment = () => {
  if (!newComment.value.trim()) return

  const result = postService.addComment(route.params.id, newComment.value.trim())
  
  if (result.success) {
    newComment.value = ''
    loadPost() // Reload to show new comment
  } else {
    alert(result.message)
  }
}

const handleDelete = () => {
  if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
    const result = postService.deletePost(route.params.id)
    
    if (result.success) {
      router.push('/')
    } else {
      alert(result.message)
    }
  }
}

onMounted(() => {
  loadPost()
})
</script>

<style scoped>
.card {
  border: none;
}
</style>
