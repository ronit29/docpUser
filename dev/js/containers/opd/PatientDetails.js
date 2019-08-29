import React from 'react';
import { connect } from 'react-redux';

import { getCartItems, addToCart, getDoctorById, getUserProfile, createOPDAppointment, selectOpdTimeSLot, sendAgentBookingURL, removeCoupons, applyOpdCoupons, resetOpdCoupons, getCoupons, applyCoupons, createProfile, sendOTP, submitOTP, fetchTransactions, select_opd_payment_type, getTimeSlots, editUserProfile, patientDetails, ipdChatView, checkIpdChatAgentStatus, saveAvailNowInsurance, submitIPDForm } from '../../actions/index.js'
import STORAGE from '../../helpers/storage'
const queryString = require('query-string');

import PatientDetailsView from '../../components/opd/patientDetails/index.js'

class PatientDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timeSlots: null,
            doctor_leaves: [],
            DATA_FETCH: false,
            upcoming_slots: null,
            is_integrated: false
        }
    }

    // static loadData(store, match, queryData) {
    //     let doctor_id = match.params.id || queryData.doctor_id
    //     let hospital_id = match.params.clinicId || queryData.hospital_id

    //     return store.dispatch(getDoctorById(doctor_id, hospital_id))
    // }

    static contextTypes = {
        router: () => null
    }

    fetchData(props,clinic_id,callDoctorById) {
        const parsed = queryString.parse(props.location.search)
        let doctor_id = props.selectedDoctor || props.match.params.id || parsed.doctor_id
        let hospital_id
        if(clinic_id){
            hospital_id = clinic_id
        }else{
            hospital_id = parsed.hospital_id || props.match.params.clinicId
        }

        if (window) {
            window.scrollTo(0, 0)
        }

        if (STORAGE.checkAuth()) {
            props.getUserProfile()
            props.fetchTransactions()
            props.getCartItems()
        }

        if (doctor_id) {
            if(callDoctorById){
                props.getDoctorById(doctor_id, hospital_id, props.commonProfileSelectedProcedures)
            }

            /*if (props.selectedSlot && props.selectedSlot.date && !props.selectedSlot.summaryPage) {
                this.setState({ DATA_FETCH: true })
            } else {

                props.getTimeSlots(doctor_id, hospital_id, (timeSlots) => {
                    this.setState({ timeSlots: timeSlots.timeslots, doctor_leaves: timeSlots.doctor_leaves, DATA_FETCH: true, upcoming_slots: timeSlots.upcoming_slots })
                })
            }*/
            let selectedDate = new Date()
            if(this.props.selectedDateFormat) {
               selectedDate = this.props.selectedDateFormat
            }else{
                selectedDate = this.getFormattedDate(selectedDate)
            }
            let extraParams = {
                selectedDate: selectedDate
            }
            props.getTimeSlots(doctor_id, hospital_id, extraParams, (timeSlots) => {
                    this.setState({ timeSlots: timeSlots.timeslots, doctor_leaves: timeSlots.doctor_leaves, DATA_FETCH: true, upcoming_slots: timeSlots.upcoming_slots, is_integrated: timeSlots.is_integrated||false })
                })
        }
    }

    componentWillReceiveProps(props) {
        if (props.selectedDoctor != this.props.selectedDoctor) {
            this.fetchData(props,null,true)
        }
    }

    componentDidMount() {
        this.fetchData(this.props,null,true)
    }

    getFormattedDate(date){
        var dd = date.getDate();

        var mm = date.getMonth()+1; 
        var yyyy = date.getFullYear();
        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        }

        var today = yyyy+'-'+mm+'-'+dd
        return today
    }

    render() {

        const parsed = queryString.parse(this.props.location.search)

        let doctor_id = this.props.selectedDoctor || this.props.match.params.id || parsed.doctor_id
        let hospital_id = parsed.hospital_id || this.props.match.params.clinicId 

        return (
            <PatientDetailsView {...this.props} {...this.state} selectedDoctor={doctor_id} selectedClinic={hospital_id} fetchData={this.fetchData.bind(this)}/>
        );
    }
}

const mapStateToProps = (state) => {

    let DOCTORS = state.DOCTOR_PROFILES
    const { selectedProfile, profiles, userWalletBalance, userCashbackBalance, defaultProfile, ipd_chat, is_ipd_form_submitted } = state.USER
    let { selectedSlot, doctorCoupons, disCountedOpdPrice, couponAutoApply, selectedDoctorProcedure, commonProfileSelectedProcedures, payment_type, selectedDateFormat, TIMESLOT_DATA_LOADING } = state.DOCTOR_SEARCH
    const { saved_patient_details } = state.SEARCH_CRITERIA_LABS
    const { common_settings, selectedLocation } = state.SEARCH_CRITERIA_OPD
    const { ipdPopupData } = state.SEARCH_CRITERIA_IPD
    return {
        selectedProfile, profiles, DOCTORS, selectedSlot, doctorCoupons, disCountedOpdPrice, couponAutoApply, selectedDoctorProcedure, commonProfileSelectedProcedures, userWalletBalance, userCashbackBalance, payment_type, saved_patient_details, defaultProfile, ipd_chat, common_settings, selectedDateFormat, TIMESLOT_DATA_LOADING, is_ipd_form_submitted, ipdPopupData, selectedLocation
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectOpdTimeSLot: (slot, reschedule, appointmentId, extraDateParams) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId, extraDateParams)),
        getUserProfile: () => dispatch(getUserProfile()),
        getDoctorById: (doctorId, hospitalId, procedure_ids) => dispatch(getDoctorById(doctorId, hospitalId, procedure_ids)),
        createOPDAppointment: (postData, callback) => dispatch(createOPDAppointment(postData, callback)),
        sendAgentBookingURL: (orderId, type, cb) => dispatch(sendAgentBookingURL(orderId, type, cb)),
        removeCoupons: (hospitalId, couponId) => dispatch(removeCoupons(hospitalId, couponId)),
        applyOpdCoupons: (productId, couponCode, couponId, doctor_id, dealPrice, hospitalId, profile_id, procedures_ids, cart_item, callback) => dispatch(applyOpdCoupons(productId, couponCode, couponId, doctor_id, dealPrice, hospitalId, profile_id, procedures_ids, cart_item, callback)),
        applyCoupons: (productId, couponData, couponId, hospitalId,callback) => dispatch(applyCoupons(productId, couponData, couponId, hospitalId,callback)),
        resetOpdCoupons: () => dispatch(resetOpdCoupons()),
        getCoupons: (data) => dispatch(getCoupons(data)),
        createProfile: (postData, cb) => dispatch(createProfile(postData, cb)),
        sendOTP: (number,viaSms,viaWhatsapp,message_type, cb) => dispatch(sendOTP(number,viaSms,viaWhatsapp,message_type, cb)),
        submitOTP: (number, otp, cb) => dispatch(submitOTP(number, otp, cb)),
        fetchTransactions: () => dispatch(fetchTransactions()),
        addToCart: (product_id, data) => dispatch(addToCart(product_id, data)),
        getCartItems: () => dispatch(getCartItems()),
        select_opd_payment_type: (type) => dispatch(select_opd_payment_type(type)),
        getTimeSlots: (doctorId, clinicId, extraParams,  callback) => dispatch(getTimeSlots(doctorId, clinicId, extraParams, callback)),
        editUserProfile: (profileData, profileId, cb) => dispatch(editUserProfile(profileData, profileId, cb)),
        patientDetails: (criteria) => dispatch(patientDetails(criteria)),
        ipdChatView: (data) => dispatch(ipdChatView(data)),
        checkIpdChatAgentStatus: (cb) => dispatch(checkIpdChatAgentStatus(cb)),
        saveAvailNowInsurance:(data) => dispatch(saveAvailNowInsurance(data)),
        submitIPDForm: (formData, selectedLocation, cb) => dispatch(submitIPDForm(formData, selectedLocation, cb))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PatientDetails);
