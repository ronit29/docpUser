import React from 'react';


class RightBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="col-lg-3 right-section d-none d-lg-block">
                <div className="sticky-div sticky-div-temp">
                    <a href="javascript:;">
                        <div className="right-div-widget">
                            <div className="appointment-head-div">
                                <img src="/assets/img/customer-icons/appointment.svg" className="appointment-img" />
                                <span className="appointment-head">Upcoming Appointment</span>
                            </div>
                            <div className="appointment-details-div">
                                <p>Appoinment for Arun Kumar</p>
                                <p className="appointment-date">On 29th April 2017</p>
                                <p className="appointment-doc">With Dr. Angela Smith</p>
                            </div>
                        </div>
                    </a>
                    <div className="right-div-widget health-widget">
                        <div className="appointment-head-div">
                            <img src="/assets/img/customer-icons/health-tip.jpg" />
                            <span className="appointment-head">Health Tip for the Day</span>
                        </div>
                        <div className="tip-desc-div">
                            <p className="tip-desc">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                        </div>
                    </div>
                    <a href="javascript:;">
                        <div className="right-div-widget health-widget">
                            <div className="appointment-head-div">
                                <span className="appointment-head">Continue Booking</span>
                            </div>
                            <div className="booking-details-div">
                                <div className="doc-img-div">
                                    <img src="/assets/img/customer-icons/doc-profile.jpg" className="doc-img" />
                                </div>
                                <div className="doc-img-div">
                                    <p className="doc-name">Dr. Angela Williams</p>
                                    <p className="hospital-name">Apollo Hospital</p>
                                    <p className="booking-time">18th April | 3:30 PM</p>
                                </div>
                            </div>
                            <div className="continue-div">
                                <span className="continue-text">Continue</span>
                                <img src="/assets/img/customer-icons/right-arrow.svg" className="rt-arrow-icon" />
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

export default RightBar
