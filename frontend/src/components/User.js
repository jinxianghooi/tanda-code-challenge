import React, { useEffect, useState } from "react";
import { Container, Typography, List, ListItem, ListItemText, Button, Grid, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom"
import axios from "axios";

export default function User(props) {
  const name = props.name;
  const [organisationData, setOrganisationData] = useState({});

  useEffect(() => {
    axios.get('/api/v1/organisations.json').then(res => setOrganisationData(res.data))
  }, []);

  function generateListItem() {
    return organisationData.data.map((organisation) =>
      <ListItem key={organisation.attributes.name}>
        <ListItemText primary={organisation.attributes.name} />
        <RouterLink to={"/organisation/" + organisation.id}>Join</RouterLink>
        <RouterLink>Edit</RouterLink>
      </ListItem >)

  };

  return (
    <React.Fragment>
      <Container component="main">
        <Typography component="h6" variant="h6">
          Welcome, {name}!
        </Typography>
        <Typography component="h4" variant="h4">
          Organisations
        </Typography>
        <List>
          {organisationData.data ? generateListItem() : null}
        </List>
      </Container>
    </React.Fragment >
  );
}