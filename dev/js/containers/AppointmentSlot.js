import React from 'react';
import { connect } from 'react-redux';

import { getDoctorById, getTimeSlots } from '../actions/index.js'

import AppointmentSlotView from '../components/appointmentSlot/index.js'

class AppointmentSlot extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <AppointmentSlotView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {

    let DOCTORS = state.DOCTORS

    return {
        DOCTORS
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorById : (doctorId) => dispatch(getDoctorById(doctorId)),
        getTimeSlots : (doctorId, clinicId, callback) => dispatch(getTimeSlots(doctorId, clinicId, callback))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AppointmentSlot);
