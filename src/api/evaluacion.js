import axios from 'axios'

const headers = {
  'content-type': 'application/json',
  Authorization: process.env.BASIC_AUTH
}

async function politicas(cod_eval) {
  try {
    const { data } = await axios({
      url: `/v5/evaluacion/v2.0/politicas/?codigoEvaluacion=${cod_eval}`,
      method: 'GET',
      headers: headers
    })
    return data
  } catch (error) {
    return {
      codRes: '99'
    }
  }
}

export { politicas }
