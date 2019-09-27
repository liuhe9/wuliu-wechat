import Request from './request'
import my_global from '@/utils/my_global'

const http = new Request()

http.setConfig((config) => { /* 设置全局配置 */
  config.baseUrl = my_global.__BASE_URL__ /* 根域名不同 */
  config.header = {
    a: 1,
    b: 2
  }
  return config
})

http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
  config.header = {
    ...config.header,
    b: 1
  }
  /*
  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
    cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
  }
  */
  return config
})

http.interceptor.response((response) => { /* 请求之后拦截器 */
  return response
}, (response) => { // 请求错误做点什么
    let message = response.data.message
    if (typeof response.data.errors == 'object') {
        message = ''
        for(let idx in response.data.errors) {
            message += response.data.errors[idx] + ';'
        }
    }
    uni.showModal({
      title: '错误提示',
      content: message,
      showCancel: false
    })
  return response
})

export default http
