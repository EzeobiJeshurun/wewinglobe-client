import React, {Fragment, useState} from 'react';
import IconBotton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';
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
import { logoutUser,openNotifFromMenu,openPostFromMenu} from '../../redux/actions/userActions';


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
    forAddingPost:{
        visibility: 'hidden',
        size:'0px',
    },
    forNotifications: {
        visibility: 'hidden',
    }
}));

function AppBardrawer(props) {
    const {authenticated} = props;
    const LogoutFunction = props.logoutUser;

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleOpen= ()=>{
        setOpen(true);
    };
    const handleClose =()=>{
        setOpen(false);
    };
    const clickAddPost = props.openPostFromMenu;
    const clickNotifications = props.openNotifFromMenu;

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
             <ListItem component={Link} to={'/'}>
                 <ListItemIcon><HomeIcon color="primary"/></ListItemIcon>
                 <ListItemText primary={"Home"}/>
            </ListItem>
              
            {authenticated && (<Fragment><Divider/><ListItem onClick={()=>{
                clickNotifications();
            }}>
                 <ListItemIcon><NotificationIcon color="primary"/></ListItemIcon>
                 <ListItemText primary={"Notifications"}/>
            </ListItem></Fragment>) }
            

            {authenticated &&(<Fragment><Divider/><ListItem onClick={()=>{
                clickAddPost();
            }}>
                 <ListItemIcon><PostAddIcon color="primary"/></ListItemIcon>
                 <ListItemText primary={"Post"}/>
            </ListItem></Fragment>)}
              
            {!authenticated &&(<Fragment><Divider/> <ListItem component={Link} to={'/Login'}>
                 <ListItemIcon><LoginIcon color="primary"/></ListItemIcon>
                 <ListItemText primary={"Login"}/>
            </ListItem></Fragment>)}
               
            { !authenticated &&(<Fragment><Divider/><ListItem component={Link} to={'/Signup'}>
                 <ListItemIcon><SignUpIcon color="primary"/></ListItemIcon>
                 <ListItemText primary={"SignUp"}/>
            </ListItem></Fragment>) }
              
           { authenticated &&(<Fragment> <Divider/> <ListItem onClick={LogoutFunction}>
                 <ListItemIcon><ExitToAppIcon color="primary"/></ListItemIcon>
                 <ListItemText primary={"Logout"}/>
           </ListItem> </Fragment>) }    
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
    logoutUser,
    openPostFromMenu,
    openNotifFromMenu,
};


export default connect(mapStateToProps,mapActionsToProps)(AppBardrawer);
