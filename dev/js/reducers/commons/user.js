import { APPEND_NOTIFICATIONS, APPEND_ADDRESS, APPEND_USER_PROFILES, APPEND_USER_APPOINTMENTS, SELECT_USER_PROFILE } from '../../constants/types';

const defaultState = {
    profiles: {},
    appointments: {},
    address: [],
    selectedProfile: null,
    notifications: [],
    newNotification: false
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

        case APPEND_ADDRESS: {
            let newState = { ...state }
            newState.address = action.payload
            return newState
        }

        case APPEND_NOTIFICATIONS: {
    
            let newState = {
                ...state,
                notifications: state.notifications ? [...state.notifications] : []
            }
    
            newState.newNotification = false

            if (action.payload.replace) {
                newState.notifications = action.payload.notifications
            } else {
                newState.notifications = [...newState.notifications, ...action.payload.notifications]
            }
    
            newState.notifications.map((not) => {
                if (!not.viewed_at) {
                    newState.newNotification = true
                }
            })

            return newState

        }

    }
    return state
}