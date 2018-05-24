import React from 'react';
import { connect } from 'react-redux';

import { registerUser } from '../../actions/index.js'

import UserSignupView from '../../components/commons/userSignup'


class UserSignup extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <UserSignupView {...this.props} />
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
        registerUser: (postData, cb) => dispatch(registerUser(postData, cb))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserSignup);
