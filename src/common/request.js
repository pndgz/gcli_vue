import axios from 'axios'
import store from './store'
import { Notification } from 'element-ui'

require('es6-promise').polyfill()

let instance = axios.create({
  baseURL: '/api',
  withCredentials: true
})

instance.interceptors.response.use(
  response => {
    if (response.status === 200) { // Http ok
      if (response.data) {
        switch (response.data.code) {
          case 501: // 未登录
            store.commit('logout')
            return Promise.reject(response.data)
          case 0: // SUCC
            return Promise.resolve(response.data)
        }
      }
      return response.data
    } else {
      console.log('HTTP ERROR:' + response.status + ',' + response.statusText)
      return Promise.reject(response)
    }
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break
        case 401:
          err.message = '未授权，请登录'
          break
        case 403:
          err.message = '拒绝访问'
          break
        case 404:
          err.message = '服务器返回找不到地址'
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = '服务器内部错误'
          break
        case 501:
          err.message = '服务未实现'
          break
        case 502:
          err.message = '网关错误'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网关超时'
          break
        case 505:
          err.message = 'HTTP版本不受支持'
          break
        default:
      }
    }
    Notification.error({
      title: '请求失败',
      message: err.message,
      position: 'bottom-right'
    })
    return Promise.reject(err)
  }
)

export default {
  get: function(url, params) {
    return instance.get(url, {
      params: params
    })
  },
  post: function(url, params) {
    return instance.post(url, params)
  },
  put: function(url, params) {
    return instance.put(url, params)
  },
  delete: function(url) {
    return instance.delete(url)
  }
}
