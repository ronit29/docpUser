import React from 'react'
import {connect} from 'react-redux'

import { sendOTP, submitOTP, resetAuth, getUserProfile, saveUserDetails, saveCurrentSelectedDigitMembers } from '../../actions/index.js'
import DigitInsuranceForm from '../../components/vipClub/digitInsuranceForm.js'
import DigitStaticDataView from '../../components/vipClub/digitStaticDataView.js'
import Loader from '../../components/commons/Loader'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import STORAGE from '../../helpers/storage'
const queryString = require('query-string');

class DigitInsuranceFormPage extends React.Component{

    constructor(props) {    
        super(props)
        const parsed = queryString.parse(this.props.location.search)
        this.state={
            source:parsed.source,
            is_from_organic:parsed.fromOrganic,
            is_pb:parsed.utm_source?parsed.utm_source && parsed.utm_source.includes('policybazaar.com'):false,
            validateErrors:{},
            saveMembers:false
        }
    }

    componentDidMount() {
        
        if (STORAGE.checkAuth()) {
            this.props.getUserProfile() // to get loggedIn user profile
        }
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    componentWillReceiveProps(props){
        if(!this.state.saveMembers && Object.keys(props.selected_digit_plan).length >0 && !props.currentSelectedDigitMembersId.length){
            let loginUser
            let isDefaultUser
            let isDummyUser
            let membersId = []
            if(props.USER){
                loginUser = props.USER.defaultProfile
            }
            
            if(props.USER.profiles && Object.keys(props.USER.profiles).length && props.USER.profiles[props.USER.defaultProfile]){
                isDefaultUser = props.USER.profiles[props.USER.defaultProfile].is_default_user
                isDummyUser = props.USER.profiles[props.USER.defaultProfile].isDummyUser
            }
            if(!isDummyUser){
                membersId.push({'0':loginUser, type: 'self',member_form_id:0,isUserSelectedProfile:false,to_be_remove:false})
            }else{
                membersId.push({'0':0, type:'self',member_form_id:0,isUserSelectedProfile:false,to_be_remove:false})
            }
            props.saveCurrentSelectedDigitMembers(membersId) // save current visible form member or selected user profile id
            this.setState({ saveMembers: true })
        }
    }

    proceed(isSms, extraDataParams = {}) { //new
        let success_id
        let data = {}
        let pushData = {}
        let isDummyUser
        let self_profile = {}
        let is_disable = false
        let member_ref = ''
        let validatingErrors = {}
        let param
        let parsed = queryString.parse(this.props.location.search)
        if (this.props.selected_digit_plan && Object.keys(this.props.selected_digit_plan).length > 0 && this.props.digit_self_details && Object.keys(this.props.digit_self_details).length > 0) {
            data.plan_id = this.props.selected_digit_plan.id
            data.members = []
            let fields = []
            this.props.currentSelectedDigitMembersId.map((val, key) => {
                console.log('rishab')
                if (Object.keys(this.props.digit_self_details).length > 0) {
                    fields = []
                    param = this.props.digit_self_details[val[key]]
                    if (param && Object.keys(param).length > 0) {
                        //common validation starts

                        if (param.name == "") {
                            is_disable = true
                            fields.push('name')
                        }
                        if (param.last_name == "") {
                            is_disable = true
                            fields.push('last_name')
                        }

                        if (param.title == "") {
                            is_disable = true
                            fields.push('title')
                        }
                        if (param.pincode == "") {
                            is_disable = true
                            fields.push('pincode')
                        }

                        if (param.phone_number == "") {
                            is_disable = true
                            fields.push('phone_number')
                        }

                        if (param.address == "") {
                            is_disable = true
                            fields.push('address')
                        }

                        if (param.nominee_name == "") {
                            is_disable = true
                            fields.push('nominee_name')
                        }

                        if (param.nominee_relation == "") {
                            is_disable = true
                            fields.push('nominee_relation')
                        }

                        // if (param.dob == null || param.dob == "") {
                        //     is_disable = true
                        //     fields.push('dob')
                        // }

                        if (param.email != '' && param.relation == 'self') {
                            let validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            validEmail = validEmail.test(param.email)
                            if (!validEmail) {
                                is_disable = true
                                fields.push('email')
                            }
                        }
                    }
                    validatingErrors[param.id] = fields
                }
            })
            console.log(validatingErrors)
            Object.keys(validatingErrors).forEach(function (key) {
                if (validatingErrors[key].length > 0) {
                    is_disable = true
                    member_ref = `member_${key}`
                }
            });
            this.setState({ validateErrors: validatingErrors })
            if (is_disable && document.getElementById(member_ref)) {
                document.getElementById(member_ref).scrollIntoView();
            } else {
                alert('s')
            }

        }
    }

    render(){
        return (
            <React.Fragment>
                <div>
                    <div className="profile-body-wrap">
                    <ProfileHeader showPackageStrip={true} />
                        <section className="container article-container bottomMargin">
                            <div className="row main-row parent-section-row justify-content-center">
                                <div className="col-12 col-md-10 col-lg-10 center-column">
                                    <div className="container-fluid mt-20">
                                        <div>
                                            {/* ==================== top section with icons and listing ==================== */}
                                            <DigitStaticDataView /> 
                                            {/* ==================== top section with icons and listing ==================== */}
                                            {/* ==================== Steps Container ==================== */}
                                            <div className="widget mrb-10 digi-step">
                                                <div className="ins-status-container">
                                                    <div className="navigation_menu" id="">
                                                        <ul className="navigation_tabs" id="">
                                                            <li className="tab_inactive">
                                                                <a href="#">Choose Your Plan</a>
                                                            </li>
                                                            <li className='tab_inactive'>
                                                                <a href="#">Fill Member Details</a>
                                                            </li>
                                                            <li className="tab_disabled">
                                                                <a href="#">Payment</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <DigitInsuranceForm {...this.props} />
                                            <div className="term-cont-digi">
                                                <label className="ck-bx" htmlform="test11" style={{ 'fontWeight': '500', 'fontSize': '13px' }}>
                                                    <input type="checkbox" defaultChecked className="ins-chk-bx" value="" id="test11" name="fruit-1" />
                                                    <span className="checkmark"></span>I Agree to the </label>
                                                <p onClick={this.openPopup}>Terms and Conditions</p>
                                            </div>
                                            <div className="bottomMargin"></div>
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                            {/* ==================== Common button ==================== */}
                            <div className="sticky-btn fixed insuBtnsContainer">
                                <button className="insu-right-orng-btn ins-buy-btn" onClick={()=>this.proceed()}>Buy Now</button>
                            </div>
                            {/* ==================== Common button ==================== */}
                        </section>
                    </div>
                </div>
            </React.Fragment>
        );

    }
}

const mapStateToProps = (state) => {
    const USER = state.USER
    let { common_utm_tags, user_loggedIn_number } = state.USER
    let {  digitPlans,selected_digit_plan,digit_self_details,currentSelectedDigitMembersId } = state.VIPCLUB


    return {
        USER,  common_utm_tags, user_loggedIn_number, selected_digit_plan,digitPlans, digit_self_details,currentSelectedDigitMembersId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
        getUserProfile: () => dispatch(getUserProfile()),
        sendOTP: (number,viaSms,viaWhatsapp,message_type, cb) => dispatch(sendOTP(number,viaSms,viaWhatsapp,message_type, cb)),
        submitOTP: (number, otp, extraParamsData,cb) => dispatch(submitOTP(number, otp,extraParamsData, cb)),
        resetAuth: () => dispatch(resetAuth()),
        saveUserDetails:(self_data,criteria,forceadd) => dispatch(saveUserDetails(self_data,criteria,forceadd)),
        saveCurrentSelectedDigitMembers:(data,cb) => dispatch(saveCurrentSelectedDigitMembers(data,cb)),
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(DigitInsuranceFormPage)