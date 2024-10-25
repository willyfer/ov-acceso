<template>
  <div>
    <v-row no-gutters align-center text-center>
      <v-col cols="12" md="12">
        <h3
          class="ld-h2-title-form"
          :class="`${color}--text`"
        >Esperando respuesta de la validación Biométrica</h3>
      </v-col>
      <v-col cols="12" sm="4" offset-sm="4">
        <StepSquare
          :ready="paso1"
          :icono="require('@/assets/CargandoDatos.png')"
          texto="Esperando respuesta"
        />
      </v-col>
      <v-col cols="12" md="12" class="contenedor-btn-manual">
        <v-btn
          class="ld-btn"
          type="button"
          color="acceso"
          style="margin-top: 30px;"
          @click="valManual"
        >Validación Manual</v-btn>
      </v-col>
    </v-row>
    <ModalUploader :color="color" />

    <v-dialog v-model="dialog" persistent max-width="350">
      <v-card shaped style="border-radius: 15px;">
        <v-card-title>
          <v-row class="d-flex flex-row justify-center text-center title justify">
            <b style="word-break: break-word;" class="secondary--text justify" v-html="message"></b>
          </v-row>
        </v-card-title>
        <v-card-actions class="d-flex flex-row justify-center">
          <v-btn color="red" class="white--text" @click="declinar">Declinar</v-btn>
          <v-btn color="express" class="white--text" @click="dialog = false">Reintentar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import io from 'socket.io-client'
