import React, {useState,Fragment} from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import InvertColors from '@material-ui/icons/InvertColors';
import InvertColorsOff from '@material-ui/icons/InvertColorsOff';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme=>({
    navContainer:{
        margin: 'auto',
        [theme.breakpoints.down('xs')]:{
        
        }
    }
}));





function Navbar({myTheme, setThemecontroller, themecontroller, authenticated}) {
    const classes = useStyles();

    const [changeColors, setChangeColors] = useState(false);
        return (
            <AppBar>
                <Toolbar className={classes.navContainer}>
                {authenticated ? (<Fragment>

                </Fragment>):(
                    <Fragment>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    <Button color="inherit" component={Link} to="/login">login</Button>
                    <Button color="inherit" onClick={()=>{
                        setThemecontroller(!themecontroller);
                        myTheme()
                        setChangeColors(!changeColors);
                    }}>
                        {changeColors? <InvertColors/>:<InvertColorsOff/>}
                    </Button>
                    </Fragment>
                )}
                
                </Toolbar>
            </AppBar>
        )
    }

    const mapStateToProps =(state)=>({
        authenticated: state.user.authenticated

    });


export default connect(mapStateToProps)(Navbar);

