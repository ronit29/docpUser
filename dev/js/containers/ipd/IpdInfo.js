import React from 'react'
import { connect } from 'react-redux';
import { getIpdInfo } from '../../actions/index.js'
import IpdInfoView from '../../components/ipd/IpdInfoView.js'
const queryString = require('query-string')

class IpdInfoContainer extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			ipd_id: ''
		}
	}

	componentDidMount(){
		const parsed = queryString.parse(this.props.location.search)
		let ipd_id = ''
		if(parsed.ipd_id){
			ipd_id = parsed.ipd_id
		}else if(this.props.commonSelectedCriterias.length){
			ipd_id = this.props.commonSelectedCriterias[0].id
		}
		this.setState({ipd_id: ipd_id})
		this.props.getIpdInfo(ipd_id, this.props.selectedLocation)
	}

	render(){

		return(
			<IpdInfoView {...this.props} {...this.state}/>
			)
	}
} 

const mapStateToProps = (state) => {

	const {
        selectedLocation
    } = state.SEARCH_CRITERIA_OPD

	const {
		selectedCriterias,
		commonSelectedCriterias,
		ipd_info,
		IPD_INFO_LOADED
	} = state.SEARCH_CRITERIA_IPD

    return{
    	selectedLocation, selectedCriterias, ipd_info, IPD_INFO_LOADED, commonSelectedCriterias
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		getIpdInfo: (ipd_id, selectedLocation) => dispatch(getIpdInfo(ipd_id, selectedLocation))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IpdInfoContainer)