import React from 'react';
import {useState, useEffect, useCallback, useMemo} from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Posts from '../components/Posts';
import Profile   from '../components/Profile';

//import store from '../redux/store';
//import {SET_AUTHENTICATED} from '../redux/types';
//import {getUserData, logoutUser} from '../redux/actions/userActions';
//import jwtDecode from 'jwt-decode';
import {makeStyles} from '@material-ui/core';
import {getWeshouts} from '../redux/actions/dataActions';
import {connect} from 'react-redux';

const useStyles = makeStyles(theme=>({
    root: {
        display: 'flex',
        
        height: '100vh',
        margin: 0,
        background: theme.palette.myextra.main,
        flexDirection: 'row-reverse',
        [theme.breakpoints.down('xs')]:{
           flexDirection: 'row'
        }
    }

}));

function Home(props) {
  const {data:{weshouts, loading }, getWeshouts}= props;
    const classes = useStyles();
   
    const [weshout, setWeshout] = useState(false);
    const [steadily, setSteadily] = useState(1);

    
    const getAllposts = useCallback(getWeshouts,[steadily]);
    const newWeshout = useMemo(()=>{
        setWeshout(weshouts);
    },[weshouts]);

    useEffect(()=>{
        getAllposts();
       
    },[getAllposts]);

let recentScreamsMarkup = weshout? (weshout.map(onepost=> <Posts key={onepost.weshoutId} onepost={onepost} />)):(<p>loading...</p>);
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

const mapStateToProps = (state)=>({
    data: state.data
});

const MapActionsToProp={
    getWeshouts
}

export default connect(mapStateToProps, MapActionsToProp)(Home);
