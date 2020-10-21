import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let response;
let selectFiles;
let min;
let max;
let identification;
export default new Vuex.Store({
  state: {
    request:{
      selectFiles,
      min,
      max,
      identification,
    },
    response,
  },
  mutations: {
    getData(state,response){
      state.response =  response;
    },
  },
  actions: {
  },
  modules: {
  }
})
