import React from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import {Link } from 'react-router-dom';
import {makeStyles} from '@material-ui/core';
//redux
import { connect } from 'react-redux';
import {unlikeWeshout, likeWeshout} from '../../redux/actions/dataActions';

const useStyles = makeStyles(theme=>({
    likeBut: {
        [theme.breakpoints.between('700','1000')]:{
            paddingLeft: '0px',
        },
        
    }
}));



const LikeButton=React.memo((props)=> {
    const {weshoutId, user: {likes, authenticated}}= props;
    const classes= useStyles();
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
    
    let ForLikeButton = !authenticated? ( 
        <Tooltip title="like" placement="top">
        <Link to='/'>   
        <IconButton className={classes.likeBut}>
            
            <FavoriteBorder className={classes.likeBut} color="primary"/>
            
        </IconButton>
        </Link>
       </Tooltip>):(likeCheck() ?( //begining of if the user is authenticad
       <Tooltip title="Undo like" placement="top">
        <IconButton className={classes.likeBut} onClick={()=>{ implementUnlike()}}>
            <Favorite className={classes.likeBut} color="primary"/>
        </IconButton>
       </Tooltip>):(<Tooltip title="like" placement="top">
        <IconButton className={classes.likeBut} onClick={()=>{ implementLike()}}>
            <FavoriteBorder className={classes.likeBut} color="primary"/>
        </IconButton>
       </Tooltip>));
    
    return ForLikeButton;
});
const mapStateToProps=(state)=>({
    user: state.user,
});

const mapActionsToProp ={
    likeWeshout,
    unlikeWeshout,
};

export default connect(mapStateToProps, mapActionsToProp)(LikeButton);

