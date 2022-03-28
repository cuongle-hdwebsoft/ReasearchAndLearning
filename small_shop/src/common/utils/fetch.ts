import Axios, { Method } from "axios";

const baseUrl = "json-server";

export const fetchAuth = (method: Method | undefined, endpoint: string, data: any) => {
  const accessToken = localStorage.getItem("accessToken");
  return Axios({
    method,
    data,
    url: baseUrl.concat(endpoint),
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
};

export const fetch = (method: Method | undefined, endpoint: string, data: any) => {
  return Axios({
    method,
    data,
    url: baseUrl.concat(endpoint),
  });
};
