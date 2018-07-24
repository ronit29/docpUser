import Axios from 'axios'
import STORAGE from '../helpers/storage'
import NAVIGATE from '../helpers/navigate'
import CONFIG from '../config'

export const base_url = CONFIG.API_BASE_URL;

let axiosInstance = Axios.create({
    baseURL: base_url,
    header: {}
});

function rejectHandler(response, callback) {
    if (response && response.response && (response.response.status == 401)) {
        STORAGE.deleteAuth().then(() => {
            // send to login page
            NAVIGATE.navigateTo('/')
            // clear entire store (initially peristed)
        })
    }

    if (response.response && response.response.data && response.response.data.request_errors) {
        response = response.response.data.request_errors
    }

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
