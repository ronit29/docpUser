import React from 'react'
import {connect} from 'react-redux'

import { selectInsurancePlan,getUserProfile,userData,selectInsuranceProfile, saveCurrentSelectedMembers,resetSelectedInsuranceMembers} from '../../actions/index.js'
import InsuranceComponentView from '../../components/insurance/insuranceDetailsView.js'

class InsuranceDetails extends React.Component{
    componentDidMount() {
            this.props.getUserProfile()
    }
	render(){
		return(
			<InsuranceComponentView {...this.props}/>
		)
	}
}

const mapStateToProps = (state) => {
    const USER = state.USER
    let { insurnaceData, LOAD_INSURANCE, selected_plan,self_data_values,saveCurrentSelectedMembers,selectedProfile, currentSelectedInsuredMembersId,create_payment_resp} = state.INSURANCE
    return {
        insurnaceData,LOAD_INSURANCE,selected_plan,USER,self_data_values,saveCurrentSelectedMembers,selectedProfile, currentSelectedInsuredMembersId, create_payment_resp
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // getInsurance: (insuranceId) => dispatch(getInsurance(insuranceId)),
        getUserProfile: () => dispatch(getUserProfile()),
        selectInsurancePlan: (plan,criteria,forceadd) => dispatch(selectInsurancePlan(plan,criteria,forceadd)),
        userData :(self_data,criteria,forceadd) => dispatch(userData(self_data,criteria,forceadd)),
        selectInsuranceProfile :(newProfileid,member_id,newProfile,param_id) => dispatch(selectInsuranceProfile(newProfileid,member_id,newProfile,param_id)),
        saveCurrentSelectedMembers: (membersId) => dispatch(saveCurrentSelectedMembers(membersId)),
        resetSelectedInsuranceMembers: () => dispatch(resetSelectedInsuranceMembers())
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(InsuranceDetails)