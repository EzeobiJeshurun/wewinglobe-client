import React, {Fragment, useState, useMemo} from 'react';
import{Link } from  'react-router-dom';
import dayjs from 'dayjs';
import {makeStyles} from '@material-ui/core';
//material UI
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//material icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
//redux 
import {connect } from 'react-redux';
//action functions
import {getOnePost} from '../redux/actions/dataActions';


const Styles = makeStyles(theme=>({
    invinsibleSeparator:{
        border: 'none',
        margin: 4,
    },

}));

function ABOUT_A_POST(props) {
    const {postId, postHandle, 
        UI: {loading}, 
        data :{singlePost:{createdAt, weshoutId, likeCount, commentCount,userImage,userHandle, body }} }= props;
const classes = Styles();

const [open, setOpen] = useState(false);
const handleOpen=()=>{
 setOpen(true);
 props.getOnePost(postId);
};

const handleClose=()=>{
    setOpen(false);
};

const dialogMarkUp = loading ? ( <CircularProgress size={200}></CircularProgress>):(
<Grid container spacing={4} >
    <Grid item sm={5}>
        <img src={userImage} alt="profile" className={classes.profileImage}/>

    </Grid>
    <Grid item sm={7}>
        <Typography component={Link} to={`/users/${userHandle}`} color="primary" variant="h6" >
        @{userHandle}
        </Typography>
        <hr className={classes.invinsibleSeparator} />
        <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={classes.invinsibleSeparator} />
        

    </Grid>

</Grid>
);
    return (
        <Fragment>
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
            <Tooltip title="close" placement="top">
            <IconButton onClick={()=>{
                handleClose();
            } } className={classes.closeButton} >
                <CloseIcon color="primary" />
            </IconButton> 
            </Tooltip>
            <DialogContent className={classes.dialogContent}>
            {dialogMarkUp}
            </DialogContent>

            </Dialog>

        </Fragment>
    )
}
const mapStateToProps = (state)=>({
UI: state.UI,
data: state.data,
});

const mapActionsToProp= {
  getOnePost,
};

export default connect(mapStateToProps, mapActionsToProp)(ABOUT_A_POST);
