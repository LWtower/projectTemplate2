import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('../views/home.vue')

export default new Router({
  routes: [
    // 首页重定向
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})
