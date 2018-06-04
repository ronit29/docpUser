import React from 'react';

class BookingView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

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
                                    <li><span className="icon icon-md text-middle notification-icon"><img src="/assets/img/customer-icons/notification.svg" className="img-fluid" /> <span className="notification-alert" /></span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>

                <section className="wrap ">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="app-timeline book-confirmed-timeline">
                                    <ul className="inline-list">
                                        <li>
                                            <span className="dot">1</span>
                                            <p className="text-sm fw-700 text-light">Appoinment Received</p>
                                        </li>
                                        <li>
                                            <span className="dot">2</span>
                                            <p className="text-sm fw-700 text-light">Appoinment Confirmed</p>
                                        </li>
                                        <li className="active">
                                            <span className="dot">3</span>
                                            <p className="text-sm fw-700 text-light">Appoinment Complete</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="widget mrb-10">
                                    <div className="widget-content">
                                        <p className="fw-500 text-md mrb-10">Unique Confirmation Code: <span className="fw-700 text-md">5453</span></p>
                                        <p className="text-xs text-light">Share this code with doctor at the time of your appointment</p>
                                    </div>
                                </div>
                                <div className="widget mrb-10">
                                    <div className="widget-content">
                                        <p className="fw-500 text-md mrb-10">Booking ID: <span className="fw-700 text-md">1234BSDFD</span></p>
                                        <p className="text-xs text-light">Details has been send to your email and mobile number</p>
                                    </div>
                                </div>
                                <div className="widget  mrb-10">
                                    <div className="widget-content pb-details pb-location">
                                        <h4 className="wc-title text-md fw-700">Apollo Clinic</h4>
                                        <div className="address-details">
                                            <img src="/assets/img/customer-icons/map-icon.png" className="img-fluid add-map" />
                                            <p className="add-info fw-500">196, Huda Plot, Near, Devinder Vihar, Sector 56, Gurugram, Haryana 122011</p>
                                        </div>
                                    </div>
                                    <div className="widget-content pb-details pb-location">
                                        <h4 className="wc-title text-md fw-700">Apollo Clinic</h4>
                                        <div className="address-details">
                                            <img src="/assets/img/customer-icons/map-icon.png" className="img-fluid add-map" />
                                            <p className="add-info fw-500">196, Huda Plot, Near, Devinder Vihar, Sector 56, Gurugram, Haryana 122011</p>
                                        </div>
                                        <div className="pb-view text-left">
                                            <a href="#" className="link-text text-md fw-700">View in Google Map</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="widget mrb-10">
                                    <div className="widget-content">
                                        <div>
                                            <h4 className="title"><span><img src="/assets/img/customer-icons/clock.svg" /></span>Clinic Visit Time <span className="float-right"><a href="#" className="text-primary fw-700 text-sm">Reschedule Time</a></span></h4>
                                            <p className="date-time test-list fw-500">18th April | 3:30 PM</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="widget mrt-10">
                                    <div className="widget-content">
                                        <div className="test-report">
                                            <h4 className="title"><span><img src="/assets/img/customer-icons/test.svg" /></span>Patient Details</h4>
                                            <p className="test-list fw-500">Rishabh Mehrotra,  Age 25</p>
                                            <p className="test-list fw-500">9560519761</p>
                                            <p className="test-list fw-500">rishabh@gmail.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}


export default BookingView
