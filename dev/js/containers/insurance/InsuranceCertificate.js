import React from 'react'
import {connect} from 'react-redux'

import { getInsuredProfile} from '../../actions/index.js'
import InsuranceCertificateView from '../../components/insurance/insuranceCertificate.js'

class InsuranceCertificate extends React.Component{
    componentDidMount(){
        this.props.getInsuredProfile()      
    }
	render(){
		return(
			<InsuranceCertificateView {...this.props}/>
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

        getInsuredProfile :() => dispatch(getInsuredProfile()),
        
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(InsuranceCertificate)