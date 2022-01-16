import axios from "axios";

const api = axios.create({
  baseURL: "https://wtm-api-v1.herokuapp.com",
  withCredentials: true,
  headers: {
    accept: "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error.response;
  }
);

export default api;
