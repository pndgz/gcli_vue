
import request from '@/common/request'

class AdminService {
  getItemList(params) {
    return request.post('/admin/list', params)
  }
  saveItem(params) {
    return request.post('/admin/save', params)
  }
  deleteItem(id) {
    return request.post('/admin/delete/' + id)
  }
  getMyInfo() {
    return request.post('/admin/myinfo/show')
  }
  saveMyInfo(params) {
    return request.post('/admin/myinfo/save', params)
  }
}

export default new AdminService()
