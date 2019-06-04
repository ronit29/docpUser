import React from 'react'
import { connect } from 'react-redux';

import { fetchOrderSummary, agentLogin } from '../../actions/index.js'
import STORAGE from '../../helpers/storage'

import CodPaymentSummaryView from '../../components/commons/codPaymentSummary'
const queryString = require('query-string');

class CodPaymentPage extends React.Component {

	constructor(props) {
		super(props)

	}

	componentDidMount(){
		const parsed = queryString.parse(this.props.location.search)
        if (parsed.token) {
            this.props.agentLogin(parsed.token, () => {
                setTimeout(() => {
                    //this.props.history.push('/')
                }, 100)
            })
        } else {
            this.props.history.push('/')
        }
	}

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
	
	return {
		fetchOrderSummary: (order_id) => dispatch(fetchOrderSummary(order_id)),
		agentLogin: (token, cb) => dispatch(agentLogin(token, cb))	
	}
	
}

export default connect(mapStateTopProps, mapDispatchTopProps)(CodPaymentPage)