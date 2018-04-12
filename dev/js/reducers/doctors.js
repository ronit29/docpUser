import { APPEND_DOCTORS } from '../constants/types';

const defaultState = {

}

export default function (state = defaultState, action) {

    switch (action.type) {
        case APPEND_DOCTORS: {
            let newState = action.payload.reduce((doctorMap, doctor) => {
                doctorMap[doctor.id] = doctor
                return doctorMap
            },{})

            state = Object.assign(state,newState)
            return JSON.parse(JSON.stringify(state))
        }

    }
    return state
}