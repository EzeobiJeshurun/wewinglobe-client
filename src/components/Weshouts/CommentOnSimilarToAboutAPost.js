
import React, {Fragment, useState, useCallback} from 'react';
import{Link } from  'react-router-dom';
import dayjs from 'dayjs';
import {makeStyles} from '@material-ui/core';
//material UI
import Tooltip from '@material-ui/core/Tooltip';
import ChatIcon from '@material-ui/icons/Chat';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DialogTitle from '@material-ui/core/DialogTitle';

import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//material icons
import CloseIcon from '@material-ui/icons/Close';


//redux 
import {connect } from 'react-redux';
//action functions
import {getOnePost} from '../../redux/actions/dataActions';
//...
import LikeButton from './LikeButton';
import Comment from './Comment';
import FormForComment from './FormForComment';


const Styles = makeStyles(theme=>({
    invinsibleSeparator:{
        border: 'none',
        margin: 4,
    },
    profileImage: {
        maxWidth: '100%',
        maxHeight: 200,
        borderRadius: '50%',
        objectFit: 'cover',
    },
    dialogContent: {
        padding: 20,
        width: '100%'
    },
    closeButton:{
        position: 'absolute',
        left: '90%',
        [theme.breakpoints.down('xs')]:{
            left: '80%',
        },
    },
    showButton: {
      //  position: 'absolute',
      //  left: '85%',
    
    },
    spinnerDiv:{
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50,
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20,
    },
    accountCircle:{
        size: '30px',
    },
    contentDiv: {
        width: '100%'
    }

}));
const CommentOnSimilarToAboutAPost=React.memo((props)=>{
    const {postId, postHandle, authenticated,
        UI: {loading}, 
        data :{singlePost:{createdAt, weshoutId, likeCount, commentCount,userImage,userHandle, body, comments }} }= props;
const classes = Styles();

const [open, setOpen] = useState(false);
const [oldPath,setOldPath] = useState("");
const getOnePostFunction = props.getOnePost;
//fuction to ensure things work on windows and IOS
const controlUrlDisplay =(path)=>{
 const pathToShow = window.history? window.history.pushState(null,null, path):this.history.pushState(null,null, path);
 return pathToShow;
};

const handleOpen=useCallback(()=>{
 let oldWindowsPath = window.location.pathname? window.location.pathname :  Location.pathname;
 console.log(Location.pathname);
    setOldPath(oldWindowsPath);
 //how to make the url display different routes for different posts

 const newPath = `/users/${postHandle}/weshout/${postId}`;
 if(oldWindowsPath === newPath){
    setOldPath(`/users/${postHandle}`);
 }
 //window.history.pushState(null,null, newPath);
 controlUrlDisplay(newPath);
 setOpen(true);
 getOnePostFunction(postId);
},[getOnePostFunction,postId,postHandle]);
const handleClose=()=>{
    setOpen(false);
    //window.history.pushState(null,null, oldPath)
    controlUrlDisplay(oldPath);
};

const dialogMarkUp = loading ? ( <div className={classes.spinnerDiv}><CircularProgress thickness={2} size={200}/></div>):(
<Grid container spacing={4} justify="center">
    <Grid item sm={5} xs={12}>
        <img src={userImage} alt="profile" className={classes.profileImage}/>

    </Grid>
    <Grid item sm={7} xs={12} className={classes.contentDiv}>
        <Tooltip title= "view profile" placement="top" >
        <IconButton component={Link} to={`/users/${postHandle}`} >
            <AccountCircle className={classes.accountCircle} color="action"/>
        </IconButton>
        </Tooltip>
        <Typography component={Link} to={`/users/${postHandle}`} color="primary" variant="h6" >
        @{userHandle} 
        </Typography>
        <hr className={classes.invinsibleSeparator} />
        <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={classes.invinsibleSeparator} />
        <Typography variant="body1">
            {body}
        </Typography>

        <LikeButton weshoutId={postId}/>
        <span>{likeCount}likes</span>
        <Tooltip title="comment" placement="top">
                    <IconButton>
                        <ChatIcon color="primary"/>
                    </IconButton>
                </Tooltip>
                <span>{commentCount}comment</span>
    </Grid>
    <hr className={classes.visibleSeparator} />
    <FormForComment weshoutId={weshoutId}/>
   {comments &&<Comment comments= {comments}/>}

</Grid>
);
    return (
        <Fragment>
           {authenticated?(<Tooltip title="comment" placement="top">
            <IconButton onClick={()=>{
                handleOpen();
            } } className={classes.showButton} >
                <ChatIcon color="primary"/>
            </IconButton> 
            </Tooltip>):(<Tooltip title="comment" placement="top">
            <IconButton component={Link} to={'/'} className={classes.showButton} >
                <ChatIcon color="primary"/>
            </IconButton> 
            </Tooltip>)}
            <Dialog open={open} onClose={()=>{
                handleClose();
            }} fullWidth maxWidth="sm">
            <DialogTitle>
            <IconButton aria-label="close" onClick={()=>{
                handleClose();
            } } className={classes.closeButton} >
                <CloseIcon color="primary" />
            </IconButton>
            </DialogTitle> 
        
            <DialogContent className={classes.dialogContent}>
            {dialogMarkUp}
            </DialogContent>

            </Dialog>

        </Fragment>
    )
});
const mapStateToProps = (state)=>({
UI: state.UI,
data: state.data,
authenticated: state.user.authenticated,
});

const mapActionsToProp= {
  getOnePost,
};

export default connect(mapStateToProps, mapActionsToProp)(CommentOnSimilarToAboutAPost);
