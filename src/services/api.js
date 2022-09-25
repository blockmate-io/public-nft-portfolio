//for blockmateUserService jwt_user_token refresh
import axios from "axios";

const instance = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const user_jwt_token = localStorage.getItem("user_jwt_token");
    if (user_jwt_token) {
        config.headers["Authorization"] = 'Bearer ' + user_jwt_token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    
    const uuid = localStorage.getItem('uuid');

    if (originalConfig.url !== "/v1/users/"+uuid+"/auth" && err.response) {

      // Access Token was expired
      if ((err.response.status === 403 || err.response.status === 401) && !originalConfig._retry) {
        originalConfig._retry = true;

        try {

          const rs =  await instance.get(
            `/v1/users/${uuid}/auth`,
            {
              headers: {
                'X-API-KEY': localStorage.getItem("projectToken")
              }     
            }
          );

          localStorage.setItem('user_jwt_token', rs.data.token);

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;