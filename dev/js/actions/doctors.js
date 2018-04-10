import {SEARCH_DOCTOR} from './types';
import { API_GET } from '../api/api.js';

export const getDoctors=()=>{  
    return(dispatch)=> {
      API_GET('http://localhost:3000/api/doctors.json')
  .then(function (response) {
    console.log(response);
    dispatch({type:SEARCH_DOCTOR,payload:response.data})
  })
  .catch(function (error) {
    console.log(error);
  });
  
  };
};