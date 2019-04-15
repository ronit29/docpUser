import React from 'react'
import {connect} from 'react-redux'

import {userData,insurancePay, resetSelectedInsuranceMembers, retrieveUserData, sendAgentBookingURL} from '../../actions/index.js'
import InsuranceReviewView from '../../components/insurance/insuranceReview.js'

class InsuranceReview extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    }
    componentDidMount() {
            this.props.retrieveUserData((resp)=>{
                if(resp){
                    this.setState({data:resp})
                }
            })
    }
	render(){
		return(
			<InsuranceReviewView {...this.props} data={this.state.data}/>
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
        // getInsurance: (doctorId) => dispatch(getInsurance(doctorId)),
        // getUserProfile: () => dispatch(getUserProfile()),
        // selectInsurancePlan: (plan,criteria,forceadd) => dispatch(selectInsurancePlan(plan,criteria,forceadd)),
        // userData :(self_data,criteria,forceadd) => dispatch(userData(self_data,criteria,forceadd)),
        insurancePay :(criteria,callback) => dispatch(insurancePay(criteria,callback)),
        resetSelectedInsuranceMembers: () => dispatch(resetSelectedInsuranceMembers()),
        retrieveUserData:(cb) =>dispatch(retrieveUserData(cb)),
        sendAgentBookingURL: (orderId, type, cb) => dispatch(sendAgentBookingURL(orderId, type, cb)),
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(InsuranceReview)