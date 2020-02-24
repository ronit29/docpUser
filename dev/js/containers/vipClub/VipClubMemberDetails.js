import React from 'react'
import {connect} from 'react-redux'

import { userDetails, saveCurrentSelectedVipMembers, citiesData, selectVipUserProfile, vipClubPay, addVipMembersData, uploadVipProof, removeVipMemberProof, storeVipMemberProofs, pushMembersData, retrieveMembersData, selectVipClubPlan, resetVipData, vipPlusLead, sendAgentBookingUR, clearVipMemeberData, getCoupons, applyCouponDiscount, removeVipCoupons, sendAgentBookingURL, getVipList,removeMembers } from '../../actions/index.js'
import VipClubMemberDetailsView from '../../components/vipClub/vipClubMemberDetailsView.js'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import Loader from '../../components/commons/Loader'
import STORAGE from '../../helpers/storage'
const queryString = require('query-string');

class VipClubMemberDetails extends React.Component{
    
    constructor(props) {
        super(props)
        const parsed = queryString.parse(this.props.location.search)
        this.state={
            isSalesAgent:parsed.utm_source,
            isAgent:parsed.is_agent || false,
            // is_gold:parsed.is_gold || false,
            is_gold:this.props.match.url.includes('vip-gold-details'),
            is_from_payment:parsed.is_from_payment?parsed.is_from_payment:false,
            is_vip_gold:parsed.is_vip_gold?parsed.is_vip_gold:false,
            is_navigate_to_form:false,
            is_user_alrdy_gold:false
        }
    }

    componentDidMount() {
        let extraParams = {}
        let data={}
        data.selectedLocation = this.props.selectedLocation
        data.isSalesAgent = this.state.isSalesAgent
        data.isAgent = this.state.isAgent
        data.is_gold = this.state.is_gold
        data.all = this.state.is_vip_gold
        data.fromWhere = 'user_form'
        if(this.state.is_from_payment){
            extraParams['user_type']= 'gold'
            this.setState({is_navigate_to_form:true})
            this.props.retrieveMembersData('PLAN_PURCHASE',extraParams)
        }else{
            this.props.getVipList(false,data,(resp)=>{ // to get vip plan list
                console.log(resp)
                if(!resp.certificate){
                    extraParams['user_type']= 'gold'
                    this.setState({is_navigate_to_form:true})
                    this.props.retrieveMembersData('PLAN_PURCHASE',extraParams) // to retrieve already pushed member data in case of agent or proposer it self
                }else{
                    this.setState({is_user_alrdy_gold:true})
                }
            }) 
        }
        // if (this.props.selected_vip_plan && Object.keys(this.props.selected_vip_plan).length > 0){
        //     extraParams['user_type']= this.props.selected_vip_plan.is_gold?'gold':'vip'
        // }
        // extraParams['user_type']= this.props.selected_vip_plan.is_gold?'gold':'vip'
        // this.props.citiesData()

    }

	render(){
        let parsed = queryString.parse(this.props.location.search)
        if(this.props.showVipDetailsView && this.state.is_navigate_to_form){
            return <VipClubMemberDetailsView {...this.props} is_from_payment={this.state.is_from_payment} isSalesAgent={this.state.isSalesAgent} isAgent={this.state.isAgent} is_gold={this.state.is_gold} />
        }else if(STORAGE.checkAuth() && this.state.is_user_alrdy_gold && !this.state.is_from_payment){// if already gold or vip user redirect to dashboard
                this.props.history.replace('/vip-club-activated-details')
                return <div></div>
        }else{
            if(this.state.isSalesAgent && this.state.isAgent){
                return <div className="profile-body-wrap">
                    <Loader />
                </div>
            }else{
            return(
                <div className="profile-body-wrap">
                    <ProfileHeader showPackageStrip={true}/>
                    <Loader />
                </div>
                )
            }
        }
	}
}

const mapStateToProps = (state) => {
    const USER = state.USER
    const { selectedLocation } = state.SEARCH_CRITERIA_OPD
    let { user_cities, common_utm_tags } = state.USER

    let { vipClubList, selected_vip_plan, vipClubMemberDetails, currentSelectedVipMembersId, vip_club_db_data, members_proofs, showVipDetailsView,savedMemberData, vipCoupons } = state.VIPCLUB
    return {
        vipClubList, selected_vip_plan, vipClubMemberDetails, currentSelectedVipMembersId, user_cities, USER, vip_club_db_data, members_proofs, showVipDetailsView, savedMemberData, vipCoupons, common_utm_tags, selectedLocation
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userDetails:(self_data,criteria,forceadd) => dispatch(userDetails(self_data,criteria,forceadd)),
        saveCurrentSelectedVipMembers: (membersId,callback) => dispatch(saveCurrentSelectedVipMembers(membersId,callback)),
        citiesData: () => dispatch(citiesData()),
        selectVipUserProfile:(newProfileid,member_id,newProfile,param_id) => dispatch(selectVipUserProfile(newProfileid,member_id,newProfile,param_id)),
        vipClubPay :(criteria,callback) => dispatch(vipClubPay(criteria,callback)),
        addVipMembersData:(criteria,callback) => dispatch(addVipMembersData(criteria,callback)),
        uploadVipProof:(profileData, profileId,imgType, cb) =>dispatch(uploadVipProof(profileData, profileId,imgType, cb)),
        storeVipMemberProofs:(imgUrl,cb)=>dispatch(storeVipMemberProofs(imgUrl,cb)),
        removeVipMemberProof:(criteria)=>dispatch(removeVipMemberProof(criteria)),
        pushMembersData:(criteria) =>dispatch(pushMembersData(criteria)),
        retrieveMembersData:(type, extraParams, callback) => dispatch(retrieveMembersData(type, extraParams, callback)),
        selectVipClubPlan: (plan,criteria, callback) => dispatch(selectVipClubPlan(plan,criteria, callback)),
        resetVipData:() => dispatch(resetVipData()),
        vipPlusLead: (data) => dispatch(vipPlusLead(data)),
        sendAgentBookingURL: (orderId, type, purchase_type,query_data, extraParams, cb) => dispatch(sendAgentBookingURL(orderId, type,purchase_type,query_data,extraParams,  cb)),
        clearVipMemeberData:() =>dispatch(clearVipMemeberData()),
        getCoupons: (data) => dispatch(getCoupons(data)),
        applyCouponDiscount: (data) =>dispatch(applyCouponDiscount(data)),
        removeVipCoupons:() =>dispatch(removeVipCoupons()),
        getVipList: (is_endorsement,data,callback) => dispatch(getVipList(is_endorsement,data,callback)),
        removeMembers:(data) => dispatch(removeMembers(data))
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(VipClubMemberDetails)