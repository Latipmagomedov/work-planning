const state = {
    modalName: null,
};
const mutations = {
    OPEN_MODAL: (state, name) => {
        state.modalName = name;
    },
    CLOSE_MODAL: (state) => {
        state.modalName = null;
    }
};
const actions = {
    toggle({commit, state}, name) {
        if (name !== state.modalName) {
            commit("OPEN_MODAL", name);
        } else {
            commit("CLOSE_MODAL");
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
