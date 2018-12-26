import React from 'react';
import { connect } from 'react-redux';

import { getUpcomingAppointments, getLabBookingSummary, updateLabAppointment, selectLabTimeSLot, retryPaymentLAB, getRatingCompliments, createAppointmentRating, updateAppointmentRating, closeAppointmentPopUp } from '../../actions/index.js'

import BookingView from '../../components/diagnosis/booking/BookingView.js'

class Booking extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <BookingView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    let { rescheduleSlot } = state.LAB_SEARCH
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
        getUpcomingAppointments: () => dispatch(getUpcomingAppointments()),
        getLabBookingSummary: (appointmentID, callback) => dispatch(getLabBookingSummary(appointmentID, callback)),
        updateLabAppointment: (appointmentData, callback) => dispatch(updateLabAppointment(appointmentData, callback)),
        selectLabTimeSLot: (slot, reschedule) => dispatch(selectLabTimeSLot(slot, reschedule)),
        retryPaymentLAB: (appointmentId, callback) => dispatch(retryPaymentLAB(appointmentId, callback)),
        getRatingCompliments: (callback) => dispatch(getRatingCompliments(callback)),
        createAppointmentRating: (appointmentData, callback) => dispatch(createAppointmentRating(appointmentData, callback)),
        updateAppointmentRating: (ratingData, callback) => dispatch(updateAppointmentRating(ratingData, callback)),
        closeAppointmentPopUp: (id, callback) => dispatch(closeAppointmentPopUp(id, callback)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Booking);
