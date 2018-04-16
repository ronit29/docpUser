import { APPEND_DOCTORS } from '../../constants/types';

const defaultState = {

}

export default function (state = defaultState, action) {

    switch (action.type) {
        case APPEND_DOCTORS: {
            let newState = { ...state }

            return action.payload.reduce((doctorMap, doctor) => {
                doctorMap[doctor.id] = doctor
                return doctorMap
            },newState)

        }

    }
    return state
}