import React from 'react';
import SnackBar from 'node-snackbar'
import GTM from '../../../helpers/gtm.js'
import Calendar from 'rc-calendar';
const moment = require('moment');
const queryString = require('query-string');
import NewDateSelector from '../../commons/newDateSelector.js'

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
            email: '',
            smsBtnType: null,
            isEmailNotValid: false,
            isPopupDataFilled: false,
            enableOtpRequest:false,
            dob:null,
            formattedDate:'', 
            dateModal: false,
            isDobNotValid:false,
            isNewPatient:false,
            is_dob_error:null,
            isDobValidated:false
        }
    }

    componentDidMount() {
        if (!this.props.patient) {

            if(this.props.saved_patient_details && Object.keys(this.props.saved_patient_details).length){

                this.setState({ ...this.props.saved_patient_details, isPopupDataFilled: false }, () => {
                    this.profileValidation()
                })

            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.doctorSummaryPage && !nextProps.patient && !this.state.isPopupDataFilled && nextProps.ipdPopupData && nextProps.ipdPopupData['popup1'] && (!this.props.ipdPopupData['popup1'] || (this.props.ipdPopupData['popup1'] && nextProps.ipdPopupData['popup1'].name!=this.props.ipdPopupData['popup1'] ) ) ){
            let popup1;
            try{
                let popup1 = nextProps.ipdPopupData['popup1']
                
                if(popup1 && Object.keys(popup1).length && popup1.doctor == this.props.selectedDoctor){

                    this.setState({ name:popup1 && popup1.first_name?popup1.first_name:'', phoneNumber: popup1 && popup1.phone_number?popup1.phone_number:'' ,gender:popup1 && popup1.gender?popup1.gender:'', showVerify: true, isPopupDataFilled: true }, () => {
                        this.profileValidation()
                    })
                }                    

            }catch(e){

            }
        } 
    }

    inputHandler(e) {
        if (e.target.name == 'phoneNumber') {
            e.target.value.length <= 10
                ? e.target.value.length == 10
                    ?
                    this.setState({
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
                    //Create IPD lead for IPD Hospital
                    if(self.props.doctorSummaryPage && self.props.is_ipd_hospital) {
                        let formData = {
                            phone_number: this.state.phoneNumber,
                            source: 'dropoff',
                            is_valid: false,
                            first_name: this.state.name||'unknown'
                        }
                        if(self.props.doctor_id){
                            formData['doctor'] = self.props.doctor_id
                        }
                        if(self.props.hospital_id) {
                            formData['hospital'] = self.props.hospital_id
                        }
                        self.props.submitIPDForm(formData, this.props.selectedLocation)    
                    }
                    
                    self.props.createProfile(this.state, (err, res) => {
                        //self.setState({data:true})
                        self.props.getUserProfile().then(() => {

                            if (self.props.is_lab) {
                                self.props.checkPrescription()
                                self.props.clearTestForInsured()
                            }
                            this.props.getDataAfterLogin()
                            if (self.props.is_opd) {
                                self.props.sendEmailNotification()
                            }
                        })
                        self.setState({dob:null,email:null})
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

    profileEmailValidation() {
        if (!this.state.email.match(/\S+@\S+\.\S+/)) {
            this.setState({ isEmailNotValid: true })
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Please Enter Valid Email Id" })
            }, 500)
            return
        }
    }

    profileDobValidation(e){
        let data = { ...this.props.patient }
        if(data){
            this.setState({email:data.email?data.email:this.state.email,dob:data.dob?data.dob:this.state.dob},() => {
                if(this.state.dob && this.state.email){
                    this.setState({ isEmailNotValid: false, isDobNotValid:false })
                    data.dob = this.state.dob
                    data.email = this.state.email
                    this.props.editUserProfile(data, this.props.patient.id, (err, res) => {
                        this.props.getUserProfile()
                        this.setState({ dob: null, email:null })
                    })
                }else{
                    if(!this.state.email && !data.email){
                        this.setState({ isEmailNotValid: true })
                        SnackBar.show({ pos: 'bottom-center', text: "Please Enter Valid Email Id" })
                    }
                    if(!this.state.dob && !data.dob){
                        this.setState({isDobNotValid:true})
                        SnackBar.show({ pos: 'bottom-center', text: "Please Enter Date of Birth" })
                    }
                }
            })
        }
    }

    selectDateFromCalendar(date) {
        let data = { ...this.props.patient }
        if (date) {
            date = date.toDate()
            let formattedDate = this.getFormattedDate(date)
            date = new Date(date).toISOString().split('T')[0]
            /*this.setState({ dob: date, formattedDate:formattedDate, dateModal: false},()=>{
                data.dob = this.state.dob    
                this.props.editUserProfile(data, this.props.patient.id, (err, res) => {
                    this.props.getUserProfile()
                })
            })*/
            this.setState({ dob: date, formattedDate:formattedDate, dateModal: false},()=>{
                if(this.state.isNewPatient){
                    this.profileValidation()
                }
            })
        } else {
            this.setState({ dateModal: false })
        }
    }

    getFormattedDate(date){
        date = new Date(date)
        var dd = date.getDate();
        var mm = date.getMonth()+1; 
        var yyyy = date.getFullYear();
        if(dd<10){
            dd='0'+dd;
        }
        if(mm<10){
            mm='0'+mm;
        }
        var today = dd+'-'+mm+'-'+yyyy;
        return today
    }

    openCalendar(isNewPatient){
        this.setState({dateModal:true,isNewPatient:isNewPatient})
    }

    verify(resendFlag = false, viaSms, viaWhatsapp) {
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

        if (this.state.email == '') {
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Please Enter Your Email Id" })
            }, 500)
            return
        }

        if (!this.state.email.match(/\S+@\S+\.\S+/)) {
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Please Enter Valid Email Id" })
            }, 500)
            return
        }

        if (this.state.dob == '' || this.state.dob == null) {
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Please Enter Valid Date of Birth" })
            }, 500)
            return
        }

        if (this.state.dob != null && !this.state.isDobValidated) {
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Please Enter Valid Date of Birth" })
            }, 500)
            return
        }

        if (this.state.phoneNumber.match(/^[56789]{1}[0-9]{9}$/)) {
            this.setState({ validationError: "" })

            if (resendFlag) {
                let analyticData = {
                    'Category': 'ConsumerApp', 'Action': 'ResendOtp', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'resend-otp', 'mobileNo': this.state.phoneNumber, 'pageSource': 'BookingPage', 'mode': viaSms ? 'viaSms' : viaWhatsapp ? 'viaWhatsapp' : ''
                }
                GTM.sendEvent({ data: analyticData })
            } else {
                let analyticData = {
                    'Category': 'ConsumerApp', 'Action': 'GetOtpRequest', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'get-otp-request', 'mobileNo': this.state.phoneNumber, 'pageSource': 'BookingPage', 'mode': viaSms ? 'viaSms' : viaWhatsapp ? 'viaWhatsapp' : ''
                }
                GTM.sendEvent({ data: analyticData })
            }
            this.props.nonIpdLeads(this.state.phoneNumber,this.state.name)
            this.props.sendOTP(this.state.phoneNumber, viaSms, viaWhatsapp, 'booking-login', (error) => {
                if (error) {
                    setTimeout(() => {
                        SnackBar.show({ pos: 'bottom-center', text: "Could not generate OTP." })
                    }, 500)
                    //self.setState({ validationError: "Could not generate OTP." })
                } else {
                    if(viaWhatsapp){
                        this.setState({enableOtpRequest:true})
                    }else{
                        this.setState({enableOtpRequest:false})
                    }
                    self.setState({ showOtp: true, showVerify: false, smsBtnType: viaSms ? true : false })
                    setTimeout(() => {
                        this.setState({ otpTimeout: false })
                    }, 20000)
                    setTimeout(() => {
                        this.setState({ enableOtpRequest:false })
                    }, 60000)
                }
            })
        } else {
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Please provide a valid number (10 digits)" })
            }, 500)
            //this.setState({ validationError: "Please provide a valid number (10 digits)" })
        }

    }
    getNewDate(type,newDate,isValidDob){
        this.setState({ dob: newDate,isDobValidated:isValidDob},()=>{
            this.profileValidation()
        })
    }

    render() {
        const parsed = queryString.parse(this.props.location.search)
        
        return (
            <div className={`widget mrb-15 ${this.props.profileError ? 'rnd-error-nm' : ''}`}>
                {
                    this.props.patient ?
                        <div className="widget-content">
                            <div className="lab-visit-time d-flex jc-spaceb">
                                <div className="d-flex flex-1" style={{ flexDirection: 'column', paddingRight: 15 }} >
                                    <h4 className="title d-flex"><span>
                                        <img style={{ width: '20px', marginRight: '8px' }} src={ASSETS_BASE_URL + "/img/nw-usr.svg"} />
                                    </span>Patient</h4>
                                </div>
                                <div className="mbl-view-formatting text-right">
                                    <h4 className="date-time title" style={{ textTransform: 'capitalize' }} >{this.props.patient ? this.props.patient.name : ""} </h4>
                                </div>
                            </div>
                            {
                                (this.props.is_opd || this.props.is_lab) && !this.props.patient.email ?
                                    <div className="mrb-20" style={{ paddingLeft: 28 }}>
                                        <input className="slt-text-input" autoComplete="off" type="text" name="email" value={this.state.email} onChange={this.inputHandler.bind(this)} onBlur={this.profileEmailValidation.bind(this)} placeholder="Enter your email" style={(this.props.isEmailNotValid || this.state.isEmailNotValid) ? { borderBottom: '1px solid red' } : {}} />
                                    </div>
                                    : ''
                            }
                            {
                                /*this.props.is_lab && this.props.patient.dob ?
                                    <div className="mrb-20" style={{ paddingLeft: 28 }}>
                                        <input className="slt-text-input" autoComplete="off" type="date" name="dob" value={this.state.dob} onChange={this.profileDobValidation.bind(this)} placeholder="Date of Birth" style={this.props.isDobNotValid ? { borderBottom: '1px solid red' } : {}} />
                                    </div>
                                    : ''*/
                            }
                            {   
                                /*(this.props.is_opd || this.props.is_lab) && !this.props.patient.dob?
                                    <React.Fragment>
                                        {!this.props.patient.dob ?
                                            <div className="dob-summary-container">
                                                <input id="dob" 
                                                    name="dob" 
                                                    type="text" 
                                                    value={this.state.formattedDate} 
                                                    onClick={this.openCalendar.bind(this,false)} required 
                                                    style={(this.props.isDobNotValid || this.state.isDobNotValid) ? { borderBottom: '1px solid red' } : {}} 
                                                    autoComplete="off"
                                                />
                                                {!this.state.dob?<label htmlFor="dob">Date of Birth</label>:''}
                                             </div>
                                        :''} 

                                        {this.state.dateModal ? 
                                            <div className="calendar-overlay">
                                                <div className="date-picker-modal">
                                                    <Calendar
                                                        showWeekNumber={false}
                                                        defaultValue={moment(new Date())}
                                                        disabledDate={(date) => {
                                                            return date.diff(moment((new Date)), 'days') > -1
                                                        }}
                                                        showToday
                                                        onSelect={this.selectDateFromCalendar.bind(this)}
                                                    />
                                                </div>
                                            </div>
                                        :''}
                                        </React.Fragment> 
                                : ""*/
                            }

                            {
                                (this.props.is_opd || this.props.is_lab) && !this.props.patient.dob?
                                    <div className="slt-nw-input summery-dob-cont">
                                        <label className="slt-label" htmlFor="male"><sup className="requiredAst">*</sup>Dob:</label>
                                        <NewDateSelector {...this.props} getNewDate={this.getNewDate.bind(this)} is_dob_error={this.state.is_dob_error}/>
                                    </div>
                                :""
                            }
                             
                            <React.Fragment>
                            {this.state.dob || this.state.email?
                                <div className="text-right">
                                   <a href="#" className="text-primary fw-700 text-sm" onClick={this.profileDobValidation.bind(this)}>Update</a>
                                </div>
                                :(parsed && parsed.cod_to_prepaid=='true')?'':
                                    <div className="text-right">
                                            <a href="#" onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            this.props.navigateTo('patient', this.props.is_insurance_applicable)
                                        }} className="text-primary fw-700 text-sm">{this.props.patient ? "Change Patient" : "Select Patient"}</a>
                                    </div>
                            }
                            <div className="">
                            {this.props.show_insurance_error && this.props.insurance_error_msg?
                                <p className="gyn-text">{this.props.insurance_error_msg}</p>
                                :''
                            }
                            </div>
                            </React.Fragment>
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
                                <div className="slt-nw-input summery-dob-cont">
                                    <label className="slt-label" htmlFor="male"><sup className="requiredAst">*</sup>Dob:</label>
                                    <NewDateSelector {...this.props} getNewDate={this.getNewDate.bind(this)} is_dob_error={this.state.is_dob_error}/>
                                </div>
                                
                                {/*<div className="slt-nw-input">
                                    <label className="slt-label" htmlFor="male"><sup className="requiredAst">*</sup>Dob:</label>
                                    <input className="slt-text-input" autoComplete="off" type="text" name="dob" value={this.state.dob} onClick={this.openCalendar.bind(this,true)}  placeholder="" />
                                </div>*/}
                                {/*this.state.dateModal ? 
                                    <div className="calendar-overlay">
                                        <div className="date-picker-modal">
                                            <Calendar
                                                showWeekNumber={false}
                                                defaultValue={moment(new Date())}
                                                disabledDate={(date) => {
                                                    return date.diff(moment((new Date)), 'days') > -1
                                                }}
                                                showToday
                                                onSelect={this.selectDateFromCalendar.bind(this)}
                                            />
                                        </div>
                                    </div>
                                :''*/}
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
                                                <button className="input-sms-ver" onClick={() => this.verify(false, true, false)}>
                                                    <img style={{ marginRight: '5px' }} className="sms-ico" src={ASSETS_BASE_URL + '/img/smsicon.svg'} />Verify Via SMS</button>
                                                <button className="input-sms-whts" onClick={() => this.verify(false, false, true)}><img style={{ marginRight: '5px' }} className="whtsp-ico" src={ASSETS_BASE_URL + '/img/wa-logo-gr.svg'} />Verify Via Whatsapp</button>
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
                                                <span className="resend-otp-btn" onClick={() => this.verify(true, this.state.smsBtnType ? false : true, !this.state.smsBtnType ? false : true)}>{this.state.smsBtnType ? 'Send via Whatsapp' : 'Send via SMS'}</span>
                                                {this.state.enableOtpRequest?''
                                                :<span className="resend-otp-btn" style={{ color: '#ec0d0d' }} onClick={() => this.verify(true, this.state.smsBtnType ? true : false, !this.state.smsBtnType ? true : false)}>Resend</span>
                                                }
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
