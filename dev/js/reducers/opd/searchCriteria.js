import { SELECT_LOCATION_OPD, MERGE_SEARCH_STATE_OPD, TOGGLE_OPD_CRITERIA, LOAD_SEARCH_CRITERIA_OPD } from '../../constants/types';

const defaultState = {
    LOADED_SEARCH_CRITERIA_OPD: false,
    specializations: [],
    conditions: [],
    selectedCriterias: [],
    selectedLocation: null,
    filterCriteria: {
        priceRange: [100, 1500],
        sort_on: null,
        sits_at_clinic: false,
        sits_at_hospital: false,
        is_female: false,
        is_available: false
    }
}

export default function (state = defaultState, action) {

    switch (action.type) {
        case LOAD_SEARCH_CRITERIA_OPD: {
            let newState = { ...state }
            if (action.payload) {
                newState = { ...newState, ...action.payload }
            }
            newState.LOADED_SEARCH_CRITERIA_OPD = true
            return newState
        }

        case TOGGLE_OPD_CRITERIA: {
            let newState = {
                ...state,
                selectedCriterias: [].concat(state.selectedCriterias)
            }

            let found = false
            newState.selectedCriterias = newState.selectedCriterias.filter((curr) => {
                if (curr.id == action.payload.criteria.id && curr.type == action.payload.type) {
                    found = true
                    return false
                }
                return true
            })

            if (!found) {
                newState.selectedCriterias.push({
                    ...action.payload.criteria,
                    type: action.payload.type
                })
            }

            return newState
        }

        case SELECT_LOCATION_OPD: {
            let newState = { ...state }

            newState.selectedLocation = action.payload
            return newState
        }

        case MERGE_SEARCH_STATE_OPD: {
            let newState = { ...state, ...action.payload.searchState, filterCriteria: action.payload.filterCriteria }

            return newState
        }

    }
    return state
}





