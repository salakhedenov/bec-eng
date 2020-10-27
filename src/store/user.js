import firebase from 'firebase/app'

export default {
  actions: {
    async fetchUsers ({
      commit
    }) {
      try {
        const users = (await firebase.database().ref('/users').once('value')).val()
        return Object.keys(users).map(key => ({
          ...users[key], id: key
        }))
      } catch (e) {
        commit('setError', e)
      }
    }
  }
}
