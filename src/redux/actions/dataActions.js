import {SET_WESHOUTS, LOADING_DATA,LOADING_UI,POST_WESHOUT,POST_ERRORS, LIKE_WESHOUT, UNLIKE_WESHOUT,CLEAR_POSTERRORS, SET_WESHOUT_ERROR, DELETE_WESHOUT} from '../types';
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