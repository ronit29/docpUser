import React from 'react'
import {connect} from 'react-redux'

import { getInsuranceMemberList,updateMemberList} from '../../actions/index.js'
import InsuranceSuccessComp from '../../components/insurance/insuranceSuccess.js'

class InsuranceSuccess extends React.Component{

	render(){
		return(
			<InsuranceSuccessComp {...this.props}/>
			)
	}
}

const mapStateToProps = (state) => {
    const USER = state.USER
    let { insurnaceData, LOAD_INSURANCE, selected_plan,self_data_values,insured_member_list} = state.INSURANCE
    return {
        insurnaceData,LOAD_INSURANCE,selected_plan,USER,self_data_values,insured_member_list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInsuranceMemberList :(member_list_id) => dispatch(getInsuranceMemberList(member_list_id)),
        updateMemberList :(member_list,callback) => dispatch(updateMemberList(member_list,callback))
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(InsuranceSuccess)