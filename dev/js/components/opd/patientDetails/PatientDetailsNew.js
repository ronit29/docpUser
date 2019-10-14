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
import PaymentForm from '../../commons/paymentForm'
import IpdSecondPopup from '../../../containers/ipd/IpdDoctorCityPopup.js'
import LensfitPopup from '../../diagnosis/bookingSummary/lensfitPopup.js'
import CodErrorPopup from './CodErrorPopup.js'
import Disclaimer from '../../commons/Home/staticDisclaimer.js'

const MONTHS = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
const WEEK_DAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']

class PatientDetailsNew extends React.Component {
    constructor(props) {
        super(props)
        const parsed = queryString.parse(this.props.location.search)

        let doctor_id = this.props.selectedDoctor
        let hospital_id = this.props.selectedClinic

        this.state = {
            selectedDoctor: doctor_id,
            selectedClinic: hospital_id,
            paymentData: null,
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
            showIpdLeadForm: true,
            is_payment_coupon_applied: false,
            dateTimeSelectedValue: this.props.selectedDateFormat?this.props.selectedDateFormat:'',
            showSecondPopup: false,
            firstLeadId:'',
            timeErrorText:'',
            pay_btn_loading: true,
            isMatrix:parsed.is_matrix,
            isEmailNotValid: false,
            isDobNotValid: false,
            show_lensfit_popup:false,
            lensfit_coupons:null,
            lensfit_decline:false,
            isLensfitSpecific:parsed.isLensfitSpecific|| false,
            show_banner:false,
            banner_decline:false
        }
    }

