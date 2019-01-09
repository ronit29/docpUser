import { FILTER_SEARCH_CRITERIA_OPD, SET_FETCH_RESULTS_OPD, RESET_FILTER_STATE, SELECT_LOCATION_OPD, MERGE_SEARCH_STATE_OPD, TOGGLE_OPD_CRITERIA, LOAD_SEARCH_CRITERIA_OPD, SAVE_COMMON_PROCEDURES, CLONE_SELECTED_CRITERIAS, MERGE_SELECTED_CRITERIAS, SET_SEARCH_ID, GET_SEARCH_ID_RESULTS , SAVE_RESULTS_WITH_SEARCHID } from '../../constants/types';

const DEFAULT_FILTER_STATE = {
    priceRange: [0, 1500],
    distanceRange: [0, 15],
    sort_on: null,
    sits_at_clinic: false,
    sits_at_hospital: false,
    is_female: false,
    is_available: false,
    doctor_name: "",
    hospital_name: "",
    hospital_id: ""
}

const defaultState = {
    LOADED_SEARCH_CRITERIA_OPD: false,
    specializations: [],
    conditions: [],
    selectedCriterias: [],
    selectedLocation: null,
    filterCriteria: DEFAULT_FILTER_STATE,
    locationType: 'geo',
    fetchNewResults: false,
    procedure_categories: [],
    selectedCriteriaType: '',
    commonProcedurers: [],
    getNewUrl: false,
    commonSelectedCriterias: [],
    page: 1,
    procedures: [],
    search_id_data : {},
    nextSelectedCriterias: [],
    nextFilterCriteria: DEFAULT_FILTER_STATE,
    currentSearchId:''
}

export default function (state = defaultState, action) {

    switch (action.type) {
        case LOAD_SEARCH_CRITERIA_OPD: {
            let newState = { ...state }
            if (action.payload) {
                newState = { ...newState, ...action.payload }
            }

            newState.selectedCriterias = newState.selectedCriterias.filter((curr) => {
                return curr.type == newState.selectedCriteriaType
            })
            newState.commonProcedurers = []
            newState.LOADED_SEARCH_CRITERIA_OPD = true
            return newState
        }

        case TOGGLE_OPD_CRITERIA: {
            let newState = {
                ...state,
                selectedCriterias: [].concat(state.selectedCriterias),
                filterCriteria: { ...state.filterCriteria },
                nextFilterCriteria: {...state.nextFilterCriteria}
            }

            newState.filterCriteria.doctor_name = ""
            newState.filterCriteria.hospital_name = ""
            newState.filterCriteria.hospital_id = ""

            newState.nextFilterCriteria.doctor_name = ""
            newState.nextFilterCriteria.hospital_name = ""
            newState.nextFilterCriteria.hospital_id = ""


            let found = false
            newState.selectedCriterias = newState.selectedCriterias.filter((curr) => {
                if (curr.id == action.payload.criteria.id && curr.type == action.payload.type) {
                    found = true
                    return false
                }
                return true
            })

            /**
             * QUICK HACK TO MAKE CONDITIONS AND SPECIALIZATIONS MUTUALLY EXCLUSIVE 
             * TO BE CHANGED IN FUTURE 
            **/

            /* if (action.payload.type == 'condition') {
                 newState.selectedCriterias = []
             } else {
                 newState.selectedCriterias = newState.selectedCriterias.filter((curr) => {
                     return curr.type != 'condition'
                 })
             }*/

            if (action.payload.type) {
                newState.selectedCriterias = newState.selectedCriterias.filter((curr) => {
                    return curr.type == action.payload.type
                })
            }

            if (action.payload.forceAdd) {
                newState.commonSelectedCriterias = [{
                    ...action.payload.criteria,
                    type: action.payload.type
                }]
                newState.nextSelectedCriterias = [{
                    ...action.payload.criteria,
                    type: action.payload.type
                }]
                newState.filterCriteria = DEFAULT_FILTER_STATE
                newState.nextFilterCriteria = DEFAULT_FILTER_STATE
            } else if (!found) {
                newState.selectedCriterias.push({
                    ...action.payload.criteria,
                    type: action.payload.type
                })
            }
            newState.selectedCriteriaType = action.payload.type
            newState.fetchNewResults = true

            if (action.payload.filters && Object.values(action.payload.filters).length) {
                newState.filterCriteria = Object.assign({}, newState.filterCriteria, action.payload.filters)
                newState.nextFilterCriteria = Object.assign({}, newState.filterCriteria, action.payload.filters)
            }

            return newState
        }

        case SELECT_LOCATION_OPD: {
            let newState = { ...state }

            newState.selectedLocation = action.payload
            if (action.range == 'autoComplete') {
                newState.locationType = 'autoComplete'
            } else if (action.range == 'autoDetect') {
                newState.locationType = 'autoDetect'
            } else if (action.range == 'geoip') {
                newState.locationType = 'geoip'
            } else {
                newState.locationType = 'geo'
            }
            newState.fetchNewResults = !!action.fetchNewResults

            return newState
        }

        case MERGE_SEARCH_STATE_OPD: {
            let newState = {
                ...state,
                ...action.payload,
                fetchNewResults: !!action.fetchNewResults
            }

            return newState
        }

        case RESET_FILTER_STATE: {
            let newState = { ...state }
            newState.filterCriteria = DEFAULT_FILTER_STATE
            newState.nextFilterCriteria = DEFAULT_FILTER_STATE
            // newState.fetchNewResults = true
            return newState
        }

        case SET_FETCH_RESULTS_OPD: {
            let newState = { ...state }
            newState.fetchNewResults = !!action.payload
            return newState
        }

        case SAVE_COMMON_PROCEDURES: {
            let newState = {
                ...state
            }
            if (action.forceAdd) {
                newState.getNewUrl = true
                newState.commonSelectedCriterias = newState.commonSelectedCriterias.filter(x => x.type != 'procedures')
                action.payload.map((procedure) => {
                    newState.commonSelectedCriterias.push({ type: "procedures", id: procedure, name: "" })
                    newState.nextSelectedCriterias.push({ type: "procedures", id: procedure, name: "" })
                })

            } else {
                let commonIds = newState.commonProcedurers.map(x => x.id)
                action.payload.map((procedure) => {
                    if (commonIds.indexOf(procedure.id) == -1) {
                        newState.commonProcedurers.push(procedure)
                    } else {
                        newState.commonProcedurers = newState.commonProcedurers.filter(x => x != x.id)
                    }
                })

                action.category_ids.map((category) => {

                })
            }
            return newState
        }

        case CLONE_SELECTED_CRITERIAS: {
            let newState = {
                ...state
            }
            newState.commonSelectedCriterias = [].concat(action.payload)
            newState.nextSelectedCriterias = [].concat(action.payload)
            return newState
        }

        case MERGE_SELECTED_CRITERIAS: {
            let newState = {
                ...state
            }

            newState.commonSelectedCriterias = []
            newState.filterCriteria = DEFAULT_FILTER_STATE
            newState.nextFilterCriteria = DEFAULT_FILTER_STATE
            newState.nextSelectedCriterias = []

            return newState
        }

        case FILTER_SEARCH_CRITERIA_OPD: {
            let newState = {
                ...state,
                selectedCriterias: [...state.selectedCriterias]
            }

            newState.selectedCriterias = newState.selectedCriterias.filter(x => x.type.includes(action.payload))

            return newState
        }

        case SET_SEARCH_ID: {
            let newState = {
                ...state,
                commonSelectedCriterias:[...state.commonSelectedCriterias],
                search_id_data: {...state.search_id_data}
            }

            if(action.setDefault){
                
                newState.search_id_data[action.searchId] = {}
                newState.search_id_data[action.searchId].commonSelectedCriterias = action.payload.commonSelectedCriterias
                newState.search_id_data[action.searchId].filterCriteria = action.payload.filterCriteria
                newState.search_id_data[action.searchId].data = {}
                newState.nextSelectedCriterias = []
                newState.nextFilterCriteria = DEFAULT_FILTER_STATE
                newState.commonSelectedCriterias = action.payload.commonSelectedCriterias
                newState.filterCriteria = action.payload.filterCriteria
                newState.fetchNewResults = true
                newState.currentSearchId = action.searchId
            }/*else if(newState.search_id_data[action.searchId]){

                newState.search_id_data[action.searchId].filterCriteria = action.payload
            }
            */
            return newState

        }

        case GET_SEARCH_ID_RESULTS: {
            let newState = {
                ...state
            }
            if(newState.search_id_data && newState.search_id_data[action.searchId]){
                newState.commonSelectedCriterias = newState.search_id_data[action.searchId].commonSelectedCriterias
                newState.filterCriteria = newState.search_id_data[action.searchId].filterCriteria
                newState.currentSearchId = action.searchId
                newState.nextSelectedCriterias = []
                newState.nextFilterCriteria = DEFAULT_FILTER_STATE
            }
            return newState
        }

        case SAVE_RESULTS_WITH_SEARCHID: {
            let newState = {
                ...state,
                search_id_data: {...state.search_id_data}
            }
            if(newState.search_id_data && newState.search_id_data[newState.currentSearchId]){
                //let resultIds = action.payload.result.map(x=>x.id)
                if(action.page == 1){
                    newState.search_id_data[newState.currentSearchId] = Object.assign(newState.search_id_data[newState.currentSearchId])
                    newState.search_id_data[newState.currentSearchId].data = action.payload
                    newState.search_id_data[newState.currentSearchId].clinic_card = action.payload.clinic_card
                    /*
                    newState.search_id_data[newState.currentSearchId].searchResults = action.payload.result
                    newState.search_id_data[newState.currentSearchId].searchResultIds = action.payload.result.map(x=>x.id)*/
                }else{
                    /*
                    newState.search_id_data[newState.currentSearchId].searchResults = newState.search_id_data[newState.currentSearchId].searchResults.concat(action.payload.result)
                    newState.search_id_data[newState.currentSearchId].searchResultIds = newState.search_id_data[newState.currentSearchId].searchResultIds.concat(action.payload.result.map(x=>x.id))*/
                }
                
            }
            return newState
        }

    }
    return state
}





