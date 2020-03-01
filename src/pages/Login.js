import React,{useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import wewinglobe from '../Images/wewinglobe.png';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {loginUser} from '../redux/actions/userActions';
import {connect} from 'react-redux';


const useStyles = makeStyles(theme =>({
    form: {
     textAlign: 'center',
     
    },
    pageTitle:{
        color:theme.palette.primary.dark,
        margin: '5px auto 5px auto'
    },
    image:{
        margin: '20px auto 20px auto'
    },
    textField: {
        margin: '2px auto 2px auto'
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
    forgotPassword: {
        color: theme.palette.primary.dark,
        marginTop: '4px'
    },
    createAccount:{
        color: theme.palette.primary.main,
        marginTop: '30px'
    },
    spinner:{
        position: 'absolute'
    }
    

}));


function Login(props) {
    
    const {UI:{loading, errors, general}} = props;
   const [email,setEmail] = useState("");
   const [password, setPassword] = useState("");
   //const [loading, setLoading] = useState(false);
   const [newerrors,setNewerrors] = useState({email: '', password: ''});
   const [newgeneral, setnewGeneral] = useState('');
    useEffect(()=>{
        if(errors.errors !== undefined){
            setNewerrors(errors.errors);
            setnewGeneral('');
        }
    },[errors.errors]);
    useEffect(()=>{

    if(general.general !== undefined){
        setnewGeneral(general.general);
        setNewerrors({email: '', password: ''});
    }
    },[general.general]);
   
   const HandleSubmit=(event)=>{
       
        event.preventDefault();
       // setLoading(true);
        const userData = {
            email: email,
            password: password
        };
        props.loginUser(userData, props.history);
        //loginUser(userData);
       //axios.post('/login' , userData)
       //.then(res=>{
        //   console.log(res.data);
        //   localStorage.removeItem('FBIdToken');
        //   localStorage.setItem('FBIdToken',`Bearer ${res.data.token}`);
        //   setLoading(false);
        //   props.history.push('/');
      // })
      // .catch((err)=>{
            
       //    console.log(err.response.data);
            
         //  console.log('it got here');
          // if(err.response.data.errors){
           //    setErrors(err.response.data);
           //    setLoading(false);
         //  }

          // if(err.response.data.general){
            //   setGeneral(err.response.data);
            //   setLoading(false);
          // }
        
            
            

      // });
       
    };

    

    const classes = useStyles();
    return (
        <Grid container className={classes.form}>
         <Grid item sm/>   
         <Grid item sm>
        <img src={wewinglobe} alt='wewinglobe logo' className={classes.image} />
        <Typography variant='body1' className={classes.pageTitle}>Welcome, reach friends and family globally.</Typography>
        <Typography variant='h4' className={classes.loginTitle}>Login</Typography>
        <form noValidate onSubmit={(event)=>{HandleSubmit(event)}}>
        {newgeneral && (<Typography variant="body2" className={classes.customError}>{newgeneral}</Typography>)}   
        <TextField id="email" name="email" value={email} type="email" label="Email" onChange={(event)=>{
            setEmail(event.target.value)
        }} className={classes.textField} helperText={newerrors.email} 
        error={newerrors.email ? true: false } fullWidth ></TextField>
         <TextField id="password" name="password" value={password} type="password" label="Password" onChange={(event)=>{
            setPassword(event.target.value)
        }} className={classes.textField} 
        helperText={newerrors.password} 
        error={newerrors.password ? true: false } fullWidth></TextField>
       <Typography variant="body2" className={classes.forgotPassword} component={Link} to='/ChangePassword'>forgot password?</Typography>
       <br/>
        <Button type="submit" className={classes.submitButton} variant="contained" color="primary" disabled={loading}>login
        {loading &&(<CircularProgress className={classes.spinner}></CircularProgress>)}</Button>
        <br/>
        <Typography variant="h6" color="textSecondary">Don't have an account? <Link to='/Signup' className={classes.createAccount}>signup</Link></Typography>
        </form>
        </Grid> 
        <Grid item sm/>  
        </Grid>
    )
}
const mapStateToProps = (state)=>({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps,mapActionsToProps)(Login);
