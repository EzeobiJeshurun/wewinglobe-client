import React from 'react';
import {useState, useEffect,Fragment, useCallback, useMemo} from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import Posts from '../components/Weshouts/Posts';
import Profile   from '../components/Profile/Profile';

//import store from '../redux/store';
//import {SET_AUTHENTICATED} from '../redux/types';
//import {getUserData, logoutUser} from '../redux/actions/userActions';
//import jwtDecode from 'jwt-decode';
import {makeStyles} from '@material-ui/core';
import {getWeshouts} from '../redux/actions/dataActions';
import {connect} from 'react-redux';
import WeshoutSkeleton from '../util/WeshoutSkeleton';
import NetworkErrorSnackBar from '../components/Weshouts/NetworkErrorSnackBar';


const useStyles = makeStyles(theme=>({
    root: {
        
        display: 'flex',
        margin: '0px auto 0px auto',
        height: '100vh',
        boxSizing: 'border-box',
        background: theme.palette.myextra.main,
        flexDirection: 'row-reverse',
    
        [theme.breakpoints.down('xs')]:{
           flexDirection: 'row',
           margin: '0px auto 0px auto'
           
        }
    },
    lowerGrid: {
        margin: '0px auto 0px auto',
    },
    upperGrid: {
        margin: '0px auto 0px auto',
    },
    spacerDiv:{
        width: '90vw',
        height: '20px',
    }

}));

function Home(props) {
  const {data:{weshouts, loading,networkError }, getWeshouts}= props;
    const classes = useStyles();
   
    const [weshout, setWeshout] = useState([]);
    const [steadily, setSteadily] = useState(1);

    
    const getAllposts = useCallback(getWeshouts,[steadily]);
    const newWeshout = useMemo(()=>{
        setWeshout(weshouts);
    },[weshouts]);

    useEffect(()=>{
        getAllposts();
        
    },[getAllposts]);

let recentScreamsMarkup = weshout  ? (weshout.map(onepost=> <Posts key={onepost.weshoutId} onepost={onepost} />)):(<WeshoutSkeleton/>);


    return (
        <Fragment>
    <Hidden xsDown>
        <Grid container className={classes.root}  spacing={2}>
          
            <Grid item sm={4} className={classes.upperGrid} xs={11}>
                <Profile />
        </Grid>
        <Grid item sm={8} xs={11} className={classes.lowerGrid}>
            {!weshouts.length > 0 ?(<WeshoutSkeleton/>) : null }
                {recentScreamsMarkup}
            </Grid>
            </Grid>
       
    </Hidden>
    <Hidden smUp>
    <Grid container className={classes.root}  spacing={0}>
          
          <Grid item sm={4} className={classes.upperGrid} xs={11}>
              <Profile />
      </Grid>
      <div className={classes.spacerDiv}></div>
      <Grid item sm={8} xs={11} className={classes.lowerGrid}>
      {!weshouts.length > 0 ?(<WeshoutSkeleton/>) : null }
              {recentScreamsMarkup}
          </Grid>
    </Grid>
    </Hidden>
  <NetworkErrorSnackBar snackBarControl={networkError} /> 
    </Fragment>   
    )
}

const mapStateToProps = (state)=>({
    data: state.data
});

const MapActionsToProp={
    getWeshouts
}

export default connect(mapStateToProps, MapActionsToProp)(Home);
