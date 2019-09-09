import React from 'react'
import {connect} from 'react-redux'

import { userDetails, saveCurrentSelectedVipMembers, citiesData, selectVipUserProfile, vipClubPay, addVipMembersData, uploadVipProof, removeVipMemberProof, storeVipMemberProofs } from '../../actions/index.js'
import VipClubMemberDetailsView from '../../components/vipClub/vipClubMemberDetailsView.js'
const queryString = require('query-string');

class VipClubMemberDetails extends React.Component{
    
    componentDidMount() {
        this.props.citiesData()
    }

	render(){
        let parsed = queryString.parse(this.props.location.search)
		return(
            <VipClubMemberDetailsView {...this.props} is_from_payment={parsed.is_from_payment?parsed.is_from_payment:false}/>
		)
	}
}

const mapStateToProps = (state) => {
    const USER = state.USER
    let { user_cities } = state.USER

    let { vipClubList, selected_vip_plan, vipClubMemberDetails, currentSelectedVipMembersId, vip_club_db_data, members_proofs } = state.VIPCLUB
    return {
        vipClubList, selected_vip_plan, vipClubMemberDetails, currentSelectedVipMembersId, user_cities, USER, vip_club_db_data, members_proofs
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
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(VipClubMemberDetails)