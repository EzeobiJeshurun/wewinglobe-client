import {SET_WESHOUTS, LOADING_DATA,LOADING_UI,POST_WESHOUT,POST_ERRORS,
    A_SINGLE_POST, LIKE_WESHOUT,MARK_NOTIFICATIONS_READ,CLEAR_NETWORK_ERROR,NETWORK_ERROR_OR_PROBLEM, UNLIKE_WESHOUT,CLEAR_POSTERRORS,STOP_UI_LOADING,CREATE_COMMENT,DETAILS_OF_A_USER, DELETE_WESHOUT, COMMENT_ERRORS} from '../types';
import axios from 'axios';


export const getWeshouts = ()=>(dispatch)=>{
    dispatch({type: LOADING_DATA});
    axios.get('/weshout')
    .then((res)=>{
        dispatch({
            type: SET_WESHOUTS,
            payload: res.data
        });
    })
    .catch((err)=>{
        const checkNetwork = String(err.response);
            
        if(checkNetwork !== 'undefined'){
        
  
        }else{

        dispatch({type:NETWORK_ERROR_OR_PROBLEM, });
         }
       // dispatch({
        //    type: SET_WESHOUTS,
        //    payload: []
       // });
    });

};

//post a weshout
export const postWeshout =(userPost)=>(dispatch)=>{
    dispatch({type: LOADING_UI});
    axios.post('/weshout', userPost)
    .then((res)=>{
        dispatch({
            type: POST_WESHOUT,
            payload: res.data,
        });
        dispatch({type: CLEAR_POSTERRORS,
            payload: {error: ""}
        });
    }).catch((err)=>{
        const checkNetwork = String(err.response);
            
        if(checkNetwork !== 'undefined'){
            dispatch({
                type: POST_ERRORS,
                payload: err.response.data
    
            });
  
        }else{

        dispatch({type:NETWORK_ERROR_OR_PROBLEM, });
         }
        
        
    });
};
//get the details of a single post
export const getOnePost = (weshoutId)=>(dispatch)=>{
    dispatch({type: LOADING_UI});
    axios.get(`/weshout/${weshoutId}`)
    .then((res)=>{
        dispatch({
            type: A_SINGLE_POST,
            payload: res.data,
        });
        dispatch({
            type: STOP_UI_LOADING
        });
    }).catch((err)=>{
        const checkNetwork = String(err.response);
            
        if(checkNetwork !== 'undefined'){
        
  
        }else{

        dispatch({type:NETWORK_ERROR_OR_PROBLEM, });
         }
    });

};

// like a weshout

export const likeWeshout =(weshoutId)=>(dispatch)=>{
    axios.get(`/weshout/${weshoutId}/like`)
    .then((res)=>{
        dispatch({
            type: LIKE_WESHOUT,
            payload: res.data 
        });
    })
    .catch((err)=>{
        const checkNetwork = String(err.response);
            
        if(checkNetwork !== 'undefined'){
        
  
        }else{

        dispatch({type:NETWORK_ERROR_OR_PROBLEM, });
         }
        
    });
};

//unlike a weshout
export const unlikeWeshout =(weshoutId)=>(dispatch)=>{
    axios.get(`/weshout/${weshoutId}/unlike`)
    .then((res)=>{
        dispatch({
            type: UNLIKE_WESHOUT,
            payload: res.data 
        });
    })
    .catch((err)=>{
        const checkNetwork = String(err.response);
            
        if(checkNetwork !== 'undefined'){
            
  
        }else{

        dispatch({type:NETWORK_ERROR_OR_PROBLEM, });
         }
    });
};
//fuctions to change notification status to read
export const markNotificationsRead = (anArrayOfNotificationIds)=>(dispatch)=>{
    if(anArrayOfNotificationIds.length > 0){
        
   
        axios.post('/notifications', anArrayOfNotificationIds)
    .then((res)=>{
        dispatch({
            type: MARK_NOTIFICATIONS_READ,
        });
    }).catch((err)=>{
        const checkNetwork = String(err.response);
            
        if(checkNetwork !== 'undefined'){
            
  
        }else{

        dispatch({type:NETWORK_ERROR_OR_PROBLEM, });
         }
    });
    }
       

    
};
export const deleteWeshout = (weshoutId) =>(dispatch)=>{
    axios.delete(`/weshout/${weshoutId}`)
    .then(()=>{
        dispatch({type: DELETE_WESHOUT,
                   payload: weshoutId});
    })
    .catch((err)=>{
        const checkNetwork = String(err.response);
            
        if(checkNetwork !== 'undefined'){
            
  
        }else{

        dispatch({type:NETWORK_ERROR_OR_PROBLEM, });
         }
    });
};
//function that handles comment submission
export const createComment = (weshoutId,commentData)=>(dispatch)=>{
   // dispatch({
     //   type: LOADING_UI,
   // });
    axios.post(`/weshout/${weshoutId}/comment`, commentData)
    .then((res)=>{
        dispatch({
            type: CREATE_COMMENT,
            payload: res.data,
        });
        
    }).catch((err)=>{
        const checkNetwork = String(err.response);
            
        if(checkNetwork !== 'undefined'){
            dispatch({
                type: COMMENT_ERRORS,
                payload: err.response.data,
            });
  
        }else{

        dispatch({type:NETWORK_ERROR_OR_PROBLEM, });
         }
       
        
    });

};
// this function handles fetching of a users profile, when you which to obtain details on a particular user, this is the 
// solution.
export const getSpecificUserDetails = (userHandle) =>(dispatch)=>{
    dispatch({
        type: LOADING_DATA,
    });
    axios.get(`/user/${userHandle}`)
    .then((res)=>{
       dispatch({
           type: DETAILS_OF_A_USER,
          payload: res.data.weshout,
       });
        
    }).catch((err)=>{
        const checkNetwork = String(err.response);
            
        if(checkNetwork !== 'undefined'){

  
        }else{

        dispatch({type:NETWORK_ERROR_OR_PROBLEM, });
         }
       
       // dispatch({
         //   type: DETAILS_OF_A_USER,
        //    payload: [],
       // });
        
    });
};

export const clearNetworkError = ()=>(dispatch)=>{
    dispatch({type: CLEAR_NETWORK_ERROR,});
};

export const moveToLogin=(history)=>{
    history.push('/');
};

