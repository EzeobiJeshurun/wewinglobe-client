import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI,SIGNUP_ERRORS, SET_AUTHENTICATED,SET_UNAUTHENTICATED, LOADING_USER} from '../types';
import axios from 'axios';

export const loginUser =(userData, history)=>(dispatch)=>{

    dispatch({type:LOADING_UI});
    axios.post('/login' , userData)
        .then(res=>{
        setAuthorizationHeader(res.data.token);
          dispatch(getUserData());
          dispatch({
            type: CLEAR_ERRORS
          });
    
           // setLoading(false);
           history.push('/');
         })
        .catch((err)=>{
        
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
          //  console.log(err.response.data);
            
           // console.log('it got here');
           // if(err.response.data.errors){
               // setErrors(err.response.data);
               // setLoading(false);
         //   }

            //if(err.response.data.general){
                //setGeneral(err.response.data);
               // setLoading(false);
           // }
        
            
            

       // });
       
};

export const signupUser =(newUserData, history)=>(dispatch)=>{

    dispatch({type:LOADING_UI});
    axios.post('/signup' , newUserData)
        .then(res=>{
            setAuthorizationHeader(res.data.token);
          dispatch(getUserData());
          dispatch({
            type: CLEAR_ERRORS
          });
          
           history.push('/');
         })
        .catch((err)=>{
        
            dispatch({
                type: SIGNUP_ERRORS,
                payload: err.response.data
            });
        });
               
};


export const getUserData=()=>(dispatch)=>{
    dispatch({type: LOADING_USER});
    const FBIdToken = localStorage.getItem('FBIdToken');
    axios.defaults.headers.common['Authorization'] = FBIdToken;

    axios.get('/user')
    .then((res)=>{
    dispatch({
        type: SET_USER,
        payload: res.data
    });
    })
    .catch(err=>{
        console.log(err);
    });
};

export const logoutUser =()=>(dispatch)=>{
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED });
};

const setAuthorizationHeader =(token)=>{
    const FBIdToken = `Bearer ${token}`;
        
        localStorage.setItem('FBIdToken',FBIdToken);
          axios.defaults.headers.common['Authorization'] = FBIdToken;

};
