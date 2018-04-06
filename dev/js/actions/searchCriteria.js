export const toggleCondition = (id) => (dispatch) => {
    dispatch({
        type: 'TOOGLE_CONDITIONS',
        payload: {
            id
        }
    })

}

export const toggleSpeciality = (id) => (dispatch) => {
    dispatch({
        type: 'TOOGLE_SPECIALITIES',
        payload: {
            id
        }
    })

}

export const selectLocation = (location) => (dispatch) => {
    dispatch({
        type: 'SELECT_LOCATION',
        payload: location
    })

}



