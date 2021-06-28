import { Typography, AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import SignInForm from "./components/SignInForm";
import Signup from "./components/Signup";
import User from "./components/User";


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
            <Link to='login'>
              Sign in
            </Link>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={SignInForm} />
          <Route path="/user" component={User} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
