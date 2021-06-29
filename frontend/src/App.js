import React, { useEffect, useState } from "react";
import { Typography, AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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


function App() {
  const classes = useStyles();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios.get('/api/v1/users/1').then(res => setUserData(res.data))
  }, []);

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
          <Route path="/signin" component={SignInForm} />
          {userData.data ? <Route
            path="/user"
            render={(props) => (
              <User {...userData.data} />
            )} /> : null}
          <Route path="/signup" component={SignupForm} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
