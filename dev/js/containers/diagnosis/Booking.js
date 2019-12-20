import React from 'react';
import { connect } from 'react-redux';

import { getCartItems, getUpcomingAppointments, getLabBookingSummary, updateLabAppointment, selectLabTimeSLot, retryPaymentLAB, getRatingCompliments, createAppointmentRating, updateAppointmentRating, closeAppointmentPopUp, setCorporateCoupon, editUserProfile, resetPkgCompare, clearVipSelectedPlan, toggleDiagnosisCriteria } from '../../actions/index.js'
import STORAGE from '../../helpers/storage'
import BookingView from '../../components/diagnosis/booking/BookingView.js'
import FCM from '../../helpers/fcm'

class Booking extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (STORAGE.checkAuth()) {
            this.props.getCartItems()
        }
        this.props.resetPkgCompare()
        FCM.getPermission()
    }

    render() {

        return (
            <BookingView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    let { rescheduleSlot } = state.LAB_SEARCH

    let {
        summary_utm, summary_utm_validity, newNotification, notifications, rated_appoinments, profiles, selectedProfile
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
        setCorporateCoupon: (coupon) => dispatch(setCorporateCoupon(coupon)),
        getCartItems: () => dispatch(getCartItems()),
        editUserProfile: (profileData, profileId, cb) => dispatch(editUserProfile(profileData, profileId, cb)),
        resetPkgCompare: () => dispatch(resetPkgCompare()),
        clearVipSelectedPlan:() =>dispatch(clearVipSelectedPlan()),
        toggleDiagnosisCriteria: (type, test, forceAdd, filters) => dispatch(toggleDiagnosisCriteria(type, test, forceAdd, filters))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Booking);
