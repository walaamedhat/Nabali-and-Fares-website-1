import {
    EDIT_PROJECT_START,
    EDIT_PROJECT_SUCCESS,
    EDIT_PROJECT_FAILURE,
    TRANSFER_DATA_PROJECT_SUCCESS,
    HANDLE_INPUT_CHANGE
} from '../../constants/actionTypes';

const intialState = {
    projectData:[],
    isFetching: false,
    error: undefined,
    message: ''
}


const editProjectData = (state = intialState, action) => {
    switch(action.type){
        case EDIT_PROJECT_START:{
            return{
                ...state,
                isFetching:true
            }
        }
        case EDIT_PROJECT_SUCCESS :{
            return{
                ...state,
                projectData:action.payload,
                isFetching:false,
                message: 'Edit Project Success'
            }
        }
        case EDIT_PROJECT_FAILURE :{
            return{
                ...state,
                error: action.error,
                isFetching: false,
                message: 'Edit Project Faild, Try Again!!'
            }
        }
        case TRANSFER_DATA_PROJECT_SUCCESS :{
            return{
                ...state,
                projectData: action.payload
            }
        }
        case HANDLE_INPUT_CHANGE:{            
            return{
                ...state,
                projectData: [{
                    ...state.projectData[0],
                    [action.payload.name]: action.payload.value
                }]
            }
        }
        default: return state
    }
}

export default editProjectData;