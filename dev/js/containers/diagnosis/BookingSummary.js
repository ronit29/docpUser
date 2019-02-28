import React from 'react';
import { connect } from 'react-redux';

import { getCartItems, addToCart, selectLabTimeSLot, getLabById, getUserProfile, selectLabAppointmentType, getUserAddress, selectPickupAddress, createLABAppointment, sendAgentBookingURL, removeLabCoupons, applyLabCoupons, resetLabCoupons, getCoupons, applyCoupons, setCorporateCoupon, createProfile, sendOTP, submitOTP, fetchTransactions, getLabTimeSlots } from '../../actions/index.js'
import STORAGE from '../../helpers/storage'

import BookingSummaryViewNew from '../../components/diagnosis/bookingSummary/index.js'

class BookingSummary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timeSlots: null,
            pickupType: this.props.location.search.includes('type=lab') ? 0 : 1,
            today_min: null,
            tomorrow_min: null,
            today_max: null,
            global_leaves: [],
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
            this.props.getUserAddress()
            this.props.fetchTransactions()
            this.props.getCartItems()
        }

        let testIds = this.props.lab_test_data[this.props.match.params.id] || []
        testIds = testIds.map(x => x.id)

        this.props.getLabById(this.props.match.params.id, testIds, (data)=>{

            if(this.props.selectedSlot && this.props.selectedSlot.date && !this.props.selectedSlot.summaryPage){
                this.setState({DATA_FETCH: true})
            }else{

                if(this.props.LABS[this.props.match.params.id] && this.props.LABS[this.props.match.params.id].lab){

                this.getLabTiming(this.props.selectedAppointmentType)
                }else if (data && data.lab) {
                    
                    let type = ''
                    if(data.lab.center_visit_enabled){
                        type = 'lab'
                    }else{
                        type = 'home'
                    }
                    this.getLabTiming(type)
                }
            }
        })
    }

    getLabTiming(type){

        this.props.getLabTimeSlots(this.props.match.params.id, type.includes('lab')?0:1, (data) => {
            let { time_slots, today_min, tomorrow_min, today_max, global_leaves } = data
            this.setState({ timeSlots: time_slots, today_min: today_min || null, tomorrow_min: tomorrow_min || null, today_max: today_max || null, global_leaves: global_leaves, DATA_FETCH: true })
        })
    }

    render() {

        return (
            <BookingSummaryViewNew {...this.props} {...this.state} getLabTiming={this.getLabTiming.bind(this)}/>
        );
    }
}

const mapStateToProps = (state) => {

    const {
        selectedCriterias,
        lab_test_data,
        corporateCoupon
    } = state.SEARCH_CRITERIA_LABS
    const { selectedProfile, profiles, address, userWalletBalance, userCashbackBalance } = state.USER
    let LABS = state.LABS
    let { selectedSlot, selectedAppointmentType, selectedAddress, labCoupons, disCountedLabPrice, couponAutoApply } = state.LAB_SEARCH

    return {
        corporateCoupon,
        selectedCriterias,
        lab_test_data,
        LABS,
        selectedProfile, profiles, selectedSlot, selectedAppointmentType, address, selectedAddress, labCoupons, disCountedLabPrice,
        couponAutoApply, userWalletBalance, userCashbackBalance
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectLabTimeSLot: (slot, reschedule) => dispatch(selectLabTimeSLot(slot, reschedule)),
        getUserProfile: () => dispatch(getUserProfile()),
        getLabById: (labId, testIds, cb) => dispatch(getLabById(labId, testIds, cb)),
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
        addToCart: (product_id, data) => dispatch(addToCart(product_id, data)),
        getCartItems: () => dispatch(getCartItems()),
        getLabTimeSlots: (labId, pickup, callback) => dispatch(getLabTimeSlots(labId, pickup, callback))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingSummary);
