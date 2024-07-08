// 封装请求方式
import axios from "axios";
import {eventBus} from '@/main'; // 导入全局事件总线

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

// 配置http请求拦截器
http.interceptors.request.use(
    config => {
        // 拦截器需要返回 config 对象，以继续发送请求。如果不返回 config 对象，请求将不会发送。
        return config
    },
    error => {
        // 会返回一个被拒绝的 Promise，以便在请求调用链中捕获并处理这个错误。
        return Promise.reject(error)
    }
)

// 配置http响应拦截器
http.interceptors.response.use(
    response => {
        // 请求成功直接返回响应的data，失败or报错则弹出错误提示框
        const data = response.data
        console.log('响应参数:', data)
        if (data && data.code === 1) {
            return data
        } else {
            if (eventBus) {
                const message = data && data.msg ? data.msg : '未知错误';
                console.log(message)
                // 使用全局事件总线,触发总线中的show-alert事件
                eventBus.emit('show-alert', message)
                // 返回 Promise.reject 以停止后续的代码执行
                return Promise.reject(new Error(message));
            }
        }
    },
    error => {
        if (eventBus) {
            console.log("程序错误")
            eventBus.emit('show-alert', error.message);
        }
    }
)

//导出request通用请求供api调用
export const request = (method, url, data = null, params = null) => {
    // 当使用params属性传递参数时，Axios会将这些参数转换为URL查询字符串并附加到请求URL后面，从而实现GET请求参数的正确传递。
    return http({
        method: method,
        url: url,
        data: data,
        params: params
    })
}