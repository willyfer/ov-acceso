import {
  validaProspecto,
  lde,
  preguntas,
  enviarPreguntas,
  crearExpediente,
} from '~/api/prospecto'
import { politicas } from '~/api/evaluacion'
import { contratos } from '~/api/contratos'
import { verify } from 'jsonwebtoken'

export async function continuarProceso({ commit }) {
  try {
    const params = new URLSearchParams(location.search)
    const datosProceso = params.get('process')
    if (datosProceso) {
      let dialog = {
        estadoModal: true,
        imgModal: null,
        tituloModal: null,
        msgModal: null,
      }
      const decoded = await verify(datosProceso, process.env.NUXT_KEYJWT)
      const bodyValidaProspecto = {
        channel: decoded.channel,
        codigoProducto: decoded.codigoProducto,
        documento: decoded.documento,
        placa: decoded.placa,
      }
      const dataValidaProspecto = await validaProspecto(bodyValidaProspecto)
      if (dataValidaProspecto.co_estado === '00') {
        if (dataValidaProspecto.ti_estpro === 2) {
          dialog.imgModal = 'success'
          dialog.tituloModal = 'Estimado Cliente'
          dialog.msgModal = 'Tu evaluación esta en proceso'
          resetEvaluacionDatos({ commit })
        } else if (dataValidaProspecto.ti_estpro === 14) {
          dialog.imgModal = 'success'
          dialog.tituloModal = 'Estimado Cliente'
          dialog.msgModal = 'Tu crédito está Pre-aprobado'
        } else if (
          (dataValidaProspecto.ti_estpro === 18 &&
            (decoded.codigoProducto === 19 || decoded.codigoProducto === 20)) ||
          (dataValidaProspecto.ti_estpro === 35 &&
            (decoded.codigoProducto === 21 || decoded.codigoProducto === 22))
        ) {
          dialog.estadoModal = false
          commit('conversiones/SET_DATOS', decoded, { root: true })
          commit('conversiones/SET_IS_BTN_OFERTA', true, { root: true })
          commit('ui/UPDATE_STEP', 4, { root: true })
        } else if (dataValidaProspecto.ti_estpro === 22) {
          dialog.imgModal = 'success'
          dialog.tituloModal = 'Estimado Cliente'
          dialog.msgModal = 'Ya cuenta con crédito Activado.'
          resetEvaluacionDatos({ commit })
        } else {
          dialog.imgModal = 'success'
          dialog.tituloModal = 'Estimado Cliente'
          dialog.msgModal = 'Ya cuenta con solicitud en proceso'
          resetEvaluacionDatos({ commit })
        }
      } else {
        dialog.imgModal = 'warning'
        dialog.tituloModal = 'Estimado Cliente'
        dialog.msgModal =
          'En esos momentos no podemos ofrecerle una oferta, favor intente en otro momento'
      }
      commit(
        'ui/SET_OPENDIALOGALERT',
        {
          imgModal: dialog.imgModal,
          tituloModal: dialog.tituloModal,
          msgModal: dialog.msgModal,
          maxWidth: 350,
          estadoModal: dialog.estadoModal,
        },
        { root: true }
      )
    } else {
      commit('ui/UPDATE_STEP', 2, { root: true })
    }
  } catch (error) {
    if (error.name == 'JsonWebTokenError') {
      commit(
        'ui/SET_OPENDIALOGALERT',
        {
          imgModal: 'warning',
          tituloModal: 'Lo sentimos!',
          msgModal: 'Asegúrese de usar correctamente el enlace.',
          maxWidth: 350,
          estadoModal: true,
          push: '/',
        },
        { root: true }
      )
    } else if (error.name == 'TokenExpiredError') {
      commit(
        'ui/SET_OPENDIALOGALERT',
        {
          imgModal: 'warning',
          tituloModal: 'Lo sentimos!',
          msgModal: 'Se venció el tiempo para acceder al enlace.',
          maxWidth: 350,
          estadoModal: true,
          push: '/',
        },
        { root: true }
      )
    } else {
      commit(
        'ui/SET_OPENDIALOGALERT',
        {
          imgModal: 'warning',
          tituloModal: 'Lo sentimos!',
          msgModal:
            'En estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos',
          maxWidth: 350,
          estadoModal: true,
          push: '/',
        },
        { root: true }
      )
    }
  }
}

