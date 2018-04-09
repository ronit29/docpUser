import React from 'react';
import { connect } from 'react-redux';

class DetailsForm extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="detailsForm">
                <h5>Please provide patient details</h5>

                <input className="ptname" placeholder="Patient Name*" />
                <input className="ptemail" placeholder="Email*" />
                <div className="ptgender">
                    <span>Gender :</span> 
                    <input type="radio" name="gender" value="male" checked /> Male
                    <input type="radio" name="gender" value="female" /> Female
                </div>
                <input className="ptmobile" placeholder="Mobile*" />
                <button className="otpbtn">(Re)Send OTP</button>
                <input className="ptotp" placeholder="Enter OTP*" />

            </div>
        );
    }
}


export default DetailsForm
