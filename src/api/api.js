import https from "./http";

const { get, post} = https
export const userInfo = (params) => {
    return get({
        url: '/user/v1/info',
        params
    })
}
export const noticeList = (params) => {
    return get({
        url: '/notice/v1/list',
        params
    })
}
export const changePassword = (data) => {
    return post({
        url: '/user/v1/service/password',
        data
    })
}
