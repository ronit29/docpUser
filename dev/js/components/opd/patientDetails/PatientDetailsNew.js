import React from 'react';
import { connect } from 'react-redux';
import SnackBar from 'node-snackbar'
import DoctorProfileCard from '../commons/doctorProfileCard'
import Loader from '../../commons/Loader'
import VisitTimeNew from './VisitTimeNew'
import ChoosePatientNewView from './choosePatientNew'
const queryString = require('query-string');
import SelectedClinic from '../commons/selectedClinic/index.js'


import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'

import CancelationPolicy from './cancellation.js'
import PaymentSummary from './paymentSummary.js'
import GTM from '../../../helpers/gtm.js'


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
            order_id: false
            // order_id: !!parsed.order_id
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
    }

    proceed(datePicked, e) {

        if (!datePicked) {
            SnackBar.show({ pos: 'bottom-center', text: "Please pick a time slot." });
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
            payment_type: 1 // TODO : Select payment type
        }

        let analyticData = {
            'Category': 'ConsumerApp', 'Action': 'OpdProceedButtonClicked', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'opd-proceed-button-clicked'
        }
        GTM.sendEvent({ data: analyticData })

        this.props.createOPDAppointment(postData, (err, data) => {
            if (!err) {
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

    render() {

        let doctorDetails = this.props.DOCTORS[this.state.selectedDoctor]
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
        }


    return (
        <div className="profile-body-wrap">
            <ProfileHeader />
            <section className="container parent-section book-appointment-section">
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
                                            <div className="widget mrt-10 ct-profile skin-white">
                                                <SelectedClinic
                                                    boxShadowHide={true}
                                                    selectedDoctor={this.props.DOCTORS[this.state.selectedDoctor]}
                                                    selectedClinic={this.state.selectedClinic}
                                                />
                                                <hr/>
                                                <div className="widget-content">
                                                    <VisitTimeNew type="home" navigateTo={this.navigateTo.bind(this)} selectedSlot={this.props.selectedSlot} />
                                                    <ChoosePatientNewView patient={patient} navigateTo={this.navigateTo.bind(this)} />     
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="widget mrt-10 ct-profile skin-white">
                                                           
                                                <div className="widget-content">
                                                    <p onClick={() => {
                                                this.props.history.push(`/coupon/opd/${this.state.selectedDoctor}`)}}> HAVE A COUPON?</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="widget mrt-10 ct-profile skin-white">
                                                           
                                                <div className="widget-content">
                                                    <h4 className="title mb-20">Payment Summary</h4>
                                                    <div className="payment-summary-content">
                                                        <div className="payment-detail d-flex">
                                                        <p>Doctor fees</p>
                                                        <p>{priceData.mrp}</p>
                                                    </div>
                                                    <div className="payment-detail d-flex">
                                                        <p>Docprime discount</p>
                                                        <p>{priceData.mrp - priceData.deal_price}</p>
                                                    </div>
                                                    {
                                                        this.props.DOCTORS[this.state.selectedDoctor].couponCode
                                                        ?<div className="payment-detail d-flex">
                                                            <p  style={{color:'green'}}>Coupon discount</p>
                                                            <p  style={{color:'green'}}>{this.props.DOCTORS[this.state.selectedDoctor].disCountedPrice}</p>
                                                        </div>
                                                        :''
                                                    }
                                                    <div className="payment-detail d-flex">
                                                        <p>Subtotal</p>
                                                        <p>{priceData.deal_price}</p>
                                                    </div>
                                                </div>
                                                <hr/>
                                                               
                                                {
                                                priceData ? <div className="test-report payment-detail mt-20">
                                                    <h4 className="title payment-amt-label">Amount Payable<span style={{ marginLeft: 5, cursor: 'pointer' }}><img src={ASSETS_BASE_URL + "/img/icons/info.svg"} /></span></h4>
                                                    <h5 className="payment-amt-value">&#8377; {priceData.payable_amount}</h5>
                                                </div> : ""
                                                }
                                                              
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
                                } disabled={this.state.loading || !patient} onClick={this.proceed.bind(this, (this.props.selectedSlot && this.props.selectedSlot.date))}>{!patient?'Select Patient':'Confirm Booking'}</button>
                            }


                    </div>

                        <RightBar extraClass=" chat-float-btn-2" />
                    </div>
                </section>
            </div>
        );
    }
}


export default PatientDetailsNew
