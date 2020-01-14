import React from 'react'
import {connect} from 'react-redux'

import { getInsuranceMemberList,updateMemberList, getUserProfile} from '../../actions/index.js'
import InsuranceSuccessComp from '../../components/insurance/insuranceSuccess.js'
import GTM from '../../helpers/gtm.js'
const queryString = require('query-string');
import STORAGE from '../../helpers/storage'


class InsuranceSuccess extends React.Component{

    componentDidMount() {
        const parsed = queryString.parse(window.location.search)
        let data = {
            'Category': 'ConsumerApp', 'Action': 'OpdInsuranceBooked', 'CustomerID': GTM.getUserId() || '', 'leadid': parsed.id?parsed.id:0, 'event': 'opd-insurance-booked'
        }
        GTM.sendEvent({ data: data })

        if (STORAGE.checkAuth()) {
            this.props.getUserProfile() // to get loggedIn user profile
        }
    }

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
        updateMemberList :(member_list,callback) => dispatch(updateMemberList(member_list,callback)),
        getUserProfile: () => dispatch(getUserProfile()),
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(InsuranceSuccess)