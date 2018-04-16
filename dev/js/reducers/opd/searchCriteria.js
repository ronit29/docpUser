import { TOOGLE_CONDITIONS, TOOGLE_SPECIALITIES, SELECT_LOCATION, MERGE_SEARCH_STATE, TOGGLE_CRITERIA } from '../../constants/types';

const defaultState = {
    commonlySearchedConditions: [{ id: 1, name: 'Headache' }, { id: 2, name: 'Stomach-ache' }, { id: 3, name: 'Flu' }, { id: 4, name: 'Hair Fall' }, { id: 5, name: 'Chest Pain' }],
    selectedConditions: {},
    commonlySearchedSpecialities: [{ id: 1, name: 'General Physicial' }, { id: 2, name: 'Neurology' }, { id: 3, name: 'Cardiologist' }, { id: 4, name: 'Orthopaedic' }, { id: 5, name: 'Infertility' }],
    selectedSpecialities: {},
    selectedCriteria: {},
    selectedLocation: null
}

export default function (state = defaultState, action) {

    switch (action.type) {
        case TOOGLE_CONDITIONS: {
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

        case TOOGLE_SPECIALITIES: {
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

        case MERGE_SEARCH_STATE: {
            let newState = { ...state }

            newState = Object.assign(newState, action.payload)
            return newState
        }
    }
    return state
}





