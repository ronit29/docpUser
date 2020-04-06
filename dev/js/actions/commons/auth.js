import { SET_SUMMARY_UTM, AUTH_USER_TYPE, APPEND_USER_PROFILES, RESET_AUTH, SEND_OTP_REQUEST, SEND_OTP_SUCCESS, SEND_OTP_FAIL, SUBMIT_OTP_REQUEST, SUBMIT_OTP_SUCCESS, SUBMIT_OTP_FAIL, CLOSE_POPUP, SELECT_USER_ADDRESS, CLEAR_INSURANCE, RESET_VIP_CLUB, CLEAR_LAB_COUPONS, CLEAR_OPD_COUPONS , GET_REFER_AMOUNT, CLEAR_SAVED_PATIENT_DETAILS, SAVE_LOGIN_PHONE_NUMBER } from '../../constants/types';
import { API_GET, API_POST } from '../../api/api.js';
import STORAGE from '../../helpers/storage'
import NAVIGATE from '../../helpers/navigate'
import SnackBar from 'node-snackbar'
import Axios from 'axios';
import CONFIG from '../../config/config.js'

export const sendOTP = (number,viaSms,viaWhatsapp,message_type, cb) => (dispatch) => {
    dispatch({
        type: SEND_OTP_REQUEST,
        payload: {
            phoneNumber: number,
            via_sms:viaSms,
            via_whatsapp:viaWhatsapp,
            message_type:message_type
        }
    })

    API_POST('/api/v1/user/otp/generate', {
        "phone_number": number,
        "request_source": "DocprimeWeb",
        "via_sms":viaSms,
        "via_whatsapp":viaWhatsapp,
        "message_type":message_type
    }).then(function (response) {
        SnackBar.show({ pos: 'bottom-center', text: "OTP Sent Successfuly." });
        dispatch({
            type: SEND_OTP_SUCCESS,
            payload: {}
        })
        if (cb) cb();
    }).catch(function (error) {
        let message = "Cannot generate OTP."
        dispatch({
            type: SEND_OTP_FAIL,
            payload: {
                error_message: message
            }
        })
        if (cb) cb(message);
    })

}

export const submitOTP = (number, otp, extraParams, cb) => (dispatch) => {
    dispatch({
        type: SUBMIT_OTP_REQUEST,
        payload: {}
    })

    dispatch({
        type: SAVE_LOGIN_PHONE_NUMBER,
        payload: number
    })

    API_POST('/api/v1/user/login', {
        "phone_number": number,
        "otp": otp
    }).then(function (response) {
        // set cookie token explicitly, csrf token is set by default
        STORAGE.setAuthToken(response.token)
        STORAGE.setUserId(response.user_id)

        clearStoreOnLogin()(dispatch);
        dispatch({
            type: SUBMIT_OTP_SUCCESS,
            payload: { token: response.token }
        })

        dispatch({
            type: SELECT_USER_ADDRESS,
            payload: null
        })

        dispatch({
            type: RESET_VIP_CLUB,
            summaryPage: extraParams && extraParams.summaryPage?extraParams.summaryPage:null
        })

        if (cb) cb(response);

    }).catch(function (error) {
        dispatch({
            type: SUBMIT_OTP_FAIL,
            payload: {
                error_message: "Invalid OTP"
            }
        })
        if (cb) cb(error);
    })
}

export const registerUser = (postData, cb) => (dispatch) => {
    dispatch({
        type: SUBMIT_OTP_REQUEST,
        payload: {}
    })

    API_POST('/api/v1/user/register', postData).then(function (response) {
        // set cookie token explicitly, csrf token is set by default
        STORAGE.setAuthToken(response.token)
        dispatch({
            type: SUBMIT_OTP_SUCCESS,
            payload: { token: response.token }
        })
        if (cb) cb(null, response);
    }).catch(function (error) {
        dispatch({
            type: SUBMIT_OTP_FAIL,
            payload: {
                error_message: "Invalid OTP"
            }
        })
        if (cb) cb(error, null);
    })
}

