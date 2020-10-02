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
    repartidores: [],
  },
  mutations: {
    UNSET_ORDERS(state) {
      state.pedidos = [];
    },
    setRepartidor(state, payload) {
      state.repartidores.push(payload);
    }
  },
  actions: {
    logout({ commit }) {
      localStorage.removeItem('token');
      commit('UNSET_ORDERS');
    },
    repartidor({ commit }, payload) {
      console.log(payload);
      commit("setRepartidor", payload);
    }
  },
  modules: {},
});
