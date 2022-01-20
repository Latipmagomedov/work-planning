import api from "./api";

const auth = {
    getProfile() {
        return api.get("/api/account");
    },
    uploadImage(payload) {
        return api.post("/api/account/upload-image", payload);
    },
    deleteImage() {
        return api.get("/api/account/delete-image");
    }
};

export default auth;
