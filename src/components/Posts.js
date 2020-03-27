import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import DeleteWeshout from './DeleteWeshout';
import ABOUT_A_POST from './ABOUT_A_POST';
// redux things
import {connect} from 'react-redux'; //used in connecting store state and any action "functions or classes" to prop
import {unlikeWeshout, likeWeshout} from '../redux/actions/dataActions';


const useStyles = makeStyles(theme=>({
    card:{
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
        
         [theme.breakpoints.down('xs')] : {
             flexDirection: 'column',
             //flexWrap: 'wrap'
         }
    },
    content:{
        padding: 25,
        
    },
    image: {
        minWidth: 300,
        minHeight: 300,
        //objectFit: "cover"

    }

}));

function Posts(props) {
    const {onepost:{userHandle,body,likeCount,commentCount,weshoutId,createdAt,userImage}, user: {authenticated, likes, credentials : {handle}}} = props;
    const classes = useStyles();
    dayjs.extend(relativeTime);

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

    let likeButton = !authenticated? ( 
    <Tooltip title="like" placement="top">
    <IconButton>
        <Link to='/Login'>
        <FavoriteBorder color="primary"/>
        </Link>
    </IconButton>
   </Tooltip>):(likeCheck() ?( //begining of if the user is authenticad
   <Tooltip title="Undo like" placement="top">
    <IconButton onClick={()=>{ implementUnlike()}}>
        <Favorite color="primary"/>
    </IconButton>
   </Tooltip>):(<Tooltip title="like" placement="top">
    <IconButton onClick={()=>{ implementLike()}}>
        <FavoriteBorder color="primary"/>
    </IconButton>
   </Tooltip>));

    const deleteButton= authenticated && handle === userHandle? (
    <Tooltip title="delete post" placement="top"> 
        <DeleteWeshout weshoutId={weshoutId}/>
    </Tooltip>) : null;
    return (
       <Card className={classes.card}>
           <CardMedia image={userImage} title="user profile image" className={classes.image} />
           <CardContent className={classes.content}>
                <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                {deleteButton}
                <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant="body1" >{body}</Typography>
                {likeButton} 
                <span>{likeCount}likes</span>
                <Tooltip title="comment" placement="top">
                    <IconButton>
                        <ChatIcon color="primary"/>
                    </IconButton>
                </Tooltip>
                <span>{commentCount}comment</span>
                <ABOUT_A_POST postHandle={userHandle} postId = {weshoutId}/>
           </CardContent>
       </Card>
    )
}

const mapStateToProps= (state)=>({
    user : state.user,
})

const mapActionsToProp = {
    likeWeshout,
    unlikeWeshout,
};
export default connect(mapStateToProps,mapActionsToProp)(Posts);
