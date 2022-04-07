import Axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

const baseUrl = "http://localhost:3001";

export const fetchAuth = (method: Method | undefined, endpoint: string, data?: any, config?: AxiosRequestConfig) => {
  const accessToken = localStorage.getItem("accessToken");
  return Axios({
    method,
    data,
    url: baseUrl.concat(endpoint),
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    ...config,
  });
};

export const fetch = (method: Method | undefined, endpoint: string, data?: any, config?: AxiosRequestConfig) => {
  return Axios({
    method,
    data,
    url: baseUrl.concat(endpoint),
    ...config,
  });
};
