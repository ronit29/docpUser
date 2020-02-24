import React from 'react'
const queryString = require('query-string');
import GTM from '../../helpers/gtm.js'
import SnackBar from 'node-snackbar'

class InsurancePopup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profile_id: '',
            newprofile: {},
            phoneNumber: '',
            validationError: '',
            showOTP: false,
            otp: "",
            otpTimeout: false,
            error_message: '',
            isLeadTrue: false,
            smsBtnType: null,
            selectedProfileAge:'',
            age:'',
            enableOtpRequest:false
        }
    }
    handleChange(profileid, newProfile,selectedProfileAge, event) {
        let newProfileNames = {}
        let newName = newProfile.name.split(" ")
        let tempArray
        if (newName.length == 2) {
            newProfileNames.name = newName[0]
            if (!this.props.self_data_values.no_lname) {
                newProfileNames.middle_name = ''
                newProfileNames.last_name = newName[1]
            } else {
                newProfileNames.middle_name = ''
                newProfileNames.last_name = ''
            }
        } else if (newName.length == 3) {
            newProfileNames.name = newName[0]
            if (!this.props.self_data_values.no_lname) {
                newProfileNames.middle_name = newName[1]
                newProfileNames.last_name = newName[2]
            } else {
                newProfileNames.middle_name = ''
                newProfileNames.last_name = ''
            }
        } else if (newName.length > 3) {
            tempArray = newName.slice(2, newName.length)
            newProfileNames.name = newName[0]
            if (!this.props.self_data_values.no_lname) {
                newProfileNames.middle_name = newName[1]
                newProfileNames.last_name = tempArray.join(' ')
            } else {
                newProfileNames.middle_name = ''
                newProfileNames.last_name = ''
            }
        } else {
            newProfileNames.name = newName[0]
            if (!this.props.self_data_values.no_lname) {
                newProfileNames.middle_name = ''
                newProfileNames.last_name = ''
            } else {
                newProfileNames.middle_name = ''
                newProfileNames.last_name = ''
            }
        }
        let exactProfile = { ...newProfile, ...newProfileNames }
        if(this.props.is_child_only){
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = yyyy + '-' + mm + '-' + dd;
            var startDate = Date.parse(today);
            var endDate = Date.parse(newProfile.dob);
            var timeDiff = startDate - endDate;
            let daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            this.setState({profile_id: profileid, newprofile: exactProfile,selectedProfileAge:daysDiff,age:newProfile.age})
        }else{
            this.setState({profile_id: profileid, newprofile: exactProfile,selectedProfileAge:selectedProfileAge,age:newProfile.age})
        }
    }
    inputHandler(e) {
        if (this.state.showOTP && e.target.name == 'phoneNumber') {
            this.setState({ [e.target.name]: e.target.value, validationError: "", showOTP: false, otp: "" })
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    submitOTPRequest(number, resendFlag = false, viaSms, viaWhatsapp, fromPopup=null) { // to generate otp
        let lead_data = queryString.parse(this.props.location.search)
        if (number.match(/^[56789]{1}[0-9]{9}$/)) {
            this.setState({ validationError: "" })
            this.props.sendOTP(number, viaSms, viaWhatsapp,'insurance-login', (error) => {
                if (error) {
                    // this.setState({ validationError: "Could not generate OTP." })
                } else {
                    if (Object.keys(this.props.selected_plan).length > 0) {
                        this.props.generateInsuranceLead(this.props.selected_plan ? this.props.selected_plan.id : '', this.state.phoneNumber, lead_data) // to create insurance lead for matrix
                    }
                    let data = {
                        'Category': 'ConsumerApp', 'Action': 'InsuranceLoginPopupContinue', 'CustomerID': GTM.getUserId() || '', 'event': 'Insurance-login-popup-continue-click', 'mode': viaSms ? 'viaSms' : viaWhatsapp ? 'viaWhatsapp' : '', 'mobileNo': this.state.phoneNumber
                    }
                    GTM.sendEvent({ data: data })
                    if(viaWhatsapp){
                        this.setState({enableOtpRequest:true})
                    }else{
                        this.setState({enableOtpRequest:false})
                    }
                    this.setState({ showOTP: true, otpTimeout: true, smsBtnType: viaSms ? true : false })
                    setTimeout(() => {
                        this.setState({ otpTimeout: false })
                    }, 20000)
                    setTimeout(() => {
                        this.setState({ enableOtpRequest:false })
                    }, 60000)

                    if(fromPopup && document.getElementsByClassName('ins-form-slider')){
                        if(fromPopup=='one'){
                            document.getElementsByClassName('ins-form-slider')[0].scroll({ left: 999, behavior: 'smooth' })
                        }else {
                            document.getElementsByClassName('ins-form-slider')[0].scroll({ left: -999, behavior: 'smooth' })
                        }
                    }
                }
            })
        } else {
            this.setState({ validationError: "Please provide a valid number (10 digits)" })
        }
    }

    verifyOTP() { //verify user entered otp
        let parsed = queryString.parse(this.props.location.search)
        let self = this
        if (!this.state.otp) {
            this.setState({ validationError: "Please enter OTP" })
            return
        }
        if(this.state.otp.length < 6 || this.state.otp.length > 6){
            this.setState({ validationError: "Please enter valid OTP" })
            return   
        }
        let lead_data = parsed
        if (this.state.phoneNumber.match(/^[56789]{1}[0-9]{9}$/)) {
            this.setState({ validationError: "" })
            let extraParamsData = {}
            this.props.submitOTP(this.state.phoneNumber, this.state.otp, extraParamsData, (exists) => { // to verify user entered otp
                if (exists.code == 'invalid') {
                    this.setState({ error_message: exists.message })
                } else {
                    if (exists.token) {
                        let data = {
                            'Category': 'ConsumerApp', 'Action': 'InsuranceLoginPopupOptVerified', 'CustomerID': GTM.getUserId() || '', 'event': 'Insurance-login-popup-opt-verified'
                        }
                        GTM.sendEvent({ data: data })
                        if (Object.keys(self.props.selected_plan).length > 0) {
                            self.props.generateInsuranceLead(self.props.selected_plan ? self.props.selected_plan.id : '', this.state.phoneNumber, lead_data, this.props.selectedLocation) // to create insurance lead for matrix
                        }
                        this.props.getInsurance(false, (resp) => { // to get insurance plans
                            if (!resp.certificate) {
                                if (this.props.isLead == 'proceed') {
                                    if (exists.user_exists) {
                                        // if (this.props.identifyUserClick == 'userClick') {
                                        //     this.props.history.push('/insurance/insurance-user-details')
                                        // } else {
                                        //     this.props.closeLeadPopup()
                                        // }
                                        this.props.closeLeadPopup() // to close lead form
                                        this.props.history.push('/insurance/insurance-plan-view')
                                    } else {
                                        // if (this.props.identifyUserClick == 'userClick') {
                                        //     this.props.history.push('/insurance/insurance-user-details')
                                        // } else {
                                        //     this.props.closeLeadPopup()
                                        // }
                                        this.props.closeLeadPopup() // to close lead form
                                        this.props.history.push('/insurance/insurance-plan-view')
                                    }
                                } else {
                                    self.setState({ isLeadTrue: true })
                                    // if(document.getElementById('terms_condition')){
                                    //     document.getElementById('terms_condition').click()
                                    // }
                                }
                            }
                        })
                    }
                }

            })
        } else {
            this.setState({ validationError: "Please provide a valid number (10 digits)" })
        }
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.verifyOTP() // to verify user entered otp
        }
    }

    _handleContinuePress(e) {
        if (e.key === 'Enter') {
            if (!this.state.showOTP) {
                this.submitOTPRequest(this.state.phoneNumber,'',true,false,'one')
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
    closeSelectFromProfile(){
        let threshold_max_age 
        let threshold_min_age
        let errorMessage
        
        if(this.props.selected_plan && this.props.selected_plan.threshold && this.props.selected_plan.threshold[0]){
            if(this.props.is_child_only){
                threshold_max_age = this.props.selected_plan.threshold[0].child_max_age
                threshold_min_age = this.props.selected_plan.threshold[0].child_min_age
                errorMessage = `The age of the selected member should be between ${this.props.selected_plan.threshold[0].child_min_age} days and ${this.props.selected_plan.threshold[0].child_max_age} years`
            }else{
                threshold_max_age = this.props.selected_plan.threshold[0].max_age
                threshold_min_age = this.props.selected_plan.threshold[0].min_age
                errorMessage = `The age of the selected member should be between ${this.props.selected_plan.threshold[0].min_age} and ${this.props.selected_plan.threshold[0].max_age} years`
            }
        }
        if(this.props.is_child_only){
            if(this.state.selectedProfileAge > threshold_min_age && this.state.age < threshold_max_age){
                this.props.closePopup(this.state.profile_id, this.props.member_id, this.state.newprofile)    
            }else{
                SnackBar.show({ pos: 'bottom-center', text: errorMessage })   
            }
        }
        if(!this.props.is_child_only){
            if(this.state.selectedProfileAge > threshold_min_age && this.state.selectedProfileAge < threshold_max_age){
                this.props.closePopup(this.state.profile_id, this.props.member_id, this.state.newprofile)    
            }else{
               SnackBar.show({ pos: 'bottom-center', text: errorMessage })    
            }
        }
        
    }
    render() {
        if (this.props.isSelectprofile) {
            let currentSelectedProfiles = []
            this.props.currentSelectedInsuredMembersId.map((val, key) => {
                currentSelectedProfiles.push(val[key])
            })
            return (
                <div>
                    <div className="cancel-overlay cancel-overlay-zindex" onClick={this.props.hideSelectProfilePopup.bind(this)}></div>
                    <div className="widget cancel-appointment-div cancel-popup onscreen-scroll">
                        <div className="pop-top-heading">
                            My Family
                        <span className="float-right" style={{ cursor: 'pointer', marginRight: '10px' }} onClick={this.props.hideSelectProfilePopup.bind(this)}><img src={ASSETS_BASE_URL + "/img/customer-icons/rt-close.svg"} style={{ width: 14 }} /></span>
                        </div>
                        <div className="widget-header action-screen-header pop-padding">
                            <p className="fw-500 cancel-appointment-head"></p>
                        </div>
                        <div className="terms-condition-div onscreen-scroll">
                        </div>
                        <div className="col-12">
                            <div className="ins-form-radio insradio-on-popup">
                                {Object.entries(this.props.profiles).map(function ([key, value]) {
                                    if (currentSelectedProfiles.indexOf(parseInt(key)) == -1) {
                                        return <div key={key} className="dtl-radio">
                                            <label className="container-radio">
                                                {value.name}
                                                <input type="radio" name="profile_id" value='' id={key} data-param='profile_id' checked={this.state.profile_id === value.id} onChange={this.handleChange.bind(this, value.id, value,value.age)} />
                                                <span className="doc-checkmark"></span>
                                            </label>
                                        </div>
                                    }
                                }, this)}
                            </div>
                        </div>
                        <div className="procedures-btn-pop" onClick={this.closeSelectFromProfile.bind(this)}>
                            <button className={this.state.profile_id == '' ? 'fw-500 btn-disabled' : 'fw-500'} disabled={this.state.profile_id == '' ? 'disabled' : ''}>Done</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="col-12 col-md-7  center-column">
                    <div className={`cancel-overlay cancel-overlay-zindex ${this.props.overlayClass}`} onClick={this.props.hideLoginPopup.bind(this)}>
                    </div>
                    <section className="mobile-verification-screen p-3">
                        {
                            this.state.isLeadTrue ?
                                <div className="insu-popup-container" onClick={this.props.closeLeadPopup.bind(this)}>
                                    <div className="insu-pop-up">
                                        <img className="insPopUp" src={ASSETS_BASE_URL + "/img/tec.svg"} />
                                        <p className="ins-main-pera-text">Request Submitted</p>
                                        <p className="ins-main-pera-sub-text">Thank you for showing interest in OPD Insurance. Our customer service executive will give you a call from 0124-6073XXX.</p>
                                        <button className="insupopdonebtn" onClick={this.props.closeLeadPopup.bind(this)}>Done</button>
                                    </div>
                                </div>
                                :
                                <div className={`widget no-shadow no-round sign-up-container widget cancel-appointment-div cancel-popup ${this.props.popupClass}`}>
                                    <span className="float-right" style={{ cursor: 'pointer' }} onClick={this.props.hideLoginPopup.bind(this)}><img src={ASSETS_BASE_URL + "/img/customer-icons/rt-close.svg"} style={{ width: 14 }} /></span>

                                    <div className="ins-form-slider">
                                        <div className="one">
                                            <div className="widget-header text-center mv-header">
                                                {/*<h3 className="sign-coupon fw-700">Please login to continue</h3>*/}
                                                <h4 className="fw-500 text-md sign-up-mbl-text" style={this.props.popupClass != '' ? { color: '#fff' } : {}} >Sounds too good to be true !! But it is ! Only docprime members get to access</h4>
                                                {/*
                                                    this.props.identifyUserClick == 'userClick' ?
                                                    <h4 className="fw-500 text-md sign-up-mbl-text" style={this.props.popupClass != '' ? { color: '#fff' } : {}} >Sounds too good to be true !! But it is ! Only docprime members get to access</h4>
                                                    : this.props.identifyUserClick == 'AutoClick' ?
                                                        <div>
                                                            <h4 className="fw-500 text-md sign-up-mbl-text" style={this.props.popupClass != '' ? { color: '#fff' } : {}} >Enter your access code we’ve sent to your mobile number</h4>
                                                        </div>
                                                        : <h4 className="fw-500 text-md sign-up-mbl-text" style={this.props.popupClass != '' ? { color: '#fff' } : {}} >Please Enter your Mobile Number to proceed</h4>
                                                */}
                                            </div>
                                            <div className="widget-content text-center">
                                                {/* 
                                                    <div className="mobile-verification">
                                                        <div className="verifi-mob-iocn text-center">
                                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/mob.svg"} className="img-fluid" />
                                                        </div>
                                                    </div> 
                                                */}
                                                <div className="form-group mobile-field sup-input-pdng">
                                                    <div className="adon-group enter-mobile-number">
                                                        <input type="number" id="number" className="fc-input text-center" placeholder="10 digit mobile number" value={this.state.phoneNumber} onChange={this.inputHandler.bind(this)} name="phoneNumber" onKeyPress={this._handleContinuePress.bind(this)} disabled={this.state.showOTP ? true : false} />
                                                    </div>
                                                </div>
                                                <span className="errorMessage m-0 mb-2">{this.state.error_message}</span>
                                                <span className="errorMessage m-0 mb-2">{this.state.validationError}</span>                                                    
                                                        <React.Fragment>
                                                            <div className="text-center">
                                                                <button onClick={this.submitOTPRequest.bind(this, this.state.phoneNumber, false, true, false,'one')} disabled={this.props.otp_request_sent} className="v-btn v-btn-primary btn-sm lg-sms-btn btn-grdnt">Let’s get you in
                                                                </button>
                                                            </div>
                                                            {/* <div className="text-center">
                                                                    <button onClick={this.submitOTPRequest.bind(this, this.state.phoneNumber,false,false,true)} disabled={this.props.otp_request_sent} className="v-btn v-btn-primary btn-sm lg-wtsp-btn">
                                                                    <img className="whtsp-ico" src={ASSETS_BASE_URL +'/img/wa-logo-gr.svg'} />Verify Via Whatsapp
                                                                    </button>
                                                                </div> 
                                                            */}
                                                        </React.Fragment>
                                            </div>
                                        </div>
                                        <div className="two">
                                            <div className="widget-header text-center mv-header">
                                                {/*<h3 className="sign-coupon fw-700">Please login to continue</h3>*/}
                                                <h4 className="fw-500 text-md sign-up-mbl-text" style={this.props.popupClass != '' ? { color: '#fff' } : {}} >Enter the OTP we’ve sent to your mobile number</h4>
                                                {/*
                                                    this.props.identifyUserClick == 'userClick' ?
                                                    <h4 className="fw-500 text-md sign-up-mbl-text" style={this.props.popupClass != '' ? { color: '#fff' } : {}} >Sounds too good to be true !! But it is ! Only docprime members get to access</h4>
                                                    : this.props.identifyUserClick == 'AutoClick' ?
                                                        <div>
                                                            <h4 className="fw-500 text-md sign-up-mbl-text" style={this.props.popupClass != '' ? { color: '#fff' } : {}} >Enter your access code we’ve sent to your mobile number</h4>
                                                        </div>
                                                        : <h4 className="fw-500 text-md sign-up-mbl-text" style={this.props.popupClass != '' ? { color: '#fff' } : {}} >Please Enter your Mobile Number to proceed</h4>
                                                */}
                                            </div>
                                            <div className="widget-content text-center">
                                                {/* 
                                                    <div className="mobile-verification">
                                                        <div className="verifi-mob-iocn text-center">
                                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/mob.svg"} className="img-fluid" />
                                                        </div>
                                                    </div> 
                                                */}
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
                                                                            {this.state.enableOtpRequest?'':
                                                                            <a className="resendOtp ins-otp-resend" onClick={this.submitOTPRequest.bind(this, this.state.phoneNumber, true, this.state.smsBtnType ? true : false, !this.state.smsBtnType ? true : false, 'one')}>Resend
                                                                            </a>}
                                                                        </div>
                                                                }
                                                            </div> : ""
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
                                                        :<React.Fragment>
                                                            <div className="text-center">
                                                                <button onClick={this.submitOTPRequest.bind(this, this.state.phoneNumber, false, true, false)} disabled={this.props.otp_request_sent} className="v-btn v-btn-primary btn-sm lg-sms-btn btn-grdnt">Let’s get you in
                                                                </button>
                                                            </div>
                                                            {/* <div className="text-center">
                                                                    <button onClick={this.submitOTPRequest.bind(this, this.state.phoneNumber,false,false,true)} disabled={this.props.otp_request_sent} className="v-btn v-btn-primary btn-sm lg-wtsp-btn">
                                                                    <img className="whtsp-ico" src={ASSETS_BASE_URL +'/img/wa-logo-gr.svg'} />Verify Via Whatsapp
                                                                    </button>
                                                                </div> 
                                                            */}
                                                        </React.Fragment>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-center fw-500 p-3" style={this.props.popupClass != '' ? { fontSize: 12, color: '#fff' } : { fontSize: 12, color: '#8a8a8a' }} >By proceeding, you hereby agree to the <a href="/terms" target="_blank" style={{ color: `var(--text--primary--color)` }} >End User Agreement</a> and <a href="/privacy" target="_blank" style={{ color: `var(--text--primary--color)` }} >Privacy Policy.</a></p>
                                </div>
                        }
                    </section>
                </div>)
        }
    }
}
export default InsurancePopup