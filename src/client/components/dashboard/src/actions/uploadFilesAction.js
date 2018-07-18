import {
  START_UPLOAD,
  SUCCESS_UPLOAD,
  FAILURE_UPLOAD
} from '../constants/actionTypes'
import { log } from 'util';

const uploadFetchStart = () => {
return {
  type: START_UPLOAD
};
};
const uploadFetchSuccess = data => {
return {
  type: SUCCESS_UPLOAD,
  payload: data
};
};

const uploadFetchFailer = massage => {
return {
  type: FAILURE_UPLOAD,
  payload: massage
};
};






const upload = (data) => dispatch => {
  dispatch(uploadFetchStart())
  fetch('http://localhost:8000/api/v1/upload', {
      method:"POST",
      body:data
    }).then((res) => { 
      console.log(res,'dndjndjn');
                   
       res.json();
    })
    .then((body) =>{
      console.log(body, ' body body body');
      dispatch(uploadFetchSuccess(body))
    }).catch(error => {console.error(`Fetch Error =\n`, error)
      dispatch(uploadFetchFailer(error))
      });
  }

  export default upload;