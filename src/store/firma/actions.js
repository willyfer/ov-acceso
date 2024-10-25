import {
  apiGetPreguntas,
  apiGetInformation,
  apiValidatePreguntas,
  apiCrearExpediente,
  apiFirmaElectronica,
} from '~/api/firma'
import { sendToken } from '~/api/authentication'
import { verify } from 'jsonwebtoken'
import { ResponseCode } from '~/enums/global-enums'
import { JsonWebTokenError, TokenExpiredError } from '~/errors'

export async function actionContinuarProceso({ commit }, dataKey) {
  try {
    const decoded = await verify(dataKey, process.env.NUXT_KEYJWT)
    const response = await apiGetInformation(
      this.$axios,
      decoded.codigoProspecto
    )
    commit('SET_PROSPECT', response)
  } catch (error) {
    if (error.name == 'JsonWebTokenError')
      throw new JsonWebTokenError({
        statusCode: ResponseCode.ENLACE_JWT_INCORRECTO,
      })
    else if (error.name == 'TokenExpiredError')
      throw new TokenExpiredError({
        statusCode: ResponseCode.ENLACE_JWT_INCORRECTO,
      })
    else throw error
  }
}
export async function actionObtenerPreguntas({ commit }, codigoProspecto) {
  try {
    this.$showSpinner(true)
    const { data, codRes } = await apiGetPreguntas(this.$axios, codigoProspecto)
    commit('SET_QUIZ', data)
    commit('SET_RESPONSE_CODE', codRes)
    commit('SET_ESTADO_PROSPECTO', codRes)
    this.$showSpinner(false)
  } catch (error) {
    this.$showSpinner(false)
    throw error
  }
}
export async function actionValidarPreguntas({ commit }, payload) {
  try {
    this.$showSpinner(true)
    const response = await apiValidatePreguntas(this.$axios, payload)
    commit('SET_RESPONSE_CODE', response.codRes)
    commit('SET_ESTADO_PROSPECTO', response.codRes)
  } catch (error) {
    this.$showSpinner(false)
    throw error
  }
}
export async function actionCrearExpediente({ commit, state }) {
  try {
    const response = await apiCrearExpediente(
      this.$axios,
      state.prospectusTest //temporal
    )
    commit('SET_PROSPECT', response)
    this.$showSpinner(false)
  } catch (error) {
    this.$showSpinner(false)
    throw error
  }
}
export async function actionSendToken({ commit }, payload) {
  try {
    this.$showSpinner(true)
    await sendToken(this.$axios, payload)
    this.$showSpinner(false)
  } catch (error) {
    this.$showSpinner(false)
    throw error
  }
}
export async function actionGenerarContractuales({ commit }, payload) {
  try {
    this.$showSpinner(true)
    const { codRes } = await apiFirmaElectronica(this.$axios, payload)
    commit('SET_RESPONSE_CODE', codRes)
    commit('SET_ESTADO_PROSPECTO', codRes)
    this.$showSpinner(false)
  } catch (error) {
    this.$showSpinner(false)
    throw error
  }
}
