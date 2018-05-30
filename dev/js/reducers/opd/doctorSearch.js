import { SELECT_OPD_TIME_SLOT, DOCTOR_SEARCH, DOCTOR_SEARCH_START } from '../../constants/types';

const defaultState = {
    doctorList: [],
    LOADED_DOCTOR_SEARCH: false,
    selectedSlot: { time: [] }
}

export default function (state = defaultState, action) {

    switch (action.type) {

        case DOCTOR_SEARCH_START: {
            let newState = { ...state }

            newState.LOADED_DOCTOR_SEARCH = false

            return newState
        }

        case DOCTOR_SEARCH: {
            let newState = { ...state }

            if (action.payload.page === 1) {
                newState.doctorList = action.payload.doctors.map(doc => doc.id)
            } else {
                newState.doctorList = [].concat(newState.doctorList)
                newState.doctorList = newState.doctorList.concat(action.payload.doctors)
            }

            newState.LOADED_DOCTOR_SEARCH = true

            return newState
        }

        case SELECT_OPD_TIME_SLOT: {
            let newState = { ...state }

            newState.selectedSlot = action.payload

            return newState
        }

    }

    return state
}