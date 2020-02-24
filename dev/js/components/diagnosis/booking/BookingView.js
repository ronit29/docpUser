import React from 'react';
import InitialsPicture from '../../commons/initialsPicture'
import SnackBar from 'node-snackbar'

import TestDetail from './testDetail'
import Loader from '../../commons/Loader'
import RatingProfileCard from '../../commons/ratingsProfileView/RatingProfileCard.js'
import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import CancelPopup from './cancelPopup.js'
import GTM from '../../../helpers/gtm.js'
import STORAGE from '../../../helpers/storage'
import CRITEO from '../../../helpers/criteo.js'
import WhatsAppOptinView from '../../commons/WhatsAppOptin/WhatsAppOptinView.js'
import Disclaimer from '../../commons/Home/staticDisclaimer.js'

const STATUS_MAP = {
    CREATED: 1,
    BOOKED: 2,
    RESCHEDULED_DOCTOR: 3,
    RESCHEDULED_PATIENT: 4,
    ACCEPTED: 5,
    CANCELED: 6,
    COMPLETED: 7,
}


class BookingView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showTestDetail: false,
            data: null,
            loading: true,
            showCancel: false,
            payment_success: this.props.location.search.includes('payment_success'),
            hide_button: this.props.location.search.includes('payment_success') || this.props.location.search.includes('hide_button')
        }
    }

    componentDidMount() {

        let appointmentId = this.props.match.params.refId

        if (this.props.rescheduleSlot && this.props.rescheduleSlot.selectedTestsTimeSlot && Object.values(this.props.rescheduleSlot.selectedTestsTimeSlot).length) {
           //On reshedule this function calls , to update the appointment status
            /*let tests = []
            Object.values(this.props.rescheduleSlot.selectedTestsTimeSlot).map((twp)=>{

                    let type = 3
                    if(twp.type=="radiology"){
                        type = 1
                    }else if(twp.type == "pathology"){
                        type = 2
                    }

                    tests.push({test: twp.test_id,type:type, start_date: twp.date, start_time: twp.time.value, is_home_pickup: twp.is_home_pickup })
            })*/
            let selectedTime = Object.values(this.props.rescheduleSlot.selectedTestsTimeSlot)[0]
            let start_date = selectedTime.date
            let start_time = selectedTime.time.value
            let appointmentData = { id: this.props.match.params.refId, status: 4, start_date, start_time }
            //multi_timings_enabled: true,

            this.props.updateLabAppointment(appointmentData, (err, data) => {
                if (data) {
                    this.setState({ data: data.data, loading: false })

                    SnackBar.show({ pos: 'bottom-center', text: "Appointment reschedule success." });
                } else {
                    this.props.getLabBookingSummary(this.props.match.params.refId, (err, data) => {
                        if (!err) {
                            this.setState({ data: data[0], loading: false })
                        } else {
                            this.setState({ data: null, loading: false })
                        }
                        SnackBar.show({ pos: 'bottom-center', text: "Appointment reschedule failed." });
                    })
                }

                this.props.selectLabTimeSLot({ time: {} }, true)
                this.props.getUpcomingAppointments()
            })
        } else {
            //get appoinment data 
            this.props.getLabBookingSummary(this.props.match.params.refId, (err, data) => {
                if (!err) {
                    this.setState({ data: data[0], loading: false })

                    let info = {}
                    info[appointmentId] = []
                    let mrp = 0
                    let deal_price = 0
                    if (data.length && data[0].lab_test) {
                        data[0].lab_test.map((test) => {
                            mrp += parseInt(test.mrp)
                            deal_price += parseInt(test.deal_price)
                        })
                    }
                    info[appointmentId].push({ 'booking_id': appointmentId, 'mrp': mrp, 'deal_price': deal_price })
                    info = JSON.stringify(info)
                    let is_gold_user = false
                        if(data && data.length && data[0].gold && Object.keys(data[0].gold).length){
                            is_gold_user = data[0].gold.is_gold 
                        }
                    STORAGE.setAppointmentDetails(info).then((setCookie) => {

                        if (this.state.payment_success) {

                            let analyticData = {
                                'Category': 'ConsumerApp', 'Action': 'LabAppointmentBooked', 'CustomerID': GTM.getUserId(), 'leadid': appointmentId, 'event': 'lab-appointment-booked'
                            }

                            GTM.sendEvent({ data: analyticData }, true, false)

                            if(is_gold_user){
                                let vipBookedData = {
                                    'Category': 'ConsumerApp', 'Action': 'vipbooked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'vipbooked', 'user_id': GTM.getUserId(), 'is_single_flow':true
                                }
                                GTM.sendEvent({ data: vipBookedData })
                            }
                            
                            let criteo_data =
                            {
                                'event': "trackTransaction", 'id': appointmentId, 'item': [
                                    { 'id': "1", 'price': data.length ? data[0].deal_price : '', 'quantity': 1 }
                                ]
                            }

                            CRITEO.sendData(criteo_data)

                            this.props.history.replace(this.props.location.pathname + "?hide_button=true")
                            this.props.setCorporateCoupon(null)
                        }
                    })
                } else {
                    this.setState({ data: null, loading: false })
                }
            })
        }

        if (window) {
            window.scrollTo(0, 0)
        }
    }

    cancelAppointment(cancelData) {
        this.setState({ loading: true, showCancel: false })
        let data;
        if (cancelData.cancelStatus) {

            data = {
                'Category': 'ConsumerApp', 'Action': 'CancelLabAppointmentAndRefund', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'cancel-lab-appointment-Refund', 'appointmentId': this.state.data.id
            }
        } else {

            data = {
                'Category': 'ConsumerApp', 'Action': 'CancelLabAppointmentAndBookNew', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'cancel-lab-appointment-Book-New', 'appointmentId': this.state.data.id
            }
        }

        GTM.sendEvent({ data: data })


        let appointmentData = { id: this.state.data.id, status: 6, refund: cancelData.cancelStatus, cancellation_comment: cancelData.cancelText, cancellation_reason: cancelData.cancelId }

        this.props.updateLabAppointment(appointmentData, (err, data) => {
            if (data) {
                this.setState({ data: data, loading: false, showCancel: false })
            } else {
                this.setState({ loading: false, showCancel: false })
            }
        })
    }

    toggleCancel(e) {
        e.preventDefault()
        e.stopPropagation()
        this.setState({ showCancel: !this.state.showCancel })
    }

    toogleTestDetails() {
        this.setState({ showTestDetail: !this.state.showTestDetail })
    }

    goToSlotSelector(e) {
        e.preventDefault()
        e.stopPropagation()
        let test_ids = []
        let p_pickup = 'home'
        let r_pickup = 'lab'
        //if(this.state.selected_timings_type){}
        let test_type = 0
        if (this.state.data.lab_test) {
            this.state.data.lab_test.map((test) => {
                test_ids.push(test.test_id)
                test_type = test.test_type
            })
        }
        this.props.selectLabTimeSLot({ time: {} }, true)
        let selected_timings_type = this.state.data && this.state.data.selected_timings_type == 'separate' ? 'seperately' : 'all'

        if (this.state.data) {
            if (this.state.data.is_home_pickup) {
                if (test_type == 2) {
                    p_pickup = 'home'
                    r_pickup = 'lab'
                } else if (test_type == 1) {
                    r_pickup = 'home'
                    p_pickup = 'lab'
                }
            } else {
                if (test_type == 2) {
                    p_pickup = 'lab'
                    r_pickup = 'lab'
                } else if (test_type == 1) {
                    r_pickup = 'lab'
                    p_pickup = 'lab'
                }
            }
        }

        if (this.state.data.lab && this.state.data.lab.is_thyrocare) {
            this.props.history.push(`/lab/${this.state.data.lab.id}/timeslots?reschedule=true&type=${this.state.data.is_home_pickup ? 'home' : 'lab'}&is_thyrocare=true&test_ids=${test_ids}&r_pickup=${r_pickup}&p_pickup=${p_pickup}`)
        } else {
            this.props.history.push(`/lab/${this.state.data.lab.id}/timeslots?reschedule=true&type=${this.state.data.is_home_pickup ? 'home' : 'lab'}&is_thyrocare=false&test_ids=${test_ids}&r_pickup=${r_pickup}&p_pickup=${p_pickup}`)
        }

    }

    navigateTo(where, e) {
        e.preventDefault()
        e.stopPropagation()
        this.props.history.push(where)
    }

    goToBookingPage() {
        let analyticData = {
            'Category': 'ConsumerApp', 'Action': 'RebookLabAppointmentClicked', 'CustomerID': GTM.getUserId(), 'leadid': '', 'event': 'rebook-lab-appointment-clicked'
        }
        GTM.sendEvent({ data: analyticData })
        let criteria = {}
        let extraParams = {
            forceAddTestids: true,
            labId: this.state.data.lab.id,
            tests: this.state.data.lab_test
        }
        this.props.toggleDiagnosisCriteria('test', criteria, true, extraParams)
        this.props.history.push(`/lab/${this.state.data.lab.id}/book`)
    }

    navigateToSBI(){
        window.open('http://13.235.199.36/webcore/docprimecallback', '_blank')
    }

    render() {
        let profile = {}
        let lab_test = []
        let lab = {}
        let date = new Date()
        let actions = []
        let status = 1
        let lab_thumbnail = ""
        let reports = []
        let is_thyrocare = null
        let payment_type
        let mrp = ''
        let deal_price = ''
        let discount = ''
        let effective_price = ''
        let paymentMode = ''

        if (this.state.data) {
            lab = this.state.data.lab
            lab_test = this.state.data.lab_test
            profile = this.state.data.profile
            date = this.state.data.time_slot_start ? new Date(this.state.data.time_slot_start) : new Date()
            actions = this.state.data.allowed_action || []
            status = this.state.data.status
            lab_thumbnail = this.state.data.lab_thumbnail
            reports = this.state.data.reports || []
            is_thyrocare = this.state.data.lab ? this.state.data.lab.is_thyrocare : null
            payment_type = this.state.data.payment_type
            mrp = this.state.data.price
            deal_price = this.state.data.deal_price
            effective_price = this.state.data.effective_price
        }
        let summar_utm_tag = ""
        if (this.state.data && this.props.summary_utm && this.props.summary_utm_validity) {
            if ((new Date(this.props.summary_utm_validity)) > (new Date())) {
                let src = `https://cplcps.com/p.ashx?o=116216&e=4531&f=img&t=${this.state.data.id}`
                summar_utm_tag = <img src={src} width="1" height="1" border="0" />
            }
        }

        if (payment_type == 2) {
            discount = mrp - deal_price
        } else {
            discount = mrp - effective_price
        }

        if (payment_type == 1) {
            paymentMode = 'Online'
        } else if (payment_type == 2) {
            paymentMode = 'Cash'
        } else if (payment_type == 3) {
            paymentMode = 'Insurance'
        } else if (payment_type == 4) {
            paymentMode = 'Docprime Care'
        }

        return (
            <div className="profile-body-wrap">
                {summar_utm_tag}
                <ProfileHeader />
                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            {/* <header className="skin-primary fixed horizontal top sticky-header">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-2">
                                            <span className="icon back-icon" onClick={() => { this.props.history.go(-1) }}><img src={ASSETS_BASE_URL + "/img/customer-icons/back-white.png"} className="img-fluid" /></span>
                                        </div>
                                        <div className="col-8">
                                            <div className="header-title fw-700 capitalize text-white">Your Appointment</div>
                                        </div>
                                        <div className="col-2" style={{ paddingLeft: 0 }}>
                                            <div className="mobile-home-icon-div" >
                                                <img onClick={() => {
                                                    this.props.history.push('/')
                                                }} src={ASSETS_BASE_URL + "/img/doc-prime-logo.png"} className="mobile-home-icon" />
                                            </div>
                                            <ul className="inline-list float-right user-notification-action">
                                                <li onClick={() => { this.props.history.push('/user') }}><span className="icon icon-md text-middle"><img src={ASSETS_BASE_URL + "/img/customer-icons/user.svg"} className="img-fluid" /></span></li>
                                                <li><span className="icon icon-md text-middle notification-icon"><img src={ASSETS_BASE_URL + "/img/customer-icons/notification.svg"} className="img-fluid" onClick={this.navigateTo.bind(this, '/notifications')} />
                                                    {
                                                        this.props.newNotification > 0 ? <span className="notification-alert">{this.props.newNotification}</span> : ""
                                                    }
                                                </span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </header> */}
                            {
                                (!this.state.loading && this.state.data) ?
                                    <section className="booking-confirm-screen">
                                        <div className="container-fluid">
                                            <WhatsAppOptinView {...this.props} profiles={profile} isAppointment={true} />
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="app-timeline book-confirmed-timeline">
                                                        {
                                                            status == 6 ? <h4 style={{ textAlign: 'center' }}>Appointment Cancelled</h4>
                                                                : status == 1 ? <h4 style={{ textAlign: 'center' }}>Appointment Created</h4>
                                                                    : <ul className="inline-list">
                                                                        <li className={(status <= 5 || status == 7) ? "active" : ""}>
                                                                            <span className="dot">1</span>
                                                                            <p className="text-sm fw-700 text-light">Received</p>
                                                                        </li>
                                                                        <li className={(status == 5 || status == 7) ? "active" : ""}>
                                                                            <span className="dot">2</span>
                                                                            <p className="text-sm fw-700 text-light">Confirmed</p>
                                                                        </li>
                                                                        <li className={status == 7 ? "active" : ""}>
                                                                            <span className="dot">3</span>
                                                                            <p className="text-sm fw-700 text-light">{status == 6 ? "Completed" : "Completed"}</p>
                                                                        </li>
                                                                    </ul>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">

                                                    {this.state.data.is_rated == false && this.state.data.status == 7 ? (<RatingProfileCard {...this.props} booking_flag={true} details={this.state.data} />) : ""}
                                                    {
                                                        (this.state.data.otp && status == 5) ? <div className="widget mrb-10">
                                                            <div className="widget-content">
                                                                <p className="fw-500 text-md mrb-10">Unique Confirmation Code: <span className="fw-700 text-md">{this.state.data.otp}</span></p>
                                                                <p className="text-xs text-light">Share this code with lab at the time of your appointment</p>
                                                            </div>
                                                        </div> : ""
                                                    }

                                                    {
                                                        this.state.payment_success ? <div className="widget mrb-10">
                                                            <div className="widget-content">
                                                                <p className="fw-500 text-md mrb-10"><span className="fw-700 text-md">Thanks! Appointment Received</span></p>
                                                                <p className="text-xs text-light">We are waiting for the confirmation from the lab and we will get back to you shortly.</p>
                                                            </div>
                                                        </div> : ""
                                                    }

                                                    <div className="widget mrb-10">
                                                        <div className="widget-content">
                                                            <p className="fw-500 text-md mrb-10">Booking ID: <span className="fw-700 text-md">{this.state.data.id}</span></p>
                                                            <p className="text-xs text-light">Details have been sent to your email-id and mobile number.</p>
                                                            {
                                                                actions.indexOf(6) > -1 && !this.state.hide_button && !is_thyrocare ? <a onClick={this.toggleCancel.bind(this)} href="#" className="text-primary fw-700 text-sm">Cancel Booking</a> : ""
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="widget  mrb-10">
                                                        <div className="widget-content pb-details pb-location">
                                                            <h4 className="wc-title text-md fw-700">{lab.name}</h4>
                                                            <div className="address-details clearfix">
                                                                <InitialsPicture name={lab.name} has_image={!!lab_thumbnail} className="initialsPicture-ls" style={{float:'right'}} onClick={this.navigateTo.bind(this, `/lab/${lab.id}`)}>
                                                                    <img className="fltr-usr-image-lab" style={{ float:'right',cursor: 'pointer' }} src={lab_thumbnail} />
                                                                </InitialsPicture>

                                                                <p className="add-info fw-500">{lab.address}</p>
                                                            </div>
                                                            {/*<div className="pb-view text-left clearfix mrt-10">
                                                                <a href={`https://www.google.com/maps/search/?api=1&query=${lab.lat},${lab.long}`} target="_blank" className="link-text text-md fw-700 mrt-10" style={{ float: 'left' }} >View in Google Map</a>
                                                                <a href={`https://www.google.com/maps/search/?api=1&query=${lab.lat},${lab.long}`} className="link-text text-md fw-700" target="_blank" style={{ width: 50, height: 50, float: 'right' }} >
                                                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/map-icon.png"} style={{ width: '100%' }} />
                                                                </a>
                                                            </div>*/}
                                                            {
                                                                status == 6 || status == 7 ?
                                                                    <button className="rebook-btn" onClick={this.goToBookingPage.bind(this)}>Rebook Appointment</button>
                                                                    : ''
                                                            }

                                                        </div>
                                                    </div>
                                                    {
                                                        is_thyrocare ?
                                                            <div className="thyroCallContainer">
                                                                <div className="thyroContent">
                                                                    <h4 className="wc-title text-md fw-700">Reschedule Appointment?</h4>
                                                                    <p>If you want to reschedule or cancel appointment, contact us at  <a href="tel:18001239419">1800 123 9419</a></p>
                                                                </div>
                                                            </div>
                                                            : ''
                                                    }


                                                    {
                                                        this.state.data.is_home_pickup ? <div className="widget mrt-10">
                                                            <div className="widget-content mrb-10">
                                                                <div className="test-report">
                                                                    <h4 className="title"><span><img className="visit-time-icon" src={ASSETS_BASE_URL + "/img/icons/home-orange.svg"} style={{
                                                                        width: 18, marginRight: 5, verticalAlign: -3
                                                                    }} /></span>Sample Pickup Address</h4>
                                                                    <p className="test-list fw-500" style={{ width: '100%', wordWrap: 'break-word' }}>{this.state.data.address}</p>
                                                                </div>
                                                            </div>
                                                        </div> : ""
                                                    }

                                                    <div className="widget mrb-10">
                                                        <div className="widget-content">
                                                            <div>
                                                                <h4 className="title"><span><img src={ASSETS_BASE_URL + "/img/customer-icons/clock.svg"} className="visit-time-icon" /></span>Visit Time

                                                                    {
                                                                        (!is_thyrocare) && (actions.indexOf(4) > -1)/* && (new Date(date).getTime() > new Date().getTime()) */ ?
                                                                            <span onClick={this.goToSlotSelector.bind(this)} className="float-right"><a href="#" className="text-primary fw-700 text-sm">Reschedule Time</a></span> : ""
                                                                    }

                                                                </h4>
                                                                <p className="date-time test-list fw-500">{new Date(date).toDateString()} | {new Date(date).toLocaleTimeString()}</p>

                                                                {/*
                                                                    this.state.data.lab_test && this.state.data.lab_test.map((test, key)=>
                                                                        <div className="vst-content-bl" key={key}>
                                                                            <p className="vst-tst-name">{test.test.name}</p>
                                                                            {
                                                                                date && <p className="rdo-time-vst">{new Date(date).toDateString()} | {new Date(date).toLocaleTimeString()}</p>
                                                                            }
                                                                            
                                                                        </div>
                                                                    )
                                                               */ }
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="widget mrt-10">
                                                        <div className="widget-content">
                                                            <div className="test-report">
                                                                <h4 className="title"><span><img src={ASSETS_BASE_URL + "/img/customer-icons/test.svg"} className="visit-time-icon" /></span>Tests <span className="float-right">
                                                                    {/* <a href="#" onClick={(e) => {
                                                                        e.preventDefault()
                                                                        e.stopPropagation()
                                                                        this.toogleTestDetails()
                                                                    }} className="text-primary fw-700 text-sm">View Details</a> */}
                                                                </span></h4>

                                                                {
                                                                    lab_test.map((test, i) => {
                                                                        return <p key={i} className="test-list fw-500">{test.test.name}</p>
                                                                    })
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="widget mrt-10 mrb-10">
                                                        <div className="widget-content">
                                                            <div className="test-report">
                                                                <h4 className="title"><span><img className="visit-time-icon" src={ASSETS_BASE_URL + "/img/icons/user.svg"} style={{
                                                                    width: 14, marginRight: 5, verticalAlign: -3
                                                                }} /></span>Patient Details</h4>
                                                                <p className="test-list fw-500">{profile.name}</p>
                                                                <p className="test-list fw-500">{profile.phone_number}</p>
                                                                <p className="test-list fw-500">{profile.email}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {
                                                        status !== 6 ?
                                                            <div className="widget mrb-10">
                                                                <div className="widget-content">
                                                                    <div className="test-report">
                                                                        <h4 className="title"><span><img className="visit-time-icon" src={ASSETS_BASE_URL + "/img/rupeeicon.png"} style={{
                                                                            width: 16, marginRight: 5, verticalAlign: -3
                                                                        }} /></span>Payment Detail</h4>
                                                                        {
                                                                            payment_type == 3 ? '' :
                                                                                <div className="d-flex justify-content-between align-items-center mrb-10">
                                                                                    <p className="fw-500" style={{ color: '#757575', paddingTop: 4 }}>MRP</p>
                                                                                    <p className="fw-500">&#8377; {parseInt(mrp)}</p>
                                                                                </div>
                                                                        }
                                                                        {
                                                                            discount && payment_type != 3 ?
                                                                                <div className="d-flex justify-content-between align-items-center mrb-10">
                                                                                    <p className="fw-500" style={{ color: 'green' }}>Docprime Discount</p>
                                                                                    <p className="fw-500" style={{ color: 'green' }}>- &#8377; {parseInt(discount)}</p>
                                                                                </div> : ''
                                                                        }
                                                                        {
                                                                            payment_type == 3 ? '' :
                                                                                <hr style={{ boxSizing: 'border-box', margin: '0 -12px 10px -12px', backgroundColor: '#eeeeee' }} />
                                                                        }
                                                                        <div className="d-flex justify-content-between align-items-center mrb-10">
                                                                            <p className="fw-500">Amount Payable</p>
                                                                            {
                                                                                payment_type == 2 ?
                                                                                    <p className="fw-500">&#8377; {parseInt(deal_price)}</p>
                                                                                    :
                                                                                    <p className="fw-500">&#8377; {parseInt(effective_price)}</p>
                                                                            }
                                                                        </div>
                                                                        {
                                                                            paymentMode ?
                                                                                <div className="d-flex justify-content-between align-items-center">
                                                                                    <p className="fw-500">Payment Mode</p>
                                                                                    <p className="fw-500">{paymentMode}</p>
                                                                                </div> : ''
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div> : ''
                                                    }

                                                    {
                                                        status <= 5 ? <div className="widget mrb-10" style={{ marginTop: 10 }}>
                                                            <div className="widget-content">
                                                                <div className="my-profile-item" style={{ cursor: 'auto' }} onClick={() => {
                                                                    this.props.history.push('/referral')
                                                                }}>
                                                                    <div className="usr-dtls-off-act">
                                                                        <p className="wc-title text-md fw-700 card-nm-ovrlpng">
                                                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/refer.svg"} className="img-fluid  img-f-1" />Refer &amp; Earn</p>
                                                                    </div>
                                                                    <div className="ofr-img-txt">
                                                                        <div className="box-img-cont"><img src={ASSETS_BASE_URL + "/img/step-2.png"} className="img-fluid" /></div>
                                                                        <div className="ofr-contnt">
                                                                            <p className="add-info fw-500 add-info-p">
                                                                                Invite your friends on docprime.com and earn <b className="fw-500 drk-blk"><img style={{ width: '8px', marginTop: '4px', marginRight: '0px' }} src={ASSETS_BASE_URL + "/img/rupee-icon.svg"} /> 200</b> on completion of their first order </p>
                                                                            <div>
                                                                                <div className="mrt-20" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                                    <p className="text-xs fw-500" style={{ color: `var(--text--dark--all)`, cursor: 'pointer' }}>Know more</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> : ""
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                        {
                                            reports && reports.length ? <button onClick={() => {
                                                this.props.history.push(`/user/lab/reports/${this.state.data.id}`)
                                            }} className="viewpresbtn">View Reports</button> : ""
                                        }
                                        {
                                            this.state.data && this.state.data.appointment_via_sbi ?

                                                <div className="fixed sticky-btn p-0 v-btn  btn-lg horizontal bottom no-round text-lg buttons-addcart-container ">
                                                    <button className="v-btn-primary book-btn-mrgn-adjust " onClick={() => { this.navigateToSBI()}}>
                                                        Go Back To SBIG Home
                                                        </button>
                                                </div>

                                                : ''
                                        }
                                    </section> : <Loader />
                            }

                            <TestDetail show={this.state.showTestDetail} toggle={this.toogleTestDetails.bind(this)} lab_test={lab_test} />

                            {
                                this.state.showCancel ? <CancelPopup toggle={this.toggleCancel.bind(this)} cancelAppointment={this.cancelAppointment.bind(this)} comments={this.state.data && this.state.data.cancellation_reason ? this.state.data.cancellation_reason : []} showCommentReasons={payment_type == 3 || payment_type == 2 ? true : false} /> : ""
                            }

                        </div>
                        <RightBar/>
                    </div>
                </section>
                <Disclaimer />
            </div>
        );
    }
}


export default BookingView
