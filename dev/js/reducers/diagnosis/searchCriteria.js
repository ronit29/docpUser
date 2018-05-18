import { APPEND_FILTERS_DIAGNOSIS, TOGGLE_CONDITIONS, TOGGLE_SPECIALITIES, SELECT_LOCATION_DIAGNOSIS, MERGE_SEARCH_STATE_LAB, TOGGLE_CRITERIA, TOGGLE_TESTS, TOGGLE_DIAGNOSIS_CRITERIA, LOAD_SEARCH_CRITERIA_LAB } from '../../constants/types';

const defaultState = {
    LOADED_SEARCH_CRITERIA_LAB: false,
    common_tests: [],
    common_conditions: [],
    preferred_labs: [],
    selectedCriterias: [],
    selectedLocation: null,
    filterCriteria: {
        priceRange: [100, 1500],
        distanceRange: [1, 35],
        sortBy: null
    }
}

export default function (state = defaultState, action) {

    switch (action.type) {
        case LOAD_SEARCH_CRITERIA_LAB: {
            let newState = { ...state }
            if (action.payload) {
                newState = { ...newState, ...action.payload }
            }
            newState.LOADED_SEARCH_CRITERIA_LAB = true
            return newState
        }

        case TOGGLE_DIAGNOSIS_CRITERIA: {
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

        case SELECT_LOCATION_DIAGNOSIS: {
            let newState = { ...state }

            newState.selectedLocation = action.payload
            return newState
        }

        case MERGE_SEARCH_STATE_LAB: {
            let newState = { ...state, ...action.payload.searchState, filterCriteria : action.payload.filterCriteria }

            return newState
        }

    }
    return state
}





