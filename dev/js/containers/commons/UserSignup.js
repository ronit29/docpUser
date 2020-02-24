import React from 'react';
import { connect } from 'react-redux';

import { registerUser, createProfile, resetVipData } from '../../actions/index.js'

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

    let USER = state.USER

    return {
        token,
        error_message,
        success_message,
        phoneNumber,
        submit_otp,
        submit_otp_success,
        submit_otp_fail,
        USER
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (postData, cb) => dispatch(registerUser(postData, cb)),
        createProfile: (postData, cb) => dispatch(createProfile(postData, cb)),
        resetVipData:() => dispatch(resetVipData())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserSignup);
