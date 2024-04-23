// 针对axios对后端请求进行统一封装（方便后期维护管理）
import axios from 'axios'

// 使用axios创建实例进行相关的配置和封装(适用于微服务的架构)
const http = axios.create({
    // 配置全局的baseUrl
    baseURL: '/api',
    // 设置默认的请求参数类型（对应apiPost中的参数选项）
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

// 配置详细的请求方法对应的后端接口
export default {
    login(params) {
        return http.post('/user/login/', params)
    },
    register(params) {
        return http.post('/user/register/', params)
    },
    bookList(params) {
        return http.post('/book/listBooks', params)
    },
    classifyList(params) {
        return http.get('/classify/showAllName', params)
    },
}
