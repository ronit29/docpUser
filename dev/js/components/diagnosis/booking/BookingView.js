import React from 'react';
import InitialsPicture from '../../commons/initialsPicture'
import SnackBar from 'node-snackbar'

import TestDetail from './testDetail'
import Loader from '../../commons/Loader'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import CancelPopup from './cancelPopup.js'

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
            showCancel: false
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
                    SnackBar.show({ pos: 'bottom-center', text: "Appointment reschedule success." });
                } else {
                    this.setState({ loading: false })
                }

                this.props.selectLabTimeSLot({ time: {} }, true)
                this.props.getUpcomingAppointments()
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

        if (window) {
            window.scrollTo(0, 0)
        }
    }

    cancelAppointment(type) {
        this.setState({ loading: true })

        let appointmentData = { id: this.state.data.id, status: 6, refund: type }

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
        this.props.history.push(`/lab/${this.state.data.lab.id}/timeslots?reschedule=true?type=${this.state.data.is_home_pickup ? 'home' : 'lab'}`)
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
        let lab_thumbnail = ""

        if (this.state.data) {
            lab = this.state.data.lab
            lab_test = this.state.data.lab_test
            profile = this.state.data.profile
            date = this.state.data.time_slot_start ? new Date(this.state.data.time_slot_start) : new Date()
            actions = this.state.data.allowed_action || []
            status = this.state.data.status
            lab_thumbnail = this.state.data.lab_thumbnail
        }

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container parent-section book-appointment-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-0 center-column">
                            <header className="skin-primary fixed horizontal top sticky-header">
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
                                            {/* <ul className="inline-list float-right user-notification-action">
                                                <li onClick={() => { this.props.history.push('/user') }}><span className="icon icon-md text-middle"><img src={ASSETS_BASE_URL + "/img/customer-icons/user.svg"} className="img-fluid" /></span></li>
                                                <li><span className="icon icon-md text-middle notification-icon"><img src={ASSETS_BASE_URL + "/img/customer-icons/notification.svg"} className="img-fluid" onClick={this.navigateTo.bind(this, '/notifications')} />
                                                    {
                                                        this.props.newNotification > 0 ? <span className="notification-alert">{this.props.newNotification}</span> : ""
                                                    }
                                                </span></li>
                                            </ul> */}
                                        </div>
                                    </div>
                                </div>
                            </header>
                            {
                                (!this.state.loading && this.state.data) ?
                                    <section className="booking-confirm-screen">
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="app-timeline book-confirmed-timeline">
                                                        {
                                                            (status == 1 || status == 6) ? <h4 style={{ textAlign: 'center' }}>Appointment Cancelled</h4> :

                                                                <ul className="inline-list">
                                                                    <li className={status < 5 ? "active" : ""}>
                                                                        <span className="dot">1</span>
                                                                        <p className="text-sm fw-700 text-light">Appointment Received</p>
                                                                    </li>
                                                                    <li className={status == 5 ? "active" : ""}>
                                                                        <span className="dot">2</span>
                                                                        <p className="text-sm fw-700 text-light">Appointment Confirmed</p>
                                                                    </li>
                                                                    <li className={status == 7 ? "active" : ""}>
                                                                        <span className="dot">3</span>
                                                                        <p className="text-sm fw-700 text-light">Appointment {status == 6 ? "Completed" : "Completed"}</p>
                                                                    </li>
                                                                </ul>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    {
                                                        (this.state.data.otp && status > 2 && status < 6) ? <div className="widget mrb-10">
                                                            <div className="widget-content">
                                                                <p className="fw-500 text-md mrb-10">Unique Confirmation Code: <span className="fw-700 text-md">{this.state.data.otp}</span></p>
                                                                <p className="text-xs text-light">Share this code with doctor at the time of your appointment</p>
                                                            </div>
                                                        </div> : ""
                                                    }

                                                    <div className="widget mrb-10">
                                                        <div className="widget-content">
                                                            <p className="fw-500 text-md mrb-10">Booking ID: <span className="fw-700 text-md">{this.state.data.id}</span></p>
                                                            <p className="text-xs text-light">Details has been send to your email and mobile number</p>
                                                            {
                                                                actions.indexOf(6) > -1 ? <a onClick={this.toggleCancel.bind(this)} href="#" className="text-primary fw-700 text-sm">Cancel Booking</a> : ""
                                                            }

                                                        </div>
                                                    </div>

                                                    <div className="widget  mrb-10">
                                                        <div className="widget-content pb-details pb-location">
                                                            <h4 className="wc-title text-md fw-700">{lab.name}</h4>
                                                            <div className="address-details">
                                                                <InitialsPicture name={lab.name} has_image={!!lab_thumbnail} className="initialsPicture-lb" onClick={this.navigateTo.bind(this, `/lab/${lab.id}`)}>
                                                                    <img style={{ width: 50, height: 50 }} src={lab_thumbnail} className="img-fluid add-map" />
                                                                </InitialsPicture>

                                                                <p className="add-info fw-500">{lab.address}</p>
                                                            </div>
                                                            <div className="pb-view text-left">
                                                                <a href={`https://www.google.com/maps/search/?api=1&query=${lab.lat},${lab.long}`} target="_blank" className="link-text text-md fw-700">View in Google Map</a>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="widget mrb-10">
                                                        <div className="widget-content">
                                                            <div>
                                                                <h4 className="title"><span><img src={ASSETS_BASE_URL + "/img/customer-icons/clock.svg"} className="visit-time-icon" /></span>Visit Time

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
                                                                <h4 className="title"><span><img src={ASSETS_BASE_URL + "/img/customer-icons/test.svg"} className="visit-time-icon" /></span>Tests <span className="float-right"><a href="#" onClick={(e) => {
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
                                                                <h4 className="title"><span><img className="visit-time-icon" src={ASSETS_BASE_URL + "/img/icons/user.svg"} style={{
                                                                    width: 14, marginRight: 5, verticalAlign: -3
                                                                }} /></span>Patient Details</h4>
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
                                this.state.showCancel ? <CancelPopup toggle={this.toggleCancel.bind(this)} cancelAppointment={this.cancelAppointment.bind(this)} /> : ""
                            }

                        </div>
                        <RightBar />
                    </div>
                </section>
            </div>
        );
    }
}


export default BookingView
