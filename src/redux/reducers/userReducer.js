import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI,SET_UNAUTHENTICATED, UNLIKE_WESHOUT, SET_AUTHENTICATED, LOADING_USER,LIKE_WESHOUT} from '../types';
import { CardActions } from '@material-ui/core';

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
        case LIKE_WESHOUT:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        weshoutId: action.payload.weshoutId
                    },
                ]

            }; 
            
          case UNLIKE_WESHOUT:
              return {
                ...state,
                likes: state.likes.filter(like => like.weshoutId !== action.payload.weshoutId),
              };  

        default:
            return state;    
            
    }
}