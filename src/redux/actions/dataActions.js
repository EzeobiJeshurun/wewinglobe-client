import {SET_WESHOUTS, LOADING_DATA,LOADING_UI,POST_WESHOUT,POST_ERRORS,
    A_SINGLE_POST, LIKE_WESHOUT, UNLIKE_WESHOUT,CLEAR_POSTERRORS,STOP_UI_LOADING,CREATE_COMMENT, SET_WESHOUT_ERROR, DELETE_WESHOUT, COMMENT_ERRORS} from '../types';
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
        console.log(err);
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
        dispatch({
            type: POST_ERRORS,
            payload: err.response.data

        });
        console.log(err);
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
        console.log(err);
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
        console.log(err);
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
        console.log(err);
    });
};

export const deleteWeshout = (weshoutId) =>(dispatch)=>{
    axios.delete(`/weshout/${weshoutId}`)
    .then(()=>{
        dispatch({type: DELETE_WESHOUT,
                   payload: weshoutId});
    })
    .catch((err)=>{
        console.log(err);
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
        dispatch({
            type: COMMENT_ERRORS,
            payload: err.response.data,
        });
        console.log(err);
    });

};