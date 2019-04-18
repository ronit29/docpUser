import React from 'react'
const queryString = require('query-string');

class InsurancePopup extends React.Component{
	constructor(props) {
        super(props)
        this.state = {
            profile_id:'',
            newprofile:{},
            phoneNumber: '',
            validationError: '',
            showOTP: false,
            otp: "",
            otpTimeout: false,
            error_message:'',
            isLeadTrue:false
        }
    }
    handleChange(profileid,newProfile,event) {
        let newProfileNames={}
        let newName =  newProfile.name.split(" ")
        if(newName.length == 2){
            newProfileNames.name = newName[0]
            if(!this.props.self_data_values.no_lname){
                newProfileNames.middle_name = ''
                newProfileNames.last_name = newName[1]
            }else{
                newProfileNames.middle_name = ''
                newProfileNames.last_name = ''
            }
        }else if(newName.length ==3){
            newProfileNames.name = newName[0]
            if(!this.props.self_data_values.no_lname){
                newProfileNames.middle_name = newName[1]
                newProfileNames.last_name = newName[2]
            }else{
                newProfileNames.middle_name = ''
                newProfileNames.last_name = ''
            }    
        }else{
            newProfileNames.name = newName[0]
            if(!this.props.self_data_values.no_lname){
                newProfileNames.middle_name = ''
                newProfileNames.last_name = ''
            }else{
                newProfileNames.middle_name = ''
                newProfileNames.last_name = ''
            }
        }
        let exactProfile = { ...newProfile, ...newProfileNames }
        this.setState({
            profile_id : profileid, newprofile : exactProfile
        })
    }
    inputHandler(e) {
        if (this.state.showOTP && e.target.name == 'phoneNumber') {
            this.setState({ [e.target.name]: e.target.value, validationError: "", showOTP: false, otp: "" })
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    submitOTPRequest(number) {
        if (number.match(/^[56789]{1}[0-9]{9}$/)) {
            if(this.props.isLead == 'proceed'){

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
            }else{
                document.getElementsByClassName('mv-header')[0].classList.add('d-none')
                document.getElementsByClassName('widget-content')[0].classList.add('d-none')
                this.setState({ isLeadTrue:true })    
                // this.props.generateInsuranceLead(this.props.selected_plan?this.props.selected_plan.id:'',()=>{

                // })
                
            } 
        } else {
            this.setState({ validationError: "Please provide a valid number (10 digits)" })
        }
    }

    verifyOTP() {
        let self = this
        if (!this.state.otp) {
            this.setState({ validationError: "Please enter OTP" })
            return
        }
        if (this.state.phoneNumber.match(/^[56789]{1}[0-9]{9}$/)) {
            this.setState({ validationError: "" })
            this.props.submitOTP(this.state.phoneNumber, this.state.otp, (exists) => {
                if(exists.code == 'invalid'){
                    this.setState({error_message:exists.message})
                }else{
                    this.props.getInsurance((resp)=>{
                        if(!resp.certificate){
                            if(Object.keys(self.props.selected_plan).length > 0){
                                self.props.generateInsuranceLead(self.props.selected_plan?self.props.selected_plan.id:'',()=>{
                                })
                            }
                            if (exists.user_exists) {
                                this.props.history.push('/insurance/insurance-user-details')
                            }else{
                                this.props.history.push('/insurance/insurance-user-details')    
                            }
                        }
                        
                    })
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
            if(!this.state.showOTP){
                this.submitOTPRequest(this.state.phoneNumber)
            }
        }
    }
	render(){
        if(this.props.isSelectprofile){
        let currentSelectedProfiles = []
        this.props.currentSelectedInsuredMembersId.map((val,key) => {
            currentSelectedProfiles.push(val[key])
        })
        return (            
            <div>
                <div className="cancel-overlay" onClick={this.props.hideSelectProfilePopup.bind(this)}></div>
                <div className="widget cancel-appointment-div cancel-popup onscreen-scroll">
                    <div className="pop-top-heading">
                        My Family                        
                        <span className="float-right" style={{cursor: 'pointer', marginRight: '10px'}} onClick={this.props.hideSelectProfilePopup.bind(this)}><img src={ASSETS_BASE_URL + "/img/customer-icons/rt-close.svg"} style={{ width: 14 }} /></span>
                    </div>
                    <div className="widget-header action-screen-header pop-padding">
                        <p className="fw-500 cancel-appointment-head"></p>
                    </div>
                    <div className="terms-condition-div onscreen-scroll">
                    </div>
                    <div className="col-12">
                        <div className="ins-form-radio insradio-on-popup">
                            {Object.entries(this.props.profiles).map(function([key, value]) {
                                if(currentSelectedProfiles.indexOf(parseInt(key)) ==-1){
                            return <div key={key} className="dtl-radio">
                                    <label className="container-radio">
                                    {value.name}
                                    <input type="radio"  name="profile_id" value='' id={key} data-param='profile_id' checked={this.state.profile_id === value.id} onChange={this.handleChange.bind(this,value.id,value)}/>
                                    <span className="doc-checkmark"></span>
                                    </label>
                            </div>
                            }
                        },this)}
                        </div>
                    </div>
                    <div className="procedures-btn-pop" onClick={()=>this.props.closePopup(this.state.profile_id,this.props.member_id,this.state.newprofile)}>
                        <button className= {this.state.profile_id == ''?'fw-500 btn-disabled':'fw-500'} disabled={this.state.profile_id == ''?'disabled':''}>Done</button>
                    </div>
                </div>
            </div>
            )
        }else{
            return (
            <div className="col-12 col-md-7  center-column">
                    <div className="cancel-overlay" onClick={this.props.hideLoginPopup.bind(this)}>
                    </div>
                    <section className="mobile-verification-screen p-3">
                        <div className="widget no-shadow no-round sign-up-container widget cancel-appointment-div cancel-popup">
                            <span className="float-right" style={{cursor: 'pointer', marginRight: '10px'}} onClick={this.props.hideLoginPopup.bind(this)}><img src={ASSETS_BASE_URL + "/img/customer-icons/rt-close.svg"} style={{ width: 14 }} /></span>
                            {   
                                this.state.isLeadTrue?
                                <div><p>will get back to you soon</p></div>
                                :''
                            }                    
                            <div className="widget-header text-center mv-header">
                                {/*<h3 className="sign-coupon fw-700">Please login to continue</h3>*/}
                                <h4 className="fw-500 text-md sign-up-mbl-text">Enter your Mobile Number</h4>
                            </div>
                            <div className="widget-content text-center">
                                <div className="mobile-verification">
                                    <div className="verifi-mob-iocn text-center">
                                        <img src={ASSETS_BASE_URL + "/img/customer-icons/mob.svg"} className="img-fluid" />
                                    </div>
                                </div>
                                <div className="form-group mobile-field sup-input-pdng">
                                    <div className="adon-group enter-mobile-number">
                                        <input type="number" className="fc-input text-center" placeholder="10 digit mobile number" value={this.state.phoneNumber} onChange={this.inputHandler.bind(this)} name="phoneNumber" onKeyPress={this._handleContinuePress.bind(this)}/>
                                    </div>

                                    {
                                        this.state.showOTP ? <div className="adon-group enter-mobile-number">
                                            <br /><br />
                                            <input type="number" className="fc-input text-center" placeholder="Enter OTP" value={this.state.otp} onChange={this.inputHandler.bind(this)} name="otp" onKeyPress={this._handleKeyPress.bind(this)}/>
                                            {
                                                this.state.otpTimeout ? "" : <a className="resendOtp" onClick={this.submitOTPRequest.bind(this, this.state.phoneNumber)}>Resend ?</a>
                                            }
                                        </div> : ""
                                    }
                                </div>
                                <span className="errorMessage m-0 mb-2">{this.state.error_message}</span>
                                <span className="errorMessage m-0 mb-2">{this.state.validationError}</span>
                                {
                                    this.state.showOTP ?
                                        <div className="text-center">
                                            <button onClick={this.verifyOTP.bind(this)} disabled={this.props.submit_otp} className="v-btn v-btn-primary btn-sm">
                                                Verify
                                        </button>
                                        </div> :
                                        <div className="text-center">
                                            <button onClick={this.submitOTPRequest.bind(this, this.state.phoneNumber)} disabled={this.props.otp_request_sent} className="v-btn v-btn-primary btn-sm">
                                                {
                                                    this.props.isLead == 'proceed'?'Continue':'Submit'
                                                }
                                        </button>
                                        </div>
                                }
                            </div>

                            <p className="text-center fw-500 p-3" style={{ fontSize: 12, color: '#8a8a8a' }} >By proceeding, you hereby agree to the <a href="/terms" target="_blank" style={{ color: '#f78631' }} >End User Agreement</a> and <a href="/privacy" target="_blank" style={{ color: '#f78631' }} >Privacy Policy.</a></p>
                        </div>
                    </section>
            </div> )
        }
    }
}
export default InsurancePopup