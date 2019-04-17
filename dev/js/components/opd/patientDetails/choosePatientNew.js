import React from 'react';
import SnackBar from 'node-snackbar'
import GTM from '../../../helpers/gtm.js'


class ChoosePatientNewView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showOtp: false,
            otpVerifySuccess: false,
            name: '',
            phoneNumber: '',
            gender: '',
            data: false,
            email:''
        }
    }

    componentDidMount() {
        if (!this.props.patient) {
            this.profileValidation()
        }
    }

    inputHandler(e) {
        if (e.target.name == 'phoneNumber') {
            e.target.value.length <= 10
                ? e.target.value.length == 10
                    ? this.setState({
                        [e.target.name]: e.target.value, showVerify: true
                    })
                    : this.setState({
                        [e.target.name]: e.target.value
                    })
                : this.setState({ showVerify: true })
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }

    }

    handleContinuePress(e) {
        if (e.key === 'Enter') {
            this.verify()
        }
    }

    handleOtpContinuePress(e) {
        if (e.key === 'Enter') {
            this.submitOTPRequest()
        }
    }

    submitOTPRequest(number) {

        if (!this.state.otp) {
            SnackBar.show({ pos: 'bottom-center', text: "Please Enter Valid Otp" })
            return
        }
        let self = this
        this.props.submitOTP(this.state.phoneNumber, this.state.otp, (response) => {
            if (response.token) {

                let data = {
                    'Category': 'ConsumerApp', 'Action': 'LoginSuccess', 'pageSource': 'BookingPage', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'login-success', 'mobileNo': this.state.phoneNumber
                }
                GTM.sendEvent({ data: data })

                self.setState({ otpVerifySuccess: true }, () => {
                    self.props.profileDataCompleted(this.state)
                    self.props.createProfile(this.state, (err, res) => {
                        //self.setState({data:true})
                        self.props.getUserProfile()
                    })
                })
            } else {
                SnackBar.show({ pos: 'bottom-center', text: "Please Enter Valid Otp" })
            }

        })

    }

    profileValidation() {
        this.props.profileDataCompleted(this.state)
    }

    verify() {
        let self = this

        if (!this.state.name.match(/^[a-zA-Z ]+$/)) {
            setTimeout(() => {
                if (!this.state.name) {
                    SnackBar.show({ pos: 'bottom-center', text: "Please enter patient's name." })
                } else {
                    SnackBar.show({ pos: 'bottom-center', text: "Name should only contain alphabets." })
                }
            }, 500)
            return
        }

        if (this.state.gender == '') {
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Please Select The Gender" })
            }, 500)
            return
        }

        if(this.state.email ==''){
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Please Enter Your Email Id" })
            }, 500)
            return 
        }

        if(!this.state.email.match(/\S+@\S+\.\S+/)) 
        {
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Please Enter Valid Email Id" })
            }, 500)
            return 
        }

        if (this.state.phoneNumber.match(/^[56789]{1}[0-9]{9}$/)) {
            this.setState({ validationError: "" })

            let analyticData = {
                'Category': 'ConsumerApp', 'Action': 'GetOtpRequest', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'get-otp-request', 'mobileNo': this.state.phoneNumber, 'pageSource': 'BookingPage'
            }
            GTM.sendEvent({ data: analyticData })

            this.props.sendOTP(this.state.phoneNumber, (error) => {
                if (error) {
                    setTimeout(() => {
                        SnackBar.show({ pos: 'bottom-center', text: "Could not generate OTP." })
                    }, 500)
                    //self.setState({ validationError: "Could not generate OTP." })
                } else {
                    self.setState({ showOtp: true, showVerify: false })
                    setTimeout(() => {
                        this.setState({ otpTimeout: false })
                    }, 10000)
                }
            })
        } else {
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Please provide a valid number (10 digits)" })
            }, 500)
            //this.setState({ validationError: "Please provide a valid number (10 digits)" })
        }

    }
    render() {

        return (
            <div className={`widget mrb-15 ${this.props.profileError ? 'rnd-error-nm' : ''}`}>
                {
                    this.props.patient ?
                        <div className="widget-content">
                            <div className="lab-visit-time d-flex jc-spaceb">
                                <h4 className="title d-flex"><span>
                                    <img style={{ width: '20px', marginRight: '8px' }} src={ASSETS_BASE_URL + "/img/nw-usr.svg"} />
                                </span>Patient</h4>
                                <div className="float-right  mbl-view-formatting text-right">
                                    <h4 className="date-time title" style={{textTransform:'capitalize'}} >{this.props.patient ? this.props.patient.name : ""} </h4>
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        this.props.navigateTo('patient')
                                    }} className="text-primary fw-700 text-sm">{this.props.patient ? "Change Patient" : "Select Patient"}</a>
                                </div>
                            </div>
                        </div>
                        : <div className="widget-content">
                            <div className="lab-visit-time d-flex jc-spaceb">
                                <h4 className="title d-flex"><span>
                                    <img style={{ width: '20px', marginRight: '8px' }} src={ASSETS_BASE_URL + "/img/nw-usr.svg"} />
                                </span>Patient</h4>
                            </div>
                            <div className="select-pt-form">
                                <div className="slt-nw-input">
                                    <label className="slt-label" htmlFor="male"><sup className="requiredAst">*</sup>Name:</label>
                                    <input className="slt-text-input" autoComplete="off" type="text" name="name" value={this.state.name} onChange={this.inputHandler.bind(this)} onBlur={this.profileValidation.bind(this)} placeholder="" />
                                </div>
                                <div className="slt-nw-input radio-mbl">
                                    <label className="slt-label" htmlFor="male" ><sup className="requiredAst">*</sup>Gender:</label>
                                    <div className="slt-label-radio">
                                        <div className="dtl-radio">
                                            <label className="container-radio">Male
                                    <input type="radio" name="gender" name="gender" onClick={() => this.setState({ 'gender': 'm' })} onBlur={this.profileValidation.bind(this)} />
                                                <span className="doc-checkmark"></span>
                                            </label>
                                        </div>
                                        <div className="dtl-radio">
                                            <label className="container-radio">Female
                                    <input type="radio" name="gender" value="m" name="gender" onClick={() => this.setState({ 'gender': 'f' })} onBlur={this.profileValidation.bind(this)} />
                                                <span className="doc-checkmark"></span>
                                            </label>
                                        </div>
                                        <div className="dtl-radio">
                                            <label className="container-radio">Other
                                    <input type="radio" name="gender" name="gender" onClick={() => this.setState({ 'gender': 'o' })} onBlur={this.profileValidation.bind(this)} />
                                                <span className="doc-checkmark"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="slt-nw-input">
                                    <label className="slt-label" htmlFor="male"><sup className="requiredAst">*</sup>Email:</label>
                                    <input className="slt-text-input" autoComplete="off" type="text" name="email" value={this.state.email} onChange={this.inputHandler.bind(this)} onBlur={this.profileValidation.bind(this)} placeholder="" />
                                </div>
                                <div className="slt-nw-input">
                                    <label className="slt-label" htmlFor="male"><sup className="requiredAst">*</sup>Mobile:</label>
                                    <input className="slt-text-input" autoComplete="off" type="number" placeholder="" value={this.state.phoneNumber} onChange={this.inputHandler.bind(this)} name="phoneNumber" onKeyPress={this.handleContinuePress.bind(this)} onBlur={this.profileValidation.bind(this)} />
                                    {
                                        this.state.showVerify ?
                                            <button className="mobile-fill-btn" onClick={this.verify.bind(this)}>Verify</button>
                                            : ''
                                    }
                                </div>
                                {
                                    this.state.showOtp ?
                                        <div>
                                            <div className="slt-nw-input">
                                                <label className="slt-label" htmlFor="male">OTP:</label>
                                                <input className="slt-text-input" autoComplete="off" type="number" onKeyPress={this.handleOtpContinuePress.bind(this)} onChange={this.inputHandler.bind(this)} name="otp" placeholder="Enter OTP " />
                                                <button className="mobile-fill-btn" onClick={this.submitOTPRequest.bind(this)}>Submit</button>
                                            </div>
                                            <span className="resend-otp-btn" onClick={this.verify.bind(this)}>Resend OTP</span>
                                        </div>
                                        : ''
                                }

                            </div>
                        </div>
                }
            </div>
        );
    }
}


export default ChoosePatientNewView
