import React from 'react';
import { connect } from 'react-redux';

import { sendOTP } from '../../actions/index.js'

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
        phoneNumber
    } = state.AUTH

    return {
        token,
        error_message,
        success_message,
        otp_request_sent,
        otp_request_success,
        otp_request_fail,
        phoneNumber
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendOTP: (number, cb) => dispatch(sendOTP(number, cb))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
