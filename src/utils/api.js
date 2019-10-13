import http from './http'

export default {
    get(resource_name, data) {
        return http.get(resource_name, {params:data})
    },
    
    post(resource_name, data) {
        return http.post(resource_name, data)
    },
    
    put(resource_name, data) {
        return http.put(resource_name, data)
    }
}