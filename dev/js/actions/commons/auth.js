import { SEND_OTP_REQUEST, SEND_OTP_SUCCESS, SEND_OTP_FAIL, SUBMIT_OTP_REQUEST, SUBMIT_OTP_SUCCESS, SUBMIT_OTP_FAIL } from '../../constants/types';
import { API_GET, API_POST } from '../../api/api.js';
import STORAGE from '../../helpers/storage'
import SnackBar from 'node-snackbar'

export const sendOTP = (number, cb) => (dispatch) => {
    dispatch({
        type: SEND_OTP_REQUEST,
        payload: {
            phoneNumber: number
        }
    })

    API_POST('/api/v1/user/otp/generate', {
        "phone_number": number
    }).then(function (response) {
        SnackBar.show({ pos: 'bottom-left', text: "OTP Sent Successfuly." });
        dispatch({
            type: SEND_OTP_SUCCESS,
            payload: {}
        })
        if (cb) cb(response.exists);
    }).catch(function (error) {
        let message = "Cannot generate OTP."
        dispatch({
            type: SEND_OTP_FAIL,
            payload: {
                error_message: message
            }
        })
    })

}

export const submitOTP = (number, otp, cb) => (dispatch) => {
    dispatch({
        type: SUBMIT_OTP_REQUEST,
        payload: {}
    })

    API_POST('/api/v1/user/login', {
        "phone_number": number,
        "otp": otp
    }).then(function (response) {
        // set cookie token explicitly, csrf token is set by default
        STORAGE.setAuthToken(response.token)

        dispatch({
            type: SUBMIT_OTP_SUCCESS,
            payload: { token: response.token }
        })

        if (cb) cb(response.user_exists);
        
    }).catch(function (error) {
        dispatch({
            type: SUBMIT_OTP_FAIL,
            payload: {
                error_message: "Invalid OTP"
            }
        })
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

