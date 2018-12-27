import { APPEND_HOSPITALS } from '../../constants/types';

const defaultState = {

}

export default function (state = defaultState, action) {

    switch (action.type) {
        case APPEND_HOSPITALS: {
            let newState = { ...state }
            
            return action.payload.reduce((hospitalMap, hospital) => {
                if (hospitalMap[hospital.hospital_id]) {
                    hospitalMap[hospital.hospital_id] = Object.assign({}, hospitalMap[hospital.hospital_id], hospital)
                } else {
                    hospitalMap[hospital.hospital_id] = { ...hospital }
                }
                return hospitalMap
            }, newState)

        }

    }
    return state
}