import React from 'react';
const queryString = require('query-string');

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import Calendar from 'rc-calendar';
import WhatsAppOptinView from '../../commons/WhatsAppOptin/WhatsAppOptinView.js'
const moment = require('moment');
import Disclaimer from '../../commons/Home/staticDisclaimer.js'
import NewDateSelector from '../../commons/newDateSelector.js'

const stepperStyle = {
    padding: 60,
    paddingBottom: 0,
    paddingTop: 10,
}


class UserSignupView extends React.Component {
    constructor(props) {
        super(props)

        let existingUser = false
        if (this.props.location.search.includes('existing')) {
            // create profile scenario
            existingUser = true
        }

        const parsed = queryString.parse(this.props.location.search)

        this.state = {
            name: '',
            age: '',
            gender: 'm',
            email: '',
            dob:'',
            formattedDate: '',
            phone_number: this.props.phoneNumber || '',
            existingUser,
            showMedical: false,
            err: "",
            referralCode: parsed.referral || null,
            have_referralCode: !!parsed.referral,
            dateModal: false,
            whatsapp_optin:true,
            isDobValidated:false,
            is_dob_error:false,
            primary_profile:{},
            add_to_gold:false,
            gold_user_profile:{},
            toUpdateState:true
        }
    }

    componentDidMount(){
        let default_profile
        let gold_user_profile = {}
        if(this.props.USER && this.props.USER.profiles && Object.keys(this.props.USER.profiles).length && this.props.USER.defaultProfile && this.props.USER.profiles[this.props.USER.defaultProfile] && Object.keys(this.props.USER.profiles[this.props.USER.defaultProfile]).length > 0){ 
               default_profile = this.props.USER.profiles[this.props.USER.defaultProfile]   
               Object.entries(this.props.USER.profiles).map(function([key, value]) {
                    if(!value.isDummyUser && value.is_vip_gold_member){
                        gold_user_profile = value
                    } 
                })
               this.setState({primary_profile:default_profile,gold_user_profile:gold_user_profile})
        }
    }

    componentWillReceiveProps(props){
        let default_profile
        let gold_user_profile = {}
        if(this.props.USER && this.props.USER.profiles && Object.keys(this.props.USER.profiles).length && this.props.USER.defaultProfile && this.props.USER.profiles[this.props.USER.defaultProfile] && Object.keys(this.props.USER.profiles[this.props.USER.defaultProfile]).length > 0 && this.state.toUpdateState){ 
               default_profile = this.props.USER.profiles[this.props.USER.defaultProfile]   
               Object.entries(this.props.USER.profiles).map(function([key, value]) {
                    if(!value.isDummyUser && value.is_vip_gold_member){
                        gold_user_profile = value
                    } 
                })
               this.setState({primary_profile:default_profile,gold_user_profile:gold_user_profile,toUpdateState:false})
        }
    }

