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
import BookingConfirmationPopup from '../../diagnosis/bookingSummary/BookingConfirmationPopup.js'
import IpdLeadForm from '../../../containers/ipd/ipdLeadForm.js'


class PatientDetailsNew extends React.Component {
    constructor(props) {
        super(props)
        const parsed = queryString.parse(this.props.location.search)

        let doctor_id = this.props.selectedDoctor
        let hospital_id = this.props.selectedClinic

        this.state = {
            selectedDoctor: doctor_id,
            selectedClinic: hospital_id,
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
            formData: '',
            showConfirmationPopup: false,
            coupon_loading: false,
            seoFriendly: this.props.match.url.includes('-dpp'),
            showIpdLeadForm: true
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
        let doctorDetails = this.props.DOCTORS[this.props.selectedDoctor]

        if (doctorDetails) {
            let { hospitals } = doctorDetails

            if (hospitals && hospitals.length) {
                hospitals.map((hsptl) => {
                    if (hsptl.hospital_id == this.props.selectedClinic) {
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

        if (this.props.doctorCoupons && this.props.doctorCoupons[this.props.selectedDoctor] && this.props.doctorCoupons[this.props.selectedDoctor].length) {
            let doctorCoupons = this.props.doctorCoupons[this.props.selectedDoctor]
            if (this.props.selectedSlot.selectedClinic == this.props.selectedClinic && this.props.selectedSlot.selectedDoctor == this.props.selectedDoctor) {

                let treatment_Price = 0
                let selectedProcedures = {}
                if (this.props.selectedDoctorProcedure[this.props.selectedDoctor] && this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic] && this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic].price) {

                    treatment_Price = this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic].price.deal_price || 0
                }
                let deal_price = this.props.selectedSlot.time.deal_price + treatment_Price

                this.props.applyOpdCoupons('1', doctorCoupons[0].code, doctorCoupons[0].coupon_id, this.props.selectedDoctor, deal_price, this.props.selectedClinic, this.props.selectedProfile, this.getProcedureIds(this.props), this.state.cart_item, (err, data) => {
                    if (!err) {
                        this.setState({ couponCode: doctorCoupons[0].code, couponId: doctorCoupons[0].coupon_id || '', is_cashback: doctorCoupons[0].is_cashback })
                    } else {
                        this.setState({ coupon_loading: true })
                        this.getAndApplyBestCoupons(deal_price)
                    }
                })
            } else if (hospital) {
                let deal_price = hospital.deal_price
                let treatment_Price = 0
                if (this.props.selectedDoctorProcedure[this.props.selectedDoctor] && this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic] && this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic].price) {

                    treatment_Price = this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic].price.deal_price || 0
                }
                deal_price += treatment_Price

                this.props.applyOpdCoupons('1', doctorCoupons[0].code, doctorCoupons[0].coupon_id, this.props.selectedDoctor, deal_price, this.props.selectedClinic, this.props.selectedProfile, this.getProcedureIds(this.props), this.state.cart_item, (err, data) => {
                    if (!err) {
                        this.setState({ is_cashback: doctorCoupons[0].is_cashback, couponCode: doctorCoupons[0].code, couponId: doctorCoupons[0].coupon_id || '' })
                    } else {
                        this.setState({ coupon_loading: true })
                        this.getAndApplyBestCoupons(deal_price)
                    }
                })

            }
        } else {
            let deal_price = 0
            if (this.props.selectedSlot.time && this.props.selectedSlot.time.deal_price) {
                deal_price = this.props.selectedSlot.time.deal_price
            } else if (hospital) {
                deal_price = hospital.deal_price
            }

            let treatment_Price = 0
            if (this.props.selectedDoctorProcedure[this.props.selectedDoctor] && this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic] && this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic].price) {

                treatment_Price = this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic].price.deal_price || 0
            }

            deal_price += treatment_Price
            //auto apply coupon if no coupon is apllied
            if (this.props.selectedDoctor && deal_price && this.props.couponAutoApply) {
                this.getAndApplyBestCoupons(deal_price)
            } else {
                this.props.resetOpdCoupons()
            }
        }


    }

    getValidCoupon(coupons) {
        let validCoupon = null
        for (var index in coupons) {
            if (coupons[index].valid) {
                validCoupon = coupons[index]
                break
            }
        }
        return validCoupon
    }

    getAndApplyBestCoupons(deal_price = 0) {
        this.props.getCoupons({
            productId: 1, deal_price: deal_price, doctor_id: this.props.selectedDoctor, hospital_id: this.props.selectedClinic, profile_id: this.props.selectedProfile, procedures_ids: this.getProcedureIds(this.props), cart_item: this.state.cart_item,
            cb: (coupons) => {
                if (coupons) {
                    let validCoupon = this.getValidCoupon(coupons)
                    if (validCoupon) {
                        this.setState({ is_cashback: validCoupon.is_cashback, couponCode: validCoupon.code, couponId: validCoupon.coupon_id || '' })
                        this.props.applyCoupons('1', validCoupon, validCoupon.coupon_id, this.props.selectedDoctor)
                        this.props.applyOpdCoupons('1', validCoupon.code, validCoupon.coupon_id, this.props.selectedDoctor, deal_price, this.props.selectedClinic, this.props.selectedProfile, this.getProcedureIds(this.props), this.state.cart_item)
                    } else {
                        this.props.resetOpdCoupons()
                    }
                } else {
                    this.props.resetOpdCoupons()
                }
                this.setState({ coupon_loading: false })
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.couponApplied && nextProps.DOCTORS[this.props.selectedDoctor]) {
            let hospital = {}
            let doctorDetails = nextProps.DOCTORS[this.props.selectedDoctor]

            if (doctorDetails) {
                let { hospitals } = doctorDetails

                if (hospitals && hospitals.length) {
                    hospitals.map((hsptl) => {
                        if (hsptl.hospital_id == this.props.selectedClinic) {
                            hospital = hsptl
                        }
                    })
                }
            }

            if (nextProps.doctorCoupons && nextProps.doctorCoupons[this.props.selectedDoctor] && nextProps.doctorCoupons[this.props.selectedDoctor].length) {
                let doctorCoupons = nextProps.doctorCoupons[this.props.selectedDoctor]

                if (Object.values(hospital).length) {
                    let deal_price = hospital.deal_price

                    let treatment_Price = 0
                    if (nextProps.selectedDoctorProcedure[this.props.selectedDoctor] && nextProps.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic] && nextProps.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic].price) {

                        treatment_Price = nextProps.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic].price.deal_price || 0
                    }

                    deal_price += treatment_Price
                    // let validCoupon = this.getValidCoupon(doctorCoupons)
                    this.props.applyOpdCoupons('1', doctorCoupons[0].code, doctorCoupons[0].coupon_id, this.props.selectedDoctor, deal_price, this.props.selectedClinic, nextProps.selectedProfile, this.getProcedureIds(nextProps), this.state.cart_item, (err, data) => {
                        if (!err) {
                            this.setState({ is_cashback: doctorCoupons[0].is_cashback, couponCode: doctorCoupons[0].code, couponId: doctorCoupons[0].coupon_id || '', couponApplied: true })
                        } else {
                            this.setState({ coupon_loading: true })
                            this.getAndApplyBestCoupons(deal_price)
                        }
                    })
                }
            } else {
                let deal_price = 0

                if (Object.values(hospital).length) {
                    deal_price = hospital.deal_price
                }

                let treatment_Price = 0
                if (nextProps.selectedDoctorProcedure[this.props.selectedDoctor] && nextProps.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic] && nextProps.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic].price) {

                    treatment_Price = nextProps.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic].price.deal_price || 0
                }

                deal_price += treatment_Price
                //auto apply coupon if no coupon is apllied
                if (this.props.selectedDoctor && deal_price && nextProps.couponAutoApply) {
                    this.props.getCoupons({
                        productId: 1, deal_price: deal_price, doctor_id: this.props.selectedDoctor, hospital_id: this.props.selectedClinic, profile_id: nextProps.selectedProfile, procedures_ids: this.getProcedureIds(nextProps), cart_item: this.state.cart_item,
                        cb: (coupons) => {
                            if (coupons) {
                                let validCoupon = this.getValidCoupon(coupons)
                                if (validCoupon) {
                                    this.setState({ is_cashback: validCoupon.is_cashback, couponCode: validCoupon.code, couponId: validCoupon.coupon_id || '', couponApplied: true })
                                    this.props.applyCoupons('1', validCoupon, validCoupon.coupon_id, this.props.selectedDoctor)
                                    this.props.applyOpdCoupons('1', validCoupon.code, validCoupon.coupon_id, this.props.selectedDoctor, deal_price, this.props.selectedClinic, nextProps.selectedProfile, this.getProcedureIds(nextProps), this.state.cart_item)
                                } else {
                                    this.setState({ couponApplied: true })
                                    this.props.resetOpdCoupons()
                                }
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
        this.setState({ formData: { ...data } })
        if (data.name == '' || data.gender == '' || data.phoneNumber == '' || data.email == '' || !data.otpVerifySuccess) {
            this.props.patientDetails(data)
            this.setState({ profileDataFilled: false, showTimeError: false })
        } else if (data.otpVerifySuccess) {
            let clear_data = {}
            this.props.patientDetails(clear_data)
            this.setState({ profileDataFilled: true, showTimeError: false, profileError: false })
        }
    }

    getProcedureIds(props) {
        if (props.selectedDoctorProcedure[this.props.selectedDoctor] && props.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic] && props.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic].categories) {
            let procedure_ids = []

            Object.values(props.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic].categories).map((procedure) => {
                procedure_ids = procedure_ids.concat(procedure.filter(x => x.is_selected).map(x => x.procedure_id))
            })

            if (procedure_ids.length) {
                return procedure_ids
            }
        }
        return null
    }

    proceed(datePicked, patient, addToCart, total_price, total_wallet_balance, e) {

        if (!datePicked) {
            this.setState({ showTimeError: true });
            SnackBar.show({ pos: 'bottom-center', text: "Please pick a time slot." });
            window.scrollTo(0, 0)
            return
        }

        if (!patient) {
            if (this.state.formData.name != '' && this.state.formData.gender != '' && this.state.formData.phoneNumber != '' && this.state.formData.email != '' && !this.state.formData.otpVerifySuccess) {
                this.setState({ profileError: true });
                SnackBar.show({ pos: 'bottom-center', text: "Please verify your mobile no. to continue" });
                window.scrollTo(0, 0)
                return
            } else {
                this.setState({ profileError: true });
                SnackBar.show({ pos: 'bottom-center', text: "Please Add Patient" });
                window.scrollTo(0, 0)
                return
            }
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

        if (this.props.selectedSlot && this.props.selectedSlot.date && this.props.DOCTORS[this.props.selectedDoctor]) {
            let priceData = { ...this.props.selectedSlot.time }
            let hospitals = this.props.DOCTORS[this.props.selectedDoctor].hospitals
            let hospital = null            

            if (hospitals && hospitals.length) {
                hospitals.map((hsptl) => {
                    if (hsptl.hospital_id == this.props.selectedClinic) {
                        hospital = hsptl
                    }
                })
            }

            if (hospital && hospital.insurance) {
                is_insurance_applicable = (parseInt(priceData.deal_price) <= hospital.insurance.insurance_threshold_amount) && hospital.insurance.is_insurance_covered
            }
        }

        if (this.props.profiles && this.props.profiles[this.props.selectedProfile] && !this.props.profiles[this.props.selectedProfile].isDummyUser) {

            is_selected_user_insured = this.props.profiles[this.props.selectedProfile].is_insured
        }

        is_insurance_applicable = is_insurance_applicable && is_selected_user_insured

        // React guarantees that setState inside interactive events (such as click) is flushed at browser event boundary

        if (!this.state.showConfirmationPopup && !addToCart && (total_price == 0 || (is_insurance_applicable && this.props.payment_type == 1) || (this.state.use_wallet && total_wallet_balance > 0))) {
            this.setState({ showConfirmationPopup: true })
            return
        }

        if (this.state.loading) {
            return
        }
        this.setState({ loading: true, error: "" })

        let start_date = this.props.selectedSlot.date
        let start_time = this.props.selectedSlot.time.value

        let postData = {
            doctor: this.props.selectedDoctor,
            hospital: this.props.selectedClinic,
            profile: this.props.selectedProfile,
            start_date, start_time,
            payment_type: this.props.payment_type,
            use_wallet: this.state.use_wallet,
            cart_item: this.state.cart_item,
        }
        let profileData = { ...patient }
        if (profileData && profileData.whatsapp_optin == null) {
            profileData['whatsapp_optin'] = this.state.whatsapp_optin
            this.props.editUserProfile(profileData, profileData.id)
        }
        if (this.props.disCountedOpdPrice && this.props.payment_type == 1 && !is_insurance_applicable) {
            postData['coupon_code'] = this.state.couponCode ? [this.state.couponCode] : []
        }

        let procedure_ids = []
        if (false && this.props.selectedDoctorProcedure[this.props.selectedDoctor] && this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic] && this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic].categories) {

            Object.values(this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic].categories).map((procedure) => {

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
                this.props.removeCoupons(this.props.selectedDoctor, this.state.couponId)
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
                if (this.state.seoFriendly) {
                    let url = `${window.location.pathname}?goback=true&type=opd&doctor_id=${this.props.selectedDoctor}&hospital_id=${this.props.selectedClinic}&action_page=timings`
                    this.props.history.push(url)
                } else {
                    this.props.history.push(`/opd/doctor/${this.props.selectedDoctor}/${this.props.selectedClinic}/book?goback=true&type=opd`)
                }
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
        this.props.history.push(`/coupon/opd/${this.props.selectedDoctor}/${this.props.selectedClinic}?procedures_ids=${procedure_ids}&deal_price=${this.getDealPrice()}&cart_item=${this.state.cart_item || ""}`)
    }

    getDealPrice() {
        let hospital = {}
        let doctorDetails = this.props.DOCTORS[this.props.selectedDoctor]

        if (doctorDetails) {
            let { hospitals } = doctorDetails

            if (hospitals && hospitals.length) {
                hospitals.map((hsptl) => {
                    if (hsptl.hospital_id == this.props.selectedClinic) {
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
        if (this.props.selectedDoctorProcedure[this.props.selectedDoctor] && this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic] && this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic].price) {

            treatment_Price = this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic].price.deal_price || 0
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

    getBookingAmount(total_wallet_balance, price_to_pay, mrp) {
        let price_from_wallet = 0
        let price_from_pg = 0

        if (this.state.use_wallet && total_wallet_balance) {
            price_from_wallet = Math.min(total_wallet_balance, price_to_pay)
        }

        price_from_pg = price_to_pay - price_from_wallet

        if (price_from_pg) {
            return `₹${price_from_pg}`
        }

        return `₹0`
    }

    selectTimeSlot(slot) {
        const parsed = queryString.parse(this.props.location.search)
        slot.selectedDoctor = this.props.selectedDoctor
        slot.selectedClinic = this.props.selectedClinic
        this.props.selectOpdTimeSLot(slot, false)
    }

    toggleWhatsap(status, e) {
        this.setState({ whatsapp_optin: status })
    }

    priceConfirmationPopup(choice) {
        if (!choice) {
            this.setState({ showConfirmationPopup: choice })
        } else {
            this.setState({ showConfirmationPopup: '' })
            if (document.getElementById('confirm_booking')) {
                document.getElementById('confirm_booking').click()
            }
        }
    }

    submitLeadFormGeneration(ipdFormParams) {
        if(close) {
            let gtmData = {
                'Category': 'ConsumerApp', 'Action': 'DoctorBookingIpdFormClosed', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-booking-ipd-form-closed'
            }
            GTM.sendEvent({ data: gtmData })
        }
        let ipd_data = {
            showChat: true,
            ipdFormParams: ipdFormParams
        }
        
        this.setState({ showIpdLeadForm: false }, ()=>{

            this.props.checkIpdChatAgentStatus((response) => {
                if(response && response.users && response.users.length) {

                    this.props.ipdChatView({showIpdChat:true, ipdForm: ipdFormParams, showMinimize:true})
                }
            })   
        })
    }

    goToInsurance(selectedDoctor,selectedClinic){
        let data={}
        data.thumbnail = selectedDoctor.thumbnail
        data.name = selectedDoctor.display_name
        data.url = selectedDoctor.url
        data.id = selectedDoctor.id
        data.selectedClinic= selectedClinic
        data.type = 'doctor'
        this.props.saveAvailNowInsurance(data)
        this.props.history.push('/insurance/insurance-plans?source=doctor-summary-view&show_button=true')
    }

    render() {
        const parsed = queryString.parse(this.props.location.search)
        let doctorDetails = this.props.DOCTORS[this.props.selectedDoctor]
        let doctorCoupons = this.props.doctorCoupons[this.props.selectedDoctor] || []
        let hospital = {}
        let patient = null
        let priceData = {}
        let is_insurance_applicable = false
        let is_selected_user_insured = false
        let enabled_for_cod_payment = false
        let enabled_for_prepaid_payment = false
        let is_default_user_insured = false
        let is_insurance_buy_able = false
        if (doctorDetails) {
            let { name, qualifications, hospitals, enabled_for_cod } = doctorDetails

            if (hospitals && hospitals.length) {
                hospitals.map((hsptl) => {
                    if (hsptl.hospital_id == this.props.selectedClinic) {
                        hospital = hsptl
                    }
                    enabled_for_cod_payment = hospital.enabled_for_cod
                    enabled_for_prepaid_payment = hospital.enabled_for_prepaid
                })
            }
        }

        if (this.props.defaultProfile && this.props.profiles[this.props.defaultProfile]) {
            is_default_user_insured = this.props.profiles[this.props.defaultProfile].is_insured
        }

        if (this.props.profiles[this.props.selectedProfile] && !this.props.profiles[this.props.selectedProfile].isDummyUser) {
            patient = this.props.profiles[this.props.selectedProfile]
            is_selected_user_insured = this.props.profiles[this.props.selectedProfile].is_insured
        }

        if (this.props.selectedSlot && this.props.selectedSlot.date) {
            priceData = { ...this.props.selectedSlot.time }
            priceData.payable_amount = priceData.deal_price

            if (hospital && hospital.insurance) {
                is_insurance_applicable = (parseInt(priceData.deal_price) <= hospital.insurance.insurance_threshold_amount) && hospital.insurance.is_insurance_covered
            }


            // reset time slot if doctor/hospital changes
            if (this.props.selectedSlot.selectedClinic != this.props.selectedClinic || this.props.selectedSlot.selectedDoctor != this.props.selectedDoctor) {
                let slot = { time: {} }
                this.props.selectOpdTimeSLot(slot, false)
            }
        } else if (hospital) {
            priceData.mrp = hospital.mrp
            priceData.deal_price = hospital.deal_price
            priceData.payable_amount = hospital.deal_price

            if (hospital.insurance) {
                is_insurance_applicable = (parseInt(hospital.deal_price) <= hospital.insurance.insurance_threshold_amount) && hospital.insurance.is_insurance_covered
            }
        }
        let treatment_Price = 0, treatment_mrp = 0
        let selectedProcedures = {}
        if (false && this.props.selectedDoctorProcedure[this.props.selectedDoctor] && this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic] && this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic].price) {

            treatment_Price = this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic].price.deal_price || 0
            treatment_mrp = this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic].price.mrp || 0
            selectedProcedures = this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.props.selectedClinic].categories
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
        } else if (enabled_for_cod_payment && !enabled_for_prepaid_payment) {
            this.props.select_opd_payment_type(2)
        }

        is_insurance_applicable = is_insurance_applicable && is_selected_user_insured
        if(is_insurance_applicable && !is_selected_user_insured){
            is_insurance_buy_able = true
        }
        let clinic_mrp = priceData.mrp
        if (is_insurance_applicable && this.props.payment_type != 2) {
            finalPrice = 0
            priceData.deal_price = 0
            priceData.mrp = 0
        }

        let is_add_to_card = STORAGE.isAgent() || !is_default_user_insured
        return (
            <div className="profile-body-wrap">
                <ProfileHeader bookingPage={true}/>
                {
                    this.state.showConfirmationPopup ?
                        <BookingConfirmationPopup priceConfirmationPopup={this.priceConfirmationPopup.bind(this)} />
                        : ''
                }
                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            {
                                this.props.DOCTORS[this.props.selectedDoctor] && this.props.DATA_FETCH ?
                                    <div>
                                        {
                                            parsed.showPopup && this.state.showIpdLeadForm && typeof window == 'object' && window.ON_LANDING_PAGE?
                                            <IpdLeadForm submitLeadFormGeneration={this.submitLeadFormGeneration.bind(this)} {...this.props} hospital_name={hospital && hospital.hospital_name?hospital.hospital_name:null} hospital_id={hospital && hospital.hospital_id?hospital.hospital_id:null} doctor_name={this.props.DOCTORS[this.props.selectedDoctor].display_name?this.props.DOCTORS[this.props.selectedDoctor].display_name:null} formSource='DoctorBookingPage'/>
                                            :''
                                        }
                                        <section className="dr-profile-screen booking-confirm-screen mrb-60">
                                            <div className="container-fluid">
                                                <div className="row mrb-20">
                                                    <div className="col-12">

                                                        <SelectedClinic
                                                            boxShadowHide={true}
                                                            selectedDoctor={this.props.DOCTORS[this.props.selectedDoctor]}
                                                            selectedClinic={this.props.selectedClinic}
                                                            history={this.props.history}
                                                        />
                                                        <VisitTimeNew type="home" navigateTo={this.navigateTo.bind(this)} selectedSlot={this.props.selectedSlot} timeError={this.state.showTimeError}

                                                            timeSlots={this.props.timeSlots}
                                                            selectTimeSlot={this.selectTimeSlot.bind(this)}
                                                            doctor_leaves={this.props.doctor_leaves || []}
                                                            upcoming_slots={this.props.upcoming_slots || null}
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
                                                                                            this.props.removeCoupons(this.props.selectedDoctor, doctorCoupons[0].coupon_id)
                                                                                        }} src={ASSETS_BASE_URL + "/img/customer-icons/cross.svg"} />
                                                                                    </span>
                                                                                </div>
                                                                            </div> :
                                                                            <div>
                                                                                {
                                                                                    this.state.coupon_loading ?
                                                                                        <div className="loading_Linebar_container">
                                                                                            <div className="loading_bar_line"></div>
                                                                                        </div> : ''
                                                                                }
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
                                                                            </div>
                                                                    }
                                                                </div> : ''
                                                        }

                                                        {
                                                            !enabled_for_cod_payment && is_insurance_buy_able ?
                                                            <div className="widget mrb-15">
                                                            <div className="widget-content ">
                                                                <div className="d-flex justify-content-between align-items-sm-center">
                                                                    <div className="opd-ins-title-sub">
                                                                        <h4 className="title coupon-text">Get OPD Insurance & book for <span>FREE</span></h4>
                                                                        <p>Book Unlimited Doctors and Lab Tests</p>
                                                                    </div>
                                                                    <div>
                                                                        <span className="opd-ins-avl" onClick={this.goToInsurance.bind(this,this.props.DOCTORS[this.props.selectedDoctor],this.props.selectedClinic)}>Avail Now <img src={ASSETS_BASE_URL +  '/img/right-sc.svg'}/></span>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                            :''
                                                        }


                                                        {/*Payment Mode*/}
                                                        {
                                                            enabled_for_cod_payment ? <div className="widget mrb-15">

                                                                <div className="widget-content">
                                                                    <h4 className="title mb-20">Payment Mode</h4>
                                                                    {
                                                                        enabled_for_prepaid_payment ?
                                                                            <div className="payment-summary-content" onClick={() => {
                                                                                this.props.select_opd_payment_type(1)
                                                                            }}>
                                                                                <div className="payment-detail d-flex">
                                                                                    <label className="container-radio payment-type-radio">
                                                                                        <h4 className="title payment-amt-label">Online Payment</h4>
                                                                                        <span className="payment-mode-amt">{is_insurance_applicable ? '₹0' : this.getBookingAmount(total_wallet_balance, finalPrice, (parseInt(priceData.mrp) + treatment_mrp))}</span>
                                                                                        {
                                                                                            is_insurance_applicable ? ""
                                                                                                : <span className="save-upto">Save {percent_discount}%</span>
                                                                                        }

                                                                                        <input checked={this.props.payment_type == 1} type="radio" name="payment-mode" />
                                                                                        <span className="doc-checkmark"></span>
                                                                                    </label>
                                                                                </div>
                                                                            </div> : ''
                                                                    }

                                                                    {
                                                                        !is_insurance_applicable ?
                                                                            <hr /> : ''
                                                                    }

                                                                    {
                                                                        !is_insurance_applicable ?
                                                                            <div className="test-report payment-detail mt-20" onClick={() => {
                                                                                this.props.select_opd_payment_type(2)
                                                                            }}>
                                                                                <label className="container-radio payment-type-radio">
                                                                                    <h4 className="title payment-amt-label">Pay at Clinic</h4>
                                                                                    <span className="payment-mode-amt">₹{clinic_mrp}</span>
                                                                                    <span className="light-txts d-block"> (No Coupon code and discount will be applied)</span>
                                                                                    <input checked={this.props.payment_type == 2} type="radio" name="payment-mode" />
                                                                                    <span className="doc-checkmark"></span>
                                                                                </label>
                                                                            </div> : ''
                                                                    }

                                                                    {
                                                                        is_insurance_buy_able ?
                                                                            <hr /> : ''
                                                                    }

                                                                    {
                                                                        is_insurance_buy_able ?
                                                                            <div className="test-report payment-detail mt-20">
                                                                                <div className="d-flex justify-content-between align-items-sm-center">
                                                                    <div className="opd-ins-title-sub">
                                                                        <h4 className="title coupon-text">Get OPD Insurance & book for <span>FREE</span></h4>
                                                                        <p>Book Unlimited Doctors and Lab Tests</p>
                                                                    </div>
                                                                    <div>
                                                                        <span className="opd-ins-avl" onClick={this.goToInsurance.bind(this,this.props.DOCTORS[this.props.selectedDoctor],this.props.selectedClinic)}>Avail Now <img src={ASSETS_BASE_URL +  '/img/right-sc.svg'}/></span>
                                                                    </div>
                                                                </div>
                                                                            </div> : ''
                                                                    }


                                                                </div>

                                                            </div> : ""
                                                        }


                                                        {/*Payment Mode*/}

                                                        {
                                                            !is_insurance_applicable && this.props.payment_type == 1 ? <div className="widget mrb-15">

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

                                                                    <div className="widget-content clearfix">
                                                                        <h4 className="title mb-20">Payment Summary</h4>
                                                                        <div className="payment-summary-content">
                                                                            <div className="payment-detail d-flex">
                                                                                <p>Subtotal</p>
                                                                                <p>&#8377; {parseInt(priceData.mrp) + treatment_mrp}</p>
                                                                            </div>
                                                                        </div>
                                                                        <hr />
                                                                        {
                                                                            is_insurance_applicable && this.props.payment_type != 2 ?
                                                                                <div className="ins-val-bx">Covered Under Insurance</div>
                                                                                : priceData ? <div className="test-report payment-detail mt-20">
                                                                                    <h4 className="title payment-amt-label">Amount Payable</h4>
                                                                                    <h5 className="payment-amt-value">&#8377; {parseInt(priceData.mrp) + treatment_mrp}</h5>
                                                                                </div> : ""
                                                                        }
                                                                    </div>

                                                                </div>
                                                        }


                                                        {
                                                            !is_insurance_applicable && this.props.payment_type == 1 && total_wallet_balance && total_wallet_balance > 0 && (parseInt(priceData.mrp) + treatment_mrp) > 0 ? <div className="widget mrb-15">
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
                                                        <WhatsAppOptinView {...this.props} profiles={patient} toggleWhatsap={this.toggleWhatsap.bind(this)} />

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

                            <div className={`fixed sticky-btn p-0 v-btn  btn-lg horizontal bottom no-round text-lg buttons-addcart-container ${!is_add_to_card && this.props.ipd_chat && this.props.ipd_chat.showIpdChat?'ipd-foot-btn-duo':''}`}>

                                {
                                    STORAGE.isAgent() || !is_default_user_insured?
                                    <button className={"add-shpng-cart-btn" + (!this.state.cart_item ? "" : " update-btn")} data-disabled={
                                        !(patient && this.props.selectedSlot && this.props.selectedSlot.date) || this.state.loading
                                    } onClick={this.proceed.bind(this, (this.props.selectedSlot && this.props.selectedSlot.date), patient, true, total_price, total_wallet_balance)}>
                                        {
                                            this.state.cart_item ? "" : <img src={ASSETS_BASE_URL + "/img/cartico.svg"} />
                                        }
                                        {this.state.cart_item ? "Update" : "Add to Cart"}
                                    </button>
                                    :''
                                }
                                

                                {
                                    STORAGE.isAgent() || this.state.cart_item ? "" : <button className="v-btn-primary book-btn-mrgn-adjust" id="confirm_booking" data-disabled={
                                        !(patient && this.props.selectedSlot && this.props.selectedSlot.date) || this.state.loading
                                    } onClick={this.proceed.bind(this, (this.props.selectedSlot && this.props.selectedSlot.date), patient, false, total_price, total_wallet_balance)}>{this.getBookingButtonText(total_wallet_balance, finalPrice, (parseInt(priceData.mrp) + treatment_mrp))}</button>
                                }
                            </div>
                        </div>

                        {
                            this.state.error ?
                                <BookingError message={this.state.error} closeErrorPopup={this.closeErrorPopup} /> : ''
                        }

                        <RightBar extraClass="chat-float-btn-2" type="opd" noChatButton={true} showDesktopIpd={true} />
                    </div>
                </section>
            </div>
        );
    }
}


export default PatientDetailsNew
