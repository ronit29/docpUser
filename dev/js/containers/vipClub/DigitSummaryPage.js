import React from 'react'
import {connect} from 'react-redux'

import { sendOTP, submitOTP, resetAuth, getUserProfile, digitPay } from '../../actions/index.js'
import DigitSummaryView from '../../components/vipClub/digitSummaryView.js'
import DigitStaticDataView from '../../components/vipClub/digitStaticDataView.js'
import Loader from '../../components/commons/Loader'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import STORAGE from '../../helpers/storage'
import SnackBar from 'node-snackbar'
const queryString = require('query-string');
import PaymentForm from '../../components/commons/paymentForm'

class DigitSummaryPage extends React.Component{

    constructor(props) {    
        super(props)
        const parsed = queryString.parse(this.props.location.search)
        this.state={
            source:parsed.source,
            is_from_organic:parsed.fromOrganic,
            is_pb:parsed.utm_source?parsed.utm_source && parsed.utm_source.includes('policybazaar.com'):false,
            paymentData:null
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
        if(STORAGE.checkAuth() === false || !Object.keys(this.props.selected_digit_plan).length > 0){
            this.props.history.push('/covid-plans')
        }
    }

    proceed(){

        if (this.props.selected_digit_plan && Object.keys(this.props.selected_digit_plan).length > 0 && this.props.digit_self_details && Object.keys(this.props.digit_self_details).length > 0) {
            var members = {}
            let param
            let data = {}
            data.insurance_plan = this.props.selected_digit_plan.id
            data.members = []
            this.props.currentSelectedDigitMembersId.map((val, key) => {
                if (Object.keys(this.props.digit_self_details).length > 0) {
                    param = this.props.digit_self_details[val[key]]
                    if(param.id){
                        members = {}
                        members.title = param.title
                        members.first_name = param.name
                        members.middle_name = param.middle_name
                        members.last_name = param.last_name
                        members.email = param.email
                        members.dob = param.dob
                        members.gender = param.gender
                        members.mobile = param.phone_number
                        members.nominee_name = param.nominee_name
                        members.nominee_relation = param.nominee_relation
                        members.pincode = param.pincode
                        members.profile = param.profile_id
                        members.id = param.id
                        members.address = param.address
                        data.members.push(members)
                        this.props.digitPay(data, (resp) => { // to request for payment

                            if (resp && resp.error) {
                                SnackBar.show({ pos: 'bottom-center', text: resp.error })
                                return
                            }
                            if (resp.payment_required) {
                                this.processPayment(resp)
                            } else {
                                if(resp && resp.data){
                                    // alert('no payment')
                                    success_id = '/covid-order/summary/'+resp.data.id+'?payment_success=true'
                                    this.props.history.push(success_id)
                                }
                            }
                        })
                    }
                }
            })
        }
    }

    processPayment(data) {
        if (data && data.status) {
            this.setState({ paymentData: data.data }, () => {
                setTimeout(() => {
                    if (document.getElementById('paymentForm') && Object.keys(this.state.paymentData).length > 0) {
                        let form = document.getElementById('paymentForm')
                        form.submit()
                    }
                }, 500)
            })
        }
    }

    render(){
        let selfDataObj = null;
        if(Object.keys(this.props.digit_self_details).length>0){
            selfDataObj = this.props.digit_self_details[Object.keys(this.props.digit_self_details)[0]]; 
        }
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
                                            {/* <DigitStaticDataView />  */}
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
                                                            <li className="tab_inactive">
                                                                <a href="#">Payment</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            { selfDataObj!= null ? <DigitSummaryView selfdata={selfDataObj} plandata={this.props.selected_digit_plan}/> : ''}
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                            {/* ==================== Common button ==================== */}
                            <div className="sticky-btn fixed insuBtnsContainer">
                                <button className="insu-right-orng-btn ins-buy-btn" onClick={()=>this.proceed()}>Make Payment</button>
                            </div>
                            {/* ==================== Common button ==================== */}
                        </section>
                    </div>
                    {
                    this.state.paymentData ? <PaymentForm paymentData={this.state.paymentData} refs='digit' /> : ""
                    }
                </div>
            </React.Fragment>
        );

    }
}

const mapStateToProps = (state) => {
    const USER = state.USER
    let { common_utm_tags, user_loggedIn_number } = state.USER
    let {  selected_digit_plan,digit_self_details,currentSelectedDigitMembersId } = state.VIPCLUB

    return {
        USER,  common_utm_tags, user_loggedIn_number,selected_digit_plan,digit_self_details,currentSelectedDigitMembersId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
        getUserProfile: () => dispatch(getUserProfile()),
        sendOTP: (number,viaSms,viaWhatsapp,message_type, cb) => dispatch(sendOTP(number,viaSms,viaWhatsapp,message_type, cb)),
        submitOTP: (number, otp, extraParamsData,cb) => dispatch(submitOTP(number, otp,extraParamsData, cb)),
        resetAuth: () => dispatch(resetAuth()),
        digitPay:(data,cb) => dispatch(digitPay(data,cb))
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(DigitSummaryPage)