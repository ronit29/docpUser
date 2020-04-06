import React from 'react'
const queryString = require('query-string');
import GTM from '../../../helpers/gtm.js'

class CareLoginPopup extends React.Component{
	constructor(props) {
        super(props)
        this.state = {
            phoneNumber: '',
            validationError: '',
            showOTP: false,
            otp: "",
            otpTimeout: false,
            error_message:'',
            smsBtnType: null
        }
    }
    inputHandler(e) {
        if (this.state.showOTP && e.target.name == 'phoneNumber') {
            this.setState({ [e.target.name]: e.target.value, validationError: "", showOTP: false, otp: "" })
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    submitOTPRequest(number, resendFlag = false, viaSms, viaWhatsapp) {
        let parsed = queryString.parse(this.props.location.search)
        if (resendFlag) {
            let analyticData = {
                'Category': 'ConsumerApp', 'Action': 'ResendOtp', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'resend-otp', 'mobileNo': number, 'pageSource': parsed.login || '' , 'mode':viaSms?'viaSms':viaWhatsapp?'viaWhatsapp':''}
            GTM.sendEvent({ data: analyticData })
        } else {
            let analyticData = {
                'Category': 'ConsumerApp', 'Action': 'GetOtpRequest', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'get-otp-request', 'mobileNo': number, 'pageSource': parsed.login || '', 'mode':viaSms?'viaSms':viaWhatsapp?'viaWhatsapp':''
            }
            GTM.sendEvent({ data: analyticData })
        }
        if (number.match(/^[56789]{1}[0-9]{9}$/)) {
            this.setState({ validationError: "" })
            this.props.sendOTP(number,viaSms,viaWhatsapp,'care-login', (error) => {
                if (error) {
                    // this.setState({ validationError: "Could not generate OTP." })
                } else {
                    this.setState({ showOTP: true, otpTimeout: true, smsBtnType: viaSms ? true : false })
                    setTimeout(() => {
                        this.setState({ otpTimeout: false })
                    }, 20000)
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
            let extraParams = {}
            this.props.submitOTP(this.state.phoneNumber, this.state.otp, extraParams, (exists) => {
                if(exists.code == 'invalid'){
                    this.setState({error_message:exists.message})
                }else{
                    this.props.getIsCareDetails((resp)=>{ // get user subscription plan details
                        if(resp && resp.has_active_plan){
                            this.props.history.push('/prime/success?user_plan='+resp.user_plan_id) 
                        }else{
                            let url = '/prime/booking?plan_id='+this.props.selectedPlanId
                            this.props.history.push(url)        
                        }
                    })                    
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
                                                this.state.otpTimeout ? "" : 
                                                <div className="d-flex align-items-start justify-content-between">
                                                    <a className="resendOtp" onClick={this.submitOTPRequest.bind(this, this.state.phoneNumber, true, this.state.smsBtnType ? false : true, !this.state.smsBtnType ? false : true)}>{this.state.smsBtnType ?'Send via Whatsapp':'Send via SMS'}
                                                    </a>
                                                    <a className="resendOtp" style={{color:'#ec0d0d'}} onClick={this.submitOTPRequest.bind(this, this.state.phoneNumber, true, this.state.smsBtnType ? true : false, !this.state.smsBtnType ? true : false)}>Resend
                                                    </a>
                                                </div>
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
                                        <React.Fragment>
                                            <div className="text-center">
                                                <button onClick={this.submitOTPRequest.bind(this, this.state.phoneNumber, false, true, false)} disabled={this.props.otp_request_sent} className="v-btn v-btn-primary btn-sm lg-sms-btn">
                                                    <img className="sms-ico" src={ASSETS_BASE_URL + '/img/smsicon.svg'} />Verify Via SMS
                                                </button>
                                            </div>
                                            {/* <div className="text-center">
                                                <button onClick={this.submitOTPRequest.bind(this, this.state.phoneNumber, false, false, true)} disabled={this.props.otp_request_sent} className="v-btn v-btn-primary btn-sm lg-wtsp-btn">
                                                    <img className="whtsp-ico" src={ASSETS_BASE_URL + '/img/wa-logo-gr.svg'} />Verify Via Whatsapp
                                                </button>
                                            </div> */}
                                        </React.Fragment>
                                }
                            </div>

                            <p className="text-center fw-500 p-3" style={{ fontSize: 12, color: '#8a8a8a' }} >By proceeding, you hereby agree to the <a href="/terms" target="_blank" style={{ color: `var(--text--primary--color)` }} >End User Agreement</a> and <a href="/privacy" target="_blank" style={{ color: `var(--text--primary--color)` }} >Privacy Policy.</a></p>
                        </div>
                    </section>
            </div> )
    }
}
export default CareLoginPopup