export const logout = (roomId) => (dispatch) => {
    // delete chat of current opened room
    // Axios.get(`${CONFIG.CHAT_API_URL}/livechat/healthservices/closeChat/${roomId}`).catch((e)=>{
        
    // })
    if (STORAGE.checkAuth()) {
        STORAGE.getAuthToken().then((token) => {
            if(token){
                API_POST('/api/v1/user/logout', {
                    token: token,
                }).then((data) => {
                })
            }
        })
    }
    STORAGE.deleteAuth().then(() => {
        dispatch({
            type: RESET_AUTH,
            payload: {}
        })
        dispatch({
            type:CLEAR_SAVED_PATIENT_DETAILS
        })
        setTimeout(() => {
            // send to login page
            NAVIGATE.navigateTo('/')
        }, 300)
        // clear entire store (initially peristed)
    })
    STORAGE.deleteUserId()
}

export const resetAuth = (postData, cb) => (dispatch) => {
    dispatch({
        type: RESET_AUTH,
        payload: {}
    })
}

export const loginViaChat = (token) => (dispatch) => {
    STORAGE.setAuthToken(token)
    return API_GET('/api/v1/user/userprofile').then(function (response) {
        dispatch({
            type: APPEND_USER_PROFILES,
            payload: response
        })

    }).catch(function (error) {

    })
}

export const agentLogin = (token, cb) => (dispatch) => {

    STORAGE.deleteAuth().then(() => {
        dispatch({
            type: RESET_AUTH,
            payload: {}
        })
        STORAGE.setAuthToken(token)
        clearInsurance()(dispatch)
        dispatch({
            type: RESET_VIP_CLUB
        })
        cb()
    })
}

export const OTTLogin = (ott,user_id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        // API_GET(`/api/v1/user/token/exchange?token=${ott}`).then((data) => {
        STORAGE.deleteAuth().then(() => {
            dispatch({
                type: RESET_AUTH,
                payload: {}
            })
            try{
                if(ott && user_id){
                    STORAGE.refreshTokenCall({token:ott,user_id:user_id,fromWhere:'FromDirectBooking',isForceUpdate: true },(resp)=>{
                        console.log(resp)
                        // STORAGE.setAuthToken(ott)
                        API_GET('/api/v1/user/userprofile').then(function (response) {
                            API_GET('/api/v1/user/userid').then((data) => {
                                STORAGE.setUserId(data.user_id)
                                dispatch({
                                    type: APPEND_USER_PROFILES,
                                    payload: response
                                })
                                dispatch({
                                    type: RESET_VIP_CLUB
                                })
                                resolve()
                            })
                        }).catch(function (error) {
                            reject(err)
                        })
                    })
                }
            }catch(e){

            } 
        })
    })
}

export const OTTExchangeLogin = (ott) => (dispatch) => {
    return new Promise((resolve, reject) => {
        API_GET(`/api/v1/user/token/exchange?token=${ott}`).then((d) => {
            STORAGE.deleteAuth().then(() => {
                dispatch({
                    type: RESET_AUTH,
                    payload: {}
                })
                STORAGE.setAuthToken(d.token)
                API_GET('/api/v1/user/userprofile').then(function (response) {
                    API_GET('/api/v1/user/userid').then((data) => {
                        STORAGE.setUserId(data.user_id)
                        dispatch({
                            type: APPEND_USER_PROFILES,
                            payload: response
                        })
                        resolve()
                    })
                }).catch(function (error) {
                    reject(err)
                })
            })
        })
    })
}

export function setGTMSession(data) {
    API_POST('api/v1/tracking/event/save', data).then((data) => {

    }).catch(function (e) {

    })

}

export const getUnratedAppointment = (callback) => (dispatch) => {
    API_GET(`/api/v1/ratings/unrated`).then(function (response) {
        callback(null, response)
    }).catch(function (error) {
        callback(error, null)
    })
}

