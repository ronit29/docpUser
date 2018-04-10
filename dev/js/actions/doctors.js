import { SEARCH_DOCTOR } from '../constants/types';
import { API_GET } from '../api/api.js';

export const getDoctors = () => {

  return (dispatch) => {
    API_GET('/doctors.json')
      .then(function (response) {

        
      })
      .catch(function (error) {

      })
  }

}