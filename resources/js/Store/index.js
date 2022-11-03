import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import Filter from './filter'
import Search from './search'

import {spaces} from './modules/spaces'
import {folders} from './modules/folders'
import {users} from './modules/users'
import {teams} from './modules/teams'

Vue.use(Vuex)

const actions = {
  setSnackBar({ commit }, snackbar) {
    commit('SET_SNACKBAR', snackbar);
  },
  TOGGLE_HOME_NAVIGATION_DRAWER({ commit }) {
    commit('TOGGLE_HOME_NAVIGATION_DRAWER');
  },
}

const mutations = {
  SET_SNACKBAR(state, snackbar) {
    state.snackbar = snackbar;
  },
  TOGGLE_HOME_NAVIGATION_DRAWER: (state) => {
    state.isHomeNavigationDrawerOpen = !state.isHomeNavigationDrawerOpen
  },
 
 
}

const getters = {
  getSnackBar: (state) => {
    return state.snackbar
  },
  getNavigationDrawer: (state) => {
    return state.isHomeNavigationDrawerOpen
  },
}

const store = new Vuex.Store({
  state: {
    snackbar: {},
    isHomeNavigationDrawerOpen: true,
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules: {
    search: Search,
    filter: Filter,
    spaces: spaces,
    folders: folders,
    teams: teams,
    users: users
  }
})

global.store = store
export default store;