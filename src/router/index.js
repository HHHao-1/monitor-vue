import Vue from 'vue'
import VueRouter from 'vue-router'
import TransDataUpload from '../views/TransDataUpload'
import DrawAtlas from '../views/DrawAtlas'
import ProofAnalyze from "@/views/ProofAnalyze";
import ProofUpload from "@/views/ProofUpload";

Vue.use(VueRouter)

const routes = [
  {
    path: '/transDataUpload',
    name: 'TransDataUpload',
    component: TransDataUpload

  },
  {
    path: '/drawAtlas',
    name: 'DrawAtlas',
    component: DrawAtlas
  },
  {
    path: '/proofUpload',
    name: 'ProofUpload',
    component: ProofUpload
  },
  {
    path:'/proofAnalyze',
    name:'ProofAnalyze',
    component: ProofAnalyze,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
