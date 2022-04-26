import Vue from 'vue'
import App from './App.vue'
import CrudManager from './models/crudManager.js'

Vue.config.productionTip = false

CrudManager.init();

new Vue({
  render: h => h(App),
}).$mount('#app')
