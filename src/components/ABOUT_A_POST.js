import React, {Fragment} from 'react';
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
//redux 
import {connect } from 'react-redux';
//action functions
import {getOnePost} from '../redux/actions/dataActions';


const Styles = makeStyles(theme=>({

}));

function ABOUT_A_POST(props) {
    const {weshoutId, userHandle, UI: {loading} }= props;
const classes = Styles();

    return (
        <div>
            
        </div>
    )
}
const mapStateToProps = (state)=>({
UI: state.UI,
data: state.data
});

const mapActionsToProp= {
  getOnePost,
};

export default connect(mapStateToProps, mapActionsToProp)(ABOUT_A_POST);
