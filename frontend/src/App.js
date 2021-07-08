import React, { useEffect, useState, useRef } from "react";
import { Typography, AppBar, Toolbar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Home from "./components/Home";
import SignInForm from "./components/SignInForm";
import SignupForm from "./components/SignupForm";
import UserPage from "./components/UserPage";
import { getLoginStatus, postLogout } from "./util/axiosUtil";


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
      getLoginStatus(handleLogin, handleLogout);
      hasFetchedData.current = true;
    }
  });

  function handleLogin(data) {
    setSession({ isLoggedIn: true, user: data })
  }

  function handleLogout() {
    setSession({ isLoggedIn: false, user: {} })
  }

  function logoutCallback() {
    postLogout();
    handleLogout();
    return <Redirect to="/" />
  };

  return (
    hasFetchedData.current ?
      <div>
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                ADNAT
              </Typography>
              {/* {session.isLoggedIn ?
                <div>
                  <Typography>
                    Logged in as
                  </Typography>
                  <Link to="/user"> {session.user.name} </Link>
                </div> : null} */}
              <Button
                component={Link}
                to={session.isLoggedIn ? "/signout" : "/signin"}
              >
                {session.isLoggedIn ? "Sign out" : "Sign in"}
              </Button>
            </Toolbar>
          </AppBar>

          <Switch>
            <Route path="/" exact >
              {session.isLoggedIn ? <Redirect to="/user" /> : <Home />}
            </Route>
            <Route path="/signin">
              <SignInForm handleLogin={handleLogin}
                handleLogout={handleLogout} />
            </Route>
            <Route path="/user">
              {session.isLoggedIn ?
                <UserPage {...session.user} handleLogin={handleLogin} />
                : <Redirect to="/signin" />}
            </Route>
            <Route path="/signup">
              <SignupForm handleLogin={handleLogin} />
            </Route>
            <Route path="/signout" exact >
              {() => logoutCallback()}
            </Route>
          </Switch>
        </Router>
      </div> : null
  );
}
