import React, {useState,Fragment} from 'react';
import {Link} from 'react-router-dom';
import myLogo from '../../Images/wewinglobeLogo.svg';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import {connect} from 'react-redux';
import InvertColors from '@material-ui/icons/InvertColors';
import InvertColorsOff from '@material-ui/icons/InvertColorsOff';
import {makeStyles} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SignUpIcon from '@material-ui/icons/PersonAdd';
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';

import HomeIcon from '@material-ui/icons/Home';
import Notifications from './Notifications';
import AddPost from '../Weshouts/AddPost';
import AppBardrawer from './AppBardrawer';


const useStyles = makeStyles(theme=>({
    navContainer:{
        margin: 'auto',
        boxSizing: 'border-box',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('xs')]:{
        //position: 'sticky'|'-webkit-sticky',
        }
    },
    afterAuthButton:{
        color: theme.palette.myextra.light
    },
    pushAllIconsLeft:{
        marginLeft: 'auto'
    },
    pushAllIconsRight: {
        marginRight: 'auto',
    },
    logo:{
        
        boxSizing: 'border-box',
        height: '80px',
        paddingRight: '30px',
    }

    
}));





function Navbar({myTheme, setThemecontroller, themecontroller, imageUrl, authenticated}) {
    const classes = useStyles();

    const [changeColors, setChangeColors] = useState(false);
    const [changeBrightness, setChangeBrightness] = useState(false);
        return (
            <AppBar>
                <Toolbar className={classes.navContainer}>
                {authenticated ? (<Fragment>
                    <Hidden smUp>
                    <AppBardrawer />
                    </Hidden>
                    <AddPost/>
                    
                   <Hidden xsDown> <Link to='/home'>
                    <img className={classes.logo} src={myLogo} alt="wewinglobe logo" />   
                    <Tooltip title="home" placement="top">
                    <IconButton>
                        <HomeIcon className={classes.afterAuthButton}/>
                    </IconButton>
                    </Tooltip>
                </Link>
                </Hidden>
                 <Notifications />
                 <IconButton color="inherit" onClick={()=>{
                        setThemecontroller(!themecontroller);
                        myTheme()
                        setChangeColors(!changeColors);
                    }} className={classes.pushAllIconsLeft}>
                        {changeColors? <InvertColors/>:<InvertColorsOff/>}
                    </IconButton>
                    <IconButton color="inherit" onClick={()=>{
                        setChangeBrightness(!changeBrightness);
                    }}
                    >
                    {changeBrightness? <BrightnessLowIcon/>: <BrightnessHighIcon/>}
                    </IconButton>
                   {imageUrl&& <Avatar alt="user profile" src={imageUrl} />}
    
                </Fragment>):(
                    <Fragment>
                    <Hidden smUp>
                    <AppBardrawer />
                    </Hidden> 
                    <Hidden xsDown>
                    <img className={classes.logo} src={myLogo} alt="wewinglobe logo" />     
                    <Button color="inherit" component={Link} to="/home">Home</Button>
                    <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    <Button color="inherit" component={Link} to="/" className={classes.pushAllIconsRight}>login</Button>
                    </Hidden>
                  {/* <Hidden smUp>
                    <Tooltip title="Home" placement="top">
                    <IconButton color="inherit" className={classes.pushAllIconsLeft} component={Link} to='/' >
                    <HomeIcon />
                    </IconButton> 
                    </Tooltip>
                  </Hidden>*/}
                    <Tooltip title="Change color" placement="top">
                    <IconButton color="inherit"  className={classes.pushAllIconsLeft}   onClick={()=>{
                        setThemecontroller(!themecontroller);
                        myTheme()
                        setChangeColors(!changeColors);
                    }} >
                        {changeColors? <InvertColors/>:<InvertColorsOff/>}
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Change Brightness" placement="top">
                    <IconButton color="inherit" onClick={()=>{
                        setChangeBrightness(!changeBrightness);
                    }}
                    >
                    {changeBrightness? <BrightnessLowIcon/>: <BrightnessHighIcon/>}
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Signup" placement="top">
                    <IconButton color="inherit" component={Link} to={'/Signup'} >
                        <SignUpIcon/>
                    </IconButton>
                    </Tooltip>
                    </Fragment>
                )}
                
                </Toolbar>
            </AppBar>
        )
    }

    const mapStateToProps =(state)=>({
        authenticated: state.user.authenticated,
        imageUrl: state.user.credentials.imageUrl,

    });


export default connect(mapStateToProps)(Navbar);

