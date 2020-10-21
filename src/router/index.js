import Vue from 'vue'
import VueRouter from 'vue-router'
import Upload from '../views/Upload'
import Draw from '../views/Draw'
import Analyse from '../views/Analyse'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload

  },
  {
    path: '/draw',
    name: 'Draw',
    component: Draw
  },
  {
    path: '/analyse',
    name: 'Analyse',
    component: Analyse
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
