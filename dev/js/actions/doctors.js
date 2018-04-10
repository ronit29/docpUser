import axios from 'axios';
import {SEARCH_DOCTOR} from '../actions/types';
export const getDoctors=(registrationNo)=>{  
    return(dispatch)=> {
      axios.get('http://localhost:3000/api/doctors.json')
  .then(function (response) {
    console.log(response);
    dispatch({type:SEARCH_DOCTOR,payload:response.data})
  })
  .catch(function (error) {
    console.log(error);
  });
  
  };
};