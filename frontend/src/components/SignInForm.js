import React from 'react'
import { Container, Typography, TextField, Button, Grid, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom"
import SignInHook from './CustomHooks';


export default function SignInForm(props) {
  // add axios callback soon
  const { inputs, handleInputChange, handleSubmit } = SignInHook();

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