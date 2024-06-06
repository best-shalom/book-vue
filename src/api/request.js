// 封装请求方式
import axios from "axios";

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