
import request from '@/common/request'

class UserService {
  getItemList(params) {
    return request.post('/user/list', params)
  }
  saveItem(params) {
    return request.post('/user/save', params)
  }
  deleteItem(id) {
    return request.post('/user/delete/' + id)
  }
}

export default new UserService()
