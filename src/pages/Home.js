import React from 'react';
import {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Posts from '../components/Posts';
import Profile   from '../components/Profile';
import store from '../redux/store';
import {SET_AUTHENTICATED} from '../redux/types';
import {getUserData, logoutUser} from '../redux/actions/userActions';
import jwtDecode from 'jwt-decode';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme=>({
    root: {
        display: 'flex',
        flexDirection: 'row-reverse',
        [theme.breakpoints.down('xs')]:{
           flexDirection: 'row'
        }
    }
}));

function Home() {
    const classes = useStyles();
    const token = localStorage.getItem('FBIdToken');
    console.log(`this is the token ${token}`);
    if(token){
      const decodedToken = jwtDecode(token);
      
    
      if(decodedToken.exp * 1000 < Date.now()){
        store.dispatch(logoutUser());
        //window.location.href = '/login';
        
      }else{
        store.dispatch({type: SET_AUTHENTICATED});
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
        axios.defaults.headers.common['Authorization'] = token;
      }
    }
    const [weshout, setWeshout] = useState(false);
    useEffect(()=>{
        axios.get('/weshout')
        .then(res =>{
            //console.log(res.data);
            setWeshout(res.data);
        }).catch((error)=>{
            console.log(error);
        });

    },[]);

let recentScreamsMarkup = weshout? (weshout.map(onepost=> <Posts key={onepost.weshoutId} onepost={onepost} />)):(<p>loading...</p>)
    return (
        <Grid container className={classes.root} spacing={4}>
            <Grid item sm={4} xs={12}>
                <Profile />
        </Grid>
        <Grid item sm={8} xs={12}>
                {recentScreamsMarkup}
            </Grid>
        </Grid>
    )
}

export default Home
