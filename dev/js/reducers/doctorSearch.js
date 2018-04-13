import { DOCTOR_SEARCH } from '../constants/types';

const defaultState = {
    doctorList: [],
    LOADING: true,
    ERROR: null
}

export default function (state = defaultState, action) {

    switch (action.type) {
        case DOCTOR_SEARCH: {
            let newState = { ...state }

            newState.doctorList = action.payload.map(doc => doc.id)
            newState.LOADING = false

            return newState
        }

    }
    
    return state
}