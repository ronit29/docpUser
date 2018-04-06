const defaultState = {
    commonlySearchedConditions: [{ id: 1, name: 'Headache' }, { id: 2, name: 'Stomach-ache' }, { id: 3, name: 'Flu' }, { id: 4, name: 'Hair Fall' }, { id: 5, name: 'Chest Pain' }],
    selectedConditions: {},
    commonlySearchedSpecialities: [{ id: 1, name: 'General Physicial' }, { id: 2, name: 'Neurology' }, { id: 3, name: 'Cardiologist' }, { id: 4, name: 'Orthopaedic' }, { id: 5, name: 'Infertility' }],
    selectedSpecialities: {},
    selectedLocation : null
}

export default function (state = defaultState, action) {

    switch (action.type) {
        case 'TOOGLE_CONDITIONS': {
            if (state.selectedConditions[action.payload.id]) {
                delete state.selectedConditions[action.payload.id]
            } else {
                state.selectedConditions[action.payload.id] = true
            }
            return JSON.parse(JSON.stringify(state))
        }

        case 'TOOGLE_SPECIALITIES': {
            if (state.selectedSpecialities[action.payload.id]) {
                delete state.selectedSpecialities[action.payload.id]
            } else {
                state.selectedSpecialities[action.payload.id] = true
            }
            return JSON.parse(JSON.stringify(state))
        }

        case 'SELECT_LOCATION': {
            state.selectedLocation = action.payload
            return JSON.parse(JSON.stringify(state))
        }
    }
    return state
}





