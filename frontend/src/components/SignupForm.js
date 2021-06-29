import React from "react";
import SignInHook from "./CustomHooks";
import { Container, Typography, TextField, Button, Grid, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom"
import axios from "axios";

export default function SignupForm(props) {
  // do axios stuff
  // add field validation

  const postSignupData = () => {
    // axios.post('/api/v1/')
  };

  const { inputs, handleInputChange, handleSubmit } = SignInHook();

  return (
    <React.Fragment>
      <Container component="main" maxwidth="xs">
        <Typography component="h3" variant="h3">
          Sign up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={handleInputChange}
            value={inputs.name}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleInputChange}
            value={inputs.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password (6 character minimum)"
            type="password"
            id="password"
            autoComplete="new-password"
            onChange={handleInputChange}
            value={inputs.password}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password confirmation"
            label="Password confirmation"
            type="password"
            id="password"
            autoComplete="new-password"
            onChange={handleInputChange}
          // value={inputs.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary" >
            Sign up
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link variant="body2" component={RouterLink} to="/signup">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="#" variant="body2" component={RouterLink} to="/signin">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}