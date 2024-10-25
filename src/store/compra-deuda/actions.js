import {
  apiValidaClienteRetanqueo,
  preguntas,
  enviarPreguntas,
  apiElegirOferta,
  crearExpediente,
  apiFacialBiometryRecord,
  apiFacialBiometriy,
} from '~/api/prospecto'
import { sendToken } from '~/api/authentication'
import { contratos } from '~/api/contratos'
import { codPage } from '~/enums/compra-deuda/pages'

export async function actionValidaCliente({ commit }, payload) {
  try {
    commit('SET_PROSPECT', { codRes: null })
    console.log('actionValidaCliente: ', payload)
    const responseApiValidaClienteRetanqueo = await apiValidaClienteRetanqueo(
      payload
    )
    commit('SET_PROSPECT', responseApiValidaClienteRetanqueo.data)
    commit('UPDATE_DATOS', responseApiValidaClienteRetanqueo.data)
  } catch (error) {
    console.log('errorActionValidaCliente: ', error)
    commit('SET_PROSPECT', { codRes: '99' })
  }
}

export async function actionObtenerPreguntas({ commit }, codigoProspecto) {
  try {
    commit('SET_PROSPECT', { codRes: null })
    const responsePreguntas = await preguntas(codigoProspecto)
    console.log('responsePreguntas.data: ', responsePreguntas.data)
    commit('SET_QUIZ', responsePreguntas.data)
  } catch (error) {
    console.log('errorActionObtenerPreguntas: ', error)
    throw error;
  }
}

export async function actionValidarPreguntas({ commit }, payload) {
  try {
    commit('SET_PROSPECT', { codRes: null })
    const responseEnviarPreguntas = await enviarPreguntas(payload)
    commit('SET_PROSPECT', responseEnviarPreguntas)
  } catch (error) {
    console.log('errorActionValidarPreguntas: ', error)
    commit('SET_PROSPECT', { codRes: '99' })
  }
}

export async function actionElegirOferta({ commit }, payload) {
  try {
    commit('SET_PROSPECT', { codRes: null })
    const responseApiElegirOferta = await apiElegirOferta(payload)
    commit('SET_PROSPECT', responseApiElegirOferta.data)
    commit('UPDATE_DATOS', responseApiElegirOferta.data)
  } catch (error) {
    console.log('errorActionElegirOferta: ', error)
    commit('SET_PROSPECT', { codRes: '99' })
  }
}

export async function actionCrearExpediente({ commit }, payload) {
  try {
    commit('SET_PROSPECT', { codRes: null })
    const responseCrearExpediente = await crearExpediente(payload)
    commit('SET_PROSPECT', responseCrearExpediente)
    commit('UPDATE_DATOS', responseCrearExpediente)
  } catch (error) {
    console.log('errorActionElegirOferta: ', error)
    commit('SET_PROSPECT', { codRes: '99' })
  }
}

export async function actionFacialBiometryRecord({ commit }, payload) {
  try {
    commit('SET_PROSPECT', { codRes: null })
    const responseApiFacialBiometryRecord = await apiFacialBiometryRecord(
      payload
    )
    if (responseApiFacialBiometryRecord.data.codRes === '00') {
      if (responseApiFacialBiometryRecord.data.isBiometric) {
        commit('SET_PROSPECT', { codRes: '00' })
      } else {
        commit('SET_PROSPECT', { codRes: '01' })
      }
    } else {
      throw new Error(
        'En en estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.'
      )
    }
  } catch (error) {    
    console.log('errorActionFacialBiometryRecord: ', error)
    commit('SET_PROSPECT', { codRes: '99' })
  }
}

export async function actionFacialBiometriy({ commit }, payload) {
  try {
    commit('SET_PROSPECT', { codRes: null })
    const responseApiFacialBiometriy = await apiFacialBiometriy(payload)
    if (responseApiFacialBiometriy.data.codRes === '00') {
      if (
        responseApiFacialBiometriy.data.repeatBiometric &&
        responseApiFacialBiometriy.data.contador < 2
      ) {
        commit('SET_PROSPECT', { codRes: '01' })
      } else {
        commit('SET_PROSPECT', { codRes: '00' })
      }
    } else {
      throw new Error(
        'En estos momentos no podemos validar tu información, por favor inténtalo en unos minutos.'
      )
    }
  } catch (error) {
    commit('SET_PROSPECT', { codRes: '99' })
    console.log('errorActionFacialBiometriy: ', error)
  }
}

export async function actionExceptionCaptured({ commit }, payload) {
  try {
    await apiFacialBiometryRecord(payload)
    commit('SET_STEP', codPage.ELECTRONIC_SIGNATURE)
  } catch (error) {
    commit('SET_STEP', codPage.ELECTRONIC_SIGNATURE)
    commit('SET_PROSPECT', { codRes: '99' })
  }
}

export async function actionSendToken({ commit }, payload) {
  try {
    const responseSendToken = await sendToken(this.$axios, payload)
    if (responseSendToken.codRes !== '00') {
      throw new Error(
        'En estos momentos no podemos enviar el token, por favor inténtalo en unos minutos.'
      )
    }
  } catch (error) {
    commit('SET_PROSPECT', { codRes: '99' })
  }
}

export async function actionGenerarContractuales({ commit }, payload) {
  try {
    const responseContratos = await contratos(payload)
    if (
      responseContratos.codRes !== '00' &&
      responseContratos.codRes !== '01'
    ) {
      throw new Error(
        'En estos momentos no podemos generar tus contratos, por favor inténtalo en unos minutos.'
      )
    }
    return responseContratos
  } catch (error) {
    commit('SET_PROSPECT', { codRes: '99' })
  }
}

export function resetStates({ commit }) {
  console.log('resetStates')
  commit('CLEAR_ALL')
}
