import { TOOGLE_CONDITIONS, TOOGLE_SPECIALITIES, SELECT_LOCATION, MERGE_SEARCH_STATE } from '../constants/types';

export const toggleCondition = (id) => (dispatch) => {
    dispatch({
        type: TOOGLE_CONDITIONS,
        payload: {
            id
        }
    })

}

export const toggleSpeciality = (id) => (dispatch) => {
    dispatch({
        type: TOOGLE_SPECIALITIES,
        payload: {
            id
        }
    })

}

export const selectLocation = (location) => (dispatch) => {
    dispatch({
        type: SELECT_LOCATION,
        payload: location
    })

}

export const mergeSearchState = (state) => (dispatch) => {
    dispatch({
        type: MERGE_SEARCH_STATE,
        payload: state
    })

}



