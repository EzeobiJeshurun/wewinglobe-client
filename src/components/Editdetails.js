import React,{Fragment, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core';

///Redux 
import {connect} from 'react-redux';
import {editUserDetails} from '../redux/actions/userActions';

const useStyles = (theme=>({

}));

function Editdetails() {
    const [newbio, setNewbio] = useState('');
    const [newwebsite, setNewwebsite] = useState('');
    const [newlocation, setNewlocation] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(()=>{

    },[]);
    const classes = useStyles();
    return (
        <div>
            
        </div>
    )
}
const mapStateToProps =(state)=> ({
    UI : state.UI,
    credentials: state.USER.credentials
});

const mapActionsToProp = {
    editUserDetails
};

export default connect(mapStateToProps, mapActionsToProp)(Editdetails);
