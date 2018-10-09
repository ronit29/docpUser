import { SET_FETCH_RESULTS_LAB, CLEAR_ALL_TESTS, CLEAR_EXTRA_TESTS, RESET_FILTER_STATE, APPEND_FILTERS_DIAGNOSIS, TOGGLE_CONDITIONS, TOGGLE_SPECIALITIES, SELECT_LOCATION_DIAGNOSIS, MERGE_SEARCH_STATE_LAB, TOGGLE_CRITERIA, TOGGLE_TESTS, TOGGLE_DIAGNOSIS_CRITERIA, LOAD_SEARCH_CRITERIA_LAB, ADD_DEFAULT_LAB_TESTS, ADD_LAB_PROFILE_TESTS } from '../../constants/types';

const DEFAULT_FILTER_STATE = {
    priceRange: [0, 20000],
    distanceRange: [0, 35],
    sort_on: null
}

const defaultState = {
    LOADED_SEARCH_CRITERIA_LAB: false,
    common_tests: [],
    common_conditions: [],
    preferred_labs: [],
    selectedCriterias: [],
    selectedLocation: null,
    filterCriteria: DEFAULT_FILTER_STATE,
    lab_test_data: {},
    locationType: 'geo',
    fetchNewResults: false,
    lab_profile_demo_tests: [],
    lab_tests: {}
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
                selectedCriterias: [].concat(state.selectedCriterias),
                lab_test_data: { ...state.lab_test_data }
            }

            if (action.payload.criteria.extra_test && action.payload.criteria.lab_id) {
                newState.lab_test_data[action.payload.criteria.lab_id] = newState.lab_test_data[action.payload.criteria.lab_id] || []

                let found = false
                newState.lab_test_data[action.payload.criteria.lab_id] = newState.lab_test_data[action.payload.criteria.lab_id].filter((curr) => {
                    if (curr.id == action.payload.criteria.id && curr.type == action.payload.type) {
                        found = true
                        return false
                    }
                    return true
                })

                if (!found || action.payload.forceAdd) {
                    newState.lab_test_data[action.payload.criteria.lab_id].push({
                        ...action.payload.criteria,
                        type: action.payload.type
                    })
                }

            } else {
                let found = false
                newState.selectedCriterias = newState.selectedCriterias.filter((curr) => {
                    if (curr.id == action.payload.criteria.id && curr.type == action.payload.type) {
                        found = true
                        return false
                    }
                    return true
                })

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
                newState.fetchNewResults = true
            }

            return newState
        }

        case SELECT_LOCATION_DIAGNOSIS: {
            let newState = { ...state }

            newState.selectedLocation = action.payload
            if (action.range == 'autoComplete') {
                newState.locationType = 'autoComplete'
            } else if (action.range == 'autoDetect') {
                newState.locationType = 'autoDetect'
            } else {
                newState.locationType = 'geo'
            }
            newState.fetchNewResults = action.fetchNewResults

            return newState
        }

        case MERGE_SEARCH_STATE_LAB: {
            let newState = {
                ...state,
                ...action.payload,
                fetchNewResults: action.fetchNewResults
            }

            let extra_tests = state.selectedCriterias.filter(x => x.extra_test) || []
            newState.selectedCriterias = newState.selectedCriterias || []
            newState.selectedCriterias = newState.selectedCriterias.concat(extra_tests)
            return newState
        }

        case RESET_FILTER_STATE: {
            let newState = { ...state }
            newState.filterCriteria = DEFAULT_FILTER_STATE
            return newState
        }

        case CLEAR_EXTRA_TESTS: {
            let newState = {
                ...state,
                selectedCriterias: [].concat(state.selectedCriterias),
                lab_test_data: {}
            }

            newState.selectedCriterias = newState.selectedCriterias.filter((x) => {
                return !x.extra_test
            })
            return newState
        }

        case CLEAR_ALL_TESTS: {
            let newState = {
                ...state,
                selectedCriterias: [],
                lab_test_data: {}
            }

            return newState
        }

        case SET_FETCH_RESULTS_LAB: {
            let newState = { ...state }
            newState.fetchNewResults = !!action.payload
        }

        case ADD_DEFAULT_LAB_TESTS: {
            let newState = {
                ...state
            }
            /*
            newState.lab_test_data[action.labId]=[]

            newState.lab_test_data[action.labId] = action.payload*/

            newState.lab_tests[action.labId] = []

            newState.lab_tests[action.labId] = action.payload
            return newState
        }

        case ADD_LAB_PROFILE_TESTS: {
            let newState = {
                ...state
            }
            if (newState.lab_profile_demo_tests.length) {

                if (newState.lab_profile_demo_tests.indexOf(action.payload) > -1) {
                    let tests = newState.lab_profile_demo_tests
                    tests.splice(tests.indexOf(action.payload), 1)
                    newState.lab_profile_demo_tests.concat(tests)
                } else {

                    newState.lab_profile_demo_tests.push(action.payload)
                }
            } else {
                newState.lab_profile_demo_tests = newState.lab_profile_demo_tests || []
                newState.lab_profile_demo_tests.push(action.payload)
            }

            return newState
        }

    }
    return state
}





