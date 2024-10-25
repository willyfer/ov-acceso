export const state = () => ({
  step: 1, // default 1
  openDialog: {
    estado: false,
    mensaje: ''
  },
  estado: {
    id: 1,
    state: false
  }, // default null
  openDialogAlert: {
    imgModal: null,
    tituloModal: null,
    msgModal: null,
    maxWidth: 350,
    estadoModal: false,
    isReset: false,
    isResetRetanqueo: false,
    push: null
  }
})

export const mutations = {
  SET_OPENDIALOG(state, payload) {
    state.openDialog = payload
  },
  UPDATE_STEP(state, payload) {
    state.step = payload
  },
  SET_MODAL(state, payload) {
    state.estado = payload
  },
  SET_OPENDIALOGALERT(state, payload){
    state.openDialogAlert = payload
  }
}

export const actions = {}
