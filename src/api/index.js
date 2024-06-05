// 针对axios对后端请求进行统一封装（方便后期维护管理）
import axios from 'axios'

// 使用axios创建实例进行相关的配置和封装(适用于微服务的架构)
const http = axios.create({
    // 配置全局的baseUrl
    baseURL: '/api',
    // 如果在后端配置了允许跨域，则此处就不需要使用api来映射后端地址了
    // baseURL: 'http://localhost:8080',
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
        return http.post('/book/listBooks/', params)
    },
    classifyList() {
        return http.get('/classify/showAllName/')
    },
    bookDetail(params) {
        // 在 Axios 中，GET 请求的参数应该作为配置对象的一个属性，而不是直接传递给 get 方法
        // 正确的做法是将参数作为配置对象的一个属性，通常是 params，而不是直接传递给 get 方法。这样 Axios 会自动将这些参数转换为 URL 查询字符串，并附加到请求 URL 后面。
        // 示例： 发送请求时将参数作为配置对象的一个属性
        //     const requestData = {
        //       params: {
        //         id: this.bookId
        //       }
        //     };
        const getParam = {
            params: params
        }
        return http.get('/book/getBookById/', getParam)
    },
    updateBookInfo(params) {
        return http.post('/book/updateBookInfo/', params)
    },
    typeList() {
        return http.get('/type/list/')
    },
    addType(params) {
        return http.post('/type/add/', params)
    }
}