export async function preEvaluate({ commit, rootState }, payload) {
  try {
    const datosForm = {
      ...payload,
      codigoUsuario: rootState.users.promotor.codigoUsuario,
      canalAtencion: rootState.conversiones.datos.canalAtencion,
      channel: rootState.conversiones.evaluacionDatos.channel,
      origen: rootState.conversiones.evaluacionDatos.origen,
      sitCrediticia: rootState.conversiones.datos.sitCrediticia,
      terms: true,
    }
    const dataPreEvaluate = await lde(datosForm)
    let dialog = {
      estadoModal: true,
      imgModal: null,
      tituloModal: null,
      msgModal: null,
    }
    if (dataPreEvaluate.codRes === '00') {
      if (dataPreEvaluate.estadoProspecto === 0) {
        this.$gtag('event', 'conversion', {
          send_to: process.env.SEND_TO_ADS,
        })
        dialog.estadoModal = false
        commit('conversiones/SET_EVALUACION_DATOS', payload, { root: true })
        commit('conversiones/SET_DATOS', dataPreEvaluate, { root: true })
        commit('ui/UPDATE_STEP', 3, { root: true })
        commit('conversiones/SET_LOADING_FORM', false, { root: true })
      } else if (dataPreEvaluate.estadoProspecto === 2) {
        dialog.imgModal = 'success'
        dialog.tituloModal = 'Estimado Cliente'
        dialog.msgModal = 'Tu evaluación esta en proceso'
        resetEvaluacionDatos({ commit })
      } else if (dataPreEvaluate.estadoProspecto === 14) {
        dialog.imgModal = 'success'
        dialog.tituloModal = 'Estimado Cliente'
        dialog.msgModal = 'Tu crédito está Pre-aprobado'
      } else if (
        dataPreEvaluate.estadoProspecto === 18 ||
        dataPreEvaluate.estadoProspecto === 35
      ) {
        dialog.estadoModal = false
        commit('conversiones/SET_EVALUACION_DATOS', payload, { root: true })
        commit('conversiones/SET_DATOS', dataPreEvaluate, { root: true })
        commit('conversiones/SET_IS_BTN_OFERTA', true, { root: true })
        commit('ui/UPDATE_STEP', 4, { root: true })
        commit('conversiones/SET_LOADING_FORM', false, { root: true })
      } else if (dataPreEvaluate.estadoProspecto === 22) {
        dialog.imgModal = 'success'
        dialog.tituloModal = 'Estimado Cliente'
        dialog.msgModal = 'Ya cuenta con crédito Activado.'
        resetEvaluacionDatos({ commit })
      } else {
        dialog.imgModal = 'success'
        dialog.tituloModal = 'Estimado Cliente'
        dialog.msgModal = 'Ya cuenta con solicitud en proceso'
        resetEvaluacionDatos({ commit })
      }
    } else if (dataPreEvaluate.codRes === '01') {
      dialog.imgModal = 'success'
      dialog.tituloModal = 'Estimado Cliente'
      dialog.msgModal = 'Ya cuenta con solicitud en proceso'
      resetEvaluacionDatos({ commit })
    } else if (dataPreEvaluate.codRes === '03') {
      dialog.imgModal = 'warning'
      dialog.tituloModal = 'Estimado Cliente'
      dialog.msgModal =
        'En esos momentos no podemos ofrecerle una oferta, favor intente en otro momento'
      resetEvaluacionDatos({ commit })
    } else if (dataPreEvaluate.codigoRespuesta === '04') {
      dialog.imgModal = 'success'
      dialog.tituloModal = '¡Felicidades!'
      dialog.msgModal = `Ya tenemos un préstamo aprobado para ti
          <br>
          Dale click <a href="https://oficina.acceso.com.pe/renovacion">aquí</a> para solicitarlo
        `
      resetEvaluacionDatos({ commit })
    } else {
      dialog.imgModal = 'warning'
      dialog.tituloModal = 'Estimado Cliente'
      dialog.msgModal =
        'En esos momentos no podemos ofrecerle una oferta, favor intente en otro momento'
      resetEvaluacionDatos({ commit })
    }
    commit('conversiones/SET_LOADING_FORM', false, { root: true })
    commit(
      'ui/SET_OPENDIALOGALERT',
      {
        imgModal: dialog.imgModal,
        tituloModal: dialog.tituloModal,
        msgModal: dialog.msgModal,
        maxWidth: 350,
        estadoModal: dialog.estadoModal,
      },
      { root: true }
    )
    return dataPreEvaluate
  } catch (error) {
    commit(
      'ui/SET_OPENDIALOGALERT',
      {
        imgModal: 'error',
        tituloModal: 'Estimado Cliente',
        msgModal:
          'En esos momentos no podemos ofrecerle una oferta, favor intente en otro momento',
        maxWidth: 350,
        estadoModal: true,
      },
      { root: true }
    )
  }
}

