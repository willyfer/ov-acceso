export default {
  UPDATE_DATOS(state, payload) {
    state.datos = {
      ...state.datos,
      ...payload,
    }
  },
  SET_CONFIR_DATOS(state, payload) {
    state.resConfirmarDatos = payload
  },
  SET_COD_PROSP(state, payload) {
    state.codProspecto = payload
  },
  SET_OFERTAS(state, payload) {
    state.ofertas = payload
  },
  SET_BODY_VALIDA(state, payload) {
    ;(state.body_valida.codProspecto = payload.codProspecto),
      (state.body_valida.channel = payload.channel),
      (state.body_valida.codigoProducto = payload.codigoProducto),
      (state.body_valida.documento = payload.documento),
      (state.body_valida.placa = payload.placa),
      (state.body_valida.estadoProspecto = payload.estadoProspecto),
      (state.body_valida.codigoProspecto = payload.codigoProspecto)
  },
  SET_COD_EVALUACION(state, payload) {
    state.resElegirOferta = payload
  },
  SET_QUIZ(state, payload) {
    state.quizArray = payload
  },
  SET_STEP(state, value) {
    state.step = value
  },
  RESET_ALL(state) {
    state.datos = {
      codigoProducto: 30,
      tipoDocumento: 1,
      documento: '',
      placa: '',
      canalAtencion: 2,
      origen: 4,
      channel: 5,
      codigoUsuario: null,
      codigoEntidad: 1,
      telefono: '',
      email: '',
      terms: '1',
      sede: null,
      isCheckValorados: [],
      importeFinanciar: null,
      cuotas: null,
      importeCuotas: null,
      tasa: null,
      sitCrediticia: false,
      tipoPago: null,
      selectCuenta: null,
      cuentaBanco: null,
      ubigeo: null,
    }
    state.quizArray = []
    state.codProspecto = null
    state.ofertas = []
    state.body_valida = {}
    state.resElegirOferta = {}
    state.resConfirmarDatos = {}
    state.tipoDesembolso = ''
    state.responseVerifyJWT = {}
    state.step = 1
  },
}
