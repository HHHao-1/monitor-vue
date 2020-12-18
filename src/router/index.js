import Vue from 'vue'
import VueRouter from 'vue-router'
import MonitorAddr from "@/views/monitor";
import Login from "@/views/login"
import UserList from "@/views/userList"

Vue.use(VueRouter)

const routes = [
  {
    path: '/monitor',
    name: 'MonitorAddr',
    component: MonitorAddr,
    meta: {title: '数字货币监控系统'},
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {title: '登录'},
  },
  {
    path: '/user-list',
    name: 'UserList',
    component: UserList,
    meta: {title: '用户列表'},
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 根据路由元信息设置文档标题
  window.document.title = to.meta.title || "admin"
  next()
})

export default router
