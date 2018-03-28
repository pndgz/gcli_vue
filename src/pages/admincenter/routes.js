//
import AdminList from './components/AdminList.vue'
import MyInfo from './components/MyInfo.vue'

export default [
  {
    path: '/admin/list',
    component: AdminList,
    meta: {
      mpos: ['sysadmin']
    }
  },
  {
    path: '/settings/personal',
    component: MyInfo,
    meta: {
      mpos: ['settings', 'personal']
    }
  }
]
