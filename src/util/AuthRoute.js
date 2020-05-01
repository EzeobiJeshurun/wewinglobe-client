import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

function AuthRoute({component: Component, authenticated, ...rest}) {
    
    return (
        <Route 
        {...rest} render={(props)=> authenticated === true ? <Redirect to='/home'/> : <Component {...props}/> } />
    )
}

const mapStateToProps=(state)=>({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(AuthRoute);
