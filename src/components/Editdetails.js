import React,{Fragment, useEffect, useState,useCallback} from 'react';
import {makeStyles} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
///Redux 
import {connect} from 'react-redux';
import {editUserDetails} from '../redux/actions/userActions';

const useStyles = makeStyles(theme=>({
    button:{
        float: 'right'
    }

}));



function Editdetails(props) {
    const {credentials} = props;
    const [newbio, setNewbio] = useState('');
    const [newwebsite, setNewwebsite] = useState('');
    const [newlocation, setNewlocation] = useState('');
    const [open, setOpen] = useState(false);
    const handleSubmit=()=>{
        const userDetails ={
            bio: newbio,
            website: newwebsite,
            location: newlocation
        };
        props.editUserDetails(userDetails);
        handleClose();
    };

    const handleOpen= ()=>{
        setOpen(true);
        mapUserDetailsToState(credentials);
    };
    const mapUserDetailsToState = useCallback((credintials)=>{
        if(credentials.bio){
            setNewbio(credentials.bio);
          }  
          if(credentials.website){
            setNewwebsite(credentials.website);
          }  
          if(credentials.location){
            setNewlocation(credentials.location);
          }  
    },[credentials.bio,credentials.website,credentials.location]);
    const handleClose= ()=>{
        setOpen(false);
    };
    useEffect(()=>{
     
        mapUserDetailsToState(credentials);


    },[credentials, mapUserDetailsToState]);
    const classes = useStyles();
    return (
        <Fragment>
            <Tooltip title="Edit Details" placement="top">
                <IconButton className={classes.button} onClick={()=>{
                    handleOpen();
                }}>
                    <EditIcon color="primary"/>
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={()=>{
                handleClose();
            }} fullWidth maxWidth="sm">
                <DialogTitle>Edit your details</DialogTitle>
                <DialogContent>
                    <form>
                    <TextField type="text" multiline rows={3} name="bio" label="bio" placeholder="Please tell us about yourself"
                    value={newbio} onChange={(event)=>{
                        setNewbio(event.target.value);
                    }}   className={classes.textfield} fullWidth>

                    </TextField>
                    <TextField type="text" name="website" placeholder="your website" label="website"
                    value={newwebsite} onChange={(event)=>{
                        setNewwebsite(event.target.value);
                    }}   className={classes.textfield} fullWidth>

                    </TextField>
                    <TextField type="text" name="location" placeholder="city, country" label="location"
                    value={newlocation} onChange={(event)=>{
                        setNewlocation(event.target.value);
                    }}   className={classes.textfield} fullWidth>

                    </TextField>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{
                        handleClose();
                    }} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={()=>{
                        handleSubmit();
                    }} color="primary">
                        Save
                    </Button>
                </DialogActions>

            </Dialog>
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
