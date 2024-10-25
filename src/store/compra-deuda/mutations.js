import { codPage } from '~/enums/compra-deuda/pages'

export default {
  SET_STEP(state, value) {
    state.step = value
  },
  UPDATE_DATOS(state, payload) {
    state.datos = {
      ...state.datos,
      ...payload,
    }
  },
  CLEAR_ALL (state) {
    state.step = codPage.ONBOARDING
  },
  SET_OFERTAS(state, payload) {
    state.ofertas = payload
  },
  SET_BODY_VALIDA(state, payload) {
    ;(state.body_valida.codProspecto = payload.codProspecto),
      (state.body_valida.channel = payload.channel),
      (state.body_valida.codigoProducto = payload.codigoProducto),
      (state.body_valida.documento = payload.documento),
      (state.body_valida.placa = payload.placa),
      (state.body_valida.estadoProspecto = payload.estadoProspecto),
      (state.body_valida.codigoProspecto = payload.codigoProspecto)
  },
  SET_COD_EVALUACION(state, payload) {
    state.resElegirOferta = payload
  },
  SET_CONFIR_DATOS(state, payload) {
    state.resConfirmarDatos = payload
  },
  SET_BIOMETRIC_FACIAL(state, value) {
    state.isBiometricFacial = value
  },
  SET_PROSPECT(state, data) {
    state.responseCode = data.codRes
  },
  SET_QUIZ(state, payload) {
    state.quizArray = payload
    state.validationQuestions = payload
    state.numberOfQuestions = payload.length
  },
}
