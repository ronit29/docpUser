import { APPEND_USER_PROFILES } from '../../constants/types';

const defaultState = {
    profiles: {}
}

export default function (state = defaultState, action) {

    switch (action.type) {
        case APPEND_USER_PROFILES: {
            let newState = {
                ...state,
                profiles : { ...state.profiles }
            }

            newState.profiles = action.payload.reduce((profileMap, profile) => {
                profileMap[profile.profileId] = profile
                return profileMap
            }, newState.profiles)

            return newState
        }

    }
    return state
}