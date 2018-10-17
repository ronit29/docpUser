import React from 'react';
import { connect } from 'react-redux'
import SnackBar from 'node-snackbar'
import Loader from '../../commons/Loader'
import VisitTimeNew from './VisitTimeNew'
import PickupAddress from './pickupAddress'
import ChoosePatientNewView from './choosePatientNew'
import InitialsPicture from '../../commons/initialsPicture'
// const queryString = require('query-string');

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'

import CancelationPolicy from './cancellation.js'
import PaymentSummary from './paymentSummary.js'
import GTM from '../../../helpers/gtm.js'


class BookingSummaryViewNew extends React.Component {
    constructor(props) {
        super(props)
        // const parsed = queryString.parse(this.props.location.search)
        this.state = {
            selectedLab: this.props.match.params.id,
            paymentData: {},
            loading: false,
            error: "",
            openCancellation: false,
            openPaymentSummary: false,
            // order_id: !!parsed.order_id,
            order_id: false,
            showTimeError: false,
            couponCode: '',
            couponId:''
        }
    }

    toggle(which) {
        this.setState({ [which]: !this.state[which] })
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }

        if (this.props.location.search.includes("error_code")) {
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Could not complete payment, Try again!" })
            }, 500)
            this.props.history.replace(this.props.location.pathname)
        }
        this.props.resetLabCoupons()
    }


    componentWillReceiveProps(nextProps){
            
            if(nextProps.labCoupons && nextProps.labCoupons[this.state.selectedLab] && nextProps.labCoupons[this.state.selectedLab].length && nextProps.LABS[this.state.selectedLab] && nextProps.LABS[this.state.selectedLab].tests ){
 
                let is_home_collection_enabled= true, finalPrice= 0, finalMrp= 0
                let labCoupons = nextProps.labCoupons[this.state.selectedLab]

                if(this.props.LABS[this.state.selectedLab] != nextProps.LABS[this.state.selectedLab]){


                    nextProps.LABS[this.state.selectedLab].tests.map((twp, i) => {
                        let price = twp.deal_price
                        let mrp = twp.mrp
                        // check if any of the selected test does not allow home_pickup_available
                        if (!twp.is_home_collection_enabled) {
                            is_home_collection_enabled = false
                        }
                        finalPrice += parseFloat(price)
                        finalMrp += parseFloat(mrp)
                    })

                    if(this.props.LABS[this.state.selectedLab] && this.props.LABS[this.state.selectedLab].lab && is_home_collection_enabled){
                        finalPrice = finalPrice + (this.props.LABS[this.state.selectedLab].lab.home_pickup_charges || 0)
                    }
                     
                    this.setState({couponCode: labCoupons[0].couponCode , couponId: labCoupons[0].couponId || ''})
                 this.props.applyLabCoupons('2', labCoupons[0].couponCode ,labCoupons[0].couponId,this.state.selectedLab,finalPrice )
                }
            }
        }

    openTests() {
        this.props.history.push(`/lab/${this.state.selectedLab}/tests`)
    }

    handlePickupType(e) {
        //always clear selected time at lab profile
        let slot = { time: {} }
        this.props.selectLabTimeSLot(slot, false)
        this.props.selectLabAppointmentType(e.target.value)
    }

    navigateTo(where, e) {
        switch (where) {
            case "time": {
                this.props.history.push(`/lab/${this.state.selectedLab}/timeslots?type=${this.props.selectedAppointmentType}&goback=true`)
                return
            }

            case "patient": {
                this.props.history.push(`/user/family?pick=true`)
                return
            }
        }
    }

    getSelectors() {
        let patient = null
        if (this.props.profiles[this.props.selectedProfile] && !this.props.profiles[this.props.selectedProfile].isDummyUser) {
            patient = this.props.profiles[this.props.selectedProfile]
        }

        switch (this.props.selectedAppointmentType) {
            case "lab": {
                return <div>
                    <VisitTimeNew type="lab" navigateTo={this.navigateTo.bind(this)} selectedSlot={this.props.selectedSlot} timeError={this.state.showTimeError} />
                    <ChoosePatientNewView patient={patient} navigateTo={this.navigateTo.bind(this)} />
                </div>
            }

            case "home": {
                return <div>
                    <PickupAddress {...this.props} />
                    <VisitTimeNew type="home" navigateTo={this.navigateTo.bind(this)} selectedSlot={this.props.selectedSlot} />         
                    <ChoosePatientNewView patient={patient} navigateTo={this.navigateTo.bind(this)} />
                </div>
            }
        }
    }

    proceed(testPicked, addressPicked, datePicked, e) {

        if (!testPicked) {
            SnackBar.show({ pos: 'bottom-center', text: "Please select some tests." });
            return
        }
        if (!addressPicked) {
            SnackBar.show({ pos: 'bottom-center', text: "Please pick an address." });
            return
        }
        if (!datePicked) {
            this.setState({ showTimeError: true });
            SnackBar.show({ pos: 'bottom-center', text: "Please pick a time slot." });
            return
        }
        if (e.target.dataset.disabled == true) {
            return
        }

        this.setState({ loading: true, error: "" })

        let start_date = this.props.selectedSlot.date
        let start_time = this.props.selectedSlot.time.value
        let testIds = this.props.lab_test_data[this.state.selectedLab] || []
        testIds = testIds.map(x => x.id)

        let postData = {
            lab: this.state.selectedLab,
            test_ids: testIds,
            profile: this.props.selectedProfile,
            start_date, start_time, is_home_pickup: this.props.selectedAppointmentType == 'home', address: this.props.selectedAddress,
            payment_type: 1 // TODO : Select payment type
        }
        if(this.props.disCountedLabPrice){
            postData['coupon_code'] = [this.state.couponCode] || []
        }

        let data = {
            'Category': 'ConsumerApp', 'Action': 'LabProceedClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-proceed-clicked'
        }

        GTM.sendEvent({ data: data })

        data = {
            'Category': 'ConsumerApp', 'Action': 'AppointmentType', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'appointment-type', 'appointmentType': this.props.selectedAppointmentType || ''
        }

        GTM.sendEvent({ data: data })

        this.props.createLABAppointment(postData, (err, data) => {
            if (!err) {
                this.props.removeLabCoupons(this.state.selectedLab,this.state.couponId)
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
                    this.props.history.replace(`/lab/appointment/${data.data.id}?payment_success=true`)
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

    render() {

        let tests = []
        let finalPrice = 0
        let finalMrp = 0
        let home_pickup_charges = 0
        let labDetail = {}
        let patient = null
        let is_home_collection_enabled = true
        let address_picked_verified = false

        if (this.props.profiles[this.props.selectedProfile] && !this.props.profiles[this.props.selectedProfile].isDummyUser) {
            patient = this.props.profiles[this.props.selectedProfile]
        }

        if (this.props.LABS[this.state.selectedLab]) {
            labDetail = this.props.LABS[this.state.selectedLab].lab

            tests = this.props.LABS[this.state.selectedLab].tests.map((twp, i) => {
                let price = twp.deal_price
                let mrp = twp.mrp
                // check if any of the selected test does not allow home_pickup_available
                if (!twp.is_home_collection_enabled) {
                    is_home_collection_enabled = false
                }
                finalPrice += parseFloat(price)
                finalMrp += parseFloat(mrp)

                return <p key={i} className="test-list test-list-label clearfix"><span className="float-right fw-700">&#8377; {price}</span><span className="test-name-item">{twp.test.name}</span></p>
            })

        }

        // if home pickup not available but selected type is home , then change in next iteration
        if (!is_home_collection_enabled && this.props.selectedAppointmentType == 'home') {
            // using timeout to skip this render iteration
            setTimeout(() => {
                this.props.selectLabAppointmentType('lab')
            })
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

        let labCoupons = this.props.labCoupons[this.state.selectedLab] || []

        return (

            <div className="profile-body-wrap">
            <ProfileHeader />
            <section className="container parent-section book-appointment-section">
                <div className="row main-row parent-section-row">
                    <LeftBar />
                    <div className="col-12 col-md-7 col-lg-7 center-column">
                    {
                                this.props.LABS[this.state.selectedLab] ?
                        <div>
                            <section className="dr-profile-screen booking-confirm-screen">
                                <div className="container-fluid">
                                    <div className="row mrb-20">
                                        <div className="col-12">
                                            <div className="widget mrt-10 ct-profile skin-white">
                                                <div className="test-report widget-content">
                                                    <h4 className="title"><span><img src={ASSETS_BASE_URL + "/img/customer-icons/test.svg"} className="visit-time-icon" /></span>Tests <span className="float-right"><a style={{ cursor: 'pointer' }} onClick={this.openTests.bind(this)} className="text-primary fw-700 text-sm">Add more tests</a></span></h4>
                                                        {tests}
                                                </div>
                                                
                                                {
                                                is_home_collection_enabled ?
                                                <div>
                                                    <div className="widget-content test-report lab-appointment-div row">
                                                        <h4 className="title"><span><img src={ASSETS_BASE_URL + "/img/icons/home-orange.svg"} className="visit-time-icon homePickup" /></span>{labDetail.name}</h4>
                                                    </div> 
                                                    <div className="colorPink">
                                                        <div className="widget-content test-report lab-appointment-div row">

                                                            <ul className="inline-list booking-type search-list-radio">
                                                                <li><input type="radio" id="home" name="radio-group" onChange={this.handlePickupType.bind(this)} value="home" checked={this.props.selectedAppointmentType == 'home'} /><label className="radio-inline lab-appointment-label text-md fw-500 text-primary" for="home"> Home Pick-up</label></li>
                                                                <li><input type="radio" id="lab" name="radio-group"  onChange={this.handlePickupType.bind(this)} value="lab" checked={this.props.selectedAppointmentType == 'lab'} /> <label className="radio-inline lab-appointment-label text-md fw-500 text-primary" for="lab">Lab Visit</label></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>: ""
                                                }

                                                <div className="widget-content">
                                                    {this.getSelectors()}    
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">

                                        <div className="widget mrt-10 ct-profile skin-white cursor-pointer" onClick={() => {
                                                this.props.history.push(`/coupon/lab/${this.state.selectedLab}/coupons`)}}>         
                                                    {
                                                        labCoupons.length
                                                        ?
                                                        <div className="widget-content  d-flex jc-spaceb" >
                                                            <div className="d-flex">
                                                                <span className="coupon-img">
                                                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/coupon-applied.svg"} className="visit-time-icon" />
                                                                </span>
                                                                <h4 className="title coupon-text" style={{color:'green'}}>
                                                                    Coupon Applied
                                                                </h4>
                                                            </div>
                                                            <div className=" d-flex">
                                                                <h4 className="title coupon-text" style={{color:'green',marginRight: 13}}>
                                                                    {labCoupons[0].couponCode}
                                                                </h4>
                                                                <span className="visit-time-icon coupon-icon">
                                                                    <img onClick={(e) => {
                                                            e.stopPropagation();
                                                            this.props.removeLabCoupons(this.state.selectedLab,labCoupons[0].couponId)
                                                        }} src={ASSETS_BASE_URL + "/img/customer-icons/cross.svg"}/>
                                                                </span>
                                                            </div>
                                                        </div>:
                                                    <div className="widget-content d-flex jc-spaceb" >
                                                        <div className="d-flex">
                                                            <span className="coupon-img">
                                                                <img src={ASSETS_BASE_URL + "/img/customer-icons/coupon.svg"} className="visit-time-icon" />
                                                            </span>  
                                                            <h4 className="title coupon-text">
                                                                HAVE A COUPON?
                                                            </h4>
                                                        </div>
                                                        <div className="visit-time-icon coupon-icon-arrow">
                                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/right-arrow.svg"}/>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            {/* <div className="widget mrt-10 ct-profile skin-white">
                                                           
                                                <div className="widget-content">
                                                    <p className="coupon-link" onClick={() => {
                                                this.props.history.push(`/coupon/lab/${this.state.selectedLab}`)}}> HAVE A COUPON?</p>
                                                </div>
                                            </div> */}
                                        </div>
                                        <div className="col-12">
                                            <div className="widget mrt-10 ct-profile skin-white">
                                                           
                                                <div className="widget-content">
                                                    <h4 className="title mb-20">Payment Summary</h4>
                                                    <div className="payment-summary-content">
                                                        <div className="payment-detail d-flex">
                                                        <p>Lab fees</p>
                                                        <p>&#8377; {finalMrp}</p>
                                                    </div>
                                                    {
                                                        (is_home_collection_enabled && this.props.selectedAppointmentType == 'home')? <div className="payment-detail d-flex">
                                                            <p className="payment-content">Home Pickup Charges</p>
                                                            <p className="payment-content fw-500">&#8377; {labDetail.home_pickup_charges || 0}</p>
                                                        </div> : ""
                                                    }
                                                    <div className="payment-detail d-flex">
                                                        <p>Docprime discount</p>
                                                        <p>&#8377; {finalMrp - finalPrice}</p>
                                                    </div>
                                                    {
                                                        this.props.disCountedLabPrice
                                                        ?<div className="payment-detail d-flex">
                                                            <p  style={{color:'green'}}>Coupon discount</p>
                                                            <p  style={{color:'green'}}>-&#8377; {this.props.disCountedLabPrice}</p>
                                                        </div>
                                                        :''
                                                    }
                                                    {
                                                        (is_home_collection_enabled && this.props.selectedAppointmentType == 'home')? <div className="payment-detail d-flex">
                                                            <p className="payment-content fw-500">Subtotal</p>
                                                            <p className="payment-content fw-500">&#8377; {finalPrice + (labDetail.home_pickup_charges) - (this.props.disCountedLabPrice || 0)}</p>
                                                        </div> : <div className="payment-detail d-flex">
                                                                <p className="payment-content fw-500">Subtotal</p>
                                                                <p className="payment-content fw-500">&#8377; {finalPrice - this.props.disCountedLabPrice || 0}</p>
                                                            </div>
                                                    }
                                                
                                                </div>
                                                <hr/>

                                                <div className="lab-visit-time test-report">
                                                    <h4 className="title payment-amt-label">Amount Payable</h4>
                                                    {
                                                        this.props.selectedAppointmentType == 'home' ? <h5 className="payment-amt-value fw-500">&#8377;  {finalPrice + (labDetail.home_pickup_charges || 0) - (this.props.disCountedLabPrice || 0)}</h5> : <h5 className="payment-amt-value fw-500">&#8377;  {finalPrice - this.props.disCountedLabPrice || 0}</h5>
                                                    }

                                                </div>
                                              
                                                              
                                            </div>
                                        </div>
                                    </div>
                                
                                     <div className="col-12" style={{ marginTop: 10 }}>
                                        <div className="lab-visit-time test-report" style={{ marginTop: 10, cursor: 'pointer', marginBottom: 0 }} onClick={this.toggle.bind(this, 'openCancellation')}>
                                            <h4 className="title payment-amt-label">Free Cancellation charges<span style={{ marginLeft: 5 }}><img src={ASSETS_BASE_URL + "/img/icons/info.svg"} /></span></h4>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <a href="/terms" target="_blank">
                                            <div className="lab-visit-time test-report" style={{ marginTop: 10 }}>
                                                <h4 className="title payment-amt-label">Terms of Use<span><img className="info-icon-img" src={ASSETS_BASE_URL + "/img/icons/info.svg"} /></span></h4>
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
                                } disabled={this.state.loading || !patient} onClick={this.proceed.bind(this, tests.length, (address_picked_verified || this.props.selectedAppointmentType == 'lab'), (this.props.selectedSlot && this.props.selectedSlot.date))}>{!patient?'Select Patient':'Confirm Booking'}</button>
                            }


                    </div>

                        <RightBar extraClass=" chat-float-btn-2" />
                    </div>
                </section>
            </div>














        
        );
    }
}


export default BookingSummaryViewNew