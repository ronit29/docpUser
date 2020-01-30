import { MERGE_SEARCH_STATE_OPD, SET_FETCH_RESULTS_LAB, CLEAR_ALL_TESTS, CLEAR_EXTRA_TESTS, RESET_FILTER_STATE, APPEND_FILTERS_DIAGNOSIS, TOGGLE_CONDITIONS, TOGGLE_SPECIALITIES, SELECT_LOCATION_DIAGNOSIS, MERGE_SEARCH_STATE_LAB, TOGGLE_CRITERIA, TOGGLE_TESTS, TOGGLE_DIAGNOSIS_CRITERIA, LOAD_SEARCH_CRITERIA_LAB, ADD_DEFAULT_LAB_TESTS, ADD_LAB_PROFILE_TESTS, SET_CORPORATE_COUPON, SAVE_CURRENT_LAB_PROFILE_TESTS, SEARCH_TEST_INFO, GET_LAB_SEARCH_ID_RESULTS, SET_LAB_SEARCH_ID, SAVE_LAB_RESULTS_WITH_SEARCHID, SET_LAB_URL_PAGE, CLEAR_LAB_SEARCH_ID, TOGGLE_PACKAGE_ID, TOGGLE_SEARCH_PACKAGES, SAVE_PINCODE, TOGGLE_COMPARE_PACKAGE, RESET_COMPARE_STATE, SAVE_PATIENT_DETAILS, CLEAR_SAVED_PATIENT_DETAILS } from '../../constants/types';

// const moment = require('moment');

const DEFAULT_FILTER_STATE = {
    //priceRange: [0, 20000],
    //distanceRange: [0, 15],
    sort_on: '',
    sort_order: '',
    avg_rating: '',
    availability: [],
    home_visit: false,
    lab_visit: false,
    lab_name: "",
    network_id: "",
    is_insured: false
}

