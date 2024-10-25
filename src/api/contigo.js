export const apiValidaCliente = (axios, payload) => {
  return axios({
    url: '/kong/prospecto/v1.0/producto/fae/ov',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.BASIC_AUTH_KONG,
    },
    data: payload,
  })
}

export const apiElegirOferta = (axios, payload) => {
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

export const apiObtenerPreguntas = (axios, codigoProspecto) => {
  return axios({
    url: `/kong/prospecto/v1.0/producto/preguntas/${codigoProspecto}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',

      Authorization: process.env.BASIC_AUTH_KONG,
    },
  })
}

export const apiValidaPreguntas = (axios, payload) => {
  return axios({
    url: '/kong/prospecto/v1.0/producto/preguntas',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.BASIC_AUTH_KONG,
    },
    data: payload,
  })
}

export const apiConfirmarDatos = (axios, payload) => {
  return axios({
    url: '/kong/prospecto/v2.0/producto/lde?tipo=2',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.BASIC_AUTH_KONG,
    },
    data: payload,
  })
}

export const apiGenerarContractuales = (axios, payload) => {
  return axios({
    url: '/kong/contratos/v1.0/contratos',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.BASIC_AUTH_KONG,
    },
    data: payload,
  })
}
