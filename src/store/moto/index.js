import {
  apiSendPreevaluation,
  apiRegistrationPersonalData,
  apiSimulateCreditConditions,
  apiConsultProspectus,
  apiConfirmCreditConditions,
  apiSendApprovalLetter,
  apiChangeStateFinal,
  apiObtenerCartaMoto,
  apiObtenerCartaMotoBancarizador,
} from '~/api/moto'
import { apiAttachFile, apiContactStatusChanges } from '~/api/shared'
import { codPage, pagesMoto } from '~/enums/moto-enums'
import { ProductCode } from '~/enums/global-enums'

export const state = () => ({
  step: codPage.PRE_EVALUATION,
  responseCode: '',
  productCode: '',
  prospectus: {
    codigoProspecto: 0,
    estadoProspecto: 92,
    estadoCivil: '',
    mafmax: 0,
    apellidoMaterno: '',
    apellidoPaterno: '',
    nombreTitular: '',
    telefono: '',
    documentos: [], //documentos ya registrados
    documentoPerfil: [], // documentos solicitados
    correo: '',
    plazos: [],
    detallesCredito: {},
  },
  netRemuneration: null,
  creditConditions: {},
  urlCarta: '',
})

export const getters = {
  currentComponent: (state) => pagesMoto.find((p) => p.step === state.step),
  responseCode: (state) => state.responseCode,
  productCode: (state) => state.productCode,
  codigoProspecto: (state) => state.prospectus.codigoProspecto,
  estadoProspecto: (state) => state.prospectus.estadoProspecto,
  estadoCivil: (state) => state.prospectus.estadoCivil,
  maximumAmountFinance: (state) => state.prospectus.mafmax,
  plazos: (state) => state.prospectus.plazos,
  creditConditions: (state) => state.creditConditions,
  creditDetails: (state) => state.prospectus.detallesCredito,
  email: (state) => state.prospectus.correo,
  cellPhoneNumber: (state) => state.prospectus.telefono,
  documentos: (state) => state.prospectus.documentos,
  listaDocumentosRegistrar: (state) =>
    state.prospectus.listaDocumentosRegistrar,
  nombreTitular: (state) => state.prospectus.nombreTitular.split(' ').shift(),
  apellidoPaterno: (state) => state.prospectus.apellidoPaterno,
  apellidoMaterno: (state) => state.prospectus.apellidoMaterno,
  urlCarta: (state) => state.urlCarta,
  netRemuneration: (state) => state.netRemuneration,
}

export const mutations = {
  SET_PROSPECT(state, data) {
    state.responseCode = data.codRes
    state.prospectus = { ...state.prospectus, ...data.prospecto }
  },
  SET_CREDIT_CONDITIONS(state, data) {
    state.creditConditions = data
  },
  SET_STEP(state, value) {
    state.step = value
  },
  SET_URL_CARTA(state, value) {
    state.urlCarta = value.message
  },
  SET_UPLOADED_DOCUMENTS(state, data) {
    state.prospectus.documentos = data
  },
  SET_PRODUCT_CODE(state, value) {
    state.productCode = value
  },
  CLEAR_ALL(state) {
    state.step = codPage.PRE_EVALUATION
    state.hasCreditConditions = false
    state.responseCode = ''
    state.prospectus = {}
    state.creditConditions = {}
  },
  SET_NET_REMUNERATION(state, value) {
    state.netRemuneration = value
  },
}

export const actions = {
  async sendPreevaluation({ commit }, data) {
    try {
      this.$showSpinner(true)
      const response = await apiSendPreevaluation(this.$axios, data)
      commit('users/SET_PRODUCT_CODE', response.prospecto.codigoProducto, {
        root: true,
      })
      commit('SET_PRODUCT_CODE', response.prospecto.codigoProducto)
      commit('SET_PROSPECT', response)
      this.$showSpinner(false)
    } catch (error) {
      this.$showSpinner(false)
      throw error
    }
  },
  async registrationPersonalData({ commit }, data) {
    try {
      this.$showSpinner(true)
      const response = await apiRegistrationPersonalData(this.$axios, data)
      commit('SET_PROSPECT', response)
    } catch (error) {
      this.$showSpinner(false)
      throw error
    }
  },
  async simulateCreditConditions({ commit }, data) {
    try {
      this.$showSpinner(true)
      const { simulacion } = await apiSimulateCreditConditions(
        this.$axios,
        data
      )
      commit('SET_CREDIT_CONDITIONS', simulacion)
      this.$showSpinner(false)
    } catch (error) {
      this.$showSpinner(false)
      throw error
    }
  },
  async confirmCreditConditions({ commit }, data) {
    try {
      this.$showSpinner(true)
      const response = await apiConfirmCreditConditions(this.$axios, data)
      commit('SET_PROSPECT', response)
      this.$showSpinner(false)
    } catch (error) {
      this.$showSpinner(false)
      throw error
    }
  },
  async sendApprovalLetter({ commit }, data) {
    try {
      this.$showSpinner(true)
      await apiSendApprovalLetter(this.$axios, data)
      this.$showSpinner(false)
    } catch (error) {
      this.$showSpinner(false)
      throw error
    }
  },
  async getCartaAprobacion({ state, commit }, data) {
    try {
      this.$showSpinner(true)
      let response = null
      if (
        state.productCode === ProductCode.MOTO_NO_BANCARIADOS ||
        (state.productCode === ProductCode.MOTO &&
          state.prospectus.estadoProspecto === 90 || this.estadoProspecto === 92)
      ) {
        response = await apiObtenerCartaMotoBancarizador(this.$axios, data)
      } else {
        response = await apiObtenerCartaMoto(this.$axios, data)
      }
      commit('SET_URL_CARTA', response)
      this.$showSpinner(false)
    } catch (error) {
      this.$showSpinner(false)
      throw error
    }
  },
  async attachFile({ commit }, data) {
    try {
      this.$showSpinner(true)
      await apiAttachFile(this.$axios, data)
      this.$showSpinner(false)
    } catch (error) {
      this.$showSpinner(false)
      throw error
    }
  },
  async changeStateFinal({ commit }, data) {
    try {
      this.$showSpinner(true)
      const response = await apiChangeStateFinal(this.$axios, data)
      commit('SET_PROSPECT', response)
      this.$showSpinner(false)
    } catch (error) {
      this.$showSpinner(false)
      throw error
    }
  },
  async contactStatusChanges({}, data) {
    try {
      this.$showSpinner(true)
      await apiContactStatusChanges(this.$axios, data)
      this.$showSpinner(false)
    } catch (error) {
      this.$showSpinner(false)
      throw error
    }
  },
  async consultProspectus({ commit }, idProspecto) {
    try {
      this.$showSpinner(true)
      await apiConsultProspectus(this.$axios, idProspecto)
      this.$showSpinner(false)
    } catch (error) {
      this.$showSpinner(false)
      throw error
    }
  },
}