const DEFAULT_FILTER_STATE_PACKAGES = {
    /*priceRange: [0, 20000],
    distanceRange: [0, 15],
    */
    sort_on:'',
    sort_order: '',
    avg_rating: '',
    home_visit: false,
    lab_visit: false,
    lab_name: "",
    network_id: "",
    catIds: [],
    max_age: '',
    min_age: '',
    gender: '',
    packageType: '',
    test_ids: '',
    selectCatIDs: [],
    package_ids: []
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
    search_id_data: {},
    nextSelectedCriterias: [],
    currentSearchedCriterias: [],
    currentSearchId: '',
    nextFilterCriteria: DEFAULT_FILTER_STATE,
    pincode: null,
    filterCriteriaPackages: DEFAULT_FILTER_STATE_PACKAGES,
    recommended_package: [],
    last_save_searched_date: null,
    selectedPackages: [],
    compare_packages: [],
    saved_patient_details: {}
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
                nextFilterCriteria: { ...state.nextFilterCriteria }
            }

            newState.filterCriteria.lab_name = ""
            newState.filterCriteria.network_id = ""

            newState.nextFilterCriteria.lab_name = ""
            newState.nextFilterCriteria.network_id = ""

            if(action.payload.forceAddTestids){
                let forcedAddedTests = []
                newState.lab_test_data[action.payload.labId] = []
                action.payload.tests.map((x=>{
                    forcedAddedTests.push({extra_test: true, id: x.test.id, lab_id: action.payload.labId, name: x.test.name, type: 'test',url: x.test.url, hide_price: x.hide_price|| false })
                }))
                newState.lab_test_data[action.payload.labId] = forcedAddedTests
            }else if (action.payload.criteria.extra_test && action.payload.criteria.lab_id) {
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

        case MERGE_SEARCH_STATE_OPD: {
            let newState = { ...state }

            if (action.payload.selectedLocation) {
                newState.selectedLocation = action.payload.selectedLocation
            }

            return newState
        }

        case RESET_FILTER_STATE: {
            let newState = { ...state }
            newState.filterCriteria = DEFAULT_FILTER_STATE
            newState.nextFilterCriteria = DEFAULT_FILTER_STATE
            newState.filterCriteriaPackages = DEFAULT_FILTER_STATE_PACKAGES
            newState.filterCriteriaPackages.catIds = []
            // newState.fetchNewResults = true
            return newState
        }

        case CLEAR_EXTRA_TESTS: {
            let newState = {
                ...state,
                selectedCriterias: [].concat(state.selectedCriterias),
                lab_test_data: {},
                currentLabSelectedTests: [],
                currentSearchedCriterias: []
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
                lab_test_data: {},
                nextSelectedCriterias: []
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
                selectedCriterias: [...state.selectedCriterias],
                search_id_data: { ...state.search_id_data }
            }

            if (!newState.last_save_searched_date) {
                newState.last_save_searched_date = new Date()
            }

            newState.search_id_data[action.searchId] = {}
            newState.search_id_data[action.searchId].commonSelectedCriterias = action.payload.commonSelectedCriterias
            newState.search_id_data[action.searchId].filterCriteria = action.payload.filterCriteria
            newState.search_id_data[action.searchId].data = {}
            newState.search_id_data[action.searchId].page = action.page
            newState.currentSearchedCriterias = action.payload.commonSelectedCriterias
            newState.nextSelectedCriterias = []
            newState.nextFilterCriteria = DEFAULT_FILTER_STATE
            newState.filterCriteria = action.payload.filterCriteria
            newState.currentSearchId = action.searchId
            newState.fetchNewResults = true
            newState.page = action.page

            return newState

        }

        case GET_LAB_SEARCH_ID_RESULTS: {
            let newState = {
                ...state
            }
            if (newState.search_id_data && newState.search_id_data[action.searchId]) {
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
                search_id_data: { ...state.search_id_data }
            }
            if (newState.search_id_data && newState.search_id_data[newState.currentSearchId]) {
                newState.search_id_data[newState.currentSearchId] = Object.assign({}, newState.search_id_data[newState.currentSearchId])
                if (action.page == 1) {

                    newState.search_id_data[newState.currentSearchId].data = action.payload

                } else if (newState.search_id_data[newState.currentSearchId].data) {
                    if (Object.values(newState.search_id_data[newState.currentSearchId].data).length && newState.search_id_data[newState.currentSearchId].data.result) {

                        newState.search_id_data[newState.currentSearchId].data.result = newState.search_id_data[newState.currentSearchId].data.result.concat(action.payload.result)
                    } else {
                        newState.search_id_data[newState.currentSearchId].data = action.payload
                    }

                }
            }

            return newState

        }

        case SET_LAB_URL_PAGE: {
            let newState = {
                ...state
            }
            newState.page = action.payload
            return newState
        }

        case SAVE_PINCODE: {
            let newState = {
                ...state
            }
            newState.pincode = action.payload
            return newState
        }
        case TOGGLE_PACKAGE_ID: {
            let newState = {
                ...state,
                filterCriteriaPackages: { ...state.filterCriteriaPackages }
            }

            if (newState.filterCriteriaPackages) {
                newState.filterCriteriaPackages.package_ids = []
                newState.filterCriteriaPackages.package_ids.push(action.package_id);
                // if (action.isHomePage) {
                //     newState.filterCriteriaPackages.package_ids.push(action.package_id);
                // } else {
                //     newState.filterCriteriaPackages.package_ids = action.package_id
                // }
            }
            return newState
        }

        case TOGGLE_SEARCH_PACKAGES: {
            let newState = {
                ...state,
                selectedPackages: [].concat(state.selectedPackages)
            }
            if (action.healthPackage) {
                let ids = newState.selectedPackages.filter(x => x.id == action.healthPackage.id)
                if (ids.length) {
                    newState.selectedPackages = newState.selectedPackages.filter(x => x.id != action.healthPackage.id)
                } else {
                    newState.selectedPackages.push(action.healthPackage)
                }
            }
            return newState
        }

        case CLEAR_LAB_SEARCH_ID: {
            let newState = {
                ...state
            }
            if (newState.last_save_searched_date) {
                const date1 = new Date()
                const date2 = new Date(newState.last_save_searched_date)
                const diffTime = Math.abs(date1.getTime() - date2.getTime())
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

                if (diffDays > 2) {
                    newState.search_id_data = {}
                    newState.last_save_searched_date = null
                }
            }
            return newState
        }

        case TOGGLE_COMPARE_PACKAGE: {
            let newState = {
                ...state,
                compare_packages: [].concat(state.compare_packages)
            }

            let selected_packages = [].concat(newState.compare_packages)
            let found = false
            if(action.reset){
                newState.compare_packages = action.payload.criteria
            }else{    
                selected_packages = selected_packages.filter((x) => {
                  if (x.id == action.payload.criteria.id && x.lab_id == action.payload.criteria.lab_id) {
                      found = true
                      return false
                  }
                  return true
                })
                  if (!found) {
                      selected_packages.push(action.payload.criteria)
                  }
              newState.compare_packages = selected_packages
            }
            return newState
        }

        case RESET_COMPARE_STATE:{
            let newState = { ...state }
            newState.compare_packages = defaultState.compare_packages
            return newState
        }

        case SAVE_PATIENT_DETAILS:{
            let newState = { ...state }
            newState.saved_patient_details = action.payload.criteria
            return newState
        }

        case CLEAR_SAVED_PATIENT_DETAILS:{
            // IN CASE OF BOOKING SUMMARY USER
            let newState = { ...state }
            newState.saved_patient_details = {}
            return newState
        }

    }
    return state
}