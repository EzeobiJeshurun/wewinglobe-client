import React from 'react';
import {makeStyles} from '@material-ui/core';
import NoImg from '../Images/no-img.jpeg';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Paper from '@material-ui/core/Paper';

import LocationOn from '@material-ui/icons/LocationOn'



const useStyles = makeStyles(theme=>({
    handle:{
        height: 20,
        backgroundColor: theme.palette.primary.main,
        width:60,
        margin: '0 auto 7px auto',
    },
    paper: {
        padding: '20px'
    },
    profile:{
        '& .image-wrapper':{
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'

            }
        },
        '& .profile-image': {
            width: '200px',
            height: '200px',
            objectFit: 'cover',
            maxWidth:  '100%',
            borderRadius: '50%'
        },
        '& .profile-details':{
            textAlign: 'center',
            '& span, svg':{
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr':{
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '& hover':{
                cursor: 'pointer'
            }
        }
    },
    buttons:{
        textAlign: 'center',
        '& a':{
            margin: '20px 10px'
        }
    },
    fullLine:{
        height: 15,
        width: '100%',
        marginBottom: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',

    },
    halfLine: {
        height: 15,
        width: '50%',
        marginBottom: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
    }
}));


function ProfileSkeleton() {
    const classes = useStyles();
    return (
       <Paper className={classes.paper}>
           <div className={classes.profile}>
               <div className="image-wrapper">
                   <img src={NoImg} alt="dummy" className="profile-image"/>
               </div>
               <hr/>
               <div className="profile-details">
                   <div className={classes.handle}></div>
                   <hr/>
                   <div className={classes.fullLine}></div>
                   <div className={classes.fullLine}></div>
                   <hr/>
                   <LocationOn color="primary"/><span>Location</span>
                   <hr/>
                   <LinkIcon color="primary" />https: website.com
                   <hr/>
                   <CalendarToday color="primary" /> Joined date
               </div>

           </div>

       </Paper>
    )
}

export default ProfileSkeleton;
