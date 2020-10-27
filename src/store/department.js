import firebase from 'firebase/app'

export default {
  actions: {
    async fetchDepartments ({
      commit
    }) {
      try {
        const departments = (await firebase.database().ref('/departments').once('value')).val() || {}
        return Object.keys(departments).map(key => ({
          ...departments[key], id: key
        }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchDepartmentById ({
      commit
    }, id) {
      try {
        const department = (await firebase.database().ref('/departments').child(id).once('value')).val() || {}
        return {
          ...department,
          id: id
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
