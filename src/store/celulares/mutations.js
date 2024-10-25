import {
  expressForm
} from './state'
import {
  codPage
} from '~/enums/celulares-enums'
export default {
  // TODO: max
  SET_MARCAS_CEL(state, payload) {
    state.lista_marcas_cel = payload
  },
  SET_MODELOS_CEL(state, payload) {
    state.lista_modelos_cel = payload
  },
  SET_PROSPECT(state, payload) {
    state.responseCode = payload.data.codigoRespuesta
    state.prospectus = payload.data
  },
  SET_STEP(state, payload) {
    state.step = payload
  },
  CLEAR_ALL(state) {
    state.step = codPage.PRE_EVALUATION,
      state.responseCode = "",
      state.productCode = 39,
      state.prospectus = "",
      state.estadoProspecto = ""

  },
  RESET_STATES(state) {
    state.step = codPage.PRE_EVALUATION,
      state.responseCode = "",
      state.productCode = 39,
      state.prospectus = "",
      state.estadoProspecto = ""
  }
}
