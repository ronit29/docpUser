import { TOGGLE_IPD, LOADED_IPD_INFO, GET_IPD_HOSPITALS, MERGE_IPD_CRITERIA, SET_IPD_SEARCH_ID, SAVE_IPD_RESULTS_WITH_SEARCHID, GET_IPD_SEARCH_ID_RESULTS, SELECT_IPD_LOCATION_STATUS, GET_IPD_HOSPITAL_DETAIL, CLEAR_IPD_SEARCH_IDS, GET_IPD_HOSPITAL_DETAIL_START, LOADED_IPD_INFO_START } from '../../constants/types';

// const moment = require('moment');

const DEFAULT_HOSPITAL_FILTER_STATE = {
	distance:[0,20],
	provider_ids: []
}

const defaultState = {
	selectedIpd: [],
	selectedCriterias: [],
	commonSelectedCriterias: [],
	nextSelectedCriterias: [],
	ipd_info: {},
	IPD_INFO_LOADED: false,
	filterCriteria: DEFAULT_HOSPITAL_FILTER_STATE,
	hospital_list: [],
	hospital_search_results: {},
	HOSPITAL_DATA: {},
	search_id_data: {},
	last_save_searched_date: null,
	nextFilterCriteria: DEFAULT_HOSPITAL_FILTER_STATE,
	currentSearchId: '',
	page:1,
	fetchNewResults: false,
	getNewResults: true,
	ipd_hospital_detail: {},
	HOSPITAL_DETAIL_LOADED: false,
	locationFetched: false
}

export default function ( state=defaultState, action) {

	switch(action.type) {

		case TOGGLE_IPD: {
			let newState = {
				...state,
				selectedCriterias: [],
				commonSelectedCriterias: [],
				nextSelectedCriterias: []
			}
			if(action.forceAdd) {
				newState.selectedCriterias.push({...action.payload})
				newState.commonSelectedCriterias.push({...action.payload})
				newState.nextSelectedCriterias.push({...action.payload})
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
			if(action.payload && action.payload.about && action.payload.about.id){
				newState.commonSelectedCriterias = [{'id': action.payload.about.id, 'name': action.payload.about.name}]
			}
			newState.ipd_info= action.payload
			return newState
		}	

		case GET_IPD_HOSPITALS: {
			let newState = {
				...state,
				hospital_list: []
			}
			newState.hospital_search_results = {
				insurance_providers: action.payload.health_insurance_providers ||[],
				count: action.payload.count||0
			}

			newState.getNewResults = false
			newState.fetchNewResults = false

			action.payload && action.payload.result && action.payload.result.map((hospital) => {
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

		case SET_IPD_SEARCH_ID: {
			let newState = {
                ...state,
                search_id_data: {...state.search_id_data}
            }
            if(!newState.last_save_searched_date){
                newState.last_save_searched_date = new Date()
            }
           	newState.search_id_data[action.searchId] = {}
           	newState.search_id_data[action.searchId].commonSelectedCriterias = action.payload.commonSelectedCriterias
            newState.search_id_data[action.searchId].filterCriteria = action.payload.filterCriteria
            newState.search_id_data[action.searchId].data = {}
            newState.search_id_data[action.searchId].page = action.page
            newState.nextSelectedCriterias = []
            newState.nextFilterCriteria = DEFAULT_HOSPITAL_FILTER_STATE
            newState.commonSelectedCriterias = action.payload.commonSelectedCriterias
            newState.filterCriteria = action.payload.filterCriteria
            newState.fetchNewResults = true
            newState.currentSearchId = action.searchId
            newState.page = action.page
            return newState

		}

		case SAVE_IPD_RESULTS_WITH_SEARCHID: {
			let newState = {
				...state,
				search_id_data: {...state.search_id_data}
			}
			if(newState.search_id_data && newState.search_id_data[newState.currentSearchId]){
                
                newState.search_id_data[newState.currentSearchId] = Object.assign(newState.search_id_data[newState.currentSearchId])
                if(action.page == 1){
                    newState.search_id_data[newState.currentSearchId].data = action.payload

                }else if(newState.search_id_data[newState.currentSearchId].data){
                    if(Object.values(newState.search_id_data[newState.currentSearchId].data).length && newState.search_id_data[newState.currentSearchId].data.result){

                        newState.search_id_data[newState.currentSearchId].data.result = newState.search_id_data[newState.currentSearchId].data.result.concat(action.payload.result)    
                    }else{
                        newState.search_id_data[newState.currentSearchId].data = action.payload
                     
                    }
                    
                }
                
            }
            return newState
		}

		case GET_IPD_SEARCH_ID_RESULTS: {
            let newState = {
                ...state
            }
            if(newState.search_id_data && newState.search_id_data[action.searchId]){
                newState.commonSelectedCriterias = newState.search_id_data[action.searchId].commonSelectedCriterias
                newState.filterCriteria = newState.search_id_data[action.searchId].filterCriteria
                newState.currentSearchId = action.searchId
                newState.nextSelectedCriterias = []
                newState.nextFilterCriteria = DEFAULT_HOSPITAL_FILTER_STATE
            }
            return newState
        }

        case SELECT_IPD_LOCATION_STATUS: {
        	let newState = {
        		...state
        	}
        	newState.locationFetched = true
        	newState.fetchNewResults = !!action.fetchNewResults
        	return newState
        }

        case GET_IPD_HOSPITAL_DETAIL: {
        	let newState = {
        		...state
        	}
        	newState.HOSPITAL_DETAIL_LOADED = true
        	newState.ipd_hospital_detail = action.payload
        	return newState
        }

        case CLEAR_IPD_SEARCH_IDS: {
        	let newState = {
        		...state
        	}
        	if(newState.last_save_searched_date){

				const date1 = new Date()
                const date2 = new Date(newState.last_save_searched_date)
                const diffTime = Math.abs(date1.getTime() - date2.getTime())
				const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
				
                if(diffDays>2){
                    newState.search_id_data = {}
                    newState.last_save_searched_date = null
                }
            }
        	return newState
        }

        case GET_IPD_HOSPITAL_DETAIL_START: {
        	let newState = {
        		...state
        	}
        	newState.HOSPITAL_DETAIL_LOADED = false

        	return newState
        }

        case LOADED_IPD_INFO_START: {
        	let newState = {
        		...state
        	}

        	newState.IPD_INFO_LOADED = false
        	return newState
        }

	}
	return state
}