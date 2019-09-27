const __BASE_URL__ = (process.env.NODE_ENV === 'development') ? 'http://localhost:8084' : 'https://shnh.s666666.cn'
const openid = uni.getStorageSync('openid')

export default {
    __BASE_URL__,
    openid
}