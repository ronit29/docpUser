import React from 'react'
import { connect } from 'react-redux'
import { uploadCommonPrescription, NonIpdBookingLead } from '../../actions/index.js'
import PrescriptionView from '../../components/commons/PrescriptionUpload/prescriptionUpload.js'

class PrescriptionUpload extends React.Component {

	render(){

		return(
			<PrescriptionView {...this.props}/>
			)
	}
}

const mapStateToProps = (state, passedProps) => {
	
	let { primaryMobile, user_loggedIn_number } = state.USER
	
	return {
		primaryMobile,
		user_loggedIn_number
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		uploadCommonPrescription : (dataParams, callback) => dispatch(uploadCommonPrescription(dataParams, callback)),
		NonIpdBookingLead:(data,cb) =>dispatch(NonIpdBookingLead(data, cb)),

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionUpload)