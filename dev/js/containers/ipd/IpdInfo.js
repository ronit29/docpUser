import React from 'react'
import { connect } from 'react-redux';
import { getIpdInfo, selectOpdTimeSLot, saveProfileProcedures, cloneCommonSelectedCriterias, mergeIpdCriteria } from '../../actions/index.js'
import IpdInfoView from '../../components/ipd/IpdInfoView.js'
const queryString = require('query-string')

class IpdInfoContainer extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			ipd_id: ''
		}
	}

	static loadData(store, match, query) {
        /*let title = match.url
        title = title.substring(1, title.length).toLowerCase()*/
        let ipd_id = query && query.ipd_id?query.ipd_id:''

        let selectedLocation = null
        if (query.lat && query.long) {
            selectedLocation = { geometry: { location: { lat: query.lat, lng: query.long } }, place_id: query.place_id||'', formatted_address: "Delhi", sub_locality: query.sub_locality ||'', locality: query.locality || ''}
        }

        return store.dispatch(getIpdInfo(ipd_id, selectedLocation))
    }

    static contextTypes = {
        router: () => null
    }

	componentDidMount(){
		const parsed = queryString.parse(this.props.location.search)
		let ipd_id = ''
		if(parsed.ipd_id){
			this.setState({ipd_id: parsed.ipd_id})
			ipd_id = parsed.ipd_id
			this.props.getIpdInfo(parsed.ipd_id, this.props.selectedLocation)
		}else if(this.props.commonSelectedCriterias.length){
			this.setState({ipd_id: this.props.commonSelectedCriterias[0].id})
			ipd_id = this.props.commonSelectedCriterias[0].id
			this.props.getIpdInfo(this.props.commonSelectedCriterias[0].id, this.props.selectedLocation)	
		}
		if(window){
			window.scrollTo(0,0)
		}

		let lat = 28.644800
        let long = 77.216721
        let place_id = ""
        let locality = 'Delhi'
        let sub_locality = ''

        if (this.props.selectedLocation) {
            place_id = this.props.selectedLocation.place_id || ""
            lat = this.props.selectedLocation.geometry.location.lat
            long = this.props.selectedLocation.geometry.location.lng
            if (typeof lat === 'function') lat = lat()
            if (typeof long === 'function') long = long()

            lat = parseFloat(parseFloat(lat).toFixed(6))
            long = parseFloat(parseFloat(long).toFixed(6))

            locality = this.props.selectedLocation.locality || ''
            sub_locality = this.props.selectedLocation.sub_locality || ''
        }

		let new_url = `${window.location.pathname}?ipd_id=${ipd_id}&place_id=${place_id}&lat=${lat}&long=${long}&locality=${locality}&sub_locality=${sub_locality}`
        this.props.history.replace(new_url)

	}

	componentWillReceiveProps(nextProps) {
		if(this.props.locationFetched != nextProps.locationFetched){

			const parsed = queryString.parse(nextProps.location.search)
			if(parsed.ipd_id){
				this.setState({ipd_id: parsed.ipd_id})
				this.props.getIpdInfo(parsed.ipd_id, nextProps.selectedLocation)
			}else if(nextProps.commonSelectedCriterias.length){
				this.setState({ipd_id: nextProps.commonSelectedCriterias[0].id})
				this.props.getIpdInfo(nextProps.commonSelectedCriterias[0].id, nextProps.selectedLocation)	
			}
			if(window){
				window.scrollTo(0,0)
			}

		}
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
		ipd_info,
		IPD_INFO_LOADED,
		commonSelectedCriterias,
		locationFetched
	} = state.SEARCH_CRITERIA_IPD

    return{
    	selectedLocation, selectedCriterias, ipd_info, IPD_INFO_LOADED, commonSelectedCriterias, locationFetched
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		getIpdInfo: (ipd_id, selectedLocation) => dispatch(getIpdInfo(ipd_id, selectedLocation)),
		saveProfileProcedures: (doctor_id, clinic_id, procedure_ids, forceAdd) => dispatch(saveProfileProcedures(doctor_id, clinic_id, procedure_ids, forceAdd)),
		selectOpdTimeSLot: (slot, reschedule, appointmentId) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId)),
		cloneCommonSelectedCriterias: (selectedCriterias) => dispatch(cloneCommonSelectedCriterias(selectedCriterias)),
		mergeIpdCriteria: (filterCriteria)=> dispatch(mergeIpdCriteria(filterCriteria))

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IpdInfoContainer)