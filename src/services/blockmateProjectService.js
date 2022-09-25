//for project token APIs
import axios from 'axios';
import jwt_decode from "jwt-decode";




export const authenticateEndUser =  (uuid, project_token) => {

    const response =  axios.get(
      `/v1/users/${uuid}/auth`,
      {
        headers: {
          'X-API-KEY': project_token
        }     
      }
    ).then(response => {

      var user_jwt_token = response.data.token;
      localStorage.setItem('user_jwt_token', user_jwt_token);
      return response.data;
  });


}



export const authenticateToProject = async (project_token) => {
  const response = await axios.get('/v1/auth', {
    headers: {
      'X-API-KEY': project_token
    }
  });

  const project_jwt_token = response.data.token;
  return project_jwt_token;
};

