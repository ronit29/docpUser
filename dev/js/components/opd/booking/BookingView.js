import React from 'react';

import Loader from '../../commons/Loader'
import InitialsPicture from '../../commons/initialsPicture'

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
            data: null,
            loading: true,
            showCancel: false
        }
    }

    componentDidMount() {
        // reset reschedule data
        if (this.props.rescheduleSlot && this.props.rescheduleSlot.date) {
            this.props.selectOpdTimeSLot({ time: {} }, true, null)
        }

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

    getQualificationStr(qualificationSpecialization) {
        return qualificationSpecialization.reduce((str, curr, i) => {
            str += `${curr.qualification}`
            if (curr.specialization) {
                str += ` - ${curr.specialization}`
            }
            if (i < qualificationSpecialization.length - 1) str += `, `;
            return str
        }, "")
    }

    cancelAppointment(type) {
        this.setState({ loading: true })

        let appointmentData = { id: this.state.data.id, status: 6, refund: type }

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
        this.props.history.push(`/opd/doctor/${this.state.data.doctor.id}/${this.state.data.hospital.id}/book?reschedule=${this.props.match.params.refId}`)
    }

    navigateTo(where, e) {
        e.preventDefault()
        e.stopPropagation()
        this.props.history.push(where)
    }

    render() {

        let doctor = {}
        let profile = {}
        let hospital = {}
        let date = new Date()
        let actions = []
        let status = 1
        let doctor_thumbnail = ""

        if (this.state.data) {
            doctor = this.state.data.doctor
            hospital = this.state.data.hospital
            profile = this.state.data.profile
            date = this.state.data.time_slot_start ? new Date(this.state.data.time_slot_start) : new Date()
            actions = this.state.data.allowed_action || []
            status = this.state.data.status
            doctor_thumbnail = this.state.data.doctor_thumbnail
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
                                            <span className="icon back-icon" onClick={() => { this.props.history.go(-1) }}><img src="/assets/img/customer-icons/back-white.png" className="img-fluid" /></span>
                                        </div>
                                        <div className="col-6">
                                            <div className="header-title fw-700 capitalize text-white">Your Appointment</div>
                                        </div>
                                        <div className="col-4">
                                            <ul className="inline-list float-right user-notification-action">
                                                <li onClick={() => { this.props.history.push('/user') }}><span className="icon icon-md text-middle"><img src="/assets/img/customer-icons/user.svg" style={{ cursor: 'pointer' }} className="img-fluid" /></span></li>
                                                <li><span className="icon icon-md text-middle notification-icon"><img src="/assets/img/customer-icons/notification.svg" style={{ cursor: 'pointer' }} className="img-fluid" onClick={this.navigateTo.bind(this, '/notifications')} />
                                                    {
                                                        this.props.newNotification ? <span className="notification-alert">{this.props.notifications.length}</span> : ""
                                                    }
                                                </span>

                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </header>
                            {
                                (!this.state.loading && this.state.data) ? <section className="booking-confirm-screen">
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
                                                <div className="widget mrb-10">
                                                    <div className="widget-content pb-details pb-location">
                                                        <h4 className="wc-title text-md fw-700">{doctor.name}</h4>
                                                        <div className="address-details">
                                                            <InitialsPicture name={doctor.name} has_image={!!doctor_thumbnail} className="initialsPicture-dbd">
                                                                <img src={doctor_thumbnail} style={{ width: 50, marginTop: -28, cursor: 'unset' }} className="img-fluid add-map img-round" />
                                                            </InitialsPicture>

                                                            <p className="add-info fw-500">{this.getQualificationStr(doctor.qualifications)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="widget-content pb-details pb-location">
                                                        <h4 className="wc-title text-md fw-700">{hospital.name}</h4>
                                                        <div className="address-details">
                                                            <img src="/assets/img/customer-icons/map-icon.png" className="img-fluid add-map" />
                                                            <p className="add-info fw-500">{hospital.address}</p>
                                                        </div>
                                                        <div className="pb-view text-left">
                                                            <a href={`https://www.google.com/maps/search/?api=1&query=${hospital.lng},${hospital.lat}`} target="_blank" className="link-text text-md fw-700">View in Google Map</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="widget mrb-10">
                                                    <div className="widget-content">
                                                        <div>
                                                            <h4 className="title"><span><img className="visit-time-icon" src="/assets/img/customer-icons/clock.svg" /></span>Clinic Visit Time

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
                                                            <h4 className="title"><span><img className="visit-time-icon" src="/assets/img/icons/user.svg" style={{
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
