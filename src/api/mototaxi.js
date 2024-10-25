export const apiRegistrationPersonalData = (axios, data) =>
  axios.$post('/kong/prospecto/v2.0/registro/adicional/mototaxi', data)

export const apiRegistrationPersonalDataFurgon = (axios, data) =>
  axios.$post('/kong/prospecto/v2.0/registro/adicional/motofurgon', data)

export const apiObtenerCartaMotofurgon = (axios, data) =>
  axios.$get(`/kong/reporte/cartamotofurgon/2/${data}`)

  export const apiObtenerCartaMototaxi = (axios, data) =>
  axios.$get(`/kong/reporte/cartamototaxi/2/${data}`)
