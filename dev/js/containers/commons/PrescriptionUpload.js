import React from 'react'
import { connect } from 'react-redux'
import { uploadPrescription } from '../../actions/index.js'
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
		uploadPrescription : (dataParams) => dispatch(uploadPrescription(dataParams))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionUpload)