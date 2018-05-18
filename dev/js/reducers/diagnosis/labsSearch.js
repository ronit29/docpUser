import { LAB_SEARCH_START, LAB_SEARCH } from '../../constants/types';

const defaultState = {
    labList: [],
    LOADED_LABS_SEARCH: false
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

    }
    
    return state
}