import React, {Fragment} from 'react';

import {connect} from 'react-redux';
import {Link } from 'react-router-dom';
import dayjs from 'dayjs';
import {logoutUser, uploadImage} from '../../redux/actions/userActions';
import Editdetails from './Editdetails';
//Material UI 
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

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
    },
    notAuthBotton:{
        
    },
    notAuthTypo:{
        
        fontSize: '14px'
    }
}));

function Profile(props){
    const handleLogout =()=>{
        props.logoutUser();
    };
    const handleImageChange=(event)=>{
        const image = event.target.files[0];
        //send our image to the server
        const formData = new FormData();
        formData.append('image', image, image.name);
        props.uploadImage(formData);

    };
    const handleEditPicture=()=>{
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };
    const classes = useStyles();
    const {user :{ credentials: {handle, createdAt, imageUrl,bio, website, location}, loading , authenticated}} = props;

    let profileMarkup = !loading? (authenticated ?(
            <Paper className ={classes.paper} >
                <div className={classes.profile}>
                        <div className='image-wrapper'>
                            <img src={imageUrl} alt="profile"  className="profile-image"/>
                            <input type="file" id='imageInput'  hidden="hidden" onChange={(event)=>{
                                handleImageChange(event);
                            }}/>
                            <Tooltip title="Edit profile Image" placement="top">
                            <IconButton onClick={()=>{
                                handleEditPicture();

                             }}  className="button">
                                 <EditIcon color="primary"/>
                            </IconButton>
                            </Tooltip>
                            
                        </div>
                        <hr/>
                        <div className="profile-detail">
                <MuiLink component={Link} to={`/user/${handle}`} color = 'primary' variant='h5'>
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
                <Tooltip title="logout" placement="top">
                    <IconButton onClick={()=>{
                        handleLogout();
                    }}>
                        <KeyboardReturn />
                    </IconButton>
                </Tooltip>
                <Editdetails/>
                </div>
            </Paper>
        ):(<Paper className={classes.paper}>
            <Typography variant='body2' className={classes.notAuthTypo} align="center">Login to view profile</Typography>
            <div className={classes.buttons}>
                <Button color="primary" variant="outlined" className={classes.notAuthBotton} component ={Link} to='/login'>
                    Login
                </Button>
                <Button color="primary" variant="contained" className={classes.notAuthBotton} component ={Link} to='/signup'>
                    Signup
                </Button>
            </div>
        </Paper>
    )): (<p>loading</p>)
    

    return profileMarkup;
    
    
};

const mapStateToProps=(state)=>({
    user : state.user
});
const mapActionsToProps= {

    logoutUser,
    uploadImage
};

//Profile.propTypes = {
  //  user: PropTypes.object.isRequired,
   // classes: PropTypes.object.isRequired
//};
//
export default  connect(mapStateToProps,mapActionsToProps)(Profile);
