import Vue from "vue";
import Vuex from "vuex";
import getters from './getters'
import user from "./modules/user";
import modal from "./modules/modal";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        modal
    },
    getters
});
