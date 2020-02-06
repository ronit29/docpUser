import React from 'react';
import { connect } from 'react-redux'
import SnackBar from 'node-snackbar'
import Loader from '../../commons/Loader'
import VisitTime from './visitTime'
import PickupAddress from './pickupAddress'
import ChoosePatient from './choosePatient'
import InitialsPicture from '../../commons/initialsPicture'
// const queryString = require('query-string');

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'

import CancelationPolicy from './cancellation.js'
import PaymentSummary from './paymentSummary.js'
import GTM from '../../../helpers/gtm.js'


class BookingSummaryView extends React.Component {
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
            showAddressError: false
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

    openTests() {
        this.props.history.push(`/lab/${this.state.selectedLab}/tests`)
    }

    handlePickupType(e) {
        //always clear selected time at lab profile
        let slot = { time: {} }
        this.props.selectLabTimeSLot(slot, false)
        this.props.selectLabAppointmentType(e.target.value)
        this.setState({ showTimeError: false, showAddressError: false });
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
                    <VisitTime type="lab" navigateTo={this.navigateTo.bind(this)} selectedSlot={this.props.selectedSlot} timeError={this.state.showTimeError} />
                    <ChoosePatient patient={patient} navigateTo={this.navigateTo.bind(this)} />
                </div>
            }

            case "home": {
                return <div>
                    <VisitTime type="home" navigateTo={this.navigateTo.bind(this)} selectedSlot={this.props.selectedSlot} timeError={this.state.showTimeError} />
                    <PickupAddress {...this.props} addressError={this.state.showAddressError} />
                    <ChoosePatient patient={patient} navigateTo={this.navigateTo.bind(this)} />
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
            this.setState({ showAddressError: true });
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
        let extraParams = {

        }
        this.props.sendAgentBookingURL(this.state.order_id, 'sms',null,null, extraParams, (err, res) => {
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


        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container parent-section book-appointment-section hospital-view-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            {/* <header className="skin-white fixed horizontal top bdr-1 bottom light sticky-header">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-2">
                                            <ul className="inline-list">
                                                <li onClick={() => {
                                                    this.props.history.go(-1)
                                                }}><span className="icon icon-sm text-middle back-icon-white"><img src={ASSETS_BASE_URL + "/img/customer-icons/back-icon.png"} className="img-fluid" /></span></li>
                                            </ul>
                                        </div>
                                        <div className="col-8">
                                            <div className="header-title fw-700 capitalize text-center">Booking Confirmation</div>
                                        </div>
                                        <div className="col-2">
                                        </div>
                                    </div>
                                </div>
                            </header> */}

                            {
                                this.props.LABS[this.state.selectedLab] ?
                                    <div>
                                        <section className="booking-confirm-screen">
                                            <div className="container-fluid">
                                                <div className="row">

                                                    <div className="col-12">
                                                        <div className="widget mrt-10">

                                                            <div className="widget-content">

                                                                <div className="lab-details">
                                                                    <InitialsPicture name={labDetail.name} has_image={!!labDetail.lab_thumbnail} className="initialsPicture-lb">
                                                                        <img src={labDetail.lab_thumbnail} className="img-fluid" />
                                                                    </InitialsPicture>

                                                                    <div className="lab-title">
                                                                        <h1 className="fw-700 text-md title">{labDetail.name}</h1>
                                                                        <p className="fw-500 text-sm text-light">{labDetail.address}</p>
                                                                    </div>
                                                                </div>

                                                                <div className="lab-visit-time test-report">
                                                                    <h4 className="title"><span><img src={ASSETS_BASE_URL + "/img/customer-icons/test.svg"} className="visit-time-icon" /></span>Tests <span className="float-right"><a style={{ cursor: 'pointer' }} onClick={this.openTests.bind(this)} className="text-primary fw-700 text-sm">Change Tests</a></span></h4>
                                                                    {tests}
                                                                </div>

                                                                {
                                                                    is_home_collection_enabled ?
                                                                        <div className="lab-visit-time test-report lab-appointment-div row">
                                                                            <h4 className="title col-12"><span style={{ display: 'none' }}><img src={ASSETS_BASE_URL + "/img/customer-icons/test.svg"} className="visit-time-icon" /></span>Appointment type </h4>
                                                                            <ul className="inline-list booking-type col-12">
                                                                                <li><label className="radio-inline lab-appointment-label text-md fw-500 text-primary"><input type="radio" name="optradio" onChange={this.handlePickupType.bind(this)} value="home" checked={this.props.selectedAppointmentType == 'home'} /> Home Pick-up</label></li>
                                                                                <li><label className="radio-inline lab-appointment-label text-md fw-500 text-primary"><input type="radio" name="optradio" onChange={this.handlePickupType.bind(this)} value="lab" checked={this.props.selectedAppointmentType == 'lab'} /> Lab Visit</label></li>
                                                                            </ul>
                                                                        </div> : ""
                                                                }




                                                                {this.getSelectors()}

                                                                <div className="lab-visit-time test-report">
                                                                    <h4 className="title payment-amt-label">Total Payable Amount<span><img className="info-icon-img" src={ASSETS_BASE_URL + "/img/icons/info.svg"} style={{ cursor: 'pointer' }} onClick={this.toggle.bind(this, 'openPaymentSummary')} /></span></h4>
                                                                    {
                                                                        this.props.selectedAppointmentType == 'home' ? <h5 className="payment-amt-value fw-500">&#8377;  {finalPrice + (labDetail.home_pickup_charges || 0)}</h5> : <h5 className="payment-amt-value fw-500">&#8377;  {finalPrice}</h5>
                                                                    }

                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="lab-visit-time test-report" style={{ marginTop: 10, cursor: 'pointer', marginBottom: 0 }} onClick={this.toggle.bind(this, 'openCancellation')}>
                                                            <h4 className="title payment-amt-label">Free Cancellation<span><img className="info-icon-img" src={ASSETS_BASE_URL + "/img/icons/info.svg"} /></span></h4>
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

                                        {
                                            this.state.openCancellation ? <CancelationPolicy toggle={this.toggle.bind(this, 'openCancellation')} /> : ""
                                        }

                                        {
                                            this.state.openPaymentSummary ? <PaymentSummary toggle={this.toggle.bind(this, 'openPaymentSummary')} finalPrice={finalPrice} finalMrp={finalMrp} home_pickup_charges={labDetail.home_pickup_charges} is_home_collection_enabled={this.props.selectedAppointmentType == 'home'} /> : ""
                                        }

                                        {
                                            this.state.order_id ? <button onClick={this.sendAgentBookingURL.bind(this)} className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg static-btn">Send SMS EMAIL</button> : <button data-disabled={
                                                (!(patient && this.props.selectedSlot && this.props.selectedSlot.date && (address_picked_verified || this.props.selectedAppointmentType == 'lab')) || this.state.loading || tests.length == 0)
                                            } disabled={this.state.loading || !patient} onClick={this.proceed.bind(this, tests.length, (address_picked_verified || this.props.selectedAppointmentType == 'lab'), (this.props.selectedSlot && this.props.selectedSlot.date))} className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg static-btn">Proceed</button>
                                        }



                                    </div> : <Loader />
                            }

                        </div>

                        <RightBar extraClass=" chat-float-btn-2" msgTemplate="gold_general_template"/>
                    </div>
                </section>
            </div>
        );
    }
}


export default BookingSummaryView
