import { SELECT_USER_ADDRESS, SELECR_APPOINTMENT_TYPE_LAB, SELECT_LAB_TIME_SLOT, LAB_SEARCH_START, LAB_SEARCH } from '../../constants/types';

const defaultState = {
    labList: [],
    count: 0,
    LOADED_LABS_SEARCH: false,
    selectedSlot: { time: {} },
    rescheduleSlot: { time: {} },
    selectedAppointmentType: 'home',
    selectedAddress: null
}

export default function (state = defaultState, action) {

    switch (action.type) {

        case LAB_SEARCH_START: {
            let newState = { ...state }

            newState.LOADED_LABS_SEARCH = false

            return newState
        }

        case LAB_SEARCH: {
            let newState = {
                ...state,
                labList: [].concat(state.labList)
            }

            if (action.payload.page === 1) {
                newState.labList = action.payload.result.map(lab => lab.lab.id)
            } else {
                let dedupe = {}
                newState.labList = newState.labList
                    .concat(action.payload.result.map(lab => lab.lab.id))
                    .filter(function (item) {
                        return dedupe.hasOwnProperty(item) ? false : (dedupe[item] = true)
                    })
            }

            newState.count = action.payload.count
            newState.LOADED_LABS_SEARCH = true

            return newState
        }

        case SELECT_LAB_TIME_SLOT: {
            let newState = { ...state }

            if (action.payload.reschedule) {
                newState.rescheduleSlot = action.payload.slot
            }
            newState.selectedSlot = action.payload.slot
            

            return newState
        }

        case SELECR_APPOINTMENT_TYPE_LAB: {
            let newState = { ...state }
            newState.selectedAppointmentType = action.payload
            return newState
        }

        case SELECT_USER_ADDRESS: {
            let newState = { ...state }
            newState.selectedAddress = action.payload
            return newState
        }

    }

    return state
}