import React from 'react';
import { connect } from 'react-redux';

import { getDoctorById, getTimeSlots, selectOpdTimeSLot } from '../../actions/index.js'

import AppointmentSlotView from '../../components/opd/appointmentSlot/index.js'

class AppointmentSlot extends React.Component {
    constructor(props) {
        super(props)
    }

    static loadData(store, match) {
        return store.dispatch(getDoctorById(match.params.id, match.params.clinicId))
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        this.props.getDoctorById(this.props.match.params.id, this.props.match.params.clinicId)
    }

    render() {

        return (
            <AppointmentSlotView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {

    let DOCTORS = state.DOCTORS

    let { selectedSlot, rescheduleSlot } = state.DOCTOR_SEARCH

    return {
        DOCTORS, selectedSlot, rescheduleSlot
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorById: (doctorId, clinicId) => dispatch(getDoctorById(doctorId, clinicId)),
        getTimeSlots: (doctorId, clinicId, callback) => dispatch(getTimeSlots(doctorId, clinicId, callback)),
        selectOpdTimeSLot: (slot, reschedule, appointmentId) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AppointmentSlot);
