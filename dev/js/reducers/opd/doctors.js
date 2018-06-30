import { APPEND_DOCTORS } from '../../constants/types';

const defaultState = {

}

export default function (state = defaultState, action) {

    switch (action.type) {
        case APPEND_DOCTORS: {
            let newState = { ...state }

            return action.payload.reduce((doctorMap, doctor) => {
                if (doctorMap[doctor.id]) {
                    doctorMap[doctor.id] = Object.assign({}, doctor, doctorMap[doctor.id])
                } else {
                    doctorMap[doctor.id] = { ...doctor }
                }
                return doctorMap
            }, newState)

        }

    }
    return state
}