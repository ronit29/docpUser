import { APPEND_USER_PROFILES, APPEND_USER_APPOINTMENTS, SELECT_USER_PROFILE } from '../../constants/types';

const defaultState = {
    profiles: {},
    appointments: {},
    selectedProfile: null
}

export default function (state = defaultState, action) {

    switch (action.type) {
        case APPEND_USER_PROFILES: {
            let newState = {
                ...state,
                profiles: { ...state.profiles }
            }

            newState.profiles = action.payload.reduce((profileMap, profile) => {
                if (profile.is_default_user && newState.selectedProfile === null) {
                    newState.selectedProfile = profile.id
                }
                profileMap[profile.id] = profile
                return profileMap
            }, newState.profiles)

            return newState
        }

        case APPEND_USER_APPOINTMENTS: {
            let newState = {
                ...state,
                appointments: { ...state.appointments }
            }

            newState.appointments[action.payload.profile_id] = action.payload.appointments

            return newState
        }

        case SELECT_USER_PROFILE: {
            let newState = {
                ...state
            }

            newState.selectedProfile = action.payload

            return newState
        }

    }
    return state
}