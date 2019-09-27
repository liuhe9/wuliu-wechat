import http from './http'

export default {
    list(resource_name, data) {
        return http.get('/api/' + resource_name, data)
    },

    one(resource_name, id, data) {
        return http.get('/api/' + resource_name + '/' + id, data)
    },

    put(resource_name, id, data) {
        return http.put('/api/' + resource_name + '/' + id, data)
    },
    
    get(resource_name, data) {
        return http.get('/api/' + resource_name, {params:data})
    },

    post(resource_name, data) {
        return http.post('/api/' + resource_name, data)
    },
}