import api from "../api/api";
import auth from "../api/auth";
import task from "../api/task";

export default {
  install(Vue) {
    Vue.prototype.$api = api;
    Vue.prototype.$auth = auth;
    Vue.prototype.$task = task;
  },
};
