export function SET_EVALUACION_DATOS(state, payload) {
  state.evaluacionDatos = {
    ...state.evaluacionDatos,
    ...payload,
  }
}

export function SET_DATOS(state, payload) {
  state.datos = {
    ...state.datos,
    ...payload,
  }
}

export function SET_ARRAY_PRODUCTOS(state, payload) {
  state.arrayProductos = payload
}

export function SET_QUIZ_ARRAY(state, payload) {
  state.quizArray = payload
  state.validationQuestions = payload.data
  state.numberOfQuestions = payload.data.length
}

export function SET_ARRAY_DATOS(state, payload) {
  state.arrayDatos = {
    ...state.arrayDatos,
    ...payload,
  }
}

export function SET_IS_SELECT_TALLER(state, payload) {
  state.isSelectTaller = payload
}

export function SET_LOADING_FORM(state, payload) {
  state.loadingEvaluacion = payload
}

export function SET_IS_BTN_OFERTA(state, payload) {
  state.isBtnOferta = payload
}
