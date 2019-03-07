import React from 'react'
import { connect } from 'react-redux'
import { getIpdInfo, submitIPDForm } from '../../actions/index.js'
import IPDFormView from '../../components/ipd/IPDFormView.js'
class IPDForm extends React.Component{

	componentDidMount(){
		if(window){
			window.scrollTo(0,0)
		}
		if(this.props.match.params.id){
			this.props.getIpdInfo(this.props.match.params.id)	
		}
		
	}
	render(){

		return(
			<IPDFormView {...this.props}/>
			)
	}
}

const mapStateToProps = (state) => {

	const {
		selectedCriterias,
		ipd_info,
		IPD_INFO_LOADED
	} = state.SEARCH_CRITERIA_IPD

	return{
		selectedCriterias,
		ipd_info,
		IPD_INFO_LOADED
	}
}

const mapDispatchToProps = (dispatch) => {

	return{
		getIpdInfo: (ipd_id) => dispatch(getIpdInfo(ipd_id)),
		submitIPDForm:(formData, cb)=> dispatch(submitIPDForm(formData, cb))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(IPDForm)