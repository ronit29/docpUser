import React from 'react'
import {connect} from 'react-redux'

import { userData,selectInsuranceProfile, saveCurrentSelectedMembers, pushUserData, resetSelectedInsuranceMembers, submitEmailOTP, sendOtpOnEmail,

userDetails, saveCurrentSelectedVipMembers, citiesData, selectVipUserProfile, vipClubPay} from '../../actions/index.js'
import VipClubMemberDetailsView from '../../components/vipClub/vipClubMemberDetailsView.js'

class VipClubMemberDetails extends React.Component{
    
    componentDidMount() {
        this.props.citiesData()
    }

	render(){
		return(
            <VipClubMemberDetailsView {...this.props} is_from_payment={false}/>
		)
	}
}

const mapStateToProps = (state) => {
    const USER = state.USER
    let { user_cities } = state.USER
    let { insurnaceData, LOAD_INSURANCE, selected_plan,self_data_values,saveCurrentSelectedMembers,selectedProfile, currentSelectedInsuredMembersId,create_payment_resp, endorsed_member_data, 
        members_proofs} = state.INSURANCE

    let { vipClubList, selected_vip_plan, vipClubMemberDetails, currentSelectedVipMembersId } = state.VIPCLUB
    return {
        insurnaceData,LOAD_INSURANCE,selected_plan,USER,self_data_values,saveCurrentSelectedMembers,selectedProfile, currentSelectedInsuredMembersId, create_payment_resp, endorsed_member_data, members_proofs, vipClubList, selected_vip_plan, vipClubMemberDetails, currentSelectedVipMembersId, user_cities
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userDetails:(self_data,criteria,forceadd) => dispatch(userDetails(self_data,criteria,forceadd)),
        saveCurrentSelectedVipMembers: (membersId) => dispatch(saveCurrentSelectedVipMembers(membersId)),
        citiesData: () => dispatch(citiesData()),
        selectVipUserProfile:(newProfileid,member_id,newProfile,param_id) => dispatch(selectVipUserProfile(newProfileid,member_id,newProfile,param_id)),
        vipClubPay :(criteria,callback) => dispatch(vipClubPay(criteria,callback)),
        
        userData :(self_data,criteria,forceadd) => dispatch(userData(self_data,criteria,forceadd)),
        selectInsuranceProfile :(newProfileid,member_id,newProfile,param_id) => dispatch(selectInsuranceProfile(newProfileid,member_id,newProfile,param_id)),
        saveCurrentSelectedMembers: (membersId) => dispatch(saveCurrentSelectedMembers(membersId)),
        pushUserData :(criteria,callback) => dispatch(pushUserData(criteria,callback)),
        resetSelectedInsuranceMembers: () => dispatch(resetSelectedInsuranceMembers()),
        submitEmailOTP: (data, cb) => dispatch(submitEmailOTP(data, cb)),
        sendOtpOnEmail:(criteria,callback)=>dispatch(sendOtpOnEmail(criteria,callback)),
        // resetSelectedInsuranceMembers: () => dispatch(resetSelectedInsuranceMembers())
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(VipClubMemberDetails)