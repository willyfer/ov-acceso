import { pageCompraDeuda } from '~/enums/compra-deuda/pages'
export default {
  currentComponent: (state) =>
    pageCompraDeuda.find((p) => p.step === state.step),
  datos: (state) => state.datos,
  estadoProspecto: (state) => state.responseCode,
  resConfirmarDatos: (state) => state.resConfirmarDatos,
  numberOfQuestions: (state) => state.numberOfQuestions,
  validationQuestions: (state) => state.validationQuestions,
  isBiometricFacial: (state) => state.isBiometricFacial,
}
