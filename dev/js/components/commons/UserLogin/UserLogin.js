import React from 'react';
const queryString = require('query-string');

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import GTM from '../../../helpers/gtm.js'
import Disclaimer from '../../commons/Home/staticDisclaimer.js'

class UserLoginView extends React.Component {
    constructor(props) {
        super(props)

        const parsed = queryString.parse(this.props.location.search)

        this.state = {
            phoneNumber: '',
            validationError: '',
            showOTP: false,
            otp: "",
            otpTimeout: false,
            referralCode: parsed.referral || null,
            referralName: null,
            smsBtnType: null,
            enableOtpRequest: false
        }
    }

    componentDidMount() {
        this.props.resetAuth()
        if (this.state.referralCode) {
            this.props.fetchReferralCode(this.state.referralCode).then((res) => {
                if (res && res.status) {
                    this.setState({ referralName: res.name })
                }
            }).catch((e) => {

            })
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
        const parsed = queryString.parse(this.props.location.search)
        if (resendFlag) {
            let analyticData = {
                'Category': 'ConsumerApp', 'Action': 'ResendOtp', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'resend-otp', 'mobileNo': number, 'pageSource': parsed.login || '', 'mode': viaSms ? 'viaSms' : viaWhatsapp ? 'viaWhatsapp' : ''
            }
            GTM.sendEvent({ data: analyticData })
        } else {
            let analyticData = {
                'Category': 'ConsumerApp', 'Action': 'GetOtpRequest', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'get-otp-request', 'mobileNo': number, 'pageSource': parsed.login || '', 'mode': viaSms ? 'viaSms' : viaWhatsapp ? 'viaWhatsapp' : ''
            }
            GTM.sendEvent({ data: analyticData })
        }
        if (number.match(/^[56789]{1}[0-9]{9}$/)) {
            this.setState({ validationError: "" })
            this.props.sendOTP(number, viaSms, viaWhatsapp, 'user-login', (error) => {
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
                }
            })
        } else {
            this.setState({ validationError: "Please provide a valid number (10 digits)" })
        }
    }

