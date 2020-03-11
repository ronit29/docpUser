import React from 'react';
import { connect } from 'react-redux';

import { getCartItems, addToCart, selectLabTimeSLot, getLabById, getUserProfile, selectLabAppointmentType, getUserAddress, selectPickupAddress, createLABAppointment, sendAgentBookingURL, removeLabCoupons, applyLabCoupons, resetLabCoupons, getCoupons, applyCoupons, setCorporateCoupon, createProfile, sendOTP, submitOTP, fetchTransactions, editUserProfile, savePincode, clearExtraTests, selectSearchType, patientDetails, uploadPrescription, savePrescription, removePrescription, clearPrescriptions, preBooking, saveAvailNowInsurance, toggleDiagnosisCriteria, unSetCommonUtmTags, sendSPOAgentBooking, setCommonUtmTags, getLabVipGoldPlans, selectVipClubPlan, select_lab_payment_type, pushMembersData, retrieveMembersData, clearAllTests, selectProfile, NonIpdBookingLead } from '../../actions/index.js'
import STORAGE from '../../helpers/storage'

import BookingSummaryViewNew from '../../components/diagnosis/bookingSummary/index.js'
const queryString = require('query-string');


class BookingSummary extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            agent_selected_plan_id:null
        }
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
            //Check if user is login, if logged in then fetch user related data
            props.getUserProfile()
            props.getUserAddress()
            props.fetchTransactions()
            props.getCartItems()
        }

        if(parsed.dummy_id) {
            //If dummy_id is availble in the url, then we logged in user & proceed with single flow journey
            this.singleFlowLogin(props,lab_id)

        }else if(lab_id){
            //Select all the tests selected by the user in the previous page & hit api with the same
            let testIds = props.lab_test_data[lab_id] || []
            testIds = testIds.map(x => x.id)
            let forceAddTestids = false
            if(parsed.test_ids) {
                testIds = parsed.test_ids.split(',')
                forceAddTestids = true
            }
            let dataParams = {
                booking_page: true
            }
            props.getLabById(lab_id, testIds, forceAddTestids, dataParams)
        }
    }

    singleFlowLogin(props, lab_id){
       // this.props.clearAllTests()
        //Auto Select on Agent Login URL
        const parsed = queryString.parse(props.location.search)
        if(parsed && parsed.dummy_id) {
            let extraParams = {
                dummy_id: parsed.dummy_id
            }
            props.retrieveMembersData('SINGLE_PURCHASE', extraParams, (resp)=>{ // to retrieve already pushed member data in case of agent or proposer it self
                if(resp && resp.data){
                    this.setLabBooking(resp.data) 
                    this.setState({agent_selected_plan_id:resp.data.plus_plan})   
                }
                setTimeout(()=>{
                    let testIds = props.lab_test_data[lab_id] || []
                    testIds = testIds.map(x => x.id)
                    let forceAddTestids = false
                    if(parsed.test_ids) {
                        testIds = parsed.test_ids.split(',')
                        forceAddTestids = true
                    }
                    let dataParams = {
                        booking_page: true
                    }
                    props.getLabById(lab_id, testIds, forceAddTestids, dataParams)
                },100)
            })
        }
    }

    setLabBooking(data) {
        //On Agent/Direct Login, set data for the lab page,e.g select timeslot, profileid, pickup type, tests, coupons  
        let { coupon_data } = data
        // for (let curr_test of data.test_ids) {
        //     let curr = {}
        //     curr.id = curr_test
        //     curr.extra_test = true
        //     curr.lab_id = data.labId
        //     this.props.toggleDiagnosisCriteria('test', curr, true)
        // }

        if (data && data.pincode) {
            this.props.savePincode(data.pincode)
        }

        this.props.selectProfile(data.profile)
        this.props.select_lab_payment_type(data.payment_type)
        
        this.props.selectLabTimeSLot(data.selectedSlot, false, null)

        if (coupon_data.coupon_code) {
            let coupon_id = ''
            let is_cashback = false
    
            if (coupon_code && Object.keys(coupon_code).length) {
                coupon_id = coupon_code.id
                is_cashback = coupon_code.is_cashback
            }
            if (coupon_code) {
                this.props.applyCoupons('2', { code: coupon_data.coupon_code, coupon_id: coupon_id, is_cashback: is_cashback }, coupon_id, data.labId)
            }

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
            <BookingSummaryViewNew {...this.props} selectedLab={lab_id} agent_selected_plan_id={this.state.agent_selected_plan_id} fetchData={this.fetchData.bind(this)}/>
        );
    }
}

