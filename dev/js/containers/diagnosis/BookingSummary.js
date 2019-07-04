import React from 'react';
import { connect } from 'react-redux';

import { getCartItems, addToCart, selectLabTimeSLot, getLabById, getUserProfile, selectLabAppointmentType, getUserAddress, selectPickupAddress, createLABAppointment, sendAgentBookingURL, removeLabCoupons, applyLabCoupons, resetLabCoupons, getCoupons, applyCoupons, setCorporateCoupon, createProfile, sendOTP, submitOTP, fetchTransactions, editUserProfile, savePincode, clearExtraTests, selectSearchType, patientDetails, uploadPrescription, savePrescription, removePrescription, clearPrescriptions, preBooking, saveAvailNowInsurance } from '../../actions/index.js'
import STORAGE from '../../helpers/storage'

import BookingSummaryViewNew from '../../components/diagnosis/bookingSummary/index.js'
const queryString = require('query-string');


class BookingSummary extends React.Component {
    constructor(props) {
        super(props)

    }

    static contextTypes = {
        router: () => null
    }

    fetchData(props){
        const parsed = queryString.parse(props.location.search)

        let lab_id = props.selectedLab || props.match.params.id || parsed.lab_id

        if (window) {
            window.scrollTo(0, 0)
        }

        if (STORAGE.checkAuth()) {
            props.getUserProfile()
            props.getUserAddress()
            props.fetchTransactions()
            props.getCartItems()
        }

        if(lab_id){
            let testIds = props.lab_test_data[lab_id] || []
            testIds = testIds.map(x => x.id)

            props.getLabById(lab_id, testIds)
        }
    }

    componentWillReceiveProps(props){
        if(props.selectedLab != this.props.selectedLab){
            this.fetchData(props)
        }
    }

    componentDidMount() {
        this.fetchData(this.props)
    }

    render() {

        const parsed = queryString.parse(this.props.location.search)
        let lab_id = this.props.selectedLab || this.props.match.params.id || parsed.lab_id

        return (
            <BookingSummaryViewNew {...this.props} selectedLab={lab_id} />
        );
    }
}

const mapStateToProps = (state) => {

    const {
        selectedCriterias,
        lab_test_data,
        corporateCoupon,
        pincode,
        saved_patient_details
    } = state.SEARCH_CRITERIA_LABS
    const { selectedProfile, profiles, address, userWalletBalance, userCashbackBalance, isUserCared, defaultProfile, ipd_chat } = state.USER
    let LABS = state.LABS
    let { selectedSlot, selectedAppointmentType, selectedAddress, labCoupons, disCountedLabPrice, couponAutoApply, user_prescriptions, is_prescription_needed } = state.LAB_SEARCH

    return {
        corporateCoupon,
        selectedCriterias,
        lab_test_data,
        LABS,
        selectedProfile, profiles, selectedSlot, selectedAppointmentType, address, selectedAddress, labCoupons, disCountedLabPrice,
        couponAutoApply, userWalletBalance, userCashbackBalance, pincode, isUserCared, defaultProfile, saved_patient_details, user_prescriptions, ipd_chat, is_prescription_needed
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectLabTimeSLot: (slot, reschedule) => dispatch(selectLabTimeSLot(slot, reschedule)),
        getUserProfile: () => dispatch(getUserProfile()),
        getLabById: (labId, testIds) => dispatch(getLabById(labId, testIds)),
        selectLabAppointmentType: (type) => dispatch(selectLabAppointmentType(type)),
        getUserAddress: () => dispatch(getUserAddress()),
        selectPickupAddress: (address) => dispatch(selectPickupAddress(address)),
        createLABAppointment: (postData, callback) => dispatch(createLABAppointment(postData, callback)),
        sendAgentBookingURL: (orderId, type, cb) => dispatch(sendAgentBookingURL(orderId, type, cb)),
        removeLabCoupons: (labId, couponId) => dispatch(removeLabCoupons(labId, couponId)),
        applyLabCoupons: (productId, couponCode, couponId, labId, dealPrice, test_ids, profile_id, cart_item, callback) => dispatch(applyLabCoupons(productId, couponCode, couponId, labId, dealPrice, test_ids, profile_id, cart_item, callback)),
        resetLabCoupons: () => dispatch(resetLabCoupons()),
        getCoupons: (data) => dispatch(getCoupons(data)),
        applyCoupons: (productId, couponData, couponId, labId) => dispatch(applyCoupons(productId, couponData, couponId, labId)),
        setCorporateCoupon: (coupon) => dispatch(setCorporateCoupon(coupon)),
        createProfile: (postData, cb) => dispatch(createProfile(postData, cb)),
        sendOTP: (number,viaSms,viaWhatsapp,message_type, cb) => dispatch(sendOTP(number,viaSms,viaWhatsapp,message_type, cb)),
        submitOTP: (number, otp, cb) => dispatch(submitOTP(number, otp, cb)),
        fetchTransactions: () => dispatch(fetchTransactions()),
        savePincode: (pincode) => dispatch(savePincode(pincode)),
        addToCart: (product_id, data) => dispatch(addToCart(product_id, data)),
        getCartItems: () => dispatch(getCartItems()),
        editUserProfile: (profileData, profileId, cb) => dispatch(editUserProfile(profileData, profileId, cb)),
        clearExtraTests: () => dispatch(clearExtraTests()),
        selectSearchType: (type) => dispatch(selectSearchType(type)),
        patientDetails:(criteria) => dispatch(patientDetails(criteria)),
        uploadPrescription:(profileData,cb) =>dispatch(uploadPrescription(profileData,cb)),
        savePrescription:(imgUrl,cb)=>dispatch(savePrescription(imgUrl,cb)),
        removePrescription:(criteria)=>dispatch(removePrescription(criteria)),
        clearPrescriptions:()=>dispatch(clearPrescriptions()),
        preBooking:(slot) => dispatch(preBooking(slot)),
        saveAvailNowInsurance:(data) => dispatch(saveAvailNowInsurance(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingSummary);
