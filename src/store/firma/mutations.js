import { state } from '..'
import { codPage } from '~/enums/firma/pages'

export default {
  SET_STEP(state, value) {
    state.step = value
  },
  SET_DATOS(state, payload) {
    state.datos = {
      ...state.datos,
      ...payload,
    }
  },
  SET_RESPONSE_CODE(state, value) {
    state.responseCode = value
  },
  SET_ESTADO_PROSPECTO(state, value) {
    state.prospectus.estadoProspecto = value
  },
  SET_PRODUCT_CODE(state, value) {
    state.codigoProducto = value;
  },
  SET_ARRAY_DOCUMENTS(state, payload) {
    state.arrayDocuments = payload
  },
  SET_TERMINOS(state, value) {
    state.terminos = value
  },
  SET_QUIZ(state, payload) {
    state.validationQuestions = payload
    state.numberOfQuestions = payload.length
  },
  ////////////////////////////////////////////////////////
  SET_PROSPECT(state, data) {
    state.responseCode = data.codRes;
    state.prospectus = { ...state.prospectus, ...data };
    state.prospectusTest = { ...state.prospectus, ...data };///temporal
  },
  CLEAR_ALL(state) {
    state.step = codPage.LOADING_PROCESS;
    state.prospectus = {};
    state.estadoProspecto = null;
    state.arrayDocuments = [];
    state.terminos = false;
    state.responseCode = '';
    state.numberOfQuestions = 0;
    state.validationQuestions = [];
  },
  CLEAR_ALL_WITHOUT_STEP(state) {
    state.prospectus = {};
    state.estadoProspecto = null;
    state.arrayDocuments = [];
    state.terminos = false;
    state.responseCode = '';
    state.numberOfQuestions = 0;
    state.validationQuestions = [];
  },
}
