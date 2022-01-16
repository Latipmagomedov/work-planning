import api from "./api";

const auth = {
    signIn(payload) {
        return api.post("/api/account/login", payload);
    },
    signUp(payload) {
        return api.post("/api/account/register", payload);
    },
    getProfile(headers) {
        return api.get("/api/account", {headers});
    }
};

export default auth;
