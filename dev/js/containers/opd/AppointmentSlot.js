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
        
        this.props.getDoctorById(this.props.match.params.id, this.props.match.params.clinicId, this.props.commonProfileSelectedProcedures)
    }

    render() {

        return (
            <AppointmentSlotView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {

    let DOCTORS = state.DOCTOR_PROFILES

    let { selectedSlot, rescheduleSlot, selectedDoctorProcedure, commonProfileSelectedProcedures } = state.DOCTOR_SEARCH

    let { commonProcedurers } = state.SEARCH_CRITERIA_OPD
    return {
        DOCTORS, selectedSlot, rescheduleSlot, commonProcedurers, selectedDoctorProcedure, commonProfileSelectedProcedures
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorById: (doctorId, clinicId, procedure_ids, category_ids) => dispatch(getDoctorById(doctorId, clinicId, procedure_ids, category_ids)),
        getTimeSlots: (doctorId, clinicId, callback) => dispatch(getTimeSlots(doctorId, clinicId, callback)),
        selectOpdTimeSLot: (slot, reschedule, appointmentId) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AppointmentSlot);
