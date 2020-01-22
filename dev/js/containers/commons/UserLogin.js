import React from 'react';
import { connect } from 'react-redux';

import { sendOTP, submitOTP, resetAuth, fetchReferralCode, clearInsurance, resetVipData } from '../../actions/index.js'

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

     let { refer_amount } = state.USER

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
        phoneNumber,
        refer_amount
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendOTP: (number,viaSms,viaWhatsapp,message_type, cb) => dispatch(sendOTP(number,viaSms,viaWhatsapp,message_type, cb)),
        submitOTP: (number, otp, extraParamsData, cb) => dispatch(submitOTP(number, otp, extraParamsData, cb)),
        resetAuth: () => dispatch(resetAuth()),
        fetchReferralCode: (code) => dispatch(fetchReferralCode(code)),
        clearInsurance: () => dispatch(clearInsurance()),
        resetVipData:() => dispatch(resetVipData())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
