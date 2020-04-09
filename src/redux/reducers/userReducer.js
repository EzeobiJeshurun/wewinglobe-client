import {SET_USER, MARK_NOTIFICATIONS_READ,SET_UNAUTHENTICATED,CLEAR_NETWORK_ERROR, NETWORK_ERROR_OR_PROBLEM, UNLIKE_WESHOUT, SET_AUTHENTICATED, LOADING_USER,LIKE_WESHOUT} from '../types';


const initialState = {
    loading: false,
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: [],
    networkError: false,
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
        
         case   MARK_NOTIFICATIONS_READ:
             state.notifications.forEach((not)=>
                (not.read = true)
             );
             return {
                ...state,
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
                networkError: false,
                loading:false,
            };
            
        default:
            return state;    
            
    }
}