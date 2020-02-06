import React from 'react';
import { connect } from 'react-redux';
import SnackBar from 'node-snackbar'

import Loader from '../../commons/Loader'
import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'

import CancelationPolicy from './cancellation.js'

import SelectedClinic from '../commons/selectedClinic/index.js'
import VisitTimeNew from '../patientDetails/VisitTimeNew'
import PaymentForm from '../../commons/paymentForm'

class AppointmentReschedule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            paymentData: null,
            data: null,
            loading: true,
            showCancel: false,
            error: "",
            openCancellation: false,
            openPaymentSummary: false
        }
    }

    toggle(which) {
        this.setState({ [which]: !this.state[which] })
    }

    componentDidMount() {

        this.props.getOPDBookingSummary(this.props.match.params.refId, (err, data) => {
            if (!err) {
                this.setState({ data: data[0], loading: false })
            } else {
                this.setState({ data: null, loading: false })
            }
        })

        if (window) {
            window.scrollTo(0, 0)
        }
    }

    proceed() {

        this.setState({ loading: true, error: "" })

        let start_date = this.props.rescheduleSlot.date
        let start_time = this.props.rescheduleSlot.time.value
        let appointmentData = { id: this.props.match.params.refId, start_date, start_time, status: 4 }

        this.props.updateOPDAppointment(appointmentData, (err, data) => {
            if (!err) {
                if (data.payment_required) {
                    // send to payment selection page
                    //this.props.history.push(`/payment/${data.data.orderId}`)
                    this.processPayment(data)
                } else {
                    SnackBar.show({ pos: 'bottom-center', text: "Appointment Reschduled." })
                    // send back to appointment page
                    this.props.history.replace(`/opd/appointment/${this.props.match.params.refId}`)
                }
            } else {
                let message = "Could not reschedule appointment. Try again later !"
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
                        form.submit()
                    }
                },500)
            })
        }
    }

    navigateTo(where, e) {
        switch (where) {
            case "time": {
                this.props.history.push(`/opd/doctor/${this.state.selectedDoctor}/${this.state.selectedClinic}/book?goback=true`)
                return
            }
        }
    }

    cancelAppointment() {
        this.setState({ loading: true, showCancel: false })

        let appointmentData = { id: this.state.data.id, status: 6, refund: 0 }
        this.props.updateOPDAppointment(appointmentData, (err, data) => {
            if (data) {
                SnackBar.show({ pos: 'bottom-center', text: "Appointment Canceled." })
                // send back to appointment page
                this.props.history.replace(`/opd/appointment/${this.props.match.params.refId}`)
            } else {
                let message = "Could not cancel appointment. Try again later !"
                if (err.message) {
                    message = err.message
                }
                this.setState({ loading: false, error: message })
            }
        })
    }

    render() {

        let doctor = {}
        let profile = {}
        let hospital = {}
        let date = new Date()
        let actions = []
        let status = 1
        let priceData = {}
        let bookingEnabled = false
        let procedures = false
        let is_price_changed = false

        if (this.state.data) {
            doctor = this.state.data.doctor
            hospital = this.state.data.hospital
            profile = this.state.data.profile
            date = this.state.data.time_slot_start ? new Date(this.state.data.time_slot_start) : new Date()
            actions = this.state.data.allowed_action || []
            status = this.state.data.status
            doctor.thumbnail = this.state.data.doctor_thumbnail
            doctor.hospitals = [hospital]

            if (this.props.rescheduleSlot && this.props.rescheduleSlot.date) {
                priceData = { ...this.props.rescheduleSlot.time }
                priceData.old_deal_price = this.state.data.deal_price
                priceData.payable_amount = priceData.deal_price - priceData.old_deal_price
            }
            if (this.state.data.procedures.length) {
                procedures = true
                priceData.payable_amount = 0
            }
        }

        if (this.state.data && this.props.DOCTOR && this.props.DOCTOR[this.state.data.doctor.id]) {
            bookingEnabled = this.props.DOCTOR[this.state.data.doctor.id].enabled_for_online_booking;
        }

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column">

                            {
                                this.state.data?
                                    <div>
                                        <section className="dr-profile-screen booking-confirm-screen">
                                            <div className="container-fluid">

                                                <div className="row mrb-20">
                                                    <div className="col-12">

                                                        <SelectedClinic
                                                            boxShadowHide={true}
                                                            selectedDoctor={doctor}
                                                            selectedClinic={hospital.id}
                                                        />

                                                        <VisitTimeNew type="home" navigateTo={this.navigateTo.bind(this)} selectedSlot={this.props.rescheduleSlot} hideChangeTime={true} timeError={null} />

                                                        {
                                                            priceData.payable_amount != 0 && this.state.data.status !== 7 ? <div className="csh-back-applied-container" style={{ marginBottom: 20 }}>
                                                                <p className="csh-mny-applied-content">Amount for the appointment is changed, to proceed you need to cancel this order and place a new one.</p>
                                                            </div> : ""
                                                        }

                                                        <div className="widget mrb-15">
                                                            <div className="widget-content">
                                                                <div className="lab-visit-time d-flex jc-spaceb">
                                                                    <h4 className="title d-flex"><span>
                                                                        <img style={{ width: '20px', marginRight: '8px' }} src={ASSETS_BASE_URL + "/img/nw-usr.svg"} />
                                                                    </span>Patient</h4>
                                                                    <div className="float-right  mbl-view-formatting text-right">
                                                                        <h4 className="date-time title">{profile ? profile.name : ""} </h4>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {this.state.data && this.state.data.status !== 7 ? <div>
                                                            <div className="lab-visit-time test-report" style={{ marginTop: 10, cursor: 'pointer', marginBottom: 0 }} onClick={this.toggle.bind(this, 'openCancellation')}>
                                                                <h4 className="title payment-amt-label fs-italic">Free Cancellation<span style={{ marginLeft: 5 }}><img src={ASSETS_BASE_URL + "/img/icons/info.svg"} /></span></h4>
                                                            </div>

                                                            <a href="/terms" target="_blank">
                                                                <div className="lab-visit-time test-report" style={{ marginTop: 10 }}>
                                                                    <h4 className="title payment-amt-label fs-italic">Terms of Use<span><img className="info-icon-img" src={ASSETS_BASE_URL + "/img/icons/info.svg"} /></span></h4>
                                                                    <span className="errorMessage">{this.state.error}</span>
                                                                </div>
                                                            </a>
                                                        </div> : ''
                                                        }
                                                    </div>

                                                </div>
                                                {this.state.data && this.state.data.status == 7 ?
                                                    <div className="text-center">
                                                        <div className="sms-reschedule mrt-10">
                                                            <p className="fw-500">This appointment cannot be rescheduled as you have already marked this appointment complete. </p>
                                                        </div>
                                                        <button className="sms-lgbtn" onClick={() => (this.props.history.push('/'))}>Go to Homepage</button>
                                                    </div>
                                                    : ''
                                                }
                                            </div>

                                            {
                                                this.state.openCancellation ? <CancelationPolicy props={this.props} toggle={this.toggle.bind(this, 'openCancellation')} /> : ""
                                            }
                                        </section>
                                    </div>
                                    : <Loader />
                            }

                            {this.state.data && this.state.data.status != 7 ?
                                priceData.payable_amount == 0 ? <button disabled={this.state.loading} className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round text-lg static-btn" onClick={this.proceed.bind(this)}>Confirm Reschedule</button> : <button disabled={this.state.loading} className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round text-lg static-btn" onClick={this.cancelAppointment.bind(this)}>Cancel and rebook</button>
                                : ''
                            }


                        </div>

                        <RightBar msgTemplate="gold_general_template"/>
                    </div>
                </section>
                {
                    this.state.paymentData ? <PaymentForm paymentData={this.state.paymentData} /> : ""
                }
            </div>
        );
    }
}


export default AppointmentReschedule
