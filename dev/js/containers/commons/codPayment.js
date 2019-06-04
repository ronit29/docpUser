import React from 'react'
import { connect } from 'react-redux';

import { fetchOrderSummary } from '../../actions/index.js'
import STORAGE from '../../helpers/storage'

import CodPaymentSummaryView from '../../components/commons/codPaymentSummary'


class CodPaymentPage extends React.Component {

	render(){

		return(
			<CodPaymentSummaryView {...this.props}/>
			)
	}
}

const mapStateTopProps = (state) => {
	return {

	}
}

const mapDispatchTopProps = (dispatch) => {

	fetchOrderSummary: (order_id) => dispatch(fetchOrderSummary(order_id))
}

export default connect(mapStateTopProps, mapDispatchTopProps)(CodPaymentPage)