import { APPEND_ARTICLES, APPEND_ORDER_HISTORY, APPEND_USER_TRANSACTIONS, APPEND_UPCOMING_APPOINTMENTS, APPEND_NOTIFICATIONS, APPEND_ADDRESS, APPEND_USER_PROFILES, APPEND_USER_APPOINTMENTS, SELECT_USER_PROFILE, APPEND_HEALTH_TIP } from '../../constants/types';

const defaultState = {
    profiles: {},
    appointments: {},
    address: [],
    selectedProfile: null,
    notifications: [],
    newNotification: false,
    userUpcomingAppointments: [],
    userTransactions: [],
    userWalletBalance: 0,
    healthTips: [],
    orderHistory: [],
    articles: []
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

            if (!newState.selectedProfile && action.payload.length) {
                newState.selectedProfile = action.payload[0].id
            }

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

        case APPEND_UPCOMING_APPOINTMENTS: {
            let newState = {
                ...state,
                userUpcomingAppointments: [].concat(state.userUpcomingAppointments)
            }

            newState.userUpcomingAppointments = action.payload.appointments

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

        case APPEND_USER_TRANSACTIONS: {

            let newState = {
                ...state,
                userTransactions: state.userTransactions ? [].concat(state.userTransactions) : [],
            }

            newState.userTransactions = action.payload.transactions
            newState.userWalletBalance = action.payload.balance

            return newState

        }

        case APPEND_HEALTH_TIP: {
            let newState = {
                ...state,
                healthTips: state.healthTips ? [].concat(state.healthTips) : [],
            }
            newState.healthTips = action.payload
            return newState
        }

        case APPEND_ORDER_HISTORY: {
            let newState = {
                ...state,
                orderHistory: state.orderHistory ? [].concat(state.orderHistory) : [],
            }
            newState.orderHistory = action.payload
            return newState
        }

        case APPEND_ARTICLES: {
            let newState = {
                ...state,
                articles: state.articles ? [].concat(state.articles) : [],
            }
            newState.articles = action.payload
            return newState
        }

    }
    return state
}