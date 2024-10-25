import { apiGetDepartments, apiGetProvinces, apiGetDistricts } from '~/api/ubigeo';

export const state = () => ({
  departments: [],
  provinces: [],
  districts: [],
  ////avalista/////
  provincesGuarantor: [],
  districtsGuarantor: [],
});

export const getters = {
  departments: (state) => state.departments,
  provinces: (state) => state.provinces,
  districts: (state) => state.districts,
  provincesGuarantor: (state) => state.provincesGuarantor,
  districtsGuarantor: (state) => state.districtsGuarantor,
};

export const mutations = {
  SET_DEPARTMENTS(state, data) {
    state.departments = data;
  },
  SET_PROVINCES(state, data) {
    state.provinces = data;
  },
  SET_DISTRICTS(state, data) {
    state.districts = data;
  },
  SET_PROVINCES_GUARANTOR(state, data) {
    state.provincesGuarantor = data;
  },
  SET_DISTRICTS_GUARANTOR(state, data) {
    state.districtsGuarantor = data;
  },
  CLEAR_UBIGEO(state) {
    state.departments = [];
    state.provinces = [];
    state.districts = [];
  }
};

export const actions = {
  async getDepartments({ commit }) {
    try {
      const response = await apiGetDepartments(this.$axios);
      commit('SET_DEPARTMENTS', response);
    } catch (error) {
      throw error;
    }
  },
  async getProvinces({ commit }, idDepartment) {
    try {
      const response = await apiGetProvinces(this.$axios, idDepartment);
      commit('SET_PROVINCES', response);
    } catch (error) {
      throw error;
    }
  },
  async getDistricts({ commit }, idDepartmentProvince) {
    try {
      const response = await apiGetDistricts(this.$axios, idDepartmentProvince );
      commit('SET_DISTRICTS', response);
    } catch (error) {
      throw error;
    }
  },
  async getProvincesGuarantor({ commit }, idDepartment) {
    try {
      const response = await apiGetProvinces(this.$axios, idDepartment);
      commit('SET_PROVINCES_GUARANTOR', response);
    } catch (error) {
      throw error;
    }
  },
  async getDistrictsGuarantor({ commit }, idDepartmentProvince) {
    try {
      const response = await apiGetDistricts(this.$axios, idDepartmentProvince );
      commit('SET_DISTRICTS_GUARANTOR', response);
    } catch (error) {
      throw error;
    }
  },
};

