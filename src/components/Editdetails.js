import React,{Fragment, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
///Redux 
import {connect} from 'react-redux';
import {editUserDetails} from '../redux/actions/userActions';

const useStyles = (theme=>({

}));

function Editdetails(props) {
    const {credentials} = props
    const [newbio, setNewbio] = useState('');
    const [newwebsite, setNewwebsite] = useState('');
    const [newlocation, setNewlocation] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(()=>{
      if(credentials.bio){
        setNewbio(credentials.bio);
      }  
      if(credentials.website){
        setNewwebsite(credentials.website);
      }  
      if(credentials.location){
        setNewlocation(credentials.location);
      }  



    },[credentials.location,credentials.bio,credentials.website]);
    const classes = useStyles();
    return (
        <Fragment>

        </Fragment>
    )
}
const mapStateToProps =(state)=> ({
    UI : state.UI,
    credentials: state.user.credentials
});

const mapActionsToProp = {
    editUserDetails
};

export default connect(mapStateToProps, mapActionsToProp)(Editdetails);
