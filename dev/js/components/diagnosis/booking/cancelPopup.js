import React from 'react';

export default ({ toggle, cancelAppointment }) => {
    return <div>
        <div className="cancel-overlay" onClick={toggle}></div>
        <div className="widget cancel-appointment-div">
            <div className="widget-header text-center">
                <p className="fw-500 cancel-appointment-head">Cancel Appointment</p>
                <hr />
            </div>
            <a href="javascript:;">
                <div className="widget-content cancel-content-div" onClick={() => {
                    cancelAppointment(0)
                }}>
                    <p className="fw-500 cancel-appointment-head">Cancel and Rebook</p>
                    <p className="fw-500 cancel-content">Cancel the current appoinement and book a new Appointment with other doctor</p>
                    <div className="cancel-right-arrow">
                        <img src="/assets/img/customer-icons/arrow-forward-right.svg" />
                    </div>
                </div>
            </a>
            <hr />
            <a href="javascript:;">
                <div className="widget-content cancel-content-div" onClick={() => {
                    cancelAppointment(1)
                }}>
                    <p className="fw-500 cancel-appointment-head">Cancel and Refund</p>
                    <p className="fw-500 cancel-content">Cancel the appoiment and get refund within 24 hours</p>
                    <div className="cancel-right-arrow">
                        <img src="/assets/img/customer-icons/arrow-forward-right.svg" />
                    </div>
                </div>
            </a>
            <hr />
        </div>
    </div>
}