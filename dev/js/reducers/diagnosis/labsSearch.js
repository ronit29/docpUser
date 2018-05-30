import { SELECR_APPOINTMENT_TYPE_LAB, SELECT_LAB_TIME_SLOT, LAB_SEARCH_START, LAB_SEARCH } from '../../constants/types';

const defaultState = {
    labList: [],
    LOADED_LABS_SEARCH: false,
    selectedSlot: { time: [] },
    selectedAppointmentType: 'home'
}

export default function (state = defaultState, action) {

    switch (action.type) {

        case LAB_SEARCH_START: {
            let newState = { ...state }

            newState.LOADED_LABS_SEARCH = false

            return newState
        }

        case LAB_SEARCH: {
            let newState = { ...state }

            newState.labList = action.payload.map(lab => lab.lab.id)
            newState.LOADED_LABS_SEARCH = true

            return newState
        }

        case SELECT_LAB_TIME_SLOT: {
            let newState = { ...state }

            newState.selectedSlot = action.payload

            return newState
        }

        case SELECR_APPOINTMENT_TYPE_LAB: {
            let newState = { ...state }
            newState.selectedAppointmentType = action.payload
            return newState
        }

    }

    return state
}