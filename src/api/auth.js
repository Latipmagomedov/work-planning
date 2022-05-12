import api from "./api";

const auth = {
    signIn(payload) {
        return api.post("/account/login", payload);
    },
    signUp(payload) {
        return api.post("/account/register", payload);
    },
    getProfile() {
        return api.get("/account");
    }
};

export default auth;
