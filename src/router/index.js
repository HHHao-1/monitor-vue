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
    component: TransDataUpload,
    meta:{title:'文件上传'},
  },
  {
    path: '/drawAtlas',
    name: 'DrawAtlas',
    component: DrawAtlas,
    meta:{title:'交易关系图谱'},
  },
  {
    path: '/proofUpload',
    name: 'ProofUpload',
    component: ProofUpload,
    meta:{title:'文件上传'},
  },
  {
    path:'/proofAnalyze',
    name:'ProofAnalyze',
    component: ProofAnalyze,
    meta:{title:'调证文档解析工具'},
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
