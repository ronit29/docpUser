import React from 'react'
import {connect} from 'react-redux'

import { cancelInsurance} from '../../actions/index.js'
import InsuranceCancellationView from '../../components/insurance/insuranceCancellation.js'

class InsuranceCancellation extends React.Component{

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
    }
	render(){
		return(
			<InsuranceCancellationView {...this.props}/>
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
        
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(InsuranceCancellation)