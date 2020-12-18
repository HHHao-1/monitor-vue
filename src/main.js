import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import cookies from 'js-cookie'
import $ from 'jquery';

window.jQuery = $;
window.$ = $;

Vue.config.productionTip = false


Vue.use(ElementUI);

// Vue.prototype.$ajax = axios;
Vue.prototype.$Cookies = cookies;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


