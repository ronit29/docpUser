import { TOGGLE_IPD, LOADED_IPD_INFO, GET_IPD_HOSPITALS, MERGE_IPD_CRITERIA } from '../../constants/types';

const DEFAULT_HOSPITAL_FILTER_STATE = {
	distance:[0,20],
	provider_ids: []
}

const defaultState = {
	selectedIpd: [],
	selectedCriterias: [],
	ipd_info: {},
	IPD_INFO_LOADED: false,
	filterCriteria: DEFAULT_HOSPITAL_FILTER_STATE,
	provider_ids: [],
	hospital_list: [],
	hospital_search_results: {},
	HOSPITAL_DATA: {}
}

export default function ( state=defaultState, action) {

	switch(action.type) {

		case TOGGLE_IPD: {
			let newState = {
				...state,
				selectedCriterias: []
			}
			if(action.forceAdd) {
				newState.selectedCriterias.push({...action.payload})
			}else{
				let found = false 
				newState.selectedCriterias = newState.selectedCriterias.filter((ipd)=>{
					if(ipd.id == action.payload.id){
						found = true
						return false
					}
					return true
				})

				if(!found){
					newState.selectedCriterias.push(action.payload)
				}
				
			}

			return newState
		}

		case LOADED_IPD_INFO: {
			let newState = {
				...state
			}
			newState.IPD_INFO_LOADED = true
			newState.ipd_info= action.payload
			return newState
		}	

		case GET_IPD_HOSPITALS: {
			let newState = {
				...state,
				hospital_list: [].concat(state.hospital_list)
			}
			newState.hospital_search_results = {
				insurance_providers: action.payload.health_insurance_providers ||[],
				count: action.payload.count||0
			}

			action.payload.result.map((hospital) => {
				if(newState.hospital_list.indexOf(hospital.id)>-1){

				}else{
					newState.hospital_list = newState.hospital_list.concat(hospital.id)
				}
				if(newState.HOSPITAL_DATA[hospital.id]){
					newState.HOSPITAL_DATA[hospital.id] = Object.assign({}, newState.HOSPITAL_DATA[hospital.id], ...hospital)
				}else{
					newState.HOSPITAL_DATA[hospital.id] = {...hospital}					
				}
			})
			return newState
		}

		case MERGE_IPD_CRITERIA: {
			let newState = {
				...state,
				...action.payload
			}
			return newState
		}

	}
	return state
}