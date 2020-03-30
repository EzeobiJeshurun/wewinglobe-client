import React,{useMemo,useState, Fragment} from 'react';
import {makeStyles} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
//redux
import {connect} from 'react-redux';
//submit function
import {createComment} from '../../redux/actions/dataActions';

const Styles = makeStyles(theme =>({
    parentItemGrid: {
        textAlign: 'center',
    },
    textField: {

    },
    button: {

    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20,
    },

}));

function FormForComment(props) {
const {weshoutId, data: {commentErrors}, authenticated} = props;   

const [body, setBody] = useState("");
const [newerror, setNewerror] = useState({error: ""});
const handleFormSubmit = (event)=>{
    event.preventDefault();
    const commentData = {
        body: body,
    };
    props.createComment(weshoutId,commentData);
};

const controlErrors = useMemo(()=>{
    setNewerror(commentErrors);
},[commentErrors]);

    const classes = Styles();

    const commentFormMarkUp = authenticated? (<Fragment>
        
        <Grid item sm={12} className={classes.parentItemGrid}>
        <form onSubmit={(event)=>{

        }}  >
            <TextField className={classes.textField} name="body" type="text" label="Comment on post"  onFocus={()=>{
                setNewerror({error: ""});
            }}
            multiline rows={3} value={body}
             onChange={(event)=>{
                 setBody(event.target.value);
             }}  error= {newerror.error? true: false} helperText={newerror.error} fullWidth>


            </TextField>
            <Button type="submit" className={classes.button} variant="contained" color="primary">
             Post
            </Button>
        </form> 
        <hr className={classes.visibleSeparator} />   
        </Grid>

    </Fragment>):null;
    return commentFormMarkUp;
}

const mapStateToProps =(state)=>({
    data : state.data,
    authenticated: state.user.authenticated,
});
const mapActionsToProp = {
    createComment
}
export default connect(mapStateToProps, mapActionsToProp)(FormForComment);
