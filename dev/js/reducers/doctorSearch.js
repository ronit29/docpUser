import { DOCTOR_SEARCH, SELECT_DOCTOR } from '../constants/types';

const defaultState = {
    doctorList: [],
    LOADING: true,
    ERROR: null,
    selectedDoctor : null,
    selectedClinic : null,
    selectedSlot : null
}

export default function (state = defaultState, action) {

    switch (action.type) {
        case DOCTOR_SEARCH: {
            state.doctorList = action.payload.map(doc => doc.id)
            state.LOADING = false
            return JSON.parse(JSON.stringify(state))
        }

        case SELECT_DOCTOR: {
            state.selectedDoctor = action.payload
            return JSON.parse(JSON.stringify(state))
        }

    }
    
    return state
}