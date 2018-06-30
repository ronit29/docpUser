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

class PatientDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDoctor: this.props.match.params.id,
            selectedClinic: this.props.match.params.clinicId,
            paymentData: {},
            loading: false,
            error: ""
        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    proceed() {

        this.setState({ loading: true, error: "" })

        let start_date = this.props.selectedSlot.date
        let start_time = this.props.selectedSlot.time.value

        let postData = {
            doctor: this.state.selectedDoctor,
            hospital: this.state.selectedClinic,
            profile: this.props.selectedProfile,
            start_date, start_time
        }

        this.props.createOPDAppointment(postData, (err, data) => {
            if (!err) {
                this.setState({
                    paymentData: data.payment_details.pgdata
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

    render() {

        let doctorDetails = this.props.DOCTORS[this.state.selectedDoctor]
        let hospital = {}
        let patient = null

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

        if (this.props.selectedProfile) {
            patient = this.props.profiles[this.props.selectedProfile]
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
                                            <div className="header-title fw-700 capitalize text-center">Booking Confirmation</div>
                                        </div>
                                        <div className="col-2">
                                        </div>
                                    </div>
                                </div>
                            </header>

                            {
                                this.props.DOCTORS[this.state.selectedDoctor] ?
                                    <div>

                                        <section className="dr-profile-screen booking-confirm-screen">
                                            <div className="container-fluid">

                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="widget mrt-10 ct-profile skin-white">
                                                            <DoctorProfileCard
                                                                details={this.props.DOCTORS[this.state.selectedDoctor]}
                                                            />
                                                            <div className="widget-content">

                                                                <div className="lab-visit-time">
                                                                    <h4 className="title"><span><img src="/assets/img/customer-icons/clock.svg" className="visit-time-icon" /></span>{hospital.hospital_name} <span className="float-right"><a className="text-primary fw-700 text-md">Rs. {(this.props.selectedSlot && this.props.selectedSlot.date) ? this.props.selectedSlot.time.price : ""}</a></span></h4>
                                                                    <p className="date-time">{hospital.address}</p>
                                                                </div>

                                                                <VisitTime type="home" navigateTo={this.navigateTo.bind(this)} selectedSlot={this.props.selectedSlot} />

                                                                <ChoosePatient patient={patient} navigateTo={this.navigateTo.bind(this)} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                    </div> : <Loader />
                            }

                            <PaymentForm paymentData={this.state.paymentData} />

                            <span className="errorMessage">{this.state.error}</span>

                            <button className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn" disabled={
                                !(patient && this.props.selectedSlot && this.props.selectedSlot.date && this.props.selectedProfile) || this.state.loading
                            } onClick={this.proceed.bind(this)}>Proceed to Pay Rs.{(this.props.selectedSlot && this.props.selectedSlot.date) ? this.props.selectedSlot.time.price : ""}</button>

                        </div>

                        <RightBar />
                    </div>
                </section>
            </div>
        );
    }
}


export default PatientDetails
