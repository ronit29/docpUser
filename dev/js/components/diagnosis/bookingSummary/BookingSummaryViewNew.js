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
import PaymentForm from '../../commons/paymentForm'
import LensfitPopup from './lensfitPopup.js'
import Disclaimer from '../../commons/Home/staticDisclaimer.js'
import VipGoldPackage from '../../opd/patientDetails/VipGoldPackage.js'

class BookingSummaryViewNew extends React.Component {
    constructor(props) {
        super(props)

        const parsed = queryString.parse(this.props.location.search)
        let lab_id = this.props.selectedLab

        this.state = {
            selectedLab: lab_id,
            paymentData: null,
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
            showConfirmationPopup: 'close',
            coupon_loading: false,
            seoFriendly: this.props.match.url.includes('-lpp'),
            isEmailNotValid: false,
            is_payment_coupon_applied: false,
            is_spo_appointment: false,
            pay_btn_loading: true,
            isDobNotValid: false,
            show_lensfit_popup: false,
            lensfit_coupons: null,
            lensfit_decline: false,
            isLensfitSpecific: parsed.isLensfitSpecific || false,
            showGoldPriceList: false,
            selectedTestIds: [],
            selectedVipGoldPackageId: this.props.selected_vip_plan && Object.keys(this.props.selected_vip_plan).length ? this.props.selected_vip_plan.id : '',
            paymentBtnClicked: false,
            enableDropOfflead: true,
            disable_page: true,
            is_lead_enabled: true
        }
    }

    toggle(which) {
        this.setState({ [which]: !this.state[which] })
    }

    toggleWalletUse(e) {
        if (this.state.is_payment_coupon_applied) {
            this.setState({ use_wallet: false })
        } else {
            this.setState({ use_wallet: e.target.checked })
        }
    }

