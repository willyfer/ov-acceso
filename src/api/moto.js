export const apiSendPreevaluation = (axios, data) =>
  axios.$post('/kong/prospecto/v2.0/preevaluacion', data)

export const apiRegistrationPersonalData = (axios, data) =>
  axios.$post('/kong/prospecto/v2.0/registroAdicional', data)

export const apiSimulateCreditConditions = (axios, data) =>
  axios.$post('/kong/prospecto/v2.0/simular/condiciones', data)

export const apiConfirmCreditConditions = (axios, data) =>
  axios.$post('/kong/prospecto/v2.0/registrar/simulacion', data)

export const apiConsultProspectus = (axios, codigoProspecto) =>
  axios.$post('/kong/prospecto/v2.0/consultarProspecto', { codigoProspecto })

export const apiSendApprovalLetter = (axios, data) =>
  axios.$post('/kong/prospecto/v2.0/envio/carta/aprobacion', data)

export const apiChangeStateFinal = (axios, data) =>
  axios.$post('/kong/prospecto/v2.0/estado/final', data)

export const apiObtenerCartaMoto = (axios, data) =>
  axios.$get(`/kong/reporte/cartamoto/2/${data}`)

export const apiObtenerCartaMotoBancarizador = (axios, data) =>
  axios.$get(`/kong/reporte/cartamotoLDBancarizador/2/${data}`)
