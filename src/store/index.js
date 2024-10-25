import { CLOSE_SESSION } from '~/api/authentication';
export const strict = false

export const state = () => ({
  isLoading: false,
  isError: false,
});

export const mutations = {
  SET_ISLOADING(state, value) {
    state.isLoading = value;
  },
  SET_IS_ERROR(state, value) {
    state.isError = value;
  }
};

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    try {
      const isSession = getCookie('l4fv', req.headers.cookie)

      //console.log('ses' + isSession)
      if (isSession) {
        const responseLogin = await this.$axios({
          url: '/api/private/v1.1/statusSesion',
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
          }
        })
        /* console.log('COOKIES')
        console.log(responseLogin.data) */
        let channel = null
        const codigoEntidad = responseLogin.data.codigoEntidad
        if (codigoEntidad === 1) {
          channel = 5
        } else if (codigoEntidad === 3020) {
          channel = 3
        } else if (codigoEntidad === 3021) {
          channel = 4
        } else if (codigoEntidad) {
          channel = 2
        }

        const _productos = responseLogin.data.productos
        let productos = _productos ? _productos : []
        if (
          channel == 2 ||
          channel == 3 ||
          channel == 4 ||
          (channel == 5 && codigoEntidad != 1008)
        ) {
          productos.push({ ti_solpro: 30 })
        }
        if (codigoEntidad === 1008) {
          productos.push({ ti_solpro: 31 })
        }
        const response = {
          ...responseLogin.data,
          productos,
          channel,
          state: true
        }
        /* console.log("here-update")
        console.log(response) */

        if (response.codigoRespuesta === 0) {
          /* console.log("here-sucess") */
          commit(
            'users/UPDATE_PROMOTOR',
            {
              ...response,
              id: response.usuario,
              state: true,
              channel
            },
            { root: true }
          )
        } else {
          //console.log('session no encontrada')
          await CLOSE_SESSION(this.$axios)
          //console.log(response)
          commit(
            'users/UPDATE_PROMOTOR',
            {
              id: null,
              state: false,
              nombreUsuario: null,
              codigoEvaluacionPromotor: null,
              canal: null,
              productos: null
            },
            { root: true }
          )
        }
      } else {
        //console.log('sessión dont exist')
        commit(
          'users/UPDATE_PROMOTOR',
          {
            id: null,
            state: false,
            nombreUsuario: null,
            codigoEvaluacionPromotor: null,
            canal: null,
            productos: null,
            codigoUsuario: null, // default por el momento
            codigoEntidad: 1, // default por el momento
          },
          { root: true }
        )
      }
    } catch (e) {
      //console.log(e)
      commit(
        'users/UPDATE_PROMOTOR',
        {
          id: null,
          state: false,
          nombreUsuario: null,
          codigoEvaluacionPromotor: null,
          codigoUsuario: null,
          canal: null,
          productos: null,
          codigoEntidad: null,
          channel: null,
          codigoUsuario: null, // default por el momento
          codigoEntidad: 1, // default por el momento
        },
        { root: true }
      )
    }
  }
}
const getCookie = (cookieName, stringCookie) => {
  const strCookie = new RegExp('' + cookieName + '[^;]+').exec(stringCookie)
  if (strCookie) {
    return unescape(strCookie[0].toString().replace(/^[^=]+./, ''))
  } else {
    return null
  }
}
