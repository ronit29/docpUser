import AXIOS from 'axios'

export const initUser = () => (dispatch) => {

    AXIOS.get('/api/auth/profile').then((data) => {

        dispatch({
            type: "INIT_USER_LOGGED_IN",
            payload: data.data
        })

    }, (err) => {
        dispatch({
            type: "INIT_USER_NOT_LOGGED_IN",
            payload: null
        })
    })

}



