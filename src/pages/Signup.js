import React,{useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';


import {Link} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import wewinglobe from '../Images/wewinglobe.png';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//Redux
import NetworkErrorSnackBar from '../components/Weshouts/NetworkErrorSnackBar';
import {connect} from 'react-redux';
import {signupUser} from '../redux/actions/userActions';

const useStyles = makeStyles(theme =>({
    form: {
     textAlign: 'center',
     
    },
    pageTitle:{
        color:theme.palette.primary.dark,
        margin: '5px auto 5px auto'
    },
    image:{
        margin: '4px auto 4px auto'
    },
    textField: {
        margin: '2px auto 2px auto',
        width: '100%',
        caretColor: theme.palette.primary.dark,
        [theme.breakpoints.down('xs')]:{
            width: '80%'
        }
        
    },
    loginTitle:{
        color: theme.palette.primary.main
    },
    submitButton:{
        margin: '30px',
        positio: 'relative'
        
    },
    customError: {
        color: 'red',
        fontSize: '0.9rem',
        marginTop: '10px'
    },
    
    createAccount:{
        color: theme.palette.primary.main,
        marginTop: '15px'
    },
    spinner:{
        position: 'absolute'
    }
    

}));


function Signup(props) {

    const { UI:{loading, general, handleinUse, emailinUse, errors,networkError}} = props;
    const [emailinuse, setEmailinuse] = useState({email: ''});
    const [handleinuse, setHandleinuse] = useState({handle:''});
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");

   // const [loading, setLoading] = useState(false);
    const [newerrors,setNewerrors] = useState({errors: {email: '', password: ''}});
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newgeneral, setNewgeneral] = useState({general: ''});
    const [handle, setHandle] = useState('');

    

    useEffect(()=>{
        if(errors.errors !== undefined){
            setNewerrors(errors);
            setNewgeneral({general: ''});
            setHandleinuse({handle:''});
            setEmailinuse({email: ''});
        }

        if(handleinUse.handle!== undefined){
            setHandleinuse(handleinUse);
            setNewerrors({errors: {email: '', password: ''}});
            setEmailinuse({email: ''});
            setNewgeneral({general: ''});
        }
        if(general.general !== undefined){
            setNewgeneral(general);
            setNewerrors({errors: {email: '', password: ''}});
            setEmailinuse({email: ''});
            setHandleinuse({handle:''});
        }
        if(emailinUse.email !== undefined){
            setEmailinuse(emailinUse);
            setNewgeneral({general: ''});
            setNewerrors({errors: {email: '', password: ''}});
            setHandleinuse({handle:''});
        }
    },[errors,general,emailinUse,handleinUse]);
    


    const HandleSubmit=(event)=>{
       
        event.preventDefault();
    
        const newUserData = {
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            handle: handle
        };
        props.signupUser(newUserData,props.history);
       // axios.post('/signup' , newUserData)
       // .then(res=>{
        //    console.log(res.data);
        //    localStorage.setItem('FBIdToken',`Bearer ${res.data.token}`);
        //    setLoading(false);
          //  props.history.push('/');
       // })
       // .catch((err)=>{
            
        //    console.log(err.response.data);
            
          //  console.log('it got here');
           // if(err.response.data.errors){
            //    setErrors(err.response.data);
             //   setGeneral({general: ''});
             //   setEmailinuse({email:''});
             //   setHandleinuse({handle:''});
             //   setLoading(false);
           // }

           // if(err.response.data.general){
           //     setGeneral(err.response.data);
           //     setLoading(false);
           //     setEmailinuse({email:''});
          //      setHandleinuse({handle:''});
          //      setErrors({errors:{}});
          //  }
        
           // if(err.response.data.email){
              //  setEmailinuse(err.response.data);
               // setLoading(false);
               // setGeneral({general: ''});
              //  setHandleinuse({handle:''});
              //  setErrors({errors:{}});
               
        //    }
           // if(err.response.data.handle){
               // setHandleinuse(err.response.data);
              //  setLoading(false);
              //  setGeneral({general: ''});
              //  setGeneral({general: ''});
            //    setErrors({errors:{}});
                
         //   }
            

      //  });
       
    };

    
    

    const classes = useStyles();
    return (
        <Grid container className={classes.form}>
         <Grid item sm/>   
         <Grid item sm>
        <img src={wewinglobe} alt='wewinglobe logo' className={classes.image} />
        <Typography variant='body1' className={classes.pageTitle}>Welcome, reach friends and family globally.</Typography>
        <Typography variant='h4' className={classes.loginTitle}>Signup</Typography>
        <form noValidate onSubmit={(event)=>{HandleSubmit(event)}}>
        {newgeneral.general && (<Typography variant="body2" className={classes.customError}>{newgeneral.general}</Typography>)}

        <TextField id="handle" name="handle" value={handle} type="text" label="Username" onChange={(event)=>{
            setHandle(event.target.value)
        }} className={classes.textField} helperText={newerrors.errors.handle} 
        error={newerrors.errors.handle ? true: false } fullWidth ></TextField> 
        {emailinuse.email && (<Typography variant="body2" className={classes.customError}>{emailinuse.email}</Typography>)} 
        <TextField id="email" name="email"  value={email} type="email" label="Email" onChange={(event)=>{
            setEmail(event.target.value)
        }} className={classes.textField} helperText={newerrors.errors.email} 
        error={newerrors.errors.email ? true: false } fullWidth ></TextField>
         <TextField id="password" name="password" value={password} 
          type="password" label="Password" onChange={(event)=>{
            setPassword(event.target.value)
        }} className={classes.textField} 
        helperText={newerrors.errors.password} 
        error={newerrors.errors.password ? true: false } fullWidth></TextField>
        <TextField id="confirmPassword" 
         name="confirmPassword" value={confirmPassword} type="password" label="Confirm password" onChange={(event)=>{
            setConfirmPassword(event.target.value)
        }} className={classes.textField} 
        helperText={newerrors.errors.confirmPassword} 
        error={newerrors.errors.confirmPassword ? true: false } fullWidth></TextField>
    {handleinuse.handle && (<Typography variant="body2" className={classes.customError}>{handleinuse.handle}</Typography>)}
       <br/>
        <Button type="submit" className={classes.submitButton} variant="contained" color="primary" disabled={loading}>signup
        {loading &&(<CircularProgress className={classes.spinner}></CircularProgress>)}</Button>
        <br/>
        <Typography variant="h6" color="textSecondary">Already have an account? <Link to='/' className={classes.createAccount}>Login</Link></Typography>
        </form>
      <NetworkErrorSnackBar snackBarControl= {networkError}/>
        </Grid> 
        <Grid item sm/>  
        </Grid>
    )
}

const mapStateToProps=(state)=>({
    UI: state.UI,
    user: state.user

});
const mapActionsToProps = {
    signupUser
}


export default connect(mapStateToProps,mapActionsToProps)(Signup);
