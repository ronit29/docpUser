import React from 'react';
import { connect } from 'react-redux';

import { getDoctorById, getTimeSlots } from '../../actions/index.js'

import AppointmentSlotView from '../../components/opd/appointmentSlot/index.js'

class AppointmentSlot extends React.Component {
    constructor(props) {
        super(props)
    }

    static loadData(store, match) {
        return store.dispatch(getDoctorById(match.params.id))
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        this.props.getDoctorById(this.props.match.params.id)
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
        getDoctorById: (doctorId) => dispatch(getDoctorById(doctorId)),
        getTimeSlots: (doctorId, clinicId, callback) => dispatch(getTimeSlots(doctorId, clinicId, callback))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AppointmentSlot);
