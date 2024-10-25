import axios from 'axios'

const headersKong = {
  'content-type': 'application/json',
  Authorization: process.env.BASIC_AUTH_KONG
}

async function contratos(payload) {
  try {
    const { data } = await axios({
      url: '/kong/contratos/v1.0/contratos',
      method: 'POST',
      headers: headersKong,
      data: payload
    })
    return data
  } catch (error) {
    return {
      codRes: '99'
    }
  }
}

export { contratos }
