import React from 'react'
import {connect} from 'react-redux'

import { cancelInsurance, cancelledInsuranceDetails, saveUserBankDetails, uploadBankProof,clearBankDetails} from '../../actions/index.js'
import InsuranceBankDetailsView from '../../components/insurance/insuranceBankDetailsView.js'

class InsuranceBankDetails extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            data:null
        }
    }
    
	render(){
		return(
			<InsuranceBankDetailsView {...this.props} data={this.state.data}/>
			)
	}
}

const mapStateToProps = (state) => {
    const USER = state.USER
    let { insurer_bank_details, cancel_reason} = state.INSURANCE
    return {
        insurer_bank_details,
        cancel_reason
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        cancelInsurance :(data,cb) => dispatch(cancelInsurance(data,cb)),
        saveUserBankDetails:(criteria) => dispatch(saveUserBankDetails(criteria)),
        uploadBankProof:(file,imgType,cb) =>dispatch(uploadBankProof(file,imgType,cb)),
        clearBankDetails:() => dispatch(clearBankDetails())
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(InsuranceBankDetails)