import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI,SET_UNAUTHENTICATED, SET_AUTHENTICATED, LOADING_USER} from '../types';

const initialState = {
    loading: false,
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: []
};


export default function(state= initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;

        case  SET_USER:
            return {
                authenticated: true,
                ...action.payload,
                loading: false
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            };    

        default:
            return state;    
            
    }
}