import React, { useEffect, useState } from "react";
import { Container, Typography, List, ListItem, ListItemText, Button, Grid, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom"
import axios from "axios";
import OrganisationCard from "./OrganisationCard";

export default function User(props) {
  console.log(props);
  const name = props.name;
  const [organisationData, setOrganisationData] = useState({});

  useEffect(() => {
    if (props.organisation_id) {
      axios.get("/api/v1/organisations/" + props.organisation_id)
        .then(res => setOrganisationData(res.data))
    } else {
      axios.get('/api/v1/organisations.json')
        .then(res => setOrganisationData(res.data))
    }
  }, [props.organisation_id, setOrganisationData]);

  const OrganisationsList = () => {
    // const [organisationData, setOrganisationData] = useState({});
    // axios.get('/api/v1/organisations.json').then(res => setOrganisationData(res.data))

    return (
      <List>{
        organisationData.data ?
          organisationData.data.map((organisation) =>
            <ListItem key={organisation.attributes.name}>
              <ListItemText primary={organisation.attributes.name} />
              <RouterLink to={"/organisation/" + organisation.id}>Join</RouterLink>
              <RouterLink>Edit</RouterLink>
            </ListItem >) : null
      }</List>
    )
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
        {props.organisation_id ?
          <OrganisationCard /> : OrganisationsList()}
      </Container>
    </React.Fragment >
  );
}