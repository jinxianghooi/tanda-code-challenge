import React, { useState, useEffect } from 'react'
import { Typography, Button, List, ListItem, ListItemText } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import OrganisationEdit from './OrganisationEdit';
import OrganisationCreate from './OrganisationCreate';

const baseURL = process.env.HOST_IP_ADDRESS ? process.env.HOST_IP_ADDRESS : ""

export default function OrganisationList(props) {
  const [organisationData, setOrganisationData] = useState({});
  const [editOrganisation, setEditOrganisation] = useState(null);
  const qs = require('qs')
  const history = useHistory();

  useEffect(() => {
    axios.get(baseURL + "/api/v1/organisations.json")
      .then(res => setOrganisationData(res.data))
  }, []);

  function updateUserDetails(user_id, organisation_id) {
    axios.patch(baseURL + "/api/v1/users/" + user_id, qs.stringify(
      {
        user: {
          organisation_id: organisation_id
        }
      }), { withCredentials: true })
      .then(response => {
        if (response.data.updated) {
          console.log("updated");
          props.handleChange(response.data.user);
          history.push("/user/organisation_id_" + response.data.user.organisation_id);
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
            <React.Fragment>
              <ListItem key={organisation.attributes.name}>
                <ListItemText primary={organisation.attributes.name} />
                <Button
                  style={{ "margin": "2px" }}
                  onClick={() => updateUserDetails(props.user.id, organisation.id)}
                >
                  Join
                </Button>
                <Button
                  style={{ "margin": "2px" }}
                  onClick={() => setEditOrganisation(organisation.id)}
                >
                  Edit
                </Button>
              </ListItem >

              {organisation.id === editOrganisation ?
                <ListItem key={organisation.attributes.name + "Edit"}>
                  <OrganisationEdit organisation={organisation} />
                </ListItem> : null}
            </React.Fragment>) : null
      }</List>

      <OrganisationCreate user={props.user} updateUserDetails={updateUserDetails} />
    </React.Fragment>
  );
}