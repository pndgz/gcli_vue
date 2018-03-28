// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './theme/index.css'
import './assets/iconfont.css'
import './common/styles/index.scss'
import Vue from 'vue'
import App from './App'
import store from './common/store'
import routers from './common/router'
import ElementUI from 'element-ui'
import fomatters from './common/fomatters'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(fomatters)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: routers,
  store,
  template: '<App/>',
  components: { App }
})
