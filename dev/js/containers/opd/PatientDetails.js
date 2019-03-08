import React from 'react';
import { connect } from 'react-redux';

import { getCartItems, addToCart, getDoctorById, getUserProfile, createOPDAppointment, selectOpdTimeSLot, sendAgentBookingURL, removeCoupons, applyOpdCoupons, resetOpdCoupons, getCoupons, applyCoupons, createProfile, sendOTP, submitOTP, fetchTransactions, select_opd_payment_type, getTimeSlots,editUserProfile } from '../../actions/index.js'
import STORAGE from '../../helpers/storage'

import PatientDetailsView from '../../components/opd/patientDetails/index.js'

class PatientDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timeSlots: null,
            doctor_leaves: [],
            DATA_FETCH: false
        }
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }

        if (STORAGE.checkAuth()) {
            this.props.getUserProfile()
            this.props.fetchTransactions()
            this.props.getCartItems()
        }

        this.props.getDoctorById(this.props.match.params.id, this.props.match.params.clinicId, this.props.commonProfileSelectedProcedures)

        if(this.props.selectedSlot && this.props.selectedSlot.date && !this.props.selectedSlot.summaryPage){
            this.setState({DATA_FETCH: true})
        }else{
            
            this.props.getTimeSlots(this.props.match.params.id, this.props.match.params.clinicId, (timeSlots) => {
                this.setState({ timeSlots: timeSlots.timeslots, doctor_leaves: timeSlots.doctor_leaves, DATA_FETCH: true })
            })   
        }

    }

    render() {

        return (
            <PatientDetailsView {...this.props} {...this.state}/>
        );
    }
}

const mapStateToProps = (state) => {

    let DOCTORS = state.DOCTOR_PROFILES
    const { selectedProfile, profiles, userWalletBalance, userCashbackBalance } = state.USER
    let { selectedSlot, doctorCoupons, disCountedOpdPrice, couponAutoApply, selectedDoctorProcedure, commonProfileSelectedProcedures, payment_type } = state.DOCTOR_SEARCH

    return {
        selectedProfile, profiles, DOCTORS, selectedSlot, doctorCoupons, disCountedOpdPrice, couponAutoApply, selectedDoctorProcedure, commonProfileSelectedProcedures, userWalletBalance, userCashbackBalance, payment_type
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectOpdTimeSLot: (slot, reschedule, appointmentId) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId)),
        getUserProfile: () => dispatch(getUserProfile()),
        getDoctorById: (doctorId, hospitalId, procedure_ids) => dispatch(getDoctorById(doctorId, hospitalId, procedure_ids)),
        createOPDAppointment: (postData, callback) => dispatch(createOPDAppointment(postData, callback)),
        sendAgentBookingURL: (orderId, type, cb) => dispatch(sendAgentBookingURL(orderId, type, cb)),
        removeCoupons: (hospitalId, couponId) => dispatch(removeCoupons(hospitalId, couponId)),
        applyOpdCoupons: (productId, couponCode, couponId, doctor_id, dealPrice, hospitalId, profile_id, procedures_ids, cart_item) => dispatch(applyOpdCoupons(productId, couponCode, couponId, doctor_id, dealPrice, hospitalId, profile_id, procedures_ids, cart_item)),
        applyCoupons: (productId, couponData, couponId, hospitalId) => dispatch(applyCoupons(productId, couponData, couponId, hospitalId)),
        resetOpdCoupons: () => dispatch(resetOpdCoupons()),
        getCoupons: (data) => dispatch(getCoupons(data)),
        createProfile: (postData, cb) => dispatch(createProfile(postData, cb)),
        sendOTP: (number, cb) => dispatch(sendOTP(number, cb)),
        submitOTP: (number, otp, cb) => dispatch(submitOTP(number, otp, cb)),
        fetchTransactions: () => dispatch(fetchTransactions()),
        addToCart: (product_id, data) => dispatch(addToCart(product_id, data)),
        getCartItems: () => dispatch(getCartItems()),
        select_opd_payment_type: (type) => dispatch(select_opd_payment_type(type)),
        getTimeSlots: (doctorId, clinicId, callback) => dispatch(getTimeSlots(doctorId, clinicId, callback)),
        editUserProfile: (profileData, profileId, cb) => dispatch(editUserProfile(profileData, profileId, cb))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PatientDetails);
