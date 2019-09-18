import React from 'react'
import {connect} from 'react-redux'

import { userDetails, saveCurrentSelectedVipMembers, citiesData, selectVipUserProfile, vipClubPay, addVipMembersData, uploadVipProof, removeVipMemberProof, storeVipMemberProofs, pushMembersData, retrieveMembersData, selectVipClubPlan, resetVipData } from '../../actions/index.js'
import VipClubMemberDetailsView from '../../components/vipClub/vipClubMemberDetailsView.js'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import Loader from '../../components/commons/Loader'
const queryString = require('query-string');

class VipClubMemberDetails extends React.Component{
    
    constructor(props) {
        super(props)
        const parsed = queryString.parse(this.props.location.search)
        this.state={
            isSalesAgent:parsed.utm_source,
            isAgent:parsed.is_agent
        }
    }

    componentDidMount() {
        this.props.retrieveMembersData((resp) =>{
        })
        this.props.citiesData()
    }

	render(){
        let parsed = queryString.parse(this.props.location.search)
        if(this.props.showVipDetailsView){
            return(
            <VipClubMemberDetailsView {...this.props} is_from_payment={parsed.is_from_payment?parsed.is_from_payment:false} isSalesAgent={this.state.isSalesAgent} isAgent={this.state.isAgent} />
        )
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
    let { user_cities } = state.USER

    let { vipClubList, selected_vip_plan, vipClubMemberDetails, currentSelectedVipMembersId, vip_club_db_data, members_proofs, showVipDetailsView,savedMemberData } = state.VIPCLUB
    return {
        vipClubList, selected_vip_plan, vipClubMemberDetails, currentSelectedVipMembersId, user_cities, USER, vip_club_db_data, members_proofs, showVipDetailsView, savedMemberData
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
        retrieveMembersData:(callback) => dispatch(retrieveMembersData(callback)),
        selectVipClubPlan: (plan,criteria, callback) => dispatch(selectVipClubPlan(plan,criteria, callback)),
        resetVipData:() => dispatch(resetVipData()),
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(VipClubMemberDetails)