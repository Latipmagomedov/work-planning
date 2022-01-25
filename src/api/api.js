import axios from "axios";
import store from "../store";

const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
});
api.interceptors.request.use(
  async (config) => {
    if (store.getters.token) {
      config.headers["Authorization"] = `Bearer ${store.getters.token}`;
    }
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
