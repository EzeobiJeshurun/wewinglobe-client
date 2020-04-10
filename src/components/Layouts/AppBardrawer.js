import React, {Fragment, useState} from 'react';
import IconBotton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {makeStyles} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PostAddIcon from '@material-ui/icons/PostAdd';
import HomeIcome from '@material-ui/icons/Home';
import NotificationIcon from '@material-ui/icons/Notifications';
import LoginIcon from '@material-ui/icons/Input';
import SignUpIcon from '@material-ui/icons/HowToReg';


const useStyles = makeStyles(theme=>({

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
            <IconBotton onClick={()=>{
                handleOpen()
            }}>
                <MenuIcon />
            </IconBotton>
            </Tooltip>
            <Drawer anchor={left} open={open} onClose={handleClose}>

            </Drawer>

        </Fragment>
    )
}

export default AppBardrawer
