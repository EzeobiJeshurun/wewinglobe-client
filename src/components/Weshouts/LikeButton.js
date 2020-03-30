import React from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import {Link } from 'react-router-dom';
//redux
import { connect } from 'react-redux';
import {unlikeWeshout, likeWeshout} from '../../redux/actions/dataActions';





function LikeButton(props) {
    const {weshoutId, user: {likes, authenticated}}= props;
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
        <Link to='/Login'>   
        <IconButton>
            
            <FavoriteBorder color="primary"/>
            
        </IconButton>
        </Link>
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
    
    return ForLikeButton;
}
const mapStateToProps=(state)=>({
    user: state.user,
});

const mapActionsToProp ={
    likeWeshout,
    unlikeWeshout,
};

export default connect(mapStateToProps, mapActionsToProp)(LikeButton);