export const getRatingCompliments = (callback) => (dispatch) => {
    API_GET(`/api/v1/ratings/compliments`).then(function (response) {
        callback(null, response)
    }).catch(function (error) {
        callback(error, null)
    })
}


export const createAppointmentRating = (appointmentData, callback) => (dispatch) => {
    let post_data = {
        'rating': appointmentData.rating,
        'review': appointmentData.review ? appointmentData.review : '',
        // 'appointment_id': appointmentData.appointment_id,
        'appointment_type': appointmentData.appointment_type,
        'compliment': appointmentData.compliment ? appointmentData.compliment : []
    }
    if('appointment_id' in appointmentData){
        post_data.appointment_id = appointmentData.appointment_id
    }
    else{
        post_data.entity_id = appointmentData.entity_id
        post_data.related_entity_id = appointmentData.related_entity_id
    }
    API_POST(`/api/v1/ratings/create`, post_data).then(function (response) {
        callback(null, response)
    }).catch(function (error) {
        callback(error, null)
    })
}

export const updateAppointmentRating = (ratingData, callback) => (dispatch) => {
    let post_data = {
        'id': ratingData.id,
        'rating': ratingData.rating,
        'review': ratingData.review ? ratingData.review : '',
        'compliment': ratingData.compliment ? ratingData.compliment : []
    }
    API_POST(`/api/v1/ratings/update/${ratingData.id}`, post_data).then(function (response) {
        callback(null, response)
        dispatch({
            type: CLOSE_POPUP,
            payload: {
                appointment_id: ratingData.appointment_id
            }
        })
    }).catch(function (error) {
        callback(error, null)
    })
}

export const closeAppointmentRating = (appointmentData, callback) => (dispatch) => {
    API_POST(`/api/v1/ratings/prompt/close`, appointmentData).then(function (response) {
        callback(null, response)
    }).catch(function (error) {
        callback(error, null)
    })
}

export const closeAppointmentPopUp = (id, callback) => (dispatch) => {
    dispatch({
        type: CLOSE_POPUP,
        payload: {
            appointment_id: id
        }
    })
}


export function chat_utm(term) {
    let url = CONFIG.CHAT_API_URL + `/livechat/healthservices/intentresponse/BasicEnquiry?text=${term}`
    return Axios.get(url)
} 

export const clearInsurance = () => (dispatch) =>{ // to reset insurance data in store
    dispatch({
            type: CLEAR_INSURANCE
        })
}

export const submitEmailOTP = (data, callback) => (dispatch) => {

    API_POST(`/api/v1/user/profile-email/update`, data).then(function (response) {
        if (callback) callback(response, null)
    }).catch(function (error) {
        if (callback) callback(null, error)
    })
}

export const sendOtpOnEmail = (data, callback) =>(dispatch) =>{
    API_POST(`/api/v1/user/profile-email/update/init`, data).then(function (response) {
        SnackBar.show({ pos: 'bottom-center', text: "OTP Sent Successfuly." });    
        if (callback) callback(response)
    }).catch(function (error) {
        let message = "Cannot generate OTP."
        SnackBar.show({ pos: 'bottom-center', text: message });
        if (callback) callback(error)
    })
}

export const submitMedicineLead = (data, callback) =>(dispatch) =>{
    API_POST(`/api/v1/diagnostic/ipdmedicinepagelead`, data).then(function (response) {
        if (callback) callback(response)
    }).catch(function (error) {
        if (callback) callback(error)
    })
}

export const clearStoreOnLogin = () => (dispatch) =>{
    dispatch({
        type: CLEAR_LAB_COUPONS
    })

    dispatch({
        type: CLEAR_OPD_COUPONS
    })
}

export const saveLeadPhnNumber = (number) => (dispatch) =>{
    dispatch({
        type: SAVE_LOGIN_PHONE_NUMBER,
        payload: number
    })
}