import React from 'react'
import { connect } from 'react-redux'
import { sendOTP, submitOTP, getUserProfile } from '../../actions/index.js'
import LoginPopupView from '../../components/commons/commonFixedPopup/loginPopup.js'

class PrescriptionUpload extends React.Component {

	render(){

		return(
			<LoginPopupView {...this.props}/>
			)
	}
}

const mapStateToProps = (state, passedProps) => {
	return {

	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		sendOTP: (number,viaSms,viaWhatsapp,message_type, cb) => dispatch(sendOTP(number,viaSms,viaWhatsapp,message_type, cb)),
        submitOTP: (number, otp, extraParams, cb) => dispatch(submitOTP(number, otp, extraParams,  cb)),
        getUserProfile: () => dispatch(getUserProfile())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionUpload)