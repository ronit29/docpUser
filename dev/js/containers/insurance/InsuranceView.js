import React from 'react'
import {connect} from 'react-redux'

import { getInsurance, selectInsurancePlan , saveCurrentSelectedMembers,resetSelectedInsuranceMembers,resetSelectedPlans,sendOTP, submitOTP, resetAuth, getUserProfile, userData } from '../../actions/index.js'
import InsuranceComponent from '../../components/insurance/insuranceView.js'

class Insurance extends React.Component{
    componentDidMount() {
        this.props.getInsurance()
    }
	render(){
		return(
			<InsuranceComponent {...this.props}/>
		)
	}
}

const mapStateToProps = (state) => {
    const USER = state.USER
    let { insurnaceData, LOAD_INSURANCE, selected_plan,self_data_values} = state.INSURANCE
    return {
        insurnaceData,LOAD_INSURANCE,selected_plan,self_data_values,USER
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInsurance: (callback) => dispatch(getInsurance(callback)),
        getUserProfile: () => dispatch(getUserProfile()),
        selectInsurancePlan: (plan,criteria,forceadd) => dispatch(selectInsurancePlan(plan,criteria,forceadd)),
        saveCurrentSelectedMembers: (membersId) => dispatch(saveCurrentSelectedMembers(membersId)),
        resetSelectedPlans: () => dispatch(resetSelectedPlans()),
        sendOTP: (number, cb) => dispatch(sendOTP(number, cb)),
        submitOTP: (number, otp, cb) => dispatch(submitOTP(number, otp, cb)),
        resetAuth: () => dispatch(resetAuth()),
        userData :(self_data,criteria,forceadd) => dispatch(userData(self_data,criteria,forceadd)),
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(Insurance)