    verifyOTP() {
        if (!this.state.otp) {
            this.setState({ validationError: "Please enter OTP" })
            return
        }
        if (this.state.phoneNumber.match(/^[56789]{1}[0-9]{9}$/)) {
            this.setState({ validationError: "" })
            let extraParamsData = {}
            this.props.submitOTP(this.state.phoneNumber, this.state.otp, extraParamsData, (exists) => {
                if (exists.token) {
                    const parsed = queryString.parse(this.props.location.search)
                    this.props.clearInsurance()
                    this.props.resetVipData()
                    if (exists.user_exists) {
                        if (parsed.login) {
                            let data = {
                                'Category': 'ConsumerApp', 'Action': 'LoginSuccess', 'pageSource': parsed.login, 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'login-success', 'mobileNo': this.state.phoneNumber
                            }
                            GTM.sendEvent({ data: data })
                        } else {
                            let data = {
                                'Category': 'ConsumerApp', 'Action': 'LoginSuccess', 'pageSource': 'UNKNOWN', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'login-success', 'mobileNo': this.state.phoneNumber
                            }
                            GTM.sendEvent({ data: data })
                        }

                        if (parsed.ref) {
                            this.props.history.push('/user')
                        } else if (parsed.callback) {
                            this.props.history.replace(parsed.callback)
                        } else if (this.state.referralName && this.state.referralCode) {
                            this.props.history.replace('/')
                        } else {
                            this.props.history.go(-1)
                        }
                    } else {
                        // gtm event

                        if (parsed.login) {
                            let data = {
                                'Category': 'ConsumerApp', 'Action': 'UserRegistered', 'pageSource': parsed.login, 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'user-registered', 'mobileNo': this.state.phoneNumber
                            }
                            GTM.sendEvent({ data: data })
                        } else {
                            let data = {
                                'Category': 'ConsumerApp', 'Action': 'UserRegistered', 'pageSource': 'UNKNOWN', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'user-registered', 'mobileNo': this.state.phoneNumber
                            }
                            GTM.sendEvent({ data: data })
                        }
                        let replace_url = '/signup?'
                        if (parsed.callback) {
                            replace_url += `callback=${parsed.callback}&`
                        }

                        if (this.state.referralName && this.state.referralCode) {
                            replace_url += `referral=${this.state.referralCode}`
                        }

                        this.props.history.replace(replace_url)
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
                this.submitOTPRequest(this.state.phoneNumber)
            }
        }
    }

    render() {

        return (
            <div className="profile-body-wrap lgn-ovrflow">
                <ProfileHeader />
                <section className="container parent-section book-appointment-section-login">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7  center-column">
                            <section className="mobile-verification-screen p-3">
                                <div className="widget no-shadow no-round sign-up-container">
                                    <div className="widget-header text-center mv-header">
                                        {
                                            this.state.referralName ? <h3 className="sign-coupon fw-700 mb-2 cpn-font-sz">Get  <span className="rft-price-size">&#8377;{this.props.refer_amount}</span> in your wallet</h3> : ""
                                        }
                                        {
                                            this.state.referralName ? <h3 className="sign-coupon fw-700">Signup to claim your cashback from<br /><span className="ft-25">{this.state.referralName}</span> </h3> : <h3 className="sign-coupon fw-700" style={{ fontSize: 16 }} >Signup &amp; get great offers on your doctor and lab appointments<br /></h3>
                                        }
                                        <h4 className="fw-500 text-md sign-up-mbl-text">Enter your Mobile Number to continue</h4>
                                    </div>
                                    <div className="widget-content text-center">
                                        <div className="mobile-verification">
                                            <div className="verifi-mob-iocn text-center">
                                                <img src={ASSETS_BASE_URL + "/img/customer-icons/mob.svg"} className="img-fluid" />
                                            </div>
                                        </div>
                                        <div className="form-group mobile-field sup-input-pdng">
                                            <div className="adon-group enter-mobile-number">
                                                <input type="number" className="fc-input text-center" placeholder="10 digit mobile number" value={this.state.phoneNumber} onChange={this.inputHandler.bind(this)} name="phoneNumber" onKeyPress={this._handleContinuePress.bind(this)} autoComplete="off" />
                                            </div>

                                            {
                                                this.state.showOTP ? <div className="adon-group enter-mobile-number">
                                                    <br /><br />
                                                    <input type="number" className="fc-input text-center" placeholder="Enter OTP" value={this.state.otp} onChange={this.inputHandler.bind(this)} name="otp" onKeyPress={this._handleKeyPress.bind(this)} />
                                                    {
                                                        this.state.otpTimeout ? "" :
                                                            <div className="d-flex align-items-start justify-content-between">
                                                                <a className="resendOtp" onClick={this.submitOTPRequest.bind(this, this.state.phoneNumber, true, this.state.smsBtnType ? false : true, !this.state.smsBtnType ? false : true)}>{this.state.smsBtnType ? 'Send via Whatsapp' : 'Send via SMS'}
                                                                </a>
                                                                {this.state.enableOtpRequest ? ''
                                                                    : <a className="resendOtp" style={{ color: '#ec0d0d' }} onClick={this.submitOTPRequest.bind(this, this.state.phoneNumber, true, this.state.smsBtnType ? true : false, !this.state.smsBtnType ? true : false)}>Resend
                                                            </a>}
                                                            </div>
                                                    }
                                                </div> : ""
                                            }
                                        </div>
                                        <span className="errorMessage m-0 mb-2">{this.props.error_message}</span>
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
                                    <div className="whtsappEnable-container p-0">
                                        {/* <p className="wtsapp-chk-txt"><img className="img-fluid" src={ASSETS_BASE_URL + '/img/customer-icons/tick.svg'} /> Enable Whatsapp for seamless communication</p>*/}
                                        <p className="text-center fw-500 p-3 pt-0" style={{ fontSize: 9, color: '#8a8a8a' }} >By proceeding, you hereby agree to the <a href="/terms" target="_blank" style={{ color: `var(--text--primary--color)` }} >End User Agreement</a> and <a href="/privacy" target="_blank" style={{ color: `var(--text--primary--color)` }} >Privacy Policy.</a></p>
                                    </div>
                                </div>
                                {/* <div className="widget mt-21 sign-up-container mrng-btm-scrl">
                                    <div className="sgn-up-instructions">
                                        <div className="sighnup-scnd-heading">
                                            <p><b>docprime</b> is your <span>Free Family Doctor For Life</span> </p>

                                        </div>
                                        <ul className="sign-up-lisitng">
                                            <li>
                                                <img src={ASSETS_BASE_URL + "/img/customer-icons/su-chat.svg"} className="img-fluid" />
                                                <p>Chat instantly, anytime, anywhere with qualified doctors for free</p>
                                            </li>
                                            <li>
                                                <img src={ASSETS_BASE_URL + "/img/customer-icons/su-offr.png"} className="img-fluid" />
                                                <p>Get upto 50% off on doctor appointments and lab tests</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div> */}
                            </section>

                        </div>

                        <RightBar noChatButton={true} />
                    </div>
                </section>
                <Disclaimer />
            </div>
        );
    }
}

export default UserLoginView
