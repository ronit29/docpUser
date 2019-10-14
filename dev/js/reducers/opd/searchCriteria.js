import { MERGE_SEARCH_STATE_LAB, FILTER_SEARCH_CRITERIA_OPD, SET_FETCH_RESULTS_OPD, RESET_FILTER_STATE, SELECT_LOCATION_OPD, MERGE_SEARCH_STATE_OPD, TOGGLE_OPD_CRITERIA, LOAD_SEARCH_CRITERIA_OPD, SAVE_COMMON_PROCEDURES, CLONE_SELECTED_CRITERIAS, MERGE_SELECTED_CRITERIAS, SET_SEARCH_ID, GET_SEARCH_ID_RESULTS, SAVE_RESULTS_WITH_SEARCHID, MERGE_URL_STATE, SET_URL_PAGE, SET_NEXT_SEARCH_CRITERIA, CLEAR_OPD_SEARCH_ID, LOAD_INSURANCE_CRITERIA, SAVE_NEARBY_HOSPITALS, SAVE_TOP_HOSPITALS, CLEAR_OPD_PAGE_NUMBER } from '../../constants/types';

// const moment = require('moment');
const DEFAULT_FILTER_STATE = {
    //priceRange: [0, 3000],
    //distanceRange: [0, 15],
    sort_on: '',
    sort_order: '',
    sits_at_clinic: false,
    sits_at_hospital: false,
    gender: '',
    availability: [],
    rating: '',
    doctor_name: "",
    hospital_name: "",
    hospital_id: "",
    is_insured: false,
    specialization_filter_ids:[]
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
    search_id_data: {},
    nextSelectedCriterias: [],
    nextFilterCriteria: DEFAULT_FILTER_STATE,
    currentSearchId: '',
    mergeUrlState: false,
    last_save_searched_date: null,
    ipd_procedures: [],
    top_hospitals: [],
    common_settings:null,
    package_categories:[],
    nearbyHospitals: {},
    topHospitals: {}
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
                nextFilterCriteria: { ...state.nextFilterCriteria }
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

        case MERGE_SEARCH_STATE_LAB: {
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
                commonSelectedCriterias: [...state.commonSelectedCriterias],
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
            newState.nextSelectedCriterias = []
            newState.nextFilterCriteria = DEFAULT_FILTER_STATE
            newState.commonSelectedCriterias = action.payload.commonSelectedCriterias
            newState.filterCriteria = action.payload.filterCriteria
            newState.fetchNewResults = true
            newState.currentSearchId = action.searchId
            newState.page = action.page
            return newState

        }

        case GET_SEARCH_ID_RESULTS: {
            let newState = {
                ...state
            }
            if (newState.search_id_data && newState.search_id_data[action.searchId]) {
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
                search_id_data: { ...state.search_id_data }
            }
            if (newState.search_id_data && newState.search_id_data[newState.currentSearchId]) {

                newState.search_id_data[newState.currentSearchId] = Object.assign(newState.search_id_data[newState.currentSearchId])
                newState.search_id_data[newState.currentSearchId].commonSelectedCriterias = action.commonSelectedCriterias
                if (action.page == 1) {
                    newState.search_id_data[newState.currentSearchId].data = action.payload
                    newState.search_id_data[newState.currentSearchId].clinic_card = action.clinic_card

                } else if (newState.search_id_data[newState.currentSearchId].data) {
                    if (Object.values(newState.search_id_data[newState.currentSearchId].data).length && newState.search_id_data[newState.currentSearchId].data.result) {

                        newState.search_id_data[newState.currentSearchId].data.result = newState.search_id_data[newState.currentSearchId].data.result.concat(action.payload.result)
                    } else {
                        newState.search_id_data[newState.currentSearchId].data = action.payload
                        newState.search_id_data[newState.currentSearchId].clinic_card = action.clinic_card
                    }

                }

            }
            return newState
        }

        case MERGE_URL_STATE: {
            let newState = {
                ...state
            }

            newState.mergeUrlState = action.payload
            return newState
        }

        case SET_URL_PAGE: {
            let newState = {
                ...state
            }
            newState.page = action.payload
            return newState
        }

        case SET_NEXT_SEARCH_CRITERIA: {
            let newState = {
                ...state
            }
            newState.nextSelectedCriterias = newState.commonSelectedCriterias
            return newState
        }

        case CLEAR_OPD_SEARCH_ID: {
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
        case LOAD_INSURANCE_CRITERIA:{
            let newState = {
                ...state
            }
            newState.common_settings = action.payload
            return newState
        }
        case CLEAR_OPD_PAGE_NUMBER:{
            let newState = {
                ...state
            }
            newState.page = 1
            return newState
        }

        case SAVE_NEARBY_HOSPITALS:{
            let newState = {
                ...state
            }
            newState.nearbyHospitals = action.payload
            return newState
        }

        case SAVE_TOP_HOSPITALS: {
            let newState = {
                ...state
            }
            newState.topHospitals = action.payload
            return newState
        }

    }
    return state
}





