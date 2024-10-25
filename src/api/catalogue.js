export const catalogoProvincias = async (axios, payload) => {
  const response = await axios({
    url: `/api/private/v1.0/catalogoProvincia?region_id=${payload.region_id}`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
    }
  })
  return response.data
}

export const catalogoDistritos = async (axios, payload) => {
  const response = await axios({
    url: `/api/private/v1.0/catalogoDistritos?province_id=${payload.province_id}`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
    }
  })
  return response.data
}

export const getMarca = async (axios) => {
  const response = await axios({
    url: '/v6/externos/v2.0/vehiculos/info-marca',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: process.env.BASIC_AUTH
    }
  })
  return response.data
}

export const getModelo = async (axios, id) => {
  const response = await axios({
    url: `/v6/externos/v2.0/vehiculos/info-modelo/?marca=${id}`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: process.env.BASIC_AUTH
    }
  })
  return response.data
}

export const getOficinas = async (axios) => {
  try {
    const { data } = await axios({
      url: '/kong/utilsJS/v1.0/lugares',
      method: 'GET',
      headers: {
        Authorization: process.env.BASIC_AUTH_KONG
      }
    })
    return data
  } catch (error) {
    throw new Error(
      'En estos momentos no se puede obtener las oficinas, por favor inténtelo más tarde.'
    )
  }
  /* const oficinas = [
    'Jesús María - Av. 28 de Julio 334 - 338',
    'San Juan de Miraflores - Av. Los Héroes 620',
    'San Juan de Lurigancho - Av. Próceres de la independencia 2616 – 2620 2do piso',
    'Comas - Av. Túpac Amaru N° 5875 - 2do piso',
    'Surquillo - Av. Angamos Este N° 1669'
  ];
  return oficinas */
}

export const getBancos = async (axios) => {
  try {
    const { data } = await axios({
      url: '/kong/externos/v2.0/bancos/info-banco',
      method: 'GET',
      headers: {
        Authorization: process.env.BASIC_AUTH_KONG
      }
    })
    return data
  } catch (error) {
    throw new Error(
      'En estos momentos no se puede obtener los bancos, por favor inténtelo más tarde.'
    )
  }
}

export const apiGetCatalogs = (axios, data) => 
  axios.$post('/kong/prospecto/v2.0/consultar/', data);

export const apiGetProductEntities = (axios, data) => 
  axios.$post(`/kong/prospecto/v2.0/entidad`, data);