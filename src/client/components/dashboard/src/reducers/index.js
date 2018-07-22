import { combineReducers } from 'redux';
import userData from './loginReducer';
import newsData from './addNewsReducer'
import getUserData from './getUserDataReducer';
import updateUserData from './updateUserDataReducer';
import auth from './authReducer';
import filesUrl from './uploadFilesReducer';
import projectsData from './addProjectsReducer';
export default combineReducers({
    userData,
    newsData,
    getUserData,
    updateUserData,
    auth,
    filesUrl,
    projectsData
});
