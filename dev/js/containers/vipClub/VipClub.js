import React from 'react'
import {connect} from 'react-redux'

import { sendOTP, submitOTP, resetAuth, getUserProfile, getVipList, selectVipClubPlan, generateVipClubLead, citiesData, vipPlusLead, getNearbyHospitals, toggleIPDCriteria, getTopHospitals
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
            is_gold:parsed.is_gold?parsed.is_gold:false,
            is_vip_gold:parsed.is_vip_gold?parsed.is_vip_gold:false,
            is_booking_page:parsed.booking_page?parsed.booking_page:null
        }
    }

    componentDidMount() {
        
        if (STORAGE.checkAuth()) {
            this.props.getUserProfile()
        }
        if (window) {
            window.scrollTo(0, 0)
        }
        let extraData = {
            selectedLocation: this.props.selectedLocation,
            from_vip:true,
            type:this.state.is_gold?'is_gold':'is_vip'
        }
        this.props.getNearbyHospitals(extraData);
        this.props.getTopHospitals(extraData);
        let data={}
        data.selectedLocation = this.props.selectedLocation
        data.isSalesAgent = this.state.isSalesAgent
        data.isAgent = this.state.isAgent
        data.is_gold = this.state.is_gold
        data.all = this.state.is_vip_gold
        this.props.getVipList(false,data)

    }
    render(){
        if(this.props.LOAD_VIP_CLUB  && this.props.selected_vip_plan && Object.keys(this.props.selected_vip_plan).length > 0){
            return <React.Fragment>
            
                {/*<VipGoldView {...this.props} isSalesAgent={this.state.isSalesAgent} isAgent={this.state.isAgent} source={this.state.source} is_gold={this.state.is_gold} is_vip_gold={this.state.is_vip_gold}/>*/}
            
                <VipClubView {...this.props} isSalesAgent={this.state.isSalesAgent} isAgent={this.state.isAgent} source={this.state.source} is_gold={this.state.is_gold} is_vip_gold={this.state.is_vip_gold} selected_plan={this.props.selected_vip_plan} is_booking_page={this.state.is_booking_page}/>
                       
            </React.Fragment>
        }else{
            if(this.props.vipClubList.certificate && STORAGE.checkAuth()){
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
    let { user_cities, common_utm_tags } = state.USER
    let { LOAD_VIP_CLUB, vipClubList, selected_vip_plan, odpGoldPredictedPrice, labGoldPredictedPrice } = state.VIPCLUB
    const {
        selectedLocation,
        topHospitals,
        nearbyHospitals
    } = state.SEARCH_CRITERIA_OPD
    return {
        USER, selectedLocation,LOAD_VIP_CLUB, vipClubList, selected_vip_plan, user_cities, topHospitals, nearbyHospitals, odpGoldPredictedPrice, labGoldPredictedPrice, common_utm_tags
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getVipList: (is_endorsement,data,callback) => dispatch(getVipList(is_endorsement,data,callback)),
        selectVipClubPlan: (plan,criteria, callback) => dispatch(selectVipClubPlan(plan,criteria, callback)),
        getUserProfile: () => dispatch(getUserProfile()),
        generateVipClubLead:(data,cb) =>dispatch(generateVipClubLead(data,cb)),
        sendOTP: (number,viaSms,viaWhatsapp,message_type, cb) => dispatch(sendOTP(number,viaSms,viaWhatsapp,message_type, cb)),
        submitOTP: (number, otp, cb) => dispatch(submitOTP(number, otp, cb)),
        resetAuth: () => dispatch(resetAuth()),
        citiesData: () => dispatch(citiesData()),
        vipPlusLead: (data) => dispatch(vipPlusLead(data)),
        getNearbyHospitals: (params, cb) => dispatch(getNearbyHospitals(params, cb)),
        toggleIPDCriteria: (criteria, forceAdd) => dispatch(toggleIPDCriteria(criteria, forceAdd)),
        getTopHospitals: (dataParams, cb) => dispatch(getTopHospitals(dataParams, cb))
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(VipClub)