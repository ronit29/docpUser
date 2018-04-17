import { LAB_SEARCH } from '../../constants/types';

const defaultState = {
    labList: [],
    LOADING: true,
    ERROR: null
}

export default function (state = defaultState, action) {

    switch (action.type) {
        case LAB_SEARCH: {
            let newState = { ...state }

            newState.labList = action.payload.map(lab => lab.id)
            newState.LOADING = false

            return newState
        }

    }
    
    return state
}