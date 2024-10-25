import { pageFirma } from '~/enums/firma/pages'

export default {
  currentComponent: (state) =>
    pageFirma.find((item) => item.step === state.step),
  responseCode: (state) => state.responseCode,
  estadoProspecto: (state) => state.prospectus.estadoProspecto,
  productCode: (state) => state.prospectus.codigoProducto,
  codigoProspecto: (state) => state.prospectus.codigoProspecto,
  documento: (state) => state.prospectus.documento,
  telefono: (state) => state.prospectus.telefono,
  codigoExpediente: (state) => state.prospectus.codigoExpediente,
  fullName: (state) => `${state.prospectus.nombres} ${state.prospectus.apellidoPaterno}`,
  detallesCredito: (state) => state.prospectus.detallesCredito,
  apellidoMaterno: (state) => state.prospectus.apellidoMaterno,
  apellidoPaterno: (state) => state.prospectus.apellidoPaterno,
  nombres: (state) => state.prospectus.nombres,
  codigoCredito: (state) => state.prospectus.codigoCredito,
  contratos: (state) => state.prospectus.contratos,
  placa: (state) => state.prospectus.placa,  
  numberOfQuestions: (state) => state.numberOfQuestions,
  validationQuestions: (state) => state.validationQuestions,
  arrayDocuments: (state) => state.arrayDocuments,
  terminos: (state) => state.terminos,
}
