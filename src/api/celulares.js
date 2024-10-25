const headers = {
  'content-type': 'application/json',
  Authorization: process.env.BASIC_AUTH
}
export const apiPreevaluation = (axios, payload) => {
  return axios({url: '/v4/prospecto/v2.0/producto/lde', method: 'POST', headers: headers, data: payload})
}
export const apiGetMarcasCelulares = (axios, payload) => {
  return axios({url: 'kong/prospecto/v1.0/ov/getMarcas/CEL', method: 'GET', headers: headers, data: payload})
}

export const apiGetModelosCelulares = (axios, payload) => {
  return axios({url: 'kong/prospecto/v1.0/ov/getModelos/CEL/1', method: 'GET', headers: headers, data: payload})
}
 