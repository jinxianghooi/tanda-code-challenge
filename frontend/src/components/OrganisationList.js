import React, { useState, useEffect } from 'react'
import { Typography, Button, List, ListItem, ListItemText } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function OrganisationList(props) {
  const [organisationData, setOrganisationData] = useState({});
  const qs = require('qs')
  const history = useHistory();

  useEffect(() => {
    axios.get("/api/v1/organisations.json")
      .then(res => setOrganisationData(res.data))
  }, []);

  function updateUserDetails(organisation_id, organisation_name) {
    axios.patch("/api/v1/users/" + props.user.id, qs.stringify(
      {
        user: {
          organisation_id: organisation_id
        }
      }), { withCredentials: true })
      .then(response => {
        if (response.data.status === "updated") {
          console.log("updated");
          props.handleLogin(response.data.user);
          history.push("/user/organisation_id_" + props.user.organisation_id);
        } else {
          // do error stuff here
        }
      }).catch(error => console.log('api errors:', error))
  };

  return (
    <React.Fragment>
      <Typography component="h4" variant="h4">
        Organisations
      </Typography>
      <List>{
        organisationData.data ?
          organisationData.data.map((organisation) =>
            <ListItem key={organisation.attributes.name}>
              <ListItemText primary={organisation.attributes.name} />
              <Button
                onClick={() => updateUserDetails(organisation.id, organisation.attributes.name)}>
                Join
              </Button>
              <div>&nbsp;</div>
              <Button>Edit</Button>
            </ListItem >) : null
      }</List>
    </React.Fragment>
  );
}