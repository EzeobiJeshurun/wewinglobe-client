import React,{ Fragment,useMemo} from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import {makeStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Styles = makeStyles(theme =>({
    mainGrid:{
        margin: 3,
        width: '100%',
    },
    commentImage: {
        maxWidth: '100%',
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
        marginBottom: 15,
    },
    breakLine: {
        marginBottom: 0,
        color: '#fa2345',
    },
    commentBody: {
        overflowWrap: 'break-word',
    },

}));

function Comment(props){
    const classes = Styles();
    const {comments} = props;
    return (
        <Fragment>
            <Grid container>
            {comments.map((comment, index)=>{
                const {userHandle, body, userImage, createdAt}=comment;
                return (
                    <Fragment key={createdAt}>
                        <Grid className={classes.mainGrid} item sm = {12}>
                        <Grid container spacing={2} justify="space-evenly">
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
                            {/*<hr className={classes.invisibleSeparator} />*/}
                            
                            <Typography variant="body2" className={classes.commentBody} >
                                {body}
                            </Typography>
                            </div>
                        </Grid>  
                        </Grid>
                        {index !== comments.length - 1 && (<hr className={classes.visibleSeparator} />)}   
                        </Grid>
                      
                    </Fragment>
                )
            })}
            </Grid>
        </Fragment>
    )
};

export default Comment;
