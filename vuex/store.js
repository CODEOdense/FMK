const Vue = require('vue');
const Vuex = require('vuex');

// Make vue aware of Vuex
//Vue.use(Vuex);

const state = {
  count: 2
};

const mutations = {
  // A mutation receives the current state as the first argument
  // You can make any modifications you want inside this function
  INCREMENT (state, amount) {
    state.count = state.count + amount
  }
};

// Combine the initial state and the mutations to create a Vuex store.
// This store can be linked to our app.
const store = new Vuex.Store({
  state,
  mutations
});

module.exports = store;