import api from "./api";

const tasks = {
    createTask(payload) {
        return api.post("/task/create", payload);
    },
    getTasks() {
        return api.get(`/task/all`);
    },
    getTask(id) {
        return api.get(`/task/${id}`);
    },
    updateTask(payload) {
        return api.post(`/task/update`, payload);
    },
    deleteTask(id) {
        return api.post(`/task/delete/${id}`);
    },
};

export default tasks;
