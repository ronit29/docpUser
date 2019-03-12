import React from 'react'
import {connect} from 'react-redux'

import { getInsurance, selectInsurancePlan,getUserProfile,userData,insurancePay, resetSelectedInsuranceMembers} from '../../actions/index.js'
import InsuranceReviewView from '../../components/insurance/insurance_review.js'

class InsuranceReview extends React.Component{
    componentDidMount() {
            this.props.getUserProfile()
    }
	render(){
		return(
			<InsuranceReviewView {...this.props}/>
			)
	}
}

const mapStateToProps = (state) => {
    const USER = state.USER
    let { insurnaceData, LOAD_INSURANCE, selected_plan,self_data_values,create_payment_resp, currentSelectedInsuredMembersId} = state.INSURANCE
    return {
        insurnaceData,LOAD_INSURANCE,selected_plan,USER,self_data_values,create_payment_resp, currentSelectedInsuredMembersId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInsurance: (doctorId) => dispatch(getInsurance(doctorId)),
        getUserProfile: () => dispatch(getUserProfile()),
        selectInsurancePlan: (plan,criteria,forceadd) => dispatch(selectInsurancePlan(plan,criteria,forceadd)),
        userData :(self_data,criteria,forceadd) => dispatch(userData(self_data,criteria,forceadd)),
        insurancePay :(insurance_pay,criteria,forceadd,callback) => dispatch(insurancePay(insurance_pay,criteria,forceadd,callback)),
        resetSelectedInsuranceMembers: () => dispatch(resetSelectedInsuranceMembers())
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(InsuranceReview)