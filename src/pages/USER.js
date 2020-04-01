import React,{useState, Fragment, useEffect, useMemo} from 'react';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
import Posts from '../components/Weshouts/Posts';

// This is for redux
import {connect} from 'react-redux';
import {getSpecificUserDetails} from '../redux/actions/dataActions';

function USER(props) {
const {aboutOneUser, loading} = props.data;    
const match = props.match; 
const getUserFunction = props.getSpecificUserDetails;   
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

    return (
        <div>
            
        </div>
    )
}

const mapStateToProps =(state)=>({
  data: state.data
});
const mapActionsToProps ={
    getSpecificUserDetails,
};

export default connect(mapStateToProps, mapActionsToProps)(USER)
