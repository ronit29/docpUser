import React from 'react';
import { connect } from 'react-redux';

import { getDoctorById, getUserProfile, createOPDAppointment, selectOpdTimeSLot, sendAgentBookingURL, removeCoupons, applyOpdCoupons, resetOpdCoupons } from '../../actions/index.js'
import STORAGE from '../../helpers/storage'

import PatientDetailsView from '../../components/opd/patientDetails/index.js'

class PatientDetails extends React.Component {
    constructor(props) {
        super(props)
        if (!STORAGE.checkAuth()) {
            this.props.history.replace(`/login?callback=${this.props.location.pathname}&login=opd`)
        }
    }

    // static loadData(store, match) {
    //     return Promise.all([store.dispatch(getDoctorById(match.params.id)), store.dispatch(getUserProfile())])
    // }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        if (STORAGE.checkAuth()) {
            this.props.getDoctorById(this.props.match.params.id, this.props.match.params.clinicId)
            this.props.getUserProfile()
        }
    }

    render() {

        return (
            <PatientDetailsView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {

    let DOCTORS = state.DOCTORS
    const { selectedProfile, profiles } = state.USER
    let { selectedSlot, doctorCoupons, disCountedOpdPrice } = state.DOCTOR_SEARCH

    return {
        selectedProfile, profiles, DOCTORS, selectedSlot, doctorCoupons, disCountedOpdPrice 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectOpdTimeSLot: (slot, reschedule, appointmentId) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId)),
        getUserProfile: () => dispatch(getUserProfile()),
        getDoctorById: (doctorId, hospitalId) => dispatch(getDoctorById(doctorId, hospitalId)),
        createOPDAppointment: (postData, callback) => dispatch(createOPDAppointment(postData, callback)),
        sendAgentBookingURL: (orderId, type, cb) => dispatch(sendAgentBookingURL(orderId, type, cb)),
        removeCoupons: (hospitalId, couponId ) => dispatch(removeCoupons(hospitalId, couponId )),
        applyOpdCoupons: (productId, couponCode, couponId, hospitalId, dealPrice) => dispatch(applyOpdCoupons(productId, couponCode, couponId, hospitalId, dealPrice)),
        resetOpdCoupons: () => dispatch(resetOpdCoupons())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PatientDetails);
