import { apiPreevaluation, apiGetMarcasCelulares ,apiGetModelosCelulares } from '~/api/celulares';
export default {
    async preEvaluate({ commit, state, rootState }, payload) {
        try {
          //this.$showSpinner(true)
          const data = {
              "codigoProducto":39,
              "tipoDocumento":1,
              "documento": payload.dni,
              "placa":"",
              "fechaNacimiento":null,
              "canalAtencion":2,
              "origen":4,
              "channel":1,
              "recorridoxDia":3,
              "telefono": payload.phone,
              "email": payload.email,
              "terms": payload.terms,
              "sede":null,
              "isCheckValorados":[],
              "sectorEconomico":null,
              "importeFinanciar":null,
              "cuotas":null,
              "importeCuotas":null,
              "tasa":null,
              "anioFabricacion":null,
              "sitCrediticia":false,
              "estadoBio":false,
              "tipoPago":null,
              "selectCuenta":null,
              "cuentaBanco":null,
              "selectOficina":null,
              "departamento":null,
              "provincia":null,
              "distrito":null,
              "ubigeo":null
          }
          const response = await apiPreevaluation(this.$axios, data)
          //commit('SET_PRODUCT_CODE', response.prospecto.codigoProducto)
          commit('SET_PROSPECT', response)
          console.log(response)
          ///this.$showSpinner(false)
        } catch (error) {
          //this.$showSpinner(false)
          //throw error
        }
    },
    async getMarcasCel({ commit, state, rootState }, payload) {
        try {
            const response = await  apiGetMarcasCelulares(this.$axios, null)
        
        commit('SET_MARCAS_CEL', response.data.data)
        console.log(response.data.data)
        } catch (error) {
            console.log('ERROR getMarcas',error)
        }
    },
    async getModelosCel({ commit, state, rootState }, payload) {
        try {
            const response = await  apiGetModelosCelulares(this.$axios, null)
        
        commit('SET_MODELOS_CEL', response.data.data)
        console.log(response.data.data)
        } catch (error) {
            console.log('ERROR getMarcas',error)
        }
    },
    async updateProspecto({ commit, state }, data) {
        /* console.log('UPDATE') */
        /* console.log(data) */
        const response = await this.$axios({
            url: '/v4/prospecto/v2.0/producto/lde?tipo=0',
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                Authorization: process.env.BASIC_AUTH,
            },
            data,
        })

        console.log('RESPUESTA UPDATE PROSPECTO', response.data)
        commit('SET_DIALOG', true)
    },
    async enviarDocumentos({ commit, state }, payload) {
        try {
            commit('SET_STEP', -1)
            const data = {
                placa: state.datos.placa,
                documento: state.datos.documento,
                codigoProspecto: state.datos.codigoProspecto,
                estadoProspecto: state.datos.estadoProspecto,
                codigoProducto: state.datos.codigoProducto,
                channel: state.datos.channel,
                codigoEvaluacion: state.datos.codigoEvaluacion,
                fileDNI: payload.arrayDocuments[0],
                fileReniec: payload.arrayDocuments[1],
            }
            /* console.log('body') */
            /* console.log(data) */
            const url = `/v4/prospecto/v2.0/producto/lde?tipo=${state.datos.codigoCredito ? 0 : 2
                }`
            /* console.log('url: ', url, 'contrato : ', state.datos.codigoCredito) */
            const response = await this.$axios({
                url,
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    Authorization: process.env.BASIC_AUTH,
                },
                data,
            })
            if (response.data.codigoRespuesta == '00') {
                commit('UPDATE_DATOS', response.data)
                commit('SET_STEP', 3)
            } else {
                commit('SET_STEP', 1)
                commit(
                    'ui/SET_OPENDIALOG',
                    {
                        estado: true,
                        mensaje: 'Ha ocurrido un error interno',
                    },
                    { root: true }
                )
                commit('RESET_STATES')
            }
        } catch (error) {
            /* console.log(error) */
        }
    },
    async enviarFichaReniec({ commit, state }, payload) {
        try {
            commit('SET_STEP')
            /* console.log('PAYLOAD:  ', payload) */
            const url = `/v4/prospecto/v2.0/producto/lde?tipo=${state.datos.codigoCredito ? 0 : 2
                }`

            /* console.log('url: ', url, 'contrato : ', state.datos.codigoCredito) */
            const response = await this.$axios({
                url,
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    Authorization: process.env.BASIC_AUTH,
                },
                data: payload,
            })
            return response.data
        } catch (error) {
            commit(
                'ui/SET_OPENDIALOG',
                {
                    estado: true,
                    mensaje: 'Error al enviar ficha reniec',
                },
                { root: true }
            )
        }
    },
    async enviarDocValorados({ commit, state, rootState }, payload) {
        try {
            /* console.log('update_valorados') */
            /* console.log(state.datos) */
            commit('SET_STEP', -1)
            const data = {
                placa: state.datos.placa,
                documento: state.datos.documento,
                codigoProspecto: state.datos.codigoProspecto,
                estadoProspecto: 10,
                codigoProducto: state.datos.codigoProducto,
                codigoExpediente: state.datos.codigoExpediente,
                codigoUsuario: rootState.users.promotor.codigoUsuario,
                channel: state.datos.channel,
                tokenSMS: state.datos.tokenSMS,
                fi_hojres: state.datos.fi_hojres,
                fi_solcre: state.datos.fi_solcre,
                fi_contra: state.datos.fi_contra,
                fi_cronog: state.datos.fi_cronog,
                fi_carins: state.datos.fi_carins,
            }
            /* console.log('valorados') */
            /* console.log(data) */
            const response = await this.$axios({
                url: '/v4/prospecto/v2.0/producto/lde?tipo=3',
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    Authorization: process.env.BASIC_AUTH,
                },
                data,
            })
            if (response.data.codigoRespuesta === '00') {
                commit('UPDATE_DATOS', response.data)
                commit('SET_STEP', 4)
            } else {
                commit('SET_STEP', 1)
                commit(
                    'ui/SET_OPENDIALOG',
                    {
                        estado: true,
                        mensaje: 'Ha ocurrido un error interno',
                    },
                    { root: true }
                )
                commit('RESET_STATES')
            }
        } catch (error) {
            /* console.log(error) */
        }
    },
    async obtenerFichaReniec({ commit, state }, payload) {
        /* console.log('Action documento: ', payload) */
        const response = await this.$axios({
            url: '/v8/externos/v2.0/reniec/ficha',
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: process.env.BASIC_AUTH,
            },
            data: {
                documento: payload.documento,
            },
        })
        const idGenero =
            response.data.js_ficren.data.GENDER == 'MASCULINO' ? 'M' : 'F'
        let codEstadoCivil
        switch (response.data.js_ficren.data.CIVIL_STATUS) {
            case 'Soltero':
                codEstadoCivil = 'SO'
                break
            case 'Casado':
                codEstadoCivil = 'CA'
                break
            case 'Viudo':
                codEstadoCivil = 'VI'
                break
            case 'Divorciado':
                codEstadoCivil = 'DI'
                break
            default:
                codEstadoCivil = 'NA'
                break
        }
        /* console.log("codEstadoCivil",codEstadoCivil); */
        const update = {
            apellidoPaterno: response.data.apellidoPaterno,
            apellidoMaterno: response.data.apellidoMaterno,
            nombres: response.data.nombres,
            genero: idGenero,
            estadoCivil: codEstadoCivil,
            jsonReniec: {
                co_resbio: payload.co_resbio, //payload - scoket
                co_trazas: payload.co_trazas, //payload - scoket
                fi_huella: payload.fi_huella, //data - scoket
                js_ficren: response.data.js_ficren, // response.data
                fi_ficren: response.data.fi_ficren,
            },
        }
        /* console.log('Ver objeto datos: ', update) */
        commit('UPDATE_DATOS', update)
        /* console.log('Respuesta action document ', response.data) */

        return response.data
    },

    /* PROYECTO RETANQUEO */
    async errorManagment(e) {
        try {
            await this.$axios({
                url: 'http://localhost:5000/errors',
                method: 'POST',
                data: {
                    id: Date.now(),
          /* error: {
              message: error.message,
              stack: error.stack,
              config: {
                url: error.config.url,
                method: error.config.method,
                data: error.config.data
              }
            },
 */ step: e,

                    product: 'renovacion',
                },
            })
        } catch (error) {
            console.log(error)
        }
    },
    async validaCliente({ commit, state }, payload) {
        console.log('payload: ', payload)
        try {
            const { data } = await this.$axios({
                url: '/kong/prospecto/v1.0/producto/retanqueo/ov',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: process.env.BASIC_AUTH_KONG,
                },
                data: {
                    channel: payload.channelForm,
                    codigoProducto: payload.codigoProductoForm,
                    tipoDocumento: payload.tipoDocForm,
                    documento: payload.documentoForm,
                    placa: payload.placaForm,
                },
            })
            return data
        } catch (error) {
            throw new Error(
                'En estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.'
            )
        }
    },
    async validaClienteFae({ commit, state }, payload) {
        console.log('payload: ', payload)
        try {
            const { data } = await this.$axios({
                url: '/kong/prospecto/v1.0/producto/fae/ov',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: process.env.BASIC_AUTH_KONG,
                },
                data: {
                    channel: payload.channelForm,
                    codigoProducto: payload.codigoProductoForm,
                    tipoDocumento: payload.tipoDocForm,
                    documento: payload.documentoForm,
                    placa: payload.placaForm,
                },
            })
            return data
        } catch (error) {
            throw new Error(
                'En estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.'
            )
        }
    },
    async obtenerPreguntas({ commit }, codigoProspecto) {
        try {
            const { data } = await this.$axios({
                url: `/kong/prospecto/v1.0/producto/preguntas/${codigoProspecto}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: process.env.BASIC_AUTH_KONG,
                },
            })
            commit(
                'SET_QUIZ',
                data
            ) /** NO SE COLOCA "express/" YA QUE ESTAMOS EN EL MISMO SCRIPT .JS */
            //commit('SET_COD_PROSP', codigoProducto)
            return data
        } catch (error) {
            throw new Error(
                'En estos momentos no se puede obtener las preguntas, por favor inténtalo en unos minutos.'
            )
        }
    },
    async validaPreguntas({ }, payload) {
        try {
            const { data } = await this.$axios({
                url: '/kong/prospecto/v1.0/producto/preguntas',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: process.env.BASIC_AUTH_KONG,
                },
                data: payload,
            })

            return data
        } catch (error) {
            throw new Error(
                'En estos momentos no se puede validar las preguntas, por favor inténtalo en unos minutos.'
            )
        }
    },
    async elegirOferta({ }, payload) {
        try {
            const { data } = await this.$axios({
                //url: '/private/prospecto/v1.0/producto/retanqueo/0',
                url: '/kong/prospecto/v2.0/producto/lde?tipo=0',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    //Authorization: process.env.BASIC_AUTH_KONG
                    Authorization: process.env.BASIC_AUTH_KONG,
                },
                data: payload,
            })
            return data
        } catch (error) {
            throw new Error(
                'En estos momentos no se puede procesar tu oferta, por favor inténtalo en unos minutos.'
            )
        }
    },
    async confirmarDatos({ }, payload) {
        try {
            const { data } = await this.$axios({
                url: '/kong/prospecto/v2.0/producto/lde?tipo=2',
                //url: 'https://sd1.accesocrediticio.com/ms/prospecto/v2.0/producto/lde?tipo=2',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: process.env.BASIC_AUTH_KONG,
                },
                data: payload,
            })

            return data
        } catch (error) {
            throw new Error(
                'En estos momentos no podemos actualizar tus datos, por favor inténtalo en unos minutos.'
            )
        }
    },
    async validarGenerarContractuales({ }, payload) {
        try {
            const { data } = await this.$axios({
                url: '/kong/contratos/v1.0/contratos',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: process.env.BASIC_AUTH_KONG,
                },
                data: payload,
            })
            return data
        } catch (error) {
            throw new Error(
                'En estos momentos no podemos generar tus contratos, por favor inténtalo en unos minutos.'
            )
        }
    },

    async validaJWT({ }, codigoContrato) {
        try {
            const { data } = await this.$axios({
                url: `/kong/credito/v1/validar-creditos?codigoContrato=${codigoContrato}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: process.env.BASIC_AUTH_KONG,
                },
                // data: payload
            })
            return data
        } catch (error) {
            throw new Error(
                'En estos momentos no podemos generar tus contratos, por favor inténtalo en unos minutos.'
            )
        }
    },

    //momentaneo
    async generateTokenCuentaBancaria({ }, payload) {
        try {
            const { data } = await this.$axios({
                url: '/v7/private/v1.0/generarTokenNewSms',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: process.env.BASIC_AUTH,
                },
                data: payload,
            })
            return data
        } catch (error) {
            throw new Error(
                'En estos momentos no podemos generar tus contratos, por favor inténtalo en unos minutos.'
            )
        }
    },
    async validatedTokenCuentaBancaria({ }, payload) {
        try {
            const { data } = await this.$axios({
                url: '/v7/private/v1.0/validarTokenNew',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: process.env.BASIC_AUTH,
                },
                data: payload,
            })
            return data
        } catch (error) {
            throw new Error(
                'En estos momentos no podemos generar tus contratos, por favor inténtalo en unos minutos.'
            )
        }
    },

    async updateTokenCuentaBancaria({ }, payload) {
        try {
            const { data } = await this.$axios({
                url: '/v4/credito/v1/actualizarCreExpPro',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: process.env.BASIC_AUTH,
                },
                data: payload,
            })
            return data
        } catch (error) {
            throw new Error(
                'En estos momentos no podemos generar tus contratos, por favor inténtalo en unos minutos.'
            )
        }
    },

    /* PROYECTO CAMPAÑA CONVERSIONES */

    async validaCampanaConversiones({ commit }, payload) {
        try {
            const dataLde = await lde(payload)
            let dialog = {
                estado: true,
                mensaje: null,
                imgModal: null,
                tituloModal: null,
            }
            console.log('dataLde: ', dataLde)
            if (dataLde.codigoRespuesta === '00') {
                commit('UPDATE_DATOS', dataLde)
                if (dataLde.estadoProspecto === 11) {
                    dialog.mensaje = 'Ya cuenta con crédito Activado.'
                    commit('SET_STEP', 1)
                    commit('RESET_STATES')
                } else if (dataLde.estadoProspecto === 4) {
                    commit('SET_STEP', 3)
                    dialog.estado = false
                } else if (dataLde.estadoProspecto === 2) {
                    dialog.mensaje = 'Tu evaluación esta en proceso'
                    commit('RESET_STATES')
                } else {
                    commit('SET_STEP', 1)
                    dialog.mensaje = 'Ya cuenta con solicitud en proceso'
                    commit('RESET_STATES')
                }
            } else if (dataLde.codigoRespuesta == '01') {
                commit('SET_STEP', 1)
                dialog.mensaje = 'Ya cuenta con solicitud en proceso'
                commit('RESET_STATES')
            } else if (dataLde.codigoRespuesta == '03') {
                this.$fb.track('Desaprobado')
                commit('SET_STEP', 1)
                dialog.mensaje =
                    'En esos momentos no podemos ofrecerle una oferta, favor intente en otro momento'
                commit('RESET_STATES')
            } else if (dataLde.codigoRespuesta == '04') {
                dialog.imgModal = 'success'
                dialog.tituloModal = '¡Felicidades!'
                dialog.mensaje = `Ya tenemos un préstamo aprobado para ti
            <br>
            Dale click <a href="https://oficina.acceso.com.pe/renovacion">aquí</a> para solicitarlo
          `
                commit('RESET_STATES')
            } else if (dataLde.codigoRespuesta == '05') {
                dialog.imgModal = 'warning'
                dialog.tituloModal = 'Estimado Cliente'
                dialog.mensaje = 'Usted no se encuentra calificado para esta campaña'
                commit('RESET_STATES')
            } else {
                ; (dialog.mensaje =
                    'En en estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.'),
                    commit('RESET_STATES')
            }
            commit(
                'ui/SET_OPENDIALOGALERT',
                {
                    imgModal: dialog.imgModal ? dialog.imgModal : 'warning',
                    tituloModal: dialog.tituloModal ? dialog.tituloModal : '¡Alerta!',
                    msgModal: dialog.mensaje,
                    maxWidth: 350,
                    estadoModal: dialog.estado,
                    isReset: false,
                },
                { root: true }
            )
        } catch (error) {
            commit(
                'ui/SET_OPENDIALOGALERT',
                {
                    imgModal: 'error',
                    tituloModal: 'Error!',
                    msgModal:
                        'En en estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.',
                    maxWidth: 350,
                    estadoModal: true,
                    isReset: false,
                },
                { root: true }
            )
        }
    },

    resetStates({ commit }) {
        /* console.log('reset') */
        commit('RESET_STATES')
        commit('SET_STEP', 1)
    },
}