    inputHandler(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    toggleReferral(e) {
        this.setState({ have_referralCode: e.target.checked })
    }

    toggleWhatsap(status,e) {
        this.setState({ whatsapp_optin: status })
    }

    selectDateFromCalendar(date) {
        if (date) {
            date = date.toDate()
            let formattedDate = this.getFormattedDate(date)
            date = new Date(date).toISOString().split('T')[0]
            this.setState({ dob: date, formattedDate:formattedDate, dateModal: false})
        } else {
            this.setState({ dateModal: false })
        }
    }

    getFormattedDate(date){
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

    openCalendar(){
        this.setState({dateModal:true})
    }

    submitForm() {
        this.setState({ err: "" })
        // validate
        let register = true
        Object.keys(this.refs).forEach((prp, i) => {
            let validated = false
            switch (this.refs[prp].name) {
                case "name": {
                    if (!this.refs[prp].value) {
                        validated = false
                    } else {
                        validated = !/[^a-zA-Z ]/.test(this.refs[prp].value)
                    }
                    break
                }
                // case "phone_number": {
                //     if (!!this.refs[prp].value) {
                //         validated = this.refs[prp].value.match(/^[56789]{1}[0-9]{9}$/)
                //     } else {
                //         validated = true
                //     }
                //     break
                // }
                case "email": {
                    if (!this.refs[prp].value) {
                        validated = false
                    } else {
                        validated = this.refs[prp].value.match(/\S+@\S+\.\S+/)
                    }
                    break
                }
                /*case "dob": {
                    validated = this.state.isDobValidated
                    break
                }*/
                default: {
                    validated = true
                    break
                }
            }
            if (validated) {
                this.refs[prp].style.border = ''
            } else {
                this.refs[prp].style.border = '1px solid red'
                register = false
            }
        })
        if(this.state.dob == null && !this.state.isDobValidated){
            register = false
            this.setState({is_dob_error:true})
        }
        if(this.state.dob != null && !this.state.isDobValidated){
            register = false
            this.setState({is_dob_error:true})
        }
        if (register) {
            let post_data = this.state
            if (this.state.referralCode && this.state.have_referralCode) {
                post_data["referral_code"] = this.state.referralCode
            }
            this.props.createProfile(post_data, (err, res) => {
                if (!err) {
                    // this.props.resetVipData()
                    // this.setState({ showMedical: true })
                    const parsed = queryString.parse(this.props.location.search)
                    if (parsed.callback) {
                        this.props.history.replace(parsed.callback)
                    } else {
                        if (this.state.referralCode && this.state.have_referralCode) {
                            this.props.history.replace('/user')
                        } else {
                            this.props.history.go(-1)
                        }
                    }
                } else {
                    let message = "Error signing up user."
                    if (err.message) {
                        message = err.message
                    }
                    this.setState({ err: message })
                }
            })
        }
    }

    handleEnterPress(e) {
        if (e.key === 'Enter') {
            this.submitForm();
        }
    }

    getNewDate(type,newDate,isValidDob){
        this.setState({dob:newDate,isDobValidated:isValidDob})
    }

    addToGold(value){
        this.setState({add_to_gold:value})
    }

    render() {
        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">

                                        <section className="validation-book-screen">

                                            {
                                                !this.state.showMedical ?
                                                    <div className="widget mrng-top-12 mrb-15">
                                                        <div className="widget-content">
                                                            <form className="go-bottom" >

                                                                {/*<div className="labelWrap">
                                                                    <input id="number" name="phone_number" type="text" onChange={this.inputHandler.bind(this)} value={this.state.phone_number} required ref="phone_number" onKeyPress={this.handleEnterPress.bind(this)} />
                                                                    <label htmlFor="number">Mobile Number</label>
                                                                </div>*/}
                                                                <div className="d-flex">
                                                                    <p className={`label-names-buttons ${this.state.gender == 'm'?'btn-active':''}`} name="gender" checked={this.state.gender == 'm'} onClick={() => this.setState({ 'gender': 'm' })}>Male</p>
                                                                    <p className={`label-names-buttons ${this.state.gender == 'f'?'btn-active':''}`} name="gender" checked={this.state.gender == 'f'} onClick={() => this.setState({ 'gender': 'f' })}>Female</p>
                                                                </div>
                                                                <div className="labelWrap">
                                                                    <input id="fname" name="name" type="text" value={this.state.name} onChange={this.inputHandler.bind(this)} required ref="name" onKeyPress={this.handleEnterPress.bind(this)} />
                                                                    <label htmlFor="fname">{this.state.existingUser ? "Member" : "Patient"} Name</label>
                                                                    <span className="text-xs text-light">(Appointment valid only for the provided name)</span>
                                                                </div>
                                                                {/*<div className="labelWrap">
                                                                    <input id="dob" name="dob" type="text" value={this.state.formattedDate} onClick={this.openCalendar.bind(this)} required ref="dob" onKeyPress={this.handleEnterPress.bind(this)} onFocus={this.openCalendar.bind(this)}/>
                                                                    <label htmlFor="dob">Date of Birth</label>
                                                                </div>*/}
                                                                 <NewDateSelector {...this.props} getNewDate={this.getNewDate.bind(this)} is_dob_error={this.state.is_dob_error}/>

                                                                {   
                                                                    this.state.dateModal ? <div className="calendar-overlay"><div className="date-picker-modal">
                                                                        <Calendar
                                                                            showWeekNumber={false}
                                                                            defaultValue={moment(new Date())}
                                                                            disabledDate={(date) => {
                                                                                return date.diff(moment((new Date)), 'days') > -1
                                                                            }}
                                                                            showToday
                                                                            onSelect={this.selectDateFromCalendar.bind(this)}
                                                                        />
                                                                    </div></div> : ""
                                                                }
                                                                {this.state.primary_profile && Object.keys(this.state.primary_profile).length > 0 && this.state.primary_profile.is_default_user && !this.state.primary_profile.email ?<div className="labelWrap">
                                                                    <input id="email" name="email" type="email" value={this.state.email} onChange={this.inputHandler.bind(this)} required ref="email" onKeyPress={this.handleEnterPress.bind(this)} />
                                                                    <label htmlFor="email">Email</label>
                                                                </div>:''}
                                                                {/*<div className="referral-select">
                                                                    <label className="ck-bx" style={{ fontWeight: '600', fontSize: '14px' }}>I have a referral code<input type="checkbox" onClick={this.toggleReferral.bind(this)} checked={this.state.have_referralCode} /><span className="checkmark"></span></label>
                                                                </div>*/}

                                                                {
                                                                    /*this.state.have_referralCode ? <div className="referralContainer">
                                                                        <div className="slt-nw-input">
                                                                            <input style={{ paddingRight: '80px' }} type="text" className="slt-text-input" onChange={this.inputHandler.bind(this)} placeholder="Enter here" name="referralCode" value={this.state.referralCode} />
                                                                        </div>
                                                                    </div> : ""*/
                                                                }
                                                                {
                                                                this.state.gold_user_profile && Object.keys(this.state.gold_user_profile).length && this.state.gold_user_profile.vip_data && Object.keys(this.state.gold_user_profile.vip_data).length && this.state.gold_user_profile.vip_data.total_members_allowed > 0 && !this.state.primary_profile.isDummyUser && this.state.gold_user_profile.vip_data.is_member_allowed?
                                                                <div className="defaultProfile">
                                                                    <label className="ck-bx add-member-chkbx"> 
                                                                        <span>
                                                                            Add this member to Docprime
                                                                            <img className="ml-2" width="35" src="https://cdn.docprime.com/cp/assets/img/gold-lg.png"  alt="gold"/>
                                                                        </span><br/>
                                                                        <span className="profile-warning-text">Once added to gold, you cannont edit or remove the member</span>
                                                                        <input type="checkbox" onClick={this.addToGold.bind(this, !this.state.add_to_gold)} checked={
                                                                        this.state.add_to_gold}/>
                                                                        <span className="checkmark"></span>
                                                                    </label>
                                                                </div>
                                                                :''
                                                                }
                                                            </form>
                                                        </div>
                                                    </div> : ""
                                            }

                                            <WhatsAppOptinView {...this.props} toggleWhatsap={this.toggleWhatsap.bind(this)} isUserProfile={true}/>
                                        </section>

                                        <span className="errorMessage">{this.state.err}</span>
                                        <span className="errorMessage">{this.props.error_message}</span>

                                        {
                                            this.state.showMedical ?
                                                <button className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg static-btn">Done</button>
                                                :
                                                <button className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg static-btn" onClick={this.submitForm.bind(this)}>Done</button>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>

                        <RightBar noChatButton={true} />
                    </div>
                </section>
                <Disclaimer />
            </div>
        );
    }
}


export default UserSignupView
