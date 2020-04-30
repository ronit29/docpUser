import React from 'react'
import {connect} from 'react-redux'

import { sendOTP, submitOTP, resetAuth, getUserProfile, retrieveDigitPlanData } from '../../actions/index.js'
import digitPlanView from '../../components/digitInsurance/digitPlanView.js'
import Loader from '../../components/commons/Loader'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import STORAGE from '../../helpers/storage'
const queryString = require('query-string');

class digitInsurance extends React.Component{

    constructor(props) {
        super(props)
        const parsed = queryString.parse(this.props.location.search)
        this.state={
            source:parsed.source,
            is_from_organic:parsed.fromOrganic,
            is_pb:parsed.utm_source?parsed.utm_source && parsed.utm_source.includes('policybazaar.com'):false
        }
    }

    componentDidMount() {
        
        if (STORAGE.checkAuth()) {
            this.props.getUserProfile() // to get loggedIn user profile
        }
        if (window) {
            window.scrollTo(0, 0)
        }
        
        this.props.retrieveDigitPlanData()
    }

    render(){
        this.props.digitPlans
        if(this.props.LOAD_VIP_CLUB  && this.props.selected_vip_plan && Object.keys(this.props.selected_vip_plan).length > 0){
            return <React.Fragment>
            
                {/*<VipGoldView {...this.props} isSalesAgent={this.state.isSalesAgent} isAgent={this.state.isAgent} source={this.state.source} is_gold={this.state.is_gold} is_vip_gold={this.state.is_vip_gold}/>*/}
            
                <VipClubView {...this.props} isSalesAgent={this.state.isSalesAgent} isAgent={this.state.isAgent} source={this.state.source} is_gold={this.state.is_gold} is_vip_gold={this.state.is_vip_gold} selected_plan={this.props.selected_vip_plan} is_booking_page={this.state.is_booking_page} is_from_organic={this.state.is_from_organic} is_pb={this.state.is_pb}/>
                       
            </React.Fragment>
        }else{
            if(this.props.vipClubList.certificate && STORAGE.checkAuth()){ // if already gold or vip user redirect to dashboard
                this.props.history.replace('/vip-club-activated-details')
            }
            if(this.state.isSalesAgent && this.state.isAgent){
                return <div className="profile-body-wrap">
                        <Loader />
                        </div>
            }else{
                return <div className="profile-body-wrap">
                    <ProfileHeader showPackageStrip={true}/>
                    <Loader />
                </div>
            }               
        }
    }
}

const mapStateToProps = (state) => {
    const USER = state.USER
    let { user_cities, common_utm_tags, user_loggedIn_number } = state.USER
    let { LOAD_VIP_CLUB, vipClubList, selected_vip_plan, odpGoldPredictedPrice, labGoldPredictedPrice, digitPlans } = state.VIPCLUB
    const {
        selectedLocation,
        topHospitals,
        nearbyHospitals
    } = state.SEARCH_CRITERIA_OPD

    return {
        USER, selectedLocation,LOAD_VIP_CLUB, vipClubList, selected_vip_plan, user_cities, topHospitals, nearbyHospitals, odpGoldPredictedPrice, labGoldPredictedPrice, common_utm_tags, user_loggedIn_number, digitPlans
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
        getUserProfile: () => dispatch(getUserProfile()),
        sendOTP: (number,viaSms,viaWhatsapp,message_type, cb) => dispatch(sendOTP(number,viaSms,viaWhatsapp,message_type, cb)),
        submitOTP: (number, otp, extraParamsData,cb) => dispatch(submitOTP(number, otp,extraParamsData, cb)),
        resetAuth: () => dispatch(resetAuth()),
        retrieveDigitPlanData: () => dispatch(retrieveDigitPlanData()),
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(digitInsurance)