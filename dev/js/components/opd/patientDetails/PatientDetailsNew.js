import React from 'react';
import { connect } from 'react-redux';
import SnackBar from 'node-snackbar'
import DoctorProfileCard from '../commons/doctorProfileCard'
import Loader from '../../commons/Loader'
import VisitTimeNew from './VisitTimeNew'
import ChoosePatientNewView from './choosePatientNew'
const queryString = require('query-string');
import SelectedClinic from '../commons/selectedClinic/index.js'

import STORAGE from '../../../helpers/storage'
import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'

import CancelationPolicy from './cancellation.js'
import PaymentSummary from './paymentSummary.js'
import GTM from '../../../helpers/gtm.js'
import ProcedureView from './procedureView.js'
import BookingError from './bookingErrorPopUp.js'
import { APPEND_HEALTH_TIP } from '../../../constants/types';
import WhatsAppOptinView from '../../commons/WhatsAppOptin/WhatsAppOptinView.js'

class PatientDetailsNew extends React.Component {
    constructor(props) {
        super(props)
        const parsed = queryString.parse(this.props.location.search)
        this.state = {
            selectedDoctor: this.props.match.params.id,
            selectedClinic: this.props.match.params.clinicId,
            paymentData: {},
            loading: false,
            error: "",
            openCancellation: false,
            order_id: false,
            couponCode: '',
            profileDataFilled: true,
            showTimeError: false,
            couponApplied: false,
            is_cashback: false,
            // order_id: !!parsed.order_id,
            use_wallet: true,
            profileError: false,
            cart_item: parsed.cart_item,
            whatsapp_optin: true,
        }
    }

    toggleWalletUse(e) {
        this.setState({ use_wallet: e.target.checked })
    }

    toggle(which) {
        this.setState({ [which]: !this.state[which] })
    }

