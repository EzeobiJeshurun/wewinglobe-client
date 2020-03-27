
import {SET_ERRORS, LOADING_UI, CLEAR_ERRORS,POST_WESHOUT, STOP_UI_LOADING,SIGNUP_ERRORS,POST_ERRORS, RESET_ERROR, LOADING_EUI, RESET_P, CLEAR_POSTERRORS} from '../types';

const initialState = {
    loading: false,
    errors: {errors: {email: '', password: ''}},
    general: {general: ''},
    handleinUse: {handle: ''},
    emailinUse: {email: ''},
    reset: {message: ""},
    resetE: {error: ""},
    loadingR: false,
    postError: {error: ""}
};

export default function(state=initialState,action){
    switch(action.type){
        case SIGNUP_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload,
                general: action.payload,
                handleinUse: action.payload,
                emailinUse: action.payload
            };
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload,
                general: action.payload
            };
        
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: {errors: {email: '', password: ''}}
            };
            
        case LOADING_UI:
            return {
                ...state,
                loading: true
            };
        case RESET_P:
            return {
                ...state,
                reset: action.payload,
                loadingR: false
            };  
        case RESET_ERROR: 
            return {
                ...state,
                resetE: action.payload,
                loadingR: false
            };
        
        case LOADING_EUI:
            return {
                ...state,
                loadingR: true
            };
        case CLEAR_POSTERRORS:
            return {
                ...state,
                loading: false,
                postError: {error: ""}
                
            };
        
        case POST_ERRORS:
            return {
                ...state,
                loading: false,
                postError: action.payload
            };
            
        case STOP_UI_LOADING:
            return {
                ...state,
                loading: false,
            };    
                
        default:
            return state;
    }
}