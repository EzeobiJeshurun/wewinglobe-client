import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import IconButton from '@material-ui/core/IconButton';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import {connect} from 'react-redux';
import {deleteWeshout} from '../redux/actions/dataActions';

function DeleteWeshout(props) {
    const { weshoutId} = props;
    return (
        <IconButton>
            <DeleteOutline color="primary"/>
        </IconButton>
    )
}

const mapStateToProps =(state)=>({

});
const mapActionsToProp = {

};

export default connect(mapStateToProps, mapActionsToProp)(DeleteWeshout);
