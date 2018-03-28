
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter)

let routes = [];
(m => {
  m.keys().map(key => {
    routes = routes.concat(m(key).default)
  })
})(require.context('@/pages/', true, /\/routes\.js$/))

let router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.mpos && record.meta.mpos.length > 0)) {
    store.commit('activeMenu', to.meta.mpos)
  }
  next()
})

export default router
