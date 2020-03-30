import React,{ Fragment} from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import {makeStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Styles = makeStyles(theme =>({
    commentImage: {
        maxWidth: 50,
        maxHeight: 50,
        objectFit: 'cover',
        borderRadius: '50%',
    },
    commentData:{
        marginLeft: 2,
    },
    invinsibleSeparator:{
        border: 'none',
        margin: 4,
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20,
    },

}));

function Comment(props) {
    const classes = Styles();
    const {comments} = props;
    return (
        <Fragment>
            <Grid container>
            {comments.map((comment, index)=>{
                const {userHandle, body, userImage, createdAt}=comment;
                return (
                    <Fragment key={createdAt}>
                        <Grid item sm = {12}>
                        <Grid container>
                         <Grid item sm={2} xs={2}>
                             <img src={userImage} alt='comment' className={classes.commentImage}/>
                        </Grid>
                        <Grid item sm={9} xs={9}>
                            <div className={classes.commentData}>
                            <Typography variant="h6" comment={Link} to={`/users/${userHandle}`} color="primary">
                            {userHandle}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format(`h:mm a, MMMM DD YYYY`)}
                            </Typography>
                            <hr className={classes.invisibleSeparator} />
                            <Typography variant="body2">
                                {body}
                            </Typography>
                            </div>
                        </Grid>  
                        </Grid>  
                        </Grid>
                       {index !== comments.length - 1 && (<hr className={classes.visibleSeparator} />)} 
                    </Fragment>
                )
            })}
            </Grid>
        </Fragment>
    )
}

export default Comment;
