import React, { Fragment, useState} from 'react';
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
import {postWeshout} from '../redux/actions/dataActions';


const Styles = makeStyles(theme =>({
    closeButton:{
        
    },
    submitButton:{
        position: 'relative',
    },
    spinner:{
        position: 'absolute',
    },
}));

function AddPost(props) {
    const {UI: {loading, postError}} = props;
    const [open , setOpen] = useState(false);

    const [body, setBody] = useState("");
    const handleOpen=()=>{
        setOpen(true);
    };
    const handleClose=()=>{
        setOpen(false);
    };

    const addNewPost = ()=>{

    };
    const classes = Styles();
    return (
        <Fragment>
           <IconButton>
               <AddIcon/>
            </IconButton> 
            <Dialog open={open} onClose={()=>{
                handleClose();
            }}  fullWidth maxWidth="sm">
                <Tooltip title="close" placement="top">
                <IconButton onClick={()=>{
                    handleClose();
                }} className={classes.closeButton}>
                    <CloseIcon/>
                </IconButton>
                </Tooltip>
                <DialogTitle>What's on your mind? Post.</DialogTitle>
                <DialogContent>
                    <form onSubmit={()=>{
                        
                    }}>
                        <TextField name="body" value={body} type="text" error={postError.error? true: false} helperText={postError.error}
                         label="Share something" multiline row={4} placeholder="Let your friends know what you think"
                         className={classes.textField} onChange={(event)=>{
                            setBody(event.target.value)
                         }}   fullWidth>
                            
                        </TextField>
                        <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                            submit
                         {loading&& (<CircularProgress className={classes.spinner} size={30}></CircularProgress>)}
                        </Button>
                    </form>


                </DialogContent>
            </Dialog>
        </Fragment>
    )
}
const mapStateToProps =(state)=>({
    UI: state.UI
});

const mapActionsToProps = {
    postWeshout
};

export default connect(mapStateToProps, mapActionsToProps)(AddPost);


