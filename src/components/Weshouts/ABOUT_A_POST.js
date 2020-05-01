import React, {Fragment, useState, useCallback} from 'react';
import{Link } from  'react-router-dom';
import dayjs from 'dayjs';
import {makeStyles} from '@material-ui/core';
//material UI
import Tooltip from '@material-ui/core/Tooltip';

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
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
//redux 
import {connect } from 'react-redux';
//action functions
import {getOnePost,unlikeWeshout, likeWeshout} from '../../redux/actions/dataActions';
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
            left: '70%',
        },
    },
    showButton: {
    
        position: 'relative',
        paddingLeft: '5',
        
        [theme.breakpoints.down('xs')]:{
            left: '88%',
           // top: '83%',
            bottom: '25px',
            position: 'absolute',
            paddingLeft: '0',
        },
        [theme.breakpoints.between('700','770')]:{
            left: '88%',
            //top: '80%',
            bottom: '25px',
            position: 'absolute',
            paddingLeft: '0',
        },
        // [theme.breakpoints.between('770','900')]:{
            //left: '88%',
            //top: '80%',
            //bottom: '25px',
           // position: 'absolute',
           // paddingLeft: '0',
       // }

        
        
        
        
    
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
    },
    likeBut: {
        [theme.breakpoints.between('700','1000')]:{
            paddingLeft: '0px',
        },
        
    }


}));

const ABOUT_A_POST= React.memo((props) =>{
    const {postId, postHandle,
        user: {likes, authenticated },
        UI: {loading}, 
        data :{singlePost:{createdAt, weshoutId, likeCount, commentCount,userImage,userHandle, body, comments }} }= props;
const classes = Styles();

const [open, setOpen] = useState(false);
const [oldPath,setOldPath] = useState("");
const controlUrlDisplay =(path)=>{
    const pathToShow = window.history? window.history.pushState(null,null, path):this.history.pushState(null,null, path);
    return pathToShow;
   };


const getOnePostFunction = props.getOnePost;
const handleOpen=useCallback(()=>{
 let oldWindowsPath = window.location.pathname?window.location.pathname: Location.pathname;
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
//To handle like 
let  likeCheck =()=>{
    if(likes && likes.find(like => like.weshoutId === weshoutId)){
        return true;
    }else{
        return false;
    }
    };

let implementLike =()=>{
    props.likeWeshout(weshoutId);
}; 
let implementUnlike =()=>{
    props.unlikeWeshout(weshoutId);
};
let ForLikeButton = likeCheck() ?(<Fragment> {/*/begining of if the user is authenticad*/}
   <Tooltip title="Undo like" placement="top">
    <IconButton className={classes.likeBut} onClick={()=>{ implementUnlike()}}>
        <Favorite className={classes.likeBut} color="primary"/>
    </IconButton>
   </Tooltip> </Fragment>):(<Fragment><Tooltip title="like" placement="top">
    <IconButton className={classes.likeBut} onClick={()=>{ implementLike()}}>
        <FavoriteBorder className={classes.likeBut} color="primary"/>
    </IconButton>
   </Tooltip> </Fragment>);


//end of Handling like
const handleClose=()=>{
    setOpen(false);
   // window.history.pushState(null,null, oldPath);
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
        {/* I made the button bellow unclickable with pointerEvents:none , I need to make it work*/}
        
        {/*<LikeButton clatssName={classes.preventClickToLike} weshoutId={postId}/>*/}
        {ForLikeButton}
    
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
   {comments && <Comment comments= {comments}/>}

</Grid>
);
    return (
        <Fragment >
             <div className={classes.ocuppyAllSpace}>
            <Tooltip title="view post" placement="top">
            <IconButton onClick={()=>{
                handleOpen();
            } } className={classes.showButton} >
                <UnfoldMore color="primary" />
            </IconButton> 
            </Tooltip>
            <Dialog open={open} onClose={()=>{
                handleClose();
            }} fullWidth maxWidth="sm">
            <DialogTitle>   
            
            <IconButton aria-label="close" onClick={()=>{
                handleClose();
            } } className={classes.closeButton}  color="secondary">
                <CloseIcon color="secondary" />
            </IconButton>
            </DialogTitle> 
            
            <DialogContent className={classes.dialogContent}>
            {dialogMarkUp}
            
            </DialogContent>

            </Dialog>
            </div>
        </Fragment>
    )
});
const mapStateToProps = (state)=>({
UI: state.UI,
data: state.data,
user: state.user
});

const mapActionsToProp= {
  getOnePost,
  unlikeWeshout, 
  likeWeshout
};

export default connect(mapStateToProps, mapActionsToProp)(ABOUT_A_POST);
