import React from 'react';

import Loader from '../../commons/Loader'
import InitialsPicture from '../../commons/initialsPicture'
import RatingProfileCard from '../../commons/ratingsProfileView/RatingProfileCard.js'
import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import CancelPopup from './cancelPopup.js'
import GTM from '../../../helpers/gtm.js'
import STORAGE from '../../../helpers/storage'
import CRITEO from '../../../helpers/criteo.js'
import SnackBar from 'node-snackbar'
const queryString = require('query-string');
import RatingsPopUp from '../../commons/ratingsProfileView/RatingsPopUp.js'
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
            data: null,
            loading: true,
            showCancel: false,
            payment_success: this.props.location.search.includes('payment_success'),
            hide_button: this.props.location.search.includes('payment_success') || this.props.location.search.includes('hide_button'),
            isCompleted: false,
            showPopup: false
        }
    }

    componentDidMount() {
        // reset reschedule data
        if (this.props.rescheduleSlot && this.props.rescheduleSlot.date) {
            this.props.selectOpdTimeSLot({ time: {} }, true, null)
        }
        const parsed = queryString.parse(this.props.location.search)
        let smsComplete = parsed.complete
        let appointmentId = this.props.match.params.refId;
        this.props.getOPDBookingSummary(appointmentId, (err, data) => {
            if (!err) {
                this.setState({ data: data[0], loading: false }, () => {

                    if (smsComplete) {
                        if (data[0].status != 7) {
                            this.setState({ showPopup: true })
                        }
                    }
                })

                let info = {}
                info[appointmentId] = []
                info[appointmentId].push({ 'booking_id': appointmentId, 'mrp': data.length ? data[0].mrp : '', 'deal_price': data.length ? data[0].deal_price : '' })

                info = JSON.stringify(info)
                let is_gold_user = false
                if(data && data.length && data[0].gold && Object.keys(data[0].gold).length){
                    is_gold_user = data[0].gold.is_gold 
                }
                STORAGE.setAppointmentDetails(info).then((setCookie) => {

                    if (this.state.payment_success) {

                        let analyticData = {
                            'Category': 'ConsumerApp', 'Action': 'DoctorAppointmentBooked', 'CustomerID': GTM.getUserId(), 'leadid': appointmentId, 'event': 'doctor-appointment-booked'
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
                    }
                })

            } else {
                this.setState({ data: null, loading: false })
            }
        })

        if (window) {
            window.scrollTo(0, 0)
        }
    }

    getAppointment(props) {
        const appointmentId = this.props.match.params.refId
        if (!this.state.isCompleted) {
            let appointmentData = { id: appointmentId, status: 7 }
            this.props.updateOPDAppointment(appointmentData, (err, data) => {
                if (data) {
                    this.setState({ data: data, isCompleted: true })
                } else {
                    SnackBar.show({ pos: 'bottom-center', text: "Something went wrong." });
                }
            })
        }
        else {
            SnackBar.show({ pos: 'bottom-center', text: "Your appointment is already completed." });
        }
    }

    getQualificationStr(qualificationSpecialization) {
        return qualificationSpecialization.reduce((str, curr, i) => {
            str += `${curr.name}`
            if (i < qualificationSpecialization.length - 1) str += `, `;
            return str
        }, "")
    }

    cancelAppointment(cancelData) {
        this.setState({ loading: true, showCancel: false })
        let data;
        if (cancelData.cancelStatus) {

            data = {
                'Category': 'ConsumerApp', 'Action': 'CancelOpdAppointmentAndRefund', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'cancel-opd-appointment-Refund', 'appointmentId': this.state.data.id
            }
        } else {

            data = {
                'Category': 'ConsumerApp', 'Action': 'CancelOpdAppointmentAndBookNew', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'cancel-opd-appointment-Book-New', 'appointmentId': this.state.data.id
            }
        }

        GTM.sendEvent({ data: data })

        let appointmentData = { id: this.state.data.id, status: 6, refund: cancelData.cancelStatus, cancellation_comment: cancelData.cancelText, cancellation_reason: cancelData.cancelId }

        this.props.updateOPDAppointment(appointmentData, (err, data) => {
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

    goToSlotSelector(e) {
        e.preventDefault()
        e.stopPropagation()
        this.props.history.push(`/opd/doctor/${this.state.data.doctor.id}/${this.state.data.hospital.id}/book?reschedule=${this.props.match.params.refId}&type=opd`)
    }

    navigateTo(where, e) {
        e.preventDefault()
        e.stopPropagation()
        this.props.history.push(where)
    }

    popupBtnClick(flag) {
        if (flag) {
            this.getAppointment();
        }
        this.setState({ showPopup: false })
    }

    goToBookingPage() {
        let analyticData = {
            'Category': 'ConsumerApp', 'Action': 'RebookDoctorAppointmentClicked', 'CustomerID': GTM.getUserId(), 'leadid': '', 'event': 'rebook-doctor-appointment-clicked'
        }
        GTM.sendEvent({ data: analyticData })
        this.props.history.push(`/opd/doctor/${this.state.data.doctor.id}/${this.state.data.hospital.id}/bookdetails`)
    }

    navigateToVIP(){
        let profile = {}
        let number = ''
        let name = ''
        let city_id = ''
        if (this.state.data) {
            profile = this.state.data.profile
            number = profile.phone_number
            name = profile.name
        }
        if(this.state.data.hospital){
            city_id  = this.state.data.hospital.matrix_city
        }
        let lead_data ={}
        lead_data.source = 'AppointmentPaySuccess'
        lead_data.lead_source= 'AppointmentPaySuccess'
        lead_data.city_id = city_id
        let extraParams = {}
            if(this.props.common_utm_tags && this.props.common_utm_tags.length){
                extraParams = this.props.common_utm_tags.filter(x=>x.type == "common_xtra_tags")[0].utm_tags
            }
        // this.props.generateVipClubLead('', number,lead_data, this.props.selectedLocation, name, extraParams)

        this.props.generateVipClubLead({selectedPlan:'', number:number, lead_data:lead_data, selectedLocation:this.props.selectedLocation, user_name:name, extraParams:extraParams,
            cb: (resp) => {
            }
        })
        let analyticData = {
            'Category': 'ConsumerApp', 'Action': 'VipKnowMoreClicked', 'CustomerID': GTM.getUserId(), 'leadid': '', 'event': 'vip-know-more-clicked',city_id: city_id
        }
        GTM.sendEvent({ data: analyticData })
        this.props.clearVipSelectedPlan()
        this.props.history.push('/vip-club-details?source=appointment-success-page&lead_source=Docprime')
    }

    navigateToSBI(){
        window.open('http://13.235.199.36/webcore/docprimecallback', '_blank')
    }

    render() {
        
        let doctor = {}
        let profile = {}
        let hospital = {}
        let date = new Date()
        let actions = []
        let status = 1
        let doctor_thumbnail = ""
        let payment_type = 1
        let mrp = 0
        let deal_price = 0
        let discount = 0
        let paymentMode = ''
        let effective_price = 0
        let is_vip_member = false
        let covered_under_vip = false
        let vip_amount = 0
        let is_gold_vip = 0
        let vip_convenient_price = 0
        let cod_discounted_price = 0
        if (this.state.data) {
            doctor = this.state.data.doctor
            hospital = this.state.data.hospital
            profile = this.state.data.profile
            date = this.state.data.time_slot_start ? new Date(this.state.data.time_slot_start) : new Date()
            actions = this.state.data.allowed_action || []
            status = this.state.data.status
            doctor_thumbnail = this.state.data.doctor_thumbnail
            payment_type = this.state.data.payment_type
            mrp = this.state.data.mrp
            deal_price = this.state.data.deal_price
            effective_price = this.state.data.effective_price
            is_vip_member = this.state.data.vip.is_vip_member
            covered_under_vip = this.state.data.vip.covered_under_vip
            vip_amount = this.state.data.vip.vip_amount
            is_gold_vip = this.state.data.vip.is_gold_member
            vip_convenient_price = this.state.data.vip.extra_charge
            cod_discounted_price = this.state.data.discount

        }

        let summary_utm_tag = ""
        if (this.state.data && this.props.summary_utm && this.props.summary_utm_validity) {
            if ((new Date(this.props.summary_utm_validity)) > (new Date())) {
                let src = `https://cplcps.com/p.ashx?o=116216&e=4531&f=img&t=${this.state.data.id}`
                summary_utm_tag = <img src={src} width="1" height="1" border="0" />
            }
        }

        if (payment_type == 2) {
            discount = parseInt(cod_discounted_price)
        } else {
            discount = mrp - effective_price
        }
        if(!is_vip_member && !covered_under_vip){
            if (payment_type == 1) {
                paymentMode = 'Online'
            } else if (payment_type == 2) {
                paymentMode = 'Cash'
            } else if (payment_type == 3) {
                paymentMode = 'Insurance'
            } else if (payment_type == 4) {
                paymentMode = 'Docprime Care'
            }
        }
        if(is_vip_member && covered_under_vip){
            paymentMode = 'Docprime VIP Member'
        }

        if(is_gold_vip) {
            paymentMode = 'Docprime Gold Member'
        }
        let docprime_gold_price = 0
        let total_amount_payable = 0
        if(is_vip_member || is_gold_vip) {
            docprime_gold_price = parseInt(mrp) -(parseInt(vip_convenient_price) +  parseInt(vip_amount) )
            discount =   (parseInt(vip_amount) + parseInt(vip_convenient_price) ) - effective_price 
            total_amount_payable = parseInt(mrp) - (docprime_gold_price + discount)
        }
        
        return (
            <div className="profile-body-wrap">
                {summary_utm_tag}
                {
                    this.state.isCompleted ? <RatingsPopUp {...this.props} /> : ''
                }
                <ProfileHeader />


                {
                    this.state.showPopup ?
                        <div className="search-el-popup-overlay" >
                            <div className="search-el-popup">
                                <div className="widget">
                                    <div className="widget-content padiing-srch-el">
                                        <p className="srch-el-conent">Are you sure you want to complete this appointment?</p>
                                        <div className="search-el-btn-container">
                                            <button onClick={() => this.popupBtnClick(true)}>Yes</button>
                                            <button onClick={() => this.popupBtnClick(false)}>No</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : ''
                }


                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            {
                                (!this.state.loading && this.state.data) ? <section className="booking-confirm-screen">
                                    <div className="container-fluid cardMainPaddingRmv">
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
                                                {
                                                    this.state.data.status == 7 && this.state.data.is_rated === false ? (<RatingProfileCard {...this.props} booking_flag={true} details={this.state.data} />) : ""
                                                }

                                                {
                                                    (this.state.data.otp && status == 5) ? <div className="widget mrb-10">
                                                        <div className="widget-content">
                                                            <p className="fw-500 text-md mrb-10">Unique Confirmation Code: <span className="fw-700 text-md">{this.state.data.otp}</span></p>
                                                            <p className="text-xs text-light">Share this code with doctor at the time of your appointment</p>
                                                        </div>
                                                    </div> : ""
                                                }

                                                {
                                                    this.state.payment_success ? <div className="widget mrb-10">
                                                        <div className="widget-content">
                                                            <p className="fw-500 text-md mrb-10"><span className="fw-700 text-md">Thanks! Appointment Received</span></p>
                                                            <p className="text-xs text-light">We are waiting for the confirmation from the doctor and we will get back to you shortly.</p>
                                                        </div>
                                                    </div> : ""
                                                }

                                                {/* cart price design */}
                                                {
                                                    payment_type == 2 && status < 6 ? <div className="payAtclinic">
                                                        <h5>Pay at clinic</h5>
                                                        <p>Please pay <b>₹ {parseInt(deal_price)- parseInt(cod_discounted_price)}</b> at the time of appointment</p>

                                                    </div> : ""
                                                }

                                                {/* cart price design */}


                                                <div className="widget mrb-10">
                                                    <div className="widget-content">
                                                        <p className="fw-500 text-md">Booking ID: <span className="fw-700 text-md">{this.state.data.id}</span></p>
                                                        <p className="text-xs text-light">Details have been sent to your email-id and mobile number.</p>
                                                        {
                                                            actions.indexOf(6) > -1 && !this.state.hide_button ? <a onClick={this.toggleCancel.bind(this)} href="#" className="text-primary fw-700 text-sm">Cancel Booking</a> : ""
                                                        }
                                                        {
                                                            (STORAGE.checkAuth() && this.props.profiles && this.props.profiles[this.props.defaultProfile] && this.props.profiles[this.props.defaultProfile].is_vip_member || is_gold_vip || payment_type==3)?'':status != 6 && status != 7 &&
                                                                <div className="vip-content-book">
                                                                    <div>
                                                                        <p>
                                                                            You could have saved <b>70%</b> on this booking
                                                                        </p>
                                                                        <p>if you were a Docprime <img src={ASSETS_BASE_URL + '/img/viplog.png'} /> Member!</p>
                                                                    </div>
                                                                    <button onClick={() => this.navigateToVIP()}>Know more</button>
                                                                </div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="widget mrb-10">
                                                    <div className="widget-content bokng-card pb-location">
                                                        <h4 className="wc-title text-md fw-700 card-nm-ovrlpng">{doctor.display_name}</h4>
                                                        <InitialsPicture name={doctor.name} has_image={!!doctor_thumbnail} className="initialsPicture-ds" style={{float:'right'}} onClick={this.navigateTo.bind(this, `/opd/doctor/${doctor.id}`)}>
                                                            <img src={doctor_thumbnail} style={{ width: 50 }} className="img-fluid add-map img-round crd-doc-img" />
                                                        </InitialsPicture>
                                                        <div className="address-details">


                                                            <p className="add-info fw-500">{this.getQualificationStr(doctor.general_specialization || [])}</p>
                                                        </div>
                                                    </div>
                                                    <div className="widget-content  pb-location">
                                                        <h4 className="wc-title text-md fw-700 card-nm-ovrlpng">{hospital.name}</h4>
                                                        <div className="address-details">
                                                            {/*<img src={ASSETS_BASE_URL + "/img/customer-icons/map-icon.png"} className="img-fluid add-map" />*/}
                                                            <p className="add-info fw-500">{hospital.address}</p>
                                                        </div>
                                                        {/*<div className="pb-view text-left">
                                                            <a href={`https://www.google.com/maps/search/?api=1&query=${hospital.lat},${hospital.long}`} target="_blank" className="link-text text-md fw-700">View in Google Map</a>
                                                        </div>*/}
                                                        {
                                                            status == 6 || status == 7 ?
                                                                <button className="rebook-btn" onClick={this.goToBookingPage.bind(this)}>Rebook Appointment</button>
                                                                : ''
                                                        }

                                                    </div>
                                                    {
                                                        this.state.data && this.state.data.procedures && this.state.data.procedures.length ?
                                                            <div className="widget-content pb-details pb-location">
                                                                <h4 className="title" style={{ fontSize: 14 }}><span><img src={ASSETS_BASE_URL + "/img/customer-icons/teeth.svg"} className="visit-time-icon" style={{ width: 17, marginRight: 8 }} /></span>Services Included</h4>
                                                                <div className="pb-view text-left proc-para-margin">
                                                                    <p>Doctor consultation </p>
                                                                    {
                                                                        this.state.data.procedures.map((procedure) => {
                                                                            return <p>{procedure.name}</p>
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                            : ''
                                                    }
                                                </div>
                                                <div className="widget mrb-10">
                                                    <div className="widget-content">
                                                        <div>
                                                            <h4 className="title"><span><img style={{ marginRight: '10px' }} className="visit-time-icon" src={ASSETS_BASE_URL + "/img/watch-date.svg"} /></span>Clinic Visit Time

                                                                {
                                                                    (actions.indexOf(4) > -1) && (new Date(date).getTime() > new Date().getTime()) ?
                                                                        <span onClick={this.goToSlotSelector.bind(this)} className="float-right"><a href="#" className="text-primary fw-700 text-sm">Reschedule Time</a></span> : ""
                                                                }

                                                            </h4>
                                                            <p className="date-time test-list fw-500">{date.toDateString()} | {date.toLocaleTimeString()}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="widget mrb-10">
                                                    <div className="widget-content">
                                                        <div className="test-report">
                                                            <h4 className="title"><span><img className="visit-time-icon" src={ASSETS_BASE_URL + "/img/nw-usr.svg"} style={{
                                                                width: 16, marginRight: 5, verticalAlign: -3
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
                                                                        payment_type==3?'':
                                                                        <div className="d-flex justify-content-between align-items-center mrb-10">
                                                                            <p className="fw-500" style={{ color: '#757575', paddingTop: 4 }}>MRP</p>
                                                                            <p className="fw-500">&#8377; {parseInt(mrp)}</p>
                                                                        </div>
                                                                    }

                                                                    {
                                                                        is_vip_member && covered_under_vip && !is_gold_vip?
                                                                            <div className="d-flex justify-content-between align-items-center mrb-10">
                                                                                <p className="fw-500" style={{ color: 'green' }}>Docprime VIP Member <img className="vip-main-ico img-fluid"src={ASSETS_BASE_URL + '/img/viplog.png'} /></p>
                                                                                <p className="fw-500" style={{ color: 'green' }}>- &#8377; {parseInt(mrp) - (parseInt(vip_amount) + discount)}</p>
                                                                            </div> : ''
                                                                    }
                                                                    {
                                                                        is_gold_vip &&
                                                                        <div className="d-flex justify-content-between align-items-center mrb-10">
                                                                            <p className="fw-500" style={{ color: 'green' }}> Docprime Gold Member <img className="vip-main-ico img-fluid" src={ASSETS_BASE_URL + '/img/gold-sm.png'}/></p>
                                                                            <p className="fw-500" style={{ color: 'green' }}>- &#8377; {docprime_gold_price}</p>
                                                                        </div>
                                                                    }
                                                                    
                                                                    {
                                                                        discount && payment_type!=3 /*&& !is_vip_member && !covered_under_vip && !is_gold_vip*/?
                                                                            <div className="d-flex justify-content-between align-items-center mrb-10">
                                                                                <p className="fw-500" style={{ color: 'green' }}>Docprime Discount</p>
                                                                                <p className="fw-500" style={{ color: 'green' }}>- &#8377; {parseInt(discount)}</p>
                                                                            </div> : ''
                                                                    }
                                                                    {
                                                                        payment_type==3?'':
                                                                        <hr style={{ boxSizing: 'border-box', margin: '0 -12px 10px -12px', backgroundColor: '#eeeeee' }} />
                                                                    }
                                                                    
                                                                    <div className="d-flex justify-content-between align-items-center mrb-10">
                                                                        <p className="fw-500">Amount Payable</p>
                                                                        {
                                                                            payment_type == 2 ?
                                                                                <p className="fw-500">&#8377; {parseInt(deal_price)- parseInt(cod_discounted_price)}</p>
                                                                                :is_gold_vip?<p className="fw-500">&#8377; {total_amount_payable}</p>
                                                                                    :is_vip_member && covered_under_vip ?
                                                                                    <p className="fw-500">&#8377; {total_amount_payable}</p>
                                                                                    :<p className="fw-500">&#8377; {parseInt(effective_price)}</p>
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
                                                    status <= 5 ? <div className="widget mrb-10">
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
                                                                            Invite your friends on docprime.com and earn <b className="fw-500 drk-blk"><img style={{ width: '8px', marginTop: '4px', marginRight: '0px' }} src={ASSETS_BASE_URL + "/img/rupee-icon.svg"} /> {this.state.data.user_referral_amt}</b> on completion of their first order </p>
                                                                        <div>
                                                                            <div className="mrt-20" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                                <p className="text-xs fw-500" style={{ color: `var(--text--dark--all)` , cursor: 'pointer' }}>Know more</p>
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
                                        status == 7 ? <button onClick={() => {
                                            this.props.history.push(`/user/opd/reports/${this.state.data.id}`)
                                        }} className="viewpresbtn">View Prescription</button> : ""
                                    }
                                    {
                                        this.state.data && this.state.data.appointment_via_sbi?
                                       
                                                <div className="fixed sticky-btn p-0 v-btn  btn-lg horizontal bottom no-round text-lg buttons-addcart-container ">
                                                    <button className="v-btn-primary book-btn-mrgn-adjust " onClick={()=>{this.navigateToSBI()}}>
                                                                Go Back To SBIG Home
                                                        </button>
                                                </div>
                                            
                                        :''
                                    }

                                </section> : <Loader />
                            }

                            {
                                this.state.showCancel ? <CancelPopup toggle={this.toggleCancel.bind(this)} cancelAppointment={this.cancelAppointment.bind(this)} comments={this.state.data && this.state.data.cancellation_reason ? this.state.data.cancellation_reason : []} showCommentReasons={payment_type == 3 || payment_type == 2 ? true : false} /> : ""
                            }

                        </div>

                        <RightBar msgTemplate="gold_general_template"/>
                    </div>
                </section>
                <Disclaimer />
            </div>
        );
    }
}


export default BookingView