let socket = null
import { mapState } from 'vuex'
import FileUploader from '@/components/shared/uploader/FileUploader'
import ModalUploader from '@/components/modals/ModalUploader'
import StepSquare from '@/components/shared/loading/StepSquare'
import { mixins } from '@/mixins/mixin.js'
import { fraudeLD } from '@/utils/template/templateFraude.js'
import { enviarCorreo } from '@/api/email';
import { getNameUsers } from '@/api/user';
export default {
  components: {
    FileUploader,
    ModalUploader,
    StepSquare
  },
  mixins: [mixins],
  props: ['color', 'documentos'],
  data() {
    return {
      paso1: '0',
      dialog: false,
      message: null
    }
  },
  computed: {
    ...mapState('express', ['datos']),
    ...mapState('users', ['promotor'])
  },
  async mounted() {
    this.$ga.event('biometria', 'esperando respuesta')
  },
  methods: {
    async valManual() {
      const ficha = await this.$store.dispatch('express/obtenerFichaReniec', {
        documento: this.datos.documento,
        co_resbio: '02',
        co_trazas: null,
        fi_huella: null
      })
      await this.$store.dispatch('express/updateProspecto', {
        codigoProducto: this.datos.codigoProducto,
        codigoUsuario: this.promotor.codigoUsuario,
        codigoProcurador: this.promotor.codigoUsuario,
        placa: this.datos.placa,
        documento: this.datos.documento,
        estadoProspecto: this.datos.estadoProspecto,
        codigoProspecto: this.datos.codigoProspecto,
        jsonReniec: this.datos.jsonReniec,
        apellidoPaterno: this.datos.apellidoPaterno,
        apellidoMaterno: this.datos.apellidoMaterno,
        nombres: this.datos.nombres,
        genero: this.datos.genero,
        estadoCivil: this.datos.estadoCivil
      })
      /* console.log('this.estadoCivil: ', this.datos.estadoCivil) */
      this.$store.commit('ui/UPDATE_STEP', 3)
    },
    async enviarCorreoFraude() {
      /* console.log('this.datos.codigoProspecto', this.datos.codigoProspecto) */
      const result = await getNameUsers(this.$axios, this.datos.codigoProspecto)
      /* console.log('userAsegurador', result) */
      const { usuAsegurador, usuProcurador, usuPromotor } = result
      const tipoCanal = this.catalogoCanal(this.datos.canalAtencion)
      const tipoOrigen = this.catalogoOrigen(this.datos.origen)
      const dataTemplate = {
        apellidoPaterno: this.datos.apellidoPaterno,
        apellidoMaterno: this.datos.apellidoMaterno,
        nombres: this.datos.nombres,
        documento: this.datos.documento,
        placa: this.datos.placa,
        tipoCanal: tipoCanal,
        tipoOrigen: tipoOrigen,
        nombreAsegurador: usuAsegurador ? usuAsegurador.no_usuper : 'No aplica',
        nombreProcurador: usuProcurador ? usuProcurador.no_usuper : 'No aplica',
        nombrePromotor: usuPromotor ? usuPromotor.no_usuper : 'No aplica'
      }
      /* console.log('template: ', dataTemplate) */
      const jsonCorreo = {
        de: 'Acceso Corp <workflow@acceso.com.pe>',
        para: 'renzo.aquije@acceso.com.pe',
        cc:
          'jorge.bardales@acceso.com.pe; ana.bocanegra@acceso.com.pe; ignacio.quezada@acceso.com.pe; erika.ramos@acceso.com.pe; magaly.terreros@acceso.com.pe; lorena.martinez@acceso.com.pe; pilar.fonseca@acceso.com.pe; valeria.hidalgo@acceso.com.pe; alejandra.herrera@acceso.com.pe;',
        asunto: `INTENTO DE FRAUDE EN “LD-FR” – CLIENTE: ${this.datos.apellidoPaterno} / DNI: ${this.datos.documento}`,
        html: fraudeLD(dataTemplate),
        adjuntos: []
      }
      const respEnviarCorreo = await enviarCorreo(this.$axios, jsonCorreo)
      return respEnviarCorreo
    },
    async declinar() {
      const updateDatosReniec = {
        co_resbio: '01',
        co_trazas: null,
        fi_huella: null,
        js_ficren: {},
        fi_ficren: null
      }
      await this.$store.dispatch('express/updateProspecto', {
        codigoProducto: this.datos.codigoProducto,
        codigoUsuario: this.promotor.codigoUsuario,
        codigoProcurador: this.promotor.codigoUsuario,
        placa: this.datos.placa,
        documento: this.datos.documento,
        estadoProspecto: 12,
        codigoProspecto: this.datos.codigoProspecto,
        jsonReniec: updateDatosReniec,
        isFraude: true,
        estadoBio: true
      })
      const respEnviarCorreo = await this.enviarCorreoFraude()
      this.closeModal()
      this.$store.commit('ui/SET_OPENDIALOG', {
        estado: true,
        mensaje: 'Se procedió a desestimar el crédito'
      })
    },
    closeModal() {
      ;(this.dialog = false), (this.message = '')
    },
    modalReintento(payload) {
      this.dialog = payload.isDialog
      this.message = payload.text
    },
    catalogoOrigen(idOrigen) {
      let tipoOrigen = null
      switch (idOrigen) {
        case 0:
          tipoOrigen = 'Indeterminado'
          break
        case 1:
          tipoOrigen = 'Google'
          break
        case 2:
          tipoOrigen = 'Facebook'
          break
        case 3:
          tipoOrigen = 'WhatsApp'
          break
        case 4:
          tipoOrigen = 'Organico'
          break
        case 5:
          tipoOrigen = 'Promotor'
          break
        case 6:
          tipoOrigen = 'Asesor'
          break
        default:
          tipoOrigen = 'Indeterminado'
      }
      return tipoOrigen
    },
    catalogoCanal(idCanal) {
      let tipoCanal = null
      switch (idCanal) {
        case 1:
          tipoCanal = 'Digital  '
          break
        case 2:
          tipoCanal = 'Aliados Comerciales  '
          break
        case 3:
          tipoCanal = 'Promotor externo  '
          break
        case 4:
          tipoCanal = 'Promotor interno  '
          break
        case 5:
          tipoCanal = 'Atención presencial  '
          break
        default:
          tipoCanal = 'Indeterminado'
      }
      return tipoCanal
    }
  },
  async created() {
    try {
      socket = io.connect(
        process.env.SOCKET_URL_EXT,
        { transports: ['websocket'], upgrade: false, forceNew: true },
        { 'force new connection': true }
      ) // me conecto al servidor

      socket.on(this.datos.documento, async (data) => {
        /* console.log('listening', data) */
        if (data.codigoRespuesta == '00') {
          if (data.co_resbio == '00' || data.co_resbio == '02') {
            /* console.log('Entrando estado 00 - 02 ...') */
            const ficha = await this.$store.dispatch(
              'express/obtenerFichaReniec',
              {
                documento: this.datos.documento,
                co_resbio: data.co_resbio,
                co_trazas: data.co_trazas,
                fi_huella: data.fi_huella
              }
            )

            /* console.log('this.estadoCivil: ', this.estadoCivil) */

            await this.$store.dispatch('express/updateProspecto', {
              codigoProducto: this.datos.codigoProducto,
              codigoUsuario: this.promotor.codigoUsuario,
              codigoProcurador: this.promotor.codigoUsuario,
              placa: this.datos.placa,
              documento: this.datos.documento,
              estadoProspecto: this.datos.estadoProspecto,
              codigoProspecto: this.datos.codigoProspecto,
              jsonReniec: this.datos.jsonReniec,
              estadoBio: data.co_resbio == '00' ? true : false,
              apellidoPaterno: this.datos.apellidoPaterno,
              apellidoMaterno: this.datos.apellidoMaterno,
              nombres: this.datos.nombres,
              genero: this.datos.genero,
              estadoCivil: this.datos.estadoCivil
            })
            /* console.log('Finalizó correctamente') */

            if (data.co_resbio == '00') {
              this.$store.commit('ui/UPDATE_STEP', 4)
            } else {
              this.$store.commit('ui/UPDATE_STEP', 3)
            }
          } else {
            if (data.numIntentos < 3) {
              /* console.log('Menos de 3 intentos') */
              const dataModal = {
                isDialog: true,
                text: 'Huella inválida. No coincide con la huella original.'
              }
              this.modalReintento(dataModal)
            } else {
              /* console.log('Mas de 3 intentos') */
              const updateDatosReniec = {
                co_resbio: '01',
                co_trazas: null,
                fi_huella: null,
                js_ficren: {},
                fi_ficren: null
              }
              await this.$store.dispatch('express/updateProspecto', {
                codigoProducto: this.datos.codigoProducto,
                codigoUsuario: this.promotor.codigoUsuario,
                codigoProcurador: this.promotor.codigoUsuario,
                placa: this.datos.placa,
                documento: this.datos.documento,
                estadoProspecto: 12,
                codigoProspecto: this.datos.codigoProspecto,
                jsonReniec: updateDatosReniec,
                isFraude: true,
                estadoBio: true
              })
              const respEnviarCorreo = await this.enviarCorreoFraude()
              /* console.log('respEnviarCorreo: ', respEnviarCorreo) */
              this.$store.commit('ui/SET_OPENDIALOG', {
                estado: true,
                mensaje: 'Huella inválida. No coincide con la huella original.'
              })
            }
          }
        } else {
          throw new Error('Ha ocurrido un error interno')
        }
      })
    } catch (error) {
      this.$store.commit('ui/SET_OPENDIALOG', {
        estado: true,
        mensaje: 'Ha ocurrido un error interno.'
      })
    }
  },
  beforeDestroy() {
    /* console.log('destruyendo') */
    socket.off()
  }
}
</script>

<style scoped>
@media (max-width: 991px) {
  .ld-final {
    display: flex;
    justify-content: center;
  }
}

.file_uploader {
  background: red;
  padding: 4px;
}

.contenedor-btn-manual {
  float: none;
  text-align: center;
}
</style>
