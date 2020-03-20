import {SET_WESHOUTS, LOADING_DATA, LIKE_WESHOUT, UNLIKE_WESHOUT, SET_WESHOUT_ERROR} from '../types';
import axios from 'axios';

export const getWeshout = ()=>(dispatch)=>{
    dispatch({type: LOADING_DATA});
    axios.get('/weshout')
    .then((res)=>{
        dispatch({
            type: SET_WESHOUTS,
            payload: res.data
        });
    })
    .catch((err)=>{
        dispatch({
            type: SET_WESHOUT_ERROR,
            payload: err.response.data
        });
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