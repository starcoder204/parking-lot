import { LotServices } from '@/services/index'

export default {
  async parkingLot ({ commit }, payload) {
    return await LotServices.parkingLot(payload).then(resp => {
      commit('PARKING_LOT', resp)
      return resp
    }).catch(err => {
      return err
    })
  }
}
  