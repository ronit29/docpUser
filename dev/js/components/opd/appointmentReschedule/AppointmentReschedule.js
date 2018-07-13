import React from 'react';
import { connect } from 'react-redux';

import DoctorProfileCard from '../commons/doctorProfileCard'
import Loader from '../../commons/Loader'
import VisitTime from './visitTime'
import ChoosePatient from './choosePatient'
import PaymentForm from '../../commons/paymentForm'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'

import CancelationPolicy from './cancellation.js'
import PaymentSummary from './paymentSummary.js'

class AppointmentReschedule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            paymentData: {},
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
                    this.setState({
                        paymentData: data.data
                    }, () => {
                        setTimeout(() => {
                            let form = document.getElementById('paymentForm')
                            form.submit()
                        }, 500)

                        setTimeout(() => {
                            this.setState({ loading: false })
                        }, 5000)
                    })
                } else {
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

    navigateTo(where, e) {
        switch (where) {
            case "time": {
                debugger
                this.props.history.push(`/opd/doctor/${this.state.selectedDoctor}/${this.state.selectedClinic}/book?goback=true`)
                return
            }
        }
    }

    render() {

        let doctor = {}
        let profile = {}
        let hospital = {}
        let date = new Date()
        let actions = []
        let status = 1
        let priceData = {}

        if (this.state.data) {
            doctor = this.state.data.doctor
            hospital = this.state.data.hospital
            profile = this.state.data.profile
            date = this.state.data.time_slot_start ? new Date(this.state.data.time_slot_start) : new Date()
            actions = this.state.data.allowed_action || []
            status = this.state.data.status
            doctor.thumbnail = this.state.data.doctor_thumbnail

            if (this.props.rescheduleSlot && this.props.rescheduleSlot.date) {
                priceData = { ...this.props.rescheduleSlot.time }
                priceData.old_deal_price = this.state.data.deal_price
                priceData.payable_amount = priceData.deal_price - priceData.old_deal_price
            }
        }

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container parent-section book-appointment-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-0 center-column">

                            <header className="skin-white fixed horizontal top bdr-1 bottom light sticky-header">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-2">
                                            <ul className="inline-list">
                                                <li onClick={() => {
                                                    this.props.history.go(-1)
                                                }}><span className="icon icon-sm text-middle back-icon-white"><img src="/assets/img/customer-icons/back-icon.png" className="img-fluid" /></span></li>
                                            </ul>
                                        </div>
                                        <div className="col-8">
                                            <div className="header-title fw-700 capitalize text-center">Reschedule Appointment</div>
                                        </div>
                                        <div className="col-2">
                                        </div>
                                    </div>
                                </div>
                            </header>

                            {
                                this.state.data ?
                                    <div>

                                        <section className="dr-profile-screen booking-confirm-screen">
                                            <div className="container-fluid">

                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="widget mrt-10 ct-profile skin-white">
                                                            <DoctorProfileCard
                                                                details={doctor}
                                                            />
                                                            <div className="widget-content">

                                                                <div className="lab-visit-time">
                                                                    <h4 className="title"><span><img src="/assets/img/icons/home-orange.svg" className="visit-time-icon" style={{ width: 17, marginRight: 6 }} /></span>{hospital.name} </h4>
                                                                    <p className="date-time">{hospital.address}</p>
                                                                </div>

                                                                <VisitTime navigateTo={this.navigateTo.bind(this)} selectedSlot={this.props.rescheduleSlot} />

                                                                <ChoosePatient patient={profile} />

                                                                <div className="lab-visit-time test-report">
                                                                    <h4 className="title payment-amt-label">Total Payable Amount<span><img src="/assets/img/icons/info.svg" onClick={this.toggle.bind(this, 'openPaymentSummary')} /></span></h4>
                                                                    <h5 className="payment-amt-value">Rs. {priceData.payable_amount}</h5>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12" style={{ marginTop: 10 }}>
                                                        <div className="lab-visit-time test-report" style={{ textAlign: 'right' }} onClick={this.toggle.bind(this, 'openCancellation')}>
                                                            <h4 className="title payment-amt-label">Money back guarantee<span><img src="/assets/img/icons/info.svg" /></span></h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                    </div> : <Loader />
                            }

                            <PaymentForm paymentData={this.state.paymentData} />

                            {
                                this.state.openCancellation ? <CancelationPolicy toggle={this.toggle.bind(this, 'openCancellation')} /> : ""
                            }

                            {
                                (this.state.openPaymentSummary && !!priceData.payable_amount) ? <PaymentSummary toggle={this.toggle.bind(this, 'openPaymentSummary')} {...priceData} /> : ""
                            }

                            <span className="errorMessage">{this.state.error}</span>

                            <button disabled={this.state.loading} className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn" onClick={this.proceed.bind(this)}>Reschedule</button>

                        </div>

                        <RightBar />
                    </div>
                </section>
            </div>
        );
    }
}


export default AppointmentReschedule
