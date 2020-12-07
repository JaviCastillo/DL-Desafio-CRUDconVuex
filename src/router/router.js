import Vue from 'vue'
import VueRouter from 'vue-router'
import Firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path:'*', 
    redirect: '/'
  },
  {
    path: '/',
    name: 'Inicio',
    alias: '/inicio',
    component: () => import('../views/Inicio.vue'),
    meta: {
      login: false
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      login: true
    }
  },
  {
    path: '/crud',
    name: 'CRUD',
    component: () => import('../views/CRUD.vue'),
    meta: {
      login: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) =>{
  let user = Firebase.auth().currentUser
  let authRequired = to.matched.some(route => route.meta.login)
  if (!user && authRequired) {
    next('inicio')
  } else if (user && !authRequired) {
    next('home')
  } else {
    next()
  }
})

export default router
