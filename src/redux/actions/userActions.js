import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI,SIGNUP_ERRORS, RESET_P,RESET_ERROR, LOADING_EUI,
    SET_AUTHENTICATED,SET_UNAUTHENTICATED, LOADING_USER} from '../types';
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

export const uploadImage =(formData)=>(dispatch)=>{
    dispatch({ type: LOADING_USER});
    axios.post('/user/image', formData)
    .then((res)=>{
        dispatch(getUserData());
    })
    .catch((err)=>{
        console.log(err);
    });
};

export const editUserDetails = (userDetails)=>(dispatch)=>{
 dispatch({type: LOADING_USER});
 axios.post('/user', userDetails)
 .then(()=>{
     dispatch(getUserData());
 }).catch((err)=>{
    console.log(err);
 });
};

export const resetP = (userEmail)=>(dispatch)=>{
    dispatch({type: LOADING_EUI});
    if(isEmail(userEmail)){
        axios.post('/user/reset', {email: userEmail})
    .then((res)=>{
        dispatch({
            type: RESET_P,
            payload: res.data
        });
    })
    .catch((err)=>{
        dispatch({
            type: RESET_ERROR,
            payload: err.response.data
        });
        console.log('error in axios');
    });
    }else{
        dispatch({
            type: RESET_ERROR,
            payload: {error: "Please enter a valid email"}
        });
        console.log('axios did not run check email');
    }

    
};
const isEmail = (email)=>{
    const regularExpression = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ ;
        if(email.match(regularExpression)) return true;
        else return false;
 };
 


