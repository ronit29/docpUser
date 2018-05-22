import React from 'react';
import { connect } from 'react-redux';

import { submitOTP } from '../../actions/index.js'

import OtpVerifyView from '../../components/commons/otpVerify'


class OtpVerify extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <OtpVerifyView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    let {
        token,
        error_message,
        success_message,
        phoneNumber,
        submit_otp,
        submit_otp_success,
        submit_otp_fail
    } = state.AUTH

    return {
        token,
        error_message,
        success_message,
        phoneNumber,
        submit_otp,
        submit_otp_success,
        submit_otp_fail
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitOTP: (number, otp, cb) => dispatch(submitOTP(number, otp, cb)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(OtpVerify);
