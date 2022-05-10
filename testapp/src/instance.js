import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001'
})

axiosInstance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  console.log(error.response)
  if(error.response.status === 500) {
    error.niceTry = true
  }
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if(error.response.status === 500) {
    error.niceTry = true
  }
  return Promise.reject(error);
});

export default axiosInstance