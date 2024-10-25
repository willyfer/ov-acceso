import {
  lde,
  apiFacialBiometriy,
  apiFacialBiometryRecord,
  apiSimularCredito,
  apiConfirmarSimulacion,
} from '~/api/prospecto'
import { apiGenerarTokenNew, apiValidarTokenNew } from '~/api/authentication'
import { codPage, pagesCredinstante } from '~/enums/credinstante-enums'

const expressForm = {
  codigoProducto: 0, // default
  tipoDocumento: 1, // 1: documento, 2 : carnet extranjeria
  documento: '', // 8 documento, 9 ce 43085939
  placa: '', // 6 DIGITOS AUV612
  fechaNacimiento: null, // FORMATO
  canalAtencion: 2, // DEFAULT 2 CANAL WEB
  origen: 4, // default
  channel: 1, // default
  codigoUsuario: null, // default por el momento
  codigoEntidad: 1, // default por el momento
  recorridoxDia: null, // 	1: 0 - 50 Km ,2: 51 - 100 Km ,3: más de 100 Km
  telefono: '', //'941885678',
  email: '', //'diego.urbina@acceso.com.pe',
  terms: '1',
  sede: null,
  isCheckValorados: [], // signture,
  sectorEconomico: null,
  importeFinanciar: null,
  cuotas: null,
  importeCuotas: null,
  tasa: null,
  anioFabricacion: null,
  sitCrediticia: false,
  estadoBio: false,
  tipoPago: null,
  selectCuenta: null,
  cuentaBanco: null,
  selectOficina: null,
  departamento: null,
  provincia: null,
  distrito: null,
  ubigeo: null,
}

export const state = () => ({
  step: codPage.PRE_EVALUATION,
  datos: expressForm,
  quizArray: [],
  numberOfQuestions: 0,
  validationQuestions: [],
  codProspecto: null,
  ofertas: [],
  body_valida: {},
  resElegirOferta: {},
  resConfirmarDatos: {},
  tipoDesembolso: '',
  responseVerifyJWT: {},
  isBiometricFacial: null,
})

export const getters = {
  currentComponent: (state) =>
    pagesCredinstante.find((p) => p.step === state.step),
  datos: (state) => state.datos,
  ofertas: (state) => state.ofertas, //agregado max
  resConfirmarDatos: (state) => state.resConfirmarDatos,
  numberOfQuestions: (state) => state.numberOfQuestions,
  validationQuestions: (state) => state.validationQuestions,
  isBiometricFacial: (state) => state.isBiometricFacial,
  plazos: (state) => (state.datos.plazos ? state.datos.plazos.split(',') : []),
}

