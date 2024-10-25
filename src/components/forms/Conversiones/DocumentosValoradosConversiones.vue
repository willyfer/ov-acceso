<template>
  <div class="container-principal__valorados">
    <v-row slot="formulario" class="justify-center">
      <div v-for="contratos in arrayContratos" :key="contratos.id">
        <v-col cols="12" pb-3>
          <v-row justify="center">
            <v-col
              cols="12"
              md="12"
              lg="12"
              class="d-flex flex-column justify-center"
              style="padding:4px"
            >
              <h2
                class="ld-h2-title-form display-1 text-color--primary"
                style="font-size: 1.5em !important"
              >
                Revisa tus documentos contractuales
                {{ contratos.codigoProducto === 24 ? 'LD' : 'GNV' }}
              </h2>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </v-col>
        <v-col cols="12" pt-2>
          <v-row
            no-gutters
            wrap
            align-content-center
            style="display: flex; justify-content: space-around;"
          >
            <v-col v-for="(item, key) in contratos.items" :key="key" cols="6" sm="4">
              <DocumentoFirmarConversiones
                :item="item"
                :maxItems="9"
                :codigoExpediente="contratos.codigoExpediente"
              ></DocumentoFirmarConversiones>
            </v-col>
          </v-row>
        </v-col>
      </div>
      <v-col v-if="!isSelectALL" cols="12" class="text-center">
        <v-checkbox v-model="datos.terminosCondiciones" type="checkbox" :color="color">
          <div slot="label">
            <span slot="activator" class="font">
              ¡Visualiza los contractuales y procede a firmarlos de forma
              inmediata!
            </span>
          </div>
        </v-checkbox>
      </v-col>
      <v-col cols="12" py-3>
        <v-divider></v-divider>
      </v-col>
      <v-col cols="12" class="text-center" order-xs="1" order-sm="2">
        <div v-if="FirmaReady === 1">
          <v-btn class="ld-btn" disabled :color="color">
            <b>{{ buttonDinamic }}</b>
          </v-btn>
        </div>
        <div v-if="FirmaReady === 2">
          <v-btn
            class="ld-btn"
            :loading="loading"
            :color="color"
            @click.stop=";(enviarTokenDialog = true), enviarToken()"
          >
            <b>FIRMAR</b>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="enviarTokenDialog" persistent max-width="500" height="auto">
      <form @submit.prevent="validarToken">
        <v-card class="ld-modal">
          <v-card-title
            style="word-break: break-word"
            class="secondary--text headlineclass text-center font-weight-bold"
          >
            Ingresa el código de 6 dígitos que enviaremos a tu celular
            {{ this.datos.celular }}
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="tokenenviado"
              v-validate="'required|max:6|min:6|numeric'"
              data-vv-name="token"
              :error-messages="errors.collect('token')"
              maxlength="6"
              minlength="6"
              :counter="6"
              color="#005092"
              class="secondary--text"
              placeholder
              hint="Te enviamos un código  vía SMS"
              @keypress="isNumber"
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="action-modal-token">
            <v-row no-gutters>
              <v-col cols="12" order-sm="2" sm="7" class="text-center pa-1">
                <v-btn
                  class="action-modal-token__firmar"
                  type="submit"
                  :color="color"
                  :loading="loading"
                >FIRMAR DOCUMENTOS</v-btn>
              </v-col>
              <v-col cols="12" order-sm="1" sm="5" class="text-center pa-1">
                <v-btn
                  class="ld-btn-secondary action-modal-token__cancelar"
                  @click.prevent="closeModal"
                >CANCELAR</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
    <v-dialog v-model="estadoModalFinal" persistent :max-width="'350'">
      <v-card v-if="tipoDesembolso == 3">
        <v-card-title style="background-color: #ff7729; padding-bottom: 0px !important;">
          <v-row
            class="d-flex flex-row justify-center text-center title justify"
            style="padding-top: 15px"
          >
            <b class="justify" style="color: white">¡Felicidades!</b>
            <p style="word-break: break-word; color: white" class="justify">
              Hemos enviado los documentos contractuales a los medios de contacto que registraste.
            </p>
          </v-row>
        </v-card-title>
        <v-card-title
          class="secondary--text text-center"
          style="max-width: 430px;  margin: auto; padding-bottom: 0px !important;"
        >
          <b
            style="word-break: break-word; font-size: 20px;"
          >No olvides recoger tu efectivo presentado tu DNI</b>
        </v-card-title>
        <v-card-text class="secondary--text text-center" style="margin-top: 15px">
          <b>Recoge aquí tu dinero en efectivo</b>
        </v-card-text>
        <v-card-text>
          <div style="border: 1.2px solid #ff7729; border-radius: 10px">
            <v-row
              class="secondary--text"
              style="max-width: 450px; margin: auto; padding: 10px 30px;"
            >
              <v-col cols="12" md="3" style="padding: 0px;">Sede:</v-col>
              <v-col cols="12" md="9" style="padding: 0px;">
                {{
                datos.selectOficina ? datos.selectOficina.sede : null
                }}
              </v-col>
              <v-col cols="12" md="3" style="padding: 0px;">Dirección:</v-col>
              <v-col cols="12" md="9" style="padding: 0px;">
                {{
                datos.selectOficina ? datos.selectOficina.direccion : null
                }}
              </v-col>
              <v-col cols="12" md="3" style="padding: 0px;">Horario:</v-col>
              <v-col cols="12" md="9" style="padding: 0px;">
                {{
                datos.selectOficina ? datos.selectOficina.horario : null
                }}
              </v-col>
            </v-row>
          </div>
        </v-card-text>
        <v-card-actions class="d-flex flex-row justify-center">
          <v-btn color="#005092" class="white--text" @click="closeModal2">OK</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else-if="tipoDesembolso == 1">
        <v-card-title class="titulo-modalFinal__banco pb-2">
          <p>¡Felicidades!</p>
        </v-card-title>
        <v-card-text class="text-modalFinal__banco pt-2">
          <div class="text-parrafo__segundo">
            Hemos enviado los documentos contractuales a los medios de contacto que registraste.
          </div>
        </v-card-text>
        <v-card-actions class="d-flex flex-row justify-center">
          <v-btn color="#005092" class="white--text" @click="closeModal2">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import FormLayout from '@/components/FormLayout'
