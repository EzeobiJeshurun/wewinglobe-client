import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';






function Navbar({myTheme, setThemecontroller, themecontroller}) {
        return (
            <AppBar>
                <Toolbar className="nav-container">
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/signup">Signup</Button>
                <Button color="inherit" component={Link} to="/login">login</Button>
                <Switch onChange={()=>{
                    setThemecontroller(!themecontroller);
                    myTheme()
                }}/>
                </Toolbar>
            </AppBar>
        )
    }


export default Navbar;

