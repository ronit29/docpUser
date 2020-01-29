import React from 'react'
import { connect } from 'react-redux'
import { uploadCommonPrescription } from '../../actions/index.js'
import PrescriptionView from '../../components/commons/PrescriptionUpload/prescriptionUpload.js'

class PrescriptionUpload extends React.Component {

	render(){

		return(
			<PrescriptionView {...this.props}/>
			)
	}
}

const mapStateToProps = (state, passedProps) => {
	return {

	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		uploadCommonPrescription : (dataParams, callback) => dispatch(uploadCommonPrescription(dataParams, callback))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionUpload)