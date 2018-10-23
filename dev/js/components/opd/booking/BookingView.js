import React from 'react';

import Loader from '../../commons/Loader'
import InitialsPicture from '../../commons/initialsPicture'
import RatingProfileCard from '../../commons/ratingsProfileView/RatingProfileCard.js'
import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import CancelPopup from './cancelPopup.js'
import GTM from '../../../helpers/gtm.js'

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
            payment_success: this.props.location.search.includes('payment_success')
        }
    }

    componentDidMount() {
        // reset reschedule data
        if (this.props.rescheduleSlot && this.props.rescheduleSlot.date) {
            this.props.selectOpdTimeSLot({ time: {} }, true, null)
        }

        let appointmentId = this.props.match.params.refId;
        this.props.getOPDBookingSummary(appointmentId, (err, data) => {
            if (!err) {
                this.setState({ data: data[0], loading: false })
            } else {
                this.setState({ data: null, loading: false })
            }
        })

        if (window) {
            window.scrollTo(0, 0)
        }

        if (this.state.payment_success) {

            let data = {
                'Category': 'ConsumerApp', 'Action': 'DoctorAppointmentBooked', 'CustomerID': GTM.getUserId(), 'leadid': appointmentId, 'event': 'doctor-appointment-booked'
            }
            GTM.sendEvent({ data: data })
        }
    }

    getQualificationStr(qualificationSpecialization) {
        return qualificationSpecialization.reduce((str, curr, i) => {
            str += `${curr.name}`
            if (i < qualificationSpecialization.length - 1) str += `, `;
            return str
        }, "")
    }

    cancelAppointment(type) {
        this.setState({ loading: true, showCancel: false })
        let data;
        if (type) {

            data = {
                'Category': 'ConsumerApp', 'Action': 'CancelOpdAppointmentAndRefund', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'cancel-opd-appointment-Refund', 'appointmentId': this.state.data.id
            }
        } else {

            data = {
                'Category': 'ConsumerApp', 'Action': 'CancelOpdAppointmentAndBookNew', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'cancel-opd-appointment-Book-New', 'appointmentId': this.state.data.id
            }
        }

        GTM.sendEvent({ data: data })

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
                                        <div className="col-2" style={{ paddingLeft: 0 }} >
                                            <div className="mobile-home-icon-div" >
                                                <img onClick={() => {
                                                    this.props.history.push('/')
                                                }} src={ASSETS_BASE_URL + "/img/doc-prime-logo.png"} className="mobile-home-icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </header> */}
                            {
                                (!this.state.loading && this.state.data) ? <section className="booking-confirm-screen">
                                    <div className="container-fluid">

                                        <div className="row">
                                            <div className="col-12">
                                                <div className="app-timeline book-confirmed-timeline">
                                                    {
                                                        (status == 1 || status == 6) ? <h4 style={{ textAlign: 'center' }}>Appointment Cancelled</h4> :

                                                            <ul className="inline-list">
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
                                                {(this.state.is_rated && this.state.data.is_rated == false && this.state.data.rating_declined == false) ? (<RatingProfileCard {...this.props} details={this.state.data} />) : ""}

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


                                                <div className="widget mrb-10">
                                                    <div className="widget-content">
                                                        <p className="fw-500 text-md mrb-10">Booking ID: <span className="fw-700 text-md">{this.state.data.id}</span></p>
                                                        <p className="text-xs text-light">Details have been sent to your email-id and mobile number.</p>
                                                        {
                                                            actions.indexOf(6) > -1 ? <a onClick={this.toggleCancel.bind(this)} href="#" className="text-primary fw-700 text-sm">Cancel Booking</a> : ""
                                                        }
                                                    </div>
                                                </div>
                                                <div className="widget mrb-10">
                                                    <div className="widget-content bokng-card pb-details pb-location">
                                                        <h4 className="wc-title text-md fw-700 card-nm-ovrlpng">{doctor.display_name}</h4>
                                                        <InitialsPicture name={doctor.name} has_image={!!doctor_thumbnail} className="initialsPicture-dbd" onClick={this.navigateTo.bind(this, `/opd/doctor/${doctor.id}`)}>
                                                            <img src={doctor_thumbnail} style={{ width: 50 }} className="img-fluid add-map img-round crd-doc-img" />
                                                        </InitialsPicture>
                                                        <div className="address-details">


                                                            <p className="add-info fw-500">{this.getQualificationStr(doctor.general_specialization || [])}</p>
                                                        </div>
                                                    </div>
                                                    <div className="widget-content pb-details pb-location">
                                                        <h4 className="wc-title text-md fw-700 card-nm-ovrlpng">{hospital.name}</h4>
                                                        <div className="address-details">
                                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/map-icon.png"} className="img-fluid add-map" />
                                                            <p className="add-info fw-500">{hospital.address}</p>
                                                        </div>
                                                        <div className="pb-view text-left">
                                                            <a href={`https://www.google.com/maps/search/?api=1&query=${hospital.lat},${hospital.long}`} target="_blank" className="link-text text-md fw-700">View in Google Map</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="widget mrb-10">
                                                    <div className="widget-content">
                                                        <div>
                                                            <h4 className="title"><span><img className="visit-time-icon" src={ASSETS_BASE_URL + "/img/customer-icons/clock.svg"} /></span>Clinic Visit Time

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
                                    {
                                        status == 7 ? <button onClick={() => {
                                            this.props.history.push(`/user/opd/reports/${this.state.data.id}`)
                                        }} className="viewpresbtn">View Prescription</button> : ""
                                    }
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
