import { defaultForm } from '@/utils/defaultForm'
import { isSaturday } from 'date-fns'
export const UPDATE_STEP = 'UPDATE_STEP'
export const RESET_STATES = 'RESET_STATES'
export const SET_ARRAY_DOCUMENTS = 'SET_ARRAY_DOCUMENTS'
export const SET_DIALOG_UPLOAD = 'SET_DIALOG_UPLOAD'
export const UPDATE_LOGIN_MODAL = 'UPDATE_LOGIN_MODAL'
export const UPDATE_MODAL_CASADO = 'UPDATE_MODAL_CASADO'
export const UPDATE_MODAL_BARCODE = 'UPDATE_MODAL_BARCODE'
export const UPDATE_DATOS = 'UPDATE_DATOS'
export const UPDATE_BUSSINES = 'UPDATE_BUSSINES'
export const UPDATE_PREDICTION = 'UPDATE_PREDICTION'
export const UPDATE_MODAL_TERMS = 'UPDATE_MODAL_TERMS'
export const SET_DIALOG_TOKEN = 'SET_DIALOG_TOKEN'

export const UPDATE_LOGIN_TOKEN = 'UPDATE_LOGIN_TOKEN'

export const state = () => ({
  datos: defaultForm,
  bussines: {
    codigoProducto: null,
    codigoSubProducto: null
  },
  step: 1, // default 1
  modalToken: false,
  loading: false,
  terms: false,
  dialog: false, // default false
  estado: {
    id: 1,
    state: false
  }, // default null
  openToken: false,
  loginModal: false,
  casadoModal: false,
  arrayDocuments: [null, null, null, null, null],
  filesProp: {
    state: false,
    title: null,
    files: null
  }
})

export const mutations = {
  [UPDATE_MODAL_TERMS](state, payload) {
    state.terms = payload
  },
  [SET_DIALOG_TOKEN](state, payload) {
    state.openToken = payload
  },
  [UPDATE_MODAL_TERMS](state, payload) {
    state.terms = payload
  },
  [UPDATE_PREDICTION](state, payload) {
    state.predictions = payload
  },
  [UPDATE_BUSSINES](state, payload) {
    state.bussines = payload
  },
  [UPDATE_DATOS](state, payload) {
    state.datos = {
      ...state.datos,
      ...payload
    }
  },
  [SET_ARRAY_DOCUMENTS](state, payload) {
    const items = payload
    const docs = state.arrayDocuments

    docs[items.posicion] = items.codigoArchivo

    state.arrayDocuments = docs.slice()
  },
  [UPDATE_MODAL_CASADO](state, payload) {
    state.casadoModal = payload
  },
  [UPDATE_LOGIN_MODAL](state, payload) {
    state.loginModal = payload
  },
  [UPDATE_LOGIN_TOKEN](state, payload) {
    state.modalToken = payload
  },
  [UPDATE_STEP](state, payload) {
    state.step = payload
  },

  [RESET_STATES](state) {
    state.datos = {
      ...defaultForm
    }
    state.step = 1
    state.loginModal = false
    state.loading = false
    /* state.stado = { id: null, state: false } */
  },
  [SET_DIALOG_UPLOAD](state, payload) {
    state.filesProp = payload
  }
}

export const actions = {
  async sendToken({ commit, state }) {
    try {
      await this.$axios({
        url: '/api/private/v1.0/token',
        method: 'GET',
        params: {
          documento: state.datos.documento,
          telefono: state.datos.telefono
        },
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
        }
      })

      commit('SET_DIALOG_TOKEN', true)
    } catch (e) {
      commit('SET_DIALOG_TOKEN', true)
    }
  },
  async validateToken({ commit, state }, token) {
    try {
      const reponseToken = await this.$axios({
        url: `/api/private/v1.0/token/${token}`,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
        },
        data: {
          documento: state.datos.documento
        }
      })

      // console.log(reponseToken.data)
      if (reponseToken.data.codigoRespuesta === '00') {
        commit('SET_DIALOG_TOKEN', false)
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  },

  async preEvaluate({ commit, state, rootState }) {
    try {
      
      // Validar si tiene ATU
      let vehiculoAtu = null;      
      const isAtu = await this.$axios({
        url: '/kong/externos/v1.0/atu',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: process.env.BASIC_AUTH
        },
        data: {
          placa: state.datos.placa
        }
      })

      if(isAtu.data.codRes == "00"){
        vehiculoAtu = isAtu.data.message
      }else {
        throw new Error(
          'ERROR, no se obtuvo ATU para esta placa'
        )
      }
      
      const data = {
        canal: 2, // default
        codigoProducto: state.bussines.codigoProducto, // default
        codigoSubProducto: state.bussines.codigoSubProducto, // default
        tipoDocumento: state.datos.tipoDocumento,
        documento: state.datos.documento,
        fechaNacimiento: state.datos.fechaNacimiento,
        propietario: state.datos.propietario,
        placa: state.datos.placa,
        email: state.datos.email,
        telefono: state.datos.telefono,
        recorridoxDia: state.datos.recorridoxDia,
        codigoEntidad: rootState.users.promotor.codigoEntidad,
        nombreUsuario: rootState.users.promotor.nombreUsuario,
        codigoUsuario: rootState.users.promotor.codigoUsuario,
        codigoEvaluacionPromotor:
          rootState.users.promotor.codigoEvaluacionPromotor,
        kilometraje: state.datos.kilometraje,
        anioFabricacion: state.datos.anioFabricacion,
        terminosCondiciones: state.datos.terminosCondiciones,
        numeroAsientos: state.datos.numeroAsientos,
        estadoCivil: state.datos.estadoCivil,
        marcaVehiculoAcceso: state.datos.marcaVehiculoAcceso,
        modeloVehiculoAcceso: state.datos.modeloVehiculoAcceso,
        situacionLaboral: state.datos.situacionLaboral,
        precioVehiculo: state.datos.precioVehiculo,
        precioVehiculoAcceso: state.datos.precioVehiculoAcceso,
        codigoReferidos: state.datos.codigoReferidos,
        origenLead: state.datos.origenLead,
        isCategory: state.datos.isCategory,
        //  Rimac
        ciiu: state.datos.ciiu,
        correo: state.datos.correo,
        direccion: state.datos.direccion,
        fecFundacion: state.datos.fecFundacion,
        fecNacimiento: state.datos.fecNacimiento,
        idTercero: state.datos.idetercero,
        indCrearTercero: state.datos.indCrearTercero,
        indRequiereDireccion: state.datos.indRequiereDireccion,
        nomCompleto: state.datos.nomCompleto,
        nombreComercial: state.datos.nombreComercial,
        numDocumento: state.datos.numDocumento,
        paisNacimiento: state.datos.paisNacimiento,
        razonSocial: state.datos.razonSocial,
        sexo: state.datos.sexo,
        stsTercero: state.datos.stsTercero,
        tipoPersona: state.datos.tipoPersona,
        vehiculoAtu: vehiculoAtu
      }

      const responseExpediente = await this.$axios({
        url: '/api/private/v1.3/prospectos?paso=1',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
        },
        data
      })
      const resultado = responseExpediente.data
/*       console.log(resultado) */

      commit('UPDATE_DATOS', responseExpediente.data)
      commit('SET_ARRAY_DOCUMENTS', {
        posicion: 0,
        codigoArchivo: responseExpediente.data.imagenDocumento
      })
      commit('SET_ARRAY_DOCUMENTS', {
        posicion: 1,
        codigoArchivo: responseExpediente.data.imagenTarjetaPropiedad
      })
      commit('SET_ARRAY_DOCUMENTS', {
        posicion: 2,
        codigoArchivo: responseExpediente.data.imagenSoat
      })
      commit('SET_ARRAY_DOCUMENTS', {
        posicion: 3,
        codigoArchivo: responseExpediente.data.imagenReciboServicio
      })
      commit('SET_ARRAY_DOCUMENTS', {
        posicion: 4,
        codigoArchivo: responseExpediente.data.imagenRevisionTecnica
      })

      if (resultado.codigoRespuesta === '00') {
        if (
          resultado.codigoEstado === 1 ||
          resultado.codigoEstado === 3 ||
          resultado.codigoEstado === 9
        ) {
          this.$ga.event(
            'Prospecto',
            'Formulario completo Aprobado',
            state.datos.documento,
            true
          )
          const bussines = state.bussines

          if (
            bussines.codigoProducto === 25 &&
            bussines.codigoSubProducto === 2
          ) {
            commit(
              'ui/SET_MODAL',
              {
                id: resultado.codigoEstado,
                state: false
              },
              { root: true }
            )
          } else {
            commit(
              'ui/SET_MODAL',
              {
                id: resultado.codigoEstado,
                state: true
              },
              { root: true }
            )
          }
          commit('UPDATE_STEP', 2)
        } else {
          commit('UPDATE_STEP', 1)
          if (resultado.codigoEstado === 15) {
            this.$ga.event(
              'Prospecto',
              'Mostrar oferta MiTaxiPropio.com',
              state.datos.documento,
              true
            )
          }
          console.log('here_1', resultado.codigoEstado)
          commit(
            'ui/SET_MODAL',
            {
              id: resultado.codigoEstado,
              state: true
            },
            { root: true }
          )
          console.log('here_1_a')
        }
      } else if (resultado.codigoRespuesta === '01') {
        console.log('here_1_b')
        this.$ga.event('Prospecto', 'Bloqueo-Canal')

        if (resultado.codigoEstado === 1) {
          commit(
            'ui/SET_MODAL',
            {
              id: 7,
              state: true
            },
            { root: true }
          )
        } else {
          commit(
            'ui/SET_MODAL',
            {
              id: 4,
              state: true
            },
            { root: true }
          )
        }
        console.log('here_1_c')
      } else {
        console.log('here_1_d')
        this.$ga.event('Prospecto', 'Error sistema')
        if (resultado.codigoRespuesta === '99') {
          commit(
            'ui/SET_MODAL',
            {
              id: 8,
              state: true
            },
            { root: true }
          )
        }
      }
    } catch (error) {
      console.log(error)
      commit(
        'ui/SET_MODAL',
        {
          id: 8,
          state: true
        },
        { root: true }
      )
    }
  },
  async actualizarProspecto({ state, rootState, commit }) {
    const step = state.step
    commit('UPDATE_STEP', -1)

    const data = {
      canal: 2,
      idtercero: state.datos.idtercero,
      transaccionCanalEmitir: state.datos.transaccionCanalEmitir,
      codigoProspecto: state.datos.codigoProspecto,
      tipoDocumento: 1,
      email: state.datos.email,
      documento: state.datos.documento,
      placa: state.datos.placa,
      codigoProducto: state.datos.codigoProducto,
      codigoSubProducto: state.datos.codigoSubProducto,
      fechaNacimiento: state.datos.fechaNacimiento,
      apellidoPaterno: state.datos.apellidoPaterno,
      apellidoMaterno: state.datos.apellidoMaterno,
      nombres: state.datos.nombres,
      nivelEducacion: state.datos.nivelEducacion,
      genero: state.datos.genero,
      estadoCivil: state.datos.estadoCivil,
      direccion: state.datos.direccion,
      tipoVia: state.datos.tipoVia,
      numeroVia: state.datos.numeroVia,
      situacionLaboral: state.datos.situacionLaboral,
      ingresoMensual: state.datos.ingresoMensual,
      codigoAnalistaSBS: state.datos.codigoAnalistaSBS,
      resultadoAnalistaSBS: state.datos.resultadoAnalistaSBS,
      observacionAnalistaSBS: state.datos.observacionAnalistaSBS,
      codigoResultadoAnalistaSBS: state.datos.codigoResultadoAnalistaSBS,
      proximoVencimientoCilindro: state.datos.proximoVencimientoCilindro,
      codigoCofide: state.datos.codigoCofide,
      proximaRevaluacionAnual: state.datos.proximaRevaluacionAnual,
      tieneCredito: state.datos.tieneCredito,
      resultadoFactorRecaudo: state.datos.resultadoFactorRecaudo,
      observacionFactorRecaudo: state.datos.observacionFactorRecaudo,
      codigoResultadoFactorRecaudo: state.datos.codigoResultadoFactorRecaudo,
      ubigeo: state.datos.ubigeo,
      nacionalidad: state.datos.nacionalidad,
      codigoEvaluacionPromotor:
        rootState.users.promotor.codigoEvaluacionPromotor,
      tipoVivienda: state.datos.tipoVivienda,
      tipoPersona: state.datos.tipoPersona,
      actividadEconomica: state.datos.actividadEconomica,
      profesion: state.datos.profesion,
      pep: state.datos.pep,
      cargaFamiliar: state.datos.cargaFamiliar,
      importeMaximoFinanciar: state.datos.importeMaximoFinanciar,
      importeFinanciar: state.datos.importeFinanciar,
      importeCuotas: state.datos.importeCuotas,
      numeroCuotas: state.datos.numeroCuotas,
      categoriaFormalidad: state.datos.categoriaFormalidad,
      dniVendedor: state.datos.dniVendedor,
      nombreVendedor: state.datos.nombreVendedor,
      placaVendedor: state.datos.placaVendedor,
      estadoCivilVendedor: state.datos.estadoCivilVendedor,
      telefonoVendedor: state.datos.telefonoVendedor,
      tipoDocumentoConyuge: state.datos.tipoDocumentoConyuge,
      documentoConyuge: state.datos.documentoConyuge,
      nombreConyuge: state.datos.nombreConyuge,
      apellidoPaternoConyuge: state.datos.apellidoPaternoConyuge,
      apellidoMaternoConyuge: state.datos.apellidoMaternoConyuge,
      fechaNacimientoConyuge: state.datos.fechaNacimientoConyuge,
      tipoRegimenLaboral: state.datos.tipoRegimenLaboral,
      mafScore: state.datos.mafScore,
      cantidadCuotas: state.datos.cantidadCuotas,
      resultadoProspecto: state.datos.resultadoProspecto,
      detalleProspecto: state.datos.detalleProspecto,
      ingresoEstimado: state.datos.ingresoEstimado,
      tipoResidencia: state.datos.tipoResidencia,
      valorRCI: state.datos.valorRCI,
      evaScoreResultado: state.datos.evaScoreResultado,
      evaScore: state.datos.evaScore,
      detalleScore: state.datos.detalleScore,
      importeMafScore: state.datos.importeMafScore,
      tasa: state.datos.tasa,
      arrayRCI: state.datos.rciTotal
    }
    console.log('update_prospecto')

    const responseExpediente = await this.$axios({
      url: '/api/private/v1.3/prospectos?paso=2',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
      },
      data
    })
    const resultado = responseExpediente.data
    console.log(resultado)
    commit('UPDATE_DATOS', responseExpediente.data)

    if (resultado.codigoRespuesta === '00') {
      this.$ga.event(
        'Expediente',
        'Formulario Completo Exitoso',
        state.datos.documento,
        true
      )

      if (resultado.codigoEstado === 9) {
        // console.log('here_1')
        commit('UPDATE_STEP', parseInt(step + 1))

        return
      }
      console.log('here_2')
      //
      commit('UPDATE_STEP', 1)
      commit('ui/SET_MODAL', { id: 8, state: true }, { root: true })
    } else {
      console.log('here_4')
      this.$ga.event(
        'Expediente',
        'Error Servidor',
        state.datos.documento,
        true
      )
      if (resultado.codigoRespuesta === '99') {
        commit('UPDATE_STEP', 1)
      }
      commit(
        'ui/SET_MODAL',
        {
          id: 8,
          state: true
        },
        { root: true }
      )
    }
  },
  async enviarDetalleVehiculo({ state, commit, rootState }) {
    commit('UPDATE_STEP', -1)

    const data = {
      canal: 2,
      codigoProspecto: state.datos.codigoProspecto,
      tipoDocumento: 1,
      documento: state.datos.documento,
      placa: state.datos.placa,
      codigoProducto: state.datos.codigoProducto,
      codigoSubProducto: state.datos.codigoSubProducto,
      codigoEvaluacionPromotor:
        rootState.users.promotor.codigoEvaluacionPromotor,
      claseVehiculo: state.datos.claseVehiculo,
      tipoVehiculo: state.datos.tipoVehiculo,
      marcaVehiculo: state.datos.marcaVehiculo,
      modeloVehiculo: state.datos.modeloVehiculo,
      anioFabricacion: state.datos.anioFabricacion,
      codigoAnalistaSBS: state.datos.codigoAnalistaSBS,
      resultadoAnalistaSBS: state.datos.resultadoAnalistaSBS,
      observacionAnalistaSBS: state.datos.observacionAnalistaSBS,
      codigoResultadoAnalistaSBS: state.datos.codigoResultadoAnalistaSBS,
      codigoCofide: state.datos.codigoCofide,
      numeroMotor: state.datos.numeroMotor,
      numeroSerie: state.datos.numeroSerie,
      fechaVigencia: state.datos.fechaVigencia
    }

    const responseExpediente = await this.$axios({
      url: '/api/private/v1.3/prospectos?paso=2',

      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
      },
      data
    })
    const resultado = responseExpediente.data

    commit('UPDATE_DATOS', responseExpediente.data)
    // console.log(resultado)

    if (resultado.codigoRespuesta === '00') {
      this.$ga.event(
        'Expediente',
        'Formulario Completo Exitoso',
        state.datos.documento,
        true
      )

      // commit('ui/SET_MODAL', {
      //   id: resultado.codigoEstado,
      //   state: true
      // })
      if (resultado.codigoEstado === 9) {
        commit('UPDATE_STEP', 4)
        return
      }
      //
      commit('UPDATE_STEP', 1)
      commit(
        'ui/SET_MODAL',
        {
          id: 8,
          state: false
        },
        { root: true }
      )
    } else {
      this.$ga.event(
        'Expediente',
        'Error Servidor',
        state.datos.documento,
        true
      )
      if (resultado.codigoRespuesta === '99') {
        //
      }
      commit(
        'ui/SET_MODAL',
        {
          id: 8,
          state: true
        },
        { root: true }
      )
    }
  },
  async enviarDocumentos({ state, commit }, payload) {
    const step = parseInt(state.step)
    commit('UPDATE_STEP', -1)
    const data = {
      canal: 2, // default
      codigoProducto: state.bussines.codigoProducto, // default
      codigoSubProducto: state.bussines.codigoSubProducto, // default
      codigoProspecto: state.datos.codigoProspecto,
      tipoDocumento: 1,
      numeroAsientos: 4,
      documento: state.datos.documento,
      placa: state.datos.placa,
      imagenDocumento: state.arrayDocuments[0], // archdj
      imagenTarjetaPropiedad: state.arrayDocuments[1], // archdj
      imagenSoat: state.arrayDocuments[2], // archdj
      imagenReciboServicio: state.arrayDocuments[3], // archdj
      imagenRevisionTecnica: state.arrayDocuments[4], // archdj
      oficina: payload.oficina
    }
    // console.log(data)
    const responseEvaluarProspecto = await this.$axios({
      url: '/api/private/v1.3/prospectos?paso=3',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
      },
      data
    })

    const resultado = responseEvaluarProspecto.data
    const isCheck = []
    let obligatorio = 0
    /* check imagenes */
    if (payload.documentos) {
      obligatorio = payload.documentos.filter((val) => val.isUp).length
      payload.documentos.map((val, key) => {
        if (val.isUp) {
          if (state.arrayDocuments[key]) {
            isCheck.push(true)
          }
        }
      })
    }

    let stateImages = false
    if (obligatorio === isCheck.length) {
      stateImages = true
    }

    // console.log('step :' + step)
    if (resultado.codigoRespuesta === '00') {
      if (payload.oficina) {
        if (stateImages) {
          commit('UPDATE_STEP', parseInt(step + 2))
          this.$ga.event('Documentacion', 'Documentación completa')
          commit('UPDATE_DATOS', {
            codigoExpediente: resultado.codigoExpediente
          })
        } else {
          this.$ga.event('Documentacion', 'Documentación incompleta')
          commit('UPDATE_STEP', step)
          commit(
            'ui/SET_MODAL',
            {
              id: 11,
              state: true
            },
            { root: true }
          )
        }
      } else {
        /* go oficina */
        this.$ga.event('Documentacion', 'se fue a oficina')
        commit('UPDATE_STEP', parseInt(step + 1))
      }
    } else {
      this.$ga.event('Documentacion', 'Error')
      commit(
        'ui/SET_MODAL',
        {
          id: 8,
          state: true
        },
        { root: true }
      )
    }
  },
  async enviarDocumentosSoat({ state, commit }, payload) {
    const step = parseInt(state.step)
    commit('UPDATE_STEP', -1)
    const data = {
      canal: 2, // default
      codigoProducto: state.bussines.codigoProducto, // default
      codigoSubProducto: state.bussines.codigoSubProducto, // default
      codigoProspecto: state.datos.codigoProspecto,
      tipoDocumento: 1,
      numeroAsientos: 4,
      documento: state.datos.documento,
      placa: state.datos.placa,
      imagenDocumento: state.arrayDocuments[0], // archdj
      imagenTarjetaPropiedad: state.arrayDocuments[1], // archdj
      imagenSoat: state.arrayDocuments[2], // archdj
      // imagenReciboServicio: state.arrayDocuments[3], // archdj
      imagenRevisionTecnica: state.arrayDocuments[3], // archdj
      oficina: payload.oficina
    }
    // console.log(data)
    const responseEvaluarProspecto = await this.$axios({
      url: '/api/private/v1.3/prospectos?paso=3',

      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
      },
      data
    })

    const resultado = responseEvaluarProspecto.data
    const isCheck = []
    let obligatorio = 0
    /* check imagenes */
    if (payload.documentos) {
      obligatorio = payload.documentos.filter((val) => val.isUp).length
      payload.documentos.map((val, key) => {
        if (val.isUp) {
          if (state.arrayDocuments[key]) {
            isCheck.push(true)
          }
        }
      })
    }

    let stateImages = false
    if (obligatorio === isCheck.length) {
      stateImages = true
    }

    // console.log('step :' + step)
    // console.log('expeiente')
    // console.log(resultado.codigoExpediente)
    // console.log(resultado)
    if (resultado.codigoRespuesta === '00') {
      if (payload.oficina) {
        if (stateImages) {
          commit('UPDATE_STEP', parseInt(step + 1))
          this.$ga.event('Documentacion', 'Documentación completa')
          commit('UPDATE_DATOS', {
            codigoExpediente: resultado.codigoExpediente
          })
        } else {
          this.$ga.event('Documentacion', 'Documentación incompleta')
          commit('UPDATE_STEP', step)
          commit(
            'ui/SET_MODAL',
            {
              id: 11,
              state: true
            },
            { root: true }
          )
        }
      } else {
        /* go oficina */
        this.$ga.event('Documentacion', 'se fue a oficina')
        commit('UPDATE_STEP', parseInt(step + 1))
      }
    } else {
      this.$ga.event('Documentacion', 'Error')
      commit(
        'ui/SET_MODAL',
        {
          id: 8,
          state: true
        },
        { root: true }
      )
    }
  },

  async catalogoDepartamentos() {
    const response = await this.$axios({
      url: '/api/private/v1.0/catalogoDepartamento',
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
      }
    })
    return response.data
  },

  async guardarEmisionSoat({ state, commit }) {
    commit('UPDATE_STEP', -1)
    const data = {
      canal: 2, // default
      codigoProducto: state.bussines.codigoProducto, // default
      codigoSubProducto: state.bussines.codigoSubProducto, // default
      codigoProspecto: state.datos.codigoProspecto,
      tipoDocumento: 1,
      numeroAsientos: state.datos.numeroAsientos,
      documento: state.datos.documento,
      placa: state.datos.placa,
      jsonEmision: state.datos.jsonEmision,
      numeroPoliza: state.datos.numeroPoliza,
      urlEmision: state.datos.urlEmision,
      revisionTecnica: state.datos.revisionTecnica,
      hojaResumen: state.datos.hojaResumen,
      solicitudDelCredito: state.datos.solicitudDelCredito,
      contrato: state.datos.contrato,
      cronograma: state.datos.cronograma,
      codigoEnviodeSMSValidacionDeDocumentos:
        state.datos.codigoEnviodeSMSValidacionDeDocumentos
    }
    // console.log('Dentro de guardarEmisionSoat')
    // console.log(data)
    const responseEvaluarProspecto = await this.$axios({
      url: '/api/private/v1.3/prospectos?paso=2',

      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
      },
      data
    })
  },
  async enviarDocumentosSoatContratos({ state, commit }) {
    const step = parseInt(state.step)
    // commit('UPDATE_STEP', -1)
    const data = {
      canal: 2, // default
      codigoProducto: state.bussines.codigoProducto, // default
      codigoSubProducto: state.bussines.codigoSubProducto, // default
      codigoProspecto: state.datos.codigoProspecto,
      tipoDocumento: 1,
      numeroAsientos: 4,
      documento: state.datos.documento,
      placa: state.datos.placa,
      revisionTecnica: state.datos.revisionTecnica,
      hojaResumen: state.datos.hojaResumen,
      solicitudDelCredito: state.datos.solicitudDelCredito,
      contrato: state.datos.contrato,
      cronograma: state.datos.cronograma,
      codigoEnviodeSMSValidacionDeDocumentos:
        state.datos.codigoEnviodeSMSValidacionDeDocumentos
      // oficina: payload.oficina
    }
    // console.log('Dentro de enviarDocumentosSoatContratos')
    // console.log(data)
    const responseEvaluarProspecto = await this.$axios({
      url: '/api/private/v1.3/prospectos?paso=2',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
      },
      data
    })

    const resultado = responseEvaluarProspecto.data

    // console.log('Resultado de Guardar Prospesto')
    // console.log(resultado)
    commit('UPDATE_STEP', '6')
  },

  async enviarDocValorados({ state, commit }, payload) {
    const step = parseInt(state.step)
    // commit('UPDATE_STEP', -1)
    const data = {
      canal: 2, // default
      codigoProducto: state.bussines.codigoProducto, // default
      codigoSubProducto: state.bussines.codigoSubProducto, // default
      codigoProspecto: state.datos.codigoProspecto,
      tipoDocumento: 1,
      numeroAsientos: 4,
      documento: state.datos.documento,
      placa: state.datos.placa,
      revisionTecnica: payload.revisionTecnica,
      hojaResumen: payload.hojaResumen,
      solicitudDelCredito: payload.solicitudDelCredito,
      contrato: payload.contrato,
      cronograma: payload.cronograma,
      codigoEnviodeSMSValidacionDeDocumentos:
        payload.codigoEnviodeSMSValidacionDeDocumentos
      // oficina: payload.oficina
    }
    // console.log('Dentro de enviarDocValorados')
    // console.log(data)
    const responseEvaluarProspecto = await this.$axios({
      url: '/api/private/v1.3/prospectos?paso=2',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
      },
      data
    })
    const resultado = responseEvaluarProspecto.data
    //
    // console.log('Resultado de Guardar Prospesto')
    // console.log(resultado)
    commit('UPDATE_STEP', step + 1)
  },

  async postAdmision({ state, commit }) {
    // console.log('GET_ADMISION')
    const data = {
      tipoEvaluacion: 6,
      estadoCivil: state.datos.estadoCivil,
      cargaFamiliar: state.datos.cargaFamiliar,
      codigoAnalistaSBS: state.datos.codigoAnalistaSBS,
      edadConyuge: state.datos.edadConyuge,
      tipoRegimenLaboral: state.datos.tipoRegimenLaboral,
      nivelEducacion: state.datos.nivelEducacion,
      tipoResidencia: state.datos.tipoResidencia,
      ubigeo: state.datos.ubigeo,
      fechaNacimiento: state.datos.fechaNacimiento,
      precioVehiculo: state.datos.precioVehiculo,
      precioVehiculoAcceso: state.datos.precioVehiculoAcceso,
      im_garmov: state.datos.im_garmov
    }
    // console.log(data)
    const response = await this.$axios({
      url: '/api/private/v1.0/evaluacionScoreAdmision',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
      },
      data
    })
    const result = response.data
    // console.log(result.prospecto)
    commit('UPDATE_DATOS', result.prospecto)
    return result.prospecto
  },
  async getValorCuota({ state, commit }, payload) {
    // console.log('BODY_IMPORTE_CUOTA')
    const data = {
      tipoSimulacion: 1, //,
      codigoProducto: state.bussines.codigoProducto,
      codigoSubProducto: state.bussines.codigoSubProducto,
      canalColocacion: 4,
      precioVehiculoAcceso: state.datos.precioVehiculoAcceso,
      importeFinanciar: payload.importeFinanciar,
      tipoSeguroDesgravamen: 1,
      importeSeguroDesgravamen: null,
      diasHabiles: true,
      precioVehiculo: 0.0,
      porcentajeRetoma: 0.0,
      valoresReduccionCuota: null,
      valoresCuota: null,
      valoresVencimiento: null,
      tipoCuotas: state.datos.tipoCuotas,
      tasa: state.datos.tasa,
      tasaSeguroDesgravamen: state.datos.tasaSeguroDesgravamen,
      im_otrgas: state.datos.im_otrgas,
      im_garmov: state.datos.im_garmov,
      cantidadCuotas: payload.cantidadCuotas
    }
    // console.log(data)
    const response = await this.$axios({
      url: '/api/private/v1.0/evaluacionScoreCuota',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
      },
      data
    })
    const result = response.data
    // console.log('GET_IMPORTE_CUOTA')
    // console.log(result)
    commit('UPDATE_DATOS', result)
    return result
  },
  async enviarFinanciamiento({ commit, state }) {
    // console.log('GET_VALOR_RCI')
    const data = {
      codigoAnalistaSBS: state.datos.codigoAnalistaSBS,
      importeCuotas: state.datos.importeCuotas, //
      ingresoMensual: state.datos.ingresoMensual,
      ingresoEstimado: state.datos.ingresoEstimado,
      ingresoAlternativo: 0,
      ingresoConyuge: 0,
      cargaFamiliar: state.datos.cargaFamiliar,
      va_rcimax: state.datos.va_rcimax // parametría
    }
    // console.log(data)
    const response = await this.$axios({
      url: '/api/private/v1.0/evaluacionScoreSimulador',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
      },
      data
    })
    const result = response.data
    // console.log(result)
    commit('UPDATE_DATOS', {
      resultadoProspecto: result.codigoEstado,
      detalleProspecto: result.detalleProspecto,
      importeFinanciar: state.datos.importeFinanciar,
      valorRCI: result.valorRCI
    })
    return result
  }
}
