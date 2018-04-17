import { APPEND_LABS } from '../../constants/types';

const defaultState = {

}

export default function (state = defaultState, action) {

    switch (action.type) {
        case APPEND_LABS: {
            let newState = { ...state }

            return action.payload.reduce((lapMap, lab) => {
                lapMap[lab.id] = lab
                return lapMap
            },newState)

        }

    }
    return state
}