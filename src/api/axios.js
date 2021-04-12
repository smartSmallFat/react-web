import Axios from "axios";

let Instance = Axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? '/api' : '',
    timeout: 6 * 1000
})
Instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Instance.interceptors.request.use(config => {
    config.headers['token'] = 'B24BD5ECF4736CE6DEB5660437A19C2D'
    return config
})
Instance.interceptors.response.use(error => {
    return Promise.reject(error)
})
export const source = Axios.CancelToken.source()
export const axios = Axios
export const instance = Instance
const axiosObj = {
    axios,
    instance,
    source
}

export default axiosObj
/*
    // 默认导出的模块如果是对象，应该先定义一个对象，然后将这个定义的这个对象导出，而不是直接导出一个对象
    // 下面这种写法不被认可，会弹出警告
    export default {
        axios,
        instance,
        source
    }
*/

/*
    CancelToken必须是axios自己创建的，axios的实例对象instance不能创建CancelToken
    axios 导出原生axios方便单个请求取消请求
    instance 到处axios的实例
    source 用于批量取消请求
        eg:
            instance.get('/user/v1/info', {
                cancelToken: source.token
            }).catch(function(thrown) {
                if (http.isCancel(thrown)) {
                    console.log('Request canceled', thrown.message);
                } else {
                    // 处理错误
                }
            });
            setTimeout(() => {
                source.cancel('任务取消')
            })
    // 单个取消请求 eg
        let cancel = null
        const CancelToken = axios.CancelToken
        instance.get('/notice/v1/list',{
            cancelToken:  new CancelToken((c) => {
                cancel = c
            })
        }).catch(function(thrown) {
            if (axios.isCancel(thrown)) {
                console.log('Request canceled', thrown.message);
            } else {
                // 处理错误
            }
        })
        setTimeout(() => {
            cancel()
        })
*/
