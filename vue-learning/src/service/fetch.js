import axios from "axios";

const instance = axios.create({
  // for locally
  baseURL: "http://localhost:3001/",

  // public
  // baseURL: 'https://paint-ionized-rainstorm.glitch.me',
  timeout: 30000,
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
