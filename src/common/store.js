
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hasLogin: sessionStorage.getItem('hasLogin'),
    adminInfo: JSON.parse(sessionStorage.getItem('adminInfo')),
    topMenuIdx: sessionStorage.getItem('topMenuIdx') || 'minisports',
    sideMenuIdx: sessionStorage.getItem('sideMenuIdx') || '',
    activeSubMenuIdx: sessionStorage.getItem('activeSubMenuIdx') || ''
  },
  mutations: {
    login(state, admin) {
      state.adminInfo = admin
      state.hasLogin = true
      sessionStorage.setItem('hasLogin', true)
      sessionStorage.setItem('adminInfo', JSON.stringify(admin))
    },
    logout(state) {
      state.adminInfo = null
      state.hasLogin = false
      sessionStorage.removeItem('hasLogin')
      sessionStorage.removeItem('adminInfo')
    },
    changeTopMenu(state, idx) {
      state.topMenuIdx = idx
      sessionStorage.setItem('topMenuIdx', idx)
      state.sideMenuIdx = '0'
      sessionStorage.removeItem('sideMenuIdx')
    },
    openSideMenu(state, idx) {
      state.sideMenuIdx = idx
      sessionStorage.setItem('sideMenuIdx', idx)
    },
    activeMenu(state, mpos) {
      if (mpos && mpos.length > 1) {
        state.sideMenuIdx = mpos[0]
        sessionStorage.setItem('sideMenuIdx', mpos[0])
        state.activeSubMenuIdx = mpos[1]
        sessionStorage.setItem('activeSubMenuIdx', mpos[1])
      } else if (mpos && mpos.length > 0) {
        state.activeSubMenuIdx = mpos[0]
        sessionStorage.setItem('activeSubMenuIdx', mpos[0])
      }
    }
  }
})

export default store