    toggleWalletUse(e) {
        if(this.state.is_payment_coupon_applied) {
            this.setState({ use_wallet: false })
        } else {
            this.setState({ use_wallet: e.target.checked })
        }
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
        const parsed = queryString.parse(this.props.location.search)
        if (parsed.token && parsed.appointment_id) {
            this.props.agentLogin(parsed.token, () => {
                this.props.select_opd_payment_type(1)
                this.props.getUserProfile()
                this.props.fetchTransactions()
                this.props.getCartItems()
            })
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

        if (this.props.doctorCoupons && this.props.doctorCoupons[this.props.selectedDoctor] && this.props.doctorCoupons[this.props.selectedDoctor].length) {
            let doctorCoupons = this.props.doctorCoupons[this.props.selectedDoctor]
            if (this.props.selectedSlot.selectedClinic == this.state.selectedClinic && this.props.selectedSlot.selectedDoctor == this.props.selectedDoctor) {

                let treatment_Price = 0
                let selectedProcedures = {}
                if (this.props.selectedDoctorProcedure[this.props.selectedDoctor] && this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic] && this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic].price) {

                    treatment_Price = this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic].price.deal_price || 0
                }
                let deal_price = this.props.selectedSlot.time.deal_price + treatment_Price
                this.setState({'pay_btn_loading': true})
                this.props.applyOpdCoupons('1', doctorCoupons[0].code, doctorCoupons[0].coupon_id, this.props.selectedDoctor, deal_price, this.state.selectedClinic, this.props.selectedProfile, this.getProcedureIds(this.props), this.state.cart_item, (err, data) => {
                    if (!err) {
                        this.setState({ couponCode: doctorCoupons[0].code, couponId: doctorCoupons[0].coupon_id || '', is_cashback: doctorCoupons[0].is_cashback })
                        if (doctorCoupons[0].is_payment_specific) {
                            this.setState({use_wallet: false, is_payment_coupon_applied: true})
                        }
                    } else {
                        this.setState({ coupon_loading: true })
                        this.getAndApplyBestCoupons(deal_price,false)
                    }
                    this.setState({'pay_btn_loading': false})
                })
            } else if (hospital) {
                let deal_price = hospital.deal_price
                let treatment_Price = 0
                if (this.props.selectedDoctorProcedure[this.props.selectedDoctor] && this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic] && this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic].price) {

                    treatment_Price = this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic].price.deal_price || 0
                }
                deal_price += treatment_Price
                this.setState({'pay_btn_loading': true})
                this.props.applyOpdCoupons('1', doctorCoupons[0].code, doctorCoupons[0].coupon_id, this.props.selectedDoctor, deal_price, this.state.selectedClinic, this.props.selectedProfile, this.getProcedureIds(this.props), this.state.cart_item, (err, data) => {
                    if (!err) {
                        this.setState({ is_cashback: doctorCoupons[0].is_cashback, couponCode: doctorCoupons[0].code, couponId: doctorCoupons[0].coupon_id || '' })
                        if (doctorCoupons[0].is_payment_specific) {
                            this.setState({use_wallet: false, is_payment_coupon_applied: true})
                        }
                    } else {
                        this.setState({ coupon_loading: true })
                        this.getAndApplyBestCoupons(deal_price,false)
                    }
                    this.setState({'pay_btn_loading': false})
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
            if (this.props.selectedDoctorProcedure[this.props.selectedDoctor] && this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic] && this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic].price) {

                treatment_Price = this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic].price.deal_price || 0
            }

            deal_price += treatment_Price
            //auto apply coupon if no coupon is apllied
            // if (this.props.selectedDoctor && deal_price && this.props.couponAutoApply) {
            if (this.props.selectedDoctor && deal_price) {
                this.setState({'pay_btn_loading': true})
                this.getAndApplyBestCoupons(deal_price,false)
            } else {
                this.props.resetOpdCoupons()
                this.setState({use_wallet: true, is_payment_coupon_applied: false})
            }
            this.setState({'pay_btn_loading': false})
        }

        if(this.state.isLensfitSpecific){
            setTimeout(() => {
                if (document.getElementById('confirm_booking')) {
                    document.getElementById('confirm_booking').click()
                }
            },3000)
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

    getAndApplyBestCoupons(deal_price = 0,isLensfit,lensFitData) {
        this.props.getCoupons({
            productId: 1, deal_price: deal_price, doctor_id: this.props.selectedDoctor, hospital_id: this.state.selectedClinic, profile_id: this.props.selectedProfile, procedures_ids: this.getProcedureIds(this.props), cart_item: this.state.cart_item,
            cb: (coupons) => {
                if (coupons) {
                    let validCoupon
                    if(isLensfit){
                        validCoupon = lensFitData
                    }else{
                        validCoupon = this.getValidCoupon(coupons)
                    }
                    if (validCoupon) {
                        this.setState({ is_cashback: validCoupon.is_cashback, couponCode: validCoupon.code, couponId: validCoupon.coupon_id || '',pay_btn_loading: true })
                        this.props.applyCoupons('1', validCoupon, validCoupon.coupon_id, this.props.selectedDoctor, (success)=>{
                            this.setState({'pay_btn_loading': false})
                        })
                        this.props.applyOpdCoupons('1', validCoupon.code, validCoupon.coupon_id, this.props.selectedDoctor, deal_price, this.state.selectedClinic, this.props.selectedProfile, this.getProcedureIds(this.props), this.state.cart_item,(err, data)=>{
                            this.setState({'pay_btn_loading': false})
                        })
                        if (validCoupon.is_payment_specific) {
                            this.setState({use_wallet: false, is_payment_coupon_applied: true})
                        }
                        if(isLensfit){
                            this.setState({show_lensfit_popup:false})
                        }
                    } else {
                        if(isLensfit){
                           this.setState({show_lensfit_popup:false})
                        }
                        this.props.resetOpdCoupons()
                        this.setState({use_wallet: true, is_payment_coupon_applied: false,'pay_btn_loading': false})
                    }
                } else {
                    if(isLensfit){
                       this.setState({show_lensfit_popup:false})
                    }
                    this.props.resetOpdCoupons()
                    this.setState({use_wallet: true, is_payment_coupon_applied: false, 'pay_btn_loading': false})
                }
                this.setState({ coupon_loading: false })
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        //Ref to update date every time on route
        if (nextProps.selectedDateFormat && nextProps.selectedDateFormat != this.state.dateTimeSelectedValue) {
            this.setState({ dateTimeSelectedValue: nextProps.selectedDateFormat })
        }
        if (!this.state.couponApplied && nextProps.DOCTORS[this.props.selectedDoctor]) {
            let hospital = {}
            let doctorDetails = nextProps.DOCTORS[this.props.selectedDoctor]

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

            if (nextProps.doctorCoupons && nextProps.doctorCoupons[this.props.selectedDoctor] && nextProps.doctorCoupons[this.props.selectedDoctor].length) {
                let doctorCoupons = nextProps.doctorCoupons[this.props.selectedDoctor]

                if (Object.values(hospital).length) {
                    let deal_price = hospital.deal_price

                    let treatment_Price = 0
                    if (nextProps.selectedDoctorProcedure[this.props.selectedDoctor] && nextProps.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic] && nextProps.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic].price) {

                        treatment_Price = nextProps.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic].price.deal_price || 0
                    }

                    deal_price += treatment_Price
                    // let validCoupon = this.getValidCoupon(doctorCoupons)
                    this.props.applyOpdCoupons('1', doctorCoupons[0].code, doctorCoupons[0].coupon_id, this.props.selectedDoctor, deal_price, this.state.selectedClinic, nextProps.selectedProfile, this.getProcedureIds(nextProps), this.state.cart_item, (err, data) => {
                        if (!err) {
                            this.setState({ is_cashback: doctorCoupons[0].is_cashback, couponCode: doctorCoupons[0].code, couponId: doctorCoupons[0].coupon_id || '', couponApplied: true })
                            if (doctorCoupons[0].is_payment_specific) {
                                this.setState({use_wallet: false, is_payment_coupon_applied: true})
                            }
                        } else {
                            this.setState({ coupon_loading: true })
                            this.getAndApplyBestCoupons(deal_price,false)
                        }
                        this.setState({'pay_btn_loading': false})
                    })
                }
            } else {
                let deal_price = 0

                if (Object.values(hospital).length) {
                    deal_price = hospital.deal_price
                }

                let treatment_Price = 0
                if (nextProps.selectedDoctorProcedure[this.props.selectedDoctor] && nextProps.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic] && nextProps.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic].price) {

                    treatment_Price = nextProps.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic].price.deal_price || 0
                }

                deal_price += treatment_Price

                if (nextProps.doctorCoupons && nextProps.doctorCoupons[this.props.selectedDoctor] && nextProps.doctorCoupons[this.props.selectedDoctor].length == 0) {
                    this.props.resetOpdCoupons()
                    this.setState({use_wallet: true, is_payment_coupon_applied: false, 'pay_btn_loading': false})
                }
                else {
                    //auto apply coupon if no coupon is apllied
                    // if (this.props.selectedDoctor && deal_price && nextProps.couponAutoApply) {
                    if (this.props.selectedDoctor && deal_price) {
                        this.props.getCoupons({
                            productId: 1, deal_price: deal_price, doctor_id: this.props.selectedDoctor, hospital_id: this.state.selectedClinic, profile_id: nextProps.selectedProfile, procedures_ids: this.getProcedureIds(nextProps), cart_item: this.state.cart_item,
                            cb: (coupons) => {
                                if (coupons) {
                                    let validCoupon = this.getValidCoupon(coupons)
                                    if (validCoupon) {
                                        this.setState({ is_cashback: validCoupon.is_cashback, couponCode: validCoupon.code, couponId: validCoupon.coupon_id || '', couponApplied: true, 'pay_btn_loading': true })
                                        this.props.applyCoupons('1', validCoupon, validCoupon.coupon_id, this.props.selectedDoctor,(success)=>{
                                            this.setState({'pay_btn_loading': false})
                                        })
                                        this.props.applyOpdCoupons('1', validCoupon.code, validCoupon.coupon_id, this.props.selectedDoctor, deal_price, this.state.selectedClinic, nextProps.selectedProfile, this.getProcedureIds(nextProps), this.state.cart_item,(err, data)=>{
                                            this.setState({'pay_btn_loading': false})
                                        })
                                        if (validCoupon.is_payment_specific) {
                                            this.setState({use_wallet: false, is_payment_coupon_applied: true})
                                        }
                                    } else {
                                        this.setState({ couponApplied: true, use_wallet: true, is_payment_coupon_applied: false, 'pay_btn_loading': false })
                                        this.props.resetOpdCoupons()
                                    }
                                } else {
                                    this.setState({ couponApplied: true, use_wallet: true, is_payment_coupon_applied: false, 'pay_btn_loading': false })
                                    this.props.resetOpdCoupons()
                                }
                            }
                        })
                    } else {
                        this.setState({ couponApplied: true, use_wallet: true, is_payment_coupon_applied: false })
                        this.props.resetOpdCoupons()
                    }
                }
            }

        }
    }

    profileDataCompleted(data) {
        this.setState({ formData: { ...data } })
        if (data.name == '' || data.gender == '' || data.phoneNumber == '' || data.email == '' || !data.otpVerifySuccess || data.dob == '') {
            this.props.patientDetails(data)
            this.setState({ profileDataFilled: false, showTimeError: false })
        } else if (data.otpVerifySuccess) {
            let clear_data = {}
            this.props.patientDetails(clear_data)
            this.setState({ profileDataFilled: true, showTimeError: false, profileError: false })
        }
    }

    getProcedureIds(props) {
        if (props.selectedDoctorProcedure[this.props.selectedDoctor] && props.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic] && props.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic].categories) {
            let procedure_ids = []

            Object.values(props.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic].categories).map((procedure) => {
                procedure_ids = procedure_ids.concat(procedure.filter(x => x.is_selected).map(x => x.procedure_id))
            })

            if (procedure_ids.length) {
                return procedure_ids
            }
        }
        return null
    }

    getUtmTags(){
        const parsed = queryString.parse(this.props.location.search)
        let utm_tags = {
            utm_source: parsed.utm_source || '',
            utm_medium: parsed.utm_medium || '',
            utm_term: parsed.utm_term || '',
            utm_campaign: parsed.utm_campaign || '',
            referrer: document.referrer || '',
            gclid: parsed.gclid || ''
        }
        return utm_tags
    }
    proceed(datePicked, patient, addToCart, total_price, total_wallet_balance,is_selected_user_insurance_status, e) {
        const parsed = queryString.parse(this.props.location.search)
        if(patient && is_selected_user_insurance_status && is_selected_user_insurance_status == 4){
            SnackBar.show({ pos: 'bottom-center', text: "Your documents from the last claim are under verification.Please write to customercare@docprime.com for more information." });
            window.scrollTo(0, 0)
            return
        }
        
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

        if(patient && !patient.email && this.props.is_integrated){
            this.setState({isEmailNotValid:true})
            SnackBar.show({ pos: 'bottom-center', text: "Please Enter Your Email Id" })
            return 
        }
        if(patient && !patient.dob && this.props.is_integrated){
            this.setState({isDobNotValid:true})
            SnackBar.show({ pos: 'bottom-center', text: "Please Enter Your Date of Birth" })
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
        let is_vip_applicable = false
        if (this.props.selectedSlot && this.props.selectedSlot.date && this.props.DOCTORS[this.props.selectedDoctor]) {
            let priceData = { ...this.props.selectedSlot.time }
            let hospitals = this.props.DOCTORS[this.props.selectedDoctor].hospitals
            let hospital = null

            if (hospitals && hospitals.length) {
                hospitals.map((hsptl) => {
                    if (hsptl.hospital_id == this.state.selectedClinic) {
                        hospital = hsptl
                    }
                })
            }

            if (hospital && hospital.insurance) {
                is_insurance_applicable = (parseInt(priceData.deal_price) <= hospital.insurance.insurance_threshold_amount) && hospital.insurance.is_insurance_covered
            }

            if(hospital && hospital.vip){
                is_vip_applicable = hospital.vip.is_vip_member && hospital.vip.cover_under_vip
            }
        }

        if (this.props.profiles && this.props.profiles[this.props.selectedProfile] && !this.props.profiles[this.props.selectedProfile].isDummyUser) {

            is_selected_user_insured = this.props.profiles[this.props.selectedProfile].is_insured
        }

        is_insurance_applicable = is_insurance_applicable && is_selected_user_insured

        // React guarantees that setState inside interactive events (such as click) is flushed at browser event boundary
        let show_lensfit=this.props.DOCTORS[this.props.selectedDoctor] && this.props.DOCTORS[this.props.selectedDoctor].lensfit_offer?this.props.DOCTORS[this.props.selectedDoctor].lensfit_offer.applicable:false
        let lensfit_coupons =this.props.DOCTORS[this.props.selectedDoctor] && this.props.DOCTORS[this.props.selectedDoctor].lensfit_offer?this.props.DOCTORS[this.props.selectedDoctor].lensfit_offer.coupon:{}

        /*if(!this.state.show_lensfit_popup && !this.state.lensfit_decline && show_lensfit && !is_insurance_applicable && lensfit_coupons && Object.keys(lensfit_coupons).length > 0 && this.state.couponId !=lensfit_coupons.coupon_id){
                this.setState({show_lensfit_popup:true, lensfit_coupons:lensfit_coupons})
            return
        }*/
        if (!this.state.show_banner && !this.state.banner_decline && !is_vip_applicable && !addToCart && (total_price == 0 || !is_insurance_applicable || (this.state.use_wallet && total_wallet_balance > 0))) {
            this.setState({ show_banner:true})
            return
        }

        if (!this.state.showConfirmationPopup && !addToCart && (total_price == 0 || (is_insurance_applicable && this.props.payment_type == 1) || (this.state.use_wallet && total_wallet_balance > 0))) {
            this.setState({ showConfirmationPopup: true, show_banner:false })
            return
        }

        if (this.state.loading) {
            return
        }
        this.setState({ loading: true, error: "" })

        let start_date = this.props.selectedSlot.date
        let start_time = this.props.selectedSlot.time.value
        let utm_tags = this.getUtmTags()

        let postData = {
            doctor: this.props.selectedDoctor,
            hospital: this.state.selectedClinic,
            profile: this.props.selectedProfile,
            start_date, start_time,
            payment_type: this.props.payment_type,
            use_wallet: is_vip_applicable?false:this.state.use_wallet,
            cart_item: this.state.cart_item,
            utm_tags: utm_tags,
            from_web:true
        }
        let profileData = { ...patient }
        if (profileData && profileData.whatsapp_optin == null) {
            profileData['whatsapp_optin'] = this.state.whatsapp_optin
            this.props.editUserProfile(profileData, profileData.id)
        }
        if (this.props.disCountedOpdPrice >= 0 && this.props.payment_type == 1 && !is_insurance_applicable && !is_vip_applicable) {
            postData['coupon_code'] = this.state.couponCode ? [this.state.couponCode] : []
        }

        let procedure_ids = []
        if (false && this.props.selectedDoctorProcedure[this.props.selectedDoctor] && this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic] && this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic].categories) {

            Object.values(this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic].categories).map((procedure) => {

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
                if(this.state.isMatrix){
                    this.props.history.push('/cart?is_matrix=true')
                }else{
                    this.props.history.push('/cart')
                }
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
        if(parsed && parsed.appointment_id && parsed.cod_to_prepaid=='true'){
            postData['appointment_id'] = parsed.appointment_id
            postData['cod_to_prepaid'] = true
            this.props.codToPrepaid(postData, (err, data)=>{
                if (!err) {
                    /*if (data.is_agent) {
                        this.props.removeCoupons(this.props.selectedDoctor, this.state.couponId)
                         this.props.history.replace(this.props.location.pathname + `?order_id=${data.data.orderId}`)
                       // this.setState({ order_id: data.data.orderId })
                        return
                    }*/
                    if (data.payment_required) {
                        // send to payment selection page
                        let analyticData = {
                            'Category': 'ConsumerApp', 'Action': 'DoctorOrderCreated', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'doctor_order_created'
                        }
                        GTM.sendEvent({ data: analyticData })
                        // this.props.history.push(`/payment/${data.data.orderId}?refs=opd`)
                        this.processPayment(data)
                    } else {
                        this.props.removeCoupons(this.props.selectedDoctor, this.state.couponId)
                        // send back to appointment page
                        this.props.history.replace(`/order/summary/${data.data.orderId}?payment_success=true`)
                    }
                } else {
                    let message 
                    if(err.error){
                        message = err.error
                    }else{
                        message = "Could not create appointment. Try again later !"
                    }
                    if (err.message) {
                        message = err.message
                    }
                    this.setState({ loading: false, error: message })
                }
            })
            return;
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
                /*if (data.is_agent) {
                    this.props.removeCoupons(this.props.selectedDoctor, this.state.couponId)
                    // this.props.history.replace(this.props.location.pathname + `?order_id=${data.data.orderId}`)
                    this.setState({ order_id: data.data.orderId })
                    return
                }*/
                if (data.payment_required) {
                    // send to payment selection page
                    let analyticData = {
                        'Category': 'ConsumerApp', 'Action': 'DoctorOrderCreated', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'doctor_order_created'
                    }
                    GTM.sendEvent({ data: analyticData })
                    // this.props.history.push(`/payment/${data.data.orderId}?refs=opd`)
                    this.processPayment(data)
                } else {
                    this.props.removeCoupons(this.props.selectedDoctor, this.state.couponId)
                    // send back to appointment page
                    this.props.history.replace(`/order/summary/${data.data.orderId}?payment_success=true`)
                }
            } else {
                let message 
                if(err.error){
                    message = err.error
                }else{
                    message = "Could not create appointment. Try again later !"
                }
                if (err.message) {
                    message = err.message
                }
                this.setState({ loading: false, error: message })
            }
        })
    }

    processPayment(data) {
        if (data && data.status) {
            this.setState({ paymentData: data.data }, () => {
                setTimeout(()=>{
                    if (document.getElementById('paymentForm') && Object.keys(this.state.paymentData).length > 0) {
                        let form = document.getElementById('paymentForm')
                        setTimeout(() => {
                            this.props.removeCoupons(this.props.selectedDoctor, this.state.couponId)
                        },3000)
                        form.submit()
                    }
                },500)
            })
        }
    }

    navigateTo(where, e) {
        switch (where) {
            case "time": {
                if (this.state.seoFriendly) {
                    let url = `${window.location.pathname}?goback=true&type=opd&doctor_id=${this.props.selectedDoctor}&hospital_id=${this.state.selectedClinic}&action_page=timings`
                    this.props.history.push(url)
                } else {
                    this.props.history.push(`/opd/doctor/${this.props.selectedDoctor}/${this.state.selectedClinic}/book?goback=true&type=opd`)
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
        this.props.sendAgentBookingURL(this.state.order_id, 'sms',null,null, (err, res) => {
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
        this.setState({pay_btn_loading: true})
        this.props.history.push(`/coupon/opd/${this.props.selectedDoctor}/${this.state.selectedClinic}?procedures_ids=${procedure_ids}&deal_price=${this.getDealPrice()}&cart_item=${this.state.cart_item || ""}`)
    }

    getDealPrice() {
        let hospital = {}
        let doctorDetails = this.props.DOCTORS[this.props.selectedDoctor]

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
        if (this.props.selectedDoctorProcedure[this.props.selectedDoctor] && this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic] && this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic].price) {

            treatment_Price = this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic].price.deal_price || 0
        }

        deal_price += treatment_Price
        return deal_price
    }

    closeErrorPopup = () => {
        this.setState({ error: '' })
    }

    getBookingButtonText(total_wallet_balance, price_to_pay, mrp, enabled_for_cod_payment, is_cod_deal_price,is_vip_applicable,vip_amount) {

        let price_from_wallet = 0
        if(is_vip_applicable){
            if(vip_amount){
                let vip_price_pay = 0
                if (this.state.use_wallet && total_wallet_balance) {
                    price_from_wallet = Math.min(total_wallet_balance, vip_amount)
                }

                vip_price_pay = vip_amount - price_from_wallet

                return `Confirm Booking ${vip_price_pay?`(₹ ${vip_price_pay})`:''}`
            }else{
                return `Confirm Booking`
            }
        }
        if (this.props.payment_type != 1) {
            if (enabled_for_cod_payment) {
                if (is_cod_deal_price) {
                    return `Confirm Booking (₹ ${is_cod_deal_price})`
                } else {
                    return `Confirm Booking (₹ ${mrp})`
                }
            } else {
                return `Confirm Booking (₹ ${mrp})`
            }

        }
        
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
        slot.selectedClinic = this.state.selectedClinic
        this.props.selectOpdTimeSLot(slot, false)
    }

    toggleWhatsap(status, e) {
        this.setState({ whatsapp_optin: status })
    }

    priceConfirmationPopup(choice) {
        if (!choice) {
            this.setState({ showConfirmationPopup: choice, show_banner:false })
        } else {
            this.setState({ showConfirmationPopup: '',show_banner:false })
            if (document.getElementById('confirm_booking')) {
                document.getElementById('confirm_booking').click()
            }
        }
    }

    bannerConfirmationPopup(choice) {
        if (!choice) {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'BookingPageVipBannerCrossClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'bookingpage-vip-banner-cross-click'
            }
            GTM.sendEvent({ data: data })
            this.setState({ show_banner: choice, banner_decline:true })
        } else {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'BookingPageVipBannerNotInterstedClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'bookingpage-vip-banner-not-intersted-click'
            }
            GTM.sendEvent({ data: data })
            this.setState({ show_banner: '' })
            if (document.getElementById('confirm_booking')) {
                document.getElementById('confirm_booking').click()
            }
        }
    }

    submitLeadFormGeneration(ipdFormParams) {
        if (close) {
            let gtmData = {
                'Category': 'ConsumerApp', 'Action': 'DoctorBookingIpdFormClosed', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-booking-ipd-form-closed'
            }
            GTM.sendEvent({ data: gtmData })
        }
        let ipd_data = {
            showChat: true,
            ipdFormParams: ipdFormParams
        }

        this.setState({ showIpdLeadForm: false, showSecondPopup: true }, () => {
/*
            this.props.checkIpdChatAgentStatus((response) => {
                if (response && response.users && response.users.length) {

                    this.props.ipdChatView({ showIpdChat: true, ipdForm: ipdFormParams, showMinimize: true })
                }
            })*/
        })
    }

    goToInsurance(selectedDoctor, selectedClinic) {
        let Gtmdata = {
            'Category': 'ConsumerApp', 'Action': 'AvailNowLabClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'avail-now-lab-clicked'
        }
        GTM.sendEvent({ data: Gtmdata })
        let data = {}
        data.thumbnail = selectedDoctor.thumbnail
        data.name = selectedDoctor.display_name
        data.url = selectedDoctor.url
        data.id = selectedDoctor.id
        data.selectedClinic = selectedClinic
        data.type = 'doctor'
        this.props.saveAvailNowInsurance(data)
        this.props.history.push('/insurance/insurance-plans?source=doctor-summary-view&show_button=true')
    }

    selectClinic(clinic_id) {
        var href = new URL(window.location.href)
        href.searchParams.set('hospital_id', clinic_id)
        var newUrl = href.toString()
        window.history.replaceState(window.history.state, document.title, newUrl)

        this.setState({ selectedClinic: clinic_id }, () => {
            this.props.fetchData(this.props, clinic_id, false)
        })
    }

    selectDate(e) {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'OpdDateClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'opd-date-clicked'
        }

        GTM.sendEvent({ data: data })
        if (e.target.value) {
            let slot = { time: {} }
            let date = e.target.value
            this.setState({ dateTimeSelectedValue: date })
            this.props.selectOpdTimeSLot(slot, false, null, date)
        }
    }

    getFormattedDate(date) {
        date = new Date(date)
        var dd = date.getDate();

        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        var today = yyyy + '-' + mm + '-' + dd;
        return today
    }

    setDataOnClinicChange() {
        let slot = { time: {} }
        this.props.selectOpdTimeSLot(slot, false)
        this.setState({ dateTimeSelectedValue: '' })
    }

    saveLeadIdForUpdation(response) {
        if(response.id){
            this.setState({firstLeadId: response.id, showSecondPopup: true})
        }
    }

    secondIpdFormSubmitted(formData){
        this.setState({showSecondPopup: false}, ()=>{
            if(formData){
                try{
                    let popup1 = formData
                    
                    if(popup1 && popup1.requested_date_time){
                        let requested_date = new Date(popup1.requested_date_time)
                        let date = this.getFormattedDate(requested_date)
                        if (date) {
                            this.setState({ dateTimeSelectedValue: date })
                            /*let hours = formData.title=='AM'?requested_date.getHours():requested_date.getHours()+12*/
                            let hours = parseInt(requested_date.getHours())

                            let title = formData.title
                            let foundTimeSlot = null
                            if(title == 'PM' && hours!=12) {
                                hours = hours+12
                            }
                            if(this.props.timeSlots && this.props.timeSlots[date] && this.props.timeSlots[date].length) {
                                
                                let timeSlotData = this.props.timeSlots[date].filter(x=>x.title==title)
                                if(timeSlotData && timeSlotData.length && timeSlotData[0].timing && timeSlotData[0].timing.length) {
                                    timeSlotData[0].timing.map((x)=>{
                                        if(x.value == hours){    
                                            foundTimeSlot = x
                                        }
                                    })
                                }

                                
                            }
                            if(foundTimeSlot && Object.keys(foundTimeSlot).length){
                                
                            }else {
                                this.setState({showTimeError: true, timeErrorText:'Your requested time slot is not available. Please choose a different one.' })
                            }
                            this.selectTime(foundTimeSlot, date)
                        }
                    }                    

                }catch(e){
                    console.log('Error is '+e)
                }

            }
        })
    }

    selectTime(time, date){
        let data = null
        if(time) {

            let timeSpan = Object.assign({}, time)
            timeSpan.title = time.value>=12?'PM':'AM'
            data = {
                date: new Date(date),
                month: MONTHS[new Date(date).getMonth()],
                slot: '',
                time: timeSpan
            }

            data.selectedDoctor = this.props.selectedDoctor
            data.selectedClinic = this.state.selectedClinic
        }else {
            data = { time: {} }
        }
        let extraTimeParams = null
        if(date) {
            extraTimeParams = this.getFormattedDate(date)
        }
        this.props.selectOpdTimeSLot(data, false, null, extraTimeParams)
    }

    applyLensFitCoupons(deal_price,coupon){
        let data = {
            'Category': 'ConsumerApp', 'Action': 'LensFitOPDApplyClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lensfit-OPD-apply-clicked'
        }
        GTM.sendEvent({ data: data })
        this.getAndApplyBestCoupons(deal_price,true,coupon)
    }

    closeLensFitPopup(){
        let data = {
            'Category': 'ConsumerApp', 'Action': 'LensFitOpdDontWantClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lensfit-opd-dont-want-clicked'
        }

        GTM.sendEvent({ data: data })
        this.setState({show_lensfit_popup:false,lensfit_decline:true},()=>{
            if (document.getElementById('confirm_booking')) {
                document.getElementById('confirm_booking').click()
            }
        })
        // this.setState({show_lensfit_popup:false,lensfit_decline:true})
    }

    codErrorClicked(){
        this.props.history.push('/user/appointments')
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
        let insurance_error_msg = ''
        let show_insurance_error = false
        let payment_mode_count = 0
        let is_vip_applicable = false
        let is_selected_user_insurance_status 
        let vip_amount
        let is_selected_user_under_vip = false
        let is_default_user_under_vip = false
        let all_cities = this.props.DOCTORS[this.props.selectedDoctor] && this.props.DOCTORS[this.props.selectedDoctor].all_cities?this.props.DOCTORS[this.props.selectedDoctor].all_cities:[]
        if (doctorDetails) {
            let { name, qualifications, hospitals, enabled_for_cod } = doctorDetails

            if (hospitals && hospitals.length) {
                hospitals.map((hsptl) => {
                    if (hsptl.hospital_id == this.state.selectedClinic) {
                        hospital = hsptl
                    }
                    enabled_for_cod_payment = hospital.enabled_for_cod
                    enabled_for_prepaid_payment = hospital.enabled_for_prepaid
                })
            }
        }
        if (this.props.defaultProfile && this.props.profiles[this.props.defaultProfile]) {
            is_default_user_insured = this.props.profiles[this.props.defaultProfile].is_insured
            is_default_user_under_vip = this.props.profiles[this.props.defaultProfile].is_vip_member
        }

        if (this.props.profiles[this.props.selectedProfile] && !this.props.profiles[this.props.selectedProfile].isDummyUser) {
            patient = this.props.profiles[this.props.selectedProfile]
            is_selected_user_insured = this.props.profiles[this.props.selectedProfile].is_insured
            is_selected_user_insurance_status = this.props.profiles[this.props.selectedProfile].insurance_status
            is_selected_user_under_vip = this.props.profiles[this.props.selectedProfile].is_vip_member
        }
        if (this.props.selectedSlot && this.props.selectedSlot.date) {
            priceData = { ...this.props.selectedSlot.time }
            priceData.payable_amount = priceData.deal_price
            priceData.is_cod_deal_price = priceData.cod_deal_price
            if (hospital && hospital.insurance) {
                is_insurance_applicable = (parseInt(priceData.deal_price) <= hospital.insurance.insurance_threshold_amount) && hospital.insurance.is_insurance_covered
                if(hospital.insurance.error_message != ''){
                    insurance_error_msg = hospital.insurance.error_message
                    show_insurance_error = true
                }
            }
            if(hospital && hospital.vip){
                is_vip_applicable = hospital.vip.cover_under_vip && is_selected_user_under_vip
                vip_amount = hospital.vip.vip_amount
            }


            // reset time slot if doctor/hospital changes
            if (this.props.selectedSlot.selectedClinic != this.state.selectedClinic || this.props.selectedSlot.selectedDoctor != this.props.selectedDoctor) {
                this.setDataOnClinicChange()
            }
        } else if (hospital) {
            priceData.mrp = hospital.mrp
            priceData.fees = hospital.fees
            priceData.deal_price = hospital.deal_price
            priceData.payable_amount = hospital.deal_price
            priceData.is_cod_deal_price = hospital.cod_deal_price

            if(hospital.vip){
                is_vip_applicable = hospital.vip.cover_under_vip && is_selected_user_under_vip
                vip_amount = hospital.vip.vip_amount
            }
            if (hospital.insurance) {
                is_insurance_applicable = (parseInt(hospital.deal_price) <= hospital.insurance.insurance_threshold_amount) && hospital.insurance.is_insurance_covered
                if(hospital.insurance.error_message != ''){
                    insurance_error_msg = hospital.insurance.error_message
                    show_insurance_error = true
                }
            }

        }
        let treatment_Price = 0, treatment_mrp = 0
        let selectedProcedures = {}
        if (false && this.props.selectedDoctorProcedure[this.props.selectedDoctor] && this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic] && this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic].price) {

            treatment_Price = this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic].price.deal_price || 0
            treatment_mrp = this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic].price.mrp || 0
            selectedProcedures = this.props.selectedDoctorProcedure[this.props.selectedDoctor][this.state.selectedClinic].categories
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
        let docDiscount = (parseInt(priceData.mrp) + treatment_mrp) - (parseInt(priceData.is_cod_deal_price))
        let cod_percentage_discount = (parseInt(docDiscount) / (parseInt(priceData.mrp)) * 100)
        is_insurance_applicable = is_insurance_applicable && is_selected_user_insured
        if (!enabled_for_cod_payment && this.props.payment_type == 2) {
            this.props.select_opd_payment_type(1)
        } else if (enabled_for_cod_payment && !enabled_for_prepaid_payment) {
            this.props.select_opd_payment_type(2)
        } else if (enabled_for_cod_payment && this.props.payment_type == 2 && is_insurance_applicable) {
            this.props.select_opd_payment_type(1)
        }


        if (hospital && hospital.insurance && (parseInt(hospital.deal_price) <= hospital.insurance.insurance_threshold_amount) && hospital.insurance.is_insurance_covered && !is_selected_user_insured) {
            is_insurance_buy_able = true
        }

        if (enabled_for_prepaid_payment)
            payment_mode_count++
        if (enabled_for_cod_payment)
            payment_mode_count++
        // if (enabled_for_prepaid_payment && is_insurance_buy_able)
        //     payment_mode_count++
        let clinic_mrp = priceData.mrp
        if (is_insurance_applicable && this.props.payment_type != 2) {
            finalPrice = 0
            priceData.deal_price = 0
            priceData.mrp = 0
        }

        if(priceData.fees ==0 && !is_insurance_applicable && this.props.payment_type == 1){
            finalPrice = parseInt(priceData.deal_price) - (this.props.disCountedOpdPrice ? this.props.disCountedOpdPrice : 0)
        }

        let is_add_to_card = STORAGE.isAgent() || !is_default_user_insured

        //Select Next Upcoming Date 

        let { date, time } = this.props.selectedSlot

        if (date) {
            date = new Date(date).toDateString()
        }

        let upcoming_date = this.props.upcoming_slots && Object.keys(this.props.upcoming_slots).length ? Object.keys(this.props.upcoming_slots)[0] : ''
        let dateAfter24Days = new Date().setDate(new Date().getDate() + 23)
        let showPopup = parsed.showPopup && this.state.showIpdLeadForm && typeof window == 'object' && window.ON_LANDING_PAGE  && !this.props.is_ipd_form_submitted
        let is_time_selected = (this.props.upcoming_slots && Object.keys(this.props.upcoming_slots).length) || (this.props.selectedSlot && this.props.selectedSlot.date) || (this.props.selectedDateFormat)
        return (
            <div className="profile-body-wrap">
                <ProfileHeader bookingPage={true} />
                {
                    this.state.show_banner?
                        <BookingConfirmationPopup {...this.props} priceConfirmationPopup={this.priceConfirmationPopup.bind(this)} is_vip_applicable={is_vip_applicable} is_insurance_applicable = {is_insurance_applicable} show_banner={this.state.show_banner} bannerConfirmationPopup={this.bannerConfirmationPopup.bind(this)}/>
                        : ''
                }
                {
                    this.state.showConfirmationPopup && is_selected_user_insurance_status != 4 ?
                        <BookingConfirmationPopup {...this.props} priceConfirmationPopup={this.priceConfirmationPopup.bind(this)} is_vip_applicable={is_vip_applicable} is_insurance_applicable = {is_insurance_applicable} show_banner={this.state.show_banner} bannerConfirmationPopup={this.bannerConfirmationPopup.bind(this)}/>
                        : ''
                }
                {
                    this.state.show_lensfit_popup?
                        <LensfitPopup {...this.props} lensfit_coupons ={this.state.lensfit_coupons} applyLensFitCoupons = {this.applyLensFitCoupons.bind(this)} closeLensFitPopup={this.closeLensFitPopup.bind(this)} deal_price={priceData.deal_price} isOPD={true}/>
                    :''
                }
                {
                    this.props.codError?<CodErrorPopup codErrorClicked={()=>this.codErrorClicked()} codMsg={this.props.codError}/>:
                    <section className="container container-top-margin">
                        <div className="row main-row parent-section-row">
                            <LeftBar />
                            <div className="col-12 col-md-7 col-lg-7 center-column">
                                {
                                    this.props.DOCTORS[this.props.selectedDoctor] && this.props.DATA_FETCH ?
                                        <div>
                                            {
                                                showPopup?
                                                    <IpdLeadForm submitLeadFormGeneration={this.submitLeadFormGeneration.bind(this)} {...this.props} hospital_name={hospital && hospital.hospital_name ? hospital.hospital_name : null} hospital_id={hospital && hospital.hospital_id ? hospital.hospital_id : null} doctor_name={this.props.DOCTORS[this.props.selectedDoctor].display_name ? this.props.DOCTORS[this.props.selectedDoctor].display_name : null} doctor_id={this.props.selectedDoctor} formSource='DoctorBookingPage' saveLeadIdForUpdation={this.saveLeadIdForUpdation.bind(this)} noToastMessage={true} is_booking_page={true}/>
                                                    : ''
                                            }
                                            {
                                                this.props.DOCTORS[this.props.selectedDoctor] && this.state.showSecondPopup && parsed.get_feedback && parsed.get_feedback == '1'?
                                                <IpdSecondPopup {...this.props} firstLeadId={this.state.firstLeadId} all_doctors={[]} all_cities={all_cities} doctorProfilePage={true} secondIpdFormSubmitted={this.secondIpdFormSubmitted.bind(this)} hospital_name={hospital && hospital.hospital_name ? hospital.hospital_name : null} hospital_id={hospital && hospital.hospital_id ? hospital.hospital_id : null} doctor_name={this.props.DOCTORS[this.props.selectedDoctor].name ? this.props.DOCTORS[this.props.selectedDoctor].name : ''} formSource='DoctorBookingPage' is_booking_page={true}/>
                                                :''
                                            }
                                            <section className="dr-profile-screen booking-confirm-screen mrb-60">
                                                <div className="container-fluid">
                                                    <div className="row mrb-20">
                                                        <div className="col-12">

                                                            <SelectedClinic
                                                                {...this.props}
                                                                boxShadowHide={true}
                                                                selectedDoctor={this.props.DOCTORS[this.props.selectedDoctor]}
                                                                selectedClinic={this.state.selectedClinic}
                                                                history={this.props.history}
                                                                selectClinic={this.selectClinic.bind(this)}
                                                            />
                                                            {/* new time slot */}
                                                            {
                                                                    parsed.appointment_id && parsed.cod_to_prepaid=='true'?
                                                                    <div className={`widget mrb-15 ${this.props.profileError ? 'rnd-error-nm' : ''}`}>
                                                                        <div className="widget-content">
                                                                            <div className="lab-visit-time d-flex jc-spaceb">
                                                                                <div className="d-flex flex-1" style={{ flexDirection: 'column', paddingRight: 15 }} >
                                                                                    <h4 className="title d-flex"><span>
                                                                                        <img className="visit-time-icon" src={ASSETS_BASE_URL + '/img/watch-date.svg'} />
                                                                                    </span>Time Selected</h4>
                                                                                </div>
                                                                                <div className="mbl-view-formatting text-right">
                                                                                    <h4 className="date-time title" style={{ textTransform: 'capitalize' }} >{date ? `${WEEK_DAYS[new Date(date).getDay()]}, ${new Date(date).getDate()} ${MONTHS[new Date(date).getMonth()]}` : ''} {time.text ? "|" : ""} {time.text} {time.text ? (time.value >= 12 ? 'PM' : 'AM') : ''}</h4>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    :<div className={`widget mrb-15 ${this.state.showTimeError ? 'rnd-error-nm' : ''}`}>
                                                                        {
                                                                            this.props.TIMESLOT_DATA_LOADING?
                                                                                <div className="loader-for-chat-div mt-0">
                                                                                    <div className='loader-for-chat mb-0'>
                                                                                        <span></span>
                                                                                        <span></span>
                                                                                        <span></span>
                                                                                        <span></span>
                                                                                        <span></span>
                                                                                        <span></span>
                                                                                    </div>
                                                                                    <p className="ldng-text"></p>
                                                                                </div>
                                                                                : is_time_selected || this.props.is_integrated?
                                                                                    <div className="widget-content pos-relative">
                                                                                        <div className="lab-visit-time d-flex jc-spaceb mb-0">
                                                                                            <h4 className="title mb-0">
                                                                                                <span>
                                                                                                    <img className="visit-time-icon" src={ASSETS_BASE_URL + '/img/watch-date.svg'} />
                                                                                                </span>
                                                                                                Select Visit Time
                                                                                </h4>
                                                                                {
                                                                                    !is_time_selected && this.props.is_integrated && <a href="" onClick={(e) => {
                                                                                            e.preventDefault()
                                                                                            e.stopPropagation()
                                                                                            this.navigateTo('time')
                                                                                        }} className="text-primary fw-700 text-sm">Select Time</a>
                                                                                }
                                                                                        </div>
                                                                                        <p className="apnt-doc-dtl">The appointment is subject to confirmation from the Doctor. </p>

                                                                                        {
                                                                                            is_time_selected && 
                                                                                            <React.Fragment>
                                                                                                <div className="date-slecet-cont">
                                                                                            <div className="nw-inpt-selctr">
                                                                                                <span className="nw-pick-hdng">Date:</span>
                                                                                                <div className="caln-input-tp">
                                                                                                    <img className="inp-nw-cal" src={ASSETS_BASE_URL + '/img/calnext.svg'} />
                                                                                                    <input type="date" name="date" onChange={this.selectDate.bind(this)} value={this.state.dateTimeSelectedValue ? this.state.dateTimeSelectedValue : upcoming_date} min={this.getFormattedDate(new Date())} max={this.getFormattedDate(new Date(dateAfter24Days))} />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="date-slecet-cont">
                                                                                            <div className="nw-inpt-selctr">
                                                                                                <span className="nw-pick-hdng">Time:</span>
                                                                                                <div className="caln-input-tp" onClick={() => this.navigateTo('time')}>
                                                                                                    <img className="inp-nw-time" src={ASSETS_BASE_URL + '/img/nw-watch.svg'} />
                                                                                                    <input type="text" disabled={true} name="bday" placeholder="Select" value={time && time.text?`${time.text} ${time.value >= 12 ? 'PM' : 'AM'}` : ''} />
                                                                                                    <img className="tm-arw-sgn" src={ASSETS_BASE_URL + '/img/customer-icons/dropdown-arrow.svg'} />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                            </React.Fragment>
                                                                                        }
                                                                                        {
                                                                                            this.state.timeErrorText?
                                                                                            <p className="apnt-doc-dtl slc-date-error">{this.state.timeErrorText}</p>
                                                                                            :''
                                                                                        }
                                                                                    </div> : <p className="no-tm-slot"><img src={ASSETS_BASE_URL + "/images/warning-icon.png"} style={{ height: '15px', width: '15px', marginRight: '8px' }} />No Time Slot Available</p>
                                                                        }
                                                                    </div>
                                                        }

                                                            {/* new time slot */}


                                                            {/*<VisitTimeNew type="home" navigateTo={this.navigateTo.bind(this)} selectedSlot={this.props.selectedSlot} timeError={this.state.showTimeError}

                                                                timeSlots={this.props.timeSlots}
                                                                selectTimeSlot={this.selectTimeSlot.bind(this)}
                                                                doctor_leaves={this.props.doctor_leaves || []}
                                                                upcoming_slots={this.props.upcoming_slots || null}
                                                            />*/}
                                                            <ChoosePatientNewView patient={patient} navigateTo={this.navigateTo.bind(this)} {...this.props} profileDataCompleted={this.profileDataCompleted.bind(this)} profileError={this.state.profileError} doctorSummaryPage="true" is_ipd_hospital={ hospital && hospital.is_ipd_hospital?hospital.is_ipd_hospital:'' } doctor_id = {this.props.selectedDoctor} hospital_id={hospital && hospital.hospital_id?hospital.hospital_id:''} show_insurance_error={show_insurance_error} insurance_error_msg={insurance_error_msg} isEmailNotValid={this.state.isEmailNotValid} isDobNotValid={this.state.isDobNotValid} is_opd={true}/>
                                                            {
                                                                Object.values(selectedProcedures).length ?
                                                                    <ProcedureView selectedProcedures={selectedProcedures} priceData={priceData} />
                                                                    : ''/*<div className="clearfix pb-list proc-padding-list">
                                                                            <span className="test-price txt-ornage">₹ {priceData.deal_price}<span className="test-mrp">₹ {priceData.mrp}</span></span><span className="fw-500 test-name-item">Doctor consultation</span></div>*/
                                                            }

                                                            {
                                                                ((parseInt(priceData.deal_price) + treatment_Price) != 0) && !is_vip_applicable?
                                                                    <div className={`widget cpn-blur mrb-15 cursor-pointer ${this.props.payment_type != 1 ? 'disable_coupon' : ''}`} onClick={this.applyCoupons.bind(this)}>
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
                                                                                        <h4 className="title" style={{ color: 'green', marginRight: 13, fontSize: '12px', marginTop: '6px' }}>
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
                                                                                                this.setState({use_wallet: true, is_payment_coupon_applied: false })
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

                                                            {/*
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
                                                            */}


                                                            {/*Payment Mode*/}
                                                            {
                                                                payment_mode_count > 1 ? <div className="widget mrb-15">

                                                                    <div className="widget-content">
                                                                        <h4 className="title mb-20">Payment Mode</h4>
                                                                        {
                                                                            enabled_for_prepaid_payment?
                                                                                <div className="payment-summary-content" onClick={() => {
                                                                                    this.props.select_opd_payment_type(1)
                                                                                }}>
                                                                                    <div className="payment-detail d-flex">
                                                                                        <label className="container-radio payment-type-radio">
                                                                                            <h4 className="title payment-amt-label">Online Payment</h4>
                                                                                            <span className="payment-mode-amt">{is_insurance_applicable ? '₹0' :is_vip_applicable? `₹ ${vip_amount}`: this.getBookingAmount(total_wallet_balance, finalPrice, (parseInt(priceData.mrp) + treatment_mrp))}</span>
                                                                                            {/* {
                                                                                                is_insurance_applicable ? ""
                                                                                                    : <span className="save-upto">Save {percent_discount}%</span>
                                                                                            } */}

                                                                                            <input checked={this.props.payment_type == 1} type="radio" name="payment-mode" />
                                                                                            <span className="doc-checkmark"></span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div> : ''
                                                                        }

                                                                        {
                                                                            !is_insurance_applicable && enabled_for_cod_payment ?
                                                                                <hr /> : ''
                                                                        }

                                                                        {
                                                                            !is_insurance_applicable && !is_vip_applicable && enabled_for_cod_payment && !(parsed.appointment_id && parsed.cod_to_prepaid=='true')?
                                                                                <div className="test-report payment-detail mt-20" onClick={() => {
                                                                                    this.props.select_opd_payment_type(2)
                                                                                }}>
                                                                                    <label className="container-radio payment-type-radio">
                                                                                        <h4 className="title payment-amt-label">Pay at Clinic</h4>
                                                                                        {
                                                                                            enabled_for_cod_payment && priceData.is_cod_deal_price ?
                                                                                                <React.Fragment>
                                                                                                    <span className="payment-mode-amt">₹{priceData.is_cod_deal_price}</span>
                                                                                                    {/* <span className="save-upto">Save {cod_percentage_discount}%
                                                                                            </span> */}
                                                                                                </React.Fragment>
                                                                                                : <span className="payment-mode-amt">₹{clinic_mrp}</span>
                                                                                        }
                                                                                        {/* <span className="light-txts d-block"> (No Coupon code and discount will be applied)</span> */}
                                                                                        <input checked={this.props.payment_type == 2} type="radio" name="payment-mode" />
                                                                                        <span className="doc-checkmark"></span>
                                                                                    </label>
                                                                                </div> : ''
                                                                        }

                                                                        {/*
                                                                            is_insurance_buy_able && this.props.common_settings && this.props.common_settings.insurance_availability?
                                                                                <hr /> : ''
                                                                        */}

                                                                        {/*
                                                                            is_insurance_buy_able && this.props.common_settings && this.props.common_settings.insurance_availability?
                                                                                <div className="test-report payment-detail mt-20 p-relative"  onClick={this.goToInsurance.bind(this,this.props.DOCTORS[this.props.selectedDoctor],this.state.selectedClinic)} style={{cursor:'pointer'}}>
                                                                                    <div className="d-flex justify-content-between align-items-sm-center">
                                                                        <div className="opd-ins-title-sub">
                                                                            <h4 className="title coupon-text">Pay with OPD Insurance</h4>
                                                                            <span className="ins-t-n-c">T&C Apply</span>
                                                                        </div>
                                                                        <div>
                                                                            <span className="opd-ins-avl opd-ins-av-know">Avail Now <img src={ASSETS_BASE_URL +  '/img/right-sc.svg'}/></span>
                                                                        
                                                                        </div>
                                                                    </div>
                                                                    
                                                                                </div> : ''
                                                                        */}


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
                                                                                <p>MRP</p>
                                                                                <p>&#8377; {parseInt(priceData.mrp) + treatment_mrp}</p>
                                                                            </div>
                                                                            {is_vip_applicable?
                                                                                <div className="payment-detail d-flex">
                                                                                    <p style={{color:'green'}}>Docprime VIP Member <img className="vip-main-ico img-fluid" src={ASSETS_BASE_URL + '/img/viplog.png'} /></p>
                                                                                    <p style={{color:'green'}}>- &#8377; {parseInt(priceData.mrp) - parseInt(vip_amount)}</p>
                                                                                 </div>
                                                                            :''}
                                                                            {!is_vip_applicable && priceData.fees != 0 && (parseInt(priceData.mrp) + treatment_mrp) - (parseInt(priceData.deal_price) + treatment_Price)?<div className="payment-detail d-flex">
                                                                                <p style={{color:'green'}}>Docprime Discount</p>
                                                                                <p style={{color:'green'}}>- &#8377; {(parseInt(priceData.mrp) + treatment_mrp) - (parseInt(priceData.deal_price) + treatment_Price)}</p>
                                                                            </div>
                                                                            :''}
                                                                            {!is_vip_applicable && this.props.payment_type == 1 && priceData.fees == 0?
                                                                                <React.Fragment>
                                                                                <div className="payment-detail d-flex">
                                                                                    <p>Docprime price</p>
                                                                                    <p>Free</p>
                                                                                </div>
                                                                                <div className="payment-detail d-flex">
                                                                                    <p>Platform Convenience Fee</p>
                                                                                    <p>&#8377; {parseInt(priceData.deal_price)}</p>
                                                                                </div>
                                                                                </React.Fragment>
                                                                            :''}
                                                                            {!is_vip_applicable && this.props.disCountedOpdPrice && !this.state.is_cashback
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
                                                                                <h5 className="payment-amt-value">&#8377; {is_vip_applicable?vip_amount :finalPrice || 0}</h5>
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
                                                                                    <p>MRP</p>
                                                                                    {
                                                                                        enabled_for_cod_payment && priceData.is_cod_deal_price ? <p>&#8377;  {parseInt(priceData.mrp) + treatment_mrp}</p> : <p>&#8377; {parseInt(priceData.mrp) + treatment_mrp}</p>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            {
                                                                                !is_insurance_applicable &&enabled_for_cod_payment && priceData.fees != 0 && priceData.is_cod_deal_price !== priceData.mrp && priceData.is_cod_deal_price && (parseInt(priceData.mrp) + treatment_mrp) - (parseInt(priceData.is_cod_deal_price))?
                                                                                    <React.Fragment>
                                                                                        <div className="payment-detail d-flex">
                                                                                            <p style={{color:'green'}}>Docprime Discount</p>
                                                                                            <p style={{color:'green'}}>- &#8377; {(parseInt(priceData.mrp) + treatment_mrp) - (parseInt(priceData.is_cod_deal_price))}</p>
                                                                                        </div>
                                                                                        <hr />
                                                                                    </React.Fragment> 
                                                                                :!is_insurance_applicable &&  enabled_for_cod_payment && priceData.fees == 0 && priceData.is_cod_deal_price !== priceData.mrp && priceData.is_cod_deal_price && (parseInt(priceData.mrp) + treatment_mrp) - (parseInt(priceData.is_cod_deal_price))?
                                                                                    <React.Fragment>
                                                                                        <div className="payment-detail d-flex">
                                                                                            <p style={{color:'green'}}>Docprime Discount</p>
                                                                                            <p style={{color:'green'}}>- &#8377; {(parseInt(priceData.mrp) + treatment_mrp) - (parseInt(priceData.is_cod_deal_price))}</p>
                                                                                        </div>
                                                                                        <hr />
                                                                                    </React.Fragment> 
                                                                                :''
                                                                            // : this.props.payment_type == 1 && priceData.fees == 0?
                                                                            //     <React.Fragment>
                                                                            //         <div className="payment-detail d-flex">
                                                                            //             <p>Docprime price</p>
                                                                            //             <p>Free</p>
                                                                            //         </div>
                                                                            //         <div className="payment-detail d-flex">
                                                                            //             <p>Platform Convenience Fee</p>
                                                                            //             {
                                                                            //                 enabled_for_cod_payment && priceData.is_cod_deal_price?
                                                                            //                 <p>&#8377; {parseInt(priceData.is_cod_deal_price)}</p>
                                                                            //                 :<p>&#8377; {parseInt(priceData.deal_price)}</p>
                                                                            //             }
                                                                            //         </div>
                                                                            //     </React.Fragment>
                                                                            //     :''
                                                                            }
                                                                            
                                                                            {
                                                                                is_insurance_applicable && this.props.payment_type != 2 ?
                                                                                    <div className="ins-val-bx">Covered Under Insurance</div>
                                                                                    : priceData ? <div className="test-report payment-detail mt-20">
                                                                                        <h4 className="title payment-amt-label">Amount Payable</h4>
                                                                                        {
                                                                                            enabled_for_cod_payment && priceData.is_cod_deal_price && priceData.fees !=0 
                                                                                                ? <h5 className="payment-amt-value">&#8377; {parseInt(priceData.is_cod_deal_price)}</h5> 
                                                                                                :enabled_for_cod_payment && priceData.is_cod_deal_price && priceData.fees ==0 
                                                                                                ?<h5 className="payment-amt-value">&#8377; {parseInt(priceData.is_cod_deal_price)}</h5> 
                                                                                                :this.props.payment_type == 1 &&  priceData.fees== 0
                                                                                                ?<h5 className="payment-amt-value">{(parseInt(priceData.mrp) + treatment_mrp) - (parseInt(priceData.deal_price) + treatment_Price)}</h5>
                                                                                                :<h5 className="payment-amt-value">&#8377; {parseInt(priceData.mrp) + treatment_mrp}</h5>
                                                                                        }
                                                                                    </div> : ""
                                                                            }
                                                                        </div>

                                                                    </div>
                                                            }


                                                            {
                                                                !is_vip_applicable && !is_insurance_applicable && this.props.payment_type == 1 && total_wallet_balance && total_wallet_balance > 0 && (parseInt(priceData.mrp) + treatment_mrp) > 0 ?
                                                                    <div className={"widget mrb-15" + (this.state.is_payment_coupon_applied ? " disable_coupon" : "")}>
                                                                        <div className="widget-content">
                                                                            <div className="select-pt-form">
                                                                                <div className="referral-select mb-0">
                                                                                    <label className="ck-bx" style={{ fontWeight: '600', fontSize: '14px' }}>Use docprime wallet money<input type="checkbox" onChange={this.toggleWalletUse.bind(this)} checked={this.state.use_wallet} /><span className="checkmark"></span></label>
                                                                                    <span className="rfrl-avl-balance">Available <img style={{ width: '6px', marginTop: '5px', marginRight:'3px' }} src={ASSETS_BASE_URL + "/img/rupee-icon.svg"} />{total_wallet_balance}</span>
                                                                                    {
                                                                                        this.state.is_payment_coupon_applied ?
                                                                                        <span className="cpn-pymnt-txt">Wallet Amount can not be used because payment gateway specific coupon is applied.</span> : ''
                                                                                    }
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
                                    this.state.openCancellation ? <CancelationPolicy props={this.props} toggle={this.toggle.bind(this, 'openCancellation')} is_insurance_applicable={is_insurance_applicable} /> : ""
                                }

                                {/* {
                                    this.state.order_id ? <button onClick={this.sendAgentBookingURL.bind(this)} className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn">Send SMS EMAIL</button> : <button className="p-2 v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn" data-disabled={
                                        !(patient && this.props.selectedSlot && this.props.selectedSlot.date) || this.state.loading
                                    } onClick={this.proceed.bind(this, (this.props.selectedSlot && this.props.selectedSlot.date), patient)}>{this.getBookingButtonText(total_wallet_balance, finalPrice)}</button>
                                } */}

                                <div className={`fixed sticky-btn p-0 v-btn  btn-lg horizontal bottom no-round text-lg buttons-addcart-container ${!is_add_to_card && this.props.ipd_chat && this.props.ipd_chat.showIpdChat ? 'ipd-foot-btn-duo' : ''}`}>

                                    {
                                        (STORAGE.isAgent() || !is_default_user_insured || this.state.isMatrix) && !(parsed.appointment_id && parsed.cod_to_prepaid=='true')?
                                            <button disabled={this.state.pay_btn_loading} className={"add-shpng-cart-btn" + (!this.state.cart_item ? "" : " update-btn") + (this.state.pay_btn_loading ? " disable-all" : "")} data-disabled={
                                                !(patient && this.props.selectedSlot && this.props.selectedSlot.date) || this.state.loading
                                            } onClick={this.proceed.bind(this, (this.props.selectedSlot && this.props.selectedSlot.date), patient, true, total_price, total_wallet_balance,is_selected_user_insurance_status)}>
                                                {
                                                    this.state.cart_item ? "" : <img src={ASSETS_BASE_URL + "/img/cartico.svg"} />
                                                }
                                                {this.state.cart_item ? "Update" : "Add to Cart"}
                                            </button>
                                            : ''
                                    }

                                    {
                                        ((STORAGE.isAgent() || this.state.isMatrix) && !(enabled_for_cod_payment && this.props.payment_type == 2)) || this.state.cart_item ? "" : <button disabled={this.state.pay_btn_loading} className={`v-btn-primary book-btn-mrgn-adjust ${this.state.pay_btn_loading ? " disable-all" : ""}`} id="confirm_booking" data-disabled={
                                            !(patient && this.props.selectedSlot && this.props.selectedSlot.date) || this.state.loading
                                        } onClick={this.proceed.bind(this, (this.props.selectedSlot && this.props.selectedSlot.date), patient, false, total_price, total_wallet_balance,is_selected_user_insurance_status)}>{this.getBookingButtonText(total_wallet_balance, finalPrice, (parseInt(priceData.mrp) + treatment_mrp), enabled_for_cod_payment, priceData.is_cod_deal_price,is_vip_applicable,vip_amount)}</button>
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
                }
                <Disclaimer />
                {
                    this.state.paymentData ? <PaymentForm paymentData={this.state.paymentData} refs='opd' /> : ""
                }
                
            </div>
        );
    }
}


export default PatientDetailsNew
