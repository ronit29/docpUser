import React from 'react';
import { connect } from 'react-redux'
import SnackBar from 'node-snackbar'
import Loader from '../../commons/Loader'
import VisitTimeNew from './VisitTimeNew'
import PickupAddress from './pickupAddress'
import ChoosePatientNewView from '../../opd/patientDetails/choosePatientNew'
import InitialsPicture from '../../commons/initialsPicture'
const queryString = require('query-string');
import STORAGE from '../../../helpers/storage'
import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'

import CancelationPolicy from './cancellation.js'
import PaymentSummary from './paymentSummary.js'
import GTM from '../../../helpers/gtm.js'
import BookingError from '../../opd/patientDetails/bookingErrorPopUp.js';
import PincodePopup from './PincodePopup.js'
import WhatsAppOptinView from '../../commons/WhatsAppOptin/WhatsAppOptinView.js'
import PincodeErrorPopup from './PincodeErrorPopup.js'
import BookingConfirmationPopup from './BookingConfirmationPopup.js'
import UploadPrescription from './uploadPrescription.js'

class BookingSummaryViewNew extends React.Component {
    constructor(props) {
        super(props)

        const parsed = queryString.parse(this.props.location.search)
        let lab_id = this.props.selectedLab

        this.state = {
            selectedLab: lab_id,
            paymentData: {},
            loading: false,
            error: "",
            openCancellation: false,
            openPaymentSummary: false,
            // order_id: !!parsed.order_id,
            order_id: false,
            showTimeError: false,
            showAddressError: false,
            couponCode: '',
            couponId: '',
            scrollPosition: '',
            profileDataFilled: true,
            is_cashback: false,
            use_wallet: true,
            showPincodePopup: false,
            cart_item: parsed.cart_item,
            pincode: this.props.pincode,
            whatsapp_optin: true,
            pincodeMismatchError: false,
            showConfirmationPopup: false,
            coupon_loading: false,
            seoFriendly: this.props.match.url.includes('-lpp')
        }
    }

    toggle(which) {
        this.setState({ [which]: !this.state[which] })
    }

    toggleWalletUse(e) {
        this.setState({ use_wallet: e.target.checked })
    }

    componentDidMount() {
        /*
                if (!STORAGE.checkAuth()) {
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
        let patient = null
        if (this.props.selectedProfile && this.props.profiles && this.props.profiles[this.props.selectedProfile] && !this.props.profiles[this.props.selectedProfile].isDummyUser) {
            patient = this.props.profiles[this.props.selectedProfile]
            this.setState({ profileDataFilled: true })
        }
        /*if (document.getElementById('time-patient-details-widget')) {
            var elementTop = document.getElementById('time-patient-details-widget').getBoundingClientRect().top;
            var elementHeight = document.getElementById('time-patient-details-widget').clientHeight;
            var scrollPosition = elementTop - elementHeight;
            this.setState({ scrollPosition: scrollPosition });
        }*/
    }

