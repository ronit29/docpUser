import React from 'react';
import { connect } from 'react-redux';

import { getUserProfileWithAppointments } from '../../actions/index.js'

import UserAppointmentsView from '../../components/commons/userAppointments/index.js'


class UserAppointments extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <UserAppointmentsView {...this.props} />
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
        getUserProfileWithAppointments : () => dispatch(getUserProfileWithAppointments())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserAppointments);
