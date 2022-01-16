const state = {
  token: null,
};
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  REMOVE_TOKEN(state) {
    state.token = null;
  },
};
const actions = {
  login({ commit }, token) {
    commit("SET_TOKEN", token);
    localStorage.setItem("token", token);
  },
  logout({ commit }) {
    commit("REMOVE_TOKEN");
    localStorage.removeItem("token");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
