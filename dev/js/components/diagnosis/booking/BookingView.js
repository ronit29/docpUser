import React from 'react';

import TestDetail from './testDetail'
import Loader from '../../commons/Loader'
import PaymentForm from '../../commons/paymentForm'

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
            paymentData: {}
        }
    }

    componentDidMount() {

        if (this.props.rescheduleSlot && this.props.rescheduleSlot.date) {
            let start_date = this.props.rescheduleSlot.date
            let start_time = this.props.rescheduleSlot.time.value
            let appointmentData = { id: this.props.match.params.refId, start_date, start_time, status: 4 }

            this.props.updateLabAppointment(appointmentData, (err, data) => {
                if (data) {
                    this.setState({ data: data.data, loading: false })
                } else {
                    this.setState({ loading: false })
                }

                this.props.selectLabTimeSLot({ time: {} }, true)
            })
        } else {

            this.props.getLabBookingSummary(this.props.match.params.refId, (err, data) => {
                if (!err) {
                    this.setState({ data: data[0], loading: false })
                } else {
                    this.setState({ data: null, loading: false })
                }
            })
        }
    }

    cancelAppointment() {
        this.setState({ loading: true })

        let appointmentData = { id: this.state.data.id, status: 6 }

        this.props.updateLabAppointment(appointmentData, (err, data) => {
            if (data) {
                this.setState({ data: data.data, loading: false })
            } else {
                this.setState({ loading: false })
            }
        })
    }

    toogleTestDetails() {
        this.setState({ showTestDetail: !this.state.showTestDetail })
    }

    goToSlotSelector(e) {
        e.preventDefault()
        e.stopPropagation()
        this.props.history.push(`/lab/${this.state.data.lab.id}/timeslots?reschedule=true`)
    }

    retryPayment() {

        this.setState({ loading: true })

        this.props.retryPaymentLAB(this.state.data.id, (err, data) => {
            if (!err) {
                this.setState({
                    paymentData: data.pgdata
                }, () => {
                    setTimeout(() => {
                        let form = document.getElementById('paymentForm')
                        form.submit()
                        this.setState({ loading: false })
                    }, 500)
                })
            } else {
                this.setState({ loading: false })
            }
        })
    }

    navigateTo(where, e) {
        e.preventDefault()
        e.stopPropagation()
        this.props.history.push(where)
    }

    render() {

        let profile = {}
        let lab_test = []
        let lab = {}
        let date = new Date()
        let actions = []
        let status = 1

        if (this.state.data) {
            lab = this.state.data.lab
            lab_test = this.state.data.lab_test
            profile = this.state.data.profile
            date = this.state.data.time_slot_start ? new Date(this.state.data.time_slot_start) : new Date()
            actions = this.state.data.allowed_action || []
            status = this.state.data.status
        }

        return (
            <div>
                <header className="skin-primary fixed horizontal top">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-2">
                                <span className="icon back-icon" onClick={() => { this.props.history.go(-1) }}><img src="/assets/img/customer-icons/back-white.png" className="img-fluid" /></span>
                            </div>
                            <div className="col-6">
                                <div className="header-title fw-700 capitalize text-white">Your Appointment</div>
                            </div>
                            <div className="col-4">
                                <ul className="inline-list float-right user-notification-action">
                                    <li onClick={() => { this.props.history.push('/user') }}><span className="icon icon-md text-middle"><img src="/assets/img/customer-icons/user.svg" className="img-fluid" /></span></li>
                                    <li><span className="icon icon-md text-middle notification-icon"><img src="/assets/img/customer-icons/notification.svg" className="img-fluid" onClick={this.navigateTo.bind(this, '/notifications')} />
                                        {
                                            this.props.newNotification ? <span className="notification-alert">{this.props.notifications.length}</span> : ""
                                        }
                                    </span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>
                {
                    (!this.state.loading && this.state.data) ?
                        <section className="wrap ">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="app-timeline book-confirmed-timeline">
                                            {
                                                (status == 1 || status == 6) ? "" :

                                                    <ul className="inline-list">
                                                        <li className={status < 5 ? "active" : ""}>
                                                            <span className="dot">1</span>
                                                            <p className="text-sm fw-700 text-light">Appoinment Received</p>
                                                        </li>
                                                        <li className={status == 5 ? "active" : ""}>
                                                            <span className="dot">2</span>
                                                            <p className="text-sm fw-700 text-light">Appoinment Confirmed</p>
                                                        </li>
                                                        <li className={status == 7 ? "active" : ""}>
                                                            <span className="dot">3</span>
                                                            <p className="text-sm fw-700 text-light">Appoinment {status == 6 ? "Completed" : "Completed"}</p>
                                                        </li>
                                                    </ul>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        {
                                            this.state.data.otp ? <div className="widget mrb-10">
                                                <div className="widget-content">
                                                    <p className="fw-500 text-md mrb-10">Unique Confirmation Code: <span className="fw-700 text-md">5453</span></p>
                                                    <p className="text-xs text-light">Share this code with doctor at the time of your appointment</p>
                                                </div>
                                            </div> : ""
                                        }

                                        <div className="widget mrb-10">
                                            <div className="widget-content">
                                                <p className="fw-500 text-md mrb-10">Booking ID: <span className="fw-700 text-md">{this.state.data.id}</span></p>
                                                <p className="text-xs text-light">Details has been send to your email and mobile number</p>
                                            </div>
                                        </div>

                                        <div className="widget  mrb-10">
                                            <div className="widget-content pb-details pb-location">
                                                <h4 className="wc-title text-md fw-700">{lab.name}</h4>
                                                <div className="address-details">
                                                    <img src="/assets/img/customer-icons/map-icon.png" className="img-fluid add-map" />
                                                    <p className="add-info fw-500">{lab.address}</p>
                                                </div>
                                                <div className="pb-view text-left">
                                                    <a href={`https://www.google.com/maps/search/?api=1&query=${lab.long},${lab.lat}`} target="_blank" className="link-text text-md fw-700">View in Google Map</a>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="widget mrb-10">
                                            <div className="widget-content">
                                                <div>
                                                    <h4 className="title"><span><img src="/assets/img/customer-icons/clock.svg" className="visit-time-icon" /></span>Visit Time

                                                    {
                                                            actions.indexOf(4) > -1 ? <span onClick={this.goToSlotSelector.bind(this)} className="float-right"><a href="#" className="text-primary fw-700 text-sm">Reschedule Time</a></span> : ""
                                                        }

                                                    </h4>
                                                    <p className="date-time test-list fw-500">{date.toDateString()} | {date.toLocaleTimeString()}</p>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="widget mrt-10">
                                            <div className="widget-content">
                                                <div className="test-report">
                                                    <h4 className="title"><span><img src="/assets/img/customer-icons/test.svg" className="visit-time-icon" /></span>Tests <span className="float-right"><a href="#" onClick={(e) => {
                                                        e.preventDefault()
                                                        e.stopPropagation()
                                                        this.toogleTestDetails()
                                                    }} className="text-primary fw-700 text-sm">View Details</a></span></h4>

                                                    {
                                                        lab_test.map((test, i) => {
                                                            return <p key={i} className="test-list fw-500">{test.test.name}</p>
                                                        })
                                                    }

                                                </div>
                                            </div>
                                        </div>


                                        <div className="widget mrt-10">
                                            <div className="widget-content">
                                                <div className="test-report">
                                                    <h4 className="title"><span><img src="/assets/img/customer-icons/test.svg" className="visit-time-icon" /></span>Patient Details</h4>
                                                    <p className="test-list fw-500">{profile.name}</p>
                                                    <p className="test-list fw-500">{profile.phone_number}</p>
                                                    <p className="test-list fw-500">{profile.email}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </section> : <Loader />
                }

                <TestDetail show={this.state.showTestDetail} toggle={this.toogleTestDetails.bind(this)} lab_test={lab_test} />

                {
                    status === 1 ? <button onClick={this.retryPayment.bind(this)} className="v-btn v-btn-default btn-lg fixed horizontal bottom no-round text-lg cancel-booking-btn">Pay Now Rs. {this.state.data ? this.state.data.price : 0}</button> : <button onClick={this.cancelAppointment.bind(this)} className="v-btn v-btn-default btn-lg fixed horizontal bottom no-round text-lg cancel-booking-btn" disabled={actions.indexOf(6) === -1}>Cancel Booking</button>
                }

                {
                    status === 1 ? <PaymentForm paymentData={this.state.paymentData} /> : ""
                }

            </div>
        );
    }
}


export default BookingView
