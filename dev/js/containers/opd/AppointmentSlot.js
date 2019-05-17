import React from 'react';
import { connect } from 'react-redux';

import { getDoctorById, getTimeSlots, selectOpdTimeSLot } from '../../actions/index.js'
const queryString = require('query-string');

import AppointmentSlotView from '../../components/opd/appointmentSlot/index.js'

class AppointmentSlot extends React.Component {
    constructor(props) {
        super(props)
    }

    // static loadData(store, match, queryData) {
    //     let doctor_id = match.params.id || queryData.doctor_id
    //     let hospital_id = match.params.clinicId || queryData.hospital_id

    //     return store.dispatch(getDoctorById(doctor_id, hospital_id))
    // }

    static contextTypes = {
        router: () => null
    }

    fetchData(props) {
        const parsed = queryString.parse(props.location.search)

        let doctor_id = props.selectedDoctor || props.match.params.id || parsed.doctor_id
        let hospital_id = props.selectedClinic || props.match.params.clinicId || parsed.hospital_id

        if (doctor_id) {
            props.getDoctorById(doctor_id, hospital_id, props.commonProfileSelectedProcedures)
        }
    }

    componentDidMount() {
        this.fetchData(this.props)
    }

    componentWillReceiveProps(props) {
        if (props.selectedDoctor != this.props.selectedDoctor) {
            this.fetchData(props)
        }
    }

    render() {

        const parsed = queryString.parse(this.props.location.search)

        let doctor_id = this.props.selectedDoctor || this.props.match.params.id || parsed.doctor_id
        let hospital_id = this.props.selectedClinic || this.props.match.params.clinicId || parsed.hospital_id

        return (
            <AppointmentSlotView {...this.props} selectedDoctor={doctor_id} selectedClinic={hospital_id} />
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
