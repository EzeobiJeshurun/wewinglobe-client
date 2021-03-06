import {SET_WESHOUTS, LOADING_DATA,A_SINGLE_POST,CLEAR_NETWORK_ERROR,NETWORK_ERROR_OR_PROBLEM,CREATE_COMMENT,COMMENT_ERRORS,DETAILS_OF_A_USER, LIKE_WESHOUT, UNLIKE_WESHOUT,POST_WESHOUT,CLEAR_CLOSE_ON_RECEIVE, SET_WESHOUT_ERROR, DELETE_WESHOUT} from '../types';

const initialState = {
    weshouts : [],
    loading: false,
    weshouterrors: {errors: ""},
    closeOnRecieve: "",
    singlePost: {},
    commentErrors: {errors: ""},
    commentResponse: {},
    aboutOneUser: [],
    networkError: false,
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
             let allPosts = currentPosts;
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
                //state.singlePost = actions.payload;
                return {
                    ...state,
                    singlePost: {...state.singlePost, likeCount: actions.payload.likeCount}
                };
       case LIKE_WESHOUT:  
            let indexOfLike = state.weshouts.findIndex(weshout=> weshout.weshoutId === actions.payload.weshoutId);
            state.weshouts[indexOfLike] = actions.payload;
           // state.singlePost = actions.payload;    
            return {
                ...state,
                singlePost: {...state.singlePost, likeCount: actions.payload.likeCount}
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
                ...state,
                singlePost: {...state.singlePost, comments : [actions.payload, ...state.singlePost.comments]},
            };
            
        case  COMMENT_ERRORS:
            return {
                ...state,
                commentErrors: actions.payload,
            };
         
        case DETAILS_OF_A_USER:
            return {
                ...state,
                aboutOneUser: actions.payload,
                
                loading: false,
            };
        case NETWORK_ERROR_OR_PROBLEM:
            return {
                ...state,
                networkError: true,
                loading:false,
            };
        case CLEAR_NETWORK_ERROR:
            return {
                ...state,
                networkError:false,
                loading:false,
            };        
        
        default:   
            return state;
    }
}