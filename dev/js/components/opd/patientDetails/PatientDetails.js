import React from 'react';
import { connect } from 'react-redux';
import SnackBar from 'node-snackbar'
import DoctorProfileCard from '../commons/doctorProfileCard'
import Loader from '../../commons/Loader'
import VisitTime from './visitTime'
import ChoosePatient from './choosePatient'

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'

import CancelationPolicy from './cancellation.js'
import PaymentSummary from './paymentSummary.js'

class PatientDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDoctor: this.props.match.params.id,
            selectedClinic: this.props.match.params.clinicId,
            paymentData: {},
            loading: false,
            error: "",
            openCancellation: false,
            openPaymentSummary: false
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

        this.props.createOPDAppointment(postData, (err, data) => {
            if (!err) {
                if (data.payment_required) {
                    // send to payment selection page
                    this.props.history.push(`/payment/${data.data.orderId}`)

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
                    this.props.history.replace(`/opd/appointment/${data.data.id}`)
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

                        <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-0 center-column">

                            <header className="skin-primary fixed horizontal top bdr-1 light sticky-header">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-2">
                                            <ul className="inline-list top-nav alpha-bx text-white"
                                                onClick={() => {
                                                    this.props.history.go(-1)
                                                }}
                                            >
                                                <li>
                                                    <span className="ct-img ct-img-sm arrow-img">
                                                        <img src={ASSETS_BASE_URL + "/img/customer-icons/left-arrow.svg"} className="img-fluid" />
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-8">
                                            <div className="header-title fw-700 capitalize text-white text-center">Booking Confirmation</div>
                                        </div>
                                        <div className="col-2" style={{ paddingLeft: 0 }} >
                                            {/* <div className="mobile-home-icon-div" >
                                                <img onClick={() => {
                                                    this.props.history.push('/')
                                                }} src={ASSETS_BASE_URL + "/img/doc-prime-logo.png"} className="mobile-home-icon" />
                                            </div> */}
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
                                                                    <h4 className="title"><span><img src={ASSETS_BASE_URL + "/img/icons/home-orange.svg"} className="visit-time-icon" style={{ width: 17, marginRight: 4 }} /></span><span style={{ display: 'inline-block', width: '70%' }} >{hospital.hospital_name} </span>
                                                                        {
                                                                            (this.props.selectedSlot && this.props.selectedSlot.date) ?
                                                                                <span className="float-right text-primary fw-700 text-md">&#8377; {this.props.selectedSlot.time.deal_price}
                                                                                </span> : <span className="float-right text-primary fw-700 text-md">Time slot not selected
                                                                                </span>
                                                                        }
                                                                    </h4>
                                                                    <p className="date-time">{hospital.address}</p>
                                                                </div>

                                                                <VisitTime type="home" navigateTo={this.navigateTo.bind(this)} selectedSlot={this.props.selectedSlot} />

                                                                <ChoosePatient patient={patient} navigateTo={this.navigateTo.bind(this)} />
                                                                {
                                                                    !!priceData.payable_amount ? <div className="lab-visit-time test-report">
                                                                        <h4 className="title payment-amt-label">Total Payable Amount<span style={{ marginLeft: 5, cursor: 'pointer' }}><img src={ASSETS_BASE_URL + "/img/icons/info.svg"} onClick={this.toggle.bind(this, 'openPaymentSummary')} /></span></h4>
                                                                        <h5 className="payment-amt-value">&#8377; {priceData.payable_amount}</h5>
                                                                    </div> : ""
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12" style={{ marginTop: 10 }}>
                                                        <div className="lab-visit-time test-report" style={{ textAlign: 'right', marginTop: 10, cursor: 'pointer', marginBottom: 0 }} onClick={this.toggle.bind(this, 'openCancellation')}>
                                                            <h4 className="title payment-amt-label">Cancellation Policy<span style={{ marginLeft: 5 }}><img src={ASSETS_BASE_URL + "/img/icons/info.svg"} /></span></h4>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <a href="/terms" target="_blank">
                                                            <div className="lab-visit-time test-report" style={{ textAlign: 'right', marginTop: 10 }}>
                                                                <h4 className="title payment-amt-label">Terms of Use<span><img className="info-icon-img" src={ASSETS_BASE_URL + "/img/icons/info.svg"} /></span></h4>
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <span className="errorMessage">{this.state.error}</span>
                                                </div>
                                            </div>
                                        </section>

                                    </div> : <Loader />
                            }

                            {
                                this.state.openCancellation ? <CancelationPolicy toggle={this.toggle.bind(this, 'openCancellation')} /> : ""
                            }

                            {
                                this.state.openPaymentSummary ? <PaymentSummary toggle={this.toggle.bind(this, 'openPaymentSummary')} {...priceData} /> : ""
                            }



                            <button className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn" data-disabled={
                                !(patient && this.props.selectedSlot && this.props.selectedSlot.date) || this.state.loading
                            } disabled={this.state.loading || !patient} onClick={this.proceed.bind(this, (this.props.selectedSlot && this.props.selectedSlot.date))}>Proceed</button>

                        </div>

                        <RightBar />
                    </div>
                </section>
            </div>
        );
    }
}


export default PatientDetails
