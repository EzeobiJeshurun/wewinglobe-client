import React, {useState} from  'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//authentication control import
import AuthRoute from './util/AuthRoute';

import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
//pages 
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ChangePassword from './pages/ChangePassword';
//components
import Navbar from './components/Navbar';
import jwtDecode from 'jwt-decode';
import { typography } from '@material-ui/system';
//Redux 
import {Provider} from 'react-redux';
import store from './redux/store';

const theme1 = createMuiTheme({
  palette:{
      primary:{
          light: '#ed4b82' ,
          main: '#e91e63',
          dark: '#a31545',
          contrastText: '#fff'
      },
      secondary:{
          light: '#fff179',
          main: '#ffee58',
          dark: '#b2a63d',
          contrastText: '#000'
      }
  },
  typography: {
    useNextVariants: true
  }
  });

  const theme2 = createMuiTheme({
    palette:{
        primary:{
            light: '#9b9245',
            main: '#827717',
            dark: '#5b5310',
            contrastText: '#fff'
    },
        secondary:{
            light: '#f73378' ,
            main : '#f50057',
            dark : '#ab003c',
            contrastText: '#fff'
    }
},

  typography: {
    useNextVariants: true
  }
});

//Checkes if user is logged in.
let authenticated;
const token = localStorage.getItem('FBIdToken');
console.log(`this is the token ${token}`);
if(token){
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);

  if(decodedToken.exp * 1000 < Date.now()){
    //window.location.href = '/login';
    authenticated = false;
  }else{
    authenticated = true;
  }
}


function App() {
  let authenticated;
const token = localStorage.getItem('FBIdToken');
console.log(`this is the token ${token}`);
if(token){
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);

  if(decodedToken.exp * 1000 < Date.now()){
    //window.location. = '/login';
    authenticated = false;
  }else{
    authenticated = true;
  }
}
const [theme,setTheme] = useState(theme1);
const [themecontroller, setThemecontroller] = useState(true);


const myTheme =()=>{
  if(themecontroller){
    setTheme(theme2);
  }else{
    setTheme(theme1);
  }
};

  return (
    <MuiThemeProvider theme= {theme}>
     <Provider store={store}> 
    <div className="App">
      <Router>
      <Navbar myTheme={myTheme} setThemecontroller={setThemecontroller} themecontroller={themecontroller}/>
        <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} authenticated={authenticated}/>
          <AuthRoute exact path="/signup" component={Signup} authenticated={authenticated}/>
          <Route exact path="/changePassword" component={ChangePassword}/>
        </Switch>
        </div>
      </Router>
    </div>
    </Provider>
    </MuiThemeProvider>
  );
}

export default App;
