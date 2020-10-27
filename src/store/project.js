import firebase from 'firebase/app'

export default {
  actions: {
    async fetchProjects ({
      commit
    }) {
      try {
        const projects = (await firebase.database().ref('/projects').once('value')).val() || {}
        return Object.keys(projects).map(key => ({
          ...projects[key], id: key
        }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchProjectById ({
      commit
    }, id) {
      try {
        const project = (await firebase.database().ref('/projects').child(id).once('value')).val() || {}
        return {
          ...project,
          id: id
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createProject ({
      commit
    },
    {
      code, title, client, userId, startDate, progress
    }) {
      try {
        const project = await firebase.database().ref('/projects').push({
          code, title, client, userId, startDate, progress
        })
        return {
          id: project.key, code, title, client, userId, startDate, progress
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
