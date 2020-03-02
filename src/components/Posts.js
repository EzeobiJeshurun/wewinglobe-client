import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


const useStyles = makeStyles(theme=>({
    card:{
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

function Posts({onepost:{userHandle,body,likeCount,commentCount,weshoutId,createdAt,userImage}}) {
    const classes = useStyles();
    dayjs.extend(relativeTime);
    return (
       <Card className={classes.card}>
           <CardMedia image={userImage} title="user profile image" className={classes.image} />
           <CardContent className={classes.content}>
                <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant="body1" >{body}</Typography>
           </CardContent>
       </Card>
    )
}

export default Posts
