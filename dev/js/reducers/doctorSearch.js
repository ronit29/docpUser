import { DOCTOR_SEARCH } from '../constants/types';

const defaultState = {
    doctorList: [],
    LOADING: true,
    ERROR: null
}

export default function (state = defaultState, action) {

    switch (action.type) {
        case DOCTOR_SEARCH: {
            state.doctorList = action.payload.map(doc => doc.id)
            state.LOADING = false
            return JSON.parse(JSON.stringify(state))
        }

    }
    
    return state
}