import http from './http'

export default {
    list(resource_name, data) {
        return http.get('/api/' + resource_name, data).then((res) => {
            return res;
        })
    },

    one(resource_name, id, data) {
        return http.get('/api/' + resource_name + '/' + id, data).then((res) => {
            return res;
        })
    },

    put(resource_name, id, data) {
        return http.put('/api/' + resource_name + '/' + id, data).then((res) => {
            return res;
        })
    },

    post(resource_name, data) {
        return http.post('/api/' + resource_name, data).then((res) => {
            return res;
        })
    },
}