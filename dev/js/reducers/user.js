const defaultState = {
    isLoggedIn: false,
    userProfile: null,
    loaded: false,
}

export default function (state = defaultState, action) {

    switch (action.type) {

        case 'INIT_USER_LOGGED_IN':
            return {
                isLoggedIn: true,
                loaded: true,
                userProfile: action.payload
            }
            break

        case 'INIT_USER_NOT_LOGGED_IN':
            return {
                isLoggedIn: false,
                loaded: true
            }
            break

        case 'USER_LOGOUT':
            return defaultState
            break
    }
    return state
}


