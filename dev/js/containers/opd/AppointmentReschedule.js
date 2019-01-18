import React from 'react';
import { connect } from 'react-redux';

import { getOPDBookingSummary, updateOPDAppointment, selectOpdTimeSLot, retryPaymentOPD } from '../../actions/index.js'

import AppointmentRescheduleView from '../../components/opd/appointmentReschedule'

class AppointmentReschedule extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if ((this.props.match.params.refId != this.props.appointmentId) || !this.props.rescheduleSlot.date) {
            // this.props.history.go(-1)
        }
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        if (this.props.match.params.refId == this.props.appointmentId && this.props.rescheduleSlot.date) {
            return (
                <AppointmentRescheduleView {...this.props} />
            );
        } else {
            return <AppointmentRescheduleView {...this.props} />
        }


    }
}

const mapStateToProps = (state) => {
    let { rescheduleSlot, appointmentId } = state.DOCTOR_SEARCH
    let DOCTOR = state.DOCTORS

    return {
        rescheduleSlot,
        appointmentId,
        DOCTOR
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOPDBookingSummary: (appointmentID, callback) => dispatch(getOPDBookingSummary(appointmentID, callback)),
        updateOPDAppointment: (appointmentData, callback) => dispatch(updateOPDAppointment(appointmentData, callback)),
        selectOpdTimeSLot: (slot, reschedule) => dispatch(selectOpdTimeSLot(slot, reschedule)),
        retryPaymentOPD: (appointmentId, callback) => dispatch(retryPaymentOPD(appointmentId, callback))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AppointmentReschedule);
