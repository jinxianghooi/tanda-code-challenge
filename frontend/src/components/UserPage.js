import React, { useEffect, useState, useRef } from "react";
import { Container, Typography, List, ListItem, ListItemText, Button, Grid, Link } from "@material-ui/core";
import { Redirect, Route, useHistory } from "react-router-dom"
import axios from "axios";
import OrganisationCard from "./OrganisationCard";
import OrganisationList from "./OrganisationList";

export default function User(props) {
  const name = props.name;
  const history = useHistory();

  // useEffect(() => {
  //   if (props.organisation_id) {
  //     axios.get("/api/v1/organisations/" + props.organisation_id)
  //       .then(res => setOrganisationData(res.data))
  //   } else {
  //     axios.get('/api/v1/organisations.json')
  //       .then(res => setOrganisationData(res.data))
  //   }
  // }, [props.organisation_id, setOrganisationData]);

  useEffect(() => {
    if (props.organisation_id) {
      history.push("/user/organisation_id_" + props.organisation_id);
    } else {
      history.push("/user/join");
    }
  }, [props.organisation_id, history])

  // function updateUserDetails(organisation_id, organisation_name) {
  //   axios.patch("/api/v1/users/" + props.id, qs.stringify(
  //     {
  //       user: {
  //         organisation_id: organisation_id
  //       }
  //     }), { withCredentials: true })
  //     .then(response => {
  //       if (response.data.status === "updated") {
  //         props.handleLogin(response.data.user);
  //         history.push("/user/" + organisation_name);
  //       } else {
  //         // do error stuff here
  //       }
  //     }).catch(error => console.log('api errors:', error))
  // };

  // const OrganisationsList = () => {
  //   return (
  //     <React.Fragment>
  //       <Typography component="h4" variant="h4">
  //         Organisations
  //       </Typography>
  //       <List>{
  //         organisationData.data ?
  //           organisationData.data.map((organisation) =>
  //             <ListItem key={organisation.attributes.name}>
  //               <ListItemText primary={organisation.attributes.name} />
  //               <Button
  //                 onClick={() => updateUserDetails(organisation.id, organisation.attributes.name)}>
  //                 Join
  //               </Button>
  //               <div>&nbsp;</div>
  //               <Button>Edit</Button>
  //             </ListItem >) : null
  //       }</List>
  //     </React.Fragment>
  //   )
  // };

  return (
    // props.name ?
    <React.Fragment>
      <Container component="main">
        <Typography component="h6" variant="h6">
          Welcome, {name}!
        </Typography>

        {/* {props.organisation_id ?
            <Redirect to={"/user/organisation_id_" + props.organisation_id} /> :
            <Redirect to="/user/join" />
          } */}

        <Route path={"/user/join"}>
          <OrganisationList user={props} handleChange={props.handleLogin} />
        </Route>
        <Route path={"/user/organisation_id_" + props.organisation_id}>
          <OrganisationCard user={props} handleChange={props.handleLogin} />
        </Route>
        {/* {!props.organisation_id ?
          OrganisationsList() : <OrganisationCard organisation_data={organisationData} />} */}
      </Container>
    </React.Fragment >
  );
}