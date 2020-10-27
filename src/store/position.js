import firebase from 'firebase/app'

export default {
  actions: {
    async fetchPositions ({
      commit
    }) {
      try {
        const positions = (await firebase.database().ref('/positions').once('value')).val() || {}
        return Object.keys(positions).map(key => ({
          ...positions[key], id: key
        }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchPositionById ({
      commit
    }, id) {
      try {
        const position = (await firebase.database().ref('/positions').child(id).once('value')).val() || {}
        return {
          ...position,
          id: id
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
