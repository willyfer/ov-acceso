import md5 from 'md5'
import { CLOSE_SESSION } from '~/api/authentication';
export const UPDATE_PROMOTOR = 'UPDATE_PROMOTOR'

export const state = () => ({
  promotor: {
    id: null, // null
    state: false, // false
    eval: null,
    producto: 1,
    codigoUsuario: null, // default por el momento
    codigoEntidad: 1, // default por el momento
    canal: null,
    channel: null,
    nombreUsuarioPersona: null
  },
  productCode: null,
});

export const getters = {
  canal: (state) => state.promotor.canal,
  channel: (state) => state.promotor.channel,
  codigoEntidad: (state) => state.promotor.codigoEntidad,
  codigoUsuario: (state) => state.promotor.codigoUsuario,
  productCode: (state) => state.productCode,
};

export const mutations = {
  [UPDATE_PROMOTOR](state, payload) {
    state.promotor = payload
  },
  SET_PRODUCT_CODE(state, value) {
    state.productCode = value;
  },
};

export const actions = {
  async loginPromotor({ commit }, payload) {
    try {
      const data = {
        codigoPlataforma: 1,
        usuario: payload.usuario,
        passwordMd5: md5(payload.password)
      }
      const responseLogin = await this.$axios({
        url: '/api/private/v1.1/inicioSesion',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
        },
        data
      })
      //console.log('RESPONSE_LOGIN')
      //console.log(responseLogin.data)
      const response = responseLogin.data

      if (response.codigoRespuesta == 0) {
        this.$ga.event('Promotor', 'login Exitoso', payload.usuario, true)

        let productos = response.productos ? response.productos : []
        let channel = null
        const codigoEntidad = response.codigoEntidad

        if (codigoEntidad === 1) {
          channel = 5
        } else if (codigoEntidad === 3020) {
          channel = 3
        } else if (codigoEntidad === 3021) {
          channel = 4
        } else if (codigoEntidad) {
          channel = 2
        }

        if (
          channel == 2 ||
          channel == 3 ||
          channel == 4 ||
          (channel == 5 && codigoEntidad != 1008)
        ) {
          productos.push({ ti_solpro: 30 })
        }
        if (codigoEntidad == 1008) {
          productos.push({ ti_solpro: 31 })
        }
        commit('UPDATE_PROMOTOR', {
          id: payload.usuario,
          nombreUsuario: response.nombreUsuario,
          state: true,
          codigoEvaluacionPromotor: null,
          codigoUsuario: response.codigoUsuario,
          canal: 2, // payload.canal
          channel, // payload.canal
          productos,
          codigoEntidad: response.codigoEntidad,
          nombreUsuarioPersona: response.nombreUsuarioPersona
        })
        return true
      } else {
        //        console.log('here_err')
        this.$ga.event('Promotor', 'login Incorrecto ', payload.usuario)

        commit(
          'ui/SET_MODAL',
          {
            id: 14,
            text: response.detalleRespuesta,
            state: true
          },
          { root: true }
        )
        return false
      }
    } catch (e) {
      console.log(e)
      this.$ga.event('Promotor', 'Error interno', payload.usuario, true)

      commit(
        'ui/SET_MODAL',
        {
          id: 14,
          state: true
        },
        { root: true }
      )

      return false
    }
  },
  async logoutPromotor({ commit }) {
    await CLOSE_SESSION(this.$axios)
    // console.log(response)
    commit('UPDATE_PROMOTOR', {
      id: null,
      state: false,
      nombreUsuario: null,
      codigoEvaluacionPromotor: null,
      productos: null,
      codigoEntidad: null
    })
  },
  // ValidarCliente
  async getClient({ commit }, documento) {
    /*
      this.$axios.setToken('basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj') */
    const responseClient = await this.$axios({
      url: '/api/private/v1.0/validarCliente',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
      },
      data: {
        documento
      }
    })
    if (responseClient.data.cliente) {
      return commit('default/UPDATE_DATOS', responseClient.data, { root: true })
    }
  },
  // Reingreso del usuario
  async loginCliente({ rootState, state, commit }, payload) {
    commit('default/UPDATE_LOGIN_MODAL', false, { root: true })

    const data = {
      canal: 2, // default
      canalColocacion: payload ? payload.canalColocacion : 2,
      codigoProducto: state.bussines.codigoProducto, // default
      codigoSubProducto: state.bussines.codigoSubProducto, // default
      nombreUsuario: rootState.users.promotor.nombreUsuario,
      codigoUsuario: rootState.users.promotor.codigoUsuario,
      codigoEntidad: rootState.users.promotor.codigoEntidad,
      tipoDocumento: 1,
      documento: state.datos.documento,
      placa: state.datos.placa
    }
    try {
      const responseExpediente = await this.$axios({
        url: '/api/private/v1.3/prospectos?paso=0',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
        },
        data
      })
      const resultado = responseExpediente.data
      console.log(resultado.data)
      commit('default/UPDATE_DATOS', responseExpediente.data, { root: true })
      commit(
        'default/SET_ARRAY_DOCUMENTS',
        {
          posicion: 0,
          codigoArchivo: responseExpediente.data.imagenDocumento
        },
        { root: true }
      )
      commit(
        'default/SET_ARRAY_DOCUMENTS',
        {
          posicion: 1,
          codigoArchivo: responseExpediente.data.imagenTarjetaPropiedad
        },
        { root: true }
      )
      commit(
        'default/SET_ARRAY_DOCUMENTS',
        {
          posicion: 2,
          codigoArchivo: responseExpediente.data.imagenSoat
        },
        { root: true }
      )
      commit(
        'default/SET_ARRAY_DOCUMENTS',
        {
          posicion: 3,
          codigoArchivo: responseExpediente.data.imagenReciboServicio
        },
        { root: true }
      )
      commit(
        'default/SET_ARRAY_DOCUMENTS',
        {
          posicion: 4,
          codigoArchivo: responseExpediente.data.imagenRevisionTecnica
        },
        { root: true }
      )

      // console.log(resultado)
      // Canal Virtual
      if (resultado.codigoRespuesta === '00') {
        this.$ga.event('Reingreso', 'Exitoso', state.datos.documento, true)
        if (
          resultado.codigoEstado === 1 ||
          resultado.codigoEstado === 3 ||
          resultado.codigoEstado === 9
        ) {
          commit(
            'ui/SET_MODAL',
            {
              id: resultado.codigoEstado,
              state: true
            },
            { root: true }
          )
          commit('default/UPDATE_STEP', 2, { root: true })
        } else {
          commit('default/UPDATE_STEP', 1, { root: true })
          commit(
            'ui/SET_MODAL',
            {
              id: resultado.codigoEstado,
              state: true
            },
            { root: true }
          )
        }
        //  Canal Físico:
      } else if (resultado.codigoRespuesta === '01') {
        this.$ga.event(
          'Reingreso',
          'Bloqueo-Canal',
          state.datos.documento,
          true
        )
        commit('default/UPDATE_STEP', 1, { root: true })

        if (resultado.codigoEstado === 1) {
          commit(
            'ui/SET_MODAL',
            {
              id: 7,
              state: true
            },
            { root: true }
          )
        } else {
          commit(
            'ui/SET_MODAL',
            {
              id: 4,
              state: true
            },
            { root: true }
          )
        }
      } else {
        this.$ga.event(
          'Reingreso',
          'No-Encontrado',
          state.datos.documento,
          true
        )
        commit(
          'ui/SET_MODAL',
          {
            id: 10,
            state: true
          },
          { root: true }
        )
      }
      return resultado
    } catch (e) {
      // console.log(e)
      /*     this.$ga.event(
          'Reingreso',
          'Error-Servidor',
          state.datos.documento,
          true
        ) */

      commit(
        'ui/SET_MODAL',
        {
          id: 10,
          state: true
        },
        { root: true }
      )
    }
  },
}