export async function obtenerObservados({ commit }, codigoEvaluacion) {
  try {
    const dataObtenerObservados = await politicas(codigoEvaluacion)
    return dataObtenerObservados
  } catch (error) {
    commit(
      'ui/SET_OPENDIALOGALERT',
      {
        imgModal: 'error',
        tituloModal: 'Estimado Cliente',
        msgModal:
          'En estos momentos no se puede confirmar tu préstamo, por favor inténtalo en unos minutos.',
        maxWidth: 350,
        estadoModal: true,
      },
      { root: true }
    )
  }
}

export async function confirmarOferta({ commit }, payload) {
  try {
    commit('ui/UPDATE_STEP', 5, { root: true })
  } catch (error) {
    commit(
      'ui/SET_OPENDIALOGALERT',
      {
        imgModal: 'error',
        tituloModal: 'Estimado Cliente',
        msgModal:
          'En estos momentos no se puede confirmar tu préstamo, por favor inténtalo en unos minutos.',
        maxWidth: 350,
        estadoModal: true,
      },
      { root: true }
    )
  }
}

export async function obtenerPreguntas({ commit }, codigoProspecto) {
  try {
    const dataPreguntas = await preguntas(codigoProspecto)
    commit('conversiones/SET_QUIZ_ARRAY', dataPreguntas, { root: true })
    return dataPreguntas
  } catch (error) {
    commit(
      'ui/SET_OPENDIALOGALERT',
      {
        imgModal: 'error',
        tituloModal: 'Estimado Cliente',
        msgModal:
          'En estos momentos no se puede obtener las preguntas, por favor inténtalo en unos minutos.',
        maxWidth: 350,
        estadoModal: true,
      },
      { root: true }
    )
  }
}

export async function validaPreguntas({ commit }, payload) {
  try {
    const dataValidaPreguntas = await enviarPreguntas(payload)
    return dataValidaPreguntas
  } catch (error) {
    commit(
      'ui/SET_OPENDIALOGALERT',
      {
        imgModal: 'error',
        tituloModal: 'Estimado Cliente',
        msgModal:
          'En estos momentos no se puede validar las preguntas, por favor inténtalo en unos minutos.',
        maxWidth: 350,
        estadoModal: true,
      },
      { root: true }
    )
  }
}

