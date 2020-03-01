
import {SET_ERRORS, LOADING_UI, CLEAR_ERRORS, SIGNUP_ERRORS} from '../types';

const initialState = {
    loading: false,
    errors: {errors: {email: '', password: ''}},
    general: {general: ''},
    handleinUse: {handle: ''},
    emailinUse: {email: ''}
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
                
        default:
            return state;
    }
}