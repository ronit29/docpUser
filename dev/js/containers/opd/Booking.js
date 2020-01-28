import React from 'react';
import { connect } from 'react-redux';

import { getCartItems, getOPDBookingSummary, updateOPDAppointment, selectOpdTimeSLot, retryPaymentOPD, getRatingCompliments, createAppointmentRating, updateAppointmentRating, closeAppointmentPopUp,OTTLogin, getUnratedAppointment,closeAppointmentRating,editUserProfile, resetPkgCompare, generateVipClubLead} from '../../actions/index.js'
import STORAGE from '../../helpers/storage'
import BookingView from '../../components/opd/booking/BookingView.js'
import FCM from '../../helpers/fcm'

class Booking extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        if (STORAGE.checkAuth()) {
            this.props.getCartItems()
        }else{
            this.props.history.push('/')
        } 
        this.props.resetPkgCompare()
        FCM.getPermission()
    }

    render() {

        return (
            <div>
                <BookingView {...this.props}/>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    let { rescheduleSlot } = state.DOCTOR_SEARCH

    let {
        summary_utm, summary_utm_validity, newNotification, notifications, rated_appoinments, profiles, selectedProfile, defaultProfile, common_utm_tags
    } = state.USER
    const {
        selectedLocation

    } = state.SEARCH_CRITERIA_OPD

    return {
        rescheduleSlot, newNotification, notifications, rated_appoinments, profiles, selectedProfile, summary_utm, summary_utm_validity, selectedLocation, defaultProfile, common_utm_tags
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
         OTTLogin: (ott,user_id) => dispatch(OTTLogin(ott,user_id)),
        getOPDBookingSummary: (appointmentID, callback) => dispatch(getOPDBookingSummary(appointmentID, callback)),
        updateOPDAppointment: (appointmentData, callback) => dispatch(updateOPDAppointment(appointmentData, callback)),
        selectOpdTimeSLot: (slot, reschedule, appointmentId) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId)),
        retryPaymentOPD: (appointmentId, callback) => dispatch(retryPaymentOPD(appointmentId, callback)),
        getRatingCompliments: (callback) => dispatch(getRatingCompliments(callback)),
        createAppointmentRating: (appointmentData, callback) => dispatch(createAppointmentRating(appointmentData, callback)),
        updateAppointmentRating: (ratingData, callback) => dispatch(updateAppointmentRating(ratingData, callback)),
        closeAppointmentPopUp: (id, callback) => dispatch(closeAppointmentPopUp(id, callback)),
        getCartItems: () => dispatch(getCartItems()),
        getUnratedAppointment: (callback) => dispatch(getUnratedAppointment(callback)),
        closeAppointmentRating: (doctorId, callback) => dispatch(closeAppointmentRating(doctorId, callback)),
        editUserProfile: (profileData, profileId, cb) => dispatch(editUserProfile(profileData, profileId, cb)),
        resetPkgCompare:() => dispatch(resetPkgCompare()),
        generateVipClubLead:(data) =>dispatch(generateVipClubLead(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Booking);
