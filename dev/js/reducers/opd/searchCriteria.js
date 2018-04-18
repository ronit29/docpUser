import { TOGGLE_CONDITIONS, TOGGLE_SPECIALITIES, SELECT_LOCATION, MERGE_SEARCH_STATE_OPD, TOGGLE_CRITERIA, TOGGLE_TESTS, TOGGLE_DIAGNOSIS_CRITERIA, SET_OPD_FILTERS, LOAD_SEARCH_CRITERIA_OPD } from '../../constants/types';

const defaultState = {
    commonlySearchedConditions: [{ id: 1, name: 'Headache' }, { id: 2, name: 'Stomach-ache' }, { id: 3, name: 'Flu' }, { id: 4, name: 'Hair Fall' }, { id: 5, name: 'Chest Pain' }],
    selectedConditions: {},
    commonlySearchedSpecialities: [{ id: 1, name: 'General Physicial' }, { id: 2, name: 'Neurology' }, { id: 3, name: 'Cardiologist' }, { id: 4, name: 'Orthopaedic' }, { id: 5, name: 'Infertility' }],
    selectedSpecialities: {},
    selectedCriteria: {},
    selectedLocation: null,
    filterCriteria: {},
    CRITERIA_LOADED: false
}

export default function (state = defaultState, action) {

    switch (action.type) {
        case LOAD_SEARCH_CRITERIA_OPD : {
            let newState = {...state}

            newState.CRITERIA_LOADED = true
            newState.filterCriteria = {}
            
            return newState
        }
        
        case TOGGLE_CONDITIONS: {
            let newState = {
                ...state,
                selectedConditions : {
                    ...state.selectedConditions
                }
            }

            if (newState.selectedConditions[action.payload.id]) {
                delete newState.selectedConditions[action.payload.id]
            } else {
                newState.selectedConditions[action.payload.id] = new Date()
            }
            return newState
        }

        case TOGGLE_SPECIALITIES: {
            let newState = {
                ...state,
                selectedSpecialities : {
                    ...state.selectedSpecialities
                }
            }

            if (newState.selectedSpecialities[action.payload.id]) {
                delete newState.selectedSpecialities[action.payload.id]
            } else {
                newState.selectedSpecialities[action.payload.id] = new Date()
            }

            return newState
        }

        case TOGGLE_CRITERIA: {
            let newState = {
                ...state,
                selectedCriteria : {
                    ...state.selectedCriteria
                }
            }

            if (newState.selectedCriteria[action.payload.id]) {
                delete newState.selectedCriteria[action.payload.id]
            } else {
                action.payload.ts = new Date()
                newState.selectedCriteria[action.payload.id] = action.payload
            }

            return newState
        }

        case SELECT_LOCATION: {
            let newState = { ...state }

            newState.selectedLocation = action.payload
            return newState
        }

        case SET_OPD_FILTERS: {
            let newState = { ...state }

            newState.filterCriteria = action.payload
            return newState
        }

        case MERGE_SEARCH_STATE_OPD: {
            let newState = { ...state }

            newState = Object.assign(newState, action.payload)
            newState.CRITERIA_LOADED = true
            return newState
        }
    }
    return state
}





