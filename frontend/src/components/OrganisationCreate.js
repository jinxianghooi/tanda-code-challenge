import React from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom"
import axios from "axios";
import FormHook from "./CustomHooks";

const baseURL = process.env.HOST_IP_ADDRESS ? process.env.HOST_IP_ADDRESS : "http://0.0.0.0:3001"

export default function OrganisationCreate(props) {
  const { inputs, handleInputChange, handleSubmit }
    = FormHook(updateOrganisationData,
      {});
  const qs = require('qs');
  const history = useHistory();

  console.log(baseURL);

  function updateOrganisationData() {
    console.log(inputs.organisation_name);
    console.log(inputs.hourly_rate);
    axios.post(baseURL + "/api/v1/organisations/", qs.stringify(
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
    <React.Fragment>

      <Typography component="h4" variant="h4">
        Create Organisation
      </Typography>
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
          Create and Join
        </Button>
      </form>
    </React.Fragment>
  );
};