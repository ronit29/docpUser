import { SELECT_OPD_TIME_SLOT, DOCTOR_SEARCH, DOCTOR_SEARCH_START } from '../../constants/types';

const defaultState = {
    doctorList: [],
    count: 0,
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
            let newState = {
                ...state,
                doctorList: [].concat(state.doctorList)
            }

            if (action.payload.page === 1) {
                newState.doctorList = action.payload.result.map(doc => doc.id)
            } else {
                let dedupe = {}
                newState.doctorList = newState.doctorList
                    .concat(action.payload.result.map(doc => doc.id))
                    .filter(function (item) {
                        return dedupe.hasOwnProperty(item) ? false : (dedupe[item] = true)
                    })
            }

            newState.count = action.payload.count
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