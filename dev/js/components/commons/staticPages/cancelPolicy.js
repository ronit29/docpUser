import React from 'react';
import HelmetTags from '../HelmetTags'

class CancelPolicy extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        let mainClass
        let headingClass
        if(this.props.fromApp){
            mainClass = "container about-container appUrlPadding"
            headingClass = "col-12 text-center d-none d-md-block"
        }else{
            mainClass = 'container about-container'
            headingClass = 'col-12 text-center'
        }
        return (
            <div className={mainClass}>
                <HelmetTags tagsData={{
                    title: ('Cancel Policy | docprime'),
                    description: ('docprime: docprime is one stop health care solution for patients and doctors. Patients can book doctors online and doctors can manage patients online.')
                }} />
                <div className="row">
                    <div className={headingClass}>
                        <p className="fw-500 about-heading">Cancel Policy</p>
                    </div>
                    <div className="col-12">
                        <div className="cancel-policy-text" style={{paddingTop: 0}}>
                            <ul style={{listStyle: 'disc', paddingLeft: 10}}>
                                <li className="fw-500 mrb-10">
                                    For any online paid appointments, you can cancel your scheduled or re-booked appointment and initiate immediate refund at any time. An immediate refund shall be subject to terms and conditions as described under this section mentioned below.
                                </li>
                                <li className="fw-500 mrb-10">
                                    In the event, the services are not availed at the appointed date and time and our systems do not validate the URN generated on your registered mobile number, we will automatically cancel your appointment at 12:00 midnight of next date of your appointment date.
                                </li>
                                <li className="fw-500 mrb-10">
                                    Occasionally, appointments may be cancelled or postponed by the Third Party Service Provider. Should this occur, we will attempt to contact or inform you and you may re-schedule your appointment as per your convenience or visit www.docprime.com for fresh/re-booking on the Website.
                                </li>
                                <li className="fw-500 mrb-10">
                                    Cancellation through mail or call center is allowed for all the bookings until the time of appointment or 12:00 midnight of next date of your appointment date. In such cases, we will initiate an immediate refund of your money as per the process defined under Refund, Rescheduling and Cancellation section under the End User Agreement. <u style={{color: `var(--text--primary--color)`,cursor:'pointer',display:'inline-block'}} onClick={() =>this.props.history.push(this.props.fromApp?'/terms?forBookingScroll=true&fromApp=true':'/terms?forBookingScroll=true')}>click here</u>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default CancelPolicy
