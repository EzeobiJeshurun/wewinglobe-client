import {SET_WESHOUTS, LOADING_DATA,A_SINGLE_POST,CREATE_COMMENT,COMMENT_ERRORS, LIKE_WESHOUT, UNLIKE_WESHOUT,POST_WESHOUT,CLEAR_CLOSE_ON_RECEIVE, SET_WESHOUT_ERROR, DELETE_WESHOUT} from '../types';

const initialState = {
    weshouts : [],
    loading: false,
    weshouterrors: {errors: ""},
    closeOnRecieve: "",
    singlePost: {},
    commentErrors: {errors: ""}
};


export default function (state= initialState, actions){
    switch(actions.type){
        case LOADING_DATA:
             return {
                 ...state,
                 loading: true
             };
         
        case SET_WESHOUTS:
            let currentPosts = actions.payload;
             let allPosts = currentPosts.reverse();
            return {
                ...state,
                weshouts: allPosts,
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
                state.singlePost = actions.payload;
                return {
                    ...state
                };
       case LIKE_WESHOUT:  
            let indexOfLike = state.weshouts.findIndex(weshout=> weshout.weshoutId === actions.payload.weshoutId);
            state.weshouts[indexOfLike] = actions.payload;
            state.singlePost = actions.payload;    
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
                closeOnRecieve: actions.payload.weshoutId,
                weshouts: [
                    actions.payload,
                    ...state.weshouts
                ]
            };
            
        case CLEAR_CLOSE_ON_RECEIVE:
            return {
                ...state,
                closeOnRecieve: ""
            };
            
        case A_SINGLE_POST:
            
            return {
                ...state,
                singlePost: actions.payload,
            };

        case   CREATE_COMMENT:
            return {

            };
            
        case  COMMENT_ERRORS:
            return {
                ...state,
                commentErrors: actions.payload,
            };    


                
            
        default:   
            return state;
    }
}