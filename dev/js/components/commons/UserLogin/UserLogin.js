import React from 'react';
const queryString = require('query-string');

class UserLoginView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            phoneNumber: '',
            validationError: '',
            showOTP: false,
            otp: ""
        }
    }

    inputHandler(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitOTPRequest(number) {

        if (number.match(/^[789]{1}[0-9]{9}$/)) {
            this.setState({ validationError: "" })
            this.props.sendOTP(number, (exists) => {
                this.setState({ showOTP: true })
            })
        } else {
            this.setState({ validationError: "Please provide a valid number (10 digits)" })
        }
    }

    verifyOTP() {
        if (this.state.phoneNumber.match(/^[789]{1}[0-9]{9}$/)) {
            this.setState({ validationError: "" })
            this.props.submitOTP(this.state.phoneNumber, this.state.otp, (exists) => {
                const parsed = queryString.parse(this.props.location.search)
                if (exists) {
                    if (parsed.callback) {
                        this.props.history.replace(parsed.callback)
                    } else {
                        this.props.history.go(-1)
                    }
                } else {
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

    render() {

        return (
            <div>
                <header className="skin-white fixed horizontal top bdr-1 bottom light">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-2">
                                <ul className="inline-list">
                                    <li onClick={() => { this.props.history.go(-1) }}><span className="icon icon-sm text-middle back-icon-white"><img src="/assets/img/customer-icons/back-icon.png" className="img-fluid" /></span></li>
                                </ul>
                            </div>
                            <div className="col-8">
                                <div className="header-title fw-700 capitalize text-center">Registration/Login</div>
                            </div>
                            <div className="col-2">
                            </div>
                        </div>
                    </div>
                </header>
                <section className="wrap mobile-verification-screen">
                    <div className="widget no-shadow no-round">
                        <div className="widget-header text-center mv-header">
                            <h4 className="fw-700 text-md">Enter your Mobile Number <br /> to continue</h4>
                        </div>
                        <div className="widget-content text-center">
                            <div className="mobile-verification">
                                <div className="verifi-mob-iocn text-center">
                                    <img src="/assets/img/customer-icons/mob.svg" className="img-fluid" />
                                </div>
                            </div>
                            <div className="form-group mobile-field">
                                <div className="adon-group enter-mobile-number">
                                    <input type="text" className="fc-input text-center" placeholder="934XXXXXX" value={this.state.phoneNumber} onChange={this.inputHandler.bind(this)} name="phoneNumber" />
                                </div>

                                {
                                    this.state.showOTP ? <div className="adon-group enter-mobile-number">
                                        <br /><br />
                                        <input type="text" className="fc-input text-center" placeholder="Enter OTP" value={this.state.otp} onChange={this.inputHandler.bind(this)} name="otp" />

                                        <a className="resendOtp" onClick={this.submitOTPRequest.bind(this, this.state.phoneNumber)}>Resend ?</a>
                                    </div> : ""
                                }
                            </div>
                        </div>
                        <span className="errorMessage">{this.props.error_message}</span>
                        <span className="errorMessage">{this.state.validationError}</span>
                    </div>
                </section>
                {
                    this.state.showOTP ? <button onClick={this.verifyOTP.bind(this)} className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg" disabled={this.props.submit_otp}>Verify</button> : <button onClick={this.submitOTPRequest.bind(this, this.state.phoneNumber)} disabled={this.props.otp_request_sent} className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg">Continue</button>
                }

            </div>
        );
    }
}


export default UserLoginView
