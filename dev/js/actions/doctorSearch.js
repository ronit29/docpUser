import { APPEND_DOCTORS, DOCTOR_SEARCH, SELECT_DOCTOR } from '../constants/types';
import { API_GET } from '../api/api.js';


export const getDoctors = () => (dispatch) => {
  API_GET('/doctors.json').then(function (response) {
    dispatch({
      type: APPEND_DOCTORS,
      payload: response.doctors
    })

    dispatch({
      type: DOCTOR_SEARCH,
      payload: response.doctors
    })

  }).catch(function (error) {

  })
}

export const selectDoctor = (doctorId) => (dispatch) => {
  dispatch({
    type: SELECT_DOCTOR,
    payload: doctorId
  })
}