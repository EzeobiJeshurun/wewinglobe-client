import React from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import {Link } from 'react-router-dom';
//redux
import { connect } from 'react-redux';
import {unlikeWeshout, likeWeshout} from '../redux/actions/dataActions';





function LikeButton() {
    let ForLikeButton = !authenticated? ( 
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
    
    return ForLikeButton;
}
const mapStateToProps=(state)=>({

});

const mapActionsToProp ={

};

export default connect(mapStateToProps, mapActionsToProp)(LikeButton);

