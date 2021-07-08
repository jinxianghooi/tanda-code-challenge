// home to all axios functions
import axios from "axios";

const baseURL = process.env.HOST_IP_ADDRESS ?
  process.env.HOST_IP_ADDRESS :
  ""

/**
 * Retrieves login session status from server.
 * API link: GET api/v1/logged_in
 *
 * @param {function} success Callback function if user is logged in
 * @param {function} failure Callback function if user is logged out
 * 
 */
export function getLoginStatus(success, failure) {
  axios.get(`${baseURL}/api/v1/logged_in`, { withCredentials: true })
    .then(response => {
      if (response.data.logged_in) {
        console.log("logged in");
        success(response.data.user);
      } else {
        console.log("logged out");
        failure();
      }
    }).catch(error => console.log('api errors: ', error))
}

/**
 * Triggers logout in server.
 * API link: POST api/v1/logged_in
 * 
 * @param {function} callback callback function after logout
 * 
 */
export function postLogout(callback = () => { }) {
  axios.post(baseURL + "/api/v1/logout")
    .then(response => {
      callback();
    });
}