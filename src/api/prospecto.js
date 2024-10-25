import axios from 'axios'

const headers = {
  'content-type': 'application/json',
  Authorization: process.env.BASIC_AUTH,
}

const headersKong = {
  'content-type': 'application/json',
  Authorization: process.env.BASIC_AUTH_KONG,
}

async function lde(payload) {
  try {
    const { data } = await axios({
      url: '/v4/prospecto/v2.0/producto/lde',
      method: 'POST',
      headers: headers,
      data: payload,
    })
    return data
  } catch (error) {
    return {
      codRes: '99',
    }
  }
}

async function preguntas(codigoProspecto) {
  try {
    const { data } = await axios({
      url: `/kong/prospecto/v1.0/producto/preguntas/${codigoProspecto}`,
      method: 'GET',
      headers: headersKong,
    })
    return data
  } catch (error) {
    return {
      codRes: '99',
    }
  }
}

async function enviarPreguntas(payload) {
  try {
    const { data } = await axios({
      url: '/kong/prospecto/v1.0/producto/preguntas',
      method: 'POST',
      headers: headersKong,
      data: payload,
    })
    return data
  } catch (error) {
    return {
      codRes: '99',
    }
  }
}

async function crearExpediente(payload) {
  try {
    const { data } = await axios({
      url: '/kong/prospecto/v2.0/producto/lde?tipo=2',
      method: 'PUT',
      headers: headersKong,
      data: payload,
    })
    return data
  } catch (error) {
    return {
      codRes: '99',
    }
  }
}

async function validaProspecto(payload) {
  try {
    const { data } = await axios({
      url: '/kong/prospecto/v1.0/producto/valida-prospecto',
      method: 'POST',
      headers: headersKong,
      data: payload,
    })
    return data
  } catch (error) {
    return {
      codRes: '99',
    }
  }
}

async function apiFacialBiometriy(payload) {
  return axios({
    url: '/kong/prospecto/v1.0/reconocimientofacial',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.BASIC_AUTH_KONG,
    },
    data: payload,
  })
}

async function apiFacialBiometryRecord(payload) {
  return axios({
    url: '/kong/prospecto/v1.0/registroBiometriaFacial',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.BASIC_AUTH_KONG,
    },
    data: payload,
  })
}

async function apiValidaClienteRetanqueo(payload) {
  return axios({
    url: '/kong/prospecto/v1.0/producto/retanqueo/ov',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.BASIC_AUTH_KONG,
    },
    data: payload,
  })
}

async function apiElegirOferta(payload) {
  return axios({
    url: '/kong/prospecto/v2.0/producto/lde?tipo=0',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.BASIC_AUTH_KONG,
    },
    data: payload,
  })
}

async function apiSimularCredito(payload) {
  return axios({
    url: '/kong/prospecto/v1.0/simulador/importeCuotas/get',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.BASIC_AUTH_KONG,
    },
    data: payload,
  })
}

async function apiConfirmarSimulacion(payload) {
  return axios({
    url: '/kong/prospecto/v1.0/simulador/prestamo/save',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.BASIC_AUTH_KONG,
    },
    data: payload,
  })
}

export {
  lde,
  preguntas,
  enviarPreguntas,
  crearExpediente,
  validaProspecto,
  apiFacialBiometriy,
  apiFacialBiometryRecord,
  apiValidaClienteRetanqueo,
  apiElegirOferta,
  apiSimularCredito,
  apiConfirmarSimulacion
}
