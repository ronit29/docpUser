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


class PatientDetailsNew extends React.Component {
    constructor(props) {
        super(props)
        // const parsed = queryString.parse(this.props.location.search)
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
            showTimeError: false
            // order_id: !!parsed.order_id
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

        if (this.props.location.search.includes("error_code")) {
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Could not complete payment, Try again!" })
            }, 500)
            this.props.history.replace(this.props.location.pathname)
        }

        let hospital ={}
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

        if (this.props.doctorCoupons && this.props.doctorCoupons[this.state.selectedDoctor] && this.props.doctorCoupons[this.state.selectedDoctor].length) {
            let doctorCoupons = this.props.doctorCoupons[this.state.selectedDoctor]
            if (this.props.selectedSlot.selectedClinic == this.state.selectedClinic && this.props.selectedSlot.selectedDoctor == this.state.selectedDoctor) {

                let treatment_Price = 0
                let selectedProcedures = {}
                if (this.props.selectedDoctorProcedure[this.state.selectedDoctor] && this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic] && this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].price) {

                    treatment_Price = this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].price.deal_price || 0
                }
                let deal_price = this.props.selectedSlot.time.deal_price + treatment_Price

                this.setState({ couponCode: doctorCoupons[0].code, couponId: doctorCoupons[0].coupon_id || '' })
                this.props.applyOpdCoupons('1', doctorCoupons[0].code, doctorCoupons[0].coupon_id, this.state.selectedDoctor, deal_price)
            }else if(hospital){
                let deal_price = hospital.deal_price
                this.setState({ couponCode: doctorCoupons[0].code, couponId: doctorCoupons[0].coupon_id || '' })
                this.props.applyOpdCoupons('1', doctorCoupons[0].code, doctorCoupons[0].coupon_id, this.state.selectedDoctor, deal_price)

            }
        } else {
            let deal_price = 0
            if (this.props.selectedSlot.time && this.props.selectedSlot.time.deal_price) {
                deal_price = this.props.selectedSlot.time.deal_price
            }else if(hospital){
                deal_price = hospital.deal_price
            }

            let treatment_Price = 0
            if (this.props.selectedDoctorProcedure[this.state.selectedDoctor] && this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic] && this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].price) {

                treatment_Price = this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].price.deal_price || 0
            }

            deal_price += treatment_Price
            //auto apply coupon if no coupon is apllied
            if (this.state.selectedDoctor && deal_price && this.props.couponAutoApply) {
                this.props.getCoupons(1, deal_price, (coupons) => {
                    if (coupons && coupons[0]) {
                        this.setState({ couponCode: coupons[0].code, couponId: coupons[0].coupon_id || '' })
                        this.props.applyCoupons('1', coupons[0], coupons[0].coupon_id, this.state.selectedDoctor)
                        this.props.applyOpdCoupons('1', coupons[0].code, coupons[0].coupon_id, this.state.selectedDoctor, deal_price)
                    } else {
                        this.props.resetOpdCoupons()
                    }
                })
            } else {
                this.props.resetOpdCoupons()
            }
        }


    }

    profileDataCompleted(data){
        if(data.name =='' || data.gender == '' || data.phoneNumber =='' || !data.otpVerifySuccess){
            this.setState({profileDataFilled: false, showTimeError: false})
        }else if(data.otpVerifySuccess){
            this.setState({profileDataFilled: true, showTimeError: false})
        }
    }

    proceed(datePicked, e) {

        if (!datePicked) {
            this.setState({ showTimeError: true });
            SnackBar.show({ pos: 'bottom-center', text: "Please pick a time slot." });
            return
        }
        if(!this.state.profileDataFilled){
            SnackBar.show({ pos: 'bottom-center', text: "Please fill the info" });
            return   
        }
        if (e.target.dataset.disabled == true) {
            return
        }

        this.setState({ loading: true, error: "" })

        let start_date = this.props.selectedSlot.date
        let start_time = this.props.selectedSlot.time.value

        let postData = {
            doctor: this.state.selectedDoctor,
            hospital: this.state.selectedClinic,
            profile: this.props.selectedProfile,
            start_date, start_time,
            payment_type: 1
        }
        if (this.props.disCountedOpdPrice) {
            postData['coupon_code'] = [this.state.couponCode] || []
        }

        let procedure_ids = []
        if (this.props.selectedDoctorProcedure[this.state.selectedDoctor] && this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic] && this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].categories) {

            Object.values(this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].categories).map((procedure) => {

                procedure_ids = procedure_ids.concat(procedure.filter(x => x.is_selected).map(x => x.procedure_id))
            })
            if (procedure_ids.length) {
                postData['procedure_ids'] = procedure_ids || []
            }
        }

        let analyticData = {
            'Category': 'ConsumerApp', 'Action': 'OpdProceedButtonClicked', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'opd-proceed-button-clicked'
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

                    // this.setState({
                    //     paymentData: data.data
                    // }, () => {
                    //     setTimeout(() => {
                    //         let form = document.getElementById('paymentForm')
                    //         form.submit()
                    //     }, 500)

                    //     setTimeout(() => {
                    //         this.setState({ loading: false })
                    //     }, 5000)
                    // })

                } else {
                    // send back to appointment page
                    this.props.history.replace(`/opd/appointment/${data.data.id}?payment_success=true`)
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
                this.props.history.push(`/opd/doctor/${this.state.selectedDoctor}/${this.state.selectedClinic}/book?goback=true`)
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
        let analyticData = {
            'Category': 'ConsumerApp', 'Action': 'OpdCouponsClicked', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'opd-coupons-clicked'
        }
        GTM.sendEvent({ data: analyticData })
        this.props.history.push(`/coupon/opd/${this.state.selectedDoctor}/${this.state.selectedClinic}`)
    }

    render() {
        let doctorDetails = this.props.DOCTORS[this.state.selectedDoctor]
        let doctorCoupons = this.props.doctorCoupons[this.state.selectedDoctor] || []
        let hospital = {}
        let patient = null
        let priceData = {}

        if (doctorDetails) {
            let { name, qualifications, hospitals } = doctorDetails

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
        }

        if (this.props.selectedSlot && this.props.selectedSlot.date) {
            priceData = { ...this.props.selectedSlot.time }
            priceData.payable_amount = priceData.deal_price

            // reset time slot if doctor/hospital changes
            if (this.props.selectedSlot.selectedClinic != this.state.selectedClinic || this.props.selectedSlot.selectedDoctor != this.state.selectedDoctor) {
                let slot = { time: {} }
                this.props.selectOpdTimeSLot(slot, false)
            }
        }else if(hospital){
            priceData.mrp = hospital.mrp
            priceData.deal_price = hospital.deal_price
            priceData.payable_amount = hospital.deal_price
        }
        let treatment_Price = 0, treatment_mrp = 0
        let selectedProcedures = {}
        if (this.props.selectedDoctorProcedure[this.state.selectedDoctor] && this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic] && this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].price) {

            treatment_Price = this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].price.deal_price || 0
            treatment_mrp = this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].price.mrp || 0
            selectedProcedures = this.props.selectedDoctorProcedure[this.state.selectedDoctor][this.state.selectedClinic].categories
        }

        let total_price = priceData.deal_price + treatment_Price
        let finalPrice = total_price ? parseInt(total_price) - (this.props.disCountedOpdPrice ? this.props.disCountedOpdPrice : 0) : 0

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            {
                                this.props.DOCTORS[this.state.selectedDoctor] ?
                                    <div>
                                        <section className="dr-profile-screen booking-confirm-screen">
                                            <div className="container-fluid">
                                                <div className="row mrb-20">
                                                    <div className="col-12">
                                                            <SelectedClinic
                                                                boxShadowHide={true}
                                                                selectedDoctor={this.props.DOCTORS[this.state.selectedDoctor]}
                                                                selectedClinic={this.state.selectedClinic}
                                                            />
                                                            <div className="widget mrb-15">
                                                                <VisitTimeNew type="home" navigateTo={this.navigateTo.bind(this)} selectedSlot={this.props.selectedSlot} timeError={this.state.showTimeError}/>
                                                            </div>
                                                            <ChoosePatientNewView patient={patient} navigateTo={this.navigateTo.bind(this)} {...this.props} profileDataCompleted={this.profileDataCompleted.bind(this)}/>
                                                            {
                                                                Object.values(selectedProcedures).length ?
                                                                    <ProcedureView selectedProcedures={selectedProcedures} priceData={priceData} />
                                                                    : ''/*<div className="clearfix pb-list proc-padding-list">
                                                                        <span className="test-price txt-ornage">₹ {priceData.deal_price}<span className="test-mrp">₹ {priceData.mrp}</span></span><span className="fw-500 test-name-item">Doctor consultation</span></div>*/
                                                            }

                                                            {
                                                            (priceData.deal_price + treatment_Price) != 0 ?
                                                                <div className="widget mrb-15 cursor-pointer" onClick={this.applyCoupons.bind(this)}>
                                                                        {
                                                                            doctorCoupons.length ?
                                                                                <div className="widget-content d-flex jc-spaceb" >
                                                                                    <div className="d-flex">
                                                                                        <span className="coupon-img">
                                                                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/coupon-applied.svg"} className="visit-time-icon" />
                                                                                        </span>
                                                                                        <h4 className="title coupon-text" style={{ color: 'green' }}>
                                                                                            Coupon Applied
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
                                                                                            <img style={{width: '24px'}} src={ASSETS_BASE_URL + "/img/ofr-cpn.svg"} className="visit-time-icon" />
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

                                                            <div className="widget mrb-15">

                                                                <div className="widget-content">
                                                                    <h4 className="title mb-20">Payment Summary</h4>
                                                                    <div className="payment-summary-content">
                                                                        <div className="payment-detail d-flex">
                                                                            <p>Subtotal</p>
                                                                            <p>&#8377; {parseInt(priceData.mrp) + treatment_mrp}</p>
                                                                        </div>
                                                                        <div className="payment-detail d-flex">
                                                                            <p>docprime discount</p>
                                                                            <p>- &#8377; {(parseInt(priceData.mrp) + treatment_mrp) - (parseInt(priceData.deal_price) + treatment_Price)}</p>
                                                                        </div>
                                                                        {
                                                                            this.props.disCountedOpdPrice
                                                                                ? <div className="payment-detail d-flex">
                                                                                    <p style={{ color: 'green' }}>Coupon discount</p>
                                                                                    <p style={{ color: 'green' }}>-&#8377; {this.props.disCountedOpdPrice}</p>
                                                                                </div>
                                                                                : ''
                                                                        }
                                                                        {
                                                                            /*    treatment_Price ?
                                                                                    <div className="payment-detail d-flex">
                                                                                        <p>Treatment</p>
                                                                                        <p> &#8377; {treatment_Price}</p>
                                                                                    </div>
                                                                                    : ''
                                                                            
                                                                            <div className="payment-detail d-flex">
                                                                                <p>Subtotal</p>
                                                                                <p> &#8377; {finalPrice || 0}</p>
                                                                            </div>*/
                                                                        }
                                                                    </div>
                                                                    <hr />

                                                                    {
                                                                        priceData ? <div className="test-report payment-detail mt-20">
                                                                            <h4 className="title payment-amt-label">Amount Payable</h4>
                                                                            <h5 className="payment-amt-value">&#8377; {finalPrice || 0}</h5>
                                                                        </div> : ""
                                                                    }

                                                                </div>
                                                            </div>

                                                            <div className="lab-visit-time test-report" style={{ marginTop: 10, cursor: 'pointer', marginBottom: 0 }} onClick={this.toggle.bind(this, 'openCancellation')}>
                                                                <h4 className="title payment-amt-label fs-italic">Free Cancellation<span style={{ marginLeft: 5 }}><img src={ASSETS_BASE_URL + "/img/icons/info.svg"} /></span></h4>
                                                            </div>

                                                            <a href="/terms" target="_blank">
                                                                <div className="lab-visit-time test-report" style={{ marginTop: 10 }}>
                                                                    <h4 className="title payment-amt-label fs-italic">Terms of Use<span><img className="info-icon-img" src={ASSETS_BASE_URL + "/img/icons/info.svg"} /></span></h4>
                                                                    <span className="errorMessage">{this.state.error}</span>
                                                                </div>
                                                            </a>

                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                    </div> : <Loader />
                            }

                            {
                                this.state.openCancellation ? <CancelationPolicy toggle={this.toggle.bind(this, 'openCancellation')} /> : ""
                            }

                            {
                                this.state.order_id ? <button onClick={this.sendAgentBookingURL.bind(this)} className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn">Send SMS EMAIL</button> : <button className="p-2 v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn" data-disabled={
                                    !(patient && this.props.selectedSlot && this.props.selectedSlot.date) || this.state.loading
                                } disabled={this.state.loading || !patient} onClick={this.proceed.bind(this, (this.props.selectedSlot && this.props.selectedSlot.date))}>{!patient ? 'Select Patient' : `Confirm Booking  ${priceData.deal_price ? ` (₹ ${finalPrice || 0})` : ''}`}</button>
                            }

                        </div>

                        <RightBar extraClass="chat-float-btn-2" />
                    </div>
                </section>
            </div>
        );
    }
}


export default PatientDetailsNew
