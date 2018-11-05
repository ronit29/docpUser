import React from 'react';
const queryString = require('query-string');

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import GTM from '../../../helpers/gtm.js'

class UserLoginView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            phoneNumber: '',
            validationError: '',
            showOTP: false,
            otp: "",
            otpTimeout: false
        }
    }

    componentDidMount() {
        this.props.resetAuth()
    }

    inputHandler(e) {
        if (this.state.showOTP && e.target.name == 'phoneNumber') {
            this.setState({ [e.target.name]: e.target.value, validationError: "", showOTP: false, otp: "" })
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    submitOTPRequest(number) {

        if (number.match(/^[789]{1}[0-9]{9}$/)) {
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
        if (!this.state.otp) {
            this.setState({ validationError: "Please enter OTP" })
            return
        }
        if (this.state.phoneNumber.match(/^[789]{1}[0-9]{9}$/)) {
            this.setState({ validationError: "" })
            this.props.submitOTP(this.state.phoneNumber, this.state.otp, (exists) => {
                const parsed = queryString.parse(this.props.location.search)
                if (exists) {
                    if (parsed.login) {
                        let data = {
                            'Category': 'ConsumerApp', 'Action': 'LoginSuccess', 'pageSource': parsed.login, 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'login-success'
                        }
                        GTM.sendEvent({ data: data })
                    } else {
                        let data = {
                            'Category': 'ConsumerApp', 'Action': 'LoginSuccess', 'pageSource': 'UNKNOWN', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'login-success'
                        }
                        GTM.sendEvent({ data: data })
                    }

                    if (parsed.ref) {
                        this.props.history.push('/user')
                    }
                    else if (parsed.callback) {
                        this.props.history.replace(parsed.callback)
                    }
                    else {
                        this.props.history.go(-1)
                    }
                } else {
                    // gtm event

                    if (parsed.login) {
                        let data = {
                            'Category': 'ConsumerApp', 'Action': 'UserRegistered', 'pageSource': parsed.login, 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'user-registered'
                        }
                        GTM.sendEvent({ data: data })
                    } else {
                        let data = {
                            'Category': 'ConsumerApp', 'Action': 'UserRegistered', 'pageSource': 'UNKNOWN', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'user-registered'
                        }
                        GTM.sendEvent({ data: data })
                    }
                    if (parsed.callback) {
                        this.props.history.replace(`/signup?callback=${parsed.callback}`)
                    } else {
                        this.props.history.replace('/signup')
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

    render() {

        return (
            <div className="profile-body-wrap lgn-ovrflow">
                <ProfileHeader />
                <section className="container parent-section book-appointment-section-login">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7  center-column">
                            {/* <header className="skin-white fixed horizontal top bdr-1 light sticky-header">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-2">
                                            <ul className="inline-list">
                                                <li onClick={() => { this.props.history.go(-1) }}><span className="icon icon-sm text-middle back-icon-white"><img src={ASSETS_BASE_URL + "/img/customer-icons/back-icon.png"} className="img-fluid" /></span></li>
                                            </ul>
                                        </div>
                                        <div className="col-8">
                                            <div className="header-title fw-700 capitalize text-center">Login/Registration</div>
                                        </div>
                                        <div className="col-2">
                                        </div>
                                    </div>
                                </div>
                            </header> */}
                            <section className="mobile-verification-screen p-3">
                                <div className="widget no-shadow no-round sign-up-container">
                                    <div className="widget-header text-center mv-header">
                                        <h3 className="sign-coupon fw-700">Signup & get coupons worth<br /><span className="ft-25">&#8377; 300!</span> </h3>
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
                                                <input type="number" className="fc-input text-center" placeholder="10 digit mobile number" value={this.state.phoneNumber} onChange={this.inputHandler.bind(this)} name="phoneNumber" />
                                            </div>

                                            {
                                                this.state.showOTP ? <div className="adon-group enter-mobile-number">
                                                    <br /><br />
                                                    <input type="number" className="fc-input text-center" placeholder="Enter OTP" value={this.state.otp} onChange={this.inputHandler.bind(this)} name="otp" onKeyPress={this._handleKeyPress.bind(this)} />
                                                    {
                                                        this.state.otpTimeout ? "" : <a className="resendOtp" onClick={this.submitOTPRequest.bind(this, this.state.phoneNumber)}>Resend ?</a>
                                                    }
                                                </div> : ""
                                            }
                                        </div>
                                        <span className="errorMessage m-0 mb-2">{this.props.error_message}</span>
                                        <span className="errorMessage m-0 mb-2">{this.state.validationError}</span>
                                        {
                                            this.state.showOTP ?
                                                <div class="text-center">
                                                    <button onClick={this.verifyOTP.bind(this)} disabled={this.props.submit_otp} class="v-btn v-btn-primary btn-sm">
                                                        Verify
                                                </button>
                                                </div> :
                                                <div class="text-center">
                                                    <button onClick={this.submitOTPRequest.bind(this, this.state.phoneNumber)} disabled={this.props.otp_request_sent} class="v-btn v-btn-primary btn-sm">
                                                        Continue
                                                </button>
                                                </div>
                                        }
                                    </div>

                                    <p className="text-center fw-500 p-3" style={{ fontSize: 12, color: '#8a8a8a' }} >By proceeding, you hereby agree to the <a href="/terms" target="_blank" style={{ color: '#f78631' }} >End User Agreement</a> and <a href="/privacy" target="_blank" style={{ color: '#f78631' }} >Privacy Policy.</a></p>
                                </div>
                                <div className="widget mt-21 sign-up-container mrng-btm-scrl">
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
                                            <li>
                                                <img src={ASSETS_BASE_URL + "/img/customer-icons/su-opd.png"} className="img-fluid" />
                                                <p>OPD Insurance coming soon</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                        </div>

                        <RightBar />
                    </div>
                </section>
            </div>
        );
    }
}

export default UserLoginView
