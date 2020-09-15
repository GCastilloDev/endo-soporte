import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pedidos: [],
  },
  mutations: {
    UNSET_ORDERS(state) {
      state.pedidos = [];
    }
  },
  actions: {
    logout({ commit }) {
      localStorage.removeItem('token');
      commit('UNSET_ORDERS');
    }
  },
  modules: {},
});
