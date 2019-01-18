import { APPEND_LABS_SEARCH } from '../../constants/types';

const defaultState = {

}

export default function (state = defaultState, action) {

    switch (action.type) {
        case APPEND_LABS_SEARCH: {
            let newState = { ...state }
            return action.payload.reduce((lapMap, lab) => {
                lapMap[lab.id] = lapMap[lab.id] || {}
                lapMap[lab.id] = lab
                return lapMap
            }, newState)

        }

    }
    return state
}