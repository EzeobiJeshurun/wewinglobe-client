import React, {Fragment} from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';
//import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
//import Favorite from '@material-ui/icons/Favorite';
import DeleteWeshout from './DeleteWeshout';
import ABOUT_A_POST from './ABOUT_A_POST';
import LikeButton from './LikeButton';
import CommentOnSimilarToAboutAPost from './CommentOnSimilarToAboutAPost';
// redux things
import {connect} from 'react-redux'; //used in connecting store state and any action "functions or classes" to prop
//import {unlikeWeshout, likeWeshout} from '../redux/actions/dataActions';


const useStyles = makeStyles(theme=>({
    card:{
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
        
         [theme.breakpoints.down('770')] : {
             flexDirection: 'column',
             //flexWrap: 'wrap'
         }
    },
    content:{
        padding: 25,
        
        
        
    },
    image: {
        minWidth: 250,
        minHeight: 250,
        objectFit: 'cover'

    },
    flexContentDiv:{
        
    }

}));

function Posts(props) {
    const {onepost:{userHandle,body,likeCount,commentCount,weshoutId,createdAt,userImage}, user: {authenticated, likes, credentials : {handle}}} = props;
    const classes = useStyles();
    dayjs.extend(relativeTime);

  
    const deleteButton= authenticated && handle === userHandle? (<Fragment>
        <DeleteWeshout weshoutId={weshoutId}/> </Fragment>
    ) : null;

        

    return (
       <Card className={classes.card}>
           <CardMedia image={userImage} title="user profile image" component={Link} to={`/users/${userHandle}`} className={classes.image} />
           <CardContent className={classes.content}>
                <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                {deleteButton}
                <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant="body1" >{body}</Typography>
                
                
                 <Hidden smUp>   
                <LikeButton weshoutId= {weshoutId}/>
        
                <span>{likeCount}likes</span>
                <CommentOnSimilarToAboutAPost postHandle={userHandle} postId={weshoutId} />
                <span>{commentCount}comment  </span>
                
                <ABOUT_A_POST postHandle={userHandle}   postId = {weshoutId} />
                </Hidden>
                <Hidden xsDown> 
                <CardActions> 
               <div> <LikeButton weshoutId= {weshoutId}/>
        
                <span>{likeCount}likes</span>
                <CommentOnSimilarToAboutAPost postHandle={userHandle} postId={weshoutId} />
                <span>{commentCount}comment  </span>
                </div>
                
                <ABOUT_A_POST postHandle={userHandle}   postId = {weshoutId} />
                </CardActions> 
                </Hidden>
                
                
            
           </CardContent>
       </Card>
    )
}

const mapStateToProps= (state)=>({
    user : state.user,
})

const mapActionsToProp = {
   // likeWeshout,
   // unlikeWeshout,
};
export default connect(mapStateToProps,mapActionsToProp)(Posts);
