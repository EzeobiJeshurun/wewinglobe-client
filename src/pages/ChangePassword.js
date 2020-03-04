import React, { useState} from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import {makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


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


  textField: {
    width: '100%'
  },
  button:{
      marginTop: '4vh'
  }
}));


function ChangePassword () {
 const classes = useStyles();
const [email, setEmail] = useState('');
const [error, setError] = useState('');
const [newemail, setNewemail] = useState('');

const HandleSubmit = (event)=>{
 event.preventDefault();
};
        return (
            <Grid container className={classes.root}>
            <Grid item sm>

            </Grid>
            <Grid item className={classes.textContainer} sm>
                {error? <Typography className={classes.errorMessage}>{error.error}</Typography> : <Typography variant="h6"  className={classes.infoText}>Enter your account email. </Typography>}
                <br/>
              <form novalidate="novalidate" onSubmit={(event)=>{HandleSubmit(event)}} className={classes.form}>
                <TextField id="email" name="email" value={email} type="email" label="Email" onChange={(event)=>{
            setEmail(event.target.value)
        }} className={classes.textField}
          > </TextField>
          <br/>
          <Button className={classes.button} color="primary" type="submit" variant="contained">continue</Button>
          </form> 
            </Grid>
            <Grid item sm></Grid>
                 
            </Grid>
        )
    }

export default ChangePassword
