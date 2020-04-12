import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI,SIGNUP_ERRORS, OPEN_POST_FROM_MENU,NETWORK_ERROR_OR_PROBLEM,CLEAR_NETWORK_ERROR, RESET_P,RESET_ERROR, LOADING_EUI,
    SET_UNAUTHENTICATED, LOADING_USER,OPEN_NOTIFICATIONS_FROM_MENU} from '../types';
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
            const checkNetwork = String(err.response);
            
            if(checkNetwork !== 'undefined'){
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                });
      
            }else{
            dispatch({type:NETWORK_ERROR_OR_PROBLEM});
             }
            
        
            
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
    const checkNetwork = String(err.response);
            
      if(checkNetwork !== 'undefined'){
        dispatch({
            type: SIGNUP_ERRORS,
                 payload: err.response.data
             });

      }else{
      dispatch({type:NETWORK_ERROR_OR_PROBLEM});
       }

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
        const checkNetwork = String(err.response);
            
        if(checkNetwork !== 'undefined'){
           
  
        }else{
        dispatch({type:NETWORK_ERROR_OR_PROBLEM,});
         }
        
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
        const checkNetwork = String(err.response);
            
            if(checkNetwork !== 'undefined'){
               
            }else{
            dispatch({type:NETWORK_ERROR_OR_PROBLEM});
             }
        
    });
};

export const editUserDetails = (userDetails)=>(dispatch)=>{
 dispatch({type: LOADING_USER});
 axios.post('/user', userDetails)
 .then(()=>{
     dispatch(getUserData());
 }).catch((err)=>{
    const checkNetwork = String(err.response);
            
            if(checkNetwork !== 'undefined'){
                
      
            }else{
            dispatch({type:NETWORK_ERROR_OR_PROBLEM});
             }
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
        const checkNetwork = String(err.response);
            
            if(checkNetwork !== 'undefined'){
                dispatch({
                    type: RESET_ERROR,
                    payload: err.response.data
                });
      
            }else{
            dispatch({type:NETWORK_ERROR_OR_PROBLEM});
             }
    });
    }else{
        dispatch({
            type: RESET_ERROR,
            payload: {error: "Please enter a valid email"}
        });
        
    }

    
};
const isEmail = (email)=>{
    const regularExpression = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/  ;
        if(email.match(regularExpression)) return true;
        else return false;
 };
 
 export const clearNetworkError = ()=>(dispatch)=>{
    dispatch({type: CLEAR_NETWORK_ERROR,});
};
export const openNotifFromMenu =()=>(dispatch)=>{
    dispatch({
        type: OPEN_NOTIFICATIONS_FROM_MENU,
    });
};

export const openPostFromMenu =()=>(dispatch)=>{
    dispatch({
        type: OPEN_POST_FROM_MENU,
    });
};

