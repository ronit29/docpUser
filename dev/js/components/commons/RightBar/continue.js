import React from 'react';

export default () => {
    return <a href="javascript:;">
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
}