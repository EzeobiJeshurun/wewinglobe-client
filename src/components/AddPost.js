import React, { Fragment, useState} from 'react';
import {makeStyles} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';

import IconButton from '@material-ui/core/IconButton';

import {connect} from 'react-redux';
import {postWeshout} from '../redux/actions/dataActions';

function AddPost() {
    return (
        <div>
            
        </div>
    )
}
const mapStateToProps =(state)=>({
    UI: state.UI
});

const mapActionsToProps = {
    postWeshout
};

export default connect(mapStateToProps, mapActionsToProps)(AddPost);


