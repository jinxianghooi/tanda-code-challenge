import React from 'react'
import { Container, Typography, TextField, Button, Grid, Link } from "@material-ui/core";
import { Link as RouterLink, Redirect, useHistory } from "react-router-dom"
import SignInHook from './CustomHooks';
import axios from 'axios';


export default function SignInForm(props) {

  const { inputs, handleInputChange, handleSubmit } = SignInHook(login);
  const qs = require('qs');
  const history = useHistory();

  function login() {
    axios.post('/api/v1/login', qs.stringify(
      {
        user: {
          email_address: inputs.email,
          password: inputs.password
        }
      }), { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          console.log("logged in");
          props.handleLogin(response.data.user);
          history.push("/user");
          // return <Redirect to="/home" />
        } else {
          // not sure what to do yet
        }
      }).catch(error => console.log('api errors:', error))
  };

  return (
    <React.Fragment>
      <Container component="main">
        <Typography component="h3" variant="h3">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleInputChange}
            value={inputs.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInputChange}
            value={inputs.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary" >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link variant="body2" component={RouterLink} to="/signup">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="#" variant="body2" component={RouterLink} to="/signup">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  )
}