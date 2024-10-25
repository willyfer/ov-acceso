import { prospeccionForm } from '@/utils/defaultForm'

export const state = () => ({
  datos: prospeccionForm
})

export const mutations = {
  UPDATE_DATOS(state, payload) {
    state.datos = {
      ...state.datos,
      ...payload
    }
  }
}

export const actions = {}
