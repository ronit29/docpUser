import Axios from 'axios'

let axiosInstance = Axios.create({
    baseURL: 'http://localhost:3000/api/',
});

export const API_GET = axiosInstance.get

export const API_POST = axiosInstance.post

export const API_PUT = axiosInstance.put

export const API_DELETE = axiosInstance.delete