    componentWillReceiveProps(nextProps) {
        /*if (!STORAGE.checkAuth()) {
            return
        }*/

        if (nextProps.LABS[this.props.selectedLab] && nextProps.LABS[this.props.selectedLab].tests && nextProps.LABS[this.props.selectedLab].tests.length == 0) {
            this.props.resetLabCoupons()
            return
        }
        if (nextProps.LABS[this.props.selectedLab] && nextProps.LABS[this.props.selectedLab].tests && nextProps.LABS[this.props.selectedLab].tests.length) {

            // bases cases
            if (this.props.LABS[this.props.selectedLab] && nextProps.LABS[this.props.selectedLab].tests == this.props.LABS[this.props.selectedLab].tests && nextProps.selectedAppointmentType == this.props.selectedAppointmentType) {
                return
            }

            // remove corporate coupon if tests are not valid
            if (nextProps.corporateCoupon) {
                let corporate = true
                nextProps.LABS[this.props.selectedLab].tests.map((twp, i) => {
                    if (!twp.hide_price) {
                        corporate = false
                    }
                })

                if (!corporate) {
                    this.props.resetLabCoupons()
                    this.setState({ couponCode: "", couponId: '', is_cashback: false })
                    if (nextProps.labCoupons[this.props.selectedLab]) {
                        this.props.removeLabCoupons(this.props.selectedLab, nextProps.corporateCoupon.coupon_id)
                    }
                    this.props.setCorporateCoupon(null)
                    return
                }
            }

            // if corporateCoupon is set, apply that, leave rest
            if (nextProps.corporateCoupon) {
                if (this.props.LABS[this.props.selectedLab] != nextProps.LABS[this.props.selectedLab] || this.props.selectedAppointmentType != nextProps.selectedAppointmentType) {
                    let { finalPrice, test_ids } = this.getLabPriceData(nextProps)

                    let labCoupon = nextProps.corporateCoupon
                    this.setState({ is_cashback: labCoupon.is_cashback, couponCode: labCoupon.code, couponId: labCoupon.coupon_id || '' })
                    this.props.applyCoupons('2', labCoupon, labCoupon.coupon_id, this.props.selectedLab)
                    this.props.applyLabCoupons('2', labCoupon.code, labCoupon.coupon_id, this.props.selectedLab, finalPrice, test_ids, nextProps.selectedProfile, this.state.cart_item)
                }
                return
            }

            // if coupon already applied just set discount price.
            if (nextProps.labCoupons[this.props.selectedLab] && nextProps.labCoupons[this.props.selectedLab].length) {
                if (this.props.LABS[this.props.selectedLab] != nextProps.LABS[this.props.selectedLab] || this.props.selectedAppointmentType != nextProps.selectedAppointmentType) {
                    let { finalPrice, test_ids } = this.getLabPriceData(nextProps)

                    let labCoupons = nextProps.labCoupons[this.props.selectedLab]
                    this.props.applyLabCoupons('2', labCoupons[0].code, labCoupons[0].coupon_id, this.props.selectedLab, finalPrice, test_ids, nextProps.selectedProfile, this.state.cart_item, (err, data) => {
                        if (!err) {
                            this.setState({ is_cashback: labCoupons[0].is_cashback, couponCode: labCoupons[0].code, couponId: labCoupons[0].coupon_id || '' })
                        } else {
                            this.setState({ coupon_loading: true })
                            this.getAndApplyBestCoupons(nextProps)
                        }
                    })
                }
                return
            }

            // if no coupon is applied
            if (!nextProps.labCoupons[this.props.selectedLab] || (nextProps.labCoupons[this.props.selectedLab] && nextProps.labCoupons[this.props.selectedLab].length == 0)) {
                this.getAndApplyBestCoupons(nextProps)
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

    getAndApplyBestCoupons(nextProps) {
        if (nextProps.couponAutoApply) {
            let { finalPrice, test_ids } = this.getLabPriceData(nextProps)

            this.props.getCoupons({
                productId: 2, deal_price: finalPrice, lab_id: this.props.selectedLab, test_ids: test_ids, profile_id: nextProps.selectedProfile, cart_item: this.state.cart_item,
                cb: (coupons) => {
                    if (coupons) {
                        let validCoupon = this.getValidCoupon(coupons)
                        if (validCoupon) {
                            this.props.applyCoupons('2', validCoupon, validCoupon.coupon_id, this.props.selectedLab)
                            this.props.applyLabCoupons('2', validCoupon.code, validCoupon.coupon_id, this.props.selectedLab, finalPrice, test_ids, this.props.selectedProfile, this.state.cart_item)
                            this.setState({ is_cashback: validCoupon.is_cashback, couponCode: validCoupon.code, couponId: validCoupon.coupon_id || '' })
                        } else {
                            this.props.resetLabCoupons()
                            this.setState({ couponCode: "", couponId: '', is_cashback: false })
                        }
                    } else {
                        this.props.resetLabCoupons()
                        this.setState({ couponCode: "", couponId: '', is_cashback: false })
                    }
                    this.setState({ coupon_loading: false })
                }
            })
        } else {
            this.setState({ coupon_loading: false })
        }
    }

    getLabPriceData(nextProps) {
        let is_home_collection_enabled = true
        let finalPrice = 0
        let test_ids = []

        nextProps.LABS[this.props.selectedLab].tests.map((twp, i) => {
            test_ids.push(twp.test_id)
            let price = twp.deal_price
            if (!twp.is_home_collection_enabled) {
                is_home_collection_enabled = false
            }
            finalPrice += parseFloat(price)
        })

        if (is_home_collection_enabled && nextProps.selectedAppointmentType == 'home') {
            finalPrice = finalPrice + (nextProps.LABS[this.props.selectedLab].lab.home_pickup_charges || 0)
        }

        return { finalPrice, test_ids }
    }

    openTests() {
        if (this.state.seoFriendly) {
            let url = `${window.location.pathname}?lab_id=${this.props.selectedLab}&action_page=tests`
            this.props.history.push(url)
        } else {
            this.props.history.push(`/lab/${this.state.selectedLab}/tests`)
        }
    }

    handlePickupType(e) {
        //always clear selected time at lab profile
        let slot = { time: {} }
        this.props.selectLabTimeSLot(slot, false)
        this.props.selectLabAppointmentType(e.target.value)
        this.setState({ showTimeError: false, showAddressError: false });
    }

    navigateTo(where, is_insurance_applicable, e) {
        switch (where) {
            case "time": {
                if (this.state.pincode || (this.props.LABS[this.props.selectedLab] && this.props.LABS[this.props.selectedLab].lab && !this.props.LABS[this.props.selectedLab].lab.is_thyrocare)) {

                    if (this.props.LABS[this.props.selectedLab].lab.is_thyrocare) {
                        if (this.state.seoFriendly) {
                            let url = `${window.location.pathname}?lab_id=${this.props.selectedLab}&type=${this.props.selectedAppointmentType}&goback=true&is_thyrocare=true&action_page=timings&is_insurance=${is_insurance_applicable}`
                            this.props.history.push(url)
                        } else {
                            this.props.history.push(`/lab/${this.props.selectedLab}/timeslots?type=${this.props.selectedAppointmentType}&goback=true&is_thyrocare=true&is_insurance=${is_insurance_applicable}`)
                        }
                    } else {
                        if (this.state.seoFriendly) {
                            let url = `${window.location.pathname}?lab_id=${this.props.selectedLab}&type=${this.props.selectedAppointmentType}&goback=true&is_thyrocare=false&action_page=timings&is_insurance=${is_insurance_applicable}`
                            this.props.history.push(url)
                        } else {
                            this.props.history.push(`/lab/${this.props.selectedLab}/timeslots?type=${this.props.selectedAppointmentType}&goback=true&is_thyrocare=false&is_insurance=${is_insurance_applicable}`)
                        }
                    }

                    return
                } else {
                    this.setState({ showPincodePopup: true })
                    return
                }

            }

            case "patient": {
                this.props.history.push(`/user/family?pick=true&lab_id=${this.props.match.params.id}&is_insurance=${is_insurance_applicable}`)
                return
            }

            case "address": {
                if (this.props.address && this.props.address.length) {
                    this.props.history.push(`/user/address?pick=true`)
                } else {
                    this.props.history.push(`/user/address/add`)
                }
                return
            }
        }
    }

    getSelectors(is_insurance_applicable) {
        let patient = null
        if (this.props.profiles[this.props.selectedProfile] && !this.props.profiles[this.props.selectedProfile].isDummyUser) {
            patient = this.props.profiles[this.props.selectedProfile]
        }

        switch (this.props.selectedAppointmentType) {
            case "lab": {
                return <div>
                    <VisitTimeNew type="lab" navigateTo={this.navigateTo.bind(this)} selectedSlot={this.props.selectedSlot} timeError={this.state.showTimeError} {...this.props} selectedLab={this.props.selectedLab} toggle={this.toggle.bind(this, 'showPincodePopup')} is_insurance_applicable={is_insurance_applicable} />
                    <ChoosePatientNewView is_corporate={!!this.props.corporateCoupon} patient={patient} navigateTo={this.navigateTo.bind(this)} profileDataCompleted={this.profileDataCompleted.bind(this)} {...this.props} is_lab={true} clearTestForInsured={this.clearTestForInsured.bind(this)} is_insurance_applicable={is_insurance_applicable} checkPrescription={this.checkPrescription.bind(this)} />
                </div>
            }

            case "home": {
                return <div>
                    <VisitTimeNew type="home" navigateTo={this.navigateTo.bind(this)} selectedSlot={this.props.selectedSlot} timeError={this.state.showTimeError} {...this.props} selectedLab={this.props.selectedLab} toggle={this.toggle.bind(this, 'showPincodePopup')} is_insurance_applicable={is_insurance_applicable} />
                    <ChoosePatientNewView is_corporate={!!this.props.corporateCoupon} patient={patient} navigateTo={this.navigateTo.bind(this)} profileDataCompleted={this.profileDataCompleted.bind(this)} {...this.props} is_lab={true} clearTestForInsured={this.clearTestForInsured.bind(this)} is_insurance_applicable={is_insurance_applicable} checkPrescription={this.checkPrescription.bind(this)} />
                    {
                        patient ?
                            <PickupAddress {...this.props} navigateTo={this.navigateTo.bind(this, 'address')} addressError={this.state.showAddressError} />
                            : ''
                    }
                </div>
            }
        }
    }

    profileDataCompleted(data) {
        if (data.name == '' || data.gender == '' || data.phoneNumber == '' || data.email == '' || !data.otpVerifySuccess) {
            this.props.patientDetails(data)
            this.setState({ profileDataFilled: false })
        } else if (data.otpVerifySuccess) {
            let clear_data = {}
            this.props.patientDetails(clear_data)
            this.setState({ profileDataFilled: true })
        }
    }

    checkPrescription() {
        let is_insurance_applicable = false
        let is_tests_covered_under_insurance = false
        let is_selected_user_insured = false

        let data = {}
        let selectedDate = null
        let selected_test_id = []
        const parsed = queryString.parse(this.props.location.search)
        let patient = null
        let profile = null
        
        if (this.props.profiles[this.props.selectedProfile] && !this.props.profiles[this.props.selectedProfile].isDummyUser) {
            patient = this.props.profiles[this.props.selectedProfile]
            is_selected_user_insured = this.props.profiles[this.props.selectedProfile].is_insured
            profile = patient.id
        }
        is_tests_covered_under_insurance = true
        this.props.LABS[this.props.selectedLab].tests.map((test, i) => {

            if (test.insurance && test.insurance.is_insurance_covered && test.insurance.insurance_threshold_amount >= parseInt(test.deal_price)) {

            } else {
                is_tests_covered_under_insurance = false
            }
        })
        is_insurance_applicable = is_tests_covered_under_insurance && is_selected_user_insured
        
        // in case of upload prescription
        if (is_insurance_applicable) {
            if (this.props.selectedCriterias && this.props.selectedCriterias.length > 0) {
                this.props.selectedCriterias.map((twp, i) => {
                    selected_test_id.push(twp.id)
                })
            }
            data.start_date = selectedDate ? selectedDate : this.props.selectedSlot && this.props.selectedSlot.date ? this.props.selectedSlot.date : new Date()
            data.lab_test = selected_test_id
            data.lab = this.props.selectedLab
            data.profile = profile
            this.props.preBooking(data)
        }
    }

    proceed(testPicked, addressPicked, datePicked, patient, addToCart, total_price, total_wallet_balance, prescriptionPicked, e) {

        if (!testPicked) {
            SnackBar.show({ pos: 'bottom-center', text: "Please select some tests." });
            return
        }

        if (!datePicked) {
            this.setState({ showTimeError: true });
            SnackBar.show({ pos: 'bottom-center', text: "Please pick a time slot." });

            window.scrollTo(0, 0)// this.state.scrollPosition);

            return
        }

        if (!patient) {
            SnackBar.show({ pos: 'bottom-center', text: "Please Add Patient" });
            window.scrollTo(0, 0)
            return
        }
        if (!addressPicked) {
            this.setState({ showAddressError: true });
            SnackBar.show({ pos: 'bottom-center', text: "Please pick an address." });

            window.scrollTo(0, 0)//this.state.scrollPosition);

            return
        }

        if (addressPicked && this.props.LABS[this.props.selectedLab] && this.props.LABS[this.props.selectedLab].lab && this.props.LABS[this.props.selectedLab].lab.is_thyrocare) {

            let validateAddressPincode = false
            if (this.props.address && this.props.address.length) {
                let selectedAddressPincode = this.props.address.filter(x => x.id == this.props.selectedAddress).map(x => x.pincode)

                if (selectedAddressPincode.length && parseInt(selectedAddressPincode[0]) == parseInt(this.state.pincode)) {
                    validateAddressPincode = true
                }
            }

            if (!validateAddressPincode) {
                this.setState({ pincodeMismatchError: true })
                window.scrollTo(0, 0)
                return
            }
        }

        if (!this.state.profileDataFilled) {
            SnackBar.show({ pos: 'bottom-center', text: "Please fill the info" });
            return
        }
        if (e.target.dataset.disabled == true) {
            return
        }

        // React guarantees that setState inside interactive events (such as click) is flushed at browser event boundary
        if (this.state.loading) {
            return
        }

        let is_insurance_applicable = false
        let is_tests_covered_under_insurance = false
        let is_selected_user_insured = false

        if (this.props.profiles[this.props.selectedProfile] && !this.props.profiles[this.props.selectedProfile].isDummyUser) {
            is_selected_user_insured = this.props.profiles[this.props.selectedProfile].is_insured
        }

        let is_plan_applicable = false
        let is_tests_covered_under_plan = true
        let is_selected_user_has_active_plan = false

        if (this.props.isUserCared && this.props.isUserCared.has_active_plan) {
            is_selected_user_has_active_plan = this.props.isUserCared.has_active_plan
        }

        //Check If each Tests Covered Under Plan
        //Check If each Tests Covered Under Insurance

        if (this.props.LABS[this.props.selectedLab] && this.props.LABS[this.props.selectedLab].tests && this.props.LABS[this.props.selectedLab].tests.length) {

            is_tests_covered_under_insurance = true
            this.props.LABS[this.props.selectedLab].tests.map((test, i) => {

                if (test.insurance && test.insurance.is_insurance_covered && test.insurance.insurance_threshold_amount >= parseInt(test.deal_price)) {

                } else {
                    is_tests_covered_under_insurance = false
                }

                if (test.included_in_user_plan) {

                } else {
                    is_tests_covered_under_plan = false
                }
            })

        }


        is_insurance_applicable = is_tests_covered_under_insurance && is_selected_user_insured

        is_plan_applicable = is_tests_covered_under_plan && is_selected_user_has_active_plan
        let prescriptionIds = []
        if (prescriptionPicked && is_insurance_applicable) {
            if (this.props.user_prescriptions && this.props.user_prescriptions.length == 0) {
                SnackBar.show({ pos: 'bottom-center', text: "Please upload prescription." });
                return
            } else if (this.props.user_prescriptions && this.props.user_prescriptions.length > 0) {
                this.props.user_prescriptions[0].img_path_ids.map((imgId, i) => {
                    prescriptionIds.push({ 'prescription': imgId.id })
                })
            }
        }
        if (!this.state.showConfirmationPopup && !addToCart && (total_price == 0 || (this.state.use_wallet && total_wallet_balance > 0))) {
            this.setState({ showConfirmationPopup: true })
            return
        }

        this.setState({ loading: true, error: "" })

        let start_date = this.props.selectedSlot.date
        let start_time = this.props.selectedSlot.time.value
        let testIds = this.props.lab_test_data[this.props.selectedLab] || []
        testIds = testIds.map(x => x.id)

        let postData = {
            lab: this.props.selectedLab,
            test_ids: testIds,
            profile: this.props.selectedProfile,
            start_date, start_time, is_home_pickup: this.props.selectedAppointmentType == 'home', address: this.props.selectedAddress,
            payment_type: 1, // TODO : Select payment type
            use_wallet: this.state.use_wallet,
            cart_item: this.state.cart_item,
            prescription_list: prescriptionIds
        }
        let profileData = { ...patient }
        if (profileData && profileData.whatsapp_optin == null) {
            profileData['whatsapp_optin'] = this.state.whatsapp_optin
            this.props.editUserProfile(profileData, profileData.id)
        }
        if (this.props.disCountedLabPrice && !is_plan_applicable && !is_insurance_applicable) {
            postData['coupon_code'] = this.state.couponCode ? [this.state.couponCode] : []
        }

        //Post Pincode & thyrocare data
        if (this.props.LABS[this.props.selectedLab] && this.props.LABS[this.props.selectedLab].lab && this.props.LABS[this.props.selectedLab].lab.is_thyrocare) {

            let pincode = this.state.pincode
            postData['pincode'] = pincode.toString() || ""
            postData['is_thyrocare'] = true

        } else {
            postData['pincode'] = ""
            postData['is_thyrocare'] = false

        }


        if (addToCart) {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'LabAddToCartClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-add-to-cart-clicked'
            }

            GTM.sendEvent({ data: data })
            this.props.addToCart(2, postData).then((res) => {
                if (!this.state.cart_item) {
                    this.props.clearExtraTests()
                }

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

        let data = {
            'Category': 'ConsumerApp', 'Action': 'LabProceedClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-proceed-clicked'
        }

        GTM.sendEvent({ data: data })

        data = {
            'Category': 'ConsumerApp', 'Action': 'AppointmentType', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'appointment-type', 'appointmentType': this.props.selectedAppointmentType || ''
        }

        GTM.sendEvent({ data: data })


        let analyticData = {
            'Category': 'ConsumerApp', 'Action': 'LabConfirmBookingClicked', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'lab-confirm-booking-clicked'
        }
        GTM.sendEvent({ data: analyticData })
        this.props.createLABAppointment(postData, (err, data) => {
            if (!err) {
                this.props.removeLabCoupons(this.props.selectedLab, this.state.couponId)
                if (this.props.user_prescriptions && this.props.user_prescriptions.length > 0) {
                    this.props.clearPrescriptions()
                }
                if (data.is_agent) {
                    // this.props.history.replace(this.props.location.pathname + `?order_id=${data.data.orderId}`)
                    this.setState({ order_id: data.data.orderId })
                    return
                }
                if (data.payment_required) {
                    // send to payment selection page
                    let analyticData = {
                        'Category': 'ConsumerApp', 'Action': 'LabOrderCreated', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'lab_order_created'
                    }
                    GTM.sendEvent({ data: analyticData })
                    this.props.history.push(`/payment/${data.data.orderId}?refs=lab`)

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
        if (!this.props.corporateCoupon) {
            let analyticData = {
                'Category': 'ConsumerApp', 'Action': 'LabCouponsClicked', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'lab-coupons-clicked'
            }
            GTM.sendEvent({ data: analyticData })

            let test_ids = []
            this.props.LABS[this.props.selectedLab].tests.map((twp, i) => {
                test_ids.push(twp.test_id)
            })

            let { finalPrice } = this.getLabPriceData(this.props)

            this.props.history.push(`/coupon/lab/${this.props.selectedLab}/coupons?test_ids=${test_ids}&deal_price=${finalPrice}&cart_item=${this.state.cart_item || ""}`)
        }
    }

    closeErrorPopup = () => {
        this.setState({ error: '' })
    }

    getBookingButtonText(total_wallet_balance, price_to_pay) {
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

    setPincode(pincode) {
        this.props.savePincode(pincode)
        let slot = { time: {} }
        this.props.selectLabTimeSLot(slot, false)
        this.setState({ showPincodePopup: false, pincode: pincode }, () => {
            this.navigateTo('time')
        })
    }

    clickPincodeErrrorPopUp(type) {
        if (type == 1) {
            this.setState({ pincodeMismatchError: false, showPincodePopup: true }, () => {
            })
        } else {
            this.props.history.push('/user/address?pick=true')
        }
    }

    goToProfile(id, url) {
        if (url) {
            this.props.history.push(`/${url}`)
        } else {
            this.props.history.push(`/lab/${id}`)
        }
    }

    toggleWhatsap(status, e) {
        this.setState({ whatsapp_optin: status })
    }

    clearTestForInsured() {
        if (this.props.defaultProfile && this.props.profiles[this.props.defaultProfile] && this.props.profiles[this.props.defaultProfile].is_insured) {

            this.props.clearExtraTests()
            this.props.getLabById(this.props.selectedLab)
            return
        }
    }

    searchTests() {
        this.props.selectSearchType('lab')
        this.props.history.push('/search')
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

    goToInsurance(labDetail) {
        let data = {}
        data.thumbnail = labDetail.lab_thumbnail
        data.name = labDetail.name
        data.id = labDetail.id
        data.type = 'lab'
        this.props.saveAvailNowInsurance(data)
        this.props.history.push('/insurance/insurance-plans?source=doctor-summary-view&show_button=true')
    }

    render() {
        let tests = []
        let tests_with_price = []
        let finalPrice = 0
        let finalMrp = 0
        let home_pickup_charges = 0
        let labDetail = {}
        let patient = null
        let is_home_collection_enabled = true
        let address_picked_verified = false
        let center_visit_enabled = true
        let is_corporate = false
        let prescriptionPicked = false

        let is_insurance_applicable = false
        let is_tests_covered_under_insurance = false
        let is_selected_user_insured = false
        let is_default_user_insured = false

        let is_plan_applicable = false
        let is_tests_covered_under_plan = true
        let is_selected_user_has_active_plan = false
        let is_insurance_buy_able = false
        if (this.props.profiles[this.props.selectedProfile] && !this.props.profiles[this.props.selectedProfile].isDummyUser) {
            patient = this.props.profiles[this.props.selectedProfile]
            is_selected_user_insured = this.props.profiles[this.props.selectedProfile].is_insured

        }

        if (this.props.is_prescription_needed) {
            prescriptionPicked = true
        }
        if (this.props.defaultProfile && this.props.profiles[this.props.defaultProfile]) {
            is_default_user_insured = this.props.profiles[this.props.defaultProfile].is_insured
        }


        //Check If each Tests Covered Under Insurance
        if (this.props.isUserCared && this.props.isUserCared.has_active_plan) {
            is_selected_user_has_active_plan = this.props.isUserCared.has_active_plan
        }

        //Check If each Tests Covered Under Plan

        if (this.props.LABS[this.props.selectedLab] && this.props.LABS[this.props.selectedLab].tests && this.props.LABS[this.props.selectedLab].tests.length) {
            is_tests_covered_under_insurance = true

            this.props.LABS[this.props.selectedLab].tests.map((test, i) => {

                if (test.insurance && test.insurance.is_insurance_covered && test.insurance.insurance_threshold_amount >= parseInt(test.deal_price)) {

                } else {
                    is_tests_covered_under_insurance = false

                }

                if (test.included_in_user_plan) {

                } else {
                    is_tests_covered_under_plan = false
                }
            })

        }
        is_insurance_applicable = is_tests_covered_under_insurance && is_selected_user_insured
        
        if(is_tests_covered_under_insurance && !is_selected_user_insured){
            is_insurance_buy_able = true
        }
        is_plan_applicable = is_tests_covered_under_plan && is_selected_user_has_active_plan

        if (this.props.LABS[this.props.selectedLab]) {
            labDetail = this.props.LABS[this.props.selectedLab].lab

            // if(labDetail.is_prescription_needed){
            //     prescriptionPicked = labDetail.is_prescription_needed    
            // }
            this.props.LABS[this.props.selectedLab].tests.map((twp, i) => {
                if (twp.hide_price) {
                    is_corporate = true
                }
                let price = twp.deal_price
                let mrp = twp.mrp
                // check if any of the selected test does not allow home_pickup_available
                if (!twp.is_home_collection_enabled) {
                    is_home_collection_enabled = false
                }
                finalPrice += parseFloat(price)
                finalMrp += parseFloat(mrp)

                tests.push(
                    <p key={i} className="test-list test-list-label clearfix new-lab-test-list">
                        {/*
                        is_corporate || is_insurance_applicable || is_plan_applicable ?
                        <span className="float-right fw-700">₹ 0 </span>
                        :
                        price == twp.mrp ?
                        <span className="float-right fw-700">&#8377; {price}</span>
                        :
                        <span className="float-right fw-700">&#8377; {price}<span className="test-mrp">₹ {parseFloat(twp.mrp)}</span>
                        </span>
                    */}
                        <span className="test-name-item">{twp.test.name}</span>
                        {
                            is_plan_applicable ?
                                <p className="pkg-discountCpn" style={{ display: 'inline-block', float: 'right', marginTop: '5px' }}>Docprime Care Benefit</p>
                                : ''
                        }
                    </p>)

                tests_with_price.push(
                    <div className="payment-detail d-flex">
                        <p>{twp.test.name}</p>
                        {
                            is_corporate || is_insurance_applicable || is_plan_applicable ?
                                <p>&#8377; 0</p>
                                :
                                price == twp.mrp ?
                                    <p>&#8377; {price}</p>
                                    :
                                    <p>&#8377; {parseFloat(twp.mrp)}</p>
                        }
                    </div>
                )
            })
            center_visit_enabled = labDetail.center_visit_enabled

        }

        // if center visi not enabled, check home pick as true
        if (!center_visit_enabled) {
            setTimeout(() => {
                this.props.selectLabAppointmentType('home')
            })
        } else {
            // if home pickup not available but selected type is home , then change in next iteration
            if (!is_home_collection_enabled && this.props.selectedAppointmentType == 'home') {
                // using timeout to skip this render iteration
                setTimeout(() => {
                    this.props.selectLabAppointmentType('lab')
                })
            }
        }

        // check if the picked address is correct or not
        if (this.props.selectedAppointmentType == 'home') {
            if (this.props.address && this.props.address.length && this.props.selectedAddress) {
                this.props.address.map((add) => {
                    if (add.id == this.props.selectedAddress) {
                        address_picked_verified = true
                    }
                })
            }
        }

        let labCoupons = this.props.labCoupons[this.props.selectedLab] || []

        let amtBeforeCoupon = 0
        let total_price = finalPrice
        if (is_home_collection_enabled && this.props.selectedAppointmentType == 'home' && finalPrice) {
            total_price = finalPrice + (labDetail.home_pickup_charges || 0)
        }
        amtBeforeCoupon = total_price

        if (!this.state.is_cashback) {
            total_price = total_price ? parseInt(total_price) - (this.props.disCountedLabPrice || 0) : 0
        }
        total_price = is_corporate || is_insurance_applicable || is_plan_applicable ? 0 : total_price
        let total_wallet_balance = 0
        if (this.props.userWalletBalance >= 0 && this.props.userCashbackBalance >= 0) {
            total_wallet_balance = this.props.userWalletBalance + this.props.userCashbackBalance
        }

        let is_add_to_card = STORAGE.isAgent() || this.state.cart_item || (!is_corporate && !is_default_user_insured)
        return (

            <div className="profile-body-wrap">
                <ProfileHeader bookingPage={true} />
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
                                this.props.LABS[this.props.selectedLab] ?
                                    <div>
                                        <section className="dr-profile-screen booking-confirm-screen">
                                            <div className="container-fluid">
                                                <div className="row mrb-20">
                                                    <div className="col-12">
                                                        <div className="widget mrb-15 mrng-top-12" onClick={this.goToProfile.bind(this, this.props.selectedLab, labDetail.url)} style={{ cursor: 'pointer' }}>
                                                            <div className="widget-content">
                                                                <div className="lab-visit-time d-flex jc-spaceb">
                                                                    <h4 className="title d-flex"><span>
                                                                        <img style={{ width: '22px', marginRight: '8px' }} src={ASSETS_BASE_URL + "/img/hospital.svg"} />
                                                                    </span>
                                                                        <p className="lab-crd-txt-pr">{labDetail.name}
                                                                            <span>{labDetail.address || ''}</span></p></h4>
                                                                    {/*<div className="float-right  mbl-view-formatting text-right">
                                                                        <a href="" style={{ width: '100px', display: 'inline-block' }} onClick={(e) => {
                                                                            e.preventDefault()
                                                                            e.stopPropagation()
                                                                            this.goToProfile(this.props.selectedLab, labDetail.url)
                                                                        }} className="text-primary fw-700 text-sm">View Profile</a>

                                                                    </div>*/}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="widget mrb-15">
                                                            <div className="widget-content">
                                                                <div className="lab-visit-time d-flex jc-spaceb">
                                                                    <h4 className="title d-flex"><span>
                                                                        <img style={{ width: '22px', marginRight: '8px' }} src={ASSETS_BASE_URL + "/img/flask.svg"} />
                                                                    </span>Test</h4>
                                                                    <div className="float-right  mbl-view-formatting text-right">
                                                                        {
                                                                            STORAGE.isAgent() || (!is_default_user_insured && !is_corporate) ?
                                                                                <a style={{ cursor: 'pointer' }} onClick={this.openTests.bind(this)} className="text-primary fw-700 text-sm">Add more/Remove tests</a>
                                                                                : ''
                                                                        }
                                                                        {
                                                                            this.props.LABS[this.props.selectedLab].tests && !this.props.LABS[this.props.selectedLab].tests.length && is_default_user_insured ?
                                                                                <a style={{ cursor: 'pointer' }} onClick={this.searchTests.bind(this)} className="text-primary fw-700 text-sm">Search tests</a>
                                                                                : ''
                                                                        }
                                                                    </div>
                                                                </div>
                                                                {tests}
                                                                <div>
                                                                    <div className="">
                                                                        <div className="test-lab-radio widget-content test-report lab-appointment-div row">

                                                                            <ul className="inline-list booking-type search-list-radio">
                                                                                {
                                                                                    is_home_collection_enabled ?
                                                                                        <li><input type="radio" id="home" name="radio-group" onChange={this.handlePickupType.bind(this)} value="home" checked={this.props.selectedAppointmentType == 'home'} /><label className="radio-inline lab-appointment-label text-md fw-500 text-primary" htmlFor="home"> Home Pick-up</label></li> : ""
                                                                                }

                                                                                {
                                                                                    center_visit_enabled ? <li><input type="radio" id="lab" name="radio-group" onChange={this.handlePickupType.bind(this)} value="lab" checked={this.props.selectedAppointmentType == 'lab'} /> <label className="radio-inline lab-appointment-label text-md fw-500 text-primary" htmlFor="lab">Lab Visit</label></li> : ""
                                                                                }
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="">
                                                            {this.getSelectors(is_insurance_applicable)}
                                                        </div>
                                                        {
                                                            is_insurance_applicable && prescriptionPicked ?
                                                                <UploadPrescription {...this.props} />
                                                                : ''
                                                        }
                                                        {
                                                            amtBeforeCoupon != 0 && !is_plan_applicable && !is_insurance_applicable ?
                                                                <div className="widget mrb-15" onClick={this.applyCoupons.bind(this)}>
                                                                    {
                                                                        labCoupons.length ?
                                                                            <div className="widget-content  d-flex jc-spaceb" >
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
                                                                                        {labCoupons[0].code}
                                                                                    </h4>
                                                                                    {
                                                                                        is_corporate ? "" : <span className="visit-time-icon coupon-icon"><img onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            let analyticData = {
                                                                                                'Category': 'ConsumerApp', 'Action': 'LabCouponsRemoved', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'lab-coupons-removed', 'couponId': labCoupons[0].coupon_id
                                                                                            }
                                                                                            GTM.sendEvent({ data: analyticData })
                                                                                            this.setState({ couponCode: '', couponId: '' })
                                                                                            this.props.removeLabCoupons(this.props.selectedLab, labCoupons[0].coupon_id)
                                                                                        }} src={ASSETS_BASE_URL + "/img/customer-icons/cross.svg"} />
                                                                                        </span>
                                                                                    }
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
                                                                                            <img src={ASSETS_BASE_URL + "/img/ofr-cpn.svg"} className="visit-time-icon" />
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

                                                        {is_insurance_buy_able ?
                                                            <div className="widget mrb-15">
                                                                <div className="widget-content">
                                                                    <div className="d-flex justify-content-between align-items-sm-center">
                                                                        <div className="opd-ins-title-sub">
                                                                            <h4 className="title coupon-text">Get OPD Insurance & book for <span>FREE</span></h4>
                                                                            <p>Book Unlimited Doctors and Lab Tests</p>
                                                                        </div>
                                                                        <div>
                                                                            <span className="opd-ins-avl" onClick={this.goToInsurance.bind(this, labDetail)}>Avail Now <img src={ASSETS_BASE_URL +  '/img/right-sc.svg'}/></span>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            : ''}

                                                        {
                                                            is_corporate ? ""
                                                                : <div className="widget mrb-15">

                                                                    <div className="widget-content clearfix">
                                                                        <h4 className="title mb-20">Payment Summary</h4>
                                                                        {

                                                                            is_plan_applicable || is_insurance_applicable ?
                                                                                <div className="payment-summary-content">
                                                                                    <div className="payment-detail d-flex">
                                                                                        <p className="payment-content fw-500">Subtotal</p>
                                                                                        <p className="payment-content fw-500">&#8377; {total_price || 0}</p>
                                                                                    </div>
                                                                                </div>
                                                                                :
                                                                                <div className="payment-summary-content">
                                                                                    {tests_with_price}
                                                                                    {
                                                                                        (total_price && is_home_collection_enabled && this.props.selectedAppointmentType == 'home') ? <div className="payment-detail d-flex">
                                                                                            <p className="payment-content">Home Pickup Charges</p>
                                                                                            <p className="payment-content fw-500">&#8377; {labDetail.home_pickup_charges || 0}</p>
                                                                                        </div> : ""
                                                                                    }
                                                                                    <div className="payment-detail d-flex">
                                                                                        <p>Docprime Discount</p>
                                                                                        <p>- &#8377; {finalMrp - finalPrice}</p>
                                                                                    </div>
                                                                                    {
                                                                                        this.props.disCountedLabPrice && !this.state.is_cashback
                                                                                            ? <div className="payment-detail d-flex">
                                                                                                <p style={{ color: 'green' }}>Coupon Discount</p>
                                                                                                <p style={{ color: 'green' }}>-&#8377; {this.props.disCountedLabPrice}</p>
                                                                                            </div>
                                                                                            : ''
                                                                                    }
                                                                                    {
                                                                                        (is_home_collection_enabled && this.props.selectedAppointmentType == 'home') ? <div className="payment-detail d-flex">
                                                                                            <p className="payment-content fw-500">Subtotal</p>
                                                                                            <p className="payment-content fw-500">&#8377; {total_price || 0}</p>
                                                                                        </div> : <div className="payment-detail d-flex">
                                                                                                <p className="payment-content fw-500">Subtotal</p>
                                                                                                <p className="payment-content fw-500">&#8377; {total_price || 0}</p>
                                                                                            </div>
                                                                                    }
                                                                                </div>
                                                                        }
                                                                        <hr />

                                                                        <div className="lab-visit-time test-report">
                                                                            <h4 className="title payment-amt-label">Amount Payable</h4>
                                                                            {
                                                                                this.props.selectedAppointmentType == 'home' ? <h5 className="payment-amt-value fw-500">&#8377;  {total_price || 0}</h5> : <h5 className="payment-amt-value fw-500">&#8377;  {total_price || 0}</h5>
                                                                            }


                                                                        </div>

                                                                        {
                                                                            is_insurance_applicable ?
                                                                                <div className="ins-val-bx ins-vl-bx-o">Covered Under Insurance</div>
                                                                                : ''
                                                                        }

                                                                        {
                                                                            this.state.is_cashback && this.props.disCountedLabPrice ? <div className="csh-back-applied-container">
                                                                                <p className="csh-mny-applied">+ &#8377; {this.props.disCountedLabPrice} Cashback Applied</p>
                                                                                <p className="csh-mny-applied-content">Cashback will be added to your docprime wallet balance on appointment completion</p>
                                                                            </div> : ""
                                                                        }


                                                                    </div>
                                                                </div>
                                                        }


                                                        {
                                                            !is_insurance_applicable && total_wallet_balance && total_wallet_balance > 0 ? <div className="widget mrb-15">
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

                                                        <div className="mrt-20 d-flex align-items-start labTest-dtls">
                                                            <img src={ASSETS_BASE_URL + '/img/customer-icons/tick.svg'} style={{ marginRight: 8, width: 20, marginTop: 2 }} />
                                                            <p className="fw-500" style={{ flex: 1 }} >By continuing, you are authorizing Docprime to directly share lab test reports with you.</p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        {
                                            this.state.showPincodePopup ?
                                                <PincodePopup setPincode={this.setPincode.bind(this)} toggle={this.toggle.bind(this, 'showPincodePopup')} />
                                                : ''
                                        }

                                        {
                                            this.state.pincodeMismatchError ?
                                                <PincodeErrorPopup clickPopUp={this.clickPincodeErrrorPopUp.bind(this)} toggle={this.toggle.bind(this, 'pincodeMismatchError')} />
                                                : ''
                                        }

                                    </div> : <Loader />
                            }

                            {
                                this.state.openCancellation ? <CancelationPolicy props={this.props} toggle={this.toggle.bind(this, 'openCancellation')} /> : ""
                            }


                            <div className={`fixed sticky-btn p-0 v-btn  btn-lg horizontal bottom no-round text-lg buttons-addcart-container ${!is_add_to_card && this.props.ipd_chat && this.props.ipd_chat.showIpdChat ? 'ipd-foot-btn-duo' : ''}`}>
                                {
                                    STORAGE.isAgent() || this.state.cart_item || (!is_corporate && !is_default_user_insured) ?
                                        <button className={"add-shpng-cart-btn" + (!this.state.cart_item ? "" : " update-btn")} data-disabled={
                                            !(patient && this.props.selectedSlot && this.props.selectedSlot.date) || this.state.loading
                                        } onClick={this.proceed.bind(this, tests.length, (address_picked_verified || this.props.selectedAppointmentType == 'lab'), (this.props.selectedSlot && this.props.selectedSlot.date), patient, true, total_price, total_wallet_balance, prescriptionPicked)}>
                                            {
                                                this.state.cart_item ? "" : <img src={ASSETS_BASE_URL + "/img/cartico.svg"} />
                                            }
                                            {this.state.cart_item ? "Update" : "Add to Cart"}
                                        </button>
                                        : ''
                                }

                                {
                                    STORAGE.isAgent() || this.state.cart_item ? "" : <button className="v-btn-primary book-btn-mrgn-adjust pdd-12" id="confirm_booking" data-disabled={
                                        !(patient && this.props.selectedSlot && this.props.selectedSlot.date) || this.state.loading
                                    } onClick={this.proceed.bind(this, tests.length, (address_picked_verified || this.props.selectedAppointmentType == 'lab'), (this.props.selectedSlot && this.props.selectedSlot.date), patient, false, total_price, total_wallet_balance, prescriptionPicked)}>{this.getBookingButtonText(total_wallet_balance, total_price)}</button>
                                }
                            </div>

                            {
                                this.state.error ?
                                    <BookingError message={this.state.error} closeErrorPopup={this.closeErrorPopup} /> : ''
                            }

                        </div>

                        <RightBar extraClass=" chat-float-btn-2" type="lab" noChatButton={true} />
                    </div>
                </section>
            </div>

        );
    }
}


export default BookingSummaryViewNew
