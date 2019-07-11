import Vue from 'vue'
import App from './App'
import './plugins/polyfills'
import './plugins/lazyloader'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
