import React,{useState,Fragment,useMemo,useCallback} from 'react';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
// material ui icons

import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
//redux
import {connect} from 'react-redux';
import {CLOSE_NOTIFICATIONS_FROM_MENU} from '../../redux/types'; 
import {markNotificationsRead} from '../../redux/actions/dataActions';
import store from '../../redux/store';
const useStyles = makeStyles(theme=>({
    notifButton:{
        color: theme.palette.myextra.light,
    },
    menuClass:{
        borderColor: 'rgba(0,0,0,0.2)',
    }
}));


function Notifications(props) {

const classes= useStyles();    
const {notifications,openingNotificationsFromMenu,}= props;
const [newNotifNumber, setNewNotifNumber] = useState("");
const [anchorEl, setAnchorEl] = useState(null);
const FunctionToSendMarkRead = props.markNotificationsRead;
const handleOpen=(event)=>{
    setAnchorEl(event.target);
};
const handleClose =()=>{
    setAnchorEl(null);
};
const FuctionToTriggerNotificationsFromMenu = useMemo(()=>{
    if(openingNotificationsFromMenu){
        document.getElementById('notif').click();
        store.dispatch({type: CLOSE_NOTIFICATIONS_FROM_MENU});
    }
    

},[openingNotificationsFromMenu]);

const onMenuOpened =useCallback( ()=>{
let unreadNotifications = notifications.filter(not=> not.read === false );

let arrayOfNotificationId =   unreadNotifications.map(not=> not.notificationId );
FunctionToSendMarkRead(arrayOfNotificationId);

 

},[notifications,FunctionToSendMarkRead]);

let notificationIcon;


let notificationAutoControl = useMemo(()=>{
    const numberOfNotifications =  notifications.filter(not => not.read === false).length;
    if(numberOfNotifications < 0){
        setNewNotifNumber("");
    }else{
        setNewNotifNumber(numberOfNotifications);
    }
},[notifications]);

if(notifications && notifications.length>0){

    //let NotificationsCount =  notifications.filter(not => not.read === false).length;
   newNotifNumber > 0 ? notificationIcon = (<Badge badgeContent={newNotifNumber} color="secondary">
       <NotificationsIcon className={classes.notifButton}/>
   </Badge>):notificationIcon =<NotificationsIcon className={classes.notifButton}/>;
  
}else{
    notificationIcon = <NotificationsIcon className={classes.notifButton}/>
}
    dayjs.extend(relativeTime);

    let notificationsMarkUp = notifications && notifications.length > 0? (
        notifications.map((not) =>{
            const verb = not.type === 'like'? 'liked': 'commented on';
            const time = dayjs(not.createdAt).fromNow();
            const iconColor= not.read? 'primary': 'secondary';
            const icon = not.type === 'like'? 
            (<FavoriteIcon color={iconColor} style={{marginRight:10}}/>):(<ChatIcon color={iconColor} style={{marginRight:10}}/>)

            return (
                <MenuItem onClick={()=>{
                    handleClose();
                }}   key={not.createdAt} className={classes.menuClass}  > 
                {icon}
                <Typography component={Link} 
                variant="body2" to={`/users/${not.recipient}/weshout/${not.weshoutId}`}>
                    {not.sender} {verb} your post {time} 
                </Typography>

                </MenuItem> 
            )
           
            
        })
    ):(
        <MenuItem  onClick={()=>{
            handleClose();
        }} >
            No new notifications
        </MenuItem>
    )
    return (
        <Fragment>
            <Tooltip title="notifications" placement="top">
            <IconButton id="notif" aria-owns={anchorEl? 'simple-menu': undefined} aria-haspopup="true"
            onClick={(event)=>{
                handleOpen(event)
            }}       >
                {notificationIcon}
            </IconButton  >
            </Tooltip>
            <Menu anchorEl={anchorEl}  open={Boolean(anchorEl)} onClose={()=>{
                handleClose();
            }} onEntered={()=>{
                setNewNotifNumber("");
                onMenuOpened();
            }}  elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }} 
           >
                {notificationsMarkUp}
            </Menu>
        </Fragment>
    )
}

const mapStateToProps= (state) =>({
notifications : state.user.notifications,
openingNotificationsFromMenu: state.user.openingNotificationsFromMenu,
});

const mapActionsToProps = {
markNotificationsRead
};

export default connect(mapStateToProps, mapActionsToProps)(Notifications);
