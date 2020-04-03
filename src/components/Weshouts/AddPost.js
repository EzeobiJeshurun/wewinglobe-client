import React, { Fragment, useState,useEffect, useMemo} from 'react';
import {makeStyles} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

import IconButton from '@material-ui/core/IconButton';

import {connect} from 'react-redux';
import store from '../../redux/store';
import {CLEAR_CLOSE_ON_RECEIVE} from '../../redux/types';
import {postWeshout} from '../../redux/actions/dataActions';


const Styles = makeStyles(theme =>({
    eventForm: {
        position: 'relative',
    },
    addButton:{
        color: theme.palette.myextra.light,
    },
    closeButton:{
        position: 'absolute',
        left: '90%',
        top: '4%',
        [theme.breakpoints.down('xs')]:{
            left: '85%'
        },
    },
    submitButton:{
        position: 'relative',
        marginTop: '4%',
        marginBottom: '3%',
        left: '80%',
        [theme.breakpoints.down('xs')]:{
            left: '60%',
            
        },
    },
    spinner:{
        position: 'absolute',
    },
}));

function AddPost(props) {
    const {UI: {loading, postError}, closeOnRecieve } = props;
    const [open , setOpen] = useState(false);
    const [error, setError] = useState({error: ""});
    //the state helpClose, is assigned to ensure the dialog closes only when there is no errors.
    
    const [body, setBody] = useState("");
    const handleOpen=()=>{
        setOpen(true);
    };
    const handleClose=()=>{
        setOpen(false);
    };

    const addNewPost = (event)=>{
        event.preventDefault();
        if(body === ""){
            setError({error:"Post must not be empty"});
        }else{
            props.postWeshout({body: body});
        }
        
        
    };
    
    const whenErrorChanges = useMemo(()=>{
    
    
        setError(postError);
        
    },[postError]);

    //implements adequate response of helpClose with changes in error
    
    const theHelperHandleClose = useMemo(()=>{
    
           if(closeOnRecieve!==""){
               handleClose();
            store.dispatch({
                type: CLEAR_CLOSE_ON_RECEIVE,
            });
           }
        
       
    },[closeOnRecieve]);

    

    
    const classes = Styles();
    return (
        <Fragment>
            <Tooltip title="post what's on your mind" placement="top">
           <IconButton onClick={()=>{
               handleOpen();
           }}>
               <AddIcon className={classes.addButton}/>
            </IconButton>
            </Tooltip> 
            <Dialog open={open} onClose={()=>{
                handleClose();
            }}  fullWidth maxWidth="sm">
                <Tooltip title="close" placement="top">
                <IconButton onClick={()=>{
                    handleClose();
                }} className={classes.closeButton}>
                    <CloseIcon color="primary"/>
                </IconButton>
                </Tooltip>
                <DialogTitle>What's on your mind? Post.</DialogTitle>
                <DialogContent>
                    <form onSubmit={(event)=>{
                        addNewPost(event)                  
                        
                    }}  className={classes.eventForm}>
                        <TextField name="body" value={body} type="text" error={error.error? true: false} helperText={error.error}
                         label="Share something" multiline rowsMax={6} rows={4} placeholder="Let your friends know what you think"
                         className={classes.textField} onFocus={()=>{
                             setError({error: ""});
                         }} onChange={(event)=>{
                            setBody(event.target.value)
                         }}   fullWidth>
                            
                        </TextField>
                        <br/>
                        <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                            submit
                         {loading && (<CircularProgress className={classes.spinner} size={30}></CircularProgress>)}
                        </Button>
                    </form>


                </DialogContent>
            </Dialog>
        </Fragment>
    )
}
const mapStateToProps =(state)=>({
    UI: state.UI,
    closeOnRecieve: state.data.closeOnRecieve
});

const mapActionsToProps = {
    postWeshout
};

export default connect(mapStateToProps, mapActionsToProps)(AddPost);


