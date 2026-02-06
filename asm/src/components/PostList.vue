<template>
  <div>
    <h2 class="mb-4 pb-2 border-bottom text-primary">Bài viết mới nhất</h2>
    
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="post in posts" :key="post.id">
        <div class="card h-100 shadow-sm border-0 hover-shadow transition-all">
          <img :src="post.image || 'https://via.placeholder.com/300x200?text=No+Image'" class="card-img-top" alt="..." style="height: 200px; object-fit: cover;">
          
          <div class="card-body d-flex flex-column">
            <h5 class="card-title text-truncate">{{ post.title }}</h5>
            <p class="card-text text-muted small mb-2">
              <i class="bi bi-calendar3"></i> {{ post.date }} | <i class="bi bi-person"></i> {{ post.author }}
            </p>
            <p class="card-text flex-grow-1">{{ post.content.substring(0, 100) }}...</p>
            <router-link :to="'/post/' + post.id" class="btn btn-outline-primary mt-auto w-100">Xem chi tiết</router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-if="posts.length === 0" class="alert alert-info text-center mt-4">
      Chưa có bài viết nào. Hãy là người đầu tiên đăng bài!
    </div>
  </div>
</template>

<script>
export default {
  data() { return { posts: [] } },
  created() {
    const postsData = localStorage.getItem('posts');
    this.posts = postsData ? JSON.parse(postsData) : [];
    // Đảo ngược để bài mới nhất lên đầu
    this.posts.reverse();
  }
}
</script>

<style scoped>
/* Hiệu ứng hover nhẹ */
.hover-shadow:hover {
    transform: translateY(-3px);
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
}
.transition-all {
    transition: all 0.3s ease;
}
</style>