import { TOOGLE_CONDITIONS, TOOGLE_SPECIALITIES, SELECT_LOCATION, MERGE_SEARCH_STATE, TOGGLE_CRITERIA } from '../constants/types';

const defaultState = {
    commonlySearchedConditions: [{ id: 1, name: 'Headache' }, { id: 2, name: 'Stomach-ache' }, { id: 3, name: 'Flu' }, { id: 4, name: 'Hair Fall' }, { id: 5, name: 'Chest Pain' }],
    selectedConditions: {},
    commonlySearchedSpecialities: [{ id: 1, name: 'General Physicial' }, { id: 2, name: 'Neurology' }, { id: 3, name: 'Cardiologist' }, { id: 4, name: 'Orthopaedic' }, { id: 5, name: 'Infertility' }],
    selectedSpecialities: {},
    selectedCriteria : {},
    selectedLocation : null
}

export default function (state = defaultState, action) {

    switch (action.type) {
        case TOOGLE_CONDITIONS: {
            if (state.selectedConditions[action.payload.id]) {
                delete state.selectedConditions[action.payload.id]
            } else {
                state.selectedConditions[action.payload.id] = new Date()
            }
            return JSON.parse(JSON.stringify(state))
        }

        case TOOGLE_SPECIALITIES: {
            if (state.selectedSpecialities[action.payload.id]) {
                delete state.selectedSpecialities[action.payload.id]
            } else {
                state.selectedSpecialities[action.payload.id] = new Date()
            }
            return JSON.parse(JSON.stringify(state))
        }

        case TOOGLE_SPECIALITIES: {
            if (state.selectedSpecialities[action.payload.id]) {
                delete state.selectedSpecialities[action.payload.id]
            } else {
                state.selectedSpecialities[action.payload.id] = new Date()
            }
            return JSON.parse(JSON.stringify(state))
        }

        case TOGGLE_CRITERIA: {
            if (state.selectedCriteria[action.payload.id]) {
                delete state.selectedCriteria[action.payload.id]
            } else {
                action.payload.ts = new Date()
                state.selectedCriteria[action.payload.id] = action.payload
            }
            return JSON.parse(JSON.stringify(state))
        }

        case SELECT_LOCATION: {
            state.selectedLocation = action.payload
            return JSON.parse(JSON.stringify(state))
        }

        case MERGE_SEARCH_STATE: {
            state = Object.assign(state,action.payload)
            return JSON.parse(JSON.stringify(state))
        }
    }
    return state
}





