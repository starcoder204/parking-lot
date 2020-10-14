import state from './moduleLotState.js'
import mutations from './moduleLotMutations.js'
import actions from './moduleLotActions.js'
import getters from './moduleLotGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
