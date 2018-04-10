import Axios from 'axios'

let axiosInstance = Axios.create({
    baseURL: 'http://localhost:3000/api/',
});

export const API_GET = function(){
    return axiosInstance.get
}

export const API_POST = function(){
    return axiosInstance.get
}

export const API_PUT = function(){
    return axiosInstance.put
}

export const API_DELETE = function(){
    return axiosInstance.delete
}