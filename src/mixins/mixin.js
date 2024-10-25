import { mapState } from 'vuex'
export const mixins = {
  $_veeValidate: {
    validator: 'new'
  },
  props: ['color'],
  methods: {
    isNewCreated(codigoProducto) {
      this.$store.dispatch('express/resetStates')

      const channel = this.promotor.state ? this.promotor.channel : 1
      let origen = this.$route.query.origen ? this.$route.query.origen : 4
      if (this.promotor.state) {
        if (channel != 5) {
          origen = 5
        } else {
          origen = 6
        }
      }
      //console.log('origen: ', origen, 'chanel: ', channel)
      this.$store.commit('express/UPDATE_DATOS', { origen, channel })
    },
    mensajeCatalogo(estadoprospecto) {
      let text = null
      switch (estadoprospecto) {
        case 0:
          text = 'No hemos encontrado su solicitud'
          break
        case 1:
          text = 'Ya cuenta con solicitud en proceso'
          break
        case 2:
          text = 'Ya cuenta con solicitud en proceso'
          break
        case 3:
          text = 'Ya cuenta con solicitud en proceso'
          break
        case 4:
          text = 'Ya cuenta con solicitud en proceso'
          break
        case 5:
          text = 'Ya cuenta con solicitud en proceso'
          break
        case 6:
          text = 'Ya cuenta con solicitud en proceso'
          break
        case 7:
          text = 'Ya cuenta con solicitud en proceso'
          break
        case 8:
          text = 'Ya cuenta con solicitud en proceso'
          break
        case 9:
          text = 'Ya cuenta con solicitud en proceso'
          break
        case 10:
          text = 'Ya cuenta con solicitud en proceso'
          break
        case 11:
          text = 'Ya cuenta con crédito Activado'
          break
        case 12:
          text = 'No hemos encontrado su solicitud'
          break
        case 13:
          text =
            'No coincidieron las huellas, reportar al área correspondiente.'
          break
        default:
          text = 'No se pudo procesar su solicitud'
          break
      }
      return text
    },
    setCaptcha() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          try {
            this.loading = true
            this.$store.commit('default/UPDATE_STEP', 0)
            this.$ga.event('Prospecto', 'Formulario-Completo')

            if (!this.promotor.state) {
              const token = await this.$recaptcha.execute('form')
              const isUser = await this.validateCaptcha(token)

              if (isUser) {
                await this.evaluarProspecto()
              } else {
                // bot detected
                this.loading = false
                this.$store.commit('ui/SET_MODAL', {
                  id: 17,
                  state: true
                })
              }
            } else {
              await this.evaluarProspecto()
              this.loading = false
            }
          } catch (error) {
            this.loading = false
            this.$store.commit('ui/SET_MODAL', {
              id: 8,
              state: true
            })
            // console.log('Login error:', error)
          }
        } else {
          this.$ga.event('Prospecto', 'Formulario-Incompleto')
        }
      })
    },
    async evaluarProspecto() {
      this.loading = true
      await this.$store.dispatch('default/preEvaluate')
      this.loading = false
    },
    async getClient(documento) {
      await this.$store.dispatch('users/getClient', documento)
    },
    async validateCaptcha(token) {
      const response = await this.$axios({
        url: '/api/private/v1.1/verifyRecaptcha',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
        },
        data: {
          secret: process.env.SECRETKEY_CAPTCHA,
          token
        }
      })
      return response.data
    },
    async sendToken(telefono) {
      await this.$store.dispatch('default/sendToken', telefono)
    },
    isNumber(evt) {
      evt = evt || window.event
      const charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    formatPlaca(val) {
      /*       var placa_format = placa.substr(0,3).toUpperCase() + '-' +placa.substr(2,3).toUpperCase()
            console.log(placa_format)
            return(placa_format) */
      let placa
      placa = val.replace('-', '')
      placa =
        val.substr(0, 3).toUpperCase() + '-' + val.substr(3, 3).toUpperCase()
      /* var placa = val.toUpperCase */
      console.log(placa)

      this.$store.commit('express/UPDATE_DATOS', { placa })
      return placa
    },
    cierradialog() {
      this.$store.commit('ui/SET_OPENDIALOG', {
        estado: false,
        mensaje: null
      })
    }
  },
  computed: {
    ...mapState('express', ['datos', 'openDialog']),
    estadoPrevaluate() {
      if (this.openDialog) {
        return this.openDialog.estado
      }
    },
    mensajePrevaluate() {
      if (this.openDialog) {
        return this.openDialog.mensaje
      }
    }
  },
  watch: {
    codigoReferidos(newValue) {
      const doc = newValue
      if (doc && doc.length === 8) {
        if (this.documento === newValue) {
          this.duplicateDoc = true
        } else {
          this.duplicateDoc = false
        }
      }
    },
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  }
}
