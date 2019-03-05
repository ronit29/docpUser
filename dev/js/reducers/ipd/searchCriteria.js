import { TOGGLE_IPD, LOADED_IPD_INFO } from '../../constants/types';

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
	provider_ids: []
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
	}
	return state
}