import Axios from 'axios'
import STORAGE from '../helpers/storage'
import NAVIGATE from '../helpers/navigate'

let axiosInstance = Axios.create({
    baseURL: 'http://localhost:8000',
    header: {}
});

function rejectHandler(response, callback) {
    // if (response && response.response && response.response.status == 401) {
    //     STORAGE.deleteAuth().then(() => {
    //         // send to login page
    //         NAVIGATE.navigateTo('/')
    //     })
    // }

    callback(response)
}

export const API_GET = (url) => {
    return STORAGE.getAuthToken().then((token) => {
        return new Promise((resolve, reject) => {
            let headers = {}
            if (token) headers['Authorization'] = `Token ${token}`
            axiosInstance({
                method: 'get',
                url: url,
                headers
            }).then((res) => {
                resolve(res.data)
            }, (response) => {
                rejectHandler(response, reject)
            })
        })
    })


}
export const API_POST = (url, data) => {
    return STORAGE.getAuthToken().then((token) => {
        return new Promise((resolve, reject) => {
            let headers = {}
            if (token) headers['Authorization'] = `Token ${token}`
            axiosInstance({
                method: 'post',
                url: url,
                data: data,
                headers
            }).then((res) => {
                resolve(res.data)
            }, (response) => {
                rejectHandler(response, reject)
            })
        })
    })


}

export const API_PUT = (url, data) => {
    return STORAGE.getAuthToken().then((token) => {
        return new Promise((resolve, reject) => {
            let headers = {}
            if (token) headers['Authorization'] = `Token ${token}`
            axiosInstance({
                method: 'put',
                url: url,
                data: data,
                headers
            }).then((res) => {
                resolve(res.data)
            }, (response) => {
                rejectHandler(response, reject)
            })
        })
    })


}

export const API_DELETE = (url) => {
    return STORAGE.getAuthToken().then((token) => {
        return new Promise((resolve, reject) => {
            let headers = {}
            if (token) headers['Authorization'] = `Token ${token}`
            axiosInstance({
                method: 'delete',
                url: url,
                headers
            }).then((res) => {
                resolve(res.data)
            }, (response) => {
                rejectHandler(response, reject)
            })
        })
    })

}
