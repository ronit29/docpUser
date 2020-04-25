import Axios from 'axios'
import STORAGE from '../helpers/storage'
import NAVIGATE from '../helpers/navigate'
import CONFIG from '../config'

export const base_url = CONFIG.API_BASE_URL;

let axiosInstance = Axios.create({
    baseURL: base_url,
    header: {}
});

function rejectHandler(response, urlInfo, callback) {

    if (false && urlInfo && urlInfo.url && urlInfo.url.includes('api-token-refresh') && response && response.response && (response.response.status <= 500) ) {
        STORAGE.deleteAuth().then(() => {
            // send to login page
            NAVIGATE.navigateTo('/')
            // clear entire store (initially peristed)
        })
    }else if(false && response && response.response && (response.response.status == 401) && urlInfo && urlInfo.url && urlInfo.token && STORAGE.checkAuth()){
        STORAGE.refreshTokenCall({token:urlInfo.token, fromWhere:'API', isForceUpdate:true}).then(()=>{

            if(urlInfo.type=='API_GET'){
                return API_GET(urlInfo.url);
            }else if(urlInfo.type=='API_POST'){
                return API_POST(urlInfo.url, urlInfo.data);
            }else if(urlInfo.type=='API_PUT'){
                return API_PUT(urlInfo.url, urlInfo.data);
            }else if(urlInfo.type=='API_DELETE'){
                return API_DELETE(urlInfo.url);
            }
            
        })
    }else{
        if (response.response && response.response.data && response.response.data.request_errors) {
            response = response.response.data.request_errors
        } else if (response.response && response.response.data) {
            response = response.response.data
        }

        callback(response)
    }

}

const API_GET = (url) => {
    return STORAGE.getAuthToken({url: url}).then((token) => {

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
                let urlInfo = {
                    url: url,
                    type: 'API_GET',
                    token: token
                }
                rejectHandler(response, urlInfo, reject)
            })
        })
    })


}
const API_POST = (url, data) => {
    return STORAGE.getAuthToken({url: url}).then((token) => {
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
                let urlInfo = {
                    url: url,
                    type: 'API_POST',
                    data: data,
                    token: token
                }
                rejectHandler(response, urlInfo, reject)
            })
        })
    })


}

const API_PUT = (url, data) => {
    return STORAGE.getAuthToken({url: url}).then((token) => {
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
                let urlInfo = {
                    url: url,
                    type: 'API_PUT',
                    data: data,
                    token: token
                }
                rejectHandler(response, urlInfo, reject)
            })
        })
    })


}

const API_DELETE = (url) => {
    return STORAGE.getAuthToken({url: url}).then((token) => {
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
                let urlInfo = {
                    url: url,
                    type: 'API_DELETE',
                    token: token
                }
                rejectHandler(response, urlInfo, reject)
            })
        })
    })

}
module.exports = {
    API_GET,
    API_POST,
    API_PUT,
    API_DELETE
}
