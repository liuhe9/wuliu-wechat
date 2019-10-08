import Request from './request'
import my_global from '@/utils/my_global'

const http = new Request()

http.setConfig((config) => { /* 设置全局配置 */
  config.baseUrl = my_global.__BASE_URL__ /* 根域名不同 */
  return config
})

http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
  config.header = {
    ...config.header,
  }
  
  if (uni.getStorageSync(my_global.token_key) != undefined && uni.getStorageSync(my_global.token_key) != false) {
      config.header = {
          Authorization: 'Bearer ' + uni.getStorageSync(my_global.token_key)
      }
  }
  console.log('config.header', config.header)
  console.log('access_token',uni.getStorageSync(my_global.token_key))
  
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
    if (response.statusCode == 401) {
        if (response.config.url == '/api/logisticss' && response.config.method == 'POST') {
            console.log('modalShowComponents')
            uni.$emit('modalShowComponents')
        } else {
            console.log('modalShow')
            uni.$emit('modalShow')
        }
    } else {
        console.log('other', response)
        // let message = response.data.message
        // if (typeof response.data.errors == 'object') {
        //     message = ''
        //     for(let idx in response.data.errors) {
        //         message += response.data.errors[idx] + ';'
        //     }
        // }
    }
    
    return response
})

export default http
