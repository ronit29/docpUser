import { TOGGLE_CONDITIONS, TOGGLE_SPECIALITIES, SELECT_LOCATION, MERGE_SEARCH_STATE, TOGGLE_CRITERIA, TOGGLE_TESTS, TOGGLE_DIAGNOSIS_CRITERIA } from '../../constants/types';

const defaultState = {
    commonlySearchedTests: [{ id: 1, name: 'General Physicial' }, { id: 2, name: 'Neurology' }, { id: 3, name: 'Cardiologist' }, { id: 4, name: 'Orthopaedic' }, { id: 5, name: 'Infertility' }],
    selectedTests: {},
    selectedDiagnosisCriteria : {},
    selectedLocation: null
}

export default function (state = defaultState, action) {

    switch (action.type) {
        
        case TOGGLE_TESTS: {
            let newState = {
                ...state,
                selectedTests : {
                    ...state.selectedTests
                }
            }

            if (newState.selectedTests[action.payload.id]) {
                delete newState.selectedTests[action.payload.id]
            } else {
                newState.selectedTests[action.payload.id] = new Date()
            }

            return newState
        }

        case TOGGLE_DIAGNOSIS_CRITERIA: {
            let newState = {
                ...state,
                selectedDiagnosisCriteria : {
                    ...state.selectedDiagnosisCriteria
                }
            }

            if (newState.selectedDiagnosisCriteria[action.payload.id]) {
                delete newState.selectedDiagnosisCriteria[action.payload.id]
            } else {
                action.payload.ts = new Date()
                newState.selectedDiagnosisCriteria[action.payload.id] = action.payload
            }

            return newState
        }

        case SELECT_LOCATION: {
            let newState = { ...state }

            newState.selectedLocation = action.payload
            return newState
        }

        case MERGE_SEARCH_STATE: {
            let newState = { ...state }

            newState = Object.assign(newState, action.payload)
            return newState
        }
    }
    return state
}





