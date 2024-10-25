import { apiGetCatalogs, apiGetProductEntities } from '~/api/catalogue';
import { TypesDocuments } from '~/enums/global-enums.js';

export const state = () => ({
  catalogs: {
    "codigoProducto": 0,
    "codRes": 0,
    "listaSedes": [],
    "listaTipoPerfil": [],
    "listaCategoriasVehiculos": [],
    "listaEstadosCiviles": [],
    "listaGeneros": [],
    "listaNivelesEducacion": [],
    "listaPep": [],
    "listaSituacionesLaborales": [],
    "listaTalleresVehiculares": [],
    "listaTipoCuenta": [],
    "listaTiposCuentas": [],
    "listaTiposDocumentos": [],
    "listaTiposResidencias": [],
    "listaMoto": [],
    "listaActividadEconomica": [],
    "listaSectorEconomico": [],
    "listaDocumentosRegistrar": [],
    "listaProfesion": [],
    'listaCargaFamiliar': [],
    "listaPlazos": [],
    "motos": [],
    "modelos": [],
    "listaTiposCombustibles": [],
    "listaTiposAvalista": [],
    "listaTiposLicencia": [],
    "listaEntidadesProducto": [],
    "listaTipoUsoMoto": [],
  }
});

export const getters = {
  listaSedes: (state) => state.catalogs.listaSedes,
  listaTipoPerfil: (state) => state.catalogs.listaTipoPerfil,
  listaCategoriasVehiculos: (state) => state.catalogs.listaCategoriasVehiculos,
  listaEstadosCiviles: (state) => state.catalogs.listaEstadosCiviles,
  listaGeneros: (state) => state.catalogs.listaGeneros,
  listaNivelesEducacion: (state) => state.catalogs.listaNivelesEducacion,
  listaPep: (state) => state.catalogs.listaPep,
  listaSituacionesLaborales: (state) => state.catalogs.listaSituacionesLaborales,
  listaTalleresVehiculares: (state) => state.catalogs.listaTalleresVehiculares,
  listaTipoCuenta: (state) => state.catalogs.listaTipoCuenta,
  listaTiposCuentas: (state) => state.catalogs.listaTiposCuentas,
  listaTiposDocumentos: (state) => state.catalogs.listaTiposDocumentos,
  listaTiposResidencias: (state) => state.catalogs.listaTiposResidencias,
  listaMoto: (state) => state.catalogs.listaMoto,
  listaActividadEconomica: (state) => state.catalogs.listaActividadEconomica,
  listaSectorEconomico: (state) => state.catalogs.listaSectorEconomico,
  listaDocumentosRegistrar: (state) => state.catalogs.listaDocumentosRegistrar,
  listaProfesion: (state) => state.catalogs.listaProfesion,
  listaCargaFamiliar: (state) => state.catalogs.listaCargaFamiliar,
  listaPlazos: (state) => state.catalogs.listaPlazos,
  listaMarcas: (state) => state.catalogs.motos,
  listaModelos: (state) => state.catalogs.modelos,
  listaTiposCombustibles: (state) => state.catalogs.listaTiposCombustibles,
  listaTiposAvalista: (state) => state.catalogs.listaTiposAvalista,
  listaTiposLicencia: (state) => state.catalogs.listaTiposLicencia,
  listaEntidadesProducto: (state) => state.catalogs.entidadProducto ? state.catalogs.entidadProducto : [],
  listTypeDocumentUser: (state) => state.catalogs.listaTiposDocumentos.filter(item => item.id != TypesDocuments.CE),//temporal
  listaTipoUsoMoto: (state) => state.catalogs.listaTipoUsoMoto,
}

export const mutations = {
  SET_CATALOGS(state, data) {
    state.catalogs = { ...state.catalogs, ...data }
  },
}

export const actions = {
  async getCatalogs({ commit }, payload) {
    try {
      const response = await apiGetCatalogs(this.$axios, payload)
      commit('SET_CATALOGS', response)
    } catch (error) {
      throw error;
    }
  },
  async getProductEntities({ commit }, payload) {
    try {
      const response = await apiGetProductEntities(this.$axios, payload)
      commit('SET_CATALOGS', response)
    } catch (error) {
      throw error;
    }
  },
}
