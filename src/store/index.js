import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    response: Object,
    results: '',
    graphLocalFile: []
  },
  mutations: {
    getData(state,response){
      state.response =  response;
    },
    updateResult(state, payload) {
      state.results = payload
    },
    updateCurrentLocalFile(state, payload) {
      state.graphLocalFile = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