const mapStateToProps = (state) => {

    const {
        selectedCriterias,
        lab_test_data,
        corporateCoupon,
        pincode,
        saved_patient_details,
        selectedLocation
    } = state.SEARCH_CRITERIA_LABS
    const { selectedProfile, profiles, address, userWalletBalance, userCashbackBalance, isUserCared, defaultProfile, ipd_chat, common_utm_tags, is_any_user_buy_gold, user_loggedIn_number } = state.USER
    let LABS = state.LABS
    let { selectedSlot, selectedAppointmentType, selectedAddress, labCoupons, disCountedLabPrice, couponAutoApply, user_prescriptions, is_prescription_needed, selectedDateFormat, show_vip_non_login_card , payment_type} = state.LAB_SEARCH
    const { labGoldPredictedPrice, selected_vip_plan,show_lab_payment_mode } =  state.VIPCLUB


    return {
        corporateCoupon,
        selectedCriterias,
        lab_test_data,
        LABS,
        selectedProfile, profiles, selectedSlot, selectedAppointmentType, address, selectedAddress, labCoupons, disCountedLabPrice,
        couponAutoApply, userWalletBalance, userCashbackBalance, pincode, isUserCared, defaultProfile, saved_patient_details, user_prescriptions, ipd_chat, is_prescription_needed, selectedDateFormat, selectedLocation, common_utm_tags, show_vip_non_login_card,
        is_any_user_buy_gold, labGoldPredictedPrice, selected_vip_plan, payment_type, show_lab_payment_mode, user_loggedIn_number
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectLabTimeSLot: (slot, reschedule, dateParam) => dispatch(selectLabTimeSLot(slot, reschedule, dateParam)),
        getUserProfile: () => dispatch(getUserProfile()),
        getLabById: (labId, testIds, forceAddTestids, dataParams) => dispatch(getLabById(labId, testIds, forceAddTestids, dataParams)),
        selectLabAppointmentType: (type) => dispatch(selectLabAppointmentType(type)),
        getUserAddress: () => dispatch(getUserAddress()),
        selectPickupAddress: (address) => dispatch(selectPickupAddress(address)),
        createLABAppointment: (postData, callback) => dispatch(createLABAppointment(postData, callback)),
        sendAgentBookingURL: (orderId, type, purchase_type,query_data,extraParams, cb) => dispatch(sendAgentBookingURL(orderId, type,purchase_type,query_data, extraParams, cb)),
        removeLabCoupons: (labId, couponId) => dispatch(removeLabCoupons(labId, couponId)),
        applyLabCoupons: (productId, couponCode, couponId, labId, dealPrice, test_ids, profile_id, cart_item, callback) => dispatch(applyLabCoupons(productId, couponCode, couponId, labId, dealPrice, test_ids, profile_id, cart_item, callback)),
        resetLabCoupons: () => dispatch(resetLabCoupons()),
        getCoupons: (data) => dispatch(getCoupons(data)),
        applyCoupons: (productId, couponData, couponId, labId, callback) => dispatch(applyCoupons(productId, couponData, couponId, labId, callback)),
        setCorporateCoupon: (coupon) => dispatch(setCorporateCoupon(coupon)),
        createProfile: (postData, cb) => dispatch(createProfile(postData, cb)),
        sendOTP: (number,viaSms,viaWhatsapp,message_type, cb) => dispatch(sendOTP(number,viaSms,viaWhatsapp,message_type, cb)),
        submitOTP: (number, otp, extraParamsData, cb) => dispatch(submitOTP(number, otp,extraParamsData,  cb)),
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
        saveAvailNowInsurance:(data) => dispatch(saveAvailNowInsurance(data)),
        unSetCommonUtmTags: (type, tag)=> dispatch(unSetCommonUtmTags(type, tag)),
        sendSPOAgentBooking: (postData, cb) => dispatch(sendSPOAgentBooking(postData, cb)),
        setCommonUtmTags: (type, tag) => dispatch(setCommonUtmTags(type, tag)),
        toggleDiagnosisCriteria: (type, criteria) => dispatch(toggleDiagnosisCriteria(type, criteria)),
        getLabVipGoldPlans: (dataParams, cb) => dispatch(getLabVipGoldPlans(dataParams, cb)),
        selectVipClubPlan: (type, selectedPlan, cb) => dispatch(selectVipClubPlan(type, selectedPlan, cb)),
        select_lab_payment_type: (type) => dispatch(select_lab_payment_type(type)),
        pushMembersData:(criteria, cb) =>dispatch(pushMembersData(criteria, cb)),
        retrieveMembersData:(type,extraParams, callback) => dispatch(retrieveMembersData(type, extraParams, callback)),
        clearAllTests: () => dispatch(clearAllTests()),
        selectProfile: (id) => dispatch(selectProfile(id)),
        NonIpdBookingLead:(data,cb) =>dispatch(NonIpdBookingLead(data, cb)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingSummary);
