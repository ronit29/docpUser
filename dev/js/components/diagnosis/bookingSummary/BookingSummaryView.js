import React from 'react';
import { connect } from 'react-redux'

import Loader from '../../commons/Loader'
import VisitTime from './visitTime'
import PickupAddress from './pickupAddress'
import ChoosePatient from './choosePatient'
import PaymentForm from '../../commons/paymentForm'

class BookingSummaryView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLab: this.props.match.params.id,
            paymentData: {},
            loading: false,
            error: ""
        }
    }

    openTests() {
        this.props.history.push(`/lab/${this.state.selectedLab}/tests`)
    }

    handlePickupType(e) {
        this.props.selectLabAppointmentType(e.target.value)
    }

    navigateTo(where, e) {
        switch (where) {
            case "time": {
                this.props.history.push(`/lab/${this.state.selectedLab}/timeslots?type=${this.props.selectedAppointmentType}`)
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
        if (this.props.selectedProfile) {
            patient = this.props.profiles[this.props.selectedProfile]
        }

        switch (this.props.selectedAppointmentType) {
            case "lab": {
                return <div>
                    <VisitTime type="lab" navigateTo={this.navigateTo.bind(this)} selectedSlot={this.props.selectedSlot} />
                    <ChoosePatient patient={patient} navigateTo={this.navigateTo.bind(this)} />
                </div>
            }

            case "home": {
                return <div>
                    <VisitTime type="home" navigateTo={this.navigateTo.bind(this)} selectedSlot={this.props.selectedSlot} />
                    <PickupAddress {...this.props} />
                    <ChoosePatient patient={patient} navigateTo={this.navigateTo.bind(this)} />
                </div>
            }
        }
    }

    proceed() {
        this.setState({ loading: true, error: "" })

        let start_date = this.props.selectedSlot.date
        let start_time = this.props.selectedSlot.time.value

        let postData = {
            lab: this.state.selectedLab,
            test_ids: this.props.selectedCriterias.filter(x => x.type == 'test').map(t => t.id),
            profile: this.props.selectedProfile,
            start_date, start_time, is_home_pickup: this.props.selectedAppointmentType == 'home' , address: this.props.selectedAddress
        }

        this.props.createLABAppointment(postData, (err, data) => {
            if (!err) {
                this.setState({
                    paymentData: data.payment_details.pgdata
                }, () => {
                    setTimeout(() => {
                        let form = document.getElementById('paymentForm')
                        form.submit()
                        this.setState({ loading: false })
                    }, 500)
                })
            } else {
                this.setState({ loading: false, error: "Could not create appointment. Try again later !" })
            }
        })
    }


    render() {

        let tests = []
        let finalPrice = 0
        let labDetail = {}

        let patient = null
        if (this.props.selectedProfile) {
            patient = this.props.profiles[this.props.selectedProfile]
        }


        if (this.props.LABS[this.state.selectedLab]) {
            labDetail = this.props.LABS[this.state.selectedLab].lab
            tests = this.props.selectedCriterias.filter(x => x.type == 'test').map((test, i) => {
                let price = 0
                this.props.LABS[this.state.selectedLab].tests.map((twp) => {
                    if (twp.test_id == test.id) {
                        price = twp.mrp
                    }
                })
                finalPrice += price
                return <p key={i} className="test-list">{test.name}<span className="float-right fw-700">Rs. {price}</span></p>
            })
        }

        return (
            <div>
                <header className="skin-white fixed horizontal top bdr-1 bottom light">
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
                    this.props.LABS[this.state.selectedLab] ?
                        <div>
                            <section className="wrap booking-confirm-screen">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="widget mrt-10">

                                                <div className="widget-content">


                                                    <div className="lab-details">
                                                        <img src="/assets/img/customer-icons/lab1.png" className="img-fluid" />
                                                        <div className="lab-title">
                                                            <h4 className="fw-700 text-md title">{labDetail.name}</h4>
                                                            <p className="fw-500 text-sm text-light">{labDetail.address}</p>
                                                        </div>
                                                    </div>

                                                    <div className="lab-visit-time test-report">
                                                        <h4 className="title"><span><img src="/assets/img/customer-icons/test.svg" /></span>Appointment type </h4>
                                                        <ul className="inline-list booking-type">
                                                            <li><label className="radio-inline text-md fw-700 text-primary"><input type="radio" name="optradio" onChange={this.handlePickupType.bind(this)} value="home" checked={this.props.selectedAppointmentType == 'home'} /> Home Pick-up</label></li>
                                                            <li><label className="radio-inline text-md fw-700 text-primary"><input type="radio" name="optradio" onChange={this.handlePickupType.bind(this)} value="lab" checked={this.props.selectedAppointmentType == 'lab'} /> Lab Visit</label></li>
                                                        </ul>

                                                    </div>

                                                    <div className="lab-visit-time test-report">
                                                        <h4 className="title"><span><img src="/assets/img/customer-icons/test.svg" /></span>Tests <span className="float-right"><a onClick={this.openTests.bind(this)} className="text-primary fw-700 text-sm">Change Tests</a></span></h4>
                                                        {tests}
                                                    </div>

                                                    {this.getSelectors()}

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span className="errorMessage">{this.state.error}</span>
                            </section>

                            <PaymentForm paymentData={this.state.paymentData} />

                            <button disabled={
                                (!(patient && this.props.selectedSlot && this.props.selectedSlot.date && this.props.selectedProfile && (this.props.selectedAddress || this.props.selectedAppointmentType == 'lab')) || this.state.loading)
                            } onClick={this.proceed.bind(this)} className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg">Proceed to Pay Rs. {finalPrice}</button>

                        </div> : <Loader />
                }

            </div>
        );
    }
}


export default BookingSummaryView
