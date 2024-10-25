import { codPage } from '~/enums/contigo/pages'

const expressForm = {
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

export default () => ({
  datos: expressForm,
  quizArray: [],
  codProspecto: null,
  ofertas: [],
  body_valida: {},
  resElegirOferta: {},
  resConfirmarDatos: {},
  tipoDesembolso: '',
  responseVerifyJWT: {},
  step: codPage.LOGIN
})
