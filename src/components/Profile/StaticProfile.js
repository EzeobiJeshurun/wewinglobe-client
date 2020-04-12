import React,{Fragment} from 'react';
import {makeStyles,} from '@material-ui/core';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/paper';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import noImg from '../../Images/no-img.jpeg';

import MuiLink from '@material-ui/core/Link';

const useStyles = makeStyles(theme=>({
    paper: {
        padding: '20px'
    },
    profile:{
        '& .image-wrapper':{
            textAlign: 'center',
            position: 'relative',
            
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
        
    },
   
}));
function StaticProfile(props) {
    const { profile: {handle, createdAt, imageUrl,bio, website, location}} = props;
    const classes = useStyles();
    return (
        <Paper className ={classes.paper} >
        <div className={classes.profile}>
                <div className='image-wrapper'>
                    <img src={imageUrl?imageUrl:noImg} alt="profile"  className="profile-image"/>
                </div>
                <hr/>
                <div className="profile-detail">
        <MuiLink   color = 'primary' variant='h5'>
            @{handle}
        </MuiLink>
           <hr/>  
           {bio && <Typography variant="body2">{bio}</Typography>} 
           <hr/>
           {location && (
               <Fragment>
               <LocationOn color='primary' /><span>{location}</span>
               <hr/>
               </Fragment>
           )} 
           {website && 
           <Fragment>
               <LinkIcon color="primary" />
               <a href={website} target="_blank" rel="noopener noreferrer">
                   {' '}{website}
               </a>
               <hr/>
           </Fragment>}
            <Fragment>
           <CalendarToday color="primary" /> {' '}
           <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
           </Fragment>
                
        </div>
       
        </div>
    </Paper>
    )
}

export default StaticProfile;
