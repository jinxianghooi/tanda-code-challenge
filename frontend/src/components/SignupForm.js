import React, { useState } from "react";
import FormHook from "./CustomHooks";
import { Container, Typography, TextField, Button, Grid, Link } from "@material-ui/core";
import { Link as RouterLink, useHistory } from "react-router-dom"
import axios from "axios";

const baseURL = process.env.HOST_IP_ADDRESS ? process.env.HOST_IP_ADDRESS : ""

export default function SignupForm(props) {
  // do axios stuff
  // add field validation

  const { inputs, handleInputChange, handleSubmit } = FormHook(
    createNewUser,
    {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    });
  const [userExist, setUserExist] = useState(false);
  const userExistMessage = "An account with this email address already exist. Please sign in to continue."
  const qs = require('qs');
  const history = useHistory();

  function createNewUser() {
    axios.post(baseURL + "/api/v1/users", qs.stringify(
      {
        user: {
          name: inputs.name,
          email_address: inputs.email,
          password: inputs.password
        }
      }), { withCredentials: true })
      .then(response => {
        if (response.data.status === "created") {
          props.handleLogin(response.data.user);
          history.push("/user");
        } else if (response.data.status === "exist") {
          setUserExist(true);
        } else {
          // error
        }
      }).catch(error => console.log('api errors:', error))
  };

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
            error={userExist}
            helperText={userExist && userExistMessage}
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
            error={inputs.password.length > 0 && inputs.password.length < 6}
            helperText={inputs.password.length > 0 && inputs.password.length < 6 ?
              "Password must have at least 6 characters" : ""}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password_confirmation"
            label="Password confirmation"
            type="password"
            id="password_confirmation"
            autoComplete="new-password"
            onChange={handleInputChange}
            value={inputs.password_confirmation}
            error={inputs.password_confirmation.length > 5 && inputs.password !== inputs.password_confirmation}
            helperText={inputs.password_confirmation.length > 5 && inputs.password !== inputs.password_confirmation ?
              "Password and password confimation does not match" : ""}
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