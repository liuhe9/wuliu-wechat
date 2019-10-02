const __BASE_URL__ = (process.env.NODE_ENV === 'development') ? 'http://localhost:8084' : 'https://shnh.s666666.cn'
const token_key   = 'access_token'
const storage_fix = __BASE_URL__ + '/storage/'

export default {
    __BASE_URL__,
    storage_fix,
    token_key
}