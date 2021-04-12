import axiosObj from "./axios";
import qs from "querystring";
const { instance } =axiosObj

export const get = (obj) => {
    console.log(obj)
    return instance({
        method: 'get',
        ...obj
    })
}
export const post = (obj) => {
    console.log(obj)
    return instance({
        method: 'post',
        transformRequest: [function (data) {
            /*
                有两个参数，分别是: data, headers
                允许在向服务器发送前，修改请求数据
                只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
                对 data 进行任意转换处理
            */
            console.log(data)
            return qs.stringify(data);
        }],
        ...obj
    })
}
export const put = (obj) => {
    return instance({
        method: 'put',
        transformRequest: [function (data) {
            /*
                有两个参数，分别是: data, headers
                允许在向服务器发送前，修改请求数据
                只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
                对 data 进行任意转换处理
            */
            console.log(data.data)
            return qs.stringify(data.data);
        }],
        ...obj
    })
}
export const patch = (obj) => {
    return instance({
        method: 'patch',
        transformRequest: [function (data) {
            /*
                有两个参数，分别是: data, headers
                允许在向服务器发送前，修改请求数据
                只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
                对 data 进行任意转换处理
            */
            console.log(data.data)
            return qs.stringify(data.data);
        }],
        ...obj
    })
}

const https = {
    get,
    post,
    put,
    patch
}

export default https
