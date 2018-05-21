import React from 'react';
import { connect } from 'react-redux';

import { } from '../../actions/index.js'

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
    const USER = state.USER

    return {
        USER
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserSignup);