    componentDidMount() {

        /*if (!STORAGE.checkAuth()) {
            return
        }*/

        if (window) {
            window.scrollTo(0, 0)
        }

        if (this.props.location.search.includes("error_code")) {
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Could not complete payment, Try again!" })
            }, 500)
            this.props.history.replace(this.props.location.pathname)
        }

        let hospital = {}
        let doctorDetails = this.props.DOCTORS[this.state.selectedDoctor]

        if (doctorDetails) {
            let { hospitals } = doctorDetails

            if (hospitals && hospitals.length) {
                hospitals.map((hsptl) => {
                    if (hsptl.hospital_id == this.state.selectedClinic) {
                        hospital = hsptl
                    }
                })
            }
            if (Object.values(hospital).length) {
                this.setState({ couponApplied: true })
            }
        } else if (this.props.selectedSlot && this.props.selectedSlot.time && Object.values(this.props.selectedSlot.time).length > 0) {
            this.setState({ couponApplied: true })
        } else {
            this.setState({ couponApplied: false })
            return
        }

        if (this.props.doctorCoupons && this.props.doctorCoupons[this.state.selectedDoctor] && this.props.doctorCoupons[this.state.selectedDoctor].length) {
            let doctorCoupons = this.props.doctorCoupons[this.state.selectedDoctor]
            if (this.props.selectedSlot.selectedClinic == this.state.selectedClinic && this.props.selectedSlot.selectedDoctor == this.state.selectedDoctor) {

                let treatment_Price = 0
                let selectedProcedures = {}
                if (this.props.selectedDoctorProcedure[this.state.selectedDoctor] && this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic] && this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].price) {

                    treatment_Price = this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].price.deal_price || 0
                }
                let deal_price = this.props.selectedSlot.time.deal_price + treatment_Price

                this.setState({ couponCode: doctorCoupons[0].code, couponId: doctorCoupons[0].coupon_id || '', is_cashback: doctorCoupons[0].is_cashback })
                this.props.applyOpdCoupons('1', doctorCoupons[0].code, doctorCoupons[0].coupon_id, this.state.selectedDoctor, deal_price, this.state.selectedClinic, this.props.selectedProfile, this.getProcedureIds(this.props), this.state.cart_item)
            } else if (hospital) {
                let deal_price = hospital.deal_price
                let treatment_Price = 0
                if (this.props.selectedDoctorProcedure[this.state.selectedDoctor] && this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic] && this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].price) {

                    treatment_Price = this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].price.deal_price || 0
                }
                deal_price += treatment_Price
                this.setState({ is_cashback: doctorCoupons[0].is_cashback, couponCode: doctorCoupons[0].code, couponId: doctorCoupons[0].coupon_id || '' })
                this.props.applyOpdCoupons('1', doctorCoupons[0].code, doctorCoupons[0].coupon_id, this.state.selectedDoctor, deal_price, this.state.selectedClinic, this.props.selectedProfile, this.getProcedureIds(this.props), this.state.cart_item)

            }
        } else {
            let deal_price = 0
            if (this.props.selectedSlot.time && this.props.selectedSlot.time.deal_price) {
                deal_price = this.props.selectedSlot.time.deal_price
            } else if (hospital) {
                deal_price = hospital.deal_price
            }

            let treatment_Price = 0
            if (this.props.selectedDoctorProcedure[this.state.selectedDoctor] && this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic] && this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].price) {

                treatment_Price = this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].price.deal_price || 0
            }

            deal_price += treatment_Price
            //auto apply coupon if no coupon is apllied
            if (this.state.selectedDoctor && deal_price && this.props.couponAutoApply) {
                this.props.getCoupons({
                    productId: 1, deal_price: deal_price, doctor_id: this.state.selectedDoctor, hospital_id: this.state.selectedClinic, profile_id: this.props.selectedProfile, procedures_ids: this.getProcedureIds(this.props), cart_item: this.state.cart_item,
                    cb: (coupons) => {
                        if (coupons && coupons[0]) {
                            this.setState({ is_cashback: coupons[0].is_cashback, couponCode: coupons[0].code, couponId: coupons[0].coupon_id || '' })
                            this.props.applyCoupons('1', coupons[0], coupons[0].coupon_id, this.state.selectedDoctor)
                            this.props.applyOpdCoupons('1', coupons[0].code, coupons[0].coupon_id, this.state.selectedDoctor, deal_price, this.state.selectedClinic, this.props.selectedProfile, this.getProcedureIds(this.props), this.state.cart_item)
                        } else {
                            this.props.resetOpdCoupons()
                        }
                    }
                })
            } else {
                this.props.resetOpdCoupons()
            }
        }


    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.couponApplied && nextProps.DOCTORS[this.state.selectedDoctor]) {
            let hospital = {}
            let doctorDetails = nextProps.DOCTORS[this.state.selectedDoctor]

            if (doctorDetails) {
                let { hospitals } = doctorDetails

                if (hospitals && hospitals.length) {
                    hospitals.map((hsptl) => {
                        if (hsptl.hospital_id == this.state.selectedClinic) {
                            hospital = hsptl
                        }
                    })
                }
            }

            if (nextProps.doctorCoupons && nextProps.doctorCoupons[this.state.selectedDoctor] && nextProps.doctorCoupons[this.state.selectedDoctor].length) {
                let doctorCoupons = nextProps.doctorCoupons[this.state.selectedDoctor]

                if (Object.values(hospital).length) {
                    let deal_price = hospital.deal_price

                    let treatment_Price = 0
                    if (nextProps.selectedDoctorProcedure[this.state.selectedDoctor] && nextProps.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic] && nextProps.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].price) {

                        treatment_Price = nextProps.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].price.deal_price || 0
                    }

                    deal_price += treatment_Price

                    this.setState({ is_cashback: doctorCoupons[0].is_cashback, couponCode: doctorCoupons[0].code, couponId: doctorCoupons[0].coupon_id || '', couponApplied: true })
                    this.props.applyOpdCoupons('1', doctorCoupons[0].code, doctorCoupons[0].coupon_id, this.state.selectedDoctor, deal_price, this.state.selectedClinic, nextProps.selectedProfile, this.getProcedureIds(nextProps), this.state.cart_item)
                }
            } else {
                let deal_price = 0

                if (Object.values(hospital).length) {
                    deal_price = hospital.deal_price
                }

                let treatment_Price = 0
                if (nextProps.selectedDoctorProcedure[this.state.selectedDoctor] && nextProps.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic] && nextProps.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].price) {

                    treatment_Price = nextProps.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].price.deal_price || 0
                }

                deal_price += treatment_Price
                //auto apply coupon if no coupon is apllied
                if (this.state.selectedDoctor && deal_price && nextProps.couponAutoApply) {
                    this.props.getCoupons({
                        productId: 1, deal_price: deal_price, doctor_id: this.state.selectedDoctor, hospital_id: this.state.selectedClinic, profile_id: nextProps.selectedProfile, procedures_ids: this.getProcedureIds(nextProps), cart_item: this.state.cart_item,
                        cb: (coupons) => {
                            if (coupons && coupons[0]) {
                                this.setState({ is_cashback: coupons[0].is_cashback, couponCode: coupons[0].code, couponId: coupons[0].coupon_id || '', couponApplied: true })
                                this.props.applyCoupons('1', coupons[0], coupons[0].coupon_id, this.state.selectedDoctor)
                                this.props.applyOpdCoupons('1', coupons[0].code, coupons[0].coupon_id, this.state.selectedDoctor, deal_price, this.state.selectedClinic, nextProps.selectedProfile, this.getProcedureIds(nextProps), this.state.cart_item)
                            } else {
                                this.setState({ couponApplied: true })
                                this.props.resetOpdCoupons()
                            }
                        }
                    })
                } else {
                    this.setState({ couponApplied: true })
                    this.props.resetOpdCoupons()
                }
            }

        }
    }

    profileDataCompleted(data) {
        if (data.name == '' || data.gender == '' || data.phoneNumber == '' || data.email == '' || !data.otpVerifySuccess) {
            this.setState({ profileDataFilled: false, showTimeError: false })
        } else if (data.otpVerifySuccess) {
            this.setState({ profileDataFilled: true, showTimeError: false, profileError: false })
        }
    }

    getProcedureIds(props) {
        if (props.selectedDoctorProcedure[this.state.selectedDoctor] && props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic] && props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].categories) {
            let procedure_ids = []

            Object.values(props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].categories).map((procedure) => {
                procedure_ids = procedure_ids.concat(procedure.filter(x => x.is_selected).map(x => x.procedure_id))
            })

            if (procedure_ids.length) {
                return procedure_ids
            }
        }
        return null
    }

    proceed(datePicked, patient, addToCart, e) {

        if (!datePicked) {
            this.setState({ showTimeError: true });
            SnackBar.show({ pos: 'bottom-center', text: "Please pick a time slot." });
            window.scrollTo(0, 0)
            return
        }

        if (!patient) {
            this.setState({ profileError: true });
            SnackBar.show({ pos: 'bottom-center', text: "Please Add Patient" });
            window.scrollTo(0, 0)
            return

        }

        if (!this.state.profileDataFilled) {
            SnackBar.show({ pos: 'bottom-center', text: "Please fill the info" });
            window.scrollTo(0, 0)
            return
        }
        if (e.target.dataset.disabled == true) {
            return
        }

        //Check if Covered Under Insurance 

        let is_insurance_applicable = false
        let is_selected_user_insured = false

        if (this.props.selectedSlot && this.props.selectedSlot.date && this.props.DOCTORS[this.state.selectedDoctor]) {
            let priceData = { ...this.props.selectedSlot.time }
            let hospitals = this.props.DOCTORS[this.state.selectedDoctor].hospitals
            let hospital = null

            if (hospitals && hospitals.length) {
                hospitals.map((hsptl) => {
                    if (hsptl.hospital_id == this.state.selectedClinic) {
                        hospital = hsptl
                    }
                })
            }

            if(hospital && hospital.insurance){
                is_insurance_applicable = (parseInt(priceData.deal_price)<=hospital.insurance.insurance_threshold_amount) && hospital.insurance.is_insurance_covered     
            }
        }

        if (this.props.profiles && this.props.profiles[this.props.selectedProfile] && !this.props.profiles[this.props.selectedProfile].isDummyUser) {

            is_selected_user_insured = this.props.profiles[this.props.selectedProfile].is_insured
        }

        is_insurance_applicable = is_insurance_applicable && is_selected_user_insured



        this.setState({ loading: true, error: "" })

        let start_date = this.props.selectedSlot.date
        let start_time = this.props.selectedSlot.time.value

        let postData = {
            doctor: this.state.selectedDoctor,
            hospital: this.state.selectedClinic,
            profile: this.props.selectedProfile,
            start_date, start_time,
            payment_type: this.props.payment_type,
            use_wallet: this.state.use_wallet,
            cart_item: this.state.cart_item,
        }
        let profileData = {...patient}
        if(profileData && profileData.whatsapp_optin == null){
            profileData['whatsapp_optin']= this.state.whatsapp_optin
            this.props.editUserProfile(profileData, profileData.id)
        }
        if (this.props.disCountedOpdPrice && this.props.payment_type == 1 && !is_selected_user_insured) {
            postData['coupon_code'] = [this.state.couponCode] || []
        }

        let procedure_ids = []
        if (false && this.props.selectedDoctorProcedure[this.state.selectedDoctor] && this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic] && this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].categories) {

            Object.values(this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].categories).map((procedure) => {

                procedure_ids = procedure_ids.concat(procedure.filter(x => x.is_selected).map(x => x.procedure_id))
            })
            if (procedure_ids.length) {
                postData['procedure_ids'] = procedure_ids || []
            }
        }

        if (addToCart) {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'OpdAddToCartClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'opd-add-to-cart-clicked'
            }

            GTM.sendEvent({ data: data })
            this.props.addToCart(1, postData).then((res) => {
                this.props.history.push('/cart')
            }).catch((err) => {
                let message = "Error adding to cart!"
                if (err.message) {
                    message = err.message
                }
                this.setState({ loading: false, error: message })
                SnackBar.show({ pos: 'bottom-center', text: message });
            })
            return
        }

        let analyticData = {
            'Category': 'ConsumerApp', 'Action': 'OpdProceedButtonClicked', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'opd-proceed-button-clicked'
        }
        GTM.sendEvent({ data: analyticData })

        analyticData = {
            'Category': 'ConsumerApp', 'Action': 'OpdConfirmBookingClicked', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'opd-confirm-booking-clicked'
        }
        GTM.sendEvent({ data: analyticData })

        this.props.createOPDAppointment(postData, (err, data) => {
            if (!err) {
                this.props.removeCoupons(this.state.selectedDoctor, this.state.couponId)
                if (data.is_agent) {
                    // this.props.history.replace(this.props.location.pathname + `?order_id=${data.data.orderId}`)
                    this.setState({ order_id: data.data.orderId })
                    return
                }
                if (data.payment_required) {
                    // send to payment selection page
                    let analyticData = {
                        'Category': 'ConsumerApp', 'Action': 'DoctorOrderCreated', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'doctor_order_created'
                    }
                    GTM.sendEvent({ data: analyticData })
                    this.props.history.push(`/payment/${data.data.orderId}?refs=opd`)

                } else {
                    // send back to appointment page
                    this.props.history.replace(`/order/summary/${data.data.orderId}?payment_success=true`)
                }
            } else {
                let message = "Could not create appointment. Try again later !"
                if (err.message) {
                    message = err.message
                }
                this.setState({ loading: false, error: message })
            }
        })
    }

    navigateTo(where, e) {
        switch (where) {
            case "time": {
                this.props.history.push(`/opd/doctor/${this.state.selectedDoctor}/${this.state.selectedClinic}/book?goback=true&type=opd`)
                return
            }

            case "patient": {
                this.props.history.push(`/user/family?pick=true`)
                return
            }
        }
    }

    sendAgentBookingURL() {
        this.props.sendAgentBookingURL(this.state.order_id, 'sms', (err, res) => {
            if (err) {
                SnackBar.show({ pos: 'bottom-center', text: "SMS SEND ERROR" })
            } else {
                SnackBar.show({ pos: 'bottom-center', text: "SMS SENT SUCCESSFULY" })
            }
        })
    }

    applyCoupons() {
        let procedure_ids = ""
        let proc_ids = this.getProcedureIds(this.props)
        if (proc_ids && proc_ids.length) {
            procedure_ids = proc_ids.join(',')
        }

        let analyticData = {
            'Category': 'ConsumerApp', 'Action': 'OpdCouponsClicked', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'opd-coupons-clicked'
        }

        GTM.sendEvent({ data: analyticData })
        this.props.history.push(`/coupon/opd/${this.state.selectedDoctor}/${this.state.selectedClinic}?procedures_ids=${procedure_ids}&deal_price=${this.getDealPrice()}&cart_item=${this.state.cart_item || ""}`)
    }

    getDealPrice() {
        let hospital = {}
        let doctorDetails = this.props.DOCTORS[this.state.selectedDoctor]

        if (doctorDetails) {
            let { hospitals } = doctorDetails

            if (hospitals && hospitals.length) {
                hospitals.map((hsptl) => {
                    if (hsptl.hospital_id == this.state.selectedClinic) {
                        hospital = hsptl
                    }
                })
            }
        }

        let deal_price = 0

        if (Object.values(hospital).length) {
            deal_price = hospital.deal_price
        }

        let treatment_Price = 0
        if (this.props.selectedDoctorProcedure[this.state.selectedDoctor] && this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic] && this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].price) {

            treatment_Price = this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].price.deal_price || 0
        }

        deal_price += treatment_Price
        return deal_price
    }

    closeErrorPopup = () => {
        this.setState({ error: '' })
    }

    getBookingButtonText(total_wallet_balance, price_to_pay, mrp) {
        if (this.props.payment_type != 1) {
            return `Confirm Booking (₹ ${mrp})`
        }
        let price_from_wallet = 0
        let price_from_pg = 0

        if (this.state.use_wallet && total_wallet_balance) {
            price_from_wallet = Math.min(total_wallet_balance, price_to_pay)
        }

        price_from_pg = price_to_pay - price_from_wallet

        if (price_from_pg) {
            return `Continue to pay (₹ ${price_from_pg})`
        }

        return `Confirm Booking`
    }

    selectTimeSlot(slot) {
        const parsed = queryString.parse(this.props.location.search)
        slot.selectedDoctor = this.state.selectedDoctor
        slot.selectedClinic = this.state.selectedClinic
        this.props.selectOpdTimeSLot(slot, false)
    }

    toggleWhatsap(status,e) {
        this.setState({ whatsapp_optin: status })
    }

    render() {
        let doctorDetails = this.props.DOCTORS[this.state.selectedDoctor]
        let doctorCoupons = this.props.doctorCoupons[this.state.selectedDoctor] || []
        let hospital = {}
        let patient = null
        let priceData = {}
        let enabled_for_cod_payment = true
        let is_insurance_applicable = false
        let is_selected_user_insured = false

        if (doctorDetails) {
            let { name, qualifications, hospitals, enabled_for_cod } = doctorDetails
            enabled_for_cod_payment = enabled_for_cod

            if (hospitals && hospitals.length) {
                hospitals.map((hsptl) => {
                    if (hsptl.hospital_id == this.state.selectedClinic) {
                        hospital = hsptl
                    }
                })
            }
        }

        if (this.props.profiles[this.props.selectedProfile] && !this.props.profiles[this.props.selectedProfile].isDummyUser) {
            patient = this.props.profiles[this.props.selectedProfile]
            is_selected_user_insured = this.props.profiles[this.props.selectedProfile].is_insured
        }

        if (this.props.selectedSlot && this.props.selectedSlot.date) {
            priceData = { ...this.props.selectedSlot.time }
            priceData.payable_amount = priceData.deal_price

            if(hospital && hospital.insurance){
                is_insurance_applicable = (parseInt(priceData.deal_price)<=hospital.insurance.insurance_threshold_amount) && hospital.insurance.is_insurance_covered     
            }
             

            // reset time slot if doctor/hospital changes
            if (this.props.selectedSlot.selectedClinic != this.state.selectedClinic || this.props.selectedSlot.selectedDoctor != this.state.selectedDoctor) {
                let slot = { time: {} }
                this.props.selectOpdTimeSLot(slot, false)
            }
        } else if (hospital) {
            priceData.mrp = hospital.mrp
            priceData.deal_price = hospital.deal_price
            priceData.payable_amount = hospital.deal_price

            if(hospital.insurance){
                is_insurance_applicable = (parseInt(hospital.deal_price)<=hospital.insurance.insurance_threshold_amount) && hospital.insurance.is_insurance_covered
            }
        }
        let treatment_Price = 0, treatment_mrp = 0
        let selectedProcedures = {}
        if (false && this.props.selectedDoctorProcedure[this.state.selectedDoctor] && this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic] && this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].price) {

            treatment_Price = this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].price.deal_price || 0
            treatment_mrp = this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].price.mrp || 0
            selectedProcedures = this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].categories
        }

        let total_price = parseInt(priceData.deal_price) + treatment_Price
        let finalPrice = total_price ? parseInt(total_price) : 0

        if (!this.state.is_cashback) {
            finalPrice = total_price ? parseInt(total_price) - (this.props.disCountedOpdPrice ? this.props.disCountedOpdPrice : 0) : 0
        }

        let total_wallet_balance = 0
        if (this.props.userWalletBalance >= 0 && this.props.userCashbackBalance >= 0) {
            total_wallet_balance = this.props.userWalletBalance + this.props.userCashbackBalance
        }

        let percent_discount = Math.max(0, (finalPrice / (parseInt(priceData.mrp) + treatment_mrp)) * 100)
        percent_discount = parseInt(100 - percent_discount)

        if (!enabled_for_cod_payment && this.props.payment_type == 2) {
            this.props.select_opd_payment_type(1)
        }

        if(is_insurance_applicable && is_selected_user_insured){
            finalPrice = 0
            priceData.deal_price = 0
            priceData.mrp = 0
        }
        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            {
                                this.props.DOCTORS[this.state.selectedDoctor] && this.props.DATA_FETCH ?
                                    <div>
                                        <section className="dr-profile-screen booking-confirm-screen mrb-60">
                                            <div className="container-fluid">
                                                <div className="row mrb-20">
                                                    <div className="col-12">

                                                        <SelectedClinic
                                                            boxShadowHide={true}
                                                            selectedDoctor={this.props.DOCTORS[this.state.selectedDoctor]}
                                                            selectedClinic={this.state.selectedClinic}
                                                            history={this.props.history}
                                                        />
                                                        <VisitTimeNew type="home" navigateTo={this.navigateTo.bind(this)} selectedSlot={this.props.selectedSlot} timeError={this.state.showTimeError}

                                                            timeSlots={this.props.timeSlots}
                                                            selectTimeSlot={this.selectTimeSlot.bind(this)}
                                                            doctor_leaves={this.props.doctor_leaves || []}
                                                        />
                                                        <ChoosePatientNewView patient={patient} navigateTo={this.navigateTo.bind(this)} {...this.props} profileDataCompleted={this.profileDataCompleted.bind(this)} profileError={this.state.profileError} />
                                                        {
                                                            Object.values(selectedProcedures).length ?
                                                                <ProcedureView selectedProcedures={selectedProcedures} priceData={priceData} />
                                                                : ''/*<div className="clearfix pb-list proc-padding-list">
                                                                        <span className="test-price txt-ornage">₹ {priceData.deal_price}<span className="test-mrp">₹ {priceData.mrp}</span></span><span className="fw-500 test-name-item">Doctor consultation</span></div>*/
                                                        }

                                                        {
                                                            this.props.payment_type == 1 && ((parseInt(priceData.deal_price) + treatment_Price) != 0) ?
                                                                <div className="widget mrb-15 cursor-pointer" onClick={this.applyCoupons.bind(this)}>
                                                                    {
                                                                        doctorCoupons.length ?
                                                                            <div className="widget-content d-flex jc-spaceb" >
                                                                                <div className="d-flex">
                                                                                    <span className="coupon-img">
                                                                                        <img src={ASSETS_BASE_URL + "/img/customer-icons/coupon-applied.svg"} className="visit-time-icon" />
                                                                                    </span>
                                                                                    <h4 className="title coupon-text" style={{ color: 'green' }}>
                                                                                        {this.state.is_cashback ? "Coupon" : "Coupon"} Applied
                                                                                        </h4>
                                                                                </div>
                                                                                <div className=" d-flex">
                                                                                    <h4 className="title coupon-text" style={{ color: 'green', marginRight: 13 }}>
                                                                                        {doctorCoupons[0].code}
                                                                                    </h4>
                                                                                    <span className="visit-time-icon coupon-icon">
                                                                                        <img onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            let analyticData = {
                                                                                                'Category': 'ConsumerApp', 'Action': 'OpdCouponsRemoved', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'opd-coupons-removed',
                                                                                                'couponId': doctorCoupons[0].coupon_id
                                                                                            }
                                                                                            GTM.sendEvent({ data: analyticData })
                                                                                            this.props.removeCoupons(this.state.selectedDoctor, doctorCoupons[0].coupon_id)
                                                                                        }} src={ASSETS_BASE_URL + "/img/customer-icons/cross.svg"} />
                                                                                    </span>
                                                                                </div>
                                                                            </div> :
                                                                            <div className="widget-content d-flex jc-spaceb" >
                                                                                <div className="d-flex">
                                                                                    <span className="coupon-img">
                                                                                        <img style={{ width: '24px' }} src={ASSETS_BASE_URL + "/img/ofr-cpn.svg"} className="visit-time-icon" />
                                                                                    </span>
                                                                                    <h4 className="title coupon-text">
                                                                                        HAVE A COUPON?
                                                                                        </h4>
                                                                                </div>
                                                                                <div className="visit-time-icon coupon-icon-arrow">
                                                                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/right-arrow.svg"} />
                                                                                </div>
                                                                            </div>
                                                                    }
                                                                </div> : ''
                                                        }



                                                        {/*Payment Mode*/}
                                                        {
                                                            enabled_for_cod_payment ? <div className="widget mrb-15">

                                                                <div className="widget-content">
                                                                    <h4 className="title mb-20">Payment Mode</h4>

                                                                    <div className="payment-summary-content" onClick={() => {
                                                                        this.props.select_opd_payment_type(1)
                                                                    }}>
                                                                        <div className="payment-detail d-flex">
                                                                            <label class="container-radio payment-type-radio">
                                                                                <h3>Online Payment</h3>
                                                                                <span className="save-upto">Save {percent_discount}%</span>
                                                                                <input checked={this.props.payment_type == 1} type="radio" name="payment-mode" />
                                                                                <span class="doc-checkmark"></span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <hr />


                                                                    <div className="test-report payment-detail mt-20" onClick={() => {
                                                                        this.props.select_opd_payment_type(2)
                                                                    }}>
                                                                        <label class="container-radio payment-type-radio">
                                                                            <h4 className="title payment-amt-label">Pay at Clinic</h4>
                                                                            <span className="light-txts"> (No Coupon code and discount will be applied)</span>
                                                                            <input checked={this.props.payment_type == 2} type="radio" name="payment-mode" />
                                                                            <span class="doc-checkmark"></span>
                                                                        </label>
                                                                    </div>


                                                                </div>

                                                            </div> : ""
                                                        }


                                                        {/*Payment Mode*/}

                                                        {
                                                            !(is_insurance_applicable && is_selected_user_insured) && this.props.payment_type == 1 ? <div className="widget mrb-15">

                                                                <div className="widget-content">
                                                                    <h4 className="title mb-20">Payment Summary</h4>
                                                                    <div className="payment-summary-content">
                                                                        <div className="payment-detail d-flex">
                                                                            <p>Subtotal</p>
                                                                            <p>&#8377; {parseInt(priceData.mrp) + treatment_mrp}</p>
                                                                        </div>
                                                                        <div className="payment-detail d-flex">
                                                                            <p>Docprime Discount</p>
                                                                            <p>- &#8377; {(parseInt(priceData.mrp) + treatment_mrp) - (parseInt(priceData.deal_price) + treatment_Price)}</p>
                                                                        </div>
                                                                        {
                                                                            this.props.disCountedOpdPrice && !this.state.is_cashback
                                                                                ? <div className="payment-detail d-flex">
                                                                                    <p style={{ color: 'green' }}>Coupon Discount</p>
                                                                                    <p style={{ color: 'green' }}>-&#8377; {this.props.disCountedOpdPrice}</p>
                                                                                </div>
                                                                                : ''
                                                                        }
                                                                    </div>
                                                                    <hr />

                                                                    {
                                                                        priceData ? <div className="test-report payment-detail mt-20">
                                                                            <h4 className="title payment-amt-label">Amount Payable</h4>
                                                                            <h5 className="payment-amt-value">&#8377; {finalPrice || 0}</h5>
                                                                        </div> : ""
                                                                    }
                                                                    {
                                                                        this.state.is_cashback && this.props.disCountedOpdPrice ? <div className="csh-back-applied-container">
                                                                            <p className="csh-mny-applied">+ &#8377; {this.props.disCountedOpdPrice} Cashback Applied</p>
                                                                            <p className="csh-mny-applied-content">Cashback will be added to your docprime wallet balance on appointment completion</p>
                                                                        </div> : ""
                                                                    }

                                                                </div>

                                                            </div> : <div className="widget mrb-15">

                                                                    <div className="widget-content">
                                                                        <h4 className="title mb-20">Payment Summary</h4>
                                                                        <div className="payment-summary-content">
                                                                            <div className="payment-detail d-flex">
                                                                                <p>Subtotal</p>
                                                                                <p>&#8377; {parseInt(priceData.mrp) + treatment_mrp}</p>
                                                                            </div>
                                                                        </div>
                                                                        <hr />
                                                                        {
                                                                            is_insurance_applicable && is_selected_user_insured?
                                                                            <div>Covered Under Insurance</div>
                                                                            :priceData ? <div className="test-report payment-detail mt-20">
                                                                                <h4 className="title payment-amt-label">Amount Payable</h4>
                                                                                <h5 className="payment-amt-value">&#8377; {parseInt(priceData.mrp) + treatment_mrp}</h5>
                                                                            </div> : ""
                                                                        }
                                                                    </div>

                                                                </div>
                                                        }


                                                        {
                                                            this.props.payment_type == 1 && total_wallet_balance && total_wallet_balance > 0 ? <div className="widget mrb-15">
                                                                <div className="widget-content">
                                                                    <div className="select-pt-form">
                                                                        <div className="referral-select">
                                                                            <label className="ck-bx" style={{ fontWeight: '600', fontSize: '14px' }}>Use docprime wallet money<input type="checkbox" onChange={this.toggleWalletUse.bind(this)} checked={this.state.use_wallet} /><span className="checkmark"></span></label>
                                                                            <span className="rfrl-avl-balance">Available <img style={{ width: '9px', marginTop: '4px' }} src={ASSETS_BASE_URL + "/img/rupee-icon.svg"} />{total_wallet_balance}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div> : ""
                                                        }
                                                        <WhatsAppOptinView {...this.props} profiles= {patient} toggleWhatsap={this.toggleWhatsap.bind(this)}/>

                                                        <div className="lab-visit-time test-report" style={{ marginTop: 10, cursor: 'pointer', marginBottom: 0 }} onClick={this.toggle.bind(this, 'openCancellation')}>
                                                            <h4 className="title payment-amt-label fs-italic">Free Cancellation<span style={{ marginLeft: 5 }}><img src={ASSETS_BASE_URL + "/img/icons/info.svg"} /></span></h4>
                                                        </div>

                                                        <a href="/terms" target="_blank">
                                                            <div className="lab-visit-time test-report" style={{ marginTop: 10 }}>
                                                                <h4 className="title payment-amt-label fs-italic">Terms of Use<span><img className="info-icon-img" src={ASSETS_BASE_URL + "/img/icons/info.svg"} /></span></h4>
                                                                {/* <span className="errorMessage">{this.state.error}</span> */}
                                                            </div>
                                                        </a>

                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                    </div> : <Loader />
                            }
                            {
                                this.state.openCancellation ? <CancelationPolicy props={this.props} toggle={this.toggle.bind(this, 'openCancellation')} /> : ""
                            }

                            {/* {
                                this.state.order_id ? <button onClick={this.sendAgentBookingURL.bind(this)} className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn">Send SMS EMAIL</button> : <button className="p-2 v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn" data-disabled={
                                    !(patient && this.props.selectedSlot && this.props.selectedSlot.date) || this.state.loading
                                } onClick={this.proceed.bind(this, (this.props.selectedSlot && this.props.selectedSlot.date), patient)}>{this.getBookingButtonText(total_wallet_balance, finalPrice)}</button>
                            } */}

                            <div className="fixed sticky-btn p-0 v-btn  btn-lg horizontal bottom no-round text-lg buttons-addcart-container">

                                <button className={"add-shpng-cart-btn" + (!this.state.cart_item ? "" : " update-btn")} data-disabled={
                                    !(patient && this.props.selectedSlot && this.props.selectedSlot.date) || this.state.loading
                                } onClick={this.proceed.bind(this, (this.props.selectedSlot && this.props.selectedSlot.date), patient, true)}>
                                    {
                                        this.state.cart_item ? "" : <img src={ASSETS_BASE_URL + "/img/cartico.svg"} />
                                    }
                                    {this.state.cart_item ? "Update" : "Add to Cart"}
                                </button>

                                {
                                    STORAGE.isAgent() || this.state.cart_item ? "" : <button className="v-btn-primary book-btn-mrgn-adjust" data-disabled={
                                        !(patient && this.props.selectedSlot && this.props.selectedSlot.date) || this.state.loading
                                    } onClick={this.proceed.bind(this, (this.props.selectedSlot && this.props.selectedSlot.date), patient, false)}>{this.getBookingButtonText(total_wallet_balance, finalPrice, (parseInt(priceData.mrp) + treatment_mrp))}</button>
                                }
                            </div>
                        </div>

                        {
                            this.state.error ?
                                <BookingError message={this.state.error} closeErrorPopup={this.closeErrorPopup} /> : ''
                        }

                        <RightBar extraClass="chat-float-btn-2" type="opd" noChatButton={true} />
                    </div>
                </section>
            </div>
        );
    }
}


export default PatientDetailsNew
