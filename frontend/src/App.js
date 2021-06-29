import React, { useEffect, useState, useRef } from "react";
import { Typography, AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Home from "./components/Home";
import SignInForm from "./components/SignInForm";
import SignupForm from "./components/SignupForm";
import User from "./components/User";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  }
}));


export default function App() {
  const classes = useStyles();

  // Authentication stuff
  const hasFetchedData = useRef(false);
  const [session, setSession] = useState({
    isLoggedIn: false,
    user: {}
  });

  useEffect(() => {
    if (!hasFetchedData.current) {
      loginStatus();
      hasFetchedData.current = true;
    }
  });

  function handleLogin(data) {
    setSession({ isLoggedIn: true, user: data })
  }

  function handleLogout() {
    setSession({ isLoggedIn: false, user: {} })
  }

  function loginStatus() {
    axios.get('/api/v1/logged_in', { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          handleLogin(response.data.user);
          console.log(response.data.user)
        } else {
          handleLogout(); //infinite loop tiggered because of this
        }
      }).catch(error => console.log('api errors', error))
  }

  // useEffect(() => {
  //   axios.get('/api/v1/users/1').then(res => setUserData(res.data))
  // }, []);

  return (
    <div>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              ADNAT
            </Typography>
            <Link to='signin'>
              Sign in
            </Link>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" render={(props) => (
            <SignInForm handleLogin={handleLogin}
              handleLogout={handleLogout} />
          )} />
          {<Route
            path="/user"
            render={(props) => (
              <User {...session.user} />
            )} />}
          <Route path="/signup" component={SignupForm} />
        </Switch>
      </Router>
    </div>
  );
}
