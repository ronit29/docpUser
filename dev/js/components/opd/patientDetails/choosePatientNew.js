import React from 'react';
import SnackBar from 'node-snackbar'


class ChoosePatientNewView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showOtp: false,
            otpVerifySuccess: false,
            name: '',
            phoneNumber: '',
            gender: '',
            data: false
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
            if (!this.state.showOTP) {
                this.submitOTPRequest(this.state.phoneNumber)
            }
        }
    }

    submitOTPRequest(number) {

        if (!this.state.otp) {
            this.setState({ validationError: "Please enter OTP" })
            return
        }
        let self = this
        this.props.submitOTP(this.state.phoneNumber, this.state.otp, (exists) => {

            if (exists) {
                self.setState({ otpVerifySuccess: true }, () => {
                    self.props.profileDataCompleted(this.state)
                    self.props.createProfile(this.state, (err, res) => {
                        //self.setState({data:true})
                        self.props.getUserProfile()
                    })
                })
            }
        })

    }

    profileValidation() {
        this.props.profileDataCompleted(this.state)
    }

    verify() {
        let self = this

        if(this.state.name==''){

            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Please Enter your Name" })
            }, 500)
            return 
            //this.setState({ validationError: "Please provide a valid number (10 digits)" })
        }

        if(this.state.gender ==''){
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Please Select the Gender" })
            }, 500)
            return 
        }
        if (this.state.phoneNumber.match(/^[789]{1}[0-9]{9}$/)) {
            this.setState({ validationError: "" })
            this.props.sendOTP(this.state.phoneNumber, (error) => {
                if (error) {
                    setTimeout(() => {
                        SnackBar.show({ pos: 'bottom-center', text: "Could not generate OTP." })
                    }, 500)
                    //self.setState({ validationError: "Could not generate OTP." })
                } else {
                    self.setState({ showOtp: true , showVerify: false})
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
        console.log(this.state)

        return (
            <div className="widget mrb-15">
                {
                    this.props.patient ?
                        <div className="widget-content">
                            <div className="lab-visit-time d-flex jc-spaceb">
                                <h4 className="title"><span>
                                    <img style={{ width: '20px', marginRight: '8px' }} src={ASSETS_BASE_URL + "/img/nw-usr.svg"} />
                                </span>Patient</h4>
                                <div className="float-right  mbl-view-formatting text-right">
                                    <h4 className="date-time title">{this.props.patient ? this.props.patient.name : "No Selected Patient"} </h4>
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        this.props.navigateTo('patient')
                                    }} className="text-primary fw-700 text-sm">{this.props.patient ? "Change" : "Select"}</a>
                                </div>
                            </div>
                        </div>
                        : <div className="widget-content">
                            <div className="lab-visit-time d-flex jc-spaceb">
                                <h4 className="title"><span>
                                    <img style={{ width: '20px', marginRight: '8px' }} src={ASSETS_BASE_URL + "/img/nw-usr.svg"} />
                                </span>Patient</h4>
                            </div>
                            <div className="select-pt-form">
                                <div className="slt-nw-input">
                                    <label className="slt-label" htmlFor="male">Name:</label>
                                    <input className="slt-text-input" type="text" name="name" value={this.state.name} onChange={this.inputHandler.bind(this)} onBlur={this.profileValidation.bind(this)} placeholder="" />
                                </div>
                                <div className="slt-nw-input radio-mbl">
                                    <label className="slt-label" htmlFor="male" >Gender:</label>
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
                                    <label className="slt-label" htmlFor="male">Mobile:</label>
                                    <input className="slt-text-input" type="number" placeholder="" value={this.state.phoneNumber} onChange={this.inputHandler.bind(this)} name="phoneNumber" onKeyPress={this.handleContinuePress.bind(this)} onBlur={this.profileValidation.bind(this)} />
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
                                                <input className="slt-text-input" type="number" onChange={this.inputHandler.bind(this)} name="otp" placeholder="Enter OTP " />
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
