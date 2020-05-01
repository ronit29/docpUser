import React from 'react'
const queryString = require('query-string');
import GTM from '../../helpers/gtm.js'
import SnackBar from 'node-snackbar'

class VipLoginPopup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profile_id: '',
            newprofile: {},
            phoneNumber: this.props.user_loggedIn_number?this.props.user_loggedIn_number:'',
            validationError: '',
            showOTP: false,
            otp: "",
            otpTimeout: false,
            error_message: '',
            isLeadTrue: false,
            smsBtnType: null,
            selectedProfileAge: '',
            age: '',
            enableOtpRequest: false,
            user_name: '',
            search_city: '',
            filtered_city_list: [],
            showCitySearchPopup: false,
            selectedCity: ''
        }
    }
    inputHandler(e) {
        if (this.state.showOTP && e.target.name == 'phoneNumber') {
            this.setState({ [e.target.name]: e.target.value, validationError: "", showOTP: false, otp: "", error_message: '' })
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    submitOTPRequest(number, resendFlag = false, viaSms, viaWhatsapp, fromPopup = null) {  // to generate otp
        let lead_data = queryString.parse(this.props.location.search)
        if (number.match(/^[56789]{1}[0-9]{9}$/)) {

            this.setState({ validationError: "" })
            
            this.props.sendOTP(number, viaSms, viaWhatsapp, 'insurance-login', (error) => { // to generate otp
                if (error) {
                    // this.setState({ validationError: "Could not generate OTP." })
                } else {
                    if (viaWhatsapp) {
                        this.setState({ enableOtpRequest: true })
                    } else {
                        this.setState({ enableOtpRequest: false })
                    }
                    this.setState({ showOTP: true, otpTimeout: true, smsBtnType: viaSms ? true : false })
                    setTimeout(() => {
                        this.setState({ otpTimeout: false })
                    }, 20000)
                    setTimeout(() => {
                        this.setState({ enableOtpRequest: false })
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

    verifyOTP() {  // to verify entered otp
        let parsed = queryString.parse(this.props.location.search)
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
            let extraParamsData = {}
            this.props.submitOTP(this.state.phoneNumber, this.state.otp, extraParamsData, (exists) => {
                if (exists.code == 'invalid') {
                    this.setState({ error_message: exists.message, validationError: '' })
                } else {
                    if (exists.token) {
                        let url = '/covid-form'
                        if (exists.user_exists) {
                            this.props.getUserProfile()
                            this.props.closeLeadPopup() // to close lead popup
                            this.props.history.push(url)
                        } else {
                            this.props.closeLeadPopup()
                            this.props.history.push(url)
                        }
                    }
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
                this.submitOTPRequest(this.state.phoneNumber, '', true, false, 'one') // to generate otp request
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
                <div className="col-12 col-md-7  center-column">
                    <div className={`cancel-overlay cancel-overlay-zindex`} onClick={this.props.closeLeadPopup.bind(this)}>
                    </div>
                    <section className="mobile-verification-screen p-3">
                        <div className={`widget no-shadow no-round sign-up-container widget cancel-appointment-div cancel-popup`}>
                            <span className="float-right" style={{ cursor: 'pointer' }} onClick={this.props.closeLeadPopup.bind(this)}><img src={ASSETS_BASE_URL + "/img/customer-icons/rt-close.svg"} style={{ width: 14 }} /></span>
                            <div className="ins-form-slider">
                                <div className="one">
                                    <div className="widget-header text-center mv-header ">
                                        <h4 className="fw-500 text-md sign-up-mbl-text">Enter your registered mobile number to login</h4>
                                    </div>
                                    <div className="widget-content text-center">
                                        <div className="form-group mobile-field sup-input-pdng">
                                            <div className="adon-group enter-mobile-number">
                                                <input type="number" id="number" className="fc-input text-center" placeholder="Enter your mobile number" value={this.state.phoneNumber} onChange={this.inputHandler.bind(this)} name="phoneNumber" onKeyPress={this._handleContinuePress.bind(this)} disabled={this.state.showOTP ? true : false} />
                                            </div>
                                        </div>
                                        <span className="errorMessage m-0 mb-2">{this.state.error_message}</span>
                                        <span className="errorMessage m-0 mb-2">{this.state.validationError}</span>

                                        <div className="text-center">
                                            <button onClick={this.submitOTPRequest.bind(this, this.state.phoneNumber, false, true, false, 'one')} disabled={this.props.otp_request_sent} className="v-btn v-btn-primary btn-sm lg-sms-btn btn-grdnt">Let’s get you in
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="two">
                                    <div className="widget-header text-center mv-header">
                                        <h4 className="fw-500 text-md sign-up-mbl-text">Enter the OTP we’ve sent to your mobile number</h4>
                                    </div>
                                    <div className="widget-content text-center">
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
                        </div>
                    </section>
                </div>)
        
    }
}
export default VipLoginPopup