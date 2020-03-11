import React from 'react'
import {connect} from 'react-redux'

import { sendOTP, submitOTP, resetAuth, getUserProfile, getVipList, selectVipClubPlan, generateVipClubLead, citiesData, vipPlusLead, getNearbyHospitals, toggleIPDCriteria, getTopHospitals, sendAgentWhatsupPageURL
 } from '../../actions/index.js'
import VipClubView from '../../components/vipClub/vipClubView.js'
// import VipGoldView from '../../components/vipClub/vipGoldView.js'
import Loader from '../../components/commons/Loader'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import STORAGE from '../../helpers/storage'
const queryString = require('query-string');

class VipClub extends React.Component{

    constructor(props) {
        super(props)
        const parsed = queryString.parse(this.props.location.search)
        this.state={
            isSalesAgent:parsed.utm_source,
            isAgent:parsed.is_agent ?parsed.is_agent:false,
            source:parsed.source,
            // is_gold:parsed.is_gold?parsed.is_gold:false,
            is_gold:this.props.match.url.includes('vip-gold-details'),
            is_vip_gold:parsed.is_vip_gold?parsed.is_vip_gold:false,
            is_booking_page:parsed.booking_page?parsed.booking_page:null,
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
        let extraData = {
            selectedLocation: this.props.selectedLocation,
            from_vip:true,
            type:this.state.is_gold?'is_gold':'is_vip'
        }
        this.props.getNearbyHospitals(extraData); // to get near by hospitals covered under gold or vip or near by location
        this.props.getTopHospitals(extraData);// to get near by  top hospitals covered under gold or vip or near by location
        let data={}
        data.selectedLocation = this.props.selectedLocation
        data.isSalesAgent = this.state.isSalesAgent
        data.isAgent = this.state.isAgent
        data.is_gold = this.state.is_gold
        data.all = this.state.is_vip_gold
        data.fromWhere = null
        this.props.getVipList(false,data) // to get vip plan list

    }
    render(){
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
    let { LOAD_VIP_CLUB, vipClubList, selected_vip_plan, odpGoldPredictedPrice, labGoldPredictedPrice } = state.VIPCLUB
    const {
        selectedLocation,
        topHospitals,
        nearbyHospitals
    } = state.SEARCH_CRITERIA_OPD
    return {
        USER, selectedLocation,LOAD_VIP_CLUB, vipClubList, selected_vip_plan, user_cities, topHospitals, nearbyHospitals, odpGoldPredictedPrice, labGoldPredictedPrice, common_utm_tags, user_loggedIn_number
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getVipList: (is_endorsement,data,callback) => dispatch(getVipList(is_endorsement,data,callback)),
        selectVipClubPlan: (plan,criteria, callback) => dispatch(selectVipClubPlan(plan,criteria, callback)),
        getUserProfile: () => dispatch(getUserProfile()),
        generateVipClubLead:(data) =>dispatch(generateVipClubLead(data)),
        sendOTP: (number,viaSms,viaWhatsapp,message_type, cb) => dispatch(sendOTP(number,viaSms,viaWhatsapp,message_type, cb)),
        submitOTP: (number, otp, extraParamsData,cb) => dispatch(submitOTP(number, otp,extraParamsData, cb)),
        resetAuth: () => dispatch(resetAuth()),
        citiesData: () => dispatch(citiesData()),
        vipPlusLead: (data) => dispatch(vipPlusLead(data)),
        getNearbyHospitals: (params, cb) => dispatch(getNearbyHospitals(params, cb)),
        toggleIPDCriteria: (criteria, forceAdd) => dispatch(toggleIPDCriteria(criteria, forceAdd)),
        getTopHospitals: (dataParams, cb) => dispatch(getTopHospitals(dataParams, cb)),
        sendAgentWhatsupPageURL: (dataParams, cb) => dispatch(sendAgentWhatsupPageURL(dataParams, cb))
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(VipClub)