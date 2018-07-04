import React from 'react';

export default () => {
    return <a href="javascript:;">
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
}