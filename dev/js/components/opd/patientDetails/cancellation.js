import React from 'react';

export default ({ toggle,props, is_insurance_applicable }) => {
    return <div>
        <div className="cancel-overlay cancel-overlay-zindex" onClick={toggle}></div>
        <div className="widget cancel-appointment-div cancel-popup">
            <div className="widget-header text-center action-screen-header">
                <p className="fw-500 cancel-appointment-head">Cancellation Policy</p>
                <img src={ASSETS_BASE_URL + "/img/icons/close.png"} className="close-modal" onClick={toggle} />
                <hr />
            </div>
            <div className="cancel-policy-text cancelPolicyHeight" style={{paddingTop: 0}}>
                <ul className="booking-cancel">
                    {/*<li className="fw-500 mrb-10">
                        For any online paid appointments, you can cancel your scheduled or re-booked appointment and initiate immediate refund at any time. An immediate refund shall be subject to terms and conditions as described under this section mentioned below.
                    </li>
                    <li className="fw-500 mrb-10">
                        In the event, the services are not availed at the appointed date and time and our systems do not validate the URN generated on your registered mobile number, we will automatically cancel your appointment at 12:00 midnight of next date of your appointment date.
                    </li>
                    <li className="fw-500 mrb-10">
                        Occasionally, appointments may be cancelled or postponed by the Third Party Service Provider. Should this occur, we will attempt to contact or inform you and you may re-schedule your appointment as per your convenience or visit www.docprime.com for fresh/re-booking on the Website.
                    </li>
                    <li className="fw-500 mrb-10">
                        Cancellation through mail or call center is allowed for all the bookings until the time of appointment or 12:00 midnight of next date of your appointment date. In such cases, we will initiate an immediate refund of your money as per the process defined under Refund, Rescheduling and Cancellation section under the End User Agreement. <u style={{color: '#f78631',cursor:'pointer',display:'inline-block'}} onClick={() =>props.history.push('/terms?forBookingScroll=true')}>click here</u>
                    </li>*/}
                    {
                        is_insurance_applicable?
                            <React.Fragment>
                                <li>
                                    <strong>For Online Paid Appointments -</strong> You can cancel your scheduled appointment at any time.
                                </li>
                                <li>
                                    <strong>In Case of A No Show (Patient Unavailable) -</strong> In the event, the services are not availed at the appointed date and time. We will automatically cancel your appointment at 12:00 midnight of the date followed by the appointment date.
                                </li>
                                <li>
                                    <strong>Third Party Cancellation (Provider Unavailable) -</strong> Occasionally, appointments may be canceled or postponed due to unavailability of the service provider. Should this occur, we will contact or inform you and you may reschedule your appointment as per your convenience.
                                </li>
                            </React.Fragment>
                        :
                            <React.Fragment>
                                <li>
                                    <strong>For Online Paid Appointments -</strong> You can cancel your scheduled appointment and initiate the immediate refund at any time. Immediate refund shall be subject to terms and conditions as described under this section mentioned below.
                                </li>
                                <li>
                                    <strong>In Case of A No Show (Patient Unavailable) -</strong> In the event, the services are not availed at the appointed date and time. We will automatically cancel your appointment at 12:00 midnight of the date followed by the appointment date.
                                </li>
                                <li>
                                    <strong>Third Party Cancellation (Provider Unavailable) -</strong> Occasionally, appointments may be canceled or postponed due to unavailability of the service provider. Should this occur, we will contact or inform you and you may reschedule your appointment as per your convenience.
                                </li>
                                <li>
                                    <strong>24 Hours Cancellation -</strong> Cancellation is allowed for all the appointments. In such cases, we will initiate the immediate refund of your money as per the process defined under Refund, Rescheduling, and Cancellation section of the  <u style={{color: `var(--text--primary--color)` ,cursor:'pointer',display:'inline-block'}} onClick={() =>props.history.push('/terms?forBookingScroll=true')}>End User Agreement.</u>
                                </li>
                            </React.Fragment>
                    }
                </ul>
            </div>
        </div>
    </div>
}