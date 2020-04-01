import React from 'react';
import {makeStyles} from '@material-ui/core';
import dayjs from 'dayjs';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/paper';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme=>({
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
    }
}));
function StaticProfile() {
    
    const classes = useStyles();
    return (
        <div>
            
        </div>
    )
}

export default StaticProfile
