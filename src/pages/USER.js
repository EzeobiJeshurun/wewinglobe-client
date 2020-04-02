import React,{useState, Fragment, useEffect, useMemo} from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core';

import axios from 'axios';
import Posts from '../components/Weshouts/Posts';
import StaticProfile from '../components/Profile/StaticProfile';
// This is for redux
import {connect} from 'react-redux';
import {getSpecificUserDetails} from '../redux/actions/dataActions';

const useStyles = makeStyles(theme =>({
    
}));

function USER(props) {
    
const {aboutOneUser, loading} = props.data;    
const match = props.match; 
const getUserFunction = props.getSpecificUserDetails; 
const classes = useStyles();  
const [profile, setProfile]= useState({});



useEffect(()=>{
    const handle = match.params.handle;
    getUserFunction(handle);
    axios.get(`/user/${handle}`)
    .then((res)=>{
        setProfile(res.data.user);
    }).catch((err)=>{

    });
},[getUserFunction,match.params.handle]);

const userWeshoutMarkup = loading? (<div>loading posts....</div>) : aboutOneUser === null? (//displays if no user found
    <Fragment>
<div>No post found</div>
    </Fragment>
):(// displays if user has posts
aboutOneUser.map(onepost => <Posts key={onepost.weshoutId} info={onepost} />)
);
    return (
        <Fragment>
             <Grid container className={classes.root} spacing={2}>
            <Grid item sm={4} className={classes.lowerGrid} xs={11}>
                <StaticProfile profile={profile} />
        </Grid>
        <Grid item sm={8} xs={11} className={classes.lowerGrid}>
                {userWeshoutMarkup}
            </Grid>
        </Grid>
        </Fragment>
    )
}

const mapStateToProps =(state)=>({
  data: state.data
});
const mapActionsToProps ={
    getSpecificUserDetails,
};

export default connect(mapStateToProps, mapActionsToProps)(USER)
