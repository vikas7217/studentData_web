import axios from "axios";

const Interceptor =() =>{
axios.interceptors.request.use(function (config) {

    const accessToken = localStorage.getItem("access_Token");
    config.headers.Authorization = `Bearer ${accessToken}`;
    
    return config;

  }, function (error) {
    return Promise.reject(error);
  });

axios.interceptors.response.use(function (response) {
    
    return response;

  }, function (error) {
    
    return Promise.reject(error);
  });
}

export default Interceptor