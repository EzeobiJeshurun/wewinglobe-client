import React, { Fragment, useState} from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import {connect} from 'react-redux';
import {deleteWeshout} from '../../redux/actions/dataActions';

const Styles = makeStyles(theme=>({
    deleteButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    }

}));

function DeleteWeshout(props) {
    const { deleteWeshout, weshoutId} = props;
    const classes = Styles();
    const [open,setOpen] = useState(false);
    const handleOpen =()=>{
        setOpen(true);
    };
    const handleClose =()=>{
        setOpen(false);
    };
    const deleteButtonAction =(weshoutId)=>{
        deleteWeshout(weshoutId);
        setOpen(false);
    };




    return (
        <Fragment>
        <IconButton onClick={()=>{
            handleOpen();
        }} className ={classes.deleteButton}>
            <DeleteOutline color="secondary"/>
        </IconButton>
        <Dialog open={open} onClose={()=>{
            handleClose(); 
        }}  fullWidth maxWidth="sm">
            <DialogTitle >
        Are you sure you want to delete this post?
            </DialogTitle>
            <DialogActions>
            <Button color ="primary" onClick={()=>{
                handleClose()
            }}>cancel </Button>
            <Button color ="secondary" onClick={()=>{
                deleteButtonAction(weshoutId);
            }}>delete </Button>
            </DialogActions>
        </Dialog>
        </Fragment>
    )
}

const mapStateToProps =(state)=>({

});
const mapActionsToProp = {
    deleteWeshout
};

export default connect(mapStateToProps, mapActionsToProp)(DeleteWeshout);
