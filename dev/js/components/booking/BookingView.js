import React from 'react';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';

import CalIcon from 'material-ui-icons/Call';


class BookingView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="booking">
                <Stepper activeStep={0} alternativeLabel>
                    <Step key={0}>
                        <StepLabel>{"Appointment Requested"}</StepLabel>
                    </Step>
                    <Step key={1}>
                        <StepLabel>{"Appointment Confirmed"}</StepLabel>
                    </Step>
                    <Step key={2}>
                        <StepLabel>{"Appointment Complete"}</StepLabel>
                    </Step>
                </Stepper>
                <p className="requestLine">We have requested Dr.Smith to confirm your appointment</p>
                <div className="patientName">
                    <p>for</p>
                    <p>Brijesh Kumar</p>
                </div>

                <div className="details">
                    <div>
                        <span class="lbl">With</span>
                        <span class="cntnt">Dr. Steve Smith</span>
                    </div>
                    <div>
                        <span class="lbl">Where</span>
                        <span class="cntnt">Sarvodaya Clinic, # 361, Sector 50, Gurgaon</span>
                    </div>
                    <div>
                        <span class="lbl">When</span>
                        <span class="cntnt">Wednesday, June 27, 2018, 11:45AM</span>
                    </div>
                    <div>
                        <span class="lbl">Reference#</span>
                        <span class="cntnt">HUVHJB87HJBJH</span>
                    </div>
                </div>

                <button className="request">Request Re-Schedule/Cancel</button>

                <CalIcon className="callIcon"/>
            </div>
        );
    }
}


export default BookingView
