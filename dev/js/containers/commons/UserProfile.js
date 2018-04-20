import React from 'react';
import { connect } from 'react-redux';

import { getUserProfile } from '../../actions/index.js'

import UserProfileView from '../../components/commons/userProfile/index.js'


class UserProfile extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <UserProfileView {...this.props} />
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
        getUserProfile : () => dispatch(getUserProfile())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
