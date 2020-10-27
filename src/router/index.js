import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      auth: true
    },
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {

    },
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    meta: {

    },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/timesheet',
    name: 'timesheet',
    meta: {
      auth: true
    },
    component: () => import('../views/Timesheet.vue')
  },
  {
    path: '/projects',
    name: 'projects',
    meta: {
      auth: true
    },
    component: () => import('../views/Projects.vue')
  },
  {
    path: '/projects/:id',
    name: 'detail',
    meta: {
      auth: true
    },
    component: () => import('../views/ProjectDetail.vue')
  },
  {
    path: '/drawings',
    name: 'drawings',
    meta: {
      auth: true
    },
    component: () => import('../views/Drawings.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.meta.auth

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
