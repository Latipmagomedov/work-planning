import api from "./api";

const auth = {
    getProfile() {
        return api.get("/account");
    },
    uploadImage(payload) {
        return api.post("/account/upload-image", payload);
    },
    deleteImage() {
        return api.get("/account/delete-image");
    }
};

export default auth;
