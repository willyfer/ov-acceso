export const apiGetInformation = (axios, codigoProspecto) =>
  axios.$get(`/kong/prospecto/v2.0/info/required/${codigoProspecto}`)

export const apiGetPreguntas = (axios, codigoProspecto) =>
  axios.$get(`/kong/prospecto/v1.0/producto/preguntas/${codigoProspecto}`)

export const apiValidatePreguntas = (axios, payload) =>
  axios.$post(`/kong/prospecto/v1.0/producto/preguntas`, payload)

export const apiCrearExpediente = (axios, payload) =>
  axios.$put('/kong/prospecto/v2.0/producto/lde?tipo=2', payload)

export const apiFirmaElectronica = (axios, payload) =>
  axios.$post('/kong/contratos/v1.0/contratos', payload)
