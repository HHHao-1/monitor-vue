import Vue from 'vue'
import VueRouter from 'vue-router'
import MonitorAddr from "@/views/monitor";
import Login from "@/views/login"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MonitorAddr',
    component: MonitorAddr,
    meta: {title: '数字货币监控系统'},
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {title: '数字货币监控系统'},
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
