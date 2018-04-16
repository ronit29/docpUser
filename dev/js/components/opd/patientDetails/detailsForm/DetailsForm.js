import React from 'react';
import { connect } from 'react-redux';

class DetailsForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            patientName : '',
            patientEmail : '',
            patientGender : 'male',
            patientMobile : '',
            otp :''
        }
    }

    inputHandler(which, e){
        this.setState({ [which] : e.target.value })
    }

    render() {

        return (
            <div className="detailsForm">
                <h5>Please provide patient details</h5>

                <input value={this.state.patientName} onChange={this.inputHandler.bind(this,'patientName')} className="ptname" placeholder="Patient Name*" />
                <input value={this.state.patientEmail} onChange={this.inputHandler.bind(this,'patientEmail')} className="ptemail" placeholder="Email*" />
                <div className="ptgender">
                    <span>Gender :</span> 
                    <input type="radio" name="gender" value="male" checked={this.state.patientGender === "male"} onChange={this.inputHandler.bind(this,'patientGender')}/> Male
                    <input type="radio" name="gender" value="female" checked={this.state.patientGender === "female"} onChange={this.inputHandler.bind(this,'patientGender')}/> Female
                </div>
                <input value={this.state.patientMobile} onChange={this.inputHandler.bind(this,'patientMobile')} className="ptmobile" placeholder="Mobile*" />
                <button className="otpbtn">(Re)Send OTP</button>
                <input value={this.state.otp} onChange={this.inputHandler.bind(this,'otp')} className="ptotp" placeholder="Enter OTP*" />

            </div>
        );
    }
}


export default DetailsForm