export const mutations = {
  SET_STEP(state, value) {
    state.step = value
  },
  SET_RESPONSE_JWT(state, payload) {
    state.responseVerifyJWT = payload
  },
  SET_TIPO_DESEMBOLSO(state, payload) {
    state.tipoDesembolso = payload
  },

  UPDATE_DATOS(state, payload) {
    state.datos = {
      ...state.datos,
      ...payload,
    }
  },
  UPDATE_DATOS_SED(state, payload) {
    state.datosSede = {
      ...state.datosSede,
      ...payload,
    }
  },
  UPDATE_LOGIN_MODAL(state, payload) {
    state.loginModal = payload
  },
  RESET_STATES(state) {
    state.datos = {
      ...expressForm,
    }
  },
  SET_DIALOG(state, payload) {
    state.dialogstate = payload
  },

  /** añadido por Diego Q */
  SET_QUIZ(state, payload) {
    state.quizArray = payload
    state.validationQuestions = payload.data
    state.numberOfQuestions = payload.data.length
  },

  SET_COD_PROSP(state, payload) {
    state.codProspecto = payload
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
}

export const actions = {
  async preEvaluate({ commit, state, rootState }) {
    try {
      alert('crediisntante');
      const data = {
        ...state.datos,
        codigoEntidad: rootState.users.promotor.codigoEntidad,
        codigoUsuario: rootState.users.promotor.codigoUsuario,
        terms: true,
      }
      commit('ui/UPDATE_STEP', -1, { root: true })
      const response = await this.$axios({
        url: '/v4/prospecto/v2.0/producto/lde',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: process.env.BASIC_AUTH,
        },
        data,
      })
      console.log('preEvaluate: ', response.data)
      let dialog = {
        estado: true,
        mensaje: null,
        imgModal: null,
        tituloModal: null,
      }
      if (response.data.codigoRespuesta === '00') {
        console.log('entro a 00')
        commit('UPDATE_DATOS', response.data)
        if (response.data.estadoProspecto === 0) {
          // viene estado prospecto 1 12 7
          this.$gtag('event', 'conversion', {
            send_to: process.env.SEND_TO_ADS,
          })
          dialog.estado = false
          commit('ui/UPDATE_STEP', 2, { root: true })
          return response.data
        } else if (response.data.estadoProspecto === 11) {
          dialog.mensaje = 'Ya cuenta con crédito Activado.'
          commit('ui/UPDATE_STEP', 1, { root: true })
          commit('RESET_STATES')
        } else if (response.data.estadoProspecto === 4) {
          commit('ui/UPDATE_STEP', 9, { root: true })
          dialog.estado = false
        } else if (response.data.estadoProspecto === 2) {
          dialog.mensaje = 'Tu evaluación esta en proceso'
          commit('RESET_STATES')
        } else {
          commit('ui/UPDATE_STEP', 1, { root: true })
          dialog.mensaje = 'Ya cuenta con solicitud en proceso'
          commit('RESET_STATES')
        }
      } else if (response.data.codigoRespuesta == '01') {
        commit('ui/UPDATE_STEP', 1, { root: true })
        dialog.mensaje = 'Ya cuenta con solicitud en proceso'
        commit('RESET_STATES')
      } else if (response.data.codigoRespuesta == '03') {
        this.$fb.track('Desaprobado')
        commit('ui/UPDATE_STEP', 1, { root: true })
        dialog.mensaje =
          'En esos momentos no podemos ofrecerle una oferta, favor intente en otro momento'
        commit('RESET_STATES')
      } else if (response.data.codigoRespuesta == '04') {
        dialog.imgModal = 'success'
        dialog.tituloModal = '¡Felicidades!'
        dialog.mensaje = `Ya tenemos un préstamo aprobado para ti
            <br>
            Dale click <a href="https://oficina.acceso.com.pe/renovacion">aquí</a> para solicitarlo
          `
        commit('RESET_STATES')
      } else {
        ;(dialog.mensaje =
          'En en estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.'),
          commit('RESET_STATES')
      }
      commit(
        'ui/SET_OPENDIALOGALERT',
        {
          imgModal: dialog.imgModal ? dialog.imgModal : 'warning',
          tituloModal: dialog.tituloModal ? dialog.tituloModal : '¡Alerta!',
          msgModal: dialog.mensaje,
          maxWidth: 350,
          estadoModal: dialog.estado,
          isReset: true,
        },
        { root: true }
      )
    } catch (error) {
      console.log('soy el error ')
      commit(
        'ui/SET_OPENDIALOGALERT',
        {
          imgModal: 'error',
          tituloModal: 'Error!',
          msgModal:
            'En en estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.',
          maxWidth: 350,
          estadoModal: true,
          isReset: true,
        },
        { root: true }
      )
    }
  },
  async updateProspecto({ commit, state }, data) {
    /* console.log('UPDATE') */
    /* console.log(data) */
    const response = await this.$axios({
      url: '/v4/prospecto/v2.0/producto/lde?tipo=0',
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: process.env.BASIC_AUTH,
      },
      data,
    })

    console.log('RESPUESTA UPDATE PROSPECTO', response.data)
    commit('SET_DIALOG', true)
  },
  async enviarDocumentos({ commit, state }, payload) {
    try {
      commit('ui/UPDATE_STEP', -1, { root: true })
      const data = {
        placa: state.datos.placa,
        documento: state.datos.documento,
        codigoProspecto: state.datos.codigoProspecto,
        estadoProspecto: state.datos.estadoProspecto,
        codigoProducto: state.datos.codigoProducto,
        channel: state.datos.channel,
        codigoEvaluacion: state.datos.codigoEvaluacion,
        fileDNI: payload.arrayDocuments[0],
        fileReniec: payload.arrayDocuments[1],
      }
      /* console.log('body') */
      /* console.log(data) */
      const url = `/v4/prospecto/v2.0/producto/lde?tipo=${
        state.datos.codigoCredito ? 0 : 2
      }`
      /* console.log('url: ', url, 'contrato : ', state.datos.codigoCredito) */
      const response = await this.$axios({
        url,
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          Authorization: process.env.BASIC_AUTH,
        },
        data,
      })
      if (response.data.codigoRespuesta == '00') {
        commit('UPDATE_DATOS', response.data)
        commit('ui/UPDATE_STEP', 3, { root: true })
      } else {
        commit('ui/UPDATE_STEP', 1, { root: true })
        commit(
          'ui/SET_OPENDIALOG',
          {
            estado: true,
            mensaje: 'Ha ocurrido un error interno',
          },
          { root: true }
        )
        commit('RESET_STATES')
      }
    } catch (error) {
      /* console.log(error) */
    }
  },
  async enviarFichaReniec({ commit, state }, payload) {
    try {
      commit('ui/UPDATE_STEP', -1, { root: true })
      /* console.log('PAYLOAD:  ', payload) */
      const url = `/v4/prospecto/v2.0/producto/lde?tipo=${
        state.datos.codigoCredito ? 0 : 2
      }`

      /* console.log('url: ', url, 'contrato : ', state.datos.codigoCredito) */
      const response = await this.$axios({
        url,
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          Authorization: process.env.BASIC_AUTH,
        },
        data: payload,
      })
      /* console.log('respuesta expediente: ', response.data) */
      // commit('UPDATE_DATOS', response.data)
      return response.data
      /*     if (response.data.codigoRespuesta == '00') {
        commit('UPDATE_DATOS', response.data)
        commit('ui/UPDATE_STEP', 3, { root: true })
      } else {
        commit('ui/UPDATE_STEP', 1, { root: true })
        commit(
          'ui/SET_OPENDIALOG',
          {
            estado: true,
            mensaje: 'Ha ocurrido un error interno'
          },
          { root: true }
        )
        commit('RESET_STATES')
      } */
    } catch (error) {
      commit(
        'ui/SET_OPENDIALOG',
        {
          estado: true,
          mensaje: 'Error al enviar ficha reniec',
        },
        { root: true }
      )
    }
  },
  async enviarDocValorados({ commit, state, rootState }, payload) {
    try {
      /* console.log('update_valorados') */
      /* console.log(state.datos) */
      commit('ui/UPDATE_STEP', -1, { root: true })
      const data = {
        placa: state.datos.placa,
        documento: state.datos.documento,
        codigoProspecto: state.datos.codigoProspecto,
        estadoProspecto: 10,
        codigoProducto: state.datos.codigoProducto,
        codigoExpediente: state.datos.codigoExpediente,
        codigoUsuario: rootState.users.promotor.codigoUsuario,
        channel: state.datos.channel,
        tokenSMS: state.datos.tokenSMS,
        fi_hojres: state.datos.fi_hojres,
        fi_solcre: state.datos.fi_solcre,
        fi_contra: state.datos.fi_contra,
        fi_cronog: state.datos.fi_cronog,
        fi_carins: state.datos.fi_carins,
      }
      /* console.log('valorados') */
      /* console.log(data) */
      const response = await this.$axios({
        url: '/v4/prospecto/v2.0/producto/lde?tipo=3',
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          Authorization: process.env.BASIC_AUTH,
        },
        data,
      })
      if (response.data.codigoRespuesta === '00') {
        commit('UPDATE_DATOS', response.data)
        commit('ui/UPDATE_STEP', 4, { root: true })
      } else {
        commit('ui/UPDATE_STEP', 1, { root: true })
        commit(
          'ui/SET_OPENDIALOG',
          {
            estado: true,
            mensaje: 'Ha ocurrido un error interno',
          },
          { root: true }
        )
        commit('RESET_STATES')
      }
    } catch (error) {
      /* console.log(error) */
    }
  },
  async obtenerFichaReniec({ commit, state }, payload) {
    /* console.log('Action documento: ', payload) */
    const response = await this.$axios({
      url: '/v8/externos/v2.0/reniec/ficha',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: process.env.BASIC_AUTH,
      },
      data: {
        documento: payload.documento,
      },
    })
    const idGenero =
      response.data.js_ficren.data.GENDER == 'MASCULINO' ? 'M' : 'F'
    let codEstadoCivil
    switch (response.data.js_ficren.data.CIVIL_STATUS) {
      case 'Soltero':
        codEstadoCivil = 'SO'
        break
      case 'Casado':
        codEstadoCivil = 'CA'
        break
      case 'Viudo':
        codEstadoCivil = 'VI'
        break
      case 'Divorciado':
        codEstadoCivil = 'DI'
        break
      default:
        codEstadoCivil = 'NA'
        break
    }
    /* console.log("codEstadoCivil",codEstadoCivil); */
    const update = {
      apellidoPaterno: response.data.apellidoPaterno,
      apellidoMaterno: response.data.apellidoMaterno,
      nombres: response.data.nombres,
      genero: idGenero,
      estadoCivil: codEstadoCivil,
      jsonReniec: {
        co_resbio: payload.co_resbio, //payload - scoket
        co_trazas: payload.co_trazas, //payload - scoket
        fi_huella: payload.fi_huella, //data - scoket
        js_ficren: response.data.js_ficren, // response.data
        fi_ficren: response.data.fi_ficren,
      },
    }
    /* console.log('Ver objeto datos: ', update) */
    commit('UPDATE_DATOS', update)
    /* console.log('Respuesta action document ', response.data) */

    return response.data
  },
  async actionGenerarTokenNew({ commit }, payload) {
    try {
      const responseGenerarTokenNew = await apiGenerarTokenNew(
        this.$axios,
        payload
      )
      if (responseGenerarTokenNew.resultado[0].co_estado !== '00') {
        throw new Error(
          'En estos momentos no podemos enviar el token, por favor inténtalo en unos minutos.'
        )
      }
    } catch (error) {
      commit(
        'ui/SET_OPENDIALOGALERT',
        {
          imgModal: 'error',
          tituloModal: 'Error!',
          msgModal:
            'En en estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.',
          maxWidth: 350,
          estadoModal: true,
          isReset: true,
        },
        { root: true }
      )
    }
  },
  async actionValidarTokenNew({ commit }, payload) {
    try {
      const responseValidarTokenNew = await apiValidarTokenNew(
        this.$axios,
        payload
      )
      if (responseValidarTokenNew.resultado[0].co_estado === '00') {
        commit('ui/UPDATE_STEP', 3, { root: true })
      } else if (responseValidarTokenNew.resultado[0].co_estado === '03') {
        commit(
          'ui/SET_OPENDIALOGALERT',
          {
            imgModal: 'warning',
            tituloModal: 'Token Incorrecto!',
            msgModal: 'Por favor vuelva a intentarlo',
            maxWidth: 350,
            estadoModal: true,
          },
          { root: true }
        )
      } else {
        throw new Error(
          'En en estos momentos no podemos validar tu token, por favor inténtalo en unos minutos.'
        )
      }
    } catch (error) {
      commit(
        'ui/SET_OPENDIALOGALERT',
        {
          imgModal: 'error',
          tituloModal: 'Error!',
          msgModal:
            'En en estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.',
          maxWidth: 350,
          estadoModal: true,
          isReset: true,
        },
        { root: true }
      )
    }
  },
  async actionSimularCredito({ commit }, payload) {
    try {
      const responseApiSimularCredito = await apiSimularCredito(payload)
      if (responseApiSimularCredito.data.codRes === '00') {
        commit('UPDATE_DATOS', {
          cuotaFinal: responseApiSimularCredito.data.data,
        })
      } else {
        throw new Error('Data incorrecta')
      }
    } catch (error) {
      commit(
        'ui/SET_OPENDIALOGALERT',
        {
          imgModal: 'error',
          tituloModal: 'Error!',
          msgModal:
            'En en estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.',
          maxWidth: 350,
          estadoModal: true,
        },
        { root: true }
      )
    }
  },
  async actionConfirmarSimulacion({ commit }, payload) {
    try {
      const responseApiConfirmarSimulacion = await apiConfirmarSimulacion(
        payload
      )
      if (responseApiConfirmarSimulacion.data.codRes === '00') {
        commit('ui/UPDATE_STEP', 4, { root: true })
      } else {
        throw new Error(
          'En en estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.'
        )
      }
    } catch (error) {
      commit(
        'ui/SET_OPENDIALOGALERT',
        {
          imgModal: 'error',
          tituloModal: 'Error!',
          msgModal:
            'En en estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.',
          maxWidth: 350,
          estadoModal: true,
        },
        { root: true }
      )
    }
  },
  async actionLlamadaToken({ commit }, payload) {
    try {
      const responseApiGenerarTokenNew = await apiGenerarTokenNew(
        this.$axios,
        payload
      )
      if (responseApiGenerarTokenNew.codRes !== '00') {
        throw new Error(
          'En en estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.'
        )
      }
    } catch (error) {
      console.log('actionLlamadaToken: ', error)
      commit(
        'ui/SET_OPENDIALOGALERT',
        {
          imgModal: 'error',
          tituloModal: 'Error!',
          msgModal:
            'En en estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.',
          maxWidth: 350,
          estadoModal: true,
        },
        { root: true }
      )
    }
  },

  /* PROYECTO RETANQUEO */
  async errorManagment(e) {
    try {
      await this.$axios({
        url: 'http://localhost:5000/errors',
        method: 'POST',
        data: {
          id: Date.now(),
          /* error: {
              message: error.message,
              stack: error.stack,
              config: {
                url: error.config.url,
                method: error.config.method,
                data: error.config.data
              }
            },
 */ step: e,

          product: 'renovacion',
        },
      })
    } catch (error) {
      console.log(error)
    }
  },
  async validaCliente({ commit, state }, payload) {
    console.log('payload: ', payload)
    try {
      const { data } = await this.$axios({
        url: '/kong/prospecto/v1.0/producto/retanqueo/ov',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.BASIC_AUTH_KONG,
        },
        data: {
          channel: payload.channelForm,
          codigoProducto: payload.codigoProductoForm,
          tipoDocumento: payload.tipoDocForm,
          documento: payload.documentoForm,
          placa: payload.placaForm,
        },
      })
      return data
    } catch (error) {
      throw new Error(
        'En estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.'
      )
    }
  },
  async validaClienteFae({ commit, state }, payload) {
    console.log('payload: ', payload)
    try {
      const { data } = await this.$axios({
        url: '/kong/prospecto/v1.0/producto/fae/ov',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.BASIC_AUTH_KONG,
        },
        data: {
          channel: payload.channelForm,
          codigoProducto: payload.codigoProductoForm,
          tipoDocumento: payload.tipoDocForm,
          documento: payload.documentoForm,
          placa: payload.placaForm,
        },
      })
      return data
    } catch (error) {
      throw new Error(
        'En estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.'
      )
    }
  },
  async obtenerPreguntas({ commit }, codigoProspecto) {
    try {
      const { data } = await this.$axios({
        url: `/kong/prospecto/v1.0/producto/preguntas/${codigoProspecto}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.BASIC_AUTH_KONG,
        },
      })
      commit(
        'SET_QUIZ',
        data
      ) /** NO SE COLOCA "express/" YA QUE ESTAMOS EN EL MISMO SCRIPT .JS */
      //commit('SET_COD_PROSP', codigoProducto)
      return data
    } catch (error) {
      throw new Error(
        'En estos momentos no se puede obtener las preguntas, por favor inténtalo en unos minutos.'
      )
    }
  },
  async validaPreguntas({}, payload) {
    try {
      const { data } = await this.$axios({
        url: '/kong/prospecto/v1.0/producto/preguntas',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.BASIC_AUTH_KONG,
        },
        data: payload,
      })

      return data
    } catch (error) {
      throw new Error(
        'En estos momentos no se puede validar las preguntas, por favor inténtalo en unos minutos.'
      )
    }
  },
  async elegirOferta({}, payload) {
    try {
      const { data } = await this.$axios({
        //url: '/private/prospecto/v1.0/producto/retanqueo/0',
        url: '/kong/prospecto/v2.0/producto/lde?tipo=0',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          //Authorization: process.env.BASIC_AUTH_KONG
          Authorization: process.env.BASIC_AUTH_KONG,
        },
        data: payload,
      })
      return data
    } catch (error) {
      throw new Error(
        'En estos momentos no se puede procesar tu oferta, por favor inténtalo en unos minutos.'
      )
    }
  },
  async confirmarDatos({}, payload) {
    try {
      const { data } = await this.$axios({
        url: '/kong/prospecto/v2.0/producto/lde?tipo=2',
        //url: 'https://sd1.accesocrediticio.com/ms/prospecto/v2.0/producto/lde?tipo=2',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.BASIC_AUTH_KONG,
        },
        data: payload,
      })

      return data
    } catch (error) {
      throw new Error(
        'En estos momentos no podemos actualizar tus datos, por favor inténtalo en unos minutos.'
      )
    }
  },
  async validarGenerarContractuales({}, payload) {
    try {
      const { data } = await this.$axios({
        url: '/kong/contratos/v1.0/contratos',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.BASIC_AUTH_KONG,
        },
        data: payload,
      })
      return data
    } catch (error) {
      throw new Error(
        'En estos momentos no podemos generar tus contratos, por favor inténtalo en unos minutos.'
      )
    }
  },

  async validaJWT({}, codigoContrato) {
    try {
      const { data } = await this.$axios({
        url: `/kong/credito/v1/validar-creditos?codigoContrato=${codigoContrato}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.BASIC_AUTH_KONG,
        },
        // data: payload
      })
      return data
    } catch (error) {
      throw new Error(
        'En estos momentos no podemos generar tus contratos, por favor inténtalo en unos minutos.'
      )
    }
  },

  //momentaneo
  async generateTokenCuentaBancaria({}, payload) {
    try {
      const { data } = await this.$axios({
        url: '/v7/private/v1.0/generarTokenNewSms',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.BASIC_AUTH,
        },
        data: payload,
      })
      return data
    } catch (error) {
      throw new Error(
        'En estos momentos no podemos generar tus contratos, por favor inténtalo en unos minutos.'
      )
    }
  },
  async validatedTokenCuentaBancaria({}, payload) {
    try {
      const { data } = await this.$axios({
        url: '/v7/private/v1.0/validarTokenNew',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.BASIC_AUTH,
        },
        data: payload,
      })
      return data
    } catch (error) {
      throw new Error(
        'En estos momentos no podemos generar tus contratos, por favor inténtalo en unos minutos.'
      )
    }
  },

  async updateTokenCuentaBancaria({}, payload) {
    try {
      const { data } = await this.$axios({
        url: '/v4/credito/v1/actualizarCreExpPro',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.BASIC_AUTH,
        },
        data: payload,
      })
      return data
    } catch (error) {
      throw new Error(
        'En estos momentos no podemos generar tus contratos, por favor inténtalo en unos minutos.'
      )
    }
  },

  /* PROYECTO CAMPAÑA CONVERSIONES */
  async validaCampanaConversiones({ commit }, payload) {
    try {
      const dataLde = await lde(payload)
      let dialog = {
        estado: true,
        mensaje: null,
        imgModal: null,
        tituloModal: null,
      }
      console.log('dataLde: ', dataLde)
      if (dataLde.codigoRespuesta === '00') {
        commit('UPDATE_DATOS', dataLde)
        if (dataLde.estadoProspecto === 11) {
          dialog.mensaje = 'Ya cuenta con crédito Activado.'
          commit('ui/UPDATE_STEP', 1, { root: true })
          commit('RESET_STATES')
        } else if (dataLde.estadoProspecto === 4) {
          this.$gtag('event', 'conversion', {
            send_to: process.env.SEND_TO_ADS,
          })
          commit('ui/UPDATE_STEP', 3, { root: true })
          dialog.estado = false
        } else if (dataLde.estadoProspecto === 2) {
          dialog.mensaje = 'Tu evaluación esta en proceso'
          commit('RESET_STATES')
        } else {
          commit('ui/UPDATE_STEP', 1, { root: true })
          dialog.mensaje = 'Ya cuenta con solicitud en proceso'
          commit('RESET_STATES')
        }
      } else if (dataLde.codigoRespuesta == '01') {
        commit('ui/UPDATE_STEP', 1, { root: true })
        dialog.mensaje = 'Ya cuenta con solicitud en proceso'
        commit('RESET_STATES')
      } else if (dataLde.codigoRespuesta == '03') {
        this.$fb.track('Desaprobado')
        commit('ui/UPDATE_STEP', 1, { root: true })
        dialog.mensaje =
          'En esos momentos no podemos ofrecerle una oferta, favor intente en otro momento'
        commit('RESET_STATES')
      } else if (dataLde.codigoRespuesta == '04') {
        dialog.imgModal = 'success'
        dialog.tituloModal = '¡Felicidades!'
        dialog.mensaje = `Ya tenemos un préstamo aprobado para ti
            <br>
            Dale click <a href="https://oficina.acceso.com.pe/renovacion">aquí</a> para solicitarlo
          `
        commit('RESET_STATES')
      } else if (dataLde.codigoRespuesta == '05') {
        dialog.imgModal = 'warning'
        dialog.tituloModal = 'Estimado Cliente'
        dialog.mensaje = 'Usted no se encuentra calificado para esta campaña'
        commit('RESET_STATES')
      } else {
        ;(dialog.mensaje =
          'En en estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.'),
          commit('RESET_STATES')
      }
      commit(
        'ui/SET_OPENDIALOGALERT',
        {
          imgModal: dialog.imgModal ? dialog.imgModal : 'warning',
          tituloModal: dialog.tituloModal ? dialog.tituloModal : '¡Alerta!',
          msgModal: dialog.mensaje,
          maxWidth: 350,
          estadoModal: dialog.estado,
          isReset: false,
        },
        { root: true }
      )
    } catch (error) {
      commit(
        'ui/SET_OPENDIALOGALERT',
        {
          imgModal: 'error',
          tituloModal: 'Error!',
          msgModal:
            'En en estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.',
          maxWidth: 350,
          estadoModal: true,
          isReset: false,
        },
        { root: true }
      )
    }
  },

  /* PROYECTO BIOMETRIA FACIAL */
  async actionFacialBiometriy({ commit }, payload) {
    try {
      commit('ui/UPDATE_STEP', 0, { root: true })
      const responseApiFacialBiometriy = await apiFacialBiometriy(payload)
      if (responseApiFacialBiometriy.data.codRes === '00') {
        if (
          responseApiFacialBiometriy.data.repeatBiometric &&
          responseApiFacialBiometriy.data.contador < 2
        ) {
          commit(
            'ui/SET_OPENDIALOGALERT',
            {
              imgModal: 'warning',
              tituloModal: '¡Estimado Cliente!',
              msgModal: 'Por favor vuelva a intentar su verificación facial.',
              maxWidth: 350,
              estadoModal: true,
            },
            { root: true }
          )
          commit('ui/UPDATE_STEP', 7, { root: true })
        } else {
          commit('ui/UPDATE_STEP', 8, { root: true })
        }
      } else {
        throw new Error(
          'En estos momentos no podemos validar tu información, por favor inténtalo en unos minutos.'
        )
      }
    } catch (error) {
      commit(
        'ui/SET_OPENDIALOGALERT',
        {
          imgModal: 'error',
          tituloModal: 'Estimado Cliente',
          msgModal:
            'En estos momentos no podemos validar tu información, por favor inténtalo en unos minutos.',
          maxWidth: 350,
          estadoModal: true,
        },
        { root: true }
      )
      commit('ui/UPDATE_STEP', 7, { root: true })
    }
  },
  async actionFacialBiometryRecord({ commit }, payload) {
    try {
      const responseApiFacialBiometryRecord = await apiFacialBiometryRecord(
        payload
      )
      if (responseApiFacialBiometryRecord.data.codRes === '00') {
        if (payload.metodo === 1) {
          if (responseApiFacialBiometryRecord.data.isBiometric) {
            commit('ui/UPDATE_STEP', 7, { root: true })
          } else {
            commit('ui/UPDATE_STEP', 8, { root: true })
          }
        }
      } else {
        throw new Error(
          'En estos momentos no podemos validar tu información, por favor inténtalo en unos minutos.'
        )
      }
    } catch (error) {
      console.log(error)
      commit(
        'ui/SET_OPENDIALOGALERT',
        {
          imgModal: 'error',
          tituloModal: 'Estimado Cliente',
          msgModal:
            'En estos momentos no podemos validar tu información, por favor inténtalo en unos minutos.',
          maxWidth: 350,
          estadoModal: true,
        },
        { root: true }
      )
    }
  },
  async actionExceptionCaptured({ commit }, payload) {
    try {
      console.log('actionExceptionCaptured: ', payload)
      await apiFacialBiometryRecord(payload)
      commit('ui/UPDATE_STEP', 8, { root: true })
    } catch (error) {
      console.log(error)
      commit('ui/UPDATE_STEP', 8, { root: true })
    }
  },
  resetStates({ commit }) {
    /* console.log('reset') */
    commit('RESET_STATES')
    commit('ui/UPDATE_STEP', 1, { root: true })
  },
}
