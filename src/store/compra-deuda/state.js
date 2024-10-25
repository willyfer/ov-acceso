import { codPage } from '~/enums/compra-deuda/pages'
const expressForm = {
  codigoProducto: 0, // default
  tipoDocumento: 1, // 1: documento, 2 : carnet extranjeria
  documento: '', // 8 documento, 9 ce 43085939
  placa: '', // 6 DIGITOS AUV612
  fechaNacimiento: null, // FORMATO
  canalAtencion: 2, // DEFAULT 2 CANAL WEB
  origen: 4, // default
  channel: 1, // default
  codigoUsuario: null, // default por el momento
  codigoEntidad: 1, // default por el momento
  recorridoxDia: null, // 	1: 0 - 50 Km ,2: 51 - 100 Km ,3: más de 100 Km
  telefono: '', //'941885678',
  email: '', //'diego.urbina@acceso.com.pe',
  terms: '1',
  sede: null,
  isCheckValorados: [], // signture,
  sectorEconomico: null,
  importeFinanciar: null,
  cuotas: null,
  importeCuotas: null,
  tasa: null,
  anioFabricacion: null,
  sitCrediticia: false,
  estadoBio: false,
  tipoPago: null,
  selectCuenta: null,
  cuentaBanco: null,
  selectOficina: null,
  departamento: null,
  provincia: null,
  distrito: null,
  ubigeo: null,
}

export default () => ({
  step: codPage.ONBOARDING,
  responseCode: null,
  datos: expressForm,
  quizArray: [],
  numberOfQuestions: 0,
  validationQuestions: [],
  codProspecto: null,
  ofertas: [],
  body_valida: {},
  resElegirOferta: {},
  resConfirmarDatos: {},
  tipoDesembolso: '',
  responseVerifyJWT: {},
  isBiometricFacial: null,
})
