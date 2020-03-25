import {SET_WESHOUTS, LOADING_DATA, LIKE_WESHOUT, UNLIKE_WESHOUT,POST_WESHOUT, SET_WESHOUT_ERROR, DELETE_WESHOUT} from '../types';

const initialState = {
    weshouts : [],
    loading: false,
    weshouterrors: {errors: ""}
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
                weshouterrors: actions.payload
            }; 
            
        
        case UNLIKE_WESHOUT:    
                let index = state.weshouts.findIndex(weshout=> weshout.weshoutId === actions.payload.weshoutId);
                state.weshouts[index] = actions.payload;
                return {
                    ...state
                };
       case LIKE_WESHOUT:  
            let indexOfLike = state.weshouts.findIndex(weshout=> weshout.weshoutId === actions.payload.weshoutId);
            state.weshouts[indexOfLike] = actions.payload;
            return {
                ...state
              };

        case   DELETE_WESHOUT:
              const indexOfDelete = state.weshouts.findIndex(weshout=> weshout.weshoutId === actions.payload);
              state.weshouts.splice(indexOfDelete,1);
              
            return {
                ...state,
            };
        case POST_WESHOUT:
            return {
                ...state,
                weshouts: [
                    actions.payload,
                    ...state.weshouts
                ]
            };    


                
            
        default:   
            return state;
    }
}