import { SET_FETCH_RESULTS_OPD, RESET_FILTER_STATE, SELECT_LOCATION_OPD, MERGE_SEARCH_STATE_OPD, TOGGLE_OPD_CRITERIA, LOAD_SEARCH_CRITERIA_OPD, SAVE_COMMON_PROCEDURES } from '../../constants/types';

const DEFAULT_FILTER_STATE = {
    priceRange: [0, 1500],
    distanceRange: [0, 15],
    sort_on: null,
    sits_at_clinic: false,
    sits_at_hospital: false,
    is_female: false,
    is_available: false,
    doctor_name: "",
    hospital_name: ""
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
    commonProcedurers: []
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
                filterCriteria: { ...state.filterCriteria }
            }

            newState.filterCriteria.doctor_name = ""
            newState.filterCriteria.hospital_name = ""

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
                newState.selectedCriterias = [{
                    ...action.payload.criteria,
                    type: action.payload.type
                }]
            } else if (!found) {
                newState.selectedCriterias.push({
                    ...action.payload.criteria,
                    type: action.payload.type
                })
            }
            newState.selectedCriteriaType = action.payload.type
            newState.fetchNewResults = true

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
                ...state,
                commonProcedurers: [].concat(state.commonProcedurers)
            }
            if (action.forceAdd) {
                newState.commonProcedurers = []
                action.payload.map((procedure) => {
                    newState.commonProcedurers.push({ type: "procedures", id: procedure, name: "" })
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
            }
            return newState
        }

    }
    return state
}





