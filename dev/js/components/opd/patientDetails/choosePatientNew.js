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
            email:'',
            smsBtnType:null
        }
    }

    componentDidMount() {
        if (!this.props.patient) {
            this.setState({ ...this.props.saved_patient_details },()=>{
                this.profileValidation()
            })
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
                        self.props.getUserProfile().then(()=>{

                            if(self.props.is_lab){
                                self.props.checkPrescription()
                                self.props.clearTestForInsured()
                            }
                        })

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

    verify(resendFlag = false,viaSms,viaWhatsapp) {
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

            if(resendFlag){
                let analyticData = {
                    'Category': 'ConsumerApp', 'Action': 'ResendOtp', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'resend-otp', 'mobileNo': this.state.phoneNumber, 'pageSource': 'BookingPage', 'mode':viaSms?'viaSms':viaWhatsapp?'viaWhatsapp':''
                }
                GTM.sendEvent({ data: analyticData })
            } else {
                let analyticData = {
                    'Category': 'ConsumerApp', 'Action': 'GetOtpRequest', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'get-otp-request', 'mobileNo': this.state.phoneNumber, 'pageSource': 'BookingPage', 'mode':viaSms?'viaSms':viaWhatsapp?'viaWhatsapp':''
                }
                GTM.sendEvent({ data: analyticData })
            }

            this.props.sendOTP(this.state.phoneNumber,viaSms,viaWhatsapp, (error) => {
                if (error) {
                    setTimeout(() => {
                        SnackBar.show({ pos: 'bottom-center', text: "Could not generate OTP." })
                    }, 500)
                    //self.setState({ validationError: "Could not generate OTP." })
                } else {
                    self.setState({ showOtp: true, showVerify: false,smsBtnType:viaSms?true:false })
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
                                        this.props.navigateTo('patient',this.props.is_insurance_applicable)
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
                                    <input type="radio" name="gender" name="gender" checked={this.state.gender == 'm'} onClick={() => this.setState({ 'gender': 'm' })} onBlur={this.profileValidation.bind(this)} />
                                                <span className="doc-checkmark"></span>
                                            </label>
                                        </div>
                                        <div className="dtl-radio">
                                            <label className="container-radio">Female
                                    <input type="radio" name="gender" value="m" name="gender" checked={this.state.gender == 'f'} onClick={() => this.setState({ 'gender': 'f' })} onBlur={this.profileValidation.bind(this)} />
                                                <span className="doc-checkmark"></span>
                                            </label>
                                        </div>
                                        <div className="dtl-radio">
                                            <label className="container-radio">Other
                                    <input type="radio" name="gender" name="gender" checked={this.state.gender == 'o'} onClick={() => this.setState({ 'gender': 'o' })} onBlur={this.profileValidation.bind(this)} />
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
                                </div>
                                <div className="input-booking-smswhts">
                                {
                                        this.state.showVerify ?
                                            <React.Fragment>
                                                <button className="input-sms-ver" onClick={()=>this.verify(false,true,false)}>
                                                <img style={{marginRight:'5px'}} className="sms-ico" src={ASSETS_BASE_URL + '/img/smsicon.svg'} />Verify Via SMS</button>
                                                <button className="input-sms-whts" onClick={()=>this.verify(false,false,true)}><img style={{marginRight:'5px'}} className="whtsp-ico" src={ASSETS_BASE_URL + '/img/wa-logo-sm.png'} />Verify Via Whatsapp</button>
                                            </React.Fragment>
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
                                            <div className="d-flex align-items-start justify-content-between">
                                                <span className="resend-otp-btn" onClick={()=>this.verify(true,this.state.smsBtnType ? false : true, !this.state.smsBtnType ? false : true)}>{this.state.smsBtnType ?'Send via Whatsapp':'Send via SMS'}</span>
                                                <span className="resend-otp-btn" style={{color:'#ec0d0d'}} onClick={()=>this.verify(true,this.state.smsBtnType?true:false,!this.state.smsBtnType?true:false)}>Resend</span>
                                            </div>
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
