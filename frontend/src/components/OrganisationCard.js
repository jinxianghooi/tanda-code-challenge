import React, { useState, useEffect } from 'react'
import { Typography, Button } from '@material-ui/core'
import axios from 'axios';
import { Link as RouterLink, Route, useHistory } from "react-router-dom"
import Shifts from './Shifts';
import OrganisationEdit from './OrganisationEdit';

export default function OrganisationCard(props) {
	const [organisation, setOrganisation] = useState({});
	const qs = require('qs');
	const history = useHistory();

	useEffect(() => {
		axios.get("/api/v1/organisations/" + props.user.organisation_id)
			.then(res => setOrganisation(res.data.data))
	}, [props.user.organisation_id]);

	function leaveOrganisation() {
		axios.patch("/api/v1/users/" + props.user.id, qs.stringify(
			{
				user: {
					organisation_id: null
				}
			}), { withCredentials: true })
			.then(response => {
				if (response.data.updated) {
					console.log("updated");
					history.push("/user/join");
					props.handleChange(response.data.user);
				} else {
					// do error stuff here
				}
			}).catch(error => console.log('api errors:', error))
	};

	return (
		organisation.id ?
			<React.Fragment>
				<Typography component="h4" variant="h4">
					{organisation.attributes.name}
				</Typography>

				<Button
					component={RouterLink}
					to={"/user/organisation_id_" + organisation.id + "/shifts"}>
					View Shifts
				</Button>
				<Button
					component={RouterLink}
					to={"/user/organisation_id_" + organisation.id + "/edit"}>
					Edit
				</Button>
				<Button onClick={() => { leaveOrganisation() }}>
					Leave
				</Button>

				<Route path={"/user/organisation_id_" + organisation.id + "/shifts"}>
					<Shifts />
				</Route>
				<Route path={"/user/organisation_id_" + organisation.id + "/edit"}>
					<OrganisationEdit />
				</Route>
			</React.Fragment > : null
	)
};