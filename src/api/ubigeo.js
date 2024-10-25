export const apiGetDepartments = (axios) => {
  return axios.$get(`/kong/ubigeo/depar`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.BASIC_AUTH_KONG
    }
  });
};

export const apiGetProvinces = (axios, codDepartamento) => {
  return axios.$get(`/kong/ubigeo/prov/${codDepartamento}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.BASIC_AUTH_KONG
    }
  });
};

export const apiGetDistricts = (axios, idDepartmentProvince) => {
  return axios.$get(`/kong/ubigeo/dist/${idDepartmentProvince}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.BASIC_AUTH_KONG
    }
  });
};