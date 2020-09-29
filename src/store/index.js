import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pedidos: [],
    repartidoresDisponibles: 0,
    repartidoresNoDisponibles: 0,
    repartidoresEnEntrega: 0,
    repartidoresConfirmando: 0,
  },
  mutations: {
    UNSET_ORDERS(state) {
      state.pedidos = [];
    },
  },
  actions: {
    logout({ commit }) {
      localStorage.removeItem('token');
      commit('UNSET_ORDERS');
    }
  },
  modules: {},
});
