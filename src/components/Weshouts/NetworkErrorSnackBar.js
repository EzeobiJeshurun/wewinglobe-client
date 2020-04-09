import React, {useState, useMemo, Fragment} from 'react';
import SnackBar from '@material-ui/core/Snackbar';


import {CLEAR_NETWORK_ERROR} from '../../redux/types';
import store from '../../redux/store';



function NetworkErrorSnackBar(props) {
    //the Name a the prop that must be passed "snackBarControl" with a value of true or false.
    const {snackBarControl} = props;
    const [open, setOpen] =useState(false);
    
    const handleClose=(event, reason)=>{
        if(reason === 'clickaway'){
            return;
        }
        setOpen(false);
    };
    const FuctionToTriggerTheSnackBar = useMemo(()=>{
        if(snackBarControl){
            setOpen(snackBarControl);
            store.dispatch({type: CLEAR_NETWORK_ERROR});
        }
        

    },[snackBarControl]);
    return (
        <Fragment>
      <SnackBar open={open}  
      message={"Please Check your internet connection"} autoHideDuration={4000} onClose={handleClose} />        
        
      
        </Fragment>
    )
}

export default NetworkErrorSnackBar;
