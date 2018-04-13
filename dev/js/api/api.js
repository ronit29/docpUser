import Axios from 'axios'

let axiosInstance = Axios.create({
    baseURL: '/api/',
    header : {}
});

export const API_GET = (url) => {
    return new Promise((resolve,reject) => {
        axiosInstance.get(url).then((res) => {
            resolve(res.data)
        },(rej) => {
            reject()
        })
    })
}
export const API_POST = (url, data) => {
    return new Promise((resolve,reject) => {
        axiosInstance.post(url, data).then((res) => {
            resolve(res.data)
        },reject)
    })
}
export const API_PUT = (url, data) => {
    return new Promise((resolve,reject) => {
        axiosInstance.put(url, data).then((res) => {
            resolve(res.data)
        },reject)
    })
}
export const API_DELETE = (url) => {
    return new Promise((resolve,reject) => {
        axiosInstance.delete(url).then((res) => {
            resolve(res.data)
        },reject)
    })
}