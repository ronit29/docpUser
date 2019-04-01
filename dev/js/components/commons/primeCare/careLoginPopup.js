import React from 'react'
const queryString = require('query-string');

class CareLoginPopup extends React.Component{
	constructor(props) {
        super(props)
        this.state = {
            phoneNumber: '',
            validationError: '',
            showOTP: false,
            otp: "",
            otpTimeout: false,
            error_message:''
        }
    }
    inputHandler(e) {
        if (this.state.showOTP && e.target.name == 'phoneNumber') {
            this.setState({ [e.target.name]: e.target.value, validationError: "", showOTP: false, otp: "" })
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    submitOTPRequest(number) {
        if (number.match(/^[56789]{1}[0-9]{9}$/)) {
            this.setState({ validationError: "" })
            this.props.sendOTP(number, (error) => {
                if (error) {
                    // this.setState({ validationError: "Could not generate OTP." })
                } else {
                    this.setState({ showOTP: true, otpTimeout: true })
                    setTimeout(() => {
                        this.setState({ otpTimeout: false })
                    }, 10000)
                }
            })
        } else {
            this.setState({ validationError: "Please provide a valid number (10 digits)" })
        }
    }

    verifyOTP() {
        let self = this
        if (!this.state.otp) {
            this.setState({ validationError: "Please enter OTP" })
            return
        }
        if (this.state.phoneNumber.match(/^[56789]{1}[0-9]{9}$/)) {
            this.setState({ validationError: "" })
            this.props.submitOTP(this.state.phoneNumber, this.state.otp, (exists) => {
                if(exists.code == 'invalid'){
                    this.setState({error_message:exists.message})
                }else{
                    let url = '/prime/booking?plan_id='+this.props.selectedPlanId
                    this.props.history.push(url)
                }    
                   
            })
        } else {
            this.setState({ validationError: "Please provide a valid number (10 digits)" })
        }
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.verifyOTP()
        }
    }

    _handleContinuePress(e) {
        if (e.key === 'Enter') {
            if(!this.state.showOTP){
                this.submitOTPRequest(this.state.phoneNumber)
            }
        }
    }
	render(){
            return (
            <div className="col-12 col-md-7  center-column">
                    <div className="cancel-overlay" onClick={this.props.hideLoginPopup.bind(this)}>
                    </div>
                    <section className="mobile-verification-screen p-3">
                        <div className="widget no-shadow no-round sign-up-container widget cancel-appointment-div cancel-popup">
                            <span className="float-right" style={{cursor: 'pointer', marginRight: '10px'}} onClick={this.props.hideLoginPopup.bind(this)}><img src={ASSETS_BASE_URL + "/img/customer-icons/rt-close.svg"} style={{ width: 14 }} /></span>                    
                            <div className="widget-header text-center mv-header">
                                {/*<h3 className="sign-coupon fw-700">Please login to continue</h3>*/}
                                <h4 className="fw-500 text-md sign-up-mbl-text">Enter your Mobile Number</h4>
                            </div>
                            <div className="widget-content text-center">
                                <div className="mobile-verification">
                                    <div className="verifi-mob-iocn text-center">
                                        <img src={ASSETS_BASE_URL + "/img/customer-icons/mob.svg"} className="img-fluid" />
                                    </div>
                                </div>
                                <div className="form-group mobile-field sup-input-pdng">
                                    <div className="adon-group enter-mobile-number">
                                        <input type="number" className="fc-input text-center" placeholder="10 digit mobile number" value={this.state.phoneNumber} onChange={this.inputHandler.bind(this)} name="phoneNumber" onKeyPress={this._handleContinuePress.bind(this)}/>
                                    </div>

                                    {
                                        this.state.showOTP ? <div className="adon-group enter-mobile-number">
                                            <br /><br />
                                            <input type="number" className="fc-input text-center" placeholder="Enter OTP" value={this.state.otp} onChange={this.inputHandler.bind(this)} name="otp" onKeyPress={this._handleKeyPress.bind(this)}/>
                                            {
                                                this.state.otpTimeout ? "" : <a className="resendOtp" onClick={this.submitOTPRequest.bind(this, this.state.phoneNumber)}>Resend ?</a>
                                            }
                                        </div> : ""
                                    }
                                </div>
                                <span className="errorMessage m-0 mb-2">{this.state.error_message}</span>
                                <span className="errorMessage m-0 mb-2">{this.state.validationError}</span>
                                {
                                    this.state.showOTP ?
                                        <div className="text-center">
                                            <button onClick={this.verifyOTP.bind(this)} disabled={this.props.submit_otp} className="v-btn v-btn-primary btn-sm">
                                                Verify
                                        </button>
                                        </div> :
                                        <div className="text-center">
                                            <button onClick={this.submitOTPRequest.bind(this, this.state.phoneNumber)} disabled={this.props.otp_request_sent} className="v-btn v-btn-primary btn-sm">
                                                Continue
                                        </button>
                                        </div>
                                }
                            </div>

                            <p className="text-center fw-500 p-3" style={{ fontSize: 12, color: '#8a8a8a' }} >By proceeding, you hereby agree to the <a href="/terms" target="_blank" style={{ color: '#f78631' }} >End User Agreement</a> and <a href="/privacy" target="_blank" style={{ color: '#f78631' }} >Privacy Policy.</a></p>
                        </div>
                    </section>
            </div> )
    }
}
export default CareLoginPopup