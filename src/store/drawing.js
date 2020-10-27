import firebase from 'firebase/app'

export default {
  actions: {
    async fetchDrawings ({
      commit
    }) {
      try {
        const drawings = (await firebase.database().ref('/drawings').once('value')).val() || {}
        return Object.keys(drawings).map(key => ({
          ...drawings[key], id: key
        }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchDrawingById ({
      commit
    }, id) {
      try {
        const drawing = (await firebase.database().ref('/drawings').child(id).once('value')).val() || {}
        return {
          ...drawing,
          id: id
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createDrawing ({
      commit
    },
    {
      code, title, userId, startDate, progress, projectId, notes
    }) {
      try {
        const drawing = await firebase.database().ref('/drawings').push({
          code, title, userId, startDate, progress, projectId, notes
        })
        return {
          id: drawing.key, code, title, userId, startDate, progress, projectId, notes
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
