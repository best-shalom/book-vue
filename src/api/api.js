// 封装后端api

// 配置详细的请求方法对应的后端接口
import {request} from "@/api/request";

const api = {
    // 调用时，直接调用api.user.login(data)即可
    user: {
        login(data) {
            return request('post', '/user/login', data)
        },
        register(data) {
            return request('post', '/user/register', data)
        }
    },
    book: {
        bookList(data) {
            return request('post', '/book/listBooks/', data)
        },
        bookDetail(params) {
            return request('get', '/book/getBookInfo/', null, params)
        },
        updateBookInfo(data) {
            return request('post', '/book/updateBookInfo/', data)
        }
    },
    classify: {
        classifyList() {
            return request('get', '/classify/showAllName/')
        },
        addClassify(data) {
            return request('post', '/classify/add/', data)
        }
    },
    tag: {
        tagList() {
            return request('get', '/tag/list')
        }
    },
    type: {
        typeList() {
            return request('get', '/type/list/')
        },
        addType(data) {
            return request('post', '/type/add/', data)
        }
    }
}
export default api
