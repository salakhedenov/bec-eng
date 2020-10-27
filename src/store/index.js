import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import project from './project'
import user from './user'
import drawing from './drawing'
import department from './department'
import position from './position'
import timesheet from './timesheet'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error
  },
  actions: {
  },
  modules: {
    auth, info, project, user, drawing, department, position, timesheet
  }
})
