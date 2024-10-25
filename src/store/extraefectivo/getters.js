import { pageExtraefectivo } from '~/enums/extraefectivo/pages'
export default {
  currentComponent: (state) => pageExtraefectivo.find((p) => p.step === state.step),
  datos: (state) => state.datos,
  estadoProspecto: (state) => state.responseCode,
  resConfirmarDatos: (state) => state.resConfirmarDatos,
  numberOfQuestions: (state) => state.numberOfQuestions,
  validationQuestions: (state) => state.validationQuestions,
  isBiometricFacial: (state) => state.isBiometricFacial,
}
