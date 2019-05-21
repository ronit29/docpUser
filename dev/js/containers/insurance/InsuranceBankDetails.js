import React from 'react'
import {connect} from 'react-redux'

import { cancelInsurance, cancelledInsuranceDetails, saveUserBankDetails} from '../../actions/index.js'
import InsuranceBankDetailsView from '../../components/insurance/insuranceBankDetailsView.js'

class InsuranceBankDetails extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            data:null
        }
    }

    componentDidMount(){
        // this.props.cancelledInsuranceDetails(resp =>{
        //     this.setState({data:resp})
        // })
    }
	render(){
		return(
			<InsuranceBankDetailsView {...this.props} data={this.state.data}/>
			)
	}
}

const mapStateToProps = (state) => {
    const USER = state.USER
    let { insurer_bank_details} = state.INSURANCE
    return {
        insurer_bank_details
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        cancelInsurance :(cb) => dispatch(cancelInsurance(cb)),
        cancelledInsuranceDetails:(cb) => dispatch(cancelledInsuranceDetails(cb)),
        saveUserBankDetails:(criteria) => dispatch(saveUserBankDetails(criteria))
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(InsuranceBankDetails)