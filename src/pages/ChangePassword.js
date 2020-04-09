import React, { useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import {makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {connect} from 'react-redux';
import {resetP } from '../redux/actions/userActions';


const useStyles = makeStyles(theme =>({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    
    },
   infoText:{
        color: theme.palette.primary.main
   },
  textContainer: {
    marginTop: '30vh',
    
  },
  form:{
    alignText: 'center',
  },
  errorMessage:{
    color: 'red'
  },
  sentSuccess: {
    color: 'green'
  },
  containerOrganizer:{
    alignText: 'center'
  },
  textField: {
    width: '100%'
  },
  button:{
      marginTop: '4vh',
      position: 'relative'
  },
  spinner:{
    position: 'absolute'
  }
}));


function ChangePassword (props) {
  const {UI: {loadingR, reset, resetE}} = props;
 const classes = useStyles();
const [email, setEmail] = useState('');
const [error, setError] = useState('');
const [toshow, setToshow] = useState(true);
const [message, setMessage] = useState({message: ""});


const HandleSubmit = (event)=>{
 event.preventDefault();
const userEmail = email;

props.resetP(userEmail);

};
useEffect(()=>{
  if(reset.message){
    setMessage(reset);
    setError({error: ''});
    setToshow(false);
  }
  if(resetE.error){
    setError(resetE);
    setToshow(false);
    setMessage({message: ""});
  }
  

},[resetE,reset,reset.message,reset.error]);
        return (
            <Grid container className={classes.root}>
            <Grid item sm>

            </Grid>
            <Grid item className={classes.textContainer} sm>
          <div className={classes.containerOrganizer}>
                {toshow && (<Typography variant="h6"  className={classes.infoText}>Enter your account email. </Typography>)}
                {error.error && (<Typography variant="h6" className={classes.errorMessage}>{error.error}</Typography>)}
                {message.message && (<Typography variant="h6" className={classes.sentSuccess}>{message.message}</Typography>)}

                <br/>
              <form novalidate="novalidate" onSubmit={(event)=>{HandleSubmit(event)}} className={classes.form}>
                <TextField id="email" name="email" value={email} type="email" label="Email" onChange={(event)=>{
            setEmail(event.target.value)
        }} className={classes.textField}
          > </TextField>
          <br/>
          <Button className={classes.button} color="primary" type="submit" variant="contained">{loadingR 
          && (<CircularProgress className={classes.spinner}></CircularProgress>)}continue</Button>
          </form> 
          </div>
            </Grid>
            <Grid item sm></Grid>
                 
            </Grid>
        )
    }

    const mapStateToProps=(state)=>({
      UI: state.UI
    });

    const mapActionToProps ={
      resetP
    };

export default connect(mapStateToProps, mapActionToProps)(ChangePassword)
