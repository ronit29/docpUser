import React from 'react'
import {connect} from 'react-redux'

import { getInsurance} from '../../actions/index.js'
import AdsBookingView from '../../components/commons/adsBooking/adsBookingView.js'

class adsBooking extends React.Component{
	render(){
		return(
			<AdsBookingView {...this.props}/>
		)
	}
}

const mapStateToProps = (state) => {
    // let { insurnaceData} = state.INSURANCE
    return {
        // insurnaceData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // getInsurance: (InsuranceId) => dispatch(getInsurance(InsuranceId)),
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(adsBooking)