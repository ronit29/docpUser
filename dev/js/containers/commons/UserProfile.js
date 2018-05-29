import React from 'react';
import { connect } from 'react-redux';

import { getUserProfile, getProfileAppointments, selectProfile, getUserAddress, addUserAddress, updateUserAddress } from '../../actions/index.js'

import UserProfileView from '../../components/commons/userProfile/index.js'


class UserProfile extends React.Component {
    constructor(props) {
        super(props)
    }

    static loadData(store) {
        return store.dispatch(getUserProfile())
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        this.props.getUserProfile()
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
        getUserProfile: () => dispatch(getUserProfile()),
        getProfileAppointments: (profile_id) => dispatch(getProfileAppointments(profile_id)),
        selectProfile: (profile_id) => dispatch(selectProfile(profile_id)),
        getUserAddress: () => dispatch(getUserAddress()),
        addUserAddress: (postData, cb) => dispatch(addUserAddress(postData, cb)),
        updateUserAddress: (postData, cb) => dispatch(updateUserAddress(postData, cb))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
