import React from 'react'
import { connect } from 'react-redux'
import { getIpdInfo, getIpdHospitals, mergeIpdCriteria, urlShortner, setIpdSearchId, getIpdSearchIdResults } from '../../actions/index.js'
import IpdHospitalSearchView from '../../components/ipd/IpdHospitalSearchView.js'
import { HospitalSearchStateBuilder } from '../../helpers/urltoState'


class IpdHospitals extends React.Component {

	static loadData(store, match, queryParams = {}){

		return new Promise((resolve, reject)=> {

			try{

				let location_ms = null
                if (match.url.includes('location=')) {
                    location_ms = match.url.split('location=')[1]
                    location_ms = parseInt(location_ms)
                }
                HospitalSearchStateBuilder(null, queryParams, true, location_ms).then((state) => {
                	store.dispatch(mergeIpdCriteria(state))

                	let searchUrl = null
                    if (match.url.includes('-ipdhp') || match.url.includes('-hspcit') || match.url.includes('-hsplitcit')) {
                        searchUrl = match.url.toLowerCase()
                    }

                    let page = 1
                    if (queryParams.page) {
                        page = parseInt(queryParams.page)
                    }

                	return store.dispatch(getIpdHospitals(state, page, true, searchUrl, (loadMore, resultFound) => {

                		if(!resultFound){
                			resolve({ status: 404})
                		}else{
                			resolve({})
                		}
                	}))

                }).catch((e)=>{
                	reject()
                })
			}
			catch (e) {
				reject()
			}
		})
		
	}

	static contextTypes = {
        router: () => null
    }

	componentDidMount(){
		if(window){
			window.scrollTo(0,0)
		}
	}
	render(){

		return(
				<IpdHospitalSearchView {...this.props} />
			)
	}
}

const mapStateToProps = (state) => {
	
	const {
        selectedLocation,
        locationType
    } = state.SEARCH_CRITERIA_OPD

	const {
		filterCriteria,
		provider_ids,
		hospital_list,
		hospital_search_results,
		HOSPITAL_DATA,
		nextFilterCriteria,
		page,
		search_id_data,
		commonSelectedCriterias,
		nextSelectedCriterias,
		fetchNewResults,
		getNewResults,
		locationFetched,
		hospitalSearchSeoData,
		hospitalCanonicalUrl,
		hospitalBreadcrumb,
		hospital_search_content,
		hospital_bottom_content,
		HOSPITAL_SEARCH_DATA_LOADED
	} = state.SEARCH_CRITERIA_IPD

	return {
		selectedLocation,
		locationType,
		filterCriteria,
		provider_ids,
		hospital_list,
		hospital_search_results,
		HOSPITAL_DATA,
		nextFilterCriteria,
		page,
		search_id_data,
		commonSelectedCriterias,
		nextSelectedCriterias,
		fetchNewResults,
		getNewResults,
		locationFetched,
		hospitalSearchSeoData,
		hospitalCanonicalUrl,
		hospitalBreadcrumb,
		hospital_search_content,
		hospital_bottom_content,
		HOSPITAL_SEARCH_DATA_LOADED
	}
}

const mapDisptachToProps = (dispatch) => {

	return{
		getIpdHospitals: (state, page, fromServer, searchByUrl, cb)=> dispatch(getIpdHospitals(state, page, fromServer, searchByUrl, cb)),
		mergeIpdCriteria: (filterCriteria)=> dispatch(mergeIpdCriteria(filterCriteria)),
		urlShortner: (url, cb) => dispatch(urlShortner(url, cb)),
		setIpdSearchId: (search_id, filters, page) => dispatch(setIpdSearchId(search_id, filters, page)),
		getIpdSearchIdResults: (search_id, data) => dispatch(getIpdSearchIdResults(search_id, data))
	}
}
export default connect(mapStateToProps, mapDisptachToProps)(IpdHospitals)