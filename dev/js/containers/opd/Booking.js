import React from 'react';
import { connect } from 'react-redux';

import { getOPDBookingSummary, updateOPDAppointment, selectOpdTimeSLot, retryPaymentOPD, getRatingCompliments, createAppointmentRating, updateAppointmentRating, closeAppointmentPopUp } from '../../actions/index.js'

import BookingView from '../../components/opd/booking/BookingView.js'

class Booking extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <BookingView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    let { rescheduleSlot } = state.DOCTOR_SEARCH
    let { summary_utm, summary_utm_validity } = state.AUTH

    let {
        newNotification, notifications, rated_appoinments, profiles, selectedProfile
    } = state.USER

    return {
        rescheduleSlot, newNotification, notifications, rated_appoinments, profiles, selectedProfile, summary_utm, summary_utm_validity
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOPDBookingSummary: (appointmentID, callback) => dispatch(getOPDBookingSummary(appointmentID, callback)),
        updateOPDAppointment: (appointmentData, callback) => dispatch(updateOPDAppointment(appointmentData, callback)),
        selectOpdTimeSLot: (slot, reschedule, appointmentId) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId)),
        retryPaymentOPD: (appointmentId, callback) => dispatch(retryPaymentOPD(appointmentId, callback)),
        getRatingCompliments: (callback) => dispatch(getRatingCompliments(callback)),
        createAppointmentRating: (appointmentData, callback) => dispatch(createAppointmentRating(appointmentData, callback)),
        updateAppointmentRating: (ratingData, callback) => dispatch(updateAppointmentRating(ratingData, callback)),
        closeAppointmentPopUp: (id, callback) => dispatch(closeAppointmentPopUp(id, callback)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Booking);
