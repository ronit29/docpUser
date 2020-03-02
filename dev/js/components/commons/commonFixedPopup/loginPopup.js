import React from 'react'
const queryString = require('query-string');
import GTM from '../../../helpers/gtm.js'
import SnackBar from 'node-snackbar'
import CommonLoginPopup from './commonFixedPopup.js'


/*To Reuse the component make sure to pass these methods from parent component
1) ===> afterUserLogin(this method is called after user logged in successfully)
2) This is pure component so please dont't do this (...this.props) , only props you need in the component use only those.
3) historyObj= {this.props.history}, locationObj = {this.props.location}
4) ===>closePopup (method to close popup)
*/
class LoginPopup extends React.Component {
    _mounted = false
    
    constructor(props) {
        super(props)
        this.state = {
            phoneNumber: '',
            validationError: '',
            showOTP: false,
            otp: "",
            otpTimeout: false,
            error_message: '',
            smsBtnType: null,
            enableOtpRequest: false
        }
    }

    componentDidMount(){
        this._mounted = true
    }

    componentWillUnmount(){
        this._mounted = false  
    }
    inputHandler(e) {
        if (this.state.showOTP && e.target.name == 'phoneNumber') {
            this.setState({ [e.target.name]: e.target.value, validationError: "", showOTP: false, otp: "", error_message: '' })
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    submitOTPRequest(number, resendFlag = false, viaSms, viaWhatsapp, fromPopup = null) {

        let lead_data = queryString.parse(this.props.locationObj.search)
        if (number.match(/^[56789]{1}[0-9]{9}$/)) {

            this.setState({ validationError: "" })
            
            this.props.sendOTP(number, viaSms, viaWhatsapp, 'insurance-login', (error) => {
                if (error) {
                     this.setState({ validationError: "Could not generate OTP." })
                } else {
                    
                    let data = {
                        'Category': 'ConsumerApp', 'Action': 'LoginPopupContinue', 'CustomerID': GTM.getUserId() || '', 'event': 'login-popup-continue-click', 'mode': viaSms ? 'viaSms' : viaWhatsapp ? 'viaWhatsapp' : '', 'mobileNo': this.state.phoneNumber
                    }
                    GTM.sendEvent({ data: data })
                    if (viaWhatsapp) {
                        this.setState({ enableOtpRequest: true })
                    } else {
                        this.setState({ enableOtpRequest: false })
                    }
                    this.setState({ showOTP: true, otpTimeout: true, smsBtnType: viaSms ? true : false })
                    setTimeout(() => {
                        if(this._mounted){
                            this.setState({ otpTimeout: false })
                        }
                    }, 20000)
                    setTimeout(() => {
                        if(this._mounted){
                            this.setState({ enableOtpRequest: false })   
                        }
                    }, 60000)

                    if (fromPopup && document.getElementsByClassName('ins-form-slider')) {
                        if (fromPopup == 'one') {
                            document.getElementsByClassName('ins-form-slider')[0].scroll({ left: 999, behavior: 'smooth' })
                        } else {
                            document.getElementsByClassName('ins-form-slider')[0].scroll({ left: -999, behavior: 'smooth' })
                        }
                    }
                }
            })
        } else {
            this.setState({ validationError: "Please provide a valid number (10 digits)" })
        }
    }

    verifyOTP() {
        let parsed = queryString.parse(this.props.locationObj.search)
        let self = this
        if (!this.state.otp) {
            this.setState({ validationError: "Please enter OTP", error_message: '' })
            return
        }
        if (this.state.otp.length < 6 || this.state.otp.length > 6) {
            this.setState({ validationError: "Please enter valid OTP", error_message: '' })
            return
        }

        let lead_data = parsed
        if (this.state.phoneNumber.match(/^[56789]{1}[0-9]{9}$/)) {
            this.setState({ validationError: "" })
            let extraParams = {}
            this.props.submitOTP(this.state.phoneNumber, this.state.otp, extraParams, (exists) => {
                if (exists.code == 'invalid') {
                    this.setState({ error_message: exists.message, validationError: '' })
                } else {
                    this.props.getUserProfile().then((resp)=>{
                        this.props.afterUserLogin();
                        setTimeout(() => {
                            SnackBar.show({ pos: 'bottom-center', text: "Login Successfully" })
                        }, 500)
                    });
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
            if (!this.state.showOTP) {
                this.submitOTPRequest(this.state.phoneNumber, '', true, false, 'one')
            }
        }
    }

    editNumber() {
        let number = this.state.phoneNumber

        document.getElementsByClassName('ins-form-slider')[0].scroll({ left: -999, behavior: 'smooth' })

        setTimeout(() => {
            this.setState({ validationError: "", showOTP: false, otp: "", phoneNumber: '' }, () => {
                this.setState({ phoneNumber: number })
                document.getElementById("number").focus()
            })
        }, 200)
    }

    render() {

            return (
                    <React.Fragment>
                        <div className="ins-form-slider mobile-verification-screen">
                            <div className="one">
                                <div className="widget-header text-center mv-header" style={{position:'relative'}}>
                                    <h4 className="fw-500 text-md sign-up-mbl-text">Enter your mobile number to proceed</h4>
                                    <a onClick={this.props.closePopup} style={{position:'absolute', right:4, top:4}}>
                                        <img src={ASSETS_BASE_URL + "/img/customer-icons/rt-close.svg"} style={{ width: 14 }} />
                                    </a>
                                </div>
                                <div className="widget-content text-center pt-0 pb-0">
                                    <div className="form-group mobile-field sup-input-pdng">
                                        <div className="adon-group enter-mobile-number">
                                            <input type="number" id="number" className="fc-input text-center" placeholder="Enter your mobile number" value={this.state.phoneNumber} onChange={this.inputHandler.bind(this)} name="phoneNumber" onKeyPress={this._handleContinuePress.bind(this)} disabled={this.state.showOTP ? true : false} />
                                        </div>
                                    </div>
                                    <span className="errorMessage m-0 mb-2">{this.state.error_message}</span>
                                    <span className="errorMessage m-0 mb-2">{this.state.validationError}</span>

                                    <div className="text-center">
                                        <button onClick={this.submitOTPRequest.bind(this, this.state.phoneNumber, false, true, false, 'one')} className="v-btn v-btn-primary btn-sm lg-sms-btn btn-grdnt">Let’s get you in
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="two">
                                <div className="widget-header text-center mv-header">
                                    <h4 className="fw-500 text-md sign-up-mbl-text">Enter the OTP we’ve sent to your mobile number</h4>
                                </div>
                                <div className="widget-content text-center pt-0 pb-0">
                                    <div className="form-group mobile-field sup-input-pdng">
                                        <div className="adon-group enter-mobile-number">
                                            <input type="number" id="number" className="fc-input text-center" placeholder="10 digit mobile number" value={this.state.phoneNumber} onChange={this.inputHandler.bind(this)} name="phoneNumber" onKeyPress={this._handleContinuePress.bind(this)} disabled={this.state.showOTP ? true : false} />
                                            <a className="ins-num-edit" onClick={this.editNumber.bind(this)}>Edit</a>
                                        </div>
                                        {
                                            this.state.showOTP ?
                                                <div className="adon-group enter-mobile-number">
                                                    <br /><br />
                                                    <input type="number" className="fc-input text-center" placeholder="Enter OTP" value={this.state.otp} onChange={this.inputHandler.bind(this)} name="otp" onKeyPress={this._handleKeyPress.bind(this)} />
                                                    {
                                                        this.state.otpTimeout ? "" :
                                                            <div className="d-flex align-items-start justify-content-between">
                                                                <a className="resendOtp" style={{ fontSize: '12px' }} onClick={this.submitOTPRequest.bind(this, this.state.phoneNumber, true, this.state.smsBtnType ? false : true, !this.state.smsBtnType ? false : true, 'one')}>{this.state.smsBtnType ? 'Prefer we WhatsApp it to you?' : 'Send via SMS'}
                                                                </a>
                                                                {this.state.enableOtpRequest ? '' :
                                                                    <a className="resendOtp ins-otp-resend" onClick={this.submitOTPRequest.bind(this, this.state.phoneNumber, true, this.state.smsBtnType ? true : false, !this.state.smsBtnType ? true : false, 'one')}>Resend
                                                                </a>}
                                                            </div>
                                                    }
                                                </div>
                                                : ""
                                        }
                                    </div>
                                    <span className="errorMessage m-0 mb-2">{this.state.error_message}</span>
                                    <span className="errorMessage m-0 mb-2">{this.state.validationError}</span>
                                    {
                                        this.state.showOTP ?
                                            <div className="text-center">
                                                <button onClick={this.verifyOTP.bind(this)} disabled={this.props.submit_otp} className="btn-grdnt v-btn v-btn-primary btn-sm">
                                                    Access Now
                                            </button>
                                            </div>
                                            : <div className="text-center">
                                                <button onClick={this.submitOTPRequest.bind(this, this.state.phoneNumber, false, true, false)} disabled={this.props.otp_request_sent} className="v-btn v-btn-primary btn-sm lg-sms-btn btn-grdnt">Let’s get you in
                                                </button>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <p className="text-center fw-500 p-3" style={{ fontSize: 12 }} >By proceeding, you hereby agree to the <a href="/terms" target="_blank" style={{ color: `var(--text--primary--color)` }} >End User Agreement</a> and <a href="/privacy" target="_blank" style={{ color: `var(--text--primary--color)` }} >Privacy Policy.</a></p>
                    </React.Fragment>
                )
    }
}
export default LoginPopup