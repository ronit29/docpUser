import React from 'react'
import { connect } from 'react-redux';
import { getIpdInfo, selectOpdTimeSLot, saveProfileProcedures, cloneCommonSelectedCriterias, mergeIpdCriteria, ipdChatView, checkIpdChatAgentStatus, getOfferList } from '../../actions/index.js'
import IpdInfoView from '../../components/ipd/IpdInfoView.js'
const queryString = require('query-string')
import GTM from '../../helpers/gtm.js'


class IpdInfoContainer extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			ipd_id: '',
			seoUrl: false
		}
	}

	static loadData(store, match, query) {

		let search_by_url = null
		if(query.ipd_id) {
			
		}else{

			let title = match.url
			search_by_url = title.substring(1, title.length).toLowerCase()
		}

        let ipd_id = query && query.ipd_id?query.ipd_id:''

        let selectedLocation = null
        if (query.lat && query.long) {
            selectedLocation = { geometry: { location: { lat: query.lat, lng: query.long } }, place_id: query.place_id||'', formatted_address: "Delhi", sub_locality: query.sub_locality ||'', locality: query.locality || ''}
        }

        return store.dispatch(getIpdInfo(ipd_id, selectedLocation, search_by_url))
    }

    static contextTypes = {
        router: () => null
    }

	componentDidMount(){
		const parsed = queryString.parse(this.props.location.search)
		let ipd_id = ''
		let search_by_url = null
		if(parsed.ipd_id){
			this.setState({ipd_id: parsed.ipd_id})
			ipd_id = parsed.ipd_id
			this.props.getIpdInfo(parsed.ipd_id, this.props.selectedLocation)


			let gtmData = {
	            'Category': 'ConsumerApp', 'Action': 'IPDInfoPageLanded', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-info-page-landed', selectedId: parsed.ipd_id || ''
	        }
	        GTM.sendEvent({ data: gtmData })

		}else{
			let title = this.props.match.url
			this.setState({seoUrl: true})
			search_by_url = title.substring(1, title.length).toLowerCase()
			this.props.getIpdInfo('', this.props.selectedLocation, search_by_url, (resp) => {
				if(resp){
					if(resp.about && resp.about.id){
						this.setState({ ipd_id: resp.about.id })

						let gtmData = {
				            'Category': 'ConsumerApp', 'Action': 'IPDInfoPageLanded', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-info-page-landed', selectedId: resp.about.id || ''
				        }
				        GTM.sendEvent({ data: gtmData })
					}
				}
			})
		}
		/*else if(this.props.commonSelectedCriterias.length){
			this.setState({ipd_id: this.props.commonSelectedCriterias[0].id})
			ipd_id = this.props.commonSelectedCriterias[0].id
			this.props.getIpdInfo(this.props.commonSelectedCriterias[0].id, this.props.selectedLocation)	
		}*/
		if(window){
			window.scrollTo(0,0)
		}

		let selectedLocation = ''
        let lat = 28.644800
        let long = 77.216721
        if (this.props.selectedLocation) {
            selectedLocation = this.props.selectedLocation;
            lat = selectedLocation.geometry.location.lat
            long = selectedLocation.geometry.location.lng
            if (typeof lat === 'function') lat = lat()
            if (typeof long === 'function') long = long()
        }

        this.props.getOfferList(lat, long)

		if(!search_by_url){
			let new_url = this.buildUrl(this.props)
	        this.props.history.replace(new_url)
		}
		
	}

	buildUrl(props){
		//build url for ipd procedure info
		let lat = 28.644800
        let long = 77.216721
        let place_id = ""
        let locality = 'Delhi'
        let sub_locality = ''

        const parsed = queryString.parse(this.props.location.search)

        if (props.selectedLocation) {
            place_id = props.selectedLocation.place_id || ""
            lat = props.selectedLocation.geometry.location.lat
            long = props.selectedLocation.geometry.location.lng
            if (typeof lat === 'function') lat = lat()
            if (typeof long === 'function') long = long()

            lat = parseFloat(parseFloat(lat).toFixed(6))
            long = parseFloat(parseFloat(long).toFixed(6))

            locality = props.selectedLocation.locality || ''
            sub_locality = props.selectedLocation.sub_locality || ''
        }

		let new_url = `${window.location.pathname}?ipd_id=${parsed.ipd_id}&place_id=${place_id}&lat=${lat}&long=${long}&locality=${locality}&sub_locality=${sub_locality}&showPopup=true`

		if(parsed.utm_source) {
			new_url+= `&utm_source=${parsed.utm_source||''}`
		}

		if(parsed.utm_medium) {
			new_url+= `&utm_medium=${parsed.utm_medium||''}`
		}

		if(parsed.utm_campaign) {
			new_url+= `&utm_campaign=${parsed.utm_campaign||''}`
		} 
		
		if(this.props.is_ipd_form_submitted) {
			
		}else if(parsed && parsed.get_feedback=='1'){
			new_url+='&get_feedback=1'
		}

		if(parsed && parsed.type) {
			new_url+= `&type=${parsed.type}`
		}

		return new_url
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.locationFetched != nextProps.locationFetched){

			const parsed = queryString.parse(nextProps.location.search)
			let search_by_url = null

			if(parsed.ipd_id){
				this.setState({ipd_id: parsed.ipd_id})
				this.props.getIpdInfo(parsed.ipd_id, nextProps.selectedLocation)
			}else{

				let title = this.props.match.url
				this.setState({seoUrl: true})
				search_by_url = title.substring(1, title.length).toLowerCase()
				this.props.getIpdInfo('', nextProps.selectedLocation, search_by_url, (resp)=> {

					if(resp){
						if(resp.about && resp.about.id){
							this.setState({ ipd_id: resp.about.id })
						}
					}

				})
			}/*else if(nextProps.commonSelectedCriterias.length){
				this.setState({ipd_id: nextProps.commonSelectedCriterias[0].id})
				this.props.getIpdInfo(nextProps.commonSelectedCriterias[0].id, nextProps.selectedLocation)	
			}*/
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

	const {
		ipd_chat,
		offerList,
		is_ipd_form_submitted
	} = state.USER

    return{
    	selectedLocation, selectedCriterias, ipd_info, IPD_INFO_LOADED, commonSelectedCriterias, locationFetched, ipd_chat, offerList,
    	is_ipd_form_submitted
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		getIpdInfo: (ipd_id, selectedLocation, search_by_url, cb) => dispatch(getIpdInfo(ipd_id, selectedLocation, search_by_url, cb)),
		saveProfileProcedures: (doctor_id, clinic_id, procedure_ids, forceAdd) => dispatch(saveProfileProcedures(doctor_id, clinic_id, procedure_ids, forceAdd)),
		selectOpdTimeSLot: (slot, reschedule, appointmentId) => dispatch(selectOpdTimeSLot(slot, reschedule, appointmentId)),
		cloneCommonSelectedCriterias: (selectedCriterias) => dispatch(cloneCommonSelectedCriterias(selectedCriterias)),
		mergeIpdCriteria: (filterCriteria)=> dispatch(mergeIpdCriteria(filterCriteria)),
		ipdChatView: (data) => dispatch(ipdChatView(data)),
		checkIpdChatAgentStatus: (cb) => dispatch(checkIpdChatAgentStatus(cb)),
		getOfferList: (lat,long) => dispatch(getOfferList(lat,long))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IpdInfoContainer)