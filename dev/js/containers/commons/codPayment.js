import React from 'react'
import { connect } from 'react-redux';

import { fetchOrderSummary, agentLogin } from '../../actions/index.js'
import STORAGE from '../../helpers/storage'

import CodPaymentSummaryView from '../../components/commons/codPaymentSummary'
const queryString = require('query-string');
import Loader from '../../components/commons/Loader'

class CodPaymentPage extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			showPaymentPage: false
		}
	}

	componentDidMount(){
		const parsed = queryString.parse(this.props.location.search)
        if (parsed.token) {
            this.props.agentLogin(parsed.token, () => {
                setTimeout(() => {
                    this.setState({showPaymentPage: true})
                }, 100)
            })
        } else {
            this.props.history.push('/')
        }
	}

	render(){

		return(
			<React.Fragment>
			{
				this.state.showPaymentPage?
				<CodPaymentSummaryView {...this.props}/>
				:<Loader/>
			}
			</React.Fragment>

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