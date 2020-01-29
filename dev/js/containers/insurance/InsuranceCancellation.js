import React from 'react'
import {connect} from 'react-redux'

import { cancelInsurance, cancelledInsuranceDetails, cancelReason, sendOTP, submitOTP} from '../../actions/index.js'
import InsuranceCancellationView from '../../components/insurance/insuranceCancellation.js'

class InsuranceCancellation extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            data:null
        }
    }

    componentDidMount(){
        this.props.cancelledInsuranceDetails(resp =>{ // to get user cancelled details
            this.setState({data:resp})
        })
    }
	render(){
		return(
			<InsuranceCancellationView {...this.props} data={this.state.data}/>
			)
	}
}

const mapStateToProps = (state) => {
    const USER = state.USER
    let { insurnaceData, LOAD_INSURANCE, selected_plan,self_data_values,insured_member_list,get_insured_profile} = state.INSURANCE
    return {
        insurnaceData,LOAD_INSURANCE,selected_plan,USER,self_data_values,insured_member_list,get_insured_profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        cancelInsurance :(cb) => dispatch(cancelInsurance(cb)),
        cancelledInsuranceDetails:(cb) => dispatch(cancelledInsuranceDetails(cb)),
        cancelReason:(criteria) => dispatch(cancelReason(criteria)),
        sendOTP: (number,viaSms,viaWhatsapp,message_type, cb) => dispatch(sendOTP(number,viaSms,viaWhatsapp,message_type, cb)),
        submitOTP: (number, otp,extraParamsData,  cb) => dispatch(submitOTP(number, otp, extraParamsData, cb)),
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(InsuranceCancellation)