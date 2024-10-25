export default {
  evaluacionDatos(state) {
    return state.evaluacionDatos
  },
  datos(state) {
    return state.datos
  },
  quizArray(state) {
    return state.quizArray
  },
  arrayProductos(state) {
    return state.arrayProductos
  },
  arrayDatos(state) {
    return state.arrayDatos
  },
  isSelectTaller(state) {
    return state.isSelectTaller
  },
  loadingEvaluacion(state) {
    return state.loadingEvaluacion
  },
  isBtnOferta(state) {
    return state.isBtnOferta
  },
  numberOfQuestions: (state) => state.numberOfQuestions,
  validationQuestions: (state) => state.validationQuestions,
}