import { async } from 'q'
import DocumentoFirmarConversiones from '@/components/forms/Conversiones/Utils/DocumentoFirmarConversiones'
import { sendToken } from '@/api/authentication'
import { getNameUsers } from '@/api/user';
export default {
  name: 'DocumentosValoradosConversiones',
  $_veeValidate: {
    validator: 'new'
  },
  components: {
    FormLayout,
    DocumentoFirmarConversiones
  },
  props: ['documentos'],
  mounted() {
    try {   
      this.arrayContratos = Object.values(this.arrayDatos).map((item) => {        
        if (item) {
          if (
            item.codigoProducto === 19 ||
            item.codigoProducto === 20 ||
            item.codigoProducto === 21 ||
            item.codigoProducto === 22
          ) {
            return {
              codigoExpediente: item.codigoExpediente,
              codigoProducto: item.codigoProducto,
              items: this.contratosGNV
            }
          } else if (item.codigoProducto === 24) {
            return {
              codigoExpediente: item.codigoExpediente,
              codigoProducto: item.codigoProducto,
              items: this.contratosLD
            }
          } else {
            throw new Error('No se encontró datos válidos')
          }
        }
      })      
      if (this.datos.codigoProducto == 17 || this.datos.codigoProducto == 18) {
        this.items = [
          {
            id: 1,
            doc: 'gethoja_resumen_ws',
            title: 'HojaResumen',
            title2: 'Hoja Resumen'
          },
          {
            id: 2,
            doc: 'getsolicitud_ws',
            title: 'SolicitudDeCredito',
            title2: 'Solicitud de Crédito'
          },
          {
            id: 3,
            doc: 'getcontrato_ws',
            title: 'Contrato',
            title2: 'Contrato'
          },
          {
            id: 4,
            doc: 'getcronograma_ws',
            title: 'Cronograma',
            title2: 'Cronograma'
          },
          {
            id: 5,
            doc: 'getcarta_inspos_ws',
            title: 'CartaInstruccionIrrevocable',
            title2: 'Carta de Instrucción Irrevocable'
          },
          {
            id: 6,
            doc: 'getcarta_fr_pos_ws',
            title: 'AcuerdoCanalizacionPagos',
            title2: 'Acuerdo de Canalización de Pagos'
          }
        ]
      } else {
        this.items = [
          {
            id: 1,
            doc: 'gethoja_resumen_ws',
            title: 'HojaResumen',
            title2: 'Hoja Resumen'
          },
          {
            id: 2,
            doc: 'getsolicitud_ws',
            title: 'SolicitudDeCredito',
            title2: 'Solicitud de Crédito'
          },
          {
            id: 3,
            doc: 'getcontrato_ws',
            title: 'Contrato',
            title2: 'Contrato'
          },
          {
            id: 4,
            doc: 'getcronograma_ws',
            title: 'Cronograma',
            title2: 'Cronograma'
          }
        ]
      }
    } catch (error) {      
      this.$store.commit('ui/SET_OPENDIALOGALERT', {
        imgModal: 'error',
        tituloModal: '¡Lo sentimos!',
        msgModal:
          'En estos momentos no podemos obtener tus contratos, por favor inténtelo más tarde.',
        maxWidth: 350,
        estadoModal: true,
        isReset: true
      })
    }
  },
  data() {
    return {
      tipoDesembolso: null,
      loading: false,
      items: [],
      arrayContratos: [],
      dialog: false,
      FirmaReady: 1,
      tokenenviado: null,
      telefono: null,
      enviarTokenDialog: false,
      estadoModalFinal: false,
      color: 'acceso',
      contratosGNV: [
        {
          id: 1,
          doc: 'gethoja_resumen_ws',
          title: 'HojaResumen',
          title2: 'Hoja Resumen'
        },
        {
          id: 2,
          doc: 'getsolicitud_ws',
          title: 'SolicitudDeCredito',
          title2: 'Solicitud de Crédito'
        },
        {
          id: 3,
          doc: 'getcontrato_ws',
          title: 'Contrato',
          title2: 'Contrato'
        },
        {
          id: 4,
          doc: 'getcronograma_ws',
          title: 'Cronograma',
          title2: 'Cronograma'
        },
        {
          id: 5,
          doc: 'getpagare_contrato_ws',
          title: 'Pagare',
          title2: 'Pagaré'
        }
      ],
      contratosLD: [
        {
          id: 1,
          doc: 'gethoja_resumen_ws',
          title: 'HojaResumen',
          title2: 'Hoja Resumen'
        },
        {
          id: 2,
          doc: 'getsolicitud_ws',
          title: 'SolicitudDeCredito',
          title2: 'Solicitud de Crédito'
        },
        {
          id: 3,
          doc: 'getcontrato_ws',
          title: 'Contrato',
          title2: 'Contrato'
        },
        {
          id: 4,
          doc: 'getcronograma_ws',
          title: 'Cronograma',
          title2: 'Cronograma'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('conversiones', ['datos', 'arrayDatos']),
    isCheckValorados() {
      return this.datos.isCheckValorados
    },
    isSelectALL() {      
      if (
        this.isCheckValorados.length ===
          this.contratosGNV.length + this.contratosLD.length &&
        this.contratosGNV.length + this.contratosLD.length !== 0
      ) {
        this.$store.commit('conversiones/SET_DATOS', {
          terminosCondiciones: true
        })
        return true
      } else {
        return false
      }
    },
    terminosCondiciones() {
      return this.datos.terminosCondiciones
    },
    buttonDinamic() {
      if (this.isSelectALL) {
        this.FirmaReady = 2
      }
      return 'FIRMAR'
    }
  },
  watch: {
    async terminosCondiciones(val) {
      if (val) {
        this.$store.commit('conversiones/SET_DATOS', {
          isCheckValorados: this.items
        })
        this.FirmaReady = 2
        this.enviarTokenDialog = true
        await this.enviarToken()
      } else {
        this.FirmaReady = 1
      }
    }
  },
  methods: {
    allSignature() {
      this.FirmaReady = 2
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
    enviarToken() {
      this.loading = true
      const dataToken = {
        documento: this.datos.documento, //this.datos.documento,
        telefono: this.datos.celular //this.datos.telefono
      }
      sendToken(this.$axios, dataToken)
        .then((res) => {
          if (res.codRes == '00') {            
          } else if (res.codRes == '99') {
            this.$store.commit('ui/SET_OPENDIALOGALERT', {
              imgModal: 'warning',
              tituloModal: '¡Lo sentimos!',
              msgModal:
                'En estos momentos no podemos enviar el token, por favor inténtalo en unos minutos.',
              maxWidth: 350,
              estadoModal: true,
              isReset: true
            })
            setTimeout(() => {
              this.$store.commit('ui/UPDATE_STEP', 1)
            }, 4000)
          } else {
            throw new Error(
              'En estos momentos no podemos enviar el token, por favor inténtalo en unos minutos.'
            )
          }
        })
        .catch((err) => {
          this.enviarTokenDialog = false
          this.$store.commit('ui/SET_OPENDIALOGALERT', {
            imgModal: 'error',
            tituloModal: '¡Error!',
            msgModal: err.message,
            maxWidth: 350,
            estadoModal: true
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    closeModal() {
      this.tokenenviado = null
      this.enviarTokenDialog = false
    },
    closeModal2() {
      this.estadoModalFinal = false
      this.$router.push('/')
    },
    validarToken() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.loading = true
          const dataForm = Object.values(this.arrayDatos).map((item) => {
            return {
              token: this.tokenenviado,
              apellidoPaterno: item.apellidoPaterno,
              apellidoMaterno: item.apellidoMaterno,
              nombres: item.nombres,
              codigoExpediente: item.codigoExpediente,
              codigoCredito: item.codigoCredito,
              telefono: item.telefono,
              email: item.email,
              placa: item.placa,
              contratos:
                item.codigoProducto === 24
                  ? this.contratosLD
                  : this.contratosGNV,
              documento: item.documento,
              codigoProducto: item.codigoProducto,
              codigoProspecto: item.codigoProspecto,
              estadoProspecto: item.estadoProspecto,
              importeFinanciar: item.importeFinanciar,
              tipoDesembolso: item.tipoDesembolso,
              channel: item.channel
            }
          })
          this.$store
            .dispatch('conversiones/generarContratos', dataForm)
            .then((res) => {
              if (res.codRes == '00') {
                this.$fb.track('Activado')
                /* this.tipoDesembolso = this.datos.tipoDesembolso */
                this.tipoDesembolso = 1
                this.estadoModalFinal = true
              } else if (res.codRes == '01') {
                this.$store.commit('ui/SET_OPENDIALOGALERT', {
                  imgModal: 'warning',
                  tituloModal: 'Token Incorrecto!',
                  msgModal: 'Por favor vuelva a intentarlo',
                  maxWidth: 350,
                  estadoModal: true
                })
              } else if (res.codRes == '99') {
                this.$store.commit('ui/SET_OPENDIALOGALERT', {
                  imgModal: 'warning',
                  tituloModal: '¡Lo sentimos!',
                  msgModal:
                    'En estos momentos no podemos generar tus contratos, por favor inténtalo en unos minutos.',
                  maxWidth: 350,
                  estadoModal: true,
                  isReset: true
                })
                setTimeout(() => {
                  this.$store.commit('ui/UPDATE_STEP', 1)
                }, 4000)
              } else {
                throw new Error(
                  'En estos momentos no podemos generar tus contratos, por favor inténtalo en unos minutos.'
                )
              }
            })
            .catch((err) => {
              this.$store.commit('ui/SET_OPENDIALOGALERT', {
                imgModal: 'error',
                tituloModal: '¡Error!',
                msgModal: err.message,
                maxWidth: 350,
                estadoModal: true,
                isReset: true
              })
            })
            .finally(() => {
              this.loading = false
              this.enviarTokenDialog = false
              this.tokenenviado = null
            })
        }
      })
    }
  }
}
</script>

<style scoped>
.container-principal__valorados {
  max-width: 600px !important;
}
#ldForm {
  margin: 0 auto;
}
.ld-btn {
  min-width: 100px !important;
}
.ld-btn-secondary {
  min-width: 100px !important;
}
.docvaloricon {
  font-size: 75px !important;
}
.docvalorcard {
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
}
.action-modal-token__firmar {
  color: white;
  width: 100%;
}
.action-modal-token__cancelar {
  width: 100% !important;
}
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

.font {
  font-size: 0.9em !important;
}
.logo-banco {
  display: block;
  margin: auto;
}

.titulo-modalFinal__banco {
  display: flex;
  justify-content: center;
  align-items: center;
}

.titulo-modalFinal__banco p {
  margin-bottom: 0;
  width: 100%;
  text-align: center;
  border: 1.5px solid #005092;
  border-radius: 20px;
  font-weight: bold;
  color: #ff7729;
}

.text-modalFinal__banco {
  text-align: center;
  font-weight: bold;
}

.text-parrafo__primero {
  padding: 20px 5px;
  background-color: #e3e3e3;
  color: #005092;
  border-radius: 15px;
}

.text-parrafo__segundo {
  margin: 15px 0;
}
@media (max-width: 375px) {
  .container-principal__valorados {
    padding: 0 !important;
  }
  #ldForm {
    padding: 0 !important;
  }
}
</style>
