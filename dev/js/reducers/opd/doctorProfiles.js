import { APPEND_DOCTORS_PROFILE } from '../../constants/types';

const defaultState = {

}

export default function (state = defaultState, action) {

    switch (action.type) {
        case APPEND_DOCTORS_PROFILE: {
            let newState = { ...state }

            return action.payload.reduce((doctorMap, doctor) => {
                if (doctorMap[doctor.id]) {
                    doctorMap[doctor.id] = Object.assign({}, doctorMap[doctor.id], doctor)
                } else {
                    doctorMap[doctor.id] = { ...doctor }
                }
                return doctorMap
            }, newState)

        }

    }
    return state
}