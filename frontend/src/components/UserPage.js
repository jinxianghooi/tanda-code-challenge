import React, { useEffect, useState, useRef } from "react";
import { Container, Typography, List, ListItem, ListItemText, Button, Grid, Link } from "@material-ui/core";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom"
import axios from "axios";
import OrganisationPage from "./OrganisationPage";
import OrganisationList from "./OrganisationList";

export default function UserPage(props) {
  const history = useHistory();

  useEffect(() => {
    redirect();
  })

  function redirect() {
    if (props.organisation_id) {
      history.push("/user/organisation_id_" + props.organisation_id);
    } else {
      history.push("/user/join");
    }
  };

  return (

    <React.Fragment>
      <Container component="main">
        <Typography component="h6" variant="h6">
          Welcome, {props.name}!
        </Typography>

        <Route path={"/user/join"}>
          <OrganisationList user={props} handleChange={props.handleLogin} />
        </Route>
        <Route path={"/user/organisation_id_" + props.organisation_id}>
          <OrganisationPage user={props} handleChange={props.handleLogin} />
        </Route>
      </Container>
    </React.Fragment >
  );
}