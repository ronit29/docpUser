import React from 'react';
import { connect } from 'react-redux';

import { sendOTP, submitOTP, resetAuth, fetchReferralCode, clearInsurance } from '../../actions/index.js'

import UserLoginView from '../../components/commons/UserLogin'


class UserLogin extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <UserLoginView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    let {
        token,
        error_message,
        success_message,
        otp_request_sent,
        otp_request_success,
        otp_request_fail,
        submit_otp,
        submit_otp_success,
        submit_otp_fail,
        phoneNumber
    } = state.AUTH

    return {
        token,
        error_message,
        success_message,
        otp_request_sent,
        otp_request_success,
        otp_request_fail,
        submit_otp,
        submit_otp_success,
        submit_otp_fail,
        phoneNumber
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendOTP: (number,viaSms,viaWhatsapp, cb) => dispatch(sendOTP(number,viaSms,viaWhatsapp, cb)),
        submitOTP: (number, otp, cb) => dispatch(submitOTP(number, otp, cb)),
        resetAuth: () => dispatch(resetAuth()),
        fetchReferralCode: (code) => dispatch(fetchReferralCode(code)),
        clearInsurance: () => dispatch(clearInsurance())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
