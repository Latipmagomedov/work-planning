import axios from "axios";
import store from "../store";

const api = axios.create({
    baseURL: "https://wtm-api-v1.herokuapp.com",
    withCredentials: true,
});
api.interceptors.request.use(
    async config => {
        if (store.getters.token) config.headers['Authorization'] = 'Bearer ' + store.getters.token;
        config.headers['Content-Type'] = 'application/json';

        return config;
    },
    error => {
        Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return error.response;
    }
);

export default api;
