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
        let procedure_ids = []
        if(this.props.selectedDoctorProcedure[this.props.match.params.id] && this.props.selectedDoctorProcedure[this.props.match.params.id][this.props.match.params.clinicId] && this.props.selectedDoctorProcedure[this.props.match.params.id][this.props.match.params.clinicId].categories){

            Object.values(this.props.selectedDoctorProcedure[this.props.match.params.id][this.props.match.params.clinicId].categories).map((procedure) => {

                procedure_ids =  procedure_ids.concat(procedure.filter(x=>x.is_selected).map(x=>x.procedure_id))    
            })

        }
        this.props.getDoctorById(this.props.match.params.id, this.props.match.params.clinicId, procedure_ids)
    }

    render() {

        return (
            <AppointmentSlotView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {

    let DOCTORS = state.DOCTOR_PROFILES

    let { selectedSlot, rescheduleSlot, selectedDoctorProcedure } = state.DOCTOR_SEARCH

    let { commonProcedurers } = state.SEARCH_CRITERIA_OPD
    return {
        DOCTORS, selectedSlot, rescheduleSlot, commonProcedurers, selectedDoctorProcedure
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
