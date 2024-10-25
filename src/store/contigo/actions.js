import {
  apiValidaCliente,
  apiElegirOferta,
  apiObtenerPreguntas,
  apiValidaPreguntas,
  apiConfirmarDatos,
  apiGenerarContractuales,
} from '~/api/contigo'

export async function validaClienteFae({}, payload) {
  try {
    const formData = {
      channel: payload.channelForm,
      codigoProducto: payload.codigoProductoForm,
      tipoDocumento: payload.tipoDocForm,
      documento: payload.documentoForm,
    }
    const { data } = await apiValidaCliente(this.$axios, formData)
    return data
  } catch (error) {
    throw new Error(
      'En estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.'
    )
  }
}

export async function elegirOferta({}, payload) {
  try {
    const { data } = await apiElegirOferta(this.$axios, payload)
    return data
  } catch (error) {
    throw new Error(
      'En estos momentos no se puede procesar tu oferta, por favor inténtalo en unos minutos.'
    )
  }
}

export async function obtenerPreguntas({ commit }, codigoProspecto) {
  try {
    const { data } = await apiObtenerPreguntas(this.$axios, codigoProspecto)
    commit('SET_QUIZ', data)
    return data
  } catch (error) {
    throw new Error(
      'En estos momentos no se puede obtener las preguntas, por favor inténtalo en unos minutos.'
    )
  }
}

export async function validaPreguntas({}, payload) {
  try {
    const { data } = await apiValidaPreguntas(this.$axios, payload)
    return data
  } catch (error) {
    throw new Error(
      'En estos momentos no se puede validar las preguntas, por favor inténtalo en unos minutos.'
    )
  }
}

export async function confirmarDatos({}, payload) {
  try {
    const { data } = await apiConfirmarDatos(this.$axios, payload)
    return data
  } catch (error) {
    throw new Error(
      'En estos momentos no podemos actualizar tus datos, por favor inténtalo en unos minutos.'
    )
  }
}

export async function validarGenerarContractuales({}, payload) {
  try {
    const { data } = await apiGenerarContractuales(this.$axios, payload)
    return data
  } catch (error) {
    throw new Error(
      'En estos momentos no podemos generar tus contratos, por favor inténtalo en unos minutos.'
    )
  }
}