export async function confirmarDatos({ state, commit }, payload) {
  try {
    let arrayDatos = []
    const arrayPromise1 = state.datos.arrayOfertas.map((item) => {
      if (item.codigoProducto === 24) {
        return crearExpediente({
          ...payload,
          codigoProducto: item.codigoProducto,
          codigoProspecto: item.codigoProspecto,
        })
      }
    })
    const resultPromesas1 = await Promise.all(arrayPromise1)
    const isErradoExpedientes1 = resultPromesas1.some((item) => {
      if (item) {
        arrayDatos.push(item)
        return item.codRes !== '00' && !item.codigoExpediente
      }
    })
    if (!isErradoExpedientes1) {
      const arrayPromise2 = state.datos.arrayOfertas.map((item) => {
        if (item.codigoProducto !== 24) {
          return crearExpediente({
            ...payload,
            codigoProducto: item.codigoProducto,
            codigoProspecto: item.codigoProspecto,
          })
        }
      })
      const resultPromesas2 = await Promise.all(arrayPromise2)
      const isErradoExpedientes2 = resultPromesas2.some((item) => {
        if (item) {
          arrayDatos.push(item)
          return item.codRes !== '00' && !item.codigoExpediente
        }
      })
      if (!isErradoExpedientes2) {
        commit('conversiones/SET_ARRAY_DATOS', arrayDatos, { root: true })
        commit('ui/UPDATE_STEP', 7, { root: true })
        return arrayDatos
      } else {
        throw new Error(
          'En estos momentos no podemos actualizar tus datos, por favor inténtalo en unos minutos.'
        )
      }
    } else {
      throw new Error(
        'En estos momentos no podemos actualizar tus datos, por favor inténtalo en unos minutos.'
      )
    }
  } catch (error) {
    commit(
      'ui/SET_OPENDIALOGALERT',
      {
        imgModal: 'error',
        tituloModal: '¡Error!',
        msgModal:
          'En estos momentos no podemos actualizar tus datos, por favor inténtalo en unos minutos.',
        maxWidth: 350,
        estadoModal: true,
        isReset: true,
      },
      { root: true }
    )
  }
}

export async function generarContratos({ commit }, payload) {
  try {
    const arrayPromise1 = payload.map((item) => {
      if (item.codigoProducto === 24) {
        return contratos(item)
      }
    })
    const resultPromesas1 = await Promise.all(arrayPromise1)

    const isErradoExpedientes1 = resultPromesas1.some((item) => {
      if (item) {
        return item.codRes !== '00'
      }
    })
    if (!isErradoExpedientes1) {
      const arrayPromise2 = payload.map((item) => {
        if (item.codigoProducto !== 24) {
          return contratos(item)
        }
      })
      const resultPromesas2 = await Promise.all(arrayPromise2)
      const isErradoExpedientes2 = resultPromesas2.some((item) => {
        if (item) {
          return item.codRes !== '00'
        }
      })
      if (!isErradoExpedientes2) {
        return {
          codRes: '00',
        }
      } else {
        return {
          codRes: '99',
        }
      }
    } else {
      return {
        codRes: '99',
      }
    }
  } catch (error) {
    commit(
      'ui/SET_OPENDIALOGALERT',
      {
        imgModal: 'error',
        tituloModal: '¡Error!',
        msgModal:
          'En estos momentos no podemos actualizar tus datos, por favor inténtalo en unos minutos.',
        maxWidth: 350,
        estadoModal: true,
        isReset: true,
      },
      { root: true }
    )
  }
}

export function setLoadingForm({ commit }, payload) {
  commit('conversiones/SET_LOADING_FORM', payload, { root: true })
}

export function resetEvaluacionDatos({ commit }) {
  commit(
    'conversiones/SET_EVALUACION_DATOS',
    {
      tipoDocumento: 1,
      documento: null,
      placa: null,
      categoriaVehiculo: null,
      telefono: null,
      email: null,
      codigoProducto: null,
    },
    { root: true }
  )
}

export function resetStates({ commit }) {
  /* resetEvaluacionDatos({ commit }) */
  commit('ui/UPDATE_STEP', 2, { root: true })
}
