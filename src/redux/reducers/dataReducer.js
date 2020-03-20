import {SET_WESHOUTS, LOADING_DATA, LIKE_WESHOUT, UNLIKE_WESHOUT, SET_WESHOUT_ERROR} from '../types';

const initialState = {
    weshouts : [],
    weshout: {},
    loading: false,
    weshourerrors: {errors: ""}
};


export default function (state= initialState, actions){
    switch(actions.type){
        case LOADING_DATA:
             return {
                 ...state,
                 loading: true
             };
         
        case SET_WESHOUTS:
            return {
                ...state,
                weshouts: actions.payload,
                loading: false

            };
        case SET_WESHOUT_ERROR:
            return {
                ...state,
                loading: false,
                weshourerrors: actions.payload
            }     
            
        default:   
            return state;
    }
}