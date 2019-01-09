import { SET_FETCH_RESULTS_LAB, CLEAR_ALL_TESTS, CLEAR_EXTRA_TESTS, RESET_FILTER_STATE, APPEND_FILTERS_DIAGNOSIS, TOGGLE_CONDITIONS, TOGGLE_SPECIALITIES, SELECT_LOCATION_DIAGNOSIS, MERGE_SEARCH_STATE_LAB, TOGGLE_CRITERIA, TOGGLE_TESTS, TOGGLE_DIAGNOSIS_CRITERIA, LOAD_SEARCH_CRITERIA_LAB, ADD_DEFAULT_LAB_TESTS, ADD_LAB_PROFILE_TESTS, SET_CORPORATE_COUPON, SAVE_CURRENT_LAB_PROFILE_TESTS, SEARCH_TEST_INFO, GET_LAB_SEARCH_ID_RESULTS, SET_LAB_SEARCH_ID, SAVE_LAB_RESULTS_WITH_SEARCHID } from '../../constants/types';

const DEFAULT_FILTER_STATE = {
    priceRange: [0, 20000],
    distanceRange: [0, 15],
    sort_on: null,
    lab_name: "",
    network_id: ""
}

const defaultState = {
    LOADED_SEARCH_CRITERIA_LAB: false,
    common_tests: [],
    common_conditions: [],
    common_package: [],
    preferred_labs: [],
    selectedCriterias: [],
    selectedLocation: null,
    filterCriteria: DEFAULT_FILTER_STATE,
    lab_test_data: {},
    locationType: 'geo',
    fetchNewResults: false,
    corporateCoupon: "",
    currentLabSelectedTests: [],
    searchTestInfoData: {},
    page: 1,
    search_id_data : {},
    nextSelectedCriterias: [],
    currentSearchedCriterias: [],
    currentSearchId: '',
    nextFilterCriteria: DEFAULT_FILTER_STATE
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
                lab_test_data: { ...state.lab_test_data },
                filterCriteria: { ...state.filterCriteria },
                nextFilterCriteria: {...state.nextFilterCriteria}
            }

            newState.filterCriteria.lab_name = ""
            newState.filterCriteria.network_id = ""

            newState.nextFilterCriteria.lab_name = ""
            newState.nextFilterCriteria.network_id = ""

            if (action.payload.criteria.extra_test && action.payload.criteria.lab_id) {
                newState.lab_test_data[action.payload.criteria.lab_id] = newState.lab_test_data[action.payload.criteria.lab_id] || []

                newState.currentLabSelectedTests = newState.currentLabSelectedTests || []

                let found = false
                let foundTest = false
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

                if (action.payload.criteria.add_to_common) {
                    newState.currentLabSelectedTests.map((curr, key) => {
                        if (curr.id == action.payload.criteria.id && curr.type == action.payload.type) {
                            curr.is_selected = !curr.is_selected
                        }
                    })
                    /*
                                        newState.currentLabSelectedTests = newState.currentLabSelectedTests.filter((curr) => {
                                            if (curr.id == action.payload.criteria.id && curr.type == action.payload.type) {
                                                foundTest = true
                                                return false
                                            }
                                            return true
                                        })
                    
                                        if (!foundTest || action.payload.forceAdd) {
                                            newState.currentLabSelectedTests.push({
                                                ...action.payload.criteria,
                                                type: action.payload.type
                                            })
                                        }*/
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
                    newState.nextSelectedCriterias = [{
                        ...action.payload.criteria,
                        type: action.payload.type
                    }]
                    newState.currentSearchedCriterias = [{
                        ...action.payload.criteria,
                        type: action.payload.type
                    }]
                } else if (!found) {
                    newState.selectedCriterias.push({
                        ...action.payload.criteria,
                        type: action.payload.type
                    })
                    newState.nextSelectedCriterias.push({
                        ...action.payload.criteria,
                        type: action.payload.type
                    })
                    newState.currentSearchedCriterias.push({
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
            } else if (action.range == 'geoip') {
                newState.locationType = 'geoip'
            } else {
                newState.locationType = 'geo'
            }
            newState.fetchNewResults = !!action.fetchNewResults

            return newState
        }

        case MERGE_SEARCH_STATE_LAB: {
            let newState = {
                ...state,
                ...action.payload,
                fetchNewResults: !!action.fetchNewResults
            }

            let extra_tests = state.currentSearchedCriterias.filter(x => x.extra_test) || []
            newState.currentSearchedCriterias = newState.currentSearchedCriterias || []
            newState.currentSearchedCriterias = newState.currentSearchedCriterias.concat(extra_tests)
            return newState
        }

        case RESET_FILTER_STATE: {
            let newState = { ...state }
            newState.filterCriteria = DEFAULT_FILTER_STATE
            newState.nextFilterCriteria = DEFAULT_FILTER_STATE
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
            return newState
        }

        case SET_CORPORATE_COUPON: {
            let newState = { ...state }
            newState.corporateCoupon = action.payload
            return newState
        }

        case SAVE_CURRENT_LAB_PROFILE_TESTS: {
            let newState = {
                ...state
            }
            let selectedTestsId = []


            if (action.payload.tests && action.forceAdd) {
                newState.currentLabSelectedTests = []
                action.payload.tests.map((test_to_toggle, i) => {

                    let test = Object.assign({}, test_to_toggle)
                    test.mrp = test_to_toggle.mrp
                    test.deal_price = test_to_toggle.deal_price
                    test.extra_test = true
                    test.id = test_to_toggle.test.id
                    test.name = test_to_toggle.test.name
                    test.pre_test_info = test_to_toggle.test.pre_test_info
                    test.why = test_to_toggle.test.why
                    test.type = 'test'
                    test.lab_id = action.payload.lab.id
                    test.is_selected = true
                    newState.currentLabSelectedTests.push(test)
                    selectedTestsId.push(test_to_toggle.test.id)

                })
                if (newState.currentLabSelectedTests.length < 5) {
                    action.payload.lab_tests.map((test_to_toggle, i) => {
                        if (selectedTestsId.indexOf(test_to_toggle.test_id) == -1 && newState.currentLabSelectedTests.length < 5) {

                            let test = Object.assign({}, test_to_toggle)
                            test.mrp = test_to_toggle.mrp
                            test.deal_price = test_to_toggle.deal_price
                            test.extra_test = true
                            test.id = test_to_toggle.test.id
                            test.name = test_to_toggle.test.name
                            test.pre_test_info = test_to_toggle.test.pre_test_info
                            test.why = test_to_toggle.test.why
                            test.type = 'test'
                            test.lab_id = action.payload.lab.id
                            test.is_selected = false
                            test.test = test_to_toggle.test
                            newState.currentLabSelectedTests.push(test)
                        }
                    })
                }

            } else {

            }
            return newState
        }
        case SEARCH_TEST_INFO: {
            let newState = {
                ...state
            }
            newState.searchTestInfoData = action.payload
            return newState
        }

        case SET_LAB_SEARCH_ID: {
            let newState = {
                ...state,
                selectedCriterias:[...state.selectedCriterias],
                search_id_data: {...state.search_id_data}
            }

            if(action.setDefault){
                
                newState.search_id_data[action.searchId] = {}
                newState.search_id_data[action.searchId].commonSelectedCriterias = action.payload.commonSelectedCriterias
                newState.search_id_data[action.searchId].filterCriteria = action.payload.filterCriteria
                newState.search_id_data[action.searchId].data = {}
                newState.currentSearchedCriterias = action.payload.commonSelectedCriterias
                newState.nextSelectedCriterias = []
                newState.nextFilterCriteria = DEFAULT_FILTER_STATE
                newState.filterCriteria = action.payload.filterCriteria
                newState.currentSearchId = action.searchId

            }/*else if(newState.search_id_data[action.searchId]){

                newState.search_id_data[action.searchId].filterCriteria = action.payload
            }*/
            
            return newState

        }

        case GET_LAB_SEARCH_ID_RESULTS: {
            let newState = {
                ...state
            }
            if(newState.search_id_data && newState.search_id_data[action.searchId]){
                newState.currentSearchedCriterias = newState.search_id_data[action.searchId].commonSelectedCriterias
                newState.filterCriteria = newState.search_id_data[action.searchId].filterCriteria
                newState.currentSearchId = action.searchId
                newState.nextSelectedCriterias = []
                newState.nextFilterCriteria = DEFAULT_FILTER_STATE
            }
            return newState
        }

        case SAVE_LAB_RESULTS_WITH_SEARCHID: {
            let newState = {
                ...state,
                search_id_data: {...state.search_id_data}
            }
            if(newState.search_id_data && newState.search_id_data[newState.currentSearchId]){

                if(action.page ==1){
                    newState.search_id_data[newState.currentSearchId] = Object.assign({},newState.search_id_data[newState.currentSearchId])
                    newState.search_id_data[newState.currentSearchId].data = action.payload
                }
            }

            return newState

        }

    }
    return state
}





