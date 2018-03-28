
import request from '@/common/request'

class SettingService {
  getTypeList(params) {
    return request.post('/setting/types', params)
  }
  getItemList(params) {
    return request.post('/setting/list', params)
  }
  saveItem(params) {
    return request.post('/setting/save', params)
  }
  deleteItem(id) {
    return request.post('/setting/delete/' + id)
  }
}

export default new SettingService()
