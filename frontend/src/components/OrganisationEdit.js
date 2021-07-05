import React from "react";
import { TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom"
import FormHook from './CustomHooks';
import axios from 'axios';

export default function OrganisationEdit(props) {
  const { inputs, handleInputChange, handleSubmit }
    = FormHook(updateOrganisationData,
      {
        organisation_name: props.organisation.attributes.name,
        hourly_rate: props.organisation.attributes.hourly_rate
      });
  const qs = require('qs');
  const history = useHistory();

  function updateOrganisationData() {
    console.log(inputs.organisation_name);
    console.log(inputs.hourly_rate);
    axios.patch("/api/v1/organisations/" + props.organisation.id, qs.stringify(
      {
        organisation: {
          name: inputs.organisation_name,
          hourly_rate: inputs.hourly_rate
        }
      }), { withCredentials: true })
      .then(response => {
        history.push("/");
      }).catch(error => console.log('api errors:', error))
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        id="organisation_name"
        label="Name"
        name="organisation_name"
        autoFocus
        onChange={handleInputChange}
        value={inputs.organisation_name}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        name="hourly_rate"
        label="Hourly rate"
        type="number"
        id="hourly_rate"
        onChange={handleInputChange}
        value={inputs.hourly_rate}
      />
      <br />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ "margin": "4px" }}
      >
        Update
      </Button>
      <Button
        variant="contained"
        color="secondary"
        style={{ "margin": "4px" }}
        onClick={() => history.push("/")}
      >
        Cancel
      </Button>
    </form>
  )
}