import React, { useEffect, useState, useRef } from "react";
import { Typography, AppBar, Toolbar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Home from "./components/Home";
import SignInForm from "./components/SignInForm";
import SignupForm from "./components/SignupForm";
import UserPage from "./components/UserPage";
import axios from "axios";
import { loginStatus } from "./util/axiosUtil";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  }
}));

const baseURL = process.env.HOST_IP_ADDRESS ? process.env.HOST_IP_ADDRESS : ""

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
      loginStatus(handleLogin, handleLogout);
      hasFetchedData.current = true;
    }
  });

  // useEffect(async () => {
  //   const response = await axios.get('/api/v1/logged_in', { withCredentials: true });
  //   if (response.data.logged_in) {
  //     handleLogin(response.data.user);
  //   } else {
  //     handleLogout();
  //   }
  // }, []);

  function handleLogin(data) {
    setSession({ isLoggedIn: true, user: data })
  }

  function handleLogout() {
    setSession({ isLoggedIn: false, user: {} })
  }

  // function loginStatus() {
  //   axios.get(`${baseURL}/api/v1/logged_in`, { withCredentials: true })
  //     .then(response => {
  //       console.log(response)
  //       if (response.data.logged_in) {
  //         handleLogin(response.data.user);
  //       } else {
  //         handleLogout();
  //       }
  //     }).catch(error => console.log('api errors: ', error))
  // }

  function postLogout(handleLogout) {
    axios.post(baseURL + "/api/v1/logout", {});
    handleLogout();
    return <Redirect to="/" />
  };

  // useEffect(() => {
  //   axios.get('/api/v1/users/1').then(res => setUserData(res.data))
  // }, []);

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
              {() => postLogout(handleLogout)}
            </Route>
          </Switch>
        </Router>
      </div> : null
  );
}
