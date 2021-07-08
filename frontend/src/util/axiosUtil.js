// home to all axios functions
import axios from "axios";

const baseURL = process.env.HOST_IP_ADDRESS ?
    process.env.HOST_IP_ADDRESS :
    ""

/**
 * Retrieves session status from server.
 * API link: GET api/v1/logged_in
 *
 * @param {function} success Callback function for user logged in
 * @param {function} failure Callback function for user logged out
 * 
 */
export function loginStatus(success, failure) {
    axios.get(`${baseURL}/api/v1/logged_in`, { withCredentials: true })
        .then(response => {
            console.log(response)
            if (response.data.logged_in) {
                console.log("logged in");
                success(response.data.user);
            } else {
                console.log("logged out");
                failure();
            }
        }).catch(error => console.log('api errors: ', error))
}