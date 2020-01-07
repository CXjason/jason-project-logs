import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './vuex'
import './plugins/element.js'
import interfaceApi from "./fetch/api";
Vue.prototype.$api = interfaceApi;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
