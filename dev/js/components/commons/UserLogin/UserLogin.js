import React from 'react';

class UserLoginView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            phoneNumber: '',
            validationError: ''
        }
    }

    inputHandler(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitOTPRequest(number) {

        if (number.match(/^[789]{1}[0-9]{9}$/)) {
            this.setState({ validationError: "" })
            this.props.sendOTP(number, (exists) => {
                this.props.history.replace('/otp/verify?exists=${!!exists}')
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
                                    <li><span className="icon icon-sm text-middle back-icon-white"><img src="/assets/img/customer-icons/back-icon.png" className="img-fluid" /></span></li>
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
                                    <input type="text" className="fc-input text-center" placeholder="234XXXXXX" value={this.state.phoneNumber} onChange={this.inputHandler.bind(this)} name="phoneNumber" />
                                </div>
                            </div>
                        </div>
                        <span className="errorMessage">{this.props.error_message}</span>
                        <span className="errorMessage">{this.state.validationError}</span>
                    </div>
                </section>
                <button onClick={this.submitOTPRequest.bind(this,this.state.phoneNumber)} disabled={this.props.otp_request_sent} className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg">Continue</button>
            </div>
        );
    }
}


export default UserLoginView
