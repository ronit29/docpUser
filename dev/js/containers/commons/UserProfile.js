import React from 'react';
import { connect } from 'react-redux';

import { getUserProfile, getProfileAppointments, selectProfile } from '../../actions/index.js'

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

    componentDidMount(){
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
        getProfileAppointments : (profile_id) => dispatch(getProfileAppointments(profile_id)),
        selectProfile: (profile_id) => dispatch(selectProfile(profile_id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
