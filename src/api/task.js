import api from "./api";

const tasks = {
    createTask(payload) {
        return api.post("/api/task/create", payload);
    },
    getTasks() {
        return api.get(`/api/task/all`);
    },
    getTask(id) {
        return api.get(`/api/task/${id}`);
    },
    updateTask(payload) {
        return api.post(`/api/task/update`, payload);
    },
    deleteTask(id) {
        return api.post(`/api/task/delete/${id}`);
    },
};

export default tasks;