    componentDidMount() {
        /*
                if (!STORAGE.checkAuth()) {
                    return
                }*/

        if (window) {
            window.scrollTo(0, 0)
        }
        const parsed = queryString.parse(this.props.location.search)
        if (this.props.location.search.includes("error_code")) {
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Could not complete payment, Try again!" })
            }, 500)
            this.props.history.replace(this.props.location.pathname)
        }
        this.getVipGoldPriceList(this.props);
        if (this.props.selected_vip_plan && this.props.selected_vip_plan.id && (this.props.selected_vip_plan.id != this.state.selectedVipGoldPackageId)) {
            this.setState({ selectedVipGoldPackageId: this.props.selected_vip_plan.id })
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

        //Add UTM tags for building url
        try {
            if (parsed.utm_source && parsed.utm_source == 'OfflineAffiliate') {
                let sessionId = Math.floor(Math.random() * 103) * 21 + 1050
                if (sessionStorage) {
                    sessionStorage.setItem('sessionIdVal', sessionId)
                }
                let spo_tags = {
                    utm_tags: {
                        utm_source: parsed.utm_source || '',
                        utm_term: parsed.utm_term || '',
                        utm_medium: parsed.utm_medium || '',
                        utm_campaign: parsed.utm_campaign || ''
                    },
                    time: new Date().getTime(),
                    currentSessionId: sessionId
                }
                this.setState({ is_spo_appointment: true })
                this.props.setCommonUtmTags('spo', spo_tags)
            }
        } catch (e) {

        }

        //Clear Utm tags for SPO, after 15 minutes
        let currentTime = new Date().getTime()
        if (sessionStorage && sessionStorage.getItem('sessionIdVal') && this.props.common_utm_tags && this.props.common_utm_tags.length && this.props.common_utm_tags.filter(x => x.type == 'spo').length) {

            let spo_tags = this.props.common_utm_tags.filter(x => x.type == 'spo')[0]
            let sessionVal = parseInt(sessionStorage.getItem('sessionIdVal'))
            if (spo_tags.time && sessionVal == parseInt(spo_tags.currentSessionId)) {
                let time_offset = (currentTime - spo_tags.time) / 60000
                //Clear SPO utm tags after 15minutes
                //900
                if (time_offset > 180) {
                    this.props.unSetCommonUtmTags('spo')
                } else {
                    this.setState({ is_spo_appointment: true })
                }
            }
        }
        if (this.state.isLensfitSpecific) {
            setTimeout(() => {
                if (document.getElementById('confirm_booking')) {
                    document.getElementById('confirm_booking').click()
                }
            }, 3000)
        }
    }

    getVipGoldPriceList(props) {
        let parsed = queryString.parse(this.props.location.search)
        let test_ids = []
        if (props.LABS[props.selectedLab] && props.LABS[props.selectedLab].tests) {
            test_ids = props.LABS[props.selectedLab].tests.map(x => x.test_id)
        }
        this.setState({ selectedTestIds: test_ids });
        let extraParams = {
            "lab": props.selectedLab,
            "lab_tests": test_ids,
            "gold_vip_plan": []
        }
        if (this.props.selected_vip_plan && this.props.selected_vip_plan.id) {
            extraParams['already_selected_plan'] = this.props.selected_vip_plan.id
        }
        if (parsed && parsed.dummy_id && this.props.agent_selected_plan_id) {
            extraParams['already_selected_plan'] = this.props.agent_selected_plan_id
        }
        extraParams['payment_type'] = this.props.payment_type
        this.props.getLabVipGoldPlans(extraParams) // to get gold/vip plans specific to particular lab
    }

    componentWillReceiveProps(nextProps) {
        if (STORAGE.checkAuth()) {
            this.setState({ disable_page: false })
        }
        let isPickupStatusSame = false
        if (nextProps.selectedAppointmentType.r_pickup == this.props.selectedAppointmentType.r_pickup && nextProps.selectedAppointmentType.p_pickup == this.props.selectedAppointmentType.p_pickup) {
            isPickupStatusSame = true
        }
        //To update Gold Plans on changing props
        if (nextProps && nextProps.selected_vip_plan && nextProps.selected_vip_plan.id && (nextProps.selected_vip_plan.id != this.state.selectedVipGoldPackageId)) {
            this.setState({ selectedVipGoldPackageId: nextProps.selected_vip_plan.id })
        }
        /*if (this.state.enableDropOfflead && STORAGE.checkAuth()) {
            this.nonIpdLeads()
        }*/
        if (nextProps.LABS[this.props.selectedLab] && nextProps.LABS[this.props.selectedLab].tests && nextProps.LABS[this.props.selectedLab].tests.length == 0) {
            this.props.resetLabCoupons()
            this.setState({ 'pay_btn_loading': false })
            return
        }
        if (nextProps.LABS[this.props.selectedLab] && nextProps.LABS[this.props.selectedLab].tests && nextProps.LABS[this.props.selectedLab].tests.length) {
            // bases cases
            //To Check if any new Test Added

            let newTestsAdded = false
            nextProps.LABS[nextProps.selectedLab].tests.map((test) => {

                if (this.state.selectedTestIds.indexOf(test.test_id) == -1) {
                    newTestsAdded = true;
                }

            })

            if (newTestsAdded || (this.state.selectedTestIds.length != nextProps.LABS[this.props.selectedLab].tests.length)) {
                this.getVipGoldPriceList(nextProps)
            }

            //If after selecting time, user add more tests then for pathology test we have to force add the pathology timings 
            if (nextProps.selectedSlot && nextProps.selectedSlot.selectedTestsTimeSlot && Object.keys(nextProps.selectedSlot.selectedTestsTimeSlot).length && nextProps.LABS[this.props.selectedLab].tests.length) {

                let commonTestId = nextProps.selectedSlot['pathology'] ? nextProps.selectedSlot['pathology'].test_id : nextProps.selectedSlot['all'] ? nextProps.selectedSlot['all'].test_id : null

                let newTests = []
                nextProps.LABS[this.props.selectedLab].tests.map((test) => {

                    if (test.is_pathology) {
                        if (nextProps.selectedSlot.selectedTestsTimeSlot[test.test_id]) {

                        } else if (test.is_pathology) {
                            newTests.push(test)
                        }
                    }

                })

                if (commonTestId && newTests.length) {

                    let finalSelectedSlot = { ...nextProps.selectedSlot }
                    let testsObj = { ...finalSelectedSlot.selectedTestsTimeSlot }
                    if (newTests.length) {
                        newTests.map((x) => {
                            testsObj[x.test.id] = { ...testsObj[commonTestId], test_id: x.test.id, test_name: x.test.name }
                        })
                        finalSelectedSlot['selectedTestsTimeSlot'] = testsObj
                        this.props.selectLabTimeSLot(finalSelectedSlot)
                    }

                }
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
                    this.setState({ couponCode: "", couponId: '', is_cashback: false, use_wallet: true, is_payment_coupon_applied: false, 'pay_btn_loading': false })
                    if (nextProps.labCoupons[this.props.selectedLab]) {
                        this.props.removeLabCoupons(this.props.selectedLab, nextProps.corporateCoupon.coupon_id)
                    }
                    this.props.setCorporateCoupon(null)
                    return
                }
            }

            // if corporateCoupon is set, apply that, leave rest
            if (nextProps.corporateCoupon) {
                if (this.props.LABS[this.props.selectedLab] != nextProps.LABS[this.props.selectedLab] || !isPickupStatusSame) {
                    let { finalPrice, test_ids } = this.getLabPriceData(nextProps)

                    let labCoupon = nextProps.corporateCoupon
                    this.setState({ is_cashback: labCoupon.is_cashback, couponCode: labCoupon.code, couponId: labCoupon.coupon_id || '', pay_btn_loading: true })
                    this.props.applyCoupons('2', labCoupon, labCoupon.coupon_id, this.props.selectedLab, (success) => {
                    })
                    let { total_amount_payable_without_coupon } = this.getSelectedUserData(this.props)
                    if (total_amount_payable_without_coupon != null) {
                        finalPrice = total_amount_payable_without_coupon
                    }
                    this.props.applyLabCoupons('2', labCoupon.code, labCoupon.coupon_id, this.props.selectedLab, finalPrice, test_ids, nextProps.selectedProfile, this.state.cart_item, (err, data) => {
                        this.setState({ 'pay_btn_loading': false })
                    })
                    if (labCoupon.is_payment_specific) {
                        this.setState({ use_wallet: false, is_payment_coupon_applied: true })
                    }
                }
                return
            }

            // if coupon already applied just set discount price.
            if (nextProps.labCoupons[this.props.selectedLab] && nextProps.labCoupons[this.props.selectedLab].length) {
                if (this.props.LABS[this.props.selectedLab] != nextProps.LABS[this.props.selectedLab] || !isPickupStatusSame || (nextProps.selectedProfile && (this.props.selectedProfile != nextProps.selectedProfile))) {
                    let { finalPrice, test_ids } = this.getLabPriceData(nextProps)

                    let labCoupons = nextProps.labCoupons[this.props.selectedLab]
                    this.setState({ 'pay_btn_loading': true })
                    let { total_amount_payable_without_coupon } = this.getSelectedUserData(this.props)
                    if (total_amount_payable_without_coupon != null) {
                        finalPrice = total_amount_payable_without_coupon
                    }
                    this.props.applyLabCoupons('2', labCoupons[0].code, labCoupons[0].coupon_id, this.props.selectedLab, finalPrice, test_ids, nextProps.selectedProfile, this.state.cart_item, (err, data) => {
                        if (!err) {
                            this.setState({ is_cashback: labCoupons[0].is_cashback, couponCode: labCoupons[0].code, couponId: labCoupons[0].coupon_id || '' })
                            if (labCoupons[0].is_payment_specific) {
                                this.setState({ use_wallet: false, is_payment_coupon_applied: true })
                            }
                        } else {
                            this.setState({ coupon_loading: true })
                            this.getAndApplyBestCoupons(nextProps, false)
                        }
                        this.setState({ 'pay_btn_loading': false })
                    })
                }
                return
            }

            // if no coupon is applied
            if (!nextProps.labCoupons[this.props.selectedLab]) {
                this.getAndApplyBestCoupons(nextProps, false)
                this.setState({ 'pay_btn_loading': false })
            }

            if (nextProps.labCoupons[this.props.selectedLab] && nextProps.labCoupons[this.props.selectedLab].length == 0) {
                this.setState({ 'pay_btn_loading': false })
                this.props.resetLabCoupons()
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

    getAndApplyBestCoupons(nextProps, isLensfit) {

        // if (nextProps.couponAutoApply) {
        let { finalPrice, test_ids } = this.getLabPriceData(nextProps)
        let validCoupon
        this.props.getCoupons({
            productId: 2, deal_price: finalPrice, lab_id: this.props.selectedLab, test_ids: test_ids, profile_id: nextProps.selectedProfile, cart_item: this.state.cart_item,
            cb: (coupons) => {
                if (coupons) {
                    if (isLensfit) {
                        let lensFitProps = { ...nextProps }
                        delete lensFitProps.finalPrice
                        delete lensFitProps.test_ids
                        delete lensFitProps.LABS
                        validCoupon = lensFitProps
                    } else {
                        validCoupon = this.getValidCoupon(coupons)
                    }
                    if (validCoupon) {
                        this.setState({ 'pay_btn_loading': true })
                        this.props.applyCoupons('2', validCoupon, validCoupon.coupon_id, this.props.selectedLab, (success) => {
                            this.setState({ 'pay_btn_loading': false })
                        })
                        let { total_amount_payable_without_coupon } = this.getSelectedUserData(nextProps)
                        if (total_amount_payable_without_coupon != null) {
                            finalPrice = total_amount_payable_without_coupon
                        }
                        this.props.applyLabCoupons('2', validCoupon.code, validCoupon.coupon_id, this.props.selectedLab, finalPrice, test_ids, this.props.selectedProfile, this.state.cart_item, (err, data) => {
                            this.setState({ 'pay_btn_loading': false })
                        })
                        if (isLensfit) {
                            this.setState({ show_lensfit_popup: false })
                        }
                        this.setState({ is_cashback: validCoupon.is_cashback, couponCode: validCoupon.code, couponId: validCoupon.coupon_id || '' })
                        if (validCoupon.is_payment_specific) {
                            this.setState({ use_wallet: false, is_payment_coupon_applied: true })
                        }
                    } else {
                        if (isLensfit) {
                            this.setState({ show_lensfit_popup: false })
                        }
                        this.props.resetLabCoupons()
                        this.setState({ couponCode: "", couponId: '', is_cashback: false, use_wallet: true, is_payment_coupon_applied: false, 'pay_btn_loading': false })
                    }
                } else {
                    if (isLensfit) {
                        this.setState({ show_lensfit_popup: false })
                    }
                    this.props.resetLabCoupons()
                    this.setState({ couponCode: "", couponId: '', is_cashback: false, use_wallet: true, is_payment_coupon_applied: false, 'pay_btn_loading': false })
                }
                this.setState({ coupon_loading: false })
            }
        })
        // } else {
        //     this.setState({ coupon_loading: false })
        // }
    }

    getLabPriceData(nextProps) {
        let is_home_collection_enabled = true
        let finalPrice = 0
        let test_ids = []

        nextProps.LABS[this.props.selectedLab].tests.map((twp, i) => {
            test_ids.push(twp.test_id)
            let price = null
            if (twp.vip && Object.keys(twp.vip).length && twp.vip.is_vip_member && twp.vip.covered_under_vip) {
                price += twp.vip.vip_amount + twp.vip.vip_convenience_amount
            } else {
                price += twp.deal_price
            }
            if (!twp.is_home_collection_enabled) {
                is_home_collection_enabled = false
            }
            finalPrice += parseFloat(price)
        })

        if (is_home_collection_enabled && (nextProps.selectedAppointmentType.r_pickup == 'home' || nextProps.selectedAppointmentType.p_pickup == 'home')) {
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

    handlePickupType(type) {
        //always clear selected time at lab profile
        let slot = { time: {} }
        this.props.selectLabTimeSLot(slot, false)
        this.props.selectLabAppointmentType(type)
        this.setState({ showTimeError: false, showAddressError: false });
    }

    navigateTo(where, is_insurance_applicable, selectTimeError = false) {
        switch (where) {
            case "time": {
                //Get Test ids of all selected Tests
                let test_ids = this.props.LABS[this.props.selectedLab].tests.map(x => x.test_id)

                if (this.state.pincode || (this.props.LABS[this.props.selectedLab] && this.props.LABS[this.props.selectedLab].lab && !this.props.LABS[this.props.selectedLab].lab.is_thyrocare)) {

                    let r_pickup = this.props.selectedAppointmentType.r_pickup
                    let p_pickup = this.props.selectedAppointmentType.p_pickup
                    if (this.props.LABS[this.props.selectedLab].lab.is_thyrocare) {
                        if (this.state.seoFriendly) {
                            let url = `${window.location.pathname}?lab_id=${this.props.selectedLab}&type=lab&goback=true&is_thyrocare=true&action_page=timings&is_insurance=${is_insurance_applicable}&test_ids=${test_ids}&r_pickup=${r_pickup}&p_pickup=${p_pickup}&selectedType=${selectTimeError ? 'seperately' : 'all'}`
                            this.props.history.push(url)
                        } else {
                            this.props.history.push(`/lab/${this.props.selectedLab}/timeslots?type=lab&goback=true&is_thyrocare=true&is_insurance=${is_insurance_applicable}&test_ids=${test_ids}&r_pickup=${r_pickup}&p_pickup=${p_pickup}&selectedType=${selectTimeError ? 'seperately' : 'all'}`)
                        }
                    } else {
                        if (this.state.seoFriendly) {
                            let url = `${window.location.pathname}?lab_id=${this.props.selectedLab}&type=lab&goback=true&is_thyrocare=false&action_page=timings&is_insurance=${is_insurance_applicable}&test_ids=${test_ids}&r_pickup=${r_pickup}&p_pickup=${p_pickup}&selectedType=${selectTimeError ? 'seperately' : 'all'}`
                            this.props.history.push(url)
                        } else {
                            this.props.history.push(`/lab/${this.props.selectedLab}/timeslots?type=lab&goback=true&is_thyrocare=false&is_insurance=${is_insurance_applicable}&test_ids=${test_ids}&r_pickup=${r_pickup}&p_pickup=${p_pickup}&selectedType=${selectTimeError ? 'seperately' : 'all'}`)
                        }
                    }

                    return
                } else {
                    this.setState({ showPincodePopup: true })
                    return
                }

            }

            case "patient": {
                this.props.history.push(`/user/family?pick=true&lab_id=${this.props.selectedLab}&is_insurance=${is_insurance_applicable}`)
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

    getPatientDetails(is_insurance_applicable, center_visit_enabled, is_home_charges_applicable) {
        let patient = null
        if (this.props.profiles[this.props.selectedProfile] && !this.props.profiles[this.props.selectedProfile].isDummyUser) {
            patient = this.props.profiles[this.props.selectedProfile]
        }
        return <ChoosePatientNewView is_corporate={!!this.props.corporateCoupon} patient={patient} navigateTo={this.navigateTo.bind(this)} profileDataCompleted={this.profileDataCompleted.bind(this)} {...this.props} is_lab={true} clearTestForInsured={this.clearTestForInsured.bind(this)} is_insurance_applicable={is_insurance_applicable} checkPrescription={this.checkPrescription.bind(this)} isEmailNotValid={this.state.isEmailNotValid} getDataAfterLogin={this.getDataAfterLogin} nonIpdLeads={this.nonIpdLeads.bind(this)} />

    }

    getSelectors(is_insurance_applicable, center_visit_enabled, is_home_charges_applicable) {
        let patient = null
        if (this.props.profiles[this.props.selectedProfile] && !this.props.profiles[this.props.selectedProfile].isDummyUser) {
            patient = this.props.profiles[this.props.selectedProfile]
        }

        return <React.Fragment>
            <VisitTimeNew type="home" navigateTo={this.navigateTo.bind(this)} selectedSlot={this.props.selectedSlot} timeError={this.state.showTimeError} {...this.props} selectedLab={this.props.selectedLab} toggle={this.toggle.bind(this, 'showPincodePopup')} is_insurance_applicable={is_insurance_applicable} />
            {
                patient && is_home_charges_applicable ?
                    <PickupAddress {...this.props} navigateTo={this.navigateTo.bind(this, 'address')} addressError={this.state.showAddressError} />
                    : ''
            }
        </React.Fragment>
        /*
                switch (this.props.selectedAppointmentType) {
                    case "lab": {
                        return <div>
                            <VisitTimeNew type="lab" navigateTo={this.navigateTo.bind(this)} selectedSlot={this.props.selectedSlot} timeError={this.state.showTimeError} {...this.props} selectedLab={this.props.selectedLab} toggle={this.toggle.bind(this, 'showPincodePopup')} is_insurance_applicable={is_insurance_applicable} />
                            <ChoosePatientNewView is_corporate={!!this.props.corporateCoupon} patient={patient} navigateTo={this.navigateTo.bind(this)} profileDataCompleted={this.profileDataCompleted.bind(this)} {...this.props} is_lab={true} clearTestForInsured={this.clearTestForInsured.bind(this)} is_insurance_applicable={is_insurance_applicable} checkPrescription={this.checkPrescription.bind(this)} isEmailNotValid={this.state.isEmailNotValid} isDobNotValid={this.state.isDobNotValid}/>
                        </div>
                    }
        
                    case "home": {
                        return <div>
                            <VisitTimeNew type="home" navigateTo={this.navigateTo.bind(this)} selectedSlot={this.props.selectedSlot} timeError={this.state.showTimeError} {...this.props} selectedLab={this.props.selectedLab} toggle={this.toggle.bind(this, 'showPincodePopup')} is_insurance_applicable={is_insurance_applicable} />
                            <ChoosePatientNewView is_corporate={!!this.props.corporateCoupon} patient={patient} navigateTo={this.navigateTo.bind(this)} profileDataCompleted={this.profileDataCompleted.bind(this)} {...this.props} is_lab={true} clearTestForInsured={this.clearTestForInsured.bind(this)} is_insurance_applicable={is_insurance_applicable} checkPrescription={this.checkPrescription.bind(this)} isEmailNotValid={this.state.isEmailNotValid} isDobNotValid={this.state.isDobNotValid}/>
                            {
                                patient ?
                                    <PickupAddress {...this.props} navigateTo={this.navigateTo.bind(this, 'address')} addressError={this.state.showAddressError} />
                                    : ''
                            }
                        </div>
                    }
                }*/
    }

    profileDataCompleted(data) {
        if (data.name == '' || data.gender == '' || data.phoneNumber == '' || data.email == '' || !data.otpVerifySuccess || data.dob == '' || data.dob == null) {
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

    getBookingData() {
        let test_ids = []
        let coupon_data = {}
        if (this.props.LABS[this.props.selectedLab] && this.props.LABS[this.props.selectedLab].tests && this.props.LABS[this.props.selectedLab].tests.length) {
            test_ids = this.props.LABS[this.props.selectedLab].tests.map((x => x.test_id))

        }

        if (this.props.labCoupons && this.props.labCoupons[this.props.selectedLab] && this.props.labCoupons[this.props.selectedLab].length) {
            coupon_data = this.props.labCoupons[this.props.selectedLab][0]
        }
        return { test_ids, labId: this.props.selectedLab, pincode: this.state.pincode, profile: this.props.selectedProfile, selectedSlot: this.props.selectedSlot, coupon_data, payment_type: this.props.payment_type }
    }

    sendSingleFlowAgentBookingURL(postData) {
        //for agent login send booking url for single flow
        let booking_data = this.getBookingData()
        booking_data = { ...postData, ...booking_data, is_single_flow_lab: true, dummy_data_type: 'SINGLE_PURCHASE' }

        this.props.pushMembersData(booking_data, (resp) => {
            if (resp.dummy_id) {

                let extraParams = {
                    landing_url: `lab/${this.props.selectedLab}/book?dummy_id=${resp.dummy_id}&test_ids=${booking_data.test_ids}`,
                }
                if (postData['message_medium']) {
                    extraParams['message_medium'] = postData['message_medium']
                }
                this.props.sendAgentBookingURL(this.state.order_id, 'sms', 'SINGLE_PURCHASE', null, extraParams, (err, res) => {
                    if (err) {
                        SnackBar.show({ pos: 'bottom-center', text: "SMS SEND ERROR" })
                    } else {
                        SnackBar.show({ pos: 'bottom-center', text: "SMS SENT SUCCESSFULY" })
                    }
                })
            }
        })
    }

    proceed(testPicked, addressPicked, datePicked, patient, addToCart, total_price, total_wallet_balance, prescriptionPicked, is_selected_user_insurance_status, extraParams, vip_is_prescription_required, e) {

        //Check if patient is selected or not
        if (!patient) {
            SnackBar.show({ pos: 'bottom-center', text: "Please Add Patient" });
            window.scrollTo(0, 0)
            return
        }
        //Check if patient emailid exist or not
        // if(patient && !patient.email){
        //     this.setState({isEmailNotValid:true})
        //     SnackBar.show({ pos: 'bottom-center', text: "Please Enter Your Email Id" })
        //     return 
        // }
        //Check if patient dob exist or not
        if (patient && !patient.dob) {
            this.setState({ isDobNotValid: true })
            SnackBar.show({ pos: 'bottom-center', text: "Please Enter Your Date of Birth" })
            return
        }

        //To claim insurance status & claim
        if (patient && is_selected_user_insurance_status && is_selected_user_insurance_status == 4) {
            SnackBar.show({ pos: 'bottom-center', text: "Your documents from the last claim are under verification.Please write to customercare@docprime.com for more information." });
            window.scrollTo(0, 0)
            return
        }
        //check if any test is selcted by user or not
        if (!testPicked) {
            SnackBar.show({ pos: 'bottom-center', text: "Please select some tests." });
            return
        }
        //check if timeslots of all selected tests are selcted by user or not
        if (this.props.selectedSlot && this.props.selectedSlot.selectedTestsTimeSlot) {
            let found = false
            this.props.LABS[this.props.selectedLab].tests.map((test) => {
                if (this.props.selectedSlot.selectedTestsTimeSlot[test.test_id]) {

                } else {
                    found = true
                }
            })
            if (found) {
                SnackBar.show({ pos: 'bottom-center', text: "Please select timings of all Tests." });
                return
            }
        }

        if (!datePicked) {
            this.setState({ showTimeError: true });
            SnackBar.show({ pos: 'bottom-center', text: "Please pick a time slot." });

            window.scrollTo(0, 0)// this.state.scrollPosition);

            return
        }

        //Check if patient address is selected or not
        if (!addressPicked) {
            this.setState({ showAddressError: true });
            SnackBar.show({ pos: 'bottom-center', text: "Please pick an address." });

            window.scrollTo(0, 0)//this.state.scrollPosition);

            return
        }

        //Check if pincode selected by user matches with the pincode of the address selected by the user
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

        /*if (!this.state.profileDataFilled) {
            SnackBar.show({ pos: 'bottom-center', text: "Please fill the info" });
            return
        }*/
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
        let is_vip_applicable = false
        let is_selected_user_under_vip = false
        let is_tests_covered_under_vip = false
        let vip_amount

        let is_selected_user_vip = true // to check is plus_plan is applicable or not
        if (this.props.profiles[this.props.selectedProfile] && !this.props.profiles[this.props.selectedProfile].isDummyUser) {
            is_selected_user_insured = this.props.profiles[this.props.selectedProfile].is_insured
            is_selected_user_under_vip = this.props.profiles[this.props.selectedProfile].is_vip_member
            Object.entries(this.props.profiles).map(function ([key, value]) {
                if (value.is_vip_member) {
                    is_selected_user_vip = false
                }
            })
        }

        let is_plan_applicable = false
        let is_tests_covered_under_plan = true
        let is_selected_user_has_active_plan = false
        let show_lensfit = true
        let lensfit_coupons = null

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
                if (test.lensfit_offer) {
                    if (!test.lensfit_offer.applicable) {
                        show_lensfit = false
                    } else {
                        lensfit_coupons = test.lensfit_offer.coupon
                    }

                } else {

                }
                if (test.vip && test.vip.covered_under_vip) {
                    is_tests_covered_under_vip = true
                    vip_amount = test.vip.vip_amount
                } else {

                }
            })

        }
        is_insurance_applicable = is_tests_covered_under_insurance && is_selected_user_insured

        is_plan_applicable = is_tests_covered_under_plan && is_selected_user_has_active_plan

        show_lensfit = show_lensfit && this.props.LABS[this.props.selectedLab] && this.props.LABS[this.props.selectedLab].tests && this.props.LABS[this.props.selectedLab].tests.length

        /*if(!this.state.show_lensfit_popup && !this.state.lensfit_decline && show_lensfit && !is_plan_applicable && !is_insurance_applicable && lensfit_coupons && Object.keys(lensfit_coupons).length > 0 && this.state.couponId !=lensfit_coupons.coupon_id){
            this.setState({show_lensfit_popup:true, lensfit_coupons:lensfit_coupons})
            return
        }*/
        is_vip_applicable = /*is_tests_covered_under_vip &&*/ is_selected_user_under_vip
        let prescriptionIds = []
        //Check if prior to test, prescription exist for the insured customer or not
        if ((prescriptionPicked && is_insurance_applicable) || vip_is_prescription_required) {
            if (this.props.user_prescriptions && this.props.user_prescriptions.length == 0) {
                SnackBar.show({ pos: 'bottom-center', text: "Please upload prescription." });
                return
            } else if (this.props.user_prescriptions && this.props.user_prescriptions.length > 0) {
                this.props.user_prescriptions[0].img_path_ids.map((imgId, i) => {
                    prescriptionIds.push({ 'prescription': imgId.id })
                })
            }
        }

        //Confirmation popup for the tests, whose amount payable is 0
        if (this.state.showConfirmationPopup == 'close' && !addToCart && (total_price == 0 || (this.state.use_wallet && total_wallet_balance > 0))) {
            this.setState({ showConfirmationPopup: 'open' })
            return
        }
        if (this.state.is_spo_appointment || (this.props.payment_type == 6 && STORAGE.isAgent())) {
            this.setState({ error: "" })
        } else {
            this.setState({ loading: true, error: "" })
        }


       /* let start_date = this.props.selectedSlot.date
        let start_time = this.props.selectedSlot.time.value
       */ let testIds = this.props.lab_test_data[this.props.selectedLab] || []
        testIds = testIds.map(x => x.id)
        let utm_tags = this.getUtmTags()
        let postData = {
            lab: this.props.selectedLab,
            test_ids: testIds,
            profile: this.props.selectedProfile,
            address: this.props.selectedAddress,
            payment_type: 1, // TODO : Select payment type
            use_wallet: this.props.payment_type == 6 ? false : this.state.use_wallet,
            cart_item: this.state.cart_item,
            prescription_list: prescriptionIds,
            multi_timings_enabled: true,
            from_web: true,
            utm_tags: utm_tags
        }
        let visitor_info = GTM.getVisitorInfo()
        if (visitor_info && visitor_info.visit_id) {
            postData['visit_id'] = visitor_info.visit_id
            postData['visitor_id'] = visitor_info.visitor_id
        }
        if (this.props.selectedSlot) {
            if (this.props.selectedSlot['all']) {
                postData['selected_timings_type'] = 'common'
            } else {
                postData['selected_timings_type'] = 'separate'
            }
        }
        if (this.props.payment_type == 6 && this.props.selected_vip_plan && Object.keys(this.props.selected_vip_plan).length && is_selected_user_vip) {
            postData['plus_plan'] = this.props.selected_vip_plan.id
            postData['plan'] = this.props.selected_vip_plan
        }
        //Check SPO UTM Tags
        if (sessionStorage && sessionStorage.getItem('sessionIdVal') && this.props.common_utm_tags && this.props.common_utm_tags.length && this.props.common_utm_tags.filter(x => x.type == 'spo').length) {

            let spo_tags = this.props.common_utm_tags.filter(x => x.type == 'spo')[0]
            if (spo_tags.utm_tags) {

                postData['utm_spo_tags'] = spo_tags.utm_tags
            }
        }

        //Check SBI UTM Tags
        if (STORAGE && STORAGE.getAnyCookie('sbi_utm') && this.props.common_utm_tags && this.props.common_utm_tags.length && this.props.common_utm_tags.filter(x => x.type == 'sbi_utm').length) {

            let tags = this.props.common_utm_tags.filter(x => x.type == 'sbi_utm')[0]
            if (tags.utm_tags) {

                postData['utm_sbi_tags'] = tags.utm_tags
            }
        } else if (document && document.location && document.location.host && document.location.host.includes('sbi')) {
            postData['utm_sbi_tags'] = {
                utm_tags: {
                    utm_source: 'sbi_utm',
                    utm_term: '',
                    utm_medium: '',
                    utm_campaign: ''
                },
                time: new Date().getTime(),
            }
        }

        //build data for every selected tests with their selected timeslot.
        if (this.props.selectedSlot && this.props.selectedSlot.selectedTestsTimeSlot) {
            let tests = []

            this.props.LABS[this.props.selectedLab].tests.map((twp) => {

                if (this.props.selectedSlot.selectedTestsTimeSlot[twp.test_id]) {
                    let test = this.props.selectedSlot.selectedTestsTimeSlot[twp.test_id]
                    let type = 3
                    if (twp.is_radiology) {
                        type = 1
                    } else if (twp.is_pathology) {
                        type = 2
                    }

                    tests.push({ test: test.test_id, type: type, start_date: test.date, start_time: test.time.value, is_home_pickup: test.is_home_pickup })
                }
            })
            postData['test_timings'] = tests
        }
        let profileData = { ...patient }
        if (profileData && profileData.whatsapp_optin == null) {
            profileData['whatsapp_optin'] = this.state.whatsapp_optin
            this.props.editUserProfile(profileData, profileData.id)
        }
        if (this.props.payment_type != 6 && this.props.labCoupons && this.props.labCoupons[this.props.selectedLab] && this.props.labCoupons[this.props.selectedLab].length && this.props.disCountedLabPrice >= 0 && !is_plan_applicable && !is_insurance_applicable /*&& !is_vip_applicable*/) {
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
            //On add to Cart Clicked

            //Single Flow Agent Booking
            if (STORAGE.isAgent() && this.props.payment_type == 6) {
                if (extraParams && extraParams.sendWhatsup) {
                    postData['message_medium'] = 'WHATSAPP'
                }
                this.sendSingleFlowAgentBookingURL(postData)
                return
            }


            let data = {
                'Category': 'ConsumerApp', 'Action': 'LabAddToCartClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-add-to-cart-clicked'
            }

            GTM.sendEvent({ data: data })
            this.props.addToCart(2, postData).then((res) => {
                // if (!this.state.cart_item && !this.state.is_spo_appointment) {
                //     this.props.clearExtraTests()
                // }

                if (this.state.is_spo_appointment) {
                    this.sendAgentBookingURL()
                } else {
                    this.props.history.push('/cart')
                }
            }).catch((err) => {
                let message = "Error adding to cart!"
                if (err.message) {
                    message = err.message
                    if (message.includes('Item already exists in cart.')) {
                        this.props.history.push('/cart')
                        return;
                    }
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
            'Category': 'ConsumerApp', 'Action': 'AppointmentType', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'appointment-type', 'appointmentType': '', 'r_pickup': this.props.selectedAppointmentType.r_pickup, 'p_pickup': this.props.selectedAppointmentType.p_pickup
        }

        GTM.sendEvent({ data: data })


        let analyticData = {
            'Category': 'ConsumerApp', 'Action': 'LabConfirmBookingClicked', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'lab-confirm-booking-clicked'
        }
        GTM.sendEvent({ data: analyticData })
        this.setState({ paymentBtnClicked: true });
        this.props.createLABAppointment(postData, (err, data) => {
            if (!err) {

                //Clear SPO UTM Tags after appointments creation
                if (this.state.is_spo_appointment) {
                    this.props.unSetCommonUtmTags('spo')
                }

                //Remove coupons and clear prescription after appointment creation
                if (this.props.user_prescriptions && this.props.user_prescriptions.length > 0) {
                    this.props.removeLabCoupons(this.props.selectedLab, this.state.couponId)
                    this.props.clearPrescriptions()
                }
                if (data.is_agent) {
                    this.props.removeLabCoupons(this.props.selectedLab, this.state.couponId)
                    // this.props.history.replace(this.props.location.pathname + `?order_id=${data.data.orderId}`)
                    this.setState({ order_id: data.data.orderId })
                    return
                }
                if (data.payment_required) {
                    // if payment is required, send to payment selection page
                    let analyticData = {
                        'Category': 'ConsumerApp', 'Action': 'LabOrderCreated', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'lab_order_created'
                    }
                    GTM.sendEvent({ data: analyticData })
                    // this.props.history.push(`/payment/${data.data.orderId}?refs=lab`)
                    this.processPayment(data)

                } else {

                    this.props.removeLabCoupons(this.props.selectedLab, this.state.couponId)
                    // send back to appointment page
                    this.props.history.replace(`/order/summary/${data.data.orderId}?payment_success=true`)
                }
            } else {
                this.setState({ paymentBtnClicked: false });
                let message
                if (err.error) {
                    message = err.error
                } else {
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
                setTimeout(() => {
                    if (document.getElementById('paymentForm') && Object.keys(this.state.paymentData).length > 0) {
                        let form = document.getElementById('paymentForm')
                        setTimeout(() => {
                            this.props.removeLabCoupons(this.props.selectedLab, this.state.couponId)
                        }, 3000)
                        form.submit()
                    }
                }, 500)
            })
        }
    }

    sendAgentBookingURL() {
        //for agent login send booking url
        let postData = {}
        if (sessionStorage && sessionStorage.getItem('sessionIdVal') && this.props.common_utm_tags && this.props.common_utm_tags.length && this.props.common_utm_tags.filter(x => x.type == 'spo').length) {

            let spo_tags = this.props.common_utm_tags.filter(x => x.type == 'spo')[0]
            if (spo_tags.utm_tags) {
                postData = spo_tags.utm_tags
            }
        }

        this.props.sendSPOAgentBooking(postData, (err, res) => {
            if (err) {
                SnackBar.show({ pos: 'bottom-center', text: "SMS SEND ERROR" })
            } else {
                this.props.unSetCommonUtmTags('spo')
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

            this.setState({ pay_btn_loading: true })
            this.props.history.push(`/coupon/lab/${this.props.selectedLab}/coupons?test_ids=${test_ids}&deal_price=${finalPrice}&cart_item=${this.state.cart_item || ""}`)
        }
    }

    closeErrorPopup = () => {
        this.setState({ error: '' })
    }

    getBookingButtonText(total_wallet_balance, price_to_pay, is_vip_applicable, vip_amount, extraAllParams) {
        let price_from_wallet = 0
        let price_from_pg = 0

        if (is_vip_applicable || (extraAllParams && extraAllParams.is_gold_member)) {
            // if(vip_amount){
            //     return `Confirm Booking (₹ ${extraAllParams.total_amount_payable})`
            // }else{
            //     return `Confirm Booking`
            // }
            price_to_pay = extraAllParams.total_amount_payable
        }
        if (this.state.use_wallet && total_wallet_balance && this.props.payment_type != 6) {
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
        // if (this.props.defaultProfile && this.props.profiles[this.props.defaultProfile] && (this.props.profiles[this.props.defaultProfile].is_insured || this.props.profiles[this.props.defaultProfile].is_vip_member || this.props.profiles[this.props.defaultProfile].is_vip_gold_member)) {

        //     if(this.props.selectedLab && this.props.LABS[this.props.selectedLab] && this.props.LABS[this.props.selectedLab].tests && this.props.LABS[this.props.selectedLab].tests.length ==1){

        //     }else{
        //         this.props.clearExtraTests()    
        //     }
        //     this.props.getLabById(this.props.selectedLab)
        //     return
        // }
    }

    searchTests() {
        this.props.selectSearchType('lab')
        this.props.history.push('/search')
    }

    priceConfirmationPopup(choice) {
        if (!choice) {
            this.setState({ showConfirmationPopup: 'close' })
        } else {
            this.setState({ showConfirmationPopup: 'close' })
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

    testInfo(test_id, lab_id, test_url, event) {
        let selected_test_ids = []
        // Object.entries(this.props.currentSearchedCriterias).map(function ([key, value]) {
        //     selected_test_ids.push(value.id)
        // })
        var url_string = window.location.href;
        var url = new URL(url_string);
        var search_id = url.searchParams.get("search_id");
        let lat = 28.644800
        let long = 77.216721
        if (this.props.selectedLocation !== null) {
            lat = this.props.selectedLocation.geometry.location.lat
            long = this.props.selectedLocation.geometry.location.lng

            if (typeof lat === 'function') lat = lat()
            if (typeof long === 'function') long = long()
        }
        if (test_url && test_url != '') {
            this.props.history.push('/' + test_url + '?test_ids=' + test_id + '&selected_test_ids=' + selected_test_ids + '&search_id=' + search_id + '&lab_id=' + lab_id + '&lat=' + lat + '&long=' + long)
        } else {
            this.props.history.push('/search/testinfo?test_ids=' + test_id + '&selected_test_ids=' + selected_test_ids + '&search_id=' + search_id + '&lab_id=' + lab_id + '&lat=' + lat + '&long=' + long)
        }
        event.stopPropagation()
        let data = {
            'Category': 'ConsumerApp', 'Action': 'testInfoClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'test-info-click', 'pageSource': 'lab-result-page'
        }
        GTM.sendEvent({ data: data })
    }

    removeTest(twp) {
        let test = Object.assign({}, twp.test)
        test.extra_test = true
        test.lab_id = this.props.selectedLab
        test.removeTest = true
        test.selectedLabTests = this.props.LABS[this.props.selectedLab]
        this.props.toggleDiagnosisCriteria('test', test)
    }

    applyLensFitCoupons(deal_price, coupon) {
        let { finalPrice, test_ids } = this.getLabPriceData(this.props)
        coupon.finalPrice = finalPrice
        coupon.test_ids = test_ids
        coupon.LABS = this.props.LABS
        let data = {
            'Category': 'ConsumerApp', 'Action': 'LensFitLabApplyClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lensfit-lab-apply-clicked'
        }
        GTM.sendEvent({ data: data })
        this.getAndApplyBestCoupons(coupon, true)
    }

    closeLensFitPopup() {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'LensFitLabDontWantClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lensfit-lab-dont-want-clicked'
        }
        GTM.sendEvent({ data: data })

        this.setState({ show_lensfit_popup: false, lensfit_decline: true }, () => {
            if (document.getElementById('confirm_booking')) {
                document.getElementById('confirm_booking').click()
            }
        })
        // this.setState({show_lensfit_popup:false,lensfit_decline:true})
    }

    toggleGoldPlans = (plan) => {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'ToggleLabGoldPlanClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'toggle-lab-gold-plan-clicked', 'plan': plan.id
        }

        GTM.sendEvent({ data: data })
        this.props.selectVipClubPlan('plan', plan) // toggle/select vip plan
        this.toggleGoldPricePopup()
    }

    toggleGoldPricePopup = (value = false) => {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'ChangePlanLabClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'change-plan-lab-clicked'
        }

        GTM.sendEvent({ data: data })
        this.setState({ showGoldPriceList: value })
    }

    goToGoldPage = () => {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'GoToGoldPlanClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'go-to-gold-plan-clicked'
        }

        GTM.sendEvent({ data: data })
        this.props.history.push('/vip-gold-details?is_gold=true&source=mobile-lab-summary-gold-clicked&lead_source=Docprime&booking_page=lab')
    }

    getDataAfterLogin = () => {
        this.props.fetchData(this.props)
        if (this.props.labGoldPredictedPrice && this.props.labGoldPredictedPrice.length) {
            let selectedPackage = this.props.labGoldPredictedPrice.filter(x => x.id == this.state.selectedVipGoldPackageId)
            if (selectedPackage && selectedPackage.length == 0) {
                selectedPackage = this.props.labGoldPredictedPrice.filter(x => x.is_selected)
            }
            if (selectedPackage && selectedPackage.length) {
                this.props.selectVipClubPlan('plan', selectedPackage[0])
            }
        }

    }

    getSelectedUserData(props) {
        let total_amount_payable_without_coupon = null
        let is_tests_covered_under_plan = true
        let is_tests_covered_under_vip = true
        let vip_data = {}
        let vip_total_amount = 0
        let vip_total_convenience_amount = 0
        let vip_total_gold_price = 0
        let is_all_enable_for_vip = true
        let is_all_enable_for_gold = true
        let is_home_charges_applicable = false
        let labDetail = {}
        if (props.LABS[props.selectedLab] && props.LABS[props.selectedLab].tests && props.LABS[props.selectedLab].tests.length) {
            let patient = null
            labDetail = props.LABS[props.selectedLab].lab
            let is_home_collection_enabled = false
            if (is_home_collection_enabled && props.selectedAppointmentType && (props.selectedAppointmentType.r_pickup == 'home' || props.selectedAppointmentType.p_pickup == 'home')) {
                is_home_charges_applicable = true
            }

            if (props.profiles[props.selectedProfile] && !props.profiles[props.selectedProfile].isDummyUser) {
                patient = props.profiles[props.selectedProfile]
            }

            props.LABS[props.selectedLab].tests.map((test, i) => {

                if (test.included_in_user_plan) {

                } else {
                    is_tests_covered_under_plan = false
                }

                if (test.vip && !(test.vip.covered_under_vip)) {
                    is_tests_covered_under_vip = false
                }

                if (!(test.vip.is_enable_for_vip)) {
                    is_all_enable_for_vip = false
                }
                if (!(test.vip.is_gold)) {
                    is_all_enable_for_gold = false
                }

                vip_total_amount += parseInt(test.vip.vip_amount)
                vip_total_convenience_amount += parseInt(test.vip.vip_convenience_amount)
                vip_total_gold_price += parseInt(test.vip.vip_gold_price)
            })
            // vip_total_convenience_amount = 0
            if (is_all_enable_for_vip && patient) {


                if (is_all_enable_for_gold && patient.is_vip_gold_member) {

                    total_amount_payable_without_coupon = vip_total_amount + vip_total_convenience_amount + (is_home_charges_applicable ? labDetail.home_pickup_charges : 0)
                } else if (patient.is_vip_member/* && is_tests_covered_under_vip*/) {
                    total_amount_payable_without_coupon = vip_total_amount + (is_home_charges_applicable ? labDetail.home_pickup_charges : 0)
                }

            }

            if (!props.is_any_user_buy_gold && props.payment_type == 6 && props.selected_vip_plan && props.selected_vip_plan.lab && props.LABS[props.selectedLab].tests.length == 1) {
                total_amount_payable_without_coupon = null
            }
        } else {
            is_tests_covered_under_plan = false
            is_tests_covered_under_vip = false
            is_all_enable_for_vip = false
            is_all_enable_for_gold = false
        }
        return { total_amount_payable_without_coupon }

    }

    nonIpdLeads(user_phone_number, user_name) {
        const parsed = queryString.parse(this.props.location.search)
        let patient = null
        let data = {}
        let selected_test_name = ''
        let selected_test
        if (this.props.LABS[this.props.selectedLab] && this.props.LABS[this.props.selectedLab].tests && this.props.LABS[this.props.selectedLab].tests.length) {

            this.props.LABS[this.props.selectedLab].tests.map((test, i) => {
                if (this.props.selectedSlot && Object.keys(this.props.selectedSlot).length && this.props.selectedSlot.selectedTestsTimeSlot) {
                    selected_test = this.props.selectedSlot.selectedTestsTimeSlot[test.test_id]
                }
                if (this.props.LABS[this.props.selectedLab].tests.length == 1) {
                    selected_test_name += test.test.name
                } else {
                    selected_test_name += test.test.name + ','
                }

            })
            if (this.props.profiles[this.props.selectedProfile] && !this.props.profiles[this.props.selectedProfile].isDummyUser) {
                patient = this.props.profiles[this.props.selectedProfile]
                data.customer_name = patient.name
                data.phone_number = patient.phone_number
            }

            data.lead_type = 'DROPOFF'
            data.lead_source = 'dropoff'
            data.lab_name = this.props.LABS[this.props.selectedLab].lab.name
            data.exitpoint_url = 'http://docprime.com' + this.props.location.pathname
            data.source = parsed
            data.doctor_name = null
            data.hospital_name = null
            data.specialty = null
            data.test_name = selected_test_name
            if (user_phone_number) {
                data.phone_number = user_phone_number
                data.customer_name = user_name
            }
            let visitor_info = GTM.getVisitorInfo()
            if (visitor_info && visitor_info.visit_id) {
                data.visit_id = visitor_info.visit_id
                data.visitor_id = visitor_info.visitor_id
            }
            if (this.props.common_utm_tags && this.props.common_utm_tags.length) {
                data.utm_tags = this.getUtmTags()
            }
            if (selected_test && this.props.selectedSlot && Object.keys(this.props.selectedSlot).length && this.props.selectedSlot.selectedTestsTimeSlot) {
                let { date, time } = selected_test
                data.selected_time = time.text + ' ' + time.title
                data.selected_date = date
            } else {
                data.selected_time = null
                data.selected_date = null
            }
            this.setState({ enableDropOfflead: false })
            if (this.state.is_lead_enabled) {
                this.setState({ is_lead_enabled: false })
                this.props.NonIpdBookingLead(data)
                setTimeout(() => {
                    this.setState({ is_lead_enabled: true })
                }, 5000)
            }

        }
    }

    getUtmTags() {
        const parsed = queryString.parse(this.props.location.search)
        let utm_tags = {
            utm_source: parsed.utm_source || '',
            utm_medium: parsed.utm_medium || '',
            utm_term: parsed.utm_term || '',
            utm_campaign: parsed.utm_campaign || '',
            referrer: document.referrer || '',
            gclid: parsed.gclid || ''
        }

        if (this.props.common_utm_tags && this.props.common_utm_tags.length) {
            utm_tags = this.props.common_utm_tags.filter(x => x.type == "common_xtra_tags")[0].utm_tags
        }

        return utm_tags
    }

    render() {
        const parsed = queryString.parse(this.props.location.search)
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
        let is_selected_user_insurance_status
        let radiology_tests = []
        let pathology_tests = []
        let r_pickup_home = true
        let r_pickup_center = false
        let p_pickup_home = true
        let p_pickup_center = false
        let is_vip_applicable = false
        let is_selected_user_under_vip = false
        let is_default_user_under_vip = false
        let is_tests_covered_under_vip = false
        let is_selected_user_gold = false
        let vip_total_amount = 0
        let vip_total_convenience_amount = 0
        let vip_total_gold_price = 0
        let vip_data = {}
        let is_all_enable_for_vip = true
        let is_all_enable_for_gold = true
        let vip_is_prescription_required = false
        if (this.props.profiles[this.props.selectedProfile] && !this.props.profiles[this.props.selectedProfile].isDummyUser) {
            patient = this.props.profiles[this.props.selectedProfile]
            is_selected_user_insured = this.props.profiles[this.props.selectedProfile].is_insured
            is_selected_user_insurance_status = this.props.profiles[this.props.selectedProfile].insurance_status
            is_selected_user_under_vip = this.props.profiles[this.props.selectedProfile].is_vip_member
            is_selected_user_gold = this.props.profiles[this.props.selectedProfile].is_vip_gold_member
        }
        if (this.props.is_prescription_needed) {
            prescriptionPicked = true
        }
        if (this.props.defaultProfile && this.props.profiles[this.props.defaultProfile]) {
            is_default_user_insured = this.props.profiles[this.props.defaultProfile].is_insured
            is_default_user_under_vip = this.props.profiles[this.props.defaultProfile].is_vip_member
        }

        //Check If each Tests Covered Under Insurance
        if (this.props.isUserCared && this.props.isUserCared.has_active_plan) {
            is_selected_user_has_active_plan = this.props.isUserCared.has_active_plan
        }

        //Check If each Tests Covered Under Plan
        //Gold Radio button Selected Package Price List
        let gold_pricelist_mrp = 0
        let gold_pricelist_deal_price = 0
        let gold_pricelist_convenience = 0
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
                if (test.vip) {
                    is_tests_covered_under_vip = test.vip.covered_under_vip
                } else {

                }

                //To get gold price for radio button single page 
                if (!this.props.is_any_user_buy_gold && this.props.selected_vip_plan && this.props.selected_vip_plan.tests && this.props.selected_vip_plan.tests[test.test_id]) {
                    gold_pricelist_mrp += (this.props.selected_vip_plan.tests[test.test_id].mrp || 0)
                    gold_pricelist_deal_price += (this.props.selected_vip_plan.tests[test.test_id].gold_price || 0)
                    gold_pricelist_convenience += (this.props.selected_vip_plan.tests[test.test_id].convenience_charge || 0)
                }
            })

        }
        is_insurance_applicable = is_tests_covered_under_insurance && is_selected_user_insured
        is_vip_applicable = /*is_tests_covered_under_vip && */is_selected_user_under_vip
        if (is_tests_covered_under_insurance && !is_selected_user_insured) {
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
                /*if (!twp.is_home_collection_enabled) {
                    is_home_collection_enabled = false
                }*/
                finalPrice += parseFloat(price)
                finalMrp += parseFloat(mrp)
                vip_total_amount += parseInt(twp.vip.vip_amount)
                vip_total_convenience_amount += parseInt(twp.vip.vip_convenience_amount)
                vip_total_gold_price += parseInt(twp.vip.vip_gold_price)
                if (twp.vip.is_prescription_required) {
                    vip_is_prescription_required = true
                }
                if (!(twp.vip.is_enable_for_vip)) {
                    is_all_enable_for_vip = false
                }
                if (!(twp.vip.is_gold)) {
                    is_all_enable_for_gold = false
                }

                if (twp.is_radiology) {
                    r_pickup_center = this.props.LABS[this.props.selectedLab].lab.center_visit_enabled
                    if (!twp.is_home_collection_enabled) {
                        r_pickup_home = false
                    }
                    radiology_tests.push(<p key={i} className="test-list test-list-label new-lab-test-list rdo-rmv-btn">
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
                        <span className="test-name-item p-0">{twp.test.name}
                            {twp && twp.test && twp.test.show_details ?
                                <span style={{ 'marginLeft': '5px', marginTop: '1px', display: 'inline-block' }} key={i} onClick={this.testInfo.bind(this, twp.test.id, this.state.selectedLab, twp.test.url)}>
                                    <img src={ASSETS_BASE_URL + '/img/icons/Info.svg'} style={{ width: '15px' }} />
                                </span>
                                : ''}
                        </span>
                        {
                            is_plan_applicable ?
                                <p className="pkg-discountCpn" style={{ display: 'inline-block', float: 'right', marginTop: '5px' }}>Docprime Care Benefit</p>
                                : ''
                        }
                        <span className="rdo-rmv-spn" onClick={() => this.removeTest(twp)}>Remove</span>
                    </p>)
                } else if (twp.is_pathology) {
                    p_pickup_center = this.props.LABS[this.props.selectedLab].lab.center_visit_enabled
                    if (!twp.is_home_collection_enabled) {
                        p_pickup_home = false
                    }
                    pathology_tests.push(
                        <p key={i} className="test-list test-list-label rdo-rmv-btn new-lab-test-list">
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
                            <span className="test-name-item p-0">{twp.test.name}
                                {twp && twp.test && twp.test.show_details ?
                                    <span style={{ 'marginLeft': '5px', marginTop: '1px', display: 'inline-block' }} key={i} onClick={this.testInfo.bind(this, twp.test.id, this.state.selectedLab, twp.test.url)}>
                                        <img src={ASSETS_BASE_URL + '/img/icons/Info.svg'} style={{ width: '15px' }} />
                                    </span>
                                    : ''}
                            </span>
                            {
                                is_plan_applicable ?
                                    <p className="pkg-discountCpn" style={{ display: 'inline-block', float: 'right', marginTop: '5px' }}>Docprime Care Benefit</p>
                                    : ''
                            }
                            <span className="rdo-rmv-spn" onClick={() => this.removeTest(twp)}>Remove</span>
                        </p>)
                }

                tests_with_price.push(
                    <div className="payment-detail d-flex" key={i}>
                        <p>{twp.test.name}</p>
                        {
                            is_corporate || is_insurance_applicable || is_plan_applicable ?
                                <p>&#8377; 0</p>
                                : this.props.payment_type == 6 && this.props.selected_vip_plan && this.props.selected_vip_plan.tests && this.props.selected_vip_plan.tests[twp.test_id] ?
                                    parseInt((this.props.selected_vip_plan.tests[twp.test_id].gold_price)) == parseInt((this.props.selected_vip_plan.tests[twp.test_id].mrp))
                                        ? <p className="pay-amnt-shrnk">&#8377; {(this.props.selected_vip_plan.tests[twp.test_id].gold_price || 0)}</p>
                                        : <p className="pay-amnt-shrnk">&#8377; {(this.props.selected_vip_plan.tests[twp.test_id].mrp)}</p>
                                    : price == twp.mrp ?
                                        <p className="pay-amnt-shrnk">&#8377; {price}</p>
                                        :
                                        <p className="pay-amnt-shrnk">&#8377; {parseFloat(twp.mrp)}</p>
                        }
                    </div>
                )
            })
            center_visit_enabled = labDetail.center_visit_enabled

        }

        // if center visi not enabled, check home pick as true
        /*if (!center_visit_enabled) {
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
        }*/
        //VIP TOTAL DATA 

        if (!(this.props.LABS[this.props.selectedLab] && this.props.LABS[this.props.selectedLab].tests && this.props.LABS[this.props.selectedLab].tests.length > 0)) {
            is_all_enable_for_gold = false
            is_all_enable_for_vip = false
        }
        vip_data.vip_amount = vip_total_amount
        vip_data.vip_convenience_amount = vip_total_convenience_amount
        vip_data.vip_gold_price = vip_total_gold_price
        vip_data.is_enable_for_vip = is_all_enable_for_vip
        vip_data.is_gold = is_all_enable_for_gold
        //Check both pathology and radiology pickup status & toggle accordingly if not available
        if (!radiology_tests.length) {
            r_pickup_home = false
        }
        if (!pathology_tests.length) {
            p_pickup_home = false
        }
        let r_pickup = this.props.selectedAppointmentType.r_pickup
        let p_pickup = this.props.selectedAppointmentType.p_pickup
        let reset = false

        if (radiology_tests.length || pathology_tests.length) {

            if (this.props.selectedAppointmentType.r_pickup == 'lab' && !r_pickup_center && (r_pickup_home || !radiology_tests.length)) {
                if (r_pickup_home) {
                    r_pickup = 'home'
                }
                reset = true
            }

            if (this.props.selectedAppointmentType.r_pickup == 'home' && !r_pickup_home && (r_pickup_center || !radiology_tests.length)) {
                if (r_pickup_center) {
                    r_pickup = 'lab'
                }

                reset = true
            }

            if (this.props.selectedAppointmentType.p_pickup == 'lab' && !p_pickup_center && (p_pickup_home || !pathology_tests.length)) {
                if (p_pickup_home) {
                    p_pickup = 'home'
                }
                reset = true
            }

            if (this.props.selectedAppointmentType.p_pickup == 'home' && !p_pickup_home && (p_pickup_center || !pathology_tests.length)) {
                if (p_pickup_center) {
                    p_pickup = 'lab'
                }
                reset = true
            }

            if (!p_pickup_home && !p_pickup_center) {
                p_pickup = null
            }

            if (!r_pickup_home && !r_pickup_center) {
                r_pickup = null
            }

            if (!this.props.selectedAppointmentType.r_pickup && (r_pickup_home || r_pickup_center)) {
                reset = true
                r_pickup = r_pickup_home ? 'home' : r_pickup_center ? 'lab' : ''
            }

            if (!this.props.selectedAppointmentType.p_pickup && (p_pickup_home || p_pickup_center)) {
                reset = true
                p_pickup = p_pickup_home ? 'home' : p_pickup_center ? 'lab' : ''
            }


            if (reset) {
                let selectedType = {
                    r_pickup: r_pickup,
                    p_pickup: p_pickup
                }
                setTimeout(() => {
                    this.props.selectLabAppointmentType(selectedType)
                })
            }
        }

        is_home_collection_enabled = r_pickup_home || p_pickup_home

        // check if the picked address is correct or not
        if (this.props.selectedAppointmentType && (this.props.selectedAppointmentType.r_pickup == 'home' || this.props.selectedAppointmentType.p_pickup == 'home')) {
            if (this.props.address && this.props.address.length && this.props.selectedAddress) {
                this.props.address.map((add) => {
                    if (add.id == this.props.selectedAddress) {
                        address_picked_verified = true
                    }
                })
            }
        }

        let address_picked = address_picked_verified
        if (this.props.selectedAppointmentType && (this.props.selectedAppointmentType.r_pickup == 'lab' || this.props.selectedAppointmentType.p_pickup == 'lab')) {
            address_picked = true
        }

        let labCoupons = this.props.labCoupons[this.props.selectedLab] || []

        let amtBeforeCoupon = 0
        let total_price = finalPrice
        let is_home_charges_applicable = false
        let total_amount_payable_non_plan_user = 0
        if (is_home_collection_enabled && this.props.selectedAppointmentType && (this.props.selectedAppointmentType.r_pickup == 'home' || this.props.selectedAppointmentType.p_pickup == 'home')) {
            is_home_charges_applicable = true
        }
        if (is_home_collection_enabled && finalPrice && is_home_charges_applicable) {
            total_price = finalPrice + (labDetail.home_pickup_charges || 0)
        }
        amtBeforeCoupon = total_price
        let display_radio_cod_price = parseInt(total_price) - (this.props.disCountedLabPrice || 0)

        if (!this.state.is_cashback) {
            total_price = total_price ? parseInt(total_price) - (this.props.disCountedLabPrice || 0) : 0
        }
        total_price = is_corporate || is_insurance_applicable || is_plan_applicable ? 0 : total_price
        let is_vip_gold_applicable = /*is_tests_covered_under_vip && */((is_selected_user_gold && vip_data && vip_data.is_gold) || is_selected_user_under_vip)

        total_amount_payable_non_plan_user = total_price
        if (is_vip_gold_applicable) {
            total_price = finalMrp
        }
        let total_wallet_balance = 0
        if (this.props.userWalletBalance >= 0 && this.props.userCashbackBalance >= 0) {
            total_wallet_balance = this.props.userWalletBalance + this.props.userCashbackBalance
        }

        let is_add_to_card = STORAGE.isAgent() || this.state.cart_item || (!is_corporate && !is_default_user_insured)
        let total_test_count = pathology_tests.length + radiology_tests.length
        let is_time_selected_for_all_tests = this.props.selectedSlot && this.props.selectedSlot.selectedTestsTimeSlot ? Object.keys(this.props.selectedSlot.selectedTestsTimeSlot).length : 0
        let vip_discount_price = 0
        let total_amount_payable = total_price

        if (!total_test_count && is_selected_user_gold) {
            is_vip_gold_applicable = true
        }
        let is_cover_under_vip_gold = false;
        if (vip_data && (vip_data.is_enable_for_vip)) {

            if (is_selected_user_gold) {
                is_cover_under_vip_gold = true;
                if (finalPrice < (vip_data.vip_amount + vip_data.vip_convenience_amount)) {
                    vip_data.is_enable_for_vip = false;
                    is_vip_applicable = false;
                    is_selected_user_gold = false;
                    total_amount_payable = total_amount_payable_non_plan_user;
                    total_price = total_amount_payable_non_plan_user;
                } else {
                    total_amount_payable = vip_data.vip_amount + vip_data.vip_convenience_amount + (is_home_charges_applicable ? labDetail.home_pickup_charges : 0) - (this.state.is_cashback ? 0 : (this.props.disCountedLabPrice || 0))
                    vip_discount_price = finalMrp - (vip_data.vip_amount + vip_data.vip_convenience_amount)
                }
            } else {

                if (is_vip_applicable) {
                    is_cover_under_vip_gold = true;
                    vip_discount_price = finalMrp - vip_data.vip_amount
                    total_amount_payable = vip_data.vip_amount + (is_home_charges_applicable ? labDetail.home_pickup_charges : 0) - (this.state.is_cashback ? 0 : (this.props.disCountedLabPrice || 0))
                } else if (vip_data.is_gold) {
                    vip_discount_price = finalMrp - (vip_data.vip_gold_price + vip_data.vip_convenience_amount)
                }
            }

        } else {

        }

        let currentTestsCount = this.props.LABS[this.props.selectedLab] && this.props.LABS[this.props.selectedLab].tests && this.props.LABS[this.props.selectedLab].tests.length

        let showGoldTogglePaymentMode = !this.props.is_any_user_buy_gold && this.props.selected_vip_plan && this.props.labGoldPredictedPrice && this.props.labGoldPredictedPrice.length && !is_insurance_applicable

        if (!showGoldTogglePaymentMode && this.props.payment_type == 6 && this.props.show_lab_payment_mode) {
            this.props.select_lab_payment_type(1)
        }

        //SET PAYMENT SUMMARY PRICE
        let display_docprime_discount = finalMrp - finalPrice
        if (!this.props.is_any_user_buy_gold && this.props.payment_type == 6 && this.props.selected_vip_plan && this.props.selected_vip_plan.tests) {
            display_docprime_discount = parseInt(gold_pricelist_mrp) - (parseInt(gold_pricelist_deal_price) + parseInt(gold_pricelist_convenience))
            total_amount_payable = this.props.selected_vip_plan.deal_price + parseInt(gold_pricelist_deal_price) + parseInt(gold_pricelist_convenience) + (is_home_charges_applicable && labDetail ? labDetail.home_pickup_charges : 0) // - (this.props.disCountedLabPrice || 0)
            total_price = total_amount_payable
        }
        let extraParams = {
            is_gold_member: vip_data && /*vip_data.is_gold &&*/ is_selected_user_gold,
            total_amount_payable: total_amount_payable
        }

        //Disable All Retail Bookings
        let disable_all_bookings = !(is_cover_under_vip_gold || is_insurance_applicable);
        if(STORAGE.checkAuth()){

        }else{
            disable_all_bookings = false
        }
        return (

            <div className="profile-body-wrap">
                <ProfileHeader bookingPage={true} summaryPage={true}/>
                {
                    this.state.showConfirmationPopup == 'open' && is_selected_user_insurance_status != 4 ?
                        <BookingConfirmationPopup priceConfirmationPopup={this.priceConfirmationPopup.bind(this)} bannerConfirmationPopup={() => { }} isLab={true} />
                        : ''
                }
                {
                    this.state.show_lensfit_popup ?
                        <LensfitPopup {...this.props} lensfit_coupons={this.state.lensfit_coupons} applyLensFitCoupons={this.applyLensFitCoupons.bind(this)} closeLensFitPopup={this.closeLensFitPopup.bind(this)} />
                        : ''
                }
                {
                    //Show Vip Gold Single Flow Price List
                    this.state.showGoldPriceList && <VipGoldPackage historyObj={this.props.history} vipGoldPlans={this.props.labGoldPredictedPrice} toggleGoldPricePopup={this.toggleGoldPricePopup} toggleGoldPlans={(val) => this.toggleGoldPlans(val)} selected_vip_plan={this.props.selected_vip_plan} goToGoldPage={this.goToGoldPage} />
                }
                {
                    this.state.paymentBtnClicked ?
                        <div className="bkng-time-overlay"><Loader /></div> : ''
                }
                <section className="container container-top-margin cls-bnr">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            {
                                this.props.LABS[this.props.selectedLab] && this.props.show_vip_non_login_card ?
                                    <div>
                                        <section className="dr-profile-screen booking-confirm-screen">
                                            <div className="container-fluid">
                                                <div className="row mrb-60">
                                                    <div className="col-12">
                                                        <div className="widget mrb-15 mrng-top-12" onClick={() => {
                                                            this.goToProfile(this.props.selectedLab, labDetail.url)
                                                        }} style={{ cursor: 'pointer' }}>
                                                            <div className="widget-content">
                                                                <div className="lab-visit-time d-flex jc-spaceb">
                                                                    <h4 className="title d-flex">
                                                                        <span>
                                                                            <img style={{ width: '22px', marginRight: '8px' }} src={ASSETS_BASE_URL + "/img/hospital.svg"} />
                                                                        </span>
                                                                        {
                                                                            labDetail.name && labDetail.name.toLowerCase().includes('thyrocare') ?
                                                                                <p className="lab-crd-txt-pr">{labDetail.name.split('-')[0]}
                                                                                    {
                                                                                        this.props.selectedAppointmentType && (this.props.selectedAppointmentType.r_pickup == 'lab' || this.props.selectedAppointmentType.p_pickup == 'lab') ?
                                                                                            <span>{labDetail.address || ''}</span> : ''
                                                                                    }
                                                                                </p>
                                                                                :
                                                                                <p className="lab-crd-txt-pr">{labDetail.name}
                                                                                    {
                                                                                        this.props.selectedAppointmentType == 'lab' && (this.props.selectedAppointmentType.r_pickup == 'lab' || this.props.selectedAppointmentType.p_pickup == 'lab') ?
                                                                                            <span>{labDetail.address || ''}</span> : ''
                                                                                    }
                                                                                </p>
                                                                        }
                                                                    </h4>
                                                                    <span className="text-primary fw-700 text-sm">View Profile</span>
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

                                                        <div className="login">
                                                            {this.getPatientDetails(is_insurance_applicable, center_visit_enabled, is_home_charges_applicable)}
                                                        </div>
                                                        {
                                                            disable_all_bookings?
                                                            <div className="widget mrb-15 info-rtl">
                                                                All bookings are disabled for new retail customers. Please contact us at customercare@docprime.com if you need more information
                                                            </div>
                                                            :''
                                                        }
                                                        <div className={`${(disable_all_bookings || this.state.disable_page && !STORAGE.isAgent() ) ? 'disable-opacity' : ''}`}>
                                                            <div className="widget mrb-15">
                                                                <div className="widget-content">
                                                                    <div className="lab-visit-time d-flex jc-spaceb">
                                                                        <h4 className="title d-flex"><span>
                                                                            <img style={{ width: '22px', marginRight: '8px' }} src={ASSETS_BASE_URL + "/img/flask.svg"} />
                                                                        </span>Test</h4>
                                                                        <div className="float-right  mbl-view-formatting text-right">
                                                                            {
                                                                                is_selected_user_under_vip && !is_selected_user_gold ? ''
                                                                                    : <a style={{ cursor: 'pointer' }} onClick={this.openTests.bind(this)} className="text-primary fw-700 text-sm">Add more/Remove tests</a>

                                                                            }
                                                                            {
                                                                                false && STORAGE.isAgent() && (is_insurance_applicable && prescriptionPicked) && (!is_default_user_insured && !is_corporate && !(parsed && parsed.test_ids)/* && !is_vip_gold_applicable && !is_default_user_under_vip*/) ?
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
                                                                    {radiology_tests}
                                                                    {(r_pickup_center || r_pickup_home) &&
                                                                        <div>
                                                                            <div className="">
                                                                                <div className="test-lab-radio widget-content test-report lab-appointment-div row">

                                                                                    <ul className="inline-list booking-type search-list-radio">
                                                                                        {
                                                                                            r_pickup_home ?
                                                                                                <li><input type="radio" id="home" name="radiology" onChange={this.handlePickupType.bind(this, { r_pickup: 'home', p_pickup: this.props.selectedAppointmentType.p_pickup })} value="home" checked={this.props.selectedAppointmentType && this.props.selectedAppointmentType.r_pickup == 'home'} /><label className="radio-inline lab-appointment-label text-md fw-500 text-primary" htmlFor="home"> Home Pick-up</label></li> : ""
                                                                                        }

                                                                                        {
                                                                                            r_pickup_center ?
                                                                                                <li><input type="radio" id="lab" name="radiology" onChange={this.handlePickupType.bind(this, { r_pickup: 'lab', p_pickup: this.props.selectedAppointmentType.p_pickup })} value="lab" checked={this.props.selectedAppointmentType && this.props.selectedAppointmentType.r_pickup == 'lab'} /> <label className="radio-inline lab-appointment-label text-md fw-500 text-primary" htmlFor="lab">Lab Visit</label></li> : ""
                                                                                        }
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    }

                                                                    {//Pathology Tests}
                                                                    }

                                                                    {pathology_tests}
                                                                    {(p_pickup_center || p_pickup_home) &&
                                                                        <div>
                                                                            <div className="">
                                                                                <div className="test-lab-radio widget-content test-report lab-appointment-div row">

                                                                                    <ul className="inline-list booking-type search-list-radio">
                                                                                        {
                                                                                            p_pickup_home ?
                                                                                                <li><input type="radio" id="phome" name="pathology" onChange={this.handlePickupType.bind(this, { p_pickup: 'home', r_pickup: this.props.selectedAppointmentType.r_pickup })} value="home" checked={this.props.selectedAppointmentType && this.props.selectedAppointmentType.p_pickup == 'home'} /><label className="radio-inline lab-appointment-label text-md fw-500 text-primary" htmlFor="phome"> Home Pick-up</label></li> : ""
                                                                                        }

                                                                                        {
                                                                                            p_pickup_center ?
                                                                                                <li><input type="radio" id="plab" name="pathology" onChange={this.handlePickupType.bind(this, { p_pickup: 'lab', r_pickup: this.props.selectedAppointmentType.r_pickup })} value="lab" checked={this.props.selectedAppointmentType && this.props.selectedAppointmentType.p_pickup == 'lab'} /> <label className="radio-inline lab-appointment-label text-md fw-500 text-primary" htmlFor="plab">Lab Visit</label></li> : ""
                                                                                        }
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                            {
                                                                (is_insurance_applicable && prescriptionPicked) || vip_is_prescription_required ?
                                                                    <UploadPrescription {...this.props} />
                                                                    : ''
                                                            }
                                                            <div className="">
                                                                {this.getSelectors(is_insurance_applicable, center_visit_enabled, is_home_charges_applicable)}
                                                            </div>
                                                            {
                                                                amtBeforeCoupon != 0 && !is_plan_applicable && !is_insurance_applicable && this.props.payment_type != 6/*&& !is_vip_gold_applicable && */ ?
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
                                                                                                this.setState({ use_wallet: true, is_payment_coupon_applied: false })
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
                                                            {/* ============================= gold card details ============================= */}
                                                            {
                                                            /*!showGoldTogglePaymentMode && !is_vip_applicable && !is_selected_user_gold && !is_insurance_applicable && vip_discount_price > 0 && vip_data.is_gold && this.props.show_vip_non_login_card?
                                                            <div className="widget cpn-blur mrb-15 cursor-pointer gold-green-cont" onClick={(e) => {
                                                                e.stopPropagation();
                                                                let analyticData = {
                                                                    'Category': 'ConsumerApp', 'Action': 'LabSummaryVipGoldClick', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'lab-summary-gold-click',
                                                                }
                                                                GTM.sendEvent({ data: analyticData })
                                                                this.props.history.push('/vip-gold-details?is_gold=true&source=lab-summary-vip-gold-click&lead_source=Docprime')
                                                            }}>
                                                                <div className="widget-content d-flex jc-spaceb align-item-center">
                                                                    <div className="gold-crd-lft">
                                                                        <p><span>Save ₹{vip_discount_price}</span> on this appointment </p>
                                                                        <p className="gld-crd-sb-txt">Become <img src={ASSETS_BASE_URL + '/img/gold-sm.png'} /> member @&#8377;199</p>
                                                                    </div>
                                                                    <div className="gold-crd-rgt">
                                                                        <p>Get Gold</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            :''*/}
                                                            {/* ============================= gold card details ============================= */}

                                                            {/*is_insurance_buy_able ?
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
                                                            : ''*/}


                                                            {/******Payment Mode **********/}
                                                            {
                                                                showGoldTogglePaymentMode && this.props.show_lab_payment_mode ?
                                                                    <div className="widget mrb-15">

                                                                        <div className="widget-content">
                                                                            <h4 className="title mb-20">Payment Mode</h4>
                                                                            <React.Fragment>
                                                                                <div className="payment-summary-content">
                                                                                    <div className="payment-detail d-flex" onClick={(e) => {
                                                                                        e.preventDefault();
                                                                                        this.props.select_lab_payment_type(6)
                                                                                    }}>
                                                                                        <label className="container-radio payment-type-radio">
                                                                                            <div onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                                e.preventDefault();
                                                                                            }}>
                                                                                                <h4 className="title payment-amt-label" onClick={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    this.props.select_lab_payment_type(6)
                                                                                                }}> Lab booking with <img className="sng-gld-img" src={ASSETS_BASE_URL + '/img/gold-lg.png'} />
                                                                                                    {/* <span className="gold-qus" onClick={(e)=>{
                                                                                                    e.stopPropagation();
                                                                                                    e.preventDefault();
                                                                                                    this.goToGoldPage()
                                                                                                }}>?</span> */}
                                                                                                </h4>
                                                                                                {
                                                                                                    gold_pricelist_deal_price == gold_pricelist_mrp
                                                                                                        ? <span className="payment-mode-amt" onClick={(e) => {
                                                                                                            e.stopPropagation()
                                                                                                            e.preventDefault();
                                                                                                            this.props.select_lab_payment_type(6)
                                                                                                        }}>{`₹${gold_pricelist_deal_price + gold_pricelist_convenience}`}</span>
                                                                                                        : <span className="payment-mode-amt" onClick={(e) => {
                                                                                                            e.stopPropagation()
                                                                                                            e.preventDefault();
                                                                                                            this.props.select_lab_payment_type(6)
                                                                                                        }}>{`₹${gold_pricelist_deal_price + gold_pricelist_convenience}`} <b className="gd-cut-prc">{`₹${gold_pricelist_mrp}`}</b></span>

                                                                                                }
                                                                                            </div>
                                                                                            <input checked={this.props.payment_type == 6} type="radio" name="payment-mode" value="on" />
                                                                                            <span className="doc-checkmark"></span>
                                                                                        </label>
                                                                                    </div>
                                                                                    {/*<div className="dp-gold-pln-change-container">
                                                                                        <div className="dp-gold-pay-lft">
                                                                                            
                                                                                            <p onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                                e.preventDefault();
                                                                                                this.goToGoldPage()
                                                                                            }} className="dp-gld-txt-mem">{`Docprime Gold: ${this.props.selected_vip_plan.total_allowed_members} Member`}<span>(Know more)</span></p>
                                                                                            <p className="dp-gld-mem-grn">Extra savings on every appointment for 1 year</p>
                                                                                        </div>
                                                                                        <div className="dp-gold-pay-rgt">
                                                                                            <p>{`₹${this.props.selected_vip_plan.deal_price}`}
                                                                                                <img src={ASSETS_BASE_URL + '/img/customer-icons/edit.svg'} onClick={(event) => {
                                                                                                    event.stopPropagation();
                                                                                                    this.toggleGoldPricePopup(true)
                                                                                                }} />
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>*/}
                                                                                    {
                                                                                        this.props.selected_vip_plan && this.props.selected_vip_plan.total_allowed_members?
                                                                                        <div className="benifit-card">
                                                                                            <div className="bnft-content">
                                                                                                <p className="bnft-txt"><strong>{`Save ₹${vip_discount_price}`}</strong> on this appointment</p>
                                                                                                <p className="bnft-subtxt">{`${this.props.selected_vip_plan.total_allowed_members} member plan @Rs${this.props.selected_vip_plan.deal_price}`}<span><img src={ASSETS_BASE_URL + '/img/customer-icons/edit.svg'} onClick={(e) => {
                                                                                                    e.stopPropagation();
                                                                                                    e.preventDefault();
                                                                                                    this.goToGoldPage()
                                                                                                }}/></span></p>
                                                                                            </div>
                                                                                            <div className="bnft-btn" onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                                e.preventDefault();
                                                                                                this.goToGoldPage()
                                                                                            }}>
                                                                                                <button type="button">View All Benefits</button>
                                                                                            </div>
                                                                                        </div>
                                                                                        :''
                                                                                    }
                                                                                    
                                                                                </div>
                                                                                <hr />
                                                                            </React.Fragment>
                                                                            <div className="payment-summary-content" onClick={(e) => {
                                                                                e.preventDefault()
                                                                                this.props.select_lab_payment_type(1)
                                                                            }}>
                                                                                <div className="payment-detail d-flex">
                                                                                    <label className="container-radio payment-type-radio">
                                                                                        <div onClick={(e) => {
                                                                                            e.preventDefault()
                                                                                            e.stopPropagation()
                                                                                            this.props.select_lab_payment_type(1)
                                                                                        }}>
                                                                                            <h4 className="title payment-amt-label">Only Lab booking
                                                                                    {
                                                                                                    total_price == display_radio_cod_price ?
                                                                                                        <span className="payment-sub-heading">No discounts </span>
                                                                                                        : ''
                                                                                                }
                                                                                            </h4>
                                                                                            <span className="payment-mode-amt">{display_radio_cod_price}</span>
                                                                                            {/* {
                                                                                is_insurance_applicable ? ""
                                                                                    : <span className="save-upto">Save {percent_discount}%</span>
                                                                            } */}
                                                                                        </div>

                                                                                        <input checked={this.props.payment_type == 1} type="radio" name="payment-mode" />
                                                                                        <span className="doc-checkmark"></span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    : ''
                                                            }

                                                            {
                                                                is_corporate ? ""
                                                                    : <div className="widget mrb-15">

                                                                        <div className="widget-content clearfix">
                                                                            <h4 className="title mb-20">Payment Summary</h4>
                                                                            {

                                                                                is_plan_applicable || is_insurance_applicable ?
                                                                                    <div className="payment-summary-content">
                                                                                        <div className="payment-detail d-flex">
                                                                                            <p className="payment-content fw-500">MRP</p>
                                                                                            <p className="payment-content fw-500">&#8377; {total_price || 0}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    :
                                                                                    <div className="payment-summary-content">
                                                                                        {tests_with_price}
                                                                                        {vip_data && is_vip_applicable && !(vip_data /*&& vip_data.is_gold && is_tests_covered_under_vip*/ && is_selected_user_gold) ? <div className="payment-detail d-flex">
                                                                                            <p style={{ color: 'green' }}>Docprime VIP Member <img className="vip-main-ico img-fluid" src={ASSETS_BASE_URL + '/img/viplog.png'} /></p>
                                                                                            <p style={{ color: 'green' }}>- &#8377; {total_price - vip_data.vip_amount}</p>
                                                                                        </div> : ''}
                                                                                        {
                                                                                            vip_data /*&& vip_data.is_gold */ && is_selected_user_gold && vip_discount_price ?
                                                                                                <div className="payment-detail d-flex">
                                                                                                    <p style={{ color: 'green' }}>Docprime Gold Discount <img className="vip-main-ico img-fluid" src={ASSETS_BASE_URL + '/img/gold-sm.png'} /></p>
                                                                                                    <p style={{ color: 'green' }}>- &#8377; {vip_discount_price}</p>
                                                                                                </div>
                                                                                                : ''
                                                                                        }

                                                                                        {
                                                                                            //When Gold Membership is buying
                                                                                            showGoldTogglePaymentMode && this.props.payment_type == 6 && this.props.selected_vip_plan && this.props.selected_vip_plan.deal_price ?
                                                                                                <div className="payment-detail d-flex">
                                                                                                    <p>Docprime Gold Membership </p>
                                                                                                    <p> &#8377; {this.props.selected_vip_plan.deal_price}</p>
                                                                                                </div> : ''
                                                                                        }
                                                                                        {
                                                                                            (total_price && is_home_collection_enabled && is_home_charges_applicable) ? <div className="payment-detail d-flex">
                                                                                                <p className="payment-content">Home Pickup Charges</p>
                                                                                                <p className="payment-content fw-500">&#8377; {labDetail.home_pickup_charges || 0}</p>
                                                                                            </div> : ""
                                                                                        }
                                                                                        {display_docprime_discount && !is_vip_applicable && !(vip_data/* && vip_data.is_gold && is_tests_covered_under_vip*/ && is_selected_user_gold) ? <div className="payment-detail d-flex">
                                                                                            <p style={{ color: 'green' }}>{this.props.payment_type == 6 ? 'Docprime Gold Discount' : 'Docprime Discount'}</p>
                                                                                            <p style={{ color: 'green' }}>- &#8377; {display_docprime_discount}</p>
                                                                                        </div> : ''}
                                                                                        {
                                                                                            this.props.disCountedLabPrice && !this.state.is_cashback && this.props.payment_type != 6/*&& !is_vip_applicable && !(vip_data && vip_data.is_gold && is_selected_user_gold && is_tests_covered_under_vip) && this.props.payment_type!=6*/ ? <div className="payment-detail d-flex">
                                                                                                <p style={{ color: 'green' }}>Coupon Discount</p>
                                                                                                <p style={{ color: 'green' }}>-&#8377; {this.props.disCountedLabPrice}</p>
                                                                                            </div>
                                                                                                : ''
                                                                                        }
                                                                                        {
                                                                                            /*(is_home_collection_enabled && this.props.selectedAppointmentType == 'home') ? <div className="payment-detail d-flex">
                                                                                                <p className="payment-content fw-500">MRP</p>
                                                                                                <p className="payment-content fw-500">&#8377; {total_price || 0}</p>
                                                                                            </div> : <div className="payment-detail d-flex">
                                                                                                    <p className="payment-content fw-500">MRP</p>
                                                                                                    <p className="payment-content fw-500">&#8377; {total_price || 0}</p>
                                                                                                </div>*/
                                                                                        }
                                                                                    </div>
                                                                            }
                                                                            <hr />

                                                                            <div className="lab-visit-time test-report">
                                                                                <h4 className="title payment-amt-label">Amount Payable</h4>
                                                                                <h5 className="payment-amt-value fw-500">&#8377;  {total_amount_payable}</h5>
                                                                                {/*
                                                                                is_home_charges_applicable ? <h5 className="payment-amt-value fw-500">&#8377;  {total_amount_payable}</h5> : <h5 className="payment-amt-value fw-500">&#8377;  {is_vip_applicable?vip_amount: total_price || 0}</h5>
                                                                            */}


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
                                                                this.props.payment_type != 6 && !is_insurance_applicable && total_wallet_balance && total_wallet_balance > 0 ?
                                                                    <div className={"widget mrb-15" + (this.state.is_payment_coupon_applied ? " disable_coupon" : "")}>
                                                                        <div className="widget-content">
                                                                            <div className="select-pt-form">
                                                                                <div className="referral-select mb-0">
                                                                                    <label className="ck-bx" style={{ fontWeight: '600', fontSize: '14px' }}>Use docprime wallet money<input type="checkbox" onChange={this.toggleWalletUse.bind(this)} checked={this.state.use_wallet} /><span className="checkmark"></span></label>
                                                                                    <span className="rfrl-avl-balance">Available <img style={{ width: '6px', marginTop: '5px', marginRight: '3px' }} src={ASSETS_BASE_URL + "/img/rupee-icon.svg"} />{total_wallet_balance}</span>
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

                                                            <div className="mrt-20 d-flex align-items-start labTest-dtls">
                                                                <img src={ASSETS_BASE_URL + '/img/customer-icons/tick.svg'} style={{ marginRight: 8, width: 20, marginTop: 2 }} />
                                                                <p className="fw-500" style={{ flex: 1 }} >By continuing, you are authorizing Docprime to directly share lab test reports with you.</p>
                                                            </div>
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
                                this.state.openCancellation ? <CancelationPolicy props={this.props} toggle={this.toggle.bind(this, 'openCancellation')} is_insurance_applicable={is_insurance_applicable} /> : ""
                            }


                            <div className={`${disable_all_bookings?'disable-opacity':''} fixed sticky-btn p-0 v-btn  btn-lg horizontal bottom no-round text-lg buttons-addcart-container ${!is_add_to_card && this.props.ipd_chat && this.props.ipd_chat.showIpdChat ? 'ipd-foot-btn-duo' : ''} ${this.state.disable_page && !STORAGE.isAgent() ? 'disable-all' : ''}`}>
                                {
                                    (STORAGE.isAgent() || this.state.cart_item || (!is_corporate && !is_default_user_insured && this.props.payment_type != 6)) ?
                                        <button disabled={this.state.pay_btn_loading} className={"add-shpng-cart-btn" + (!this.state.cart_item ? "" : " update-btn") + (this.state.pay_btn_loading ? " disable-all" : "")} data-disabled={
                                            !(patient && this.props.selectedSlot && this.props.selectedSlot.selectedTestsTimeSlot) || this.state.loading
                                        } onClick={this.proceed.bind(this, total_test_count, address_picked, is_time_selected_for_all_tests, patient, true, total_amount_payable, total_wallet_balance, prescriptionPicked, is_selected_user_insurance_status, {}, vip_is_prescription_required)}>
                                            {
                                                this.state.cart_item ? "" : <img src={ASSETS_BASE_URL + "/img/cartico.svg"} />
                                            }
                                            {(this.state.is_spo_appointment || (this.props.payment_type == 6 && STORAGE.isAgent())) ? 'Send SMS' : this.state.cart_item ? "Update" : "Add to Cart"}
                                        </button>
                                        : ''
                                }

                                {
                                    STORAGE.isAgent() && this.props.payment_type == 6 ?
                                        <button disabled={this.state.pay_btn_loading} className={"add-shpng-cart-btn" + (!this.state.cart_item ? "" : " update-btn") + (this.state.pay_btn_loading ? " disable-all" : "")} data-disabled={
                                            !(patient && this.props.selectedSlot && this.props.selectedSlot.selectedTestsTimeSlot) || this.state.loading
                                        } onClick={this.proceed.bind(this, total_test_count, address_picked, is_time_selected_for_all_tests, patient, true, total_amount_payable, total_wallet_balance, prescriptionPicked, is_selected_user_insurance_status, { sendWhatsup: true }, vip_is_prescription_required)}>
                                            <img className="img-fluid" src={ASSETS_BASE_URL + '/img/wa-logo-sm.png'} />Send on Whatsapp
                                    </button>
                                        : ''
                                }

                                {
                                    STORAGE.isAgent() || this.state.cart_item ? "" : <button disabled={this.state.pay_btn_loading} className={`v-btn-primary book-btn-mrgn-adjust pdd-12 ${this.state.pay_btn_loading ? " disable-all" : ""}`} id="confirm_booking" data-disabled={
                                        !(patient && this.props.selectedSlot && this.props.selectedSlot.selectedTestsTimeSlot) || this.state.loading
                                    } onClick={this.proceed.bind(this, total_test_count, address_picked, is_time_selected_for_all_tests, patient, false, total_amount_payable, total_wallet_balance, prescriptionPicked, is_selected_user_insurance_status, {}, vip_is_prescription_required)}>{this.getBookingButtonText(total_wallet_balance, total_price, is_vip_applicable, vip_data && vip_data.vip_amount ? vip_data.vip_amount : 0, extraParams)}</button>
                                }
                            </div>

                            {
                                this.state.error ?
                                    <BookingError message={this.state.error} closeErrorPopup={this.closeErrorPopup} /> : ''
                            }

                        </div>

                        <RightBar extraClass=" chat-float-btn-2" type="lab" noChatButton={true} msgTemplate="gold_general_template" />
                    </div>
                </section>
                <Disclaimer />
                {
                    this.state.paymentData ? <PaymentForm multiOrder={this.props.payment_type === 6} paymentData={this.state.paymentData} refs='lab' /> : ""
                }
            </div>

        );
    }
}


export default BookingSummaryViewNew
