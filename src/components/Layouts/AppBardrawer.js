import React, {Fragment, useState} from 'react';
import IconBotton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {makeStyles} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PostAddIcon from '@material-ui/icons/PostAdd';
import HomeIcon from '@material-ui/icons/Home';
import NotificationIcon from '@material-ui/icons/Notifications';
import LoginIcon from '@material-ui/icons/Input';
import SignUpIcon from '@material-ui/icons/HowToReg';
import {connect} from 'react-redux';
import { logoutUser} from '../../redux/actions/userActions';


const useStyles = makeStyles(theme=>({
    listContainerDiv:{
        paddingTop: '30px',
        width: '30vw',
        [theme.breakpoints.down('xs')]:{
            width:'60vw',
        },
    },
    forMenu:{
        paddingLeft: '20px',
        paddingRight: '20px',
        color: theme.palette.myextra.light,
    },
}));

function AppBardrawer() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleOpen= ()=>{
        setOpen(true);
    };
    const handleClose =()=>{
        setOpen(false);
    };

    return (
        <Fragment>
            <Tooltip title="Menu" placement="top">
            <IconBotton edge='start' className={classes.forMenu} onClick={()=>{
                handleOpen();
            }}>
                <MenuIcon />
            </IconBotton>
            </Tooltip>
            <Drawer anchor="left" open={open} onClose={handleClose} >
            <div className={classes.listContainerDiv} onClick={()=>{
                handleClose();
            }}>
            <List>
             <ListItem>
                 <ListItemIcon><HomeIcon color="primary"/></ListItemIcon>
                 <ListItemText primary={"Home"}/>
            </ListItem>
            <Divider/>   
            <ListItem>
                 <ListItemIcon><NotificationIcon color="primary"/></ListItemIcon>
                 <ListItemText primary={"Notifications"}/>
            </ListItem>
            <Divider/>
            <ListItem>
                 <ListItemIcon><PostAddIcon color="primary"/></ListItemIcon>
                 <ListItemText primary={"Post"}/>
            </ListItem>
            <Divider/>   
            <ListItem>
                 <ListItemIcon><LoginIcon color="primary"/></ListItemIcon>
                 <ListItemText primary={"Login"}/>
            </ListItem>
            <Divider/>   
            <ListItem>
                 <ListItemIcon><SignUpIcon color="primary"/></ListItemIcon>
                 <ListItemText primary={"SignUp"}/>
            </ListItem>
            <Divider/>   
            <ListItem>
                 <ListItemIcon><ExitToAppIcon color="primary"/></ListItemIcon>
                 <ListItemText primary={"Logout"}/>
            </ListItem>      
            </List>
            </div>
            </Drawer>

        </Fragment>
    )
}

const mapStateToProps=(state)=>({
authenticated: state.user.authenticated,
});
const mapActionsToProps = {
    logoutUser
};


export default connect(mapStateToProps,mapActionsToProps)(AppBardrawer);
