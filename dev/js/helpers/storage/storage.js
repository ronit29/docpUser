import CookieHelper from './cookie.js'
var CryptoJS = require("crypto-js");
import { API_POST } from '../../api/api.js';
import SOCKET from '../socket'

function deleteAllCookies() {
    if (document) {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
}

function setCookie(name, value, days) {
    if (document) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
}

function getCookie(name) {
    var nameEQ = name + "=";
    if (document) {
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }else if(CookieHelper && CookieHelper.getReq){
        try{
            let req = CookieHelper.getReq();
            if(req && req.headers && req.headers.cookie) {
                let cookies = req.headers.cookie
                var ca = cookies.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            }
        }catch(e){

        }
        
    }
}

function eraseCookie(name) {
    if (document) {
        document.cookie = name + '=; Max-Age=-99999999;';
    }
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    if (base64Url && window && typeof window =="object") {
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        return JSON.parse(window.atob(base64));
    } else {
        return {}
    }
};

function generateKeyFromPassword(password) {
    var userHash = CryptoJS.MD5(password);
    var keyStr = userHash.toString().substring(0, 16);
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    return key;
}

const STORAGE = {
    setAuthToken: (token) => {
        setCookie('tokenauth', token, 10)
        return Promise.resolve(true)
    },
    getAuthToken: (dataParams={}) => {
        let istokenRefreshCall = dataParams.url && dataParams.url.includes('api-token-refresh')
        let exp_time = {}
        let time_diff = null
        try{
            exp_time = getCookie('tokenRefreshTime')
            exp_time = JSON.parse(exp_time)
            time_diff = getAnyCookie('server_device_time_diff');
            if(time_diff){
                time_diff = parseInt(time_diff);
            }
        }catch(e){

        }
        
        if(STORAGE.checkAuth() && exp_time && Object.keys(exp_time).length && exp_time.payload && time_diff &&  (exp_time.payload.exp*1000 < new Date().getTime() + time_diff) && dataParams && !istokenRefreshCall){  
            let token = STORAGE.refreshTokenCall(getCookie('tokenauth'),'FromSTORAGE',true)
            //console.log('getWWWWWWWWWWWWWWWWWWWWWWWWWWWWW');console.log(token);
            return Promise.resolve(token);
        }else{
          return Promise.resolve(getCookie('tokenauth'))  
        }        
    },
    checkAuth: () => {
        return !!getCookie('tokenauth')
    },
    deleteAuth: () => {
        eraseCookie('tokenauth')
        // deleteAllCookies()
        eraseCookie('tokenRefreshTime')
        return Promise.resolve()
    },
    isAgent: () => {
        let token = getCookie('tokenauth')
        if (token) {
            let jwtData = parseJwt(token)
            return !!jwtData.agent_id
        }

    },
    setUserId: (userId) => {
        setCookie('user_id', userId, 10)
        return Promise.resolve(true)
    },
    getUserId: () => {
        return getCookie('user_id')
    },
    deleteUserId: () => {
        eraseCookie('user_id')
        return Promise.resolve(true)
    },
    setVisitorInfo: (visitorId) => {
        setCookie('visitinfo', visitorId, 10)
        return Promise.resolve(true)
    },
    getVisitorInfo: () => {
        return getCookie('visitinfo') || ''
    },
    deleteVisitorInfo: () => {
        eraseCookie('visitinfo')
        return Promise.resolve(true)
    },
    setAppointmentDetails: (token) => {
        setCookie('booking_info', token, 5)
        return Promise.resolve(true)
    },
    setAnyCookie: (name, value, day) =>{
        setCookie(name, value, day)
    },
    getAnyCookie: (name)=>{
        return getCookie(name)
    },
    setAuthTokenRefreshTime: (exp_time) => {
        setCookie('tokenRefreshTime', exp_time, 10)

        return Promise.resolve(true)
    },

    encrypt(user_profile_id) {
        let date = Math.floor(new Date().getTime() / 1000)
        let encryptedData = `${user_profile_id}.${date}`;
        let msgString = encryptedData.toString();
        var key = generateKeyFromPassword('hpDqwzdpoQY8ymm5');
        var iv = CryptoJS.lib.WordArray.random(16);
        var encrypted = CryptoJS.AES.encrypt(msgString, key, {
            iv: iv
        });
        return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
    },
    refreshTokenCall(token,fromWhere,isForceUpdate){
        let login_user_id = getCookie('user_id')
        if(login_user_id){
            let ciphertext =  STORAGE.encrypt(login_user_id);
            return API_POST('/api/v1/user/api-token-refresh', {
                token: token,
                reset : ciphertext,
                enableCall: true,
                fromWhere:fromWhere,
                force_update:isForceUpdate
            }).then((data) => {
                if(data && Object.keys(data).length){
                    STORAGE.setAuthToken(data.token).then((resp)=>{
                        SOCKET.refreshSocketConnection();
                    })
                    let time_diff = data.payload.orig_iat *1000 - new Date().getTime();
                    if(STORAGE.getAnyCookie('server_device_time_diff')){

                    }else{
                        STORAGE.setAnyCookie('server_device_time_diff', time_diff, 10)
                    }
                    STORAGE.setAuthTokenRefreshTime(JSON.stringify(data))
                    return data.token;
                }
            }).catch((e)=>{
                return false
            })

        }else{
            return Promise.resolve(getCookie('tokenauth')) 
        }
    },
    getDeviceId: (name)=>{
        var deviceId = getCookie(name)
        //console.log(document.cookie);console.log(deviceId);
        if(deviceId){
            return deviceId
        }
        return STORAGE.generateUUID();
    },

    generateUUID() {
        //method to generate search id
        let uid_string = 'xxyyxxxx-xxyx-4xxx-ynbx-xzxyyyxlxxxx'
        var dt = new Date().getTime();
        var uuid = uid_string.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        let deviceId = uuid; 
        STORAGE.setAnyCookie('browserDocprimeId', uuid, 365)
        return deviceId;
    }




}

export default STORAGE