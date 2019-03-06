import React from 'react'
import { connect } from 'react-redux';
import { getIpdInfo } from '../../actions/index.js'
import IpdInfoView from '../../components/ipd/IpdInfoView.js'

class IpdInfoContainer extends React.Component{

	componentDidMount(){
		if(this.props.match.params.id){
			this.props.getIpdInfo(this.props.match.params.id)	
		}
		
	}

	render(){

		return(
			<IpdInfoView {...this.props}/>
			)
	}
} 

const mapStateToProps = (state) => {

	const {
        selectedLocation
    } = state.SEARCH_CRITERIA_OPD

	const {
		selectedCriterias,
		ipd_info,
		IPD_INFO_LOADED
	} = state.SEARCH_CRITERIA_IPD

    return{
    	selectedLocation, selectedCriterias, ipd_info, IPD_INFO_LOADED
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		getIpdInfo: (ipd_id) => dispatch(getIpdInfo(ipd_id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IpdInfoContainer)