import api from "./api";

const tasks = {
    createTask(payload, headers) {
        return api.post("/api/task/create", payload, {headers});
    },
    getTasks(headers) {
        return api.get(`/api/task/all`, {headers});
    },
    getTask(id, headers) {
        return api.get(`/api/task/${id}`, {headers});
    },
    updateTask(payload, headers) {
        return api.post(`/api/task/update`, payload, {headers});
    },
    deleteTask(id, headers) {
        return api.post(`/api/task/delete/${id}`, {}, {headers});
    },
};

export default tasks;
