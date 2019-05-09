import React from 'react'
import {connect} from 'react-redux'

import { userData,selectInsuranceProfile, saveCurrentSelectedMembers, pushUserData, resetSelectedInsuranceMembers, getInsurance} from '../../actions/index.js'
import InsuranceComponentView from '../../components/insurance/insuranceEndorsementDetailsView.js'

class InsuranceEndorsementDetails extends React.Component{

    componentDidMount() {
        //this.props.getUserProfile()
        this.props.getInsurance(true,(resp)=>{
            // console.log(resp)
            // alert('s')
        })
    }
	render(){
        let abc = [{'relation':'self'},{'relation':'spouse'},{'relation':'child'},{'relation':'child'}]
		return(
			<InsuranceComponentView {...this.props} endorseData={abc}/>
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
        getInsurance: (is_endorsement,callback) => dispatch(getInsurance(is_endorsement,callback)),
        userData :(self_data,criteria,forceadd) => dispatch(userData(self_data,criteria,forceadd)),
        selectInsuranceProfile :(newProfileid,member_id,newProfile,param_id) => dispatch(selectInsuranceProfile(newProfileid,member_id,newProfile,param_id)),
        saveCurrentSelectedMembers: (membersId) => dispatch(saveCurrentSelectedMembers(membersId)),
        pushUserData :(criteria,callback) => dispatch(pushUserData(criteria,callback)),
        resetSelectedInsuranceMembers: () => dispatch(resetSelectedInsuranceMembers())
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(InsuranceEndorsementDetails)