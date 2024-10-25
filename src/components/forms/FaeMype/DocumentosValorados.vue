<template>
  <div>
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
            class="ld-h2-title-form display-1 secondary--text"
            style="font-size: 1.5em !important"
          >
            Revisa tus documentos contractuales
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
        <v-col v-for="(item, key) in items" :key="key" cols="6" sm="4">
          <DocumentoFirmar :item="item"></DocumentoFirmar>
        </v-col>
      </v-row>
    </v-col>
    <v-col v-if="!isSelectALL" cols="12" class="text-center">
      <v-checkbox
        v-model="datos.terminosCondiciones"
        type="checkbox"
        :color="color"
      >
        <div slot="label">
          <span slot="activator" class="secondary--text font">
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
    <v-dialog
      v-model="enviarTokenDialog"
      persistent
      max-width="500"
      height="auto"
    >
      <form @submit.prevent="validarToken">
        <v-card class="ld-modal">
          <v-card-title
            style="word-break: break-word"
            class="secondary--text headlineclass text-center font-weight-bold"
          >
            Ingresa el código de 6 dígitos que enviaremos a tu celular 
            {{ this.resConfirmarDatos.telefono }}
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
          <v-card-actions>
            <v-row no-gutters>
              <v-col cols="12" order-md="2" md="7" class="text-center pa-1">
                <v-btn
                  type="submit"
                  class="ld-btn"
                  :color="color"
                  :loading="loading"
                  >FIRMAR DOCUMENTOS</v-btn
                >
              </v-col>
              <v-col cols="12" order-md="1" md="5" class="text-center pa-1">
                <v-btn class="ld-btn-secondary" @click.prevent="closeModal"
                  >CANCELAR</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
    <v-dialog v-model="estadoModalFinal" persistent :max-width="'500'">
      <v-card>
        <v-card-title
          style="background-color: #ff7729; padding-bottom: 0px !important;"
        >
          <v-row
            class="d-flex flex-row justify-center text-center title justify"
            style="padding-top: 15px"
          >
            <b class="justify" style="color: white">¡Felicidades!</b>
            <p style="word-break: break-word; color: white" class="justify">
              Hemos enviado los documentos contractuales a los medios de
              contactos registrados.
            </p>
          </v-row>
        </v-card-title>
        <v-card-title
          class="secondary--text text-center"
          style="max-width: 430px;  margin: auto; padding-bottom: 0px !important;"
        >
        </v-card-title>
        <v-card-text
          class="secondary--text text-center"
          style="margin-top: 15px"
        >
          <b>
            En 72 horas hábiles como máximo realizaremos la transferencia de tu
            préstamo en la cuenta bancaria registrada.
          </b>
          <br>
          <b>
            Recuerde que su solicitud
            estará siendo validada por COFIDE, para verificar que la información
            brindada este en orden. La solicitud no podrá seguir su curso si es
            que usted ya tiene un crédito FAE MYPE o Reactiva Perú.
          </b>
        </v-card-text>
        <!--v-card-text>
          <div style="border: 1.2px solid #ff7729; border-radius: 10px">
            <v-row
              class="secondary--text"
              style="max-width: 450px; margin: auto; padding: 10px 30px;"
            >
              <v-col cols="12" md="3" style="padding: 0px;">Sede:</v-col>
              <v-col cols="12" md="9" style="padding: 0px;">{{ datos.selectOficina.sede }}</v-col>
              <v-col cols="12" md="3" style="padding: 0px;">Dirección:</v-col>
              <v-col cols="12" md="9" style="padding: 0px;">{{ datos.selectOficina.direccion }}</v-col>
              <v-col cols="12" md="3" style="padding: 0px;">Horario:</v-col>
              <v-col cols="12" md="9" style="padding: 0px;">{{ datos.selectOficina.horario }}</v-col>
            </v-row>
          </div>
        </v-card-text-->
        <v-card-actions class="d-flex flex-row justify-center">
          <v-btn color="#005092" class="white--text" @click="closeModal2"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { async } from 'q'
import DocumentoFirmar from '@/components/forms/FaeMype/DocumentoFirmar'
import { sendToken, validateToken } from '@/api/authentication'
import { getNameUsers } from '@/api/user';
import ModalAlert from '@/components/modals/ModalAlert'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  components: {
    DocumentoFirmar,
    ModalAlert
  },
  props: ['color', 'documentos'],
  data() {
    return {
      loading: false,
      items: [
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
        { id: 3, doc: 'getcontrato_ws', title: 'Contrato', title2: 'Contrato' },
        {
          id: 4,
          doc: 'getcronograma_ws',
          title: 'Cronograma',
          title2: 'Cronograma'
        },
        {
          id: 5,
          doc: 'getcarta_fr_ws',
          title: 'CartaInsruccionFactorRecaudo',
          title2: 'Carta de Instrucción de Factor de Recaudo'
        }
      ],
      dialog: false,
      FirmaReady: 1,
      tokenenviado: null,
      telefono: null,
      enviarTokenDialog: false,
      estadoModalFinal: false
    }
  },
  computed: {
    ...mapState('express', [
      'datos',
      'terms',
      'codProspecto',
      'resConfirmarDatos'
    ]),
    ...mapState('users', ['promotor']),
    isCheckValorados() {
      return this.datos.isCheckValorados
    },
    isSelectALL() {
      if (this.isCheckValorados.length === 5) {
        this.$store.commit('express/UPDATE_DATOS', {
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
        this.$store.commit('express/UPDATE_DATOS', {
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
        documento: this.resConfirmarDatos.documento, //this.datos.documento,
        telefono: this.resConfirmarDatos.telefono //this.datos.telefono
      }
      sendToken(this.$axios, dataToken)
        .then((res) => {
          if (res.codRes == '00') {
            console.log('Se envió correctamente el token')
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
      location.reload()
      this.$router.push('/faemype')
    },
    validarToken() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.loading = true
          const validarTokenGenerarContractuales = {
            token: this.tokenenviado,
            apellidoPaterno: this.resConfirmarDatos.apellidoPaterno,
            apellidoMaterno: this.resConfirmarDatos.apellidoMaterno,
            nombres: this.resConfirmarDatos.nombres,
            codigoExpediente: this.resConfirmarDatos.codigoExpediente,
            codigoCredito: this.resConfirmarDatos.codigoCredito,
            telefono: this.resConfirmarDatos.telefono,
            email: this.resConfirmarDatos.email,
            placa: this.resConfirmarDatos.placa,
            contratos: this.items,
            documento: this.resConfirmarDatos.documento,
            codigoProducto: this.resConfirmarDatos.codigoProducto,
            codigoProspecto: this.resConfirmarDatos.codigoProspecto,
            estadoProspecto: this.resConfirmarDatos.estadoProspecto,
            importeFinanciar: this.resConfirmarDatos.importeFinanciar
          }
          this.$store
            .dispatch(
              'express/validarGenerarContractuales',
              JSON.stringify(validarTokenGenerarContractuales)
            )
            .then((res) => {
              if (res.codRes == '00') {
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

<style>
.container {
  width: 100% !important;
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
</style>
