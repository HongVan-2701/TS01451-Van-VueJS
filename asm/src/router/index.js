import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import PostList from '../components/PostList.vue'
import PostDetail from '../components/PostDetail.vue'
import Profile from '../components/Profile.vue'
import CreatePost from '../components/CreatePost.vue'

const routes = [
  { path: '/', component: PostList },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/post/:id', component: PostDetail, props: true },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/create-post', component: CreatePost, meta: { requiresAuth: true } },
  { path: '/edit-post/:id', component: CreatePost, props: true, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('currentUser') !== null
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
