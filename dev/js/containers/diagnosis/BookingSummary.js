import React from 'react';
import { connect } from 'react-redux';

import { getCartItems, addToCart, selectLabTimeSLot, getLabById, getUserProfile, selectLabAppointmentType, getUserAddress, selectPickupAddress, createLABAppointment, sendAgentBookingURL, removeLabCoupons, applyLabCoupons, resetLabCoupons, getCoupons, applyCoupons, setCorporateCoupon, createProfile, sendOTP, submitOTP, fetchTransactions, editUserProfile, savePincode, clearExtraTests, selectSearchType } from '../../actions/index.js'
import STORAGE from '../../helpers/storage'

import BookingSummaryViewNew from '../../components/diagnosis/bookingSummary/index.js'

class BookingSummary extends React.Component {
    constructor(props) {
        super(props)

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
            this.props.getUserAddress()
            this.props.fetchTransactions()
            this.props.getCartItems()
        }

        let testIds = this.props.lab_test_data[this.props.match.params.id] || []
        testIds = testIds.map(x => x.id)

        this.props.getLabById(this.props.match.params.id, testIds)
    }

    render() {

        return (
            <BookingSummaryViewNew {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {

    const {
        selectedCriterias,
        lab_test_data,
        corporateCoupon,
        pincode
    } = state.SEARCH_CRITERIA_LABS
    const { selectedProfile, profiles, address, userWalletBalance, userCashbackBalance, isUserCared, defaultProfile } = state.USER
    let LABS = state.LABS
    let { selectedSlot, selectedAppointmentType, selectedAddress, labCoupons, disCountedLabPrice, couponAutoApply } = state.LAB_SEARCH

    return {
        corporateCoupon,
        selectedCriterias,
        lab_test_data,
        LABS,
        selectedProfile, profiles, selectedSlot, selectedAppointmentType, address, selectedAddress, labCoupons, disCountedLabPrice,
        couponAutoApply, userWalletBalance, userCashbackBalance, pincode, isUserCared, defaultProfile
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
        applyLabCoupons: (productId, couponCode, couponId, labId, dealPrice, test_ids, profile_id, cart_item) => dispatch(applyLabCoupons(productId, couponCode, couponId, labId, dealPrice, test_ids, profile_id, cart_item)),
        resetLabCoupons: () => dispatch(resetLabCoupons()),
        getCoupons: (data) => dispatch(getCoupons(data)),
        applyCoupons: (productId, couponData, couponId, labId) => dispatch(applyCoupons(productId, couponData, couponId, labId)),
        setCorporateCoupon: (coupon) => dispatch(setCorporateCoupon(coupon)),
        createProfile: (postData, cb) => dispatch(createProfile(postData, cb)),
        sendOTP: (number, cb) => dispatch(sendOTP(number, cb)),
        submitOTP: (number, otp, cb) => dispatch(submitOTP(number, otp, cb)),
        fetchTransactions: () => dispatch(fetchTransactions()),
        savePincode: (pincode) => dispatch(savePincode(pincode)),
        addToCart: (product_id, data) => dispatch(addToCart(product_id, data)),
        getCartItems: () => dispatch(getCartItems()),
        editUserProfile: (profileData, profileId, cb) => dispatch(editUserProfile(profileData, profileId, cb)),
        clearExtraTests: () => dispatch(clearExtraTests()),
        selectSearchType: (type) => dispatch(selectSearchType(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingSummary);
