import firebase from 'firebase/app'

export default {
  actions: {
    async fetchTimesheets ({
      commit, dispatch
    }) {
      try {
        const uid = await dispatch('getUid')
        const timesheets = (await firebase.database().ref(`/users/${uid}/timesheets`).once('value')).val()
        return Object.keys(timesheets).map(key => ({
          ...timesheets[key], id: key
        }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createTimesheet ({
      commit, dispatch
    },
    {
      weekNumber, drawings
    }) {
      try {
        const uid = await dispatch('getUid')
        const timesheet = await firebase.database().ref(`/users/${uid}/timesheets`).push({
          weekNumber, drawings
        })
        return {
          id: timesheet.key, weekNumber
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
