import { SET_SUMMARY_UTM, RESET_AUTH, SEND_OTP_REQUEST, SEND_OTP_SUCCESS, SEND_OTP_FAIL, SUBMIT_OTP_REQUEST, SUBMIT_OTP_SUCCESS, SUBMIT_OTP_FAIL } from '../../constants/types';

const defaultState = {
    token: null,
    error_message: "",
    success_message: "",
    otp_request_sent: false,
    otp_request_success: false,
    otp_request_fail: false,
    phoneNumber: "",
    submit_otp: false,
    submit_otp_success: false,
    submit_otp_fail: false
}

export default function (state = defaultState, action) {

    switch (action.type) {
        case SEND_OTP_REQUEST: {
            let newState = { ...defaultState }

            newState.otp_request_sent = true
            newState.phoneNumber = action.payload.phoneNumber

            return newState
        }

        case SEND_OTP_SUCCESS: {
            let newState = { ...state }
            newState.otp_request_sent = false
            newState.otp_request_success = true
            newState.otp_request_fail = false
            newState.success_message = action.payload.success_message
            newState.error_message = ""
            return newState
        }

        case SEND_OTP_FAIL: {
            let newState = { ...state }
            newState.otp_request_sent = false
            newState.otp_request_fail = true
            newState.otp_request_success = false
            newState.error_message = action.payload.error_message

            return newState
        }

        case SUBMIT_OTP_REQUEST: {
            let newState = { ...state }
            newState.submit_otp = true
            newState.error_message = ""
            return newState
        }

        case SUBMIT_OTP_SUCCESS: {
            let newState = { ...state }
            newState.submit_otp = false
            newState.submit_otp_fail = false
            newState.submit_otp_success = true
            newState.token = action.payload.token
            newState.error_message = ""
            return newState
        }

        case SUBMIT_OTP_FAIL: {
            let newState = { ...state }
            newState.submit_otp = false
            newState.submit_otp_fail = true
            newState.submit_otp_success = false
            newState.error_message = action.payload.error_message
            return newState
        }

        case RESET_AUTH: {
            return defaultState
        }

    }
    return state
}