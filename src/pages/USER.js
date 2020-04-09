import React,{useState, Fragment, useEffect,} from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core';
import WeshoutSkeleton from '../util/WeshoutSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';
import NetworkErrorSnackBar from '../components/Weshouts/NetworkErrorSnackBar';
import axios from 'axios';
import Posts from '../components/Weshouts/Posts';
import StaticProfile from '../components/Profile/StaticProfile';
// This is for redux
import {connect} from 'react-redux';
import {getSpecificUserDetails} from '../redux/actions/dataActions';

const useStyles = makeStyles(theme =>({
    root: {
        display: 'flex',
        margin: '0px auto 0px auto',
        height: '100vh',
        boxSizing: 'border-box',
        background: theme.palette.myextra.main,
       // flexDirection: 'row-reverse',
        [theme.breakpoints.down('xs')]:{
          // flexDirection: 'row'
        }
    },
    lowerGrid: {
        margin: '0px auto 0px auto',
    }
}));

function USER(props) {
    
const {aboutOneUser, weshouts,networkError, loading} = props.data;    
const match = props.match; 
const getUserFunction = props.getSpecificUserDetails;
     
const classes = useStyles();  
const [profile, setProfile]= useState({});

//const [thePost, setThePost] = useState([]);
//const handleChangeInUser = useMemo(()=>{
 //   setThePost(aboutOneUser);
//},[aboutOneUser]);
const [weshoutIdParams, setWeshoutIdParams] = useState("");

useEffect(()=>{
    const handle = match.params.handle;
    const newWeshoutId = match.params.weshoutId;
    if(newWeshoutId){
        setWeshoutIdParams(newWeshoutId);
    }
    getUserFunction(handle);
    axios.get(`/user/${handle}`)
    .then((res)=>{
        setProfile(res.data.user);
    }).catch((err)=>{

    });
},[getUserFunction,match.params.handle,match.params.weshoutId]);

const userWeshoutMarkup = loading? (<div><WeshoutSkeleton/></div>) : aboutOneUser === []? (//displays if no user found
    <Fragment>
<div>No post found</div>
    </Fragment>
): (// displays if user has posts
   aboutOneUser.map(onepost => <Posts key={onepost.weshoutId} onepost={onepost} />
    )
);

    return (
        <Fragment>
             <Grid container className={classes.root} spacing={2}>
            <Grid item sm={4} className={classes.lowerGrid} xs={11}>
              {profile=== {}? (<div><ProfileSkeleton/></div>):(<Fragment><StaticProfile profile={profile} /></Fragment>)}  
        </Grid>
        <Grid item sm={8} xs={11} className={classes.lowerGrid}>
                {userWeshoutMarkup}
            </Grid>
        </Grid>
        <NetworkErrorSnackBar snackBarControl={networkError} />